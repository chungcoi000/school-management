import {Card, Form, Modal, notification, Select, Space, Table, Tag, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import ApiServices from "../../services/ApiService";
import Flex from "../shared-components/Flex";
import {BookOutlined, UserOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const ClassTimetable = () => {
  const [classInfo, setClassInfo] = useState("");
  const [timetables, setTimetables] = useState([]);
  const history = useHistory();

  let index = 1;

  useEffect(async () => {
    let mounted = true;
    const response = await ApiServices.getUserClass();
    if (response.status !== 200) {
      notification.error({message: "No class assign to user"});
    }
    if (mounted) {
      setClassInfo(response.data)
    }
    return () => mounted = false;
  }, [])

  useEffect(async () => {
    if (classInfo !== "") {
      try {
        const res = await ApiServices.getClassTimetable(classInfo?._id);
        console.log('res', res);
        setTimetables(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  }, [classInfo])

  const columns = [
    {
      key: '_id',
      render: (_) => (
        <p style={{fontWeight: "bold", textAlign: "center"}}>Slot {index++}</p>
      )
    },
    {
      title: 'Monday',
      key: 'monday',
      align: "center",
      width: '15%',
      render: (record) => (
        <Card style={{border: 0}}>

          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Subject">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[0] === undefined) ? "No data" : record[0]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3" style={{cursor: "pointer"}}
                   onClick={() => record[0] !== "" ? history.push(`/app/profile/${record[0]?.class_slotID?.teacherID?._id}`) : null}
              >
                <Tooltip title="Teacher">
                  <UserOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 ">{(record.length === 0 || record[0] === "") ? "No data" : record[0]?.class_slotID?.teacherID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
        </Card>
      ),
    },
    {
      title: 'Tuesday',
      key: 'tuesday',
      align: "center",
      width: '15%',
      render: (record) => (
        <Card style={{border: 0}}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Subject">
                  <BookOutlined className="font-size-md"/>
                  <span
                    className="ml-1"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[1] === undefined) ? "No data" : record[1]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3" style={{cursor: "pointer"}}
                   onClick={() => record[1] !== undefined ? history.push(`/app/profile/${record[1]?.class_slotID?.teacherID?._id}`) : null}
              >
                <Tooltip title="Teacher">
                  <UserOutlined className="font-size-md"/>
                  <span
                    className="ml-1">{(record.length === 0 || record[1] === undefined) ? "No data" : record[1]?.class_slotID?.teacherID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
        </Card>
      ),
    },
    {
      title: 'Wednesday',
      key: 'wednesday',
      align: "center",
      width: '15%',
      render: (_, record) => (
        <Card style={{border: 0}}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Subject">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[2] === undefined) ? "No data" : record[2]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3" style={{cursor: "pointer"}}
                   onClick={() => record[2] !== undefined ? history.push(`/app/profile/${record[2]?.class_slotID?.teacherID?._id}`) : null}
              >
                <Tooltip title="Teacher">
                  <UserOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 ">{(record.length === 0 || record[2] === undefined) ? "No data" : record[2]?.class_slotID?.teacherID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
        </Card>
      ),
    },
    {
      title: 'Thursday',
      key: 'thursday',
      align: "center",
      width: '15%',
      render: (_, record) => (
        <Card style={{border: 0}}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Subject">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[3] === undefined) ? "No data" : record[3]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3" style={{cursor: "pointer"}}
                   onClick={() => record[3] !== undefined ? history.push(`/app/profile/${record[3]?.class_slotID?.teacherID?._id}`) : null}
              >
                <Tooltip title="Teacher">
                  <UserOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 ">{(record.length === 0 || record[3] === undefined) ? "No data" : record[3]?.class_slotID?.teacherID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
        </Card>
      ),
    },
    {
      title: 'Friday',
      key: 'friday',
      align: "center",
      width: '15%',
      render: (_, record) => (
        <Card style={{border: 0}}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3" style={{cursor: "pointer"}}
                   onClick={() => record[4] !== undefined ? history.push(`/app/profile/${record[4]?.class_slotID?.teacherID?._id}`) : null}
              >
                <Tooltip title="Subject">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[4] === undefined) ? "No data" : record[4]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 ">{(record.length === 0 || record[4] === undefined) ? "No data" : record[4]?.class_slotID?.teacherID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
        </Card>
      ),
    },
    {
      title: 'Saturday',
      key: 'saturday',
      align: "center",
      width: '15%',
      render: (_, record) => (
        <Card style={{border: 0}}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3" style={{cursor: "pointer"}}
                   onClick={() => record[5] !== undefined ? history.push(`/app/profile/${record[5]?.class_slotID?.teacherID?._id}`) : null}
              >
                <Tooltip title="Subject">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[5] === undefined) ? "No data" : record[5]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 ">{(record.length === 0 || record[5] === undefined) ? "No data" : record[5]?.class_slotID?.teacherID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={timetables} pagination={false}/>
    </Card>
  )
}

export default ClassTimetable