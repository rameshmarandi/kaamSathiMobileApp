// Users Screens

import HomePage from './User/HomePage/index';

// Admin Dashboard

import AdminDashboard from './Admin/AdminDashboard/index';
import Approval from './Admin/Approval/index';
import SearchOnMap from './User/GoogleMap/SearchOnMap';
import EmployeeFound from './User/GoogleMap/EmployeeFound';
import EmployeeProfileDetails from './User/GoogleMap/EmployeeProfileDetails';

const UserAllScreens = {
  HomePage,
  SearchOnMap,
  EmployeeFound,
  EmployeeProfileDetails,
};

const AdminScreens = {
  AdminDashboard,
  Approval,
};
export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
