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
  },
  // Add more modules as needed
};

export default APIEndpoint;
