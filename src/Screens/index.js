// Users Screens

import HomePage from './User/HomePage/index';

// Admin Dashboard

import AdminDashboard from './Admin/AdminDashboard/index';
import Approval from './Admin/Approval/index';
import SearchOnMap from './User/GoogleMap/SearchOnMap';
import EmployeeFound from './User/GoogleMap/EmployeeFound';
import EmployeeProfileDetails from './User/GoogleMap/EmployeeProfileDetails';
import Profile from './Account/Profile';
import BookedHistory from './Booked/BookedHistory';
import BookMarks from './Booked/BookMarks';

const UserAllScreens = {
  HomePage,
  SearchOnMap,
  EmployeeFound,
  EmployeeProfileDetails,
  Profile,
  BookedHistory,
  BookMarks,
};

const AdminScreens = {
  AdminDashboard,
  Approval,
};
export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
