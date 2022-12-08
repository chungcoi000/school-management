import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import ApiService from "../../../services/ApiService";
import {Avatar, Card, Col, Empty, Form, Input, List, Menu, Modal, notification, Row, Spin, Typography} from "antd";
import {DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import ReactQuill from "react-quill";
import ApiServices from "../../../services/ApiService";
import EllipsisDropdown from "../../../components/shared-components/EllipsisDropdown";
import moment from "moment/moment";
import {Link} from "react-router-dom";

var modules = {
  toolbar: [
    [{size: ["small", false, "large", "huge"]}], // custom dropdown
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{font: []}],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{list: "ordered"}, {list: "bullet"}],
    [{indent: "-1"}, {indent: "+1"}], // outdent/indent
    [{direction: "rtl"}], // text direction

    [{color: []}, {background: []}], // dropdown with defaults from theme

    [{align: []}],
    ["image"],
    ["clean"], // remove formatting button
  ],
};

const Post = () => {
  const [visible, setVisible] = useState(false);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classInfo, setClassInfo] = useState(null);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const ref = useRef();
  const [mode, setMode] = useState("ADD");

  useEffect(async () => {
    let mounted = true;
    const res = await ApiServices.getSelfInformation();
    const response = await ApiServices.getUserClass();
    if (response.status !== 200) {
      notification.error({message: response.message});
    }
    if (mounted) {
      setUser(res.user);
      setClassInfo(response.data)
    }
    return () => mounted = false;
  }, [])

  const getPosts = async () => {
    if (classInfo !== null) {
      setLoading(true);
      try {
        const res = await ApiServices.getPosts({classID: classInfo?._id});
        const sortArray = res.data.sort((a, b) => moment(b.createdAt).format("x") - moment(a.createdAt).format("x"));
        setPostList(sortArray);
      } catch (err) {
        console.log(err)
        notification.error({message: "Something error"});
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts().then(_ => {
    });
  }, [classInfo])


  const getPost = async () => {
    if (id !== null) {
      try {
        const res = await ApiServices.getPost(id);
        if (res.status === 200) {
          form.setFieldsValue({
            title: res.data.title,
            content: res.data.content,
          })
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  }

  useEffect(() => {
    getPost().then(_ => {
    })
  }, [id]);

  const onFinish = async (values) => {
    const data = {
      classID: classInfo?._id,
      title: values.title,
      content: values.content,
    }
    try {
      if (mode === "ADD") {
        const res = await ApiServices.addPost(data);
        if (res.status === 200) {
          const newList = [res.data, ...postList];
          notification.success({message: res.message});
          console.log("res", res);
          setPostList(newList);
          setMode("");
          setVisible(false);
          form.resetFields();
        } else {
          notification.error({message: res.message});
        }
      }
      if (mode === "EDIT") {
        const res = await ApiServices.updatePost(id, {
          title: values.title,
          content: values.content,
        });
        if (res.status === 200) {
          const newList = postList.map(post => {
            if (res?.data?._id === post._id) {
              return res.data
            } else {
              return post
            }
          });
          notification.success({message: res.message});
          setPostList(newList);
          setVisible(false);
          setMode("");
          form.resetFields();
        } else {
          notification.error({message: res.message});
        }
      }
    } catch (err) {
      console.log("err");
    }
  }

  return (
    <Spin spinning={loading} tips="Loading....">
      <Row justify="center" gutter={16}>
        <Col sm={24} xs={24} md={24} lg={16} xl={12}>
          <Card>
            <div className="d-flex">
              <div>
                <Avatar icon={<UserOutlined/>} className="mr-3"/>
              </div>
              <Input placeholder="Add post..." disabled={user?.role === "teacher" ? false : true}
                     onClick={() => {
                       setVisible(true);
                       setMode("ADD");
                     }}/>
            </div>
          </Card>
          <Spin spinning={loading} tip={'Loading....'}>
            {postList.length !== 0 ? postList.map(data => {
              return (
                <Card
                  size="small"
                  bodyStyle={{
                    padding: "0 16px"
                  }}
                >
                  <List.Item
                    key={data._id}
                    extra={
                      user?.role === "teacher" ? <EllipsisDropdown menu={
                        <Menu>
                          <Menu.Item key="update" onClick={() => {
                            setMode("EDIT");
                            setVisible(true);
                            setId(data._id);
                          }}>
                            <EditOutlined/>
                            <span>Update Post</span>
                          </Menu.Item>
                          <Menu.Item key="delete" onClick={() => {
                            Modal.confirm({
                              title: "Are you sure to delete this post?",
                              content: "This action can not undo, are you sure to delete?",
                              onOk: async () => {
                                try {
                                  const res = await ApiService.deletePost(data._id);
                                  if (res.status === 200) {
                                    setPostList((state) => state.filter((x) => x._id !== res.data._id));
                                    notification.success({
                                      message: res.message
                                    })
                                  } else {
                                    notification.error({
                                      message: res.message
                                    })
                                  }
                                } catch (e) {
                                  console.log("e", e)
                                }
                              },
                              onCancel() {
                                console.log("Cancel")
                              }
                            })
                          }
                          }>
                            <DeleteOutlined/>
                            <span>Delete Post</span>
                          </Menu.Item>
                        </Menu>
                      }/> : null
                    }
                  >

                    <List.Item.Meta
                      avatar={<Avatar src={data?.authorID?.avatar} icon={<UserOutlined/>}/>}
                      title={<Link
                        to={
                          data?.authorID?._id !== user._id
                            ? `/app/profile/${data?.authorID?._id}`
                            : `/app/profile/me`
                        }
                      >
                        {data?.authorID?.name}
                      </Link>}
                      description={moment(data?.createdAt).fromNow()}
                    />
                  </List.Item>
                  <div style={{marginLeft: "15px", marginRight: "15px"}}>
                    <Typography.Title level={3}>{data?.title}</Typography.Title>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.content
                      }}
                      style={{overflow: "hidden", marginTop: 10, marginBottom: 30}}
                    />
                  </div>
                  {/*{props.data.image ? <Image src={props.data.image} style={{maxWidth: 550}}/> : null}*/}
                </Card>
              )
            }) : (<div>
              <Empty description="No post found"/>
            </div>)}
          </Spin>
        </Col>
      </Row>
      <Modal
        title={mode === "ADD" ? "Add post" : "Edit post"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        className="new-post"
        bodyStyle={{height: 450}}
        okText={mode === "ADD" ? "Add" : "Save"}
        okButtonProps={{form: 'post-form', htmlType: 'submit'}}
      >
        <Form form={form} layout="vertical" name="post-form" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{required: true, message: "Title is required"}]}
          >
            <Input placeholder="Input title"/>
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{required: true, message: "Content is required"}]}
          >
            <ReactQuill
              ref={(item) => (ref.current = item)}
              theme="snow"
              modules={modules}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Spin>
  )
}

export default Post
