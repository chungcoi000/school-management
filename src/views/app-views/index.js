import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'
import UserForm from "../../components/user-components/UserForm";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/home`} component={lazy(() => import(`./home`))} />
        <Route path={`${APP_PREFIX_PATH}/manage-system`} component={lazy(() => import(`./manage-system`))} />
        <Route path={`${APP_PREFIX_PATH}/add-user`} component={UserForm} />
        <Route path={`${APP_PREFIX_PATH}/edit-user/:id`} component={UserForm} />
        <Route path={`${APP_PREFIX_PATH}/timetable`} component={UserForm} />
        <Route path={`${APP_PREFIX_PATH}/class`} component={UserForm} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);