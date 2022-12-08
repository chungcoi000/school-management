import {Button, Card, Form, Input, Modal, notification, Table, Tooltip} from "antd";
import {DeleteOutlined, FolderAddOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import ApiService from "../../services/ApiService";

const {confirm} = Modal;

const Subject = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const getSubjects = async (page) => {
    try {
      const res = await ApiService.getSubjects({page: page, limit: 10});
      console.log(res);
      setSubjects(res.data);
      setTotal(res.pagination.total);
      setCurrentPage(res.pagination.page);
    } catch (err) {
      console.log("err", err);
      notification.error({
        message: "Some error!"
      })
    }
  }

  useEffect(() => {
    getSubjects(currentPage).then(_ => {})
  }, [currentPage]);

  const addSubject = async (values) => {
    setLoading(true);
    try {
      const res = await ApiService.addSubject(values);
      if (res.status !== 200) {
        notification.error({
          message: res.message
        })
        return setLoading(false)
      }
      const newSubjects = [...subjects, res.data];
      setSubjects(newSubjects);
      setLoading(false)
      setVisible(false);
      form.resetFields();
      notification.success({
        message: res.message
      })
    } catch (err) {
      console.log("err", err);
    }
  }

  const columns = [
    {
      title: "Name",
      align: "center",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Slug",
      align: "center",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      key: "action",
      render: (_, record) => (
        <div className="text-right d-flex justify-content-center">
          <Tooltip title="Delete">
            <Button type="default" danger icon={<DeleteOutlined/>} onClick={() => showDeleteConfirm(record._id)}
                    size="small"/>
          </Tooltip>
        </div>
      )
    }
  ];

  const showDeleteConfirm = (id) => {
    return (
      confirm({
        title: 'Are you sure delete this subject?',
        content: 'This action can not undo, so do you want to delete?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: async () => {
          try {
            const res = await ApiService.deleteSubject(id);
            setSubjects((state) => state.filter((x) => x._id !== res.data._id));
            notification.success({
              message: res.message
            })
          } catch (e) {
            console.log("e", e)
          }
        },
      })
    )
  }

  return (
    <div>
      <div>
        <div className="mb-3" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
          <Button type="primary" icon={<FolderAddOutlined/>} onClick={() => {
            setVisible(true);
          }}>
            Add Subject
          </Button>
        </div>
        <Card>
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={subjects}
              pagination={{
                pageSize: 10,
                total,
                onChange: (page) => {
                  getSubjects(page);
                },
                current: currentPage,
              }}
            />
          </div>
        </Card>
      </div>
      <Modal
        visible={visible}
        title="Add Subject"
        onCancel={() => {
          setVisible(false)
          form.resetFields();
        }}
        okButtonProps={{form: 'subject-form-submit', htmlType: 'submit'}}
        confirmLoading={loading}
        okText={"Submit"}
      >
        <Form
          id='subject-form-submit'
          form={form}
          layout="vertical"
          onFinish={addSubject}
        >
          <Form.Item label="Subject Name" name="name" rules={[{required: true, message: 'Please input subject name!'}]}>
            <Input placeholder="Input Subject Name..."/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Subject;