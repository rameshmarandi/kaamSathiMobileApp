const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    // 'react-native-worklets-core/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: envFile, // Dynamically set the path
        allowUndefined: true,
      },
    ],
  ],
};
