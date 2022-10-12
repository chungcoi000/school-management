import React from 'react';
import {FolderOpenOutlined} from '@ant-design/icons';
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

const NavManage = () => {
  const history = useHistory();

  return (
    <div key="panel">
      <FolderOpenOutlined
        onClick={() => history.replace("/app/manage-system")}
        className="nav-icon mr-3"
        style={{cursor: "pointer"}}/>
    </div>
  );
}

const mapStateToProps = ({theme}) => {
  const {locale} = theme;
  return {locale}
};

export default connect(mapStateToProps)(NavManage);
