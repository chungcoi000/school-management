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
    return request("/auth/login", "post", data, false);
  }

  static logout() {
    return request("/auth/logout", "post", {}, false)
  }

  static getStudents(queries) {
    return request("/users/getStudents", "get", queries, false);
  }

  static getParents(queries) {
    return request("/users/getParents", "get", queries, false);
  }

  static getTeachers(queries) {
    return request("/users/getTeachers", "get", queries, false);
  }

  static getTeacherBySubject(id) {
    return request("/users/getTeacherBySubject/" + id, "get", {}, false);
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

  static searchUserByUnit(id, queries) {
    return request("/users/getUserByUnit/" + id, "get", queries, false);
  }

  static uploadAvatar(data) {
    return request("/users/updateAvatar", "post", data, true);
  }

  static searchUser(queries) {
    return request("/users/search", "get", queries, false);
  }

  static getClasses(queries) {
    return request("/class", "get", queries, false);
  }

  static getClass(id) {
    return request("/class/" + id, "get", {}, false);
  }

  static addClass(data) {
    return request("/class/add", "post", data, false);
  }

  static updateClass(id, data) {
    return request("/class/update/" + id, "post", data, false);
  }

  static deleteClass(id) {
    return request("/class/delete/" + id, "delete", {}, false);
  }

  static getClassByUnit(queries) {
    return request("/class/getClassByUnit", "get", queries, false);
  }

  static updateStudentToClass(data) {
    return request("/class/updateStudent", "post", data, false);
  }

  static getStudentFromClass(id) {
    return request("/users/getUserByClass/" + id, "get", {}, false);
  }

  static getUserClass() {
    return request("/class/getClass", "get", {}, false);
  }

  static getClassSlots(queries) {
    return request("/class-slots/", "get", queries, false);
  }

  static getClassSlot(id) {
    return request("/class-slots/" + id, "get", {}, false);
  }

  static addClassSlot(data) {
    return request("/class-slots/add", "post", data, false);
  }

  static updateClassSlot(id, data) {
    return request("/class-slots/update/" + id, "post", data, false);
  }

  static deleteClassSlot(id) {
    return request("/class-slots/delete/" + id, "delete", {}, false);
  }

  static getStudentClassSlot() {
    return request("/class-slots/slot-student", "get", {}, false);
  }

  static getSubjects(queries) {
    return request("/subjects", "get", queries, false);
  }

  static addSubject(data) {
    return request("/subjects/add", "post", data, false);
  }

  static deleteSubject(id) {
    return request("/subjects/delete/" + id, "delete", {}, false);
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

  static getDates() {
    return request("/dates", "get", {}, false);
  }

  static getSlots() {
    return request("/slots", "get", {}, false);
  }

  static getPost(id) {
    return request("/posts/" + id, "get", {}, false);
  }

  static getPosts(queries) {
    return request("/posts", "get", queries, false);
  }

  static addPost(data) {
    return request("/posts/add", "post", data, false);
  }

  static updatePost(id, data) {
    return request("/posts/update/" + id, "post", data, false);
  }

  static deletePost(id) {
    return request("/posts/delete/" + id, "delete", {}, false);
  }

  static addTimetable(data) {
    return request("/timetable/add", "post", data, false);
  }

  static getClassTimetable(id) {
    return request("/timetable/" + id, "get", {}, false);
  }

  static getStudentTimetable() {
    return request("/timetable/get/student-timetable", "get", {}, false);
  }

  static getFormTeacherTimetable() {
    return request("/timetable/get/form-teacher-timetable", "get", {}, false);
  }

  static getTeacherTimetable() {
    return request("/timetable/get/teacher-timetable", "get", {}, false);
  }

  static getSelfInformation() {
    return request("/profile", "get", {}, false)
  }

  static updatePassword(data) {
    return request("/users/updatePassword", "post", data, false);
  }

  static takeAttendance(data) {
    return request("/attendances/takeAttendance", "post", data, false);
  }

  static getAttendance(queries) {
    return request("/attendances/viewAttendance", "get", queries, false);
  }
}

export default ApiServices;

