// Users Screens

import HomePage from './User/HomePage';
import ProfilePage from './User/ProfilePage';
import Settings from './Admin/Settings';
import FreeResource from './User/FreeResource';
import Events from './User/Events';
import ContactWithUs from './User/Support/ContactWithUs';
import Feedback from './User/Support/Feedback';
import UserNotification from './User/Notification/UserNotification';

// Admin Dashboard

import AdminDashboard from './Admin/AdminDashboard/index';
import AdminManagment from './Admin/AdminManagment/index';
import Members from './Admin/Members/index';
import AdminContact from './Admin/Contactus/AdminContact';
import ChurchMap from './Admin/ChurchMap/index';
import AddMemberForm from './Admin/Members/AddMemberForm';
import Approval from './Admin/Members/Approval';

const UserAllScreens = {
  HomePage,
  ProfilePage,
  Settings,
  FreeResource,
  Events,
  ContactWithUs,
  Feedback,
  UserNotification,
};

const AdminScreens = {
  AdminDashboard,
  AdminManagment,
  Members,
  AdminContact,
  ChurchMap,
  AddMemberForm,
  Approval,
};

export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
