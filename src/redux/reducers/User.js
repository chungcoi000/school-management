import { SET_USER_DATA, CHANGE_USER_DATA } from "../constants/User";

const initialState = {
  address: "",
  dob: "",
  email: "",
  name: "",
  _id: "",
  identityNumber: "",
  phone: "",
  gender: "",
  role: "",
  avatar: "",
  token: "",
  password: "",
  class: "",
  child: "",
  subject: "",
  unit: "",
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      return {
        ...action.payload,
      }

    default:
      return state;
  }
}

export default reducer;
