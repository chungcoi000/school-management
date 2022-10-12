import {Avatar, Button, Card, Pagination, Table, Tabs, Tooltip} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const ManageClass = () => {
  const history = useHistory();

  const classes = [
    {id: 1, name: "10a1", formTeacher: "Nguyen Van A", unit: "10", studentNumber: 30},
    {id: 2, name: "10a2", formTeacher: "Nguyen Van B", unit: "10", studentNumber: 35},
    {id: 3, name: "10a3", formTeacher: "Nguyen Van C", unit: "10", studentNumber: 40},
  ]

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
      key: "name",
    },
    {
      title: "Form Teacher",
      align: "center",
      dataIndex: "formTeacher",
      key: "formTeacher",
    },{
      title: "Total Student",
      align: "center",
      dataIndex: "studentNumber",
      key: "studentNumber",
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
                    onClick={() => history.push(`/app/manage-system/class-detail`)}
            />
          </Tooltip>
          <Tooltip title="Add Form Teacher">
            <Button className="mr-2" icon={<UserAddOutlined/>} size="small"/>
          </Tooltip>
          <Tooltip title="Add Students">
            <Button className="mr-2" icon={<UsergroupAddOutlined/>} size="small"/>
          </Tooltip>
          <Tooltip title="Update">
            <Button type="info" className="mr-2" icon={<EditOutlined/>} size="small" onClick={() => {
            }}/>
          </Tooltip>
        </div>
      )
    }
  ];
  return (
    <Card>
      <Tabs>
        <Tabs.TabPane key={0} tab="Unit 10">
          <div className="table-responsive">
            <Table
              columns={columns}
              dataSource={classes}
              rowKey={record => record._id}
              pagination={true}
              />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key={1} tab="Unit 11">
          <span>Khoi 11</span>
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab="Unit 12">
          <span>Khoi 12</span>
        </Tabs.TabPane>
      </Tabs>
    </Card>
  )
}

export default ManageClass;