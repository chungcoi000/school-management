import {
  CalendarOutlined,
  DashboardOutlined, FileMarkdownOutlined, HomeOutlined, UsergroupAddOutlined
} from '@ant-design/icons';
import {APP_PREFIX_PATH} from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'home',
  path: `${APP_PREFIX_PATH}/home`,
  title: 'Home',
  icon: HomeOutlined,
  breadcrumb: false,
  submenu: []
}, {
  key: 'post',
  path: `${APP_PREFIX_PATH}/class`,
  title: 'Post',
  icon: FileMarkdownOutlined,
  breadcrumb: false,
  submenu: []
}, {
  key: 'timetable',
  path: `${APP_PREFIX_PATH}/timetable`,
  title: 'Timetable',
  icon: CalendarOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'teacherTimetable',
      path: `${APP_PREFIX_PATH}/teacher-timetable`,
      title: 'Teacher Timetable',
      icon: CalendarOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'classTimetable',
      path: `${APP_PREFIX_PATH}/class-timetable`,
      title: 'Class Timetable',
      icon: CalendarOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}, {
  key: 'attendance',
  path: `${APP_PREFIX_PATH}/attendance`,
  title: 'Attendance',
  icon: UsergroupAddOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
