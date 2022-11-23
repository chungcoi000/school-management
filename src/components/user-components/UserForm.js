import {Button, Card, Col, DatePicker, Form, Input, notification, Row, Select} from "antd";
import {PageHeaderAlt} from "../layout-components/PageHeaderAlt";
import Flex from "../shared-components/Flex";
import {useCallback, useEffect, useRef, useState} from "react";
import ApiServices from "../../services/ApiService";
import {Link} from "react-router-dom";
import moment from "moment";

const datePickerStyle = {
  width: '100%',
}

const UserForm = (props) => {
  const [form] = Form.useForm();
  const [roleType, setRoleType] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const searchTimeout = useRef(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [units, setUnits] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    let mounted = true;
    ApiServices.getRoles().then(response => {
      if (mounted) {
        setRoles(response.data);
      }
    })

    ApiServices.getAllSubjects().then(response => {
      if (mounted) {
        setSubjects(response.data);
      }
    })

    ApiServices.getUnits().then(response => {
      if (mounted) {
        console.log("response", response)
        setUnits(response.data);
      }
    })

    return () => mounted = false;
  }, [])

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

  const onFinish = async (values) => {
    setLoading(true);
    let data = {
      //required
      email: values?.email,
      name: values?.name,
      password: values?.password,
      role: values?.role,
      //personal information
      dob: values?.dob !== undefined ? moment(values?.dob).format("x") : moment().format("x"),
      gender: values?.gender ?? "male",
      identityNumber: values?.identityNumber ?? "unassigned",
      address: values?.address ?? "unassigned",
      phone: values?.phone ?? "unassigned",
    }
    if (values.role === "student") {
      data = Object.assign({unit: values?.unit}, data)
    }

    if (values.role === "teacher") {
      data = Object.assign({subject: values?.subject}, data)
    }
    try {
      const res = await ApiServices.addUser(data);
      console.log("res", res);
      if (res.status === 200) {
        notification.success({
          message: res.message
        });
        form.resetFields();
        setLoading(false);
      } else {
        notification.error({
          message: res.message
        })
        setLoading(false);
      }
    } catch (err) {
      console.log("err", err);
      setLoading(false);
    }
  }

  return (
    <Form layout="vertical" form={form} name="dynamic_rule" onFinish={onFinish}>
      <PageHeaderAlt className="border-bottom">
        <div className="container">
          <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
            <h2 className="mb-3">Add User</h2>
            <div className="mb-3">
              <Button type="primary" htmlType="submit" loading={loading}>
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
                name="name"
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
                label={"Password"}
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input password"
                  },
                ]}
              >
                <Input placeholder="Enter password..."/>
              </Form.Item>
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
              <Form.Item
                label="Role"
                name="role"
                rules={[{required: true, message: 'Please select role!'}]}
              >
                <Select placeholder="Select role..." onChange={(value) => {
                  setRoleType(value);
                }}>
                  {roles.map((role, index) => {
                    return (
                      <Select.Option style={{textTransform: "capitalize"}} value={role.name}
                                     key={role._id + index}><span
                        style={{textTransform: "capitalize"}}>{role.name}</span></Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              {
                roleType === "teacher" && (
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{required: true, message: 'Please select subject!'}]}
                  >
                    <Select placeholder="Select subject...">
                      {
                        subjects.map((subject, index) => {
                          return (
                            <Select.Option
                              style={{textTransform: "capitalize"}}
                              key={subject._id + index}
                              value={subject._id}
                            >
                              {subject.name}
                            </Select.Option>
                          )
                        })
                      }
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
              {
                roleType === "student" && (
                  <Form.Item
                    label="Unit"
                    name="unit"
                    rules={[{required: true, message: 'Please select unit!'}]}
                  >
                    <Select
                      allowClear
                      placeholder="Select class"
                      style={{width: '100%', minHeight: "inherit"}}
                    >
                      {
                        units.map((unit, index) => {
                          return (
                            <Select.Option
                              style={{textTransform: "capitalize"}}
                              key={unit._id + index}
                              value={unit._id}
                            >
                              {unit.name}
                            </Select.Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                )
              }
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card title="Optional Information">
              <Form.Item
                label="Date of Birth"
                name="dob"
              >
                <DatePicker style={datePickerStyle}/>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
              >
                <Input placeholder="Enter phone number..."/>
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
              >
                <Select placeholder="Select gender...">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
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