import {Avatar, Card, Form, Modal, Select, Space, Table, Tabs, Tag} from "antd";
import React, {lazy, useState} from "react";
import {GithubOutlined} from "@ant-design/icons";
import {Redirect, Route, useHistory, Switch} from "react-router-dom";
import {StudentList} from "./StudentList";
import Timetable2 from "../timetable-component/Timtable2";

const { TabPane } = Tabs;

const ClassDetail = (props) => {
  const history = useHistory();
  return (
    <div>
      <Card className="mb-0" style={{paddingBottom: 50}}>
        <div className="d-block d-md-flex">
          <div className="d-flex justify-content-center mb-2 mb-lg-0 mr-4">
            <Avatar
              size={150}
              icon={<GithubOutlined/>}
              shape={"square"}
            />
          </div>
          <div className="flex-grow-1 d-flex flex-column justify-content-between">
            <div className="d-block d-lg-flex">
              <div className="flex-grow-1">
                <div className="d-flex align-items-center">
                  <h2 className="mb-1 mr-2">10A1</h2>
                </div>
                <p
                  className="text-muted mb-2"
                  style={{ fontSize: 16, fontWeight: 500, lineHeight: 1 }}
                >
                  Form Teacher:
                </p>
              </div>
            </div>
            <div className="d-block d-md-flex align-items-center">
              <div className="d-block d-md-flex">
                <div
                  className="p-2"
                  style={{
                    borderRadius: 10,
                    border: "1px dashed #8888",
                    minWidth: 140,
                  }}
                >
                  <div style={{fontSize: 18, fontWeight: 600}}>
                    0
                  </div>
                  <span className="text-muted" style={{fontSize: 15, fontWeight: 600}}>Teacher</span>
                </div>

                <div
                  className="mx-md-2 my-2 my-md-0 p-2"
                  style={{
                    borderRadius: 10,
                    border: "1px dashed #8888",
                    minWidth: 140,
                  }}
                >
                  <div style={{fontSize: 18, fontWeight: 600}}>
                    0
                  </div>
                  <span className="text-muted" style={{fontSize: 15, fontWeight: 600}}>Students</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Card>
      <div id="project-tab" style={{ transform: "translateY(-47px)" }}>
        <Tabs
          onTabClick={(tab) => {
            history.push(`/app/manage-system/class-detail/${tab}`);
          }}
          defaultActiveKey="student-list"
        >
          <TabPane tab="Student list" key={`student-list`}></TabPane>
          <TabPane tab="Timetable" key={`timetable`}></TabPane>
        </Tabs>
        <Switch>
          <Route path={`/app/manage-system/class-detail/student-list`} component={StudentList}/>
          <Route path={`/app/manage-system/class-detail/timetable`} component={Timetable2}/>
          <Redirect from={"/app/manage-system/class-detail"} to={"/app/manage-system/class-detail/student-list"}/>
        </Switch>
      </div>
    </div>

  )
}

export default ClassDetail