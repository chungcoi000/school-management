import {Avatar, Button, Card, Form, Input, Modal, notification, Pagination, Select, Table, Tabs, Tooltip} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined, FolderAddOutlined,

} from "@ant-design/icons";
import {Link, useHistory} from "react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import ApiServices from "../../services/ApiService";
import IntlMessage from "../util-components/IntlMessage";
import ApiService from "../../services/ApiService";

const {confirm} = Modal;

const ManageClass = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [classes, setClasses] = useState([]);
  const [total, setTotal] = useState(10);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [units, setUnits] = useState([]);
  const [form] = Form.useForm();
  const inputRef = useRef();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let mounted = true;
    ApiServices.getUnits().then(response => {
      if (mounted) {
        setUnits(response.data);
      }
    })
    return () => mounted = false;
  }, []);

  const handleChangeValueSearchUser = async (value) => {
    if (inputRef.current) {
      clearTimeout(inputRef.current);
    }
    inputRef.current = setTimeout(() => {
      handleSearchUser(value);
    }, 400);
  }

  const getClass = async () => {
    try {
      if (id !== null) {
        const res = await ApiServices.getClass(id);
        form.setFieldsValue({
          name: res.data.name,
          unit: res.data.unit._id,
          formTeacher: res.data.formTeacher
        })
      }
    } catch (err) {
      console.log("err", err);
    }
  }

  useEffect(() => {
    getClass().then(_ => {
    })
  }, [id])

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

  const getClasses = useCallback(async (page) => {
    try {
      const res = await ApiServices.getClasses({page: page, limit: 10});
      if (res.status === 200) {
        setClasses(res.data);
        setCurrentPage(res.pagination.page);
        setTotal(res.pagination.total);
      }
    } catch (err) {
      console.log("err", err);
      notification.error({message: "Something error!"})
    }
  }, []);

  const onFinish = async (value) => {
    setLoading(true);
    const data = {
      name: value.name,
      unit: value.unit,
      formTeacher: value.formTeacher.value
    }
    try {
      if (mode === "ADD") {
        const res = await ApiServices.addClass(data);
        if (res.status === 200) {
          const newClass = [...classes, res.data];
          setClasses(newClass);
          notification.success({message: res.message})
          setLoading(false)
          setOpen(false);
          setMode("");
          form.resetFields();
        } else {
          setLoading(false)
          notification.error({
            message: res.message
          })
        }
      }
      if (mode === "EDIT" && id !== null) {
        const res = await ApiServices.updateClass(id, data);
        if (res.status === 200) {
          const newClass = classes.map(classes => {
            if (res?.data?._id === classes._id) {
              return res.data
            } else {
              return classes
            }
          });
          setClasses(newClass);
          setOpen(false);
          setLoading(false)
          setMode('');
          form.resetFields();
          notification.success({
            message: res.message
          })
        } else {
          setLoading(false);
          notification.error({
            message: res.message
          })
        }
      }
    } catch (e) {
      console.log("e", e);
      setLoading(false);
      notification.error({message: "Action failed!!"})
    }
  }

  useEffect(() => {
    getClasses(currentPage).then(_ => {
    });
  }, [currentPage]);

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
      render: (record) => (
        <p>{record?.name}</p>
      )
    },
    {
      title: "Form Teacher",
      align: "center",
      dataIndex: "formTeacher",
      key: "formTeacher",
      render: (record) => (
        <p>{record?.name}</p>
      )
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
                    onClick={() => history.push(`/app/manage-system/class-detail/` + record._id)}
            />
          </Tooltip>
          <Tooltip title="Update">
            <Button type="info" className="mr-2" icon={<EditOutlined/>} size="small" onClick={() => {
              setOpen(true);
              setMode("EDIT");
              setId(record._id)
            }}/>
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="info" danger className="mr-2" icon={<DeleteOutlined/>} size="small"
                    onClick={() => showDeleteConfirm(record._id)}/>
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
          try {
            const res = await ApiService.deleteClass(classId);
            setClasses((state) => state.filter((x) => x._id !== res.data._id));
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
          <Table
            columns={columns}
            dataSource={classes}
            rowKey={record => record._id}
            pagination={{
              pageSize: 10,
              total,
              onChange: (page) => {
                getClasses(page).then(_ => {
                });
              },
              current: currentPage,
            }}/>
        </div>
      </Card>
      <Modal
        visible={open}
        title={mode === "ADD" ? "Add Class" : "Edit Class"}
        onCancel={() => {
          setOpen(false)
          form.resetFields();
          setMode("");
        }}
        okButtonProps={{form: 'class-form-submit', htmlType: 'submit'}}
        confirmLoading={loading}
        okText={mode === "ADD" ? "Submit" : "Save"}
      >
        <Form
          id='class-form-submit'
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item label="Class Name" name="name" rules={[{required: true, message: 'Please input class name!'}]}>
            <Input placeholder="Input Subject Name..."/>
          </Form.Item>
          <Form.Item label="Unit" name="unit" rules={[{required: true, message: 'Please select Unit!'}]}>
            <Select placeholder="Select form teacher...">
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
          <Form.Item
            label="Form Teacher"
            name="formTeacher"
            rules={[{required: true, message: 'Please select form teacher!'}]}>
            <Select
              allowClear
              showSearch
              labelInValue
              showArrow={false}
              dropdownClassName="nav-search-dropdown"
              placeholder="Search teacher..."
              filterOption={false}
              onSearch={handleChangeValueSearchUser}
            >
              {options.map(option => (
                <Select.Option
                  key={option.value}
                  value={option.value}
                  title={option.username}
                >
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ManageClass;