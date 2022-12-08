import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ManageUser from "../user-components/ManageUser";
import ManageClass from "../class-components/ManageClass";
import ClassDetail from "../class-components/ClassDetail";
import Subject from "../subject-components/Subject";


export const ManagePageContent = ({match}) => {
  return (
    <Switch>
      <Route path={`${match.url}/manage-user`} component={ManageUser}/>
      <Route path={`${match.url}/manage-class`} component={ManageClass}/>
      <Route path={`${match.url}/class-detail/:id`} component={ClassDetail}/>
      <Route path={`${match.url}/manage-subject`} component={Subject} />
      <Redirect from={`${match.url}`} to={`${match.url}/manage-user`}/>
    </Switch>
  )
}
