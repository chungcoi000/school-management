import {Card, Table, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import ApiServices from "../../services/ApiService";
import Flex from "../shared-components/Flex";
import {BookOutlined, UserOutlined} from "@ant-design/icons";

const Timetable2 = ({currentClass}) => {
  const [timetables, setTimetables] = useState([]);
  let index = 1;

  const getTimetable = async () => {
    try {
      if (currentClass._id !== undefined) {
        const res = await ApiServices.getClassTimetable(currentClass?._id);
        console.log('res', res);
        setTimetables(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTimetable().then(_ => {
    });
  }, [currentClass])

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
                  <BookOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[0] === undefined) ? "No data" : record[0]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d">{(record.length === 0 || record[0] === undefined) ? "No data" : record[0]?.class_slotID?.teacherID?.name}</span>
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
                  <BookOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[1] === undefined) ? "No data" : record[1]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d">{(record.length === 0 || record[1] === undefined) ? "No data" : record[1]?.class_slotID?.teacherID?.name}</span>
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
                  <BookOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[2] === undefined) ? "No data" : record[2]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d">{(record.length === 0 || record[2] === undefined) ? "No data" : record[2]?.class_slotID?.teacherID?.name}</span>
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
                  <BookOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[3] === undefined) ? "No data" : record[3]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d">{(record.length === 0 || record[3] === undefined) ? "No data" : record[3]?.class_slotID?.teacherID?.name}</span>
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
              <div className="mr-3">
                <Tooltip title="Subject">
                  <BookOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[4] === undefined) ? "No data" : record[4]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d">{(record.length === 0 || record[4] === undefined) ? "No data" : record[4]?.class_slotID?.teacherID?.name}</span>
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
              <div className="mr-3">
                <Tooltip title="Subject">
                  <BookOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d"
                    style={{textTransform: "capitalize"}}>{(record.length === 0 || record[5] === undefined) ? "No data" : record[5]?.class_slotID?.subjectID?.name}</span>
                </Tooltip>
              </div>
            </Flex>
          </div>
          <div className="mt-2">
            <Flex justifyContent="center">
              <div className="mr-3">
                <Tooltip title="Teacher">
                  <UserOutlined className="d font-size-md"/>
                  <span
                    className="ml-1 d">{(record.length === 0 || record[5] === undefined) ? "No data" : record[5]?.class_slotID?.teacherID?.name}</span>
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

export default Timetable2