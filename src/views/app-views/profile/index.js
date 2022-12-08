import React, {Component, useEffect, useState} from 'react'
import {Row, Col, Card, Avatar, Button, Menu, List, Divider, Spin} from 'antd';
import {Icon} from 'components/util-components/Icon'
import {
  MailOutlined,
  HomeOutlined,
  PhoneOutlined, DownOutlined, UserOutlined, CalendarOutlined
} from '@ant-design/icons';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import ApiServices from "../../../services/ApiService";
import moment from "moment";


const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const {id} = props.match.params;

  const getUserProfile = async () => {
    setLoading(true);
    try {
      if (id !== undefined) {
        const res = await ApiServices.getUser(id);
        setUser(res.data);
      } else {
        const res = await ApiServices.getSelfInformation();
        setUser(res.user);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserProfile().then(_ => {});
  }, [])

  return (
    <>
      <PageHeaderAlt background="/img/others/img-12.jpg" cssClass="bg-primary" overlap>
        <div className="container text-center">
          <div className="py-5 my-md-5">
          </div>
        </div>
      </PageHeaderAlt>
      <div className="container my-4">
        <Spin spinning={loading} tip={'Loading....'}>
          <Card>
            <Row justify="center">
              <Col sm={24} md={23}>
                <div className="d-md-flex">
                  <div className="rounded p-2 bg-white shadow-sm mx-auto"
                       style={{'marginTop': '-3.5rem', 'maxWidth': `166px`}}>
                    <Avatar shape="square" size={150} src="" icon={<UserOutlined/>}/>
                  </div>
                  <div className="ml-md-4 w-100">
                    <Flex alignItems="center" mobileFlex={false} className="mb-3 text-md-left text-center">
                      <h2 className="mb-0 mt-md-0 mt-2">{user?.name}</h2>
                    </Flex>
                    <Row gutter="16">

                      <Col xs={24} sm={24} md={12}>
                        <Row className="mb-2">
                          <Col xs={12} sm={12} md={9}>
                            <Icon type={MailOutlined} className="text-primary font-size-md"/>
                            <span className="text-muted ml-2">Email:</span>
                          </Col>
                          <Col xs={12} sm={12} md={15}>
                            <span className="font-weight-semibold">{user?.email}</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12} sm={12} md={9}>
                            <Icon type={PhoneOutlined} className="text-primary font-size-md"/>
                            <span className="text-muted ml-2">Phone:</span>
                          </Col>
                          <Col xs={12} sm={12} md={15}>
                            <span className="font-weight-semibold">{user?.phone ?? "No Information"}</span>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={24} sm={24} md={12}>
                        <Row className="mb-2 mt-2 mt-md-0 ">
                          <Col xs={12} sm={12} md={9}>
                            <Icon type={CalendarOutlined} className="text-primary font-size-md"/>
                            <span className="text-muted ml-2">Date of birth:</span>
                          </Col>
                          <Col xs={12} sm={12} md={15}>
                            <span className="font-weight-semibold">{moment(user?.dob).format("DD-MM-YYYY")}</span>
                          </Col>
                        </Row>
                        <Row className="mb-2">
                          <Col xs={12} sm={12} md={9}>
                            <Icon type={HomeOutlined} className="text-primary font-size-md"/>
                            <span className="text-muted ml-2">Address:</span>
                          </Col>
                          <Col xs={12} sm={12} md={15}>
                            <span className="font-weight-semibold">{user?.address ?? "No information"}</span>
                          </Col>
                        </Row>
                      </Col>

                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Spin>

      </div>
    </>
  )
}

export default Profile
