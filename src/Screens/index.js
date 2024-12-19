// Users Screens

import HomePage from './User/HomePage/index';
import ProfilePage from './User/ProfilePage';
import Settings from './Admin/Settings';
import FreeResource from './User/FreeResource';
import Events from './User/Events';
import ContactWithUs from './User/Support/ContactWithUs';
import Feedback from './User/Support/Feedback';
import UserNotification from './User/Notification/UserNotification';

// Admin Dashboard
import ChurchProfile from './Admin/ChurchProfile/index';

import AdminDashboard from './Admin/AdminDashboard/index';
import AdminManagment from './Admin/AdminManagment/index';
import Members from './Admin/Members/index';
import AdminContact from './Admin/Contactus/AdminContact';
import ChurchMap from './Admin/ChurchMap/index';
// import AddMemberForm from './Admin/Members/AddMemberForm';
import Approval from './Admin/Members/Approval';
import DailyVerse from './Admin/DailyVerses/index';
import AdminResource from './Admin/AdminResource/index';
import AllPrayerReq from './Admin/PrayerModule/AllPrayerReq';
import AdminOurBelieve from './Admin/AdminOurBelieve';
import UploadBanner from './Admin/Posts/UploadBanner';
import LoginPage from './Auth/LoginPage';

import ForgotPassword from './Auth/ForgotPassword';
import ApplicationUnderReview from './Auth/ApplicationUnderReview';
import MyFamily from './User/ProfilePage/MyFamily';
import DailyVerseDetails from './ScreenComp/DailyVerseDetails';
import PaymentHistory from './User/Transaction/PaymentHistory';

const UserAllScreens = {
  HomePage,
  ProfilePage,

  MyFamily,
  Settings,
  FreeResource,
  Events,
  ContactWithUs,
  Feedback,
  UserNotification,
  DailyVerseDetails,
  PaymentHistory,
};

const AdminScreens = {
  AdminDashboard,
  AdminManagment,
  Members,
  ChurchProfile,
  AdminContact,
  ChurchMap,
  Approval,
  DailyVerse,
  AdminResource,
  AllPrayerReq,
  AdminOurBelieve,
  UploadBanner,
  ForgotPassword,
  LoginPage,
  ApplicationUnderReview,
};

export default AllScreens = {
  ...UserAllScreens,
  ...AdminScreens,
};
