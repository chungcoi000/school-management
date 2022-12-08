import {Card, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import ApiServices from "../../services/ApiService";
import Flex from "../shared-components/Flex";
import {BookOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const TeacherTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const history = useHistory();

  let index = 1;

  const getTimetable = async () => {
    try {
      const res = await ApiServices.getTeacherTimetable();
      setTimetables(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTimetable().then(_ => {
    });
  }, []);

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
        <Card style={{border: 0}} hoverable onClick={() => {
          if (record[0] !== undefined) {
            history.push(`/app/class/${record[0]?.class_slotID?._id}`);
          } else {
            return undefined
          }
        }}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Class">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[0] === undefined) ? "No class" : record[0]?.class_slotID?.classID?.name}</span>
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
        <Card style={{border: 0}} hoverable onClick={() => {
          if (record[1] !== undefined) {
            history.push(`/app/class/${record[1]?.class_slotID?._id}`);
          } else {
            return null
          }
        }}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Class">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[1] === undefined) ? "No class" : record[1]?.class_slotID?.classID?.name}</span>
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
        <Card style={{border: 0}} hoverable onClick={() => {
          if (record[2] !== undefined) {
            history.push(`/app/class/${record[2]?.class_slotID?._id}`);
          } else {
            return null
          }
        }}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Class">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[2] === undefined) ? "No class" : record[2]?.class_slotID?.classID?.name}</span>
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
        <Card style={{border: 0}} hoverable onClick={() => {
          if (record[3] !== undefined) {
            history.push(`/app/class/${record[3]?.class_slotID?._id}`);
          } else {
            return null
          }
        }}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Class">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[3] === undefined) ? "No class" : record[3]?.class_slotID?.classID?.name}</span>
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
        <Card style={{border: 0}} hoverable onClick={() => {
          if (record[4] !== undefined) {
            history.push(`/app/class/${record[4]?.class_slotID?._id}`);
          } else {
            return null
          }
        }}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Class">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[4] === undefined) ? "No class" : record[4]?.class_slotID?.classID?.name}</span>
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
        <Card style={{border: 0}} hoverable onClick={() => {
          if (record[5] !== undefined) {
            history.push(`/app/class/${record[5]?.class_slotID?._id}`);
          } else {
            return null
          }
        }}>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Class">
                  <BookOutlined className=" font-size-md"/>
                  <span
                    className="ml-1 "
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[5] === undefined) ? console.log("23123", record[5]) : record[5]?.class_slotID?.classID?.name}</span>
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

export default TeacherTimetable