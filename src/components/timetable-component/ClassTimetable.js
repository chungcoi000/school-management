import {Card, Form, Modal, Select, Space, Table, Tag} from "antd";
import {useState} from "react";

const data = [
  {
    _id: "1",
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    _id: "2",
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    _id: "3",
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    _id: "4",
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    _id: "5",
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const Timetable2 = () => {
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState(0);
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [form] = Form.useForm();


  const columns = [
    {
      key: '_id',
      render: (record) => (
        <p style={{fontWeight: "bold", textAlign: "center"}}>Slot {record._id}</p>
      )
    },
    {
      title: 'Monday',
      key: 'name',
      align: "center",
      render: (record) => (
        <Card hoverable style={{border: 0}} onClick={() => {
          setOpen(true);
          // setDay(record.name)
        }}>Test</Card>
      ),
    },
    {
      title: 'Tuesday',
      key: 'age',
      align: "center",
      render: (record) => (
        <Card hoverable style={{border: 0}} onClick={() => {
          setOpen(true);
          // setDay(record.name)
        }}>Test</Card>
      ),
    },
    {
      title: 'Wednesday',
      key: 'wednesday',
      align: "center",
      render: (_, record) => (
        <Card hoverable style={{border: 0}} onClick={() => {
          setOpen(true);
          // setDay(record.name)
        }}>Test</Card>
      ),
    }, {
      title: 'Thursday',
      dataIndex: 'address',
      key: 'address',
      align: "center",
      render: (_, record) => (
        <Card hoverable style={{border: 0}} onClick={() => {
          setOpen(true);
          // setDay(record.name)
        }}>Test</Card>
      ),
    }, {
      title: 'Friday',
      dataIndex: 'address',
      key: 'address',
      align: "center",
      render: (_, record) => (
        <Card hoverable onClick={() => {
          setOpen(true);
        }}>Test</Card>
      ),
    },
    {
      title: 'Saturday',
      key: 'tags',
      dataIndex: 'tags',
      align: "center",
      render: (_, {tags}) => (
        <Card hoverable style={{border: 0}} onClick={() => {
          setOpen(true);
        }}>Test</Card>

      ),
    },
  ];

  return (
    <Card>
      <Table columns={columns} dataSource={data} pagination={false}/>
      <Modal
        visible={open}
        title="Add subject"
        onCancel={() => {
          setOpen(false);
          setSubject("");
          setTeacher("");
          form.resetFields();
        }}
        okButtonProps={{form: 'add-timetable-slot', htmlType: 'submit'}}
      >
        <Form form={form} name="add-timetable-slot" layout="vertical">
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{required: true, message: 'Please select subject!'}]}
          >
            <Select placeholder="Select subject..." allowClear onChange={(value) => setSubject(value)}>
              <Select.Option style={{textTransform: "capitalize"}} value="maths">Math</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="literature">Literature</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="foreign language">Foreign
                language</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="chemistry">Chemistry</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="physics">Physics</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="biology">Biology</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="technology">Technology</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="informatics">Informatics</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="civic education">Civic
                Education</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="history">History</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="geography">Geography</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="art">Art</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="physical education">Physical
                Education</Select.Option>
              <Select.Option style={{textTransform: "capitalize"}} value="national defense education">National
                Defense Education</Select.Option>
            </Select>
          </Form.Item>
          {
            subject !== "" && (
              <Form.Item
                label="Teacher"
                name="teacher"
                rules={[{required: true, message: 'Please select teacher!'}]}
              >
                <Select placeholder="Select teacher..." allowClear onChange={(value) => setTeacher(value)}>
                  <Select.Option style={{textTransform: "capitalize"}} value="maths">Nguyen Van A</Select.Option>
                  <Select.Option style={{textTransform: "capitalize"}} value="literature">Nguyen Van B</Select.Option>
                </Select>
              </Form.Item>
            )
          }
        </Form>
      </Modal>
    </Card>
  )
}

export default Timetable2