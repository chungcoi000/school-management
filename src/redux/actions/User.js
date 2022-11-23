import { SET_USER_DATA } from "../constants/User";
import store from "../store";

export const setUserData = (userData) => {
  return store.dispatch({
    type: SET_USER_DATA,
    payload: userData,
  })
}