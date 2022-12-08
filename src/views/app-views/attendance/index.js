import React, {useEffect, useState} from "react";
import ApiServices from "../../../services/ApiService";
import {Card, Col, Empty, Menu, notification, Row, Tag, Tooltip} from "antd";
import Flex from "../../../components/shared-components/Flex";
import EllipsisDropdown from "../../../components/shared-components/EllipsisDropdown";
import {
  BookOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import moment from "moment";

const Attendance = () => {
  const [classInfo, setClassInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [attendances, setAttendances] = useState([]);

  useEffect(async () => {
    let mounted = true;
    const response = await ApiServices.getUserClass();
    const res = await ApiServices.getSelfInformation();
    console.log("res", res);
    console.log("response", response);
    if (response.status !== 200) {
      notification.error({message: "No class assign to user"});
    }
    if (mounted) {
      setClassInfo(response.data)
      setUser(res.user)
    }
    return () => mounted = false;
  }, [])

  const getAttendances = async () => {
    if (user !== null && classInfo !== null) {
      try {
        let queries = {}
        if (user?.role === "student") {
          queries = {attendances: user._id}
        } else if (user?.role === "parent") {
          queries = {attendances: user.child}
        } else if (user?.role === "teacher" && user?._id === classInfo?.formTeacher._id) {
          queries = {classID: classInfo?._id}
        } else {
          queries = {}
        }
        const res = await ApiServices.getAttendance(queries);
        if (res.data) {
          setAttendances(res.data);
        }
      } catch (err) {
        console.log("err");
      }
    }
  }

  useEffect(() => {
    getAttendances().then(_ => {
    })
  }, [user, classInfo])

  return (
    <div>
      {attendances.length > 0 ? (
        <Row gutter={16}>
          {
            attendances.map((attendance, index) => (
              <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} key={index}>
                <Card size="small" key={index}>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h4 className="mb-0">{attendance?.class_slot?.name}</h4>
                    {
                      user?.role === "student" ? <Tag color="green">Attended</Tag> : null
                    }
                  </div>
                  <Tooltip title="Create At">
                    <CalendarOutlined className="text-muted font-size-md"/>
                    <span className="ml-1 text-muted">{moment(attendance?.createdAt).format("DD-MM-YYYY")}</span>
                  </Tooltip>
                  <div className="mt-2">
                    <Flex alignItems="center">
                      <div className="mr-3">
                        <Tooltip title="Subject">
                          <BookOutlined className="text-muted font-size-md"/>
                          <span
                            className="ml-1 text-muted"
                            style={{textTransform: "capitalize"}}>{attendance?.class_slot?.subjectID?.name}</span>
                        </Tooltip>
                      </div>
                    </Flex>
                  </div>
                  <div className="mt-2">
                    <Flex alignItems="center">
                      <div className="mr-3">
                        <Tooltip title="Teacher">
                          <UserOutlined className="text-muted font-size-md"/>
                          <span
                            className="ml-1 text-muted">{attendance?.class_slot?.teacherID?.name}</span>
                        </Tooltip>
                      </div>
                    </Flex>
                  </div>
                </Card>
              </Col>
            ))
          }
        </Row>
      ) : (
        <div>
          <Empty/>
        </div>
      )}
    </div>
  )
}

export default Attendance;