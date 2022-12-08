import React, {lazy, Suspense, useEffect, useState} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import {APP_PREFIX_PATH} from 'configs/AppConfig'
import UserForm from "../../components/user-components/UserForm";
import EditUser from "../../components/user-components/EditUser";
import ClassTimetable from "../../components/timetable-component/ClassTimetable";
import TeacherTimetable from "../../components/timetable-component/TeacherTimetable";
import ApiServices from "../../services/ApiService";
import Attendance from "./attendance";
import ClassOverview from "../../components/class-components/ClassOverview";

export const AppViews = () => {
  const [user, setUser] = useState(null);
  useEffect(async () => {
    let mounted = true;
    const res = await ApiServices.getSelfInformation();
    if (mounted) {
      setUser(res.user);
    }
    return () => mounted = false;
  }, []);

  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))}/>
        <Route path={`${APP_PREFIX_PATH}/class-timetable`} component={ClassTimetable}/>
        <Route path={`${APP_PREFIX_PATH}/profile/me`} component={lazy(() => import(`./profile`))}/>
        <Route path={`${APP_PREFIX_PATH}/profile/:id`} component={lazy(() => import(`./profile`))}/>
        <Route path={`${APP_PREFIX_PATH}/security`} component={lazy(() => import(`./security`))}/>
        <Route path={`${APP_PREFIX_PATH}/class/:id`} component={ClassOverview}/>
        <Route path={`${APP_PREFIX_PATH}/class`} component={lazy(() => import(`./class`))}/>
        <Route path={`${APP_PREFIX_PATH}/attendance`} component={Attendance}/>
        {
          user?.role === "admin" && (
            <>
              <Route path={`${APP_PREFIX_PATH}/add-user`} component={UserForm}/>
              <Route path={`${APP_PREFIX_PATH}/edit-user/:id`} component={EditUser}/>
              <Route path={`${APP_PREFIX_PATH}/manage-system`} component={lazy(() => import(`./manage-system`))}/>
            </>
          )
        }
        {
          user?.role === "teacher" && (
            <Route path={`${APP_PREFIX_PATH}/teacher-timetable`} component={TeacherTimetable}/>
          )
        }
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`}/>
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);