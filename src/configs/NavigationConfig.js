import {
  CalendarOutlined,
  DashboardOutlined, HomeOutlined
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
  key: 'class',
  path: `${APP_PREFIX_PATH}/class`,
  title: 'Class',
  icon: HomeOutlined,
  breadcrumb: false,
  submenu: []
}, {
  key: 'timetable',
  path: `${APP_PREFIX_PATH}/timetable`,
  title: 'Timetable',
  icon: CalendarOutlined,
  breadcrumb: false,
  submenu: []
}]

const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
