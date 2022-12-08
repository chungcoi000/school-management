import axios from "axios";
import {API_BASE_URL} from "../configs/AppConfig";

export const uploadAvatar = (file) => {
  return new Promise(async (resolve, reject) => {
    axios
      .post(API_BASE_URL + '/users/updateAvatar', file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};