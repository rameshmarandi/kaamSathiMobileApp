const DrawerMenu = {
  home: 'Home',
  myProfile: 'My Profile',
  freeResource: 'Free Resources',
  prayerRequest: 'Prayer Request',
  event: 'Events',
  contactWithUs: 'Contact With Us',
  feedBack:
    // 'ମତାମତ',
    // 'प्रतिक्रिया',
    'Feed Back',
  setting:
    // 'समायोजन'
    'Settings',
  darkmode: 'Dark Mode',
};

const HomeModule = {
  specialDay: 'Momentous Occasion',
  firstHeaderText: 'Daily Verbs',
  chruchLocation: 'Church Location',
  socialMedia: 'Social Media',
  quickNav: 'Quick Route Guidance',
};
const prayerRequest = {
  prayerRequestNote:
    'Your prayer requests will be sent directly to the pastor.',
};

const headerTitle = {
  freeResources: 'Free Resources',
  Events: 'All Events',
  contactUS: 'Contact Us',
  feedBack: 'Feedback',
  settings: 'Settings',
  prayerRequest: 'Prayer Request',
  notification: 'All Notifications',

  // Admin screens
  profile: 'My Profile',
  AdminManag: 'Admin Management',
  allMembers: 'All Members',
  allFamily: 'All Family Members',
  ChurchMap: 'View all church',
  dailyVerse: 'Daily verses',
  adminResouce: 'Study resources',
  // contactUS  : 'Contact Us',

  AddMemberForm: 'Member registration form',
  addFamilyForm: 'Family registration form',
  uploadResource: 'Upload daily verses',
  allPrayerReq: 'All prayer requests',
  adminOurBelieve: 'Our believe',
  postsUploadBanner: 'All banners',
  dailyVerseDetails: 'daily verse',
  uploadStudyResource: 'Upload study resource',
  paymentHistory: 'Payment history',
  bannerComp: 'Momentious occasion',
  uploadMomentsPhoto: 'Upload momentious photo',
};

export default message = {
  ...DrawerMenu,
  ...HomeModule,
  ...prayerRequest,
  ...headerTitle,
};
