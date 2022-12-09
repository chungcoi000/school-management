import {Avatar, Button, Card, Form, Input, Modal, notification, Pagination, Select, Table, Tooltip} from "antd";
import {Link, useHistory} from "react-router-dom";
import {DeleteOutlined, EditOutlined, EyeOutlined, UserAddOutlined, UserOutlined} from "@ant-design/icons";
import {useEffect, useRef, useState} from "react";
import IntlMessage from "../util-components/IntlMessage";
import ApiServices from "../../services/ApiService";
import ApiService from "../../services/ApiService";

const {confirm} = Modal;

export const StudentList = (props) => {
  const {currentClass} = props;
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [students, setStudents] = useState([]);
  const inputRef = useRef();
  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentClass) {
      setStudents([...currentClass?.student].map(student => student._id));
      setUser([...currentClass?.student]);
    }
  }, [currentClass])

  const onFinish = async () => {
    setLoading(true);
    let users = [...selectedMembers].map(member => member.value);
    let updateUser = users.concat(students.filter((item) => users.indexOf(item) < 0));
    try {
      const res = await ApiServices.updateStudentToClass({id: currentClass?._id, student: updateUser});
      if (res.status === 200) {
        notification.success({
          message: res.message
        })
        setUser(res.data.student)
        setSelectedMembers([]);
        setVisible(false);
        setOptions([]);
        setLoading(false);
      } else {
        setLoading(false)
        notification.error({
          message: res.message
        })
      }
    } catch (err) {
      console.log("err");
      notification.error({message: "Something error!"});
      setLoading(false)
    }
  }

  const handleSearchUser = async (value) => {
    try {
      await ApiServices.searchUserByUnit(currentClass?.unit?._id, {name: value}).then(res => {
        let options = [...res.data].map(user => {
          return ({
            value: user._id,
            username: user.name,
            data: user,
            label: (
              <div className="search-list-item" style={{
                display: "flex"
              }}>
                <div className="mr-3">
                  <Avatar src={user?.avatar}/>
                </div>
                <div>
                  <div className="font-weight-semibold"><IntlMessage id={`${user.name}`}/></div>
                  <div className="font-size-sm text-muted">Unit {user?.unit?.name} </div>
                </div>
              </div>
            )
          })
        })
        setOptions(value ? options : []);
      }).catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleChangeValueSearchUser = async (value) => {
    if (inputRef.current) {
      clearTimeout(inputRef.current);
    }
    inputRef.current = setTimeout(() => {
      handleSearchUser(value);
    }, 400);
  }

  const handleSelectMember = (value, options) => {
    setSelectedMembers(value);
  }

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
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <div className="text-right d-flex justify-content-center">
          <Tooltip title="Remove">
            <Button type="danger" icon={<DeleteOutlined/>} onClick={() => showDeleteConfirm(record._id)}
                    size="small"/>
          </Tooltip>
        </div>
      )
    }
  ];

  const showDeleteConfirm = (id) => {
    return (
      confirm({
        title: 'Are you sure to remove this student from class?',
        content: 'This action can not undo, so do you want to delete?',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
          disabled: false,
        },
        cancelText: 'No',
        onOk: async () => {
          try {
            let newUsers = [...user].filter(user => user?._id !== id);
            const res = await ApiServices.updateStudentToClass({id: currentClass?._id, student: newUsers});
            notification.success({
              message: res.message
            })
            setUser(res.data.student);
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
        <Button type="primary" icon={<UserAddOutlined/>} onClick={() => setVisible(true)}>Add User</Button>
      </div>
      <Card>
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={user}
            rowKey={record => record._id}
            pagination={{defaultPageSize: 30}}/>
        </div>
      </Card>
      <Modal
        visible={visible}
        title="Add student to class"
        onCancel={() => {
          setVisible(false)
          form.resetFields();
        }}
        okButtonProps={{form: 'student-form-submit', htmlType: 'submit'}}
        confirmLoading={loading}
        okText={"Submit"}>
        <Form form={form} layout="vertical" id='student-form-submit' onFinish={onFinish}>
          <Form.Item
            label="Student"
            name="student"
            rules={[{required: true, message: 'Please select student!'}]}>
            <Select
              allowClear
              mode="multiple"
              labelInValue
              placeholder="Select student"
              filterOption={false}
              onSearch={handleChangeValueSearchUser}
              onChange={(value, option) => handleSelectMember(value, options)}
              style={{width: '100%', minHeight: "inherit"}}
            >
              {options.map(option => (
                <Select.Option key={option.value} value={option.value}
                               title={option.name}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
