import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ManageUser from "../user-components/ManageUser";
import ManageClass from "../class-components/ManageClass";
import UserForm from "../user-components/UserForm";
import ClassDetail from "../class-components/ClassDetail";


export const ManagePageContent = ({match}) => {
  return (
    <Switch>
      <Route path={`${match.url}/manage-user`} component={ManageUser}/>
      <Route path={`${match.url}/manage-class`} component={ManageClass}/>
      <Route path={`${match.url}/class-detail`} component={ClassDetail}/>
      <Redirect from={`${match.url}`} to={`${match.url}/manage-user`}/>
    </Switch>
  )
}
