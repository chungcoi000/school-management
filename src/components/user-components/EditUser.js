import {useCallback, useEffect, useRef, useState} from "react";
import {Avatar, Button, Card, Col, DatePicker, Form, Input, notification, Row, Select, Spin, Tabs, Upload} from "antd";
import Flex from "../shared-components/Flex";
import ImgCrop from "antd-img-crop";
import {CloudUploadOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import {useRouteMatch} from "react-router-dom";
import ApiServices from "../../services/ApiService";
import moment from "moment";
import axios from "axios";
import {API_BASE_URL} from "../../configs/AppConfig";
import IntlMessage from "../util-components/IntlMessage";

const ROW_GUTTER = 16;
const dateFormat = "DD-MM-YYYY";

const EditUser = () => {
  const {params} = useRouteMatch();
  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [options, setOptions] = useState([]);
  const [roleType, setRoleType] = useState("student");
  const [units, setUnits] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [form] = Form.useForm();
  const inputRef = useRef();

  useEffect(() => {
    let mounted = true;
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

  const getUser = useCallback(async () => {
    try {
      const res = await ApiServices.getUser(params?.id);
      setAvatar(res.data?.avatar ?? "");
      setRoleType(res.data?.role);
      if (res.data?.role === "student") {
        form.setFieldsValue({
          name: res.data.name,
          address: res.data?.address,
          email: res.data?.email ?? "",
          dob: moment(res.data?.dob),
          gender: res.data?.gender,
          identityNumber: res.data?.identityNumber,
          role: res.data?.role,
          phone: res.data?.phone,
          unit: res.data?.unit?.name,
        });
      }

      if (res.data?.role === "teacher") {
        form.setFieldsValue({
          name: res.data.name,
          address: res.data?.address,
          email: res.data?.email ?? "",
          dob: moment(res.data?.dob),
          gender: res.data?.gender,
          identityNumber: res.data?.identityNumber,
          role: res.data?.role,
          phone: res.data?.phone,
          subject: res.data?.subject?.name,
        });
      }

      if (res.data?.role === "parent") {
        form.setFieldsValue({
          name: res.data.name,
          address: res.data?.address,
          email: res.data?.email ?? "",
          dob: moment(res.data?.dob),
          gender: res.data?.gender,
          identityNumber: res.data?.identityNumber,
          role: res.data?.role,
          phone: res.data?.phone,
          child: res.data?.child?.name,
        });
      }
    } catch (err) {
      notification.error({message: "Something error when getting user data!"})
      console.log(err);
    }
  }, [form, params.id]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getUser();
      setLoading(false);
    })();
  }, [getUser, params.id]);

  const handleChangeValueSearchUser = async (value) => {
    if (inputRef.current) {
      clearTimeout(inputRef.current);
    }
    inputRef.current = setTimeout(() => {
      handleSearchUser(value);
    }, 400);
  }

  const handleSearchUser = async (value) => {
    try {
      await ApiServices.searchUser({name: value, role: "teacher"}).then(res => {
        let options = [...res.data].map(user => {
          return ({
            value: user._id,
            name: user.name,
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
                  <div className="font-size-sm text-muted">{user?.subject?.name} </div>
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

  const onSubmit = async (values) => {
    setLoading(true);
    let data = {
      name: values?.name,
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
      const res = await ApiServices.updateUser(params?.id, data);
      if (res.status === 200) {
        notification.success({message: res.message});
      }
      setLoading(false);
    } catch (err) {
      console.log("err");
      setLoading(false);
      notification.error({message: "Something error!"})
    }
  }

  return (
    <Spin spinning={loading} tip="Loading...">
      <Form onFinish={onSubmit} form={form} layout={"vertical"}>
        <div className="mb-4">
          <h3 className="mb-0">User Information</h3>
        </div>
        <Card>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={6}>
              <div className="d-flex justify-content-center">
                <Avatar
                  src={avatar}
                  shape="square"
                  icon={<UserOutlined/>}
                  size={200}
                />
              </div>
              <div className="mt-2 d-flex justify-content-center">
                <ImgCrop rotate>
                  <Upload
                    showUploadList={false}
                    beforeUpload={async (file) => {
                      console.log("file", file);
                      if (uploadingAvatar) return;
                      setUploadingAvatar(true);
                      try {
                        const formData = new FormData();
                        formData.append('avatar', file);
                        await axios.post(API_BASE_URL + '/users/updateAvatar', formData, {
                          headers: {
                            'Content-Type': 'multipart/form-data',
                          }
                        })
                        notification.success({message: 'Upload avatar successfully'});
                      } catch (err) {
                        console.log(err)
                        notification.error({message: 'Failed to upload avatar'})
                      }
                      setUploadingAvatar(false);
                    }}
                  >
                    <Button
                      icon={<CloudUploadOutlined/>}
                      type="primary"
                      loading={uploadingAvatar}
                    >
                      Change Avatar
                    </Button>
                  </Upload>
                </ImgCrop>
              </div>
            </Col>
            <Col xs={24} lg={18}>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input name!",
                      },
                    ]}
                  >
                    <Input placeholder="Input name..."/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="email" label="Email" rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input valid email!",
                    },
                  ]}>
                    <Input disabled placeholder="Input email..."/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="role" label="Role">
                    <Input disabled placeholder="Input role..."/>

                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
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
                        label="Child"
                        name="child"
                        rules={[{required: true, message: 'Please select child!'}]}
                      >
                        <Input placeholder="Input child..." disabled />
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
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="dob" label="Date of Birth">
                    <DatePicker
                      className="w-100"
                      placeholder="Input date of birth"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="gender" label="Gender">
                    <Select placeholder="Input gender">
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="phone" label="Phone Number">
                    <Input placeholder="Input phone..."/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="identityNumber" label="Identity Number">
                    <Input placeholder="Input identity number..."/>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="address" label="Address">
                <Input.TextArea placeholder="Input address..."/>
              </Form.Item>
              <div className="d-flex justify-content-end">
                <Button onClick={() => form.submit()} type="primary">
                  Update
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Form>
    </Spin>
  )
}

export default EditUser;