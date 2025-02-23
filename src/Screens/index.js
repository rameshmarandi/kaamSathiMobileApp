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
import EditProfile from './Account/EditProfile';
import ChangePassword from './Account/ChangePassword';
import HelpSupport from './Account/HelpSupport';
import PaymentHistory from './Account/PaymentHistory';
import PrivacyPolicy from './Account/PrivacyPolicy';
import ProfileDetails from './Account/ProfileDetails';

const UserAllScreens = {
  //Homepage
  HomePage,
  SearchOnMap,
  EmployeeFound,
  EmployeeProfileDetails,

  //Bookmark
  BookedHistory,
  BookMarks,

  //Account

  Profile,
  ProfileDetails,
  EditProfile,
  ChangePassword,
  HelpSupport,
  PaymentHistory,
  PrivacyPolicy,
};

const AdminScreens = {
  AdminDashboard,
  Approval,
};
export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
