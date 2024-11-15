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
    blockMember: 'user/toggle-block-user',
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
  // Add more modules as needed
};

export default APIEndpoint;
