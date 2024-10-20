api.cache(false);
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',

      {
        moduleName: '@env', // Use @env to import variables
        path: '.env', // Path to your .env file
      },
    ],
  ],
};
