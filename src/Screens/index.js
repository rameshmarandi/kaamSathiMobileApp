// Users Screens

import HomePage from './User/HomePage/index';

// Admin Dashboard

import AdminDashboard from './Admin/AdminDashboard/index';
import Approval from './Admin/Approval/index';
const UserAllScreens = {
  HomePage,
};

const AdminScreens = {
  AdminDashboard,
  Approval,
};
export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
