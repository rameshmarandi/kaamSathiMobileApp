// Users Screens

import HomePage from './User/HomePage/index';

// Admin Dashboard

import AdminDashboard from './Admin/AdminDashboard/index';
import Approval from './Admin/Approval/index';
import SearchOnMap from './User/GoogleMap/SearchOnMap';

const UserAllScreens = {
  HomePage,
  SearchOnMap,
};

const AdminScreens = {
  AdminDashboard,
  Approval,
};
export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
