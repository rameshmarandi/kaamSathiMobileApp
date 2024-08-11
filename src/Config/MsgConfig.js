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
  ChurchMap: 'View all church',
  // contactUS  : 'Contact Us',

  AddMemberForm: 'Add Member Form',
};

export default message = {
  ...DrawerMenu,
  ...HomeModule,
  ...prayerRequest,
  ...headerTitle,
};
