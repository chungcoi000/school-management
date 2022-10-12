import axios from "axios";
import {API_BASE_URL} from "../configs/AppConfig";

const axiosService = axios.create({
    timeout: 15000,
    baseURL: API_BASE_URL,
});

const dataQuery = (data) => {
    if (!data && Object.keys(data).length > 0) return "";
    return Object.keys(data).reduce((result, x) => {
        return (result += `${x}=${data[x]}&`);
    }, "?");
};

const request = (endpoint, method, data, isFormData) => {
    return new Promise((resolve, reject) => {
        const url = method.toUpperCase() === "GET" ? endpoint + dataQuery(data) : endpoint;
        const _data = method.toUpperCase() === "GET" ? {} : data;
        const headers = isFormData
            ? {"Content-Type": "multipart/form-data"}
            : {"Content-Type": "application/json"};
        axiosService
            .request({
                method,
                url,
                data: _data,
                headers,
            })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};

class ApiServices {

}

export default ApiServices;

