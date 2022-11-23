import {Avatar, Button, Card, Form, Input, Modal, Pagination, Select, Table, Tabs, Tooltip} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined, FolderAddOutlined,

} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import {useState} from "react";

const {confirm} = Modal;

const classes = [
  {id: 1, name: "10a1", formTeacher: "Nguyen Van A", unit: "10", studentNumber: 30},
  {id: 2, name: "10a2", formTeacher: "Nguyen Van B", unit: "10", studentNumber: 35},
  {id: 3, name: "10a3", formTeacher: "Nguyen Van C", unit: "10", studentNumber: 40},
]

const ManageClass = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [form] = Form.useForm();

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
      key: "unit",
    },
    {
      title: "Form Teacher",
      align: "center",
      dataIndex: "formTeacher",
      key: "formTeacher",
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
          <Tooltip title="Update">
            <Button type="info" className="mr-2" icon={<EditOutlined/>} size="small" onClick={() => {
              setOpen(true);
              setMode("EDIT")
            }}/>
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="info" danger className="mr-2" icon={<DeleteOutlined/>} size="small" onClick={() => showDeleteConfirm(record._id)}/>
          </Tooltip>
        </div>
      )
    }
  ];

  const showDeleteConfirm = (classId) => {
    return (
      confirm({
        title: 'Are you sure delete this class?',
        content: 'This action can not undo, so do you want to delete?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          console.log("OK")
        },
      })
    )
  }

  return (
    <div className="w-100">
      <div className="mb-3" style={{
        display: "flex",
        direction: "row",
        justifyContent: "space-between"
      }}>
        <Button type="primary" icon={<FolderAddOutlined/>} onClick={() => {
          setOpen(true);
          setMode("ADD");
        }}>Add Class</Button>
      </div>
      <Card>
        <div className="table-responsive">
          <Table columns={columns} dataSource={classes} rowKey={record => record._id} pagination={false}
                 footer={() => {
                   return (
                     <Pagination/>
                   )
                 }}/>
        </div>
      </Card>
      <Modal
        visible={open}
        title={mode === "ADD" ? "Add Class" : "Edit Class" }
        onCancel={() => {
          setOpen(false)
          form.resetFields();
          setMode("");
        }}
        okButtonProps={{form: 'class-form-submit', htmlType: 'submit'}}
        // confirmLoading={loading}
        okText={mode === "ADD" ? "Submit" : "Save"}
      >
        <Form
          id='class-form-submit'
          form={form}
          layout="vertical"
          // onFinish={handleTag}
        >
          <Form.Item label="Class Name" name="name" rules={[{required: true, message: 'Please input class name!'}]}>
            <Input placeholder="Input Subject Name..."/>
          </Form.Item>
          <Form.Item label="Unit" name="unit" rules={[{required: true, message: 'Please select Unit!'}]}>
            <Select placeholder="Select form teacher...">
              <Select.Option style={{textTransform: "capitalize"}} value="10">10</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="11">11</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="12">12</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Form Teacher" name="formTeacher" rules={[{required: true, message: 'Please select from Teacher!'}]}>
            <Select placeholder="Select form teacher...">
              <Select.Option style={{textTransform: "capitalize"}} value="student">Student</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="teacher">Teacher</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="parent">Parent</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ManageClass;