// APIEndpoint.js

const APIEndpoint = {
  user: {
    refreshToken: '/user/refresh-token',
    generateOtp: '/user/generate-otp',
    forgotPassword: '/user/forgot-password',
    logout: '/user/logout',
    login: '/user/login',
    register: '/user/register',
  },

  admin: {
    getAllMembers: '/user/get-all-users',
    getNewApplication: '/user/get-all-new-application',
    updateApplicationStatus: '/user/update-user-status',
    getAllBranchAdmins: '/user/get-all-branch-admin',
    updateUserRoles: '/user/update-user-role',
    deleteUser: '/user/delete-user',
    blockMember: '/user/toggle-block-user',
    //Profile
    myProfile: '/user/get-profile',
    updateProfilePic: '/user/update-profile-pic',
    updateCoverImage: '/user/update-cover-picture',
  },
  family: {
    registerFamily: '/user/add-family-members',
    deleteFamily: '/user/delete-family-member',
  },
  chruchBranch: {
    getAllBranches: '/branch/get-all-branch',
    createBranch: '/branch/create-branch',
    updateBranch: '/branch/update-branch',
    deleteBranch: '/branch/delete-branch',
  },
  dailyVerses: {
    uploadPoster: '/admin/create-daily-verses',
    deletePoster: '/admin/delete-daily-verses',
    getSchdulePoster: '/admin/get-schedule-daily-verses',
    getDailyVersePoster: '/user/get-daily-verses',
    viewDailyVersePoster: '/user/view-daily-verses',
    addComment: '/user/add-daily-verses-comment',
    replayComment: '/user/replay-daily-verses-comment',
    reactionOnPoster: '/user/reactToComment-daily-verses-comment',
    publishNow: '/user/publish-daily-verses-now',
  },
  language: {
    getLanguage: '/user/get-language',
    createLanguage: '/user/create-language',
    updateLanguage: '/user/update-language',
    deleteLanguage: '/user/delete-language',
  },
  resource: {
    getResource: '/user/get-resource',
    deleteResouce: '/user/delete-resource',
    createResource: '/user/create-resource',
  },
  transaction: {
    getTransactionHistory: '/transaction/get-transaction-history',
    generateInvoice: '/transaction/get-invoice',
    createTransaction: '/transaction/create-transaction-history',
  },
  inAppNotifications: {
    getInAppNotifications: '/notify/get-notification',
    markNotificationRead: '/notify/read-notification',
    deleteNotification: '/notify/delete-notification',
  },

  bannerModule: {
    getBanner: '/banner/get-banner',
    getAdminBanner: '/banner//get-all-banner',
    deleteBanner: '/banner/delete-banner',
    createBanner: '/banner/create-banner',
    updateBanner: '/banner/update-banner',
    likeBanner: '/banner/like-banner',
    addComment: '/banner/add-comment-banner',
    replayOnComment: '/banner/replay-comment-banner',
    deleteReplayComment: '/banner/delete-reply-comment-banner',
    deleteComment: '/banner/delete-comment-banner',
  },
  // Add more modules as needed
};

export default APIEndpoint;
