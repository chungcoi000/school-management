import {Button, Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {PageHeaderAlt} from "../layout-components/PageHeaderAlt";
import Flex from "../shared-components/Flex";
import {useRef, useState} from "react";

const datePickerStyle = {
  width: '100%',
}

const UserForm = (props) => {
  const [form] = Form.useForm();
  const [roleType, setRoleType] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [mode, setMode] = useState(props?.location?.mode ?? "ADD")
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

  return (
    <Form layout="vertical" form={form} name="dynamic_rule">
      <PageHeaderAlt className="border-bottom">
        <div className="container">
          <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
            <h2 className="mb-3">Add User</h2>
            <div className="mb-3">
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>
      <div className="container mt-3">
        <Row gutter={16}>
          <Col xs={24} md={12} lg={12} xl={12} xx={12}>
            <Card title="Requirement Information">
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{required: true, message: 'Please input full name!'}]}
              >
                <Input placeholder="Enter full name..."/>
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input email!', type: "email"}]}
              >
                <Input placeholder="Enter email..."/>
              </Form.Item>
              <Form.Item
                label={mode === "ADD" ? "Password" : "Password (Optional)"}
                name="password"
                rules={mode === "ADD" ? [
                  {
                    required: true,
                    message: "Please input password"
                  },
                ] : []}
              >
                <Input placeholder="Enter password..."/>
              </Form.Item>
              {mode === "ADD" && (
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input password"
                    },
                    ({getFieldValue}) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('Passwords do not match!');
                      },
                    })
                  ]}
                >
                  <Input placeholder="Enter confirm password..."/>
                </Form.Item>
              )}
              <Form.Item
                label="Role"
                name="role"
                rules={[{required: true, message: 'Please select role!'}]}
              >
                <Select placeholder="Select role..." onChange={(value) => {
                  setRoleType(value);
                }}>
                  <Select.Option style={{textTransform: "capitalize"}} value="student">Student</Select.Option>
                  <Select.Option style={{textTransform: "capitalize"}} value="teacher">Teacher</Select.Option>
                  <Select.Option style={{textTransform: "capitalize"}} value="parent">Parent</Select.Option>
                </Select>
              </Form.Item>
              {
                roleType === "teacher" && (
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{required: true, message: 'Please select subject!'}]}
                  >
                    <Select placeholder="Select subject..." mode="multiple" allowClear>
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
                )
              }
              {
                roleType === "parent" && (
                  <Form.Item
                    label="Children"
                    name="children"
                    rules={[{required: true, message: 'Please select children!'}]}
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
                )
              }
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card title="Optional Information">
              {
                roleType === "student" && (
                  <Form.Item
                    label="Class"
                    name="class"
                  >
                    <Select
                      allowClear
                      labelInValue
                      placeholder="Select class"
                      filterOption={false}
                      style={{width: '100%', minHeight: "inherit"}}
                      optionLabelProp="title"
                    >
                      <Select.Option value="10a1">10a1</Select.Option>
                      <Select.Option value="10a1">10a2</Select.Option>
                      <Select.Option value="10a1">10a3</Select.Option>
                    </Select>
                  </Form.Item>
                )
              }
              <Form.Item
                label="Date of Birth"
                name="dob"
              >
                <DatePicker style={datePickerStyle}/>
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
              >
                <Select placeholder="Select gender...">
                  <Select.Option value="0">Male</Select.Option>
                  <Select.Option value="1">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="identityNumber"
                label="Identity Number"
              >
                <Input placeholder="Enter identity number..."/>
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
              >
                <Input placeholder="Enter address..."/>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </div>
    </Form>
  )
}

export default UserForm