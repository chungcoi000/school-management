import axios from "axios";
import {API_BASE_URL} from "../configs/AppConfig";

axios.defaults.withCredentials = true;

const axiosService = axios.create({
  timeout: 300000,
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
  static login(data) {
    return request("/auth/login", "post", data);
  }

  static getStudents(queries) {
    return request("/users/getStudents", "get", queries, false);
  }

  static getParents(queries) {
    return request("/users/getParents", "get", queries, false);
  }

  static getTeachers(queries) {
    return request("/users/getStudents", "get", queries, false);
  }

  static getUser(id) {
    return request("/users/" + id, "get", false);
  }

  static addUser(data) {
    return request("/users/add", "post", data, false);
  }

  static updateUser(id, data) {
    return request("/users/update/" + id, "post", data, false);
  }

  static deleteUser(id) {
    return request("/users/delete/" + id, "delete", {}, false);
  }

  static uploadAvatar(data) {
    return request("/users/updateAvatar", "post", data, true);
  }

  static searchUser(queries) {
    return request("/users/search", "get", queries);
  }

  static getClasses(queries) {
    return request("/class", "get", queries);
  }

  static getClass(id) {
    return request("/class/" + id, "get");
  }

  static addClass(data) {
    return request("/class/add", "post", data);
  }

  static updateClass(id, data) {
    return request("/class/update/" + id, "post", data);
  }

  static deleteClass(id) {
    return request("/class/delete/" + id, "delete");
  }

  static getClassByUnit(queries) {
    return request("/class/getClassByUnit", "get", queries);
  }

  static createTimetable(data) {
    return request("/timetable/create-timetable", "post", data);
  }

  static getStudentTimetable() {
    return request("/timetable/student-timetable", "get");
  }

  static getFormTeacherTimetable() {
    return request("/timetable/form-teacher-timetable", "get");
  }

  static getTeacherTimetable() {
    return request("/timetable/teacher-timetable", "get");
  }

  static getClassSlot(slug) {
    return request("/class-slots/" + slug, "get");
  }

  static addClassSlot(data) {
    return request("/class-slots/add", "post", data);
  }

  static updateClassSlot(slug, data) {
    return request("/class-slots/update/" + slug, "post", data);
  }

  static deleteClassSlot(slug) {
    return request("/class-slots/delete/" + slug, "delete");
  }

  static getStudentClassSlot() {
    return request("/class-slots/slot-student" , "get");
  }

  static getSubjects(queries) {
    return request("/subjects", "get", queries, false);
  }

  static addSubject(data) {
    return request("/subjects/add", "post", data, false);
  }

  static updateSubject(slug, data) {
    return request("/subjects/update/" + slug, "post", data);
  }

  static deleteSubject(slug) {
    return request("/subjects/delete/" + slug, "delete", false);
  }

  static getRoles() {
    return request("/roles", "get", {}, false);
  }

  static getAllSubjects() {
    return request("/subjects/all", "get", {}, false);
  }

  static getUnits() {
    return request("/units", "get", {}, false);
  }

}

export default ApiServices;

