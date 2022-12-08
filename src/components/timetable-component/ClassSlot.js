import {
  Button,
  Card,
  Col,
  Empty,
  Form,
  Menu,
  Modal,
  notification,
  Row,
  Select,
  Spin,
  Tabs,
  Tooltip
} from "antd";
import React, {useEffect, useState} from "react";
import ApiServices from "../../services/ApiService";
import {
  AppstoreAddOutlined, BookOutlined, DeleteOutlined, EditOutlined, FolderAddOutlined, UserOutlined
} from "@ant-design/icons";
import EllipsisDropdown from "../shared-components/EllipsisDropdown";
import Flex from "../shared-components/Flex";
import ApiService from "../../services/ApiService";

const {confirm} = Modal;

const ClassSlot = ({currentClass}) => {
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classSlots, setClassSlots] = useState([]);
  const [slot, setSlot] = useState("");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState("ADD");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [id, setId] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    let mounted = true;
    ApiServices.getDates().then(res => {
      if (mounted) {
        const newDate = res?.data?.sort((a, b) => a.index - b.index);
        setDates(newDate);
      }
    });

    ApiServices.getAllSubjects().then(res => {
      if (mounted) {
        setSubjects(res.data);
      }
    })
    ApiServices.getSlots().then(res => {
      if (mounted) {
        setSlots(res.data);
      }
    })
    return () => mounted = false;
  }, []);

  const getTeacherBySubject = async () => {
    setLoading(true);
    try {
      if (subject !== "") {
        const res = await ApiServices.getTeacherBySubject(subject);
        setTeachers(res.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      notification.error({message: "Something error!"});
      setLoading(false);
    }
  }

  const getClassSlotBySlots = async () => {
    setPageLoading(true);
    try {
      if (currentClass !== undefined) {
        const res = await ApiServices.getClassSlots({classID: currentClass._id, slotID: slot});
        setClassSlots(res.data);
        setPageLoading(false);
      }
    } catch (err) {
      console.log(err);
      notification.error({message: "Something error!"});
      setPageLoading(false);
    }
  }

  const getClassSlot = async () => {
    try {
      if (id !== "") {
        const res = await ApiService.getClassSlot(id);
        setSubject(res.data.subjectID._id);
        form.setFieldsValue({
          name: res.data.name,
          subject: res.data.subjectID.name,
          teacher: res.data.teacherID.name
        })
      }
    } catch (err) {
      console.log(err);
      notification.error({message: "Something error!"});
    }
  }

  useEffect(() => {
    getClassSlot().then(_ => {
    });
  }, [id])

  useEffect(() => {
    getClassSlotBySlots().then(_ => {
    });
  }, [currentClass, slot])

  useEffect(() => {
    getTeacherBySubject().then(_ => {
    });
  }, [subject])

  const showDeleteConfirm = (id) => {
    return (
      confirm({
        title: 'Are you sure delete this class slot?',
        content: 'This action can not undo, so do you want to delete?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          try {
            const res = await ApiService.deleteClassSlot(id);
            setClassSlots((state) => state.filter((x) => x._id !== res.data._id));
            notification.success({
              message: res.message
            })
          } catch (e) {
            console.log("e", e)
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    )
  }

  const onFinish = async (values) => {
    setConfirmLoading(true);
    const data = {
      name: values.name,
      slotID: slot,
      classID: currentClass._id,
      teacherID: values.teacher,
      subjectID: values.subject
    }

    try {
      if (mode === "ADD") {
        const res = await ApiServices.addClassSlot(data);
        if (res.status === 200) {
          notification.success({message: res.message});
          const newClassSlot = [...classSlots, res.data];
          setClassSlots(newClassSlot);
          setVisible(false);
          form.resetFields();
          setMode("")
          setSubject("");
          setConfirmLoading(false);
        } else {
          setConfirmLoading(false);
          notification.error({message: res.message});
        }
      }
      if (mode === "EDIT") {
        const res = await ApiServices.updateClassSlot(id, data);
        if (res.status === 200) {
          notification.success({message: "Update class slot success!"});
          const newClassSlots = classSlots.map(classSlot => {
            if (res?.data?._id === classSlot._id) {
              return res.data
            } else {
              return classSlot
            }
          });
          setClassSlots(newClassSlots)
          setVisible(false);
          form.resetFields();
          setMode("");
          setId("");
          setSubject("");
          setConfirmLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      notification.error({message: err});
      setConfirmLoading(false);
    }
  }

  const onSubmit = async (values) => {
    const data = {
      dateID: values.date,
      class_slotID: id,
    }
    try {
      const res = await ApiServices.addTimetable(data);
      notification.success({message: res.message});
      setId("");
      setOpen(false);
      form.resetFields();
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    if (slots.length > 0) {
      setSlot(slots[0]._id);
    }
  }, [slots])

  return (
    <Spin spinning={pageLoading} tip="Loading...">
      <Card>
        <Tabs
          onTabClick={(tab) => {
            setSlot(tab)
          }}
        >
          {slots.length > 0 && slots.map(slot => (
            <Tabs.TabPane tab={`Slot ${slot.slot}`} key={slot._id}/>
          ))}
        </Tabs>
        {
          classSlots.length !== 6 && (
            <div className="mb-3" style={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between"
            }}>
              <Button type="primary" icon={<AppstoreAddOutlined/>} onClick={() => {
                setVisible(true);
                setMode("ADD");
              }}>Create Class Slot</Button>
            </div>
          )
        }
        {classSlots.length > 0 ? (
          <Row gutter={16}>
            {
              classSlots.map((classSlot, index) => (
                <Col xs={24} sm={12} md={12} lg={6} xl={6} xxl={6} key={index}>
                  <Card size="small" key={index}>
                    <Flex alignItems="center" justifyContent="between">
                      <div>
                        <h4 className="mb-0">{classSlot?.name}</h4>
                      </div>
                      <EllipsisDropdown
                        menu={
                          <Menu>
                            <Menu.Item key="0" onClick={() => {
                              setVisible(true);
                              setMode("EDIT");
                              setId(classSlot._id)
                            }}>
                              <EditOutlined/>
                              <span>Update</span>
                            </Menu.Item>
                            <Menu.Item key="1" onClick={() => showDeleteConfirm(classSlot._id)}>
                              <DeleteOutlined/>
                              <span>Delete</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => {
                              setOpen(true);
                              setId(classSlot._id)
                            }}>
                              <FolderAddOutlined/>
                              <span>Add to timetable</span>
                            </Menu.Item>
                          </Menu>
                        }
                      />
                    </Flex>
                    <div className="mt-2">
                      <Flex alignItems="center">
                        <div className="mr-3">
                          <Tooltip title="Subject">
                            <BookOutlined className="text-muted font-size-md"/>
                            <span
                              className="ml-1 text-muted"
                              style={{textTransform: "capitalize"}}>{classSlot?.subjectID?.name}</span>
                          </Tooltip>
                        </div>
                      </Flex>
                    </div>
                    <div className="mt-2">
                      <Flex alignItems="center">
                        <div className="mr-3">
                          <Tooltip title="Teacher">
                            <UserOutlined className="text-muted font-size-md"/>
                            <span
                              className="ml-1 text-muted">{classSlot?.teacherID?.name}</span>
                          </Tooltip>
                        </div>
                      </Flex>
                    </div>
                  </Card>
                </Col>
              ))
            }
          </Row>
        ) : (
          <div>
            <Empty/>
          </div>
        )}
        <Modal
          visible={visible}
          title={mode === "ADD" ? "Add Class Slot" : "Edit Class Slot"}
          onCancel={() => {
            setVisible(false);
            setSubject("");
            form.resetFields();
          }}
          okText={mode === "ADD" ? "Add" : "Save"}
          confirmLoading={confirmLoading}
          okButtonProps={{form: 'add-class-slot', htmlType: 'submit'}}
        >
          <Form form={form} name="add-class-slot" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{required: true, message: 'Please select name!'}]}
            >
              <Select placeholder="Select name..." allowClear>
                {
                  dates.length > 0 && dates.map(date => (
                    <Select.Option style={{textTransform: "capitalize"}} key={date._id}
                                   value={date.name}>{date.name}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{required: true, message: 'Please select subject!'}]}
            >
              <Select placeholder="Select subject..." allowClear onChange={(value) => setSubject(value)}>
                {
                  subjects.length > 0 && subjects.map(subject => (
                    <Select.Option style={{textTransform: "capitalize"}} key={subject._id}
                                   value={subject._id}>{subject.name}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
            {
              (subject !== "" && teachers.length > 0) && (
                <Spin spinning={loading} tip="Loading...">
                  <Form.Item
                    label="Teacher"
                    name="teacher"
                    rules={[{required: true, message: 'Please select teacher!'}]}
                  >
                    <Select placeholder="Select teacher..." allowClear>
                      {
                        teachers.length > 0 && teachers.map(teacher => (
                          <Select.Option style={{textTransform: "capitalize"}} key={teacher._id}
                                         value={teacher._id}>{teacher.name}</Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </Spin>
              )
            }
          </Form>
        </Modal>
        <Modal
          visible={open}
          title="Add To Timetable"
          onCancel={() => {
            setVisible(false);
            setSubject("");
            form.resetFields();
          }}
          okText="Save"
          okButtonProps={{form: 'add-timetable', htmlType: 'submit'}}
        >
          <Form form={form} name="add-timetable" layout="vertical" onFinish={onSubmit}>
            <Form.Item
              label="Date"
              name="date"
              rules={[{required: true, message: 'Please select date!'}]}
            >
              <Select placeholder="Select date..." allowClear>
                {
                  dates.length > 0 && dates.map(date => (
                    <Select.Option
                      style={{textTransform: "capitalize"}}
                      key={date._id}
                      value={date._id}
                    >
                      {date.name}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </Spin>
  )
}

export default ClassSlot;