import {Avatar, Button, Card, Input, Modal, Pagination, Table, Tooltip} from "antd";
import {useHistory} from "react-router-dom";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";

const {confirm} = Modal;

const ManageUser = () => {
  const history = useHistory();

  const users = [
    {
      _id: 1,
      name: "Nguyen Van A",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Alex_Turner%2C_Way_Out_West_2018.jpg/640px-Alex_Turner%2C_Way_Out_West_2018.jpg",
      email: "nguyenvana@gmail.com",
      role: {id: 1, name: "Teacher"}
    }, {
      _id: 2,
      name: "Nguyen Van B",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Alex_Turner%2C_Way_Out_West_2018.jpg/640px-Alex_Turner%2C_Way_Out_West_2018.jpg",
      email: "nguyenvanb@gmail.com",
      role: {id: 2, name: "Student"}
    }, {
      _id: 1,
      name: "Nguyen Van A",
      avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Alex_Turner%2C_Way_Out_West_2018.jpg/640px-Alex_Turner%2C_Way_Out_West_2018.jpg",
      email: "nguyenvana@gmail.com",
      role: {id: 3, name: "Parent"}
    }
  ]

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
          history.replace({
            pathname: `/app/add-user`,
            mode: "ADD"
          })
        }}>Add User</Button>
        <Input.Search style={{width: "30%"}} enterButton/>
      </div>
      <Card>
        <div className="table-responsive">
          <Table columns={columns} dataSource={users} rowKey={record => record._id} pagination={false}
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