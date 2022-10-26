import {Link} from "react-router-dom";
import {Menu} from "antd";
import {ReadOutlined, UserOutlined} from "@ant-design/icons";

export const ManageMenu = (props) => {
  const {match, location} = props;

  return (
    <div className="w-100">

      <Menu
        defaultSelectedKeys={[`${match.url}/manage-user`]}
        mode="inline"
        selectedKeys={[location.pathname]}
      >
        <Menu.Item key={`${match.url}/manage-user`}>
          <UserOutlined />
          <span>Manage User</span>
          <Link to={`${match.url}/manage-user`}/>
        </Menu.Item>
        <Menu.Item key={`${match.url}/manage-class`}>
          <ReadOutlined />
          <span>Manage Class</span>
          <Link to={`${match.url}/manage-class`}/>
        </Menu.Item>
        <Menu.Item key={`${match.url}/manage-timetable`}>
          <ReadOutlined />
          <span>Manage Timetable</span>
          <Link to={`${match.url}/manage-timetable`}/>
        </Menu.Item>
      </Menu>
    </div>
  )
}
