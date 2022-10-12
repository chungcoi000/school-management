import InnerAppLayout from "../../../layouts/inner-app-layout";
import {ManagePageContent} from "../../../components/manage-components/ManagePageContent";
import {ManageMenu} from "../../../components/manage-components/ManageMenu";

const ManageSystem = (props) => {
  return (
    <>
      <InnerAppLayout
        sideContent={<ManageMenu {...props}/>}
        mainContent={<ManagePageContent {...props}/>}
      />
    </>
  )
}

export default ManageSystem;