import React, {Suspense, useEffect} from "react";
import {Route, Switch, Redirect, withRouter, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import AppLocale from "lang";
import {IntlProvider} from "react-intl";
import {ConfigProvider} from 'antd';
import {APP_PREFIX_PATH, AUTH_PREFIX_PATH} from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';
import Loading from "../components/shared-components/Loading";

const LoadData = () => {
  const history = useHistory();
  useEffect(() => {
    return history.replace(`${AUTH_PREFIX_PATH}/login`);
  }, []);

  return <></>
}

export const Views = (props) => {
  const {locale, location, direction} = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  const LoadingData = () => (
    <div style={{display: 'flex', position: 'fixed', top: 0, left: 0, bottom: 0, right: 0}}>
      <div style={{margin: 'auto'}}>
        <Loading>Hello</Loading>
        <p>Loading Data ...</p>
      </div>
    </div>
  )

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Suspense fallback={<LoadingData/>}>
          {/*<LoadData/>*/}
          <Switch>
            <Route exact path="/">
              <Redirect to={APP_PREFIX_PATH}/>
            </Route>
            <Route path={AUTH_PREFIX_PATH}>
              <AuthLayout direction={direction}/>
            </Route>
            <Route path={APP_PREFIX_PATH}>
              <AppLayout direction={direction} location={location}/>
            </Route>
          </Switch>
        </Suspense>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({theme, auth}) => {
  const {locale, direction} = theme;
  const {token} = auth;
  return {locale, token, direction}
};

export default withRouter(connect(mapStateToProps)(Views));