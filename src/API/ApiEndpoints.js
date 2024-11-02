// APIEndpoint.js

const APIEndpoint = {
  user: {
    refreshToken: '/user/refresh-token',
    generateOtp: '/user/generate-otp',
    forgotPassword: '/user/forgot-password',
    logout: '/user/logout',
    login: '/user/login',
  },

  admin: {
    getAllMembers: '/user/get-all-users',
    getNewApplication: '/user/get-all-new-application',
    updateApplicationStatus: '/user/update-user-status',
    getAllBranchAdmins: '/user/get-all-branch-admin',
    updateUserRoles: '/user/update-user-role',
    deleteUser: '/user/delete-user',
    blockMember: 'user/toggle-block-user',
  },
  chruchBranch: {
    getAllBranches: '/branch/get-all-branch',
    createBranch: '/branch/create-branch',
    updateBranch: '/branch/update-branch',
    deleteBranch: '/branch/delete-branch',
  },
  // Add more modules as needed
};

export default APIEndpoint;
