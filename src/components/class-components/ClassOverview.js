import {useRouteMatch} from "react-router-dom";
import {Avatar, Button, Card, Form, Modal, notification, Select, Table, Tooltip} from "antd";
import {DeleteOutlined, GithubOutlined, UserAddOutlined, UsergroupAddOutlined, UserOutlined} from "@ant-design/icons";
import React, {useCallback, useEffect, useState} from "react";
import ApiServices from "../../services/ApiService";

const ClassOverview = () => {
  const {params} = useRouteMatch();
  const [currentClass, setCurrentClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const getClassDetail = useCallback(async () => {
    try {
      const res = await ApiServices.getClassSlot(params?.id);
      setCurrentClass(res.data.classID);
      setStudents(res.data?.classID?.student);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  const takeAttendances = async () => {
    const data = {
      attendances: attendances,
      class_slot: params?.id,
      classID: currentClass?._id,
    }
    try {
      if (attendances.length > 0) {
        const res = await ApiServices.takeAttendance(data);
        setAttendances([]);
        if (res.status === 200) {
          notification.success({message: res.message});
        }
      } else {
        notification.error({message: "Please select students"});
      }
    } catch (err) {
      console.log("err", err);
      notification.error({message: "Take attendance failed"})
    }
  }

  useEffect(() => {
    getClassDetail().then(_ => {
    });
  }, []);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      align: "center",
      key: "avatar",
      render: (record) => (
        <Avatar src={`http://localhost:3000/public${record}`} icon={<UserOutlined/>}/>
      )
    },
    {
      title: "Full Name",
      align: "center",
      dataIndex: "name",
      key: "fullName",
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "email",
      key: "email",
    },
  ];

  const rowSelection = {
    selectedRowKeys: attendances,
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (attendances.length !== 0) {
        setAttendances([]);
      }
    },
    onChange: (selectedRowKeys) => {
      setAttendances(selectedRowKeys);
    },
  };

  return (
    <div>
      <Card className="mb-0" style={{paddingBottom: 50}}>
        <div className="d-block d-md-flex">
          <div className="d-flex justify-content-center mb-2 mb-lg-0 mr-4">
            <Avatar
              size={150}
              icon={<GithubOutlined/>}
              shape={"square"}
            />
          </div>
          <div className="flex-grow-1 d-flex flex-column justify-content-between">
            <div className="d-block d-lg-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center">
                  <h2 className="mb-1 mr-2">{currentClass?.name}</h2>
                </div>
                <p
                  className="text-muted mb-2"
                  style={{fontSize: 16, fontWeight: 500, lineHeight: 1}}
                >
                  Form Teacher: {currentClass?.formTeacher?.name}
                </p>
              </div>
            </div>
            <div className="d-block d-md-flex align-items-center">
              <div className="d-block d-md-flex">
                <div
                  className="p-2"
                  style={{
                    borderRadius: 10,
                    border: "1px dashed #8888",
                    minWidth: 140,
                  }}
                >
                  <div style={{fontSize: 18, fontWeight: 600}}>
                    {currentClass?.unit?.name}
                  </div>
                  <span className="text-muted" style={{fontSize: 15, fontWeight: 600}}>Unit</span>
                </div>

                <div
                  className="mx-md-2 my-2 my-md-0 p-2"
                  style={{
                    borderRadius: 10,
                    border: "1px dashed #8888",
                    minWidth: 140,
                  }}
                >
                  <div style={{fontSize: 18, fontWeight: 600}}>
                    {currentClass?.student?.length}
                  </div>
                  <span className="text-muted" style={{fontSize: 15, fontWeight: 600}}>Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="w-100 mt-3">
        <div className="mb-3" style={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between"
        }}>
          <Button type="primary" disabled={attendances.length === 0 ? true : false} icon={<UsergroupAddOutlined/>}
                  onClick={() => takeAttendances()}>Take Attendances</Button>
        </div>
        <Card>
          <div className="table-responsive">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={students}
              rowKey={record => record._id}
              pagination={{defaultPageSize: 30}}/>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ClassOverview