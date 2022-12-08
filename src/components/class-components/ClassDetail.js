import {Avatar, Card, Form, Modal, Select, Space, Table, Tabs, Tag} from "antd";
import React, {lazy, useCallback, useEffect, useState} from "react";
import {GithubOutlined} from "@ant-design/icons";
import {Redirect, Route, useHistory, Switch, useRouteMatch} from "react-router-dom";
import {StudentList} from "./StudentList";
import Timetable2 from "../timetable-component/Timtable2";
import ApiServices from "../../services/ApiService";
import ClassSlot from "../timetable-component/ClassSlot";

const {TabPane} = Tabs;

const ClassDetail = () => {
  const history = useHistory();
  const {url, params} = useRouteMatch();
  const [currentClass, setCurrentClass] = useState("");

  const getClassDetail = useCallback(async () => {
    try {
      const res = await ApiServices.getClass(params?.id);
      setCurrentClass(res.data);
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  useEffect(() => {
    getClassDetail().then(_ => {
    });
  }, [])

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
                  <h2 className="mb-1 mr-2">{currentClass?.name}</h2>
                </div>
                <p
                  className="text-muted mb-2"
                  style={{fontSize: 16, fontWeight: 500, lineHeight: 1}}
                >
                  Form Teacher: {currentClass?.formTeacher?.name}
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
                    {currentClass?.unit?.name}
                  </div>
                  <span className="text-muted" style={{fontSize: 15, fontWeight: 600}}>Unit</span>
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
                    {currentClass?.student?.length}
                  </div>
                  <span className="text-muted" style={{fontSize: 15, fontWeight: 600}}>Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div id="project-tab" style={{transform: "translateY(-47px)"}}>
        <Tabs
          onTabClick={(tab) => {
            history.push(`${url}/${tab}`);
          }}
          defaultActiveKey="student-list"
        >
          <TabPane tab="Student list" key={`student-list`}></TabPane>
          <TabPane tab="Class Slot" key={`class-slot`}></TabPane>
          <TabPane tab="Timetable" key={`timetable`}></TabPane>
        </Tabs>
        <Switch>
          <Route path={`${url}/student-list`}>
            <StudentList currentClass={currentClass}/>
          </Route>
          <Route path={`${url}/class-slot`}>
            <ClassSlot currentClass={currentClass}/>
          </Route>
          <Route path={`${url}/timetable`}>
            <Timetable2 currentClass={currentClass}/>
          </Route>
          <Redirect from={`${url}`} to={`${url}/student-list`}/>
        </Switch>
      </div>
    </div>

  )
}

export default ClassDetail