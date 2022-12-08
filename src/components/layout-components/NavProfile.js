import React, {useEffect, useState} from "react";
import {Menu, Dropdown, Avatar, notification} from "antd";
import { connect } from 'react-redux'
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined, UserOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'redux/actions/Auth';
import ApiServices from "../../services/ApiService";
import {useHistory} from "react-router-dom";

const menuItem = [
	{
		title: "Profile",
		icon: UserOutlined ,
		path: "/app/profile/me"
    }, {
    title: "Change Password",
    icon: SettingOutlined,
    path: "/app/security"
  }
]

export const NavProfile = () => {
  const history = useHistory();
  const profileImg = "/img/avatars/thumb-1.jpg";
  const [user, setUser] = useState();
  const logOut = async () => {
    const res = await ApiServices.logout();
    if (res.status === 200) {
      history.replace("/auth/login");
    }
  }

  useEffect(async () => {
    let mounted = true;
    const res = await ApiServices.getSelfInformation();
    if (mounted) {
      setUser(res.user);
    }
    return () => mounted = false;
  }, [])

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={user?.avatar} icon={<UserOutlined />} />
          <div className="pl-3">
            <h4 className="mb-0">{user?.name}</h4>
            <span className="text-muted">{user?.role}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={e => logOut()}>
            <span>
              <LogoutOutlined className="mr-3"/>
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={user?.avatar} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile
