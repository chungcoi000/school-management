import {Calendar} from "antd";
import {useSelector} from "react-redux";
import store from "../../../redux/store";

const Home = () => {
  // const user = useSelector(state => state.user);
  const user = store.getState();
  console.log("user321", user);
  return (
    <Calendar />
  )
}

export default Home
