import {Avatar, Button, Card, Input, Modal, Pagination, Table, Tabs, Tooltip} from "antd";
import {useHistory} from "react-router-dom";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import ApiService from "../../services/ApiService";

const {confirm} = Modal;

const ManageUser = () => {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [type, setType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);

  console.log("types", type);

  const getUsers = async (page) => {
    try {
      if (type === "student") {
        const res = await ApiService.getStudents({page: page, limit: 10});
        if (res.status === 200) {
          setUser(res.data);
          setPage(res.pagination.page);
          setTotal(res.pagination.total);
        }
      }

      if (type === "teacher") {
        const res = await ApiService.getTeachers({page: page, limit: 10});
        if (res.status === 200) {
          setUser(res.data);
          setPage(res.pagination.page);
          setTotal(res.pagination.total);
        }
      }

      if (type === "parents") {
        const res = await ApiService.getParents({page: page, limit: 10});
        if (res.status === 200) {
          setUser(res.data);
          setPage(res.pagination.page);
          setTotal(res.pagination.total);
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    getUsers(page)
  }, [type])

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      align: "center",
      key: "avatar",
      render: (record) => (
        <Avatar src={record} icon={<UserOutlined/>}/>
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
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      key: "roles",
      render: role => {
        return (
          <span>{role.name}</span>)
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <div className="text-right d-flex justify-content-center">
          <Tooltip title="View">
            <Button type="primary" className="mr-2" icon={<EyeOutlined/>} size="small"/>
          </Tooltip>
          <Tooltip title="Update">
            <Button type="info" className="mr-2" icon={<EditOutlined/>} size="small" onClick={() => {
              history.push({
                pathname: "/app/edit-user/" + record._id,
                data: record,
                mode: "EDIT"
              })
            }}/>
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="danger" icon={<DeleteOutlined/>} onClick={() => showDeleteConfirm(record._id)}
                    size="small"/>
          </Tooltip>
        </div>
      )
    }
  ];

  const showDeleteConfirm = (userId) => {
    return (
      confirm({
        title: 'Are you sure delete this user?',
        content: 'This action can not undo, so do you want to delete?',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
          disabled: false,
        },
        cancelText: 'No',
        onOk() {
          console.log("Ok");
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    )
  };

  return (
    <div className="w-100">
      <div className="mb-3" style={{
        display: "flex",
        direction: "row",
        justifyContent: "space-between"
      }}>
        <Button type="primary" icon={<UserAddOutlined/>} onClick={() => {
          history.replace(`/app/add-user`,)
        }}>Add User</Button>
        <Input.Search style={{width: "30%"}} enterButton/>
      </div>
      <Card>
        <Tabs
          onTabClick={(tab) => {
            setType(tab)
          }}
          defaultActiveKey="student"
        >
          <Tabs.TabPane tab="Student" key={`student`}></Tabs.TabPane>
          <Tabs.TabPane tab="Teacher" key={`teacher`}></Tabs.TabPane>
          <Tabs.TabPane tab="Parent" key={`parents`}></Tabs.TabPane>
        </Tabs>
        <div className="table-responsive">
          <Table columns={columns} dataSource={user} rowKey={record => record._id} pagination={false}
                 footer={() => {
                   return (
                     <Pagination/>
                   )
                 }}/>
        </div>
      </Card>
    </div>
  )
}

export default ManageUser;