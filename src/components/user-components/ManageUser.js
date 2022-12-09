import {Avatar, Button, Card, Input, Modal, notification, Pagination, Spin, Table, Tabs, Tooltip} from "antd";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(10);

  const getUsers = async (type, page) => {
    try {
      setLoading(true);
      if (type === "student") {
        const res = await ApiService.getStudents({page: page, limit: 10});
        if (res.status === 200) {
          setUser(res.data);
          setCurrentPage(res.pagination.page);
          setTotal(res.pagination.total);
        }
      }

      if (type === "teacher") {
        const res = await ApiService.getTeachers({page: page, limit: 10});
        if (res.status === 200) {
          setUser(res.data);
          setCurrentPage(res.pagination.page);
          setTotal(res.pagination.total);
        }
      }

      if (type === "parents") {
        const res = await ApiService.getParents({page: page, limit: 10});
        if (res.status === 200) {
          setUser(res.data);
          setCurrentPage(res.pagination.page);
          setTotal(res.pagination.total);
        }
      }

      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers(type, currentPage)
  }, [type, currentPage]);

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      align: "center",
      key: "avatar",
      render: (record) => (
        <Avatar src={`http://localhost:3000/public${record}`} icon={<UserOutlined/>}/>
      )
    }, {
      title: "Full Name",
      align: "center",
      dataIndex: "name",
      key: "fullName",
    }, {
      title: "Email",
      dataIndex: "email",
      align: "center",
      key: "email",
    }, {
      title: "Role",
      dataIndex: "role",
      align: "center",
      key: "roles",
    }, {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <div className="text-right d-flex justify-content-center">
          <Tooltip title="Update">
            <Button type="info" className="mr-2" icon={<EditOutlined/>} size="small" onClick={() => {
              history.push("/app/edit-user/" + record._id)
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
        onOk: async () => {
          try {
            const res = await ApiService.deleteUser(userId);
            if (res.status === 200) {
              setUser((state) => state.filter((x) => x._id !== res.data._id));
              notification.success({
                message: res.message
              })
            }
          } catch (e) {
            console.log("e", e)
          }
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
            setCurrentPage(1);
          }}
          defaultActiveKey="student"
        >
          <Tabs.TabPane tab="Student" key={`student`}></Tabs.TabPane>
          <Tabs.TabPane tab="Teacher" key={`teacher`}></Tabs.TabPane>
          <Tabs.TabPane tab="Parent" key={`parents`}></Tabs.TabPane>
        </Tabs>
        <div className="table-responsive">
          <Spin spinning={loading} tip="Loading..." >
            <Table
              columns={columns}
              dataSource={user}
              rowKey={record => record._id}
              pagination={{
                pageSize: 10,
                total,
                onChange: (page) => {
                  getUsers(type, page);
                },
                current: currentPage,
              }}
            />
          </Spin>
        </div>
      </Card>
    </div>
  )
}

export default ManageUser;