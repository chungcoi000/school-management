import {Avatar, Button, Card, Form, Modal, Pagination, Select, Table, Tabs, Tooltip} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useState, useRef} from "react";

const ManageClass = () => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [options, setOptions] = useState([]);
  const [form] = Form.useForm();
  const searchTimeout = useRef(null);

  const handleSearchUser = async (value) => {
    try {
      setOptions(value ? options : []);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChangeValueSearchUser = async (value) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      handleSearchUser(value);
    }, 400);
  }

  const handleSelectUser = (value, options) => {
    setSelectedUsers(value);
  }

  const classes = [
    {id: 1, name: "10a1", formTeacher: "Nguyen Van A", unit: "10", studentNumber: 30},
    {id: 2, name: "10a2", formTeacher: "Nguyen Van B", unit: "10", studentNumber: 35},
    {id: 3, name: "10a3", formTeacher: "Nguyen Van C", unit: "10", studentNumber: 40},
  ]

  const columns = [
    {
      title: "Class Name",
      align: "center",
      dataIndex: "name",
      key: "name",
    }, {
      title: "Unit",
      align: "center",
      dataIndex: "unit",
      key: "name",
    }, {
      title: "Form Teacher",
      align: "center",
      dataIndex: "formTeacher",
      key: "formTeacher",
    }, {
      title: "Total Student",
      align: "center",
      dataIndex: "studentNumber",
      key: "studentNumber",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <div className="text-right d-flex justify-content-center">
          <Tooltip title="View">
            <Button type="primary" className="mr-2" icon={<EyeOutlined/>} size="small"
                    onClick={() => history.push(`/app/manage-system/class-detail`)}
            />
          </Tooltip>
          <Tooltip title="Add Teacher">
            <Button className="mr-2" icon={<UserAddOutlined/>} size="small" onClick={() => setModal(true)}/>
          </Tooltip>
          <Tooltip title="Add Students">
            <Button className="mr-2" icon={<UsergroupAddOutlined/>} size="small" onClick={() => setOpen(true)}/>
          </Tooltip>
        </div>
      )
    }
  ];
  return (
    <Card>
      <Tabs>
        <Tabs.TabPane key={0} tab="Unit 10">
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={classes}
              rowKey={record => record._id}
              pagination={true}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key={1} tab="Unit 11">
          <span>Khoi 11</span>
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab="Unit 12">
          <span>Khoi 12</span>
        </Tabs.TabPane>
      </Tabs>
      <Modal title="Add teacher" visible={modal} onCancel={() => setModal(false)}>
        <Form form={form} id="add-teacher-form" layout="vertical">
          <Form.Item
            label="Teacher"
            name="teacher"
            rules={[{required: true, message: 'Please select teacher!'}]}
          >
            <Select placeholder="Select teacher..." multiple={true}>
              <Select.Option style={{textTransform: "capitalize"}} value="a">Nguyen Van A</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="b">Nguyen Van B</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="c">Nguyen Van C</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Add student" visible={open} onCancel={() => setOpen(false)}>
        <Form form={form} id="add-students-form" layout="vertical">
          <Form.Item
            label="Student"
            name="student"
            rules={[{required: true, message: 'Please select students!'}]}
          >
            <Select
              allowClear
              mode="multiple"
              labelInValue
              placeholder="Select child"
              filterOption={false}
              onSearch={handleChangeValueSearchUser}
              onChange={(value, option) => handleSelectUser(value, options)}
              style={{width: '100%', minHeight: "inherit"}}
              optionLabelProp="title"
            >
              {options.map((option) => (
                <Select.Option key={option.value} value={option.value}
                               title={option.username}>{option.label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}

export default ManageClass;