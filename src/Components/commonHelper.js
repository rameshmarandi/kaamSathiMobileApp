import theme from '../utility/theme';

import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';

export const base64FileStore = (
  base64String,
  fileName,
  mimeType,
  setModalVisibilityCallback,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Validate the base64 string
      if (!base64String || base64String.trim() === '') {
        console.error('Invalid base64 string');
        Alert.alert('Error', 'Invalid base64 string provided.');
        reject(new Error('Invalid base64 string'));
        return;
      }

      // Request permissions for storage access
      const hasPermission = await CheckFilePermissions();
      console.log('Filepath_Permission', hasPermission);

      if (hasPermission) {
        console.log('File permissions granted');

        // Define the directory for Android
        const downloadDir =
          Platform.OS === 'android'
            ? RNFS.DownloadDirectoryPath // Public Downloads directory for Android
            : RNFS.DocumentDirectoryPath; // iOS internal Document directory

        const filePath = `${downloadDir}/${fileName}`;

        console.log('File will be saved to:', filePath);

        // Write the file using the base64 string
        RNFS.writeFile(filePath, base64String, 'base64')
          .then(() => {
            // Optionally, use a notification or callback based on platform
            if (Platform.OS === 'android') {
              // showNotification(
              //   `${fileName}`,
              //   'File downloaded successfully.',
              //   filePath,
              //   base64String,
              //   setModalVisibilityCallback,
              //   fileName,
              //   mimeType
              // );
            } else {
              setTimeout(async () => {
                try {
                  await onShare('', filePath, fileName);
                } catch (error) {
                  console.error('Error opening file:', error);
                }
              }, 1200);
            }

            resolve(filePath);
          })
          .catch(error => {
            console.error('Error writing file:', error);
            Alert.alert('Error', 'Could not save the file.');
            reject(error);
            setModalVisibilityCallback();
          });
      } else {
        console.error('File permissions denied');
        Alert.alert('Permission Denied', 'Storage permissions are required.');
        reject(new Error('File permissions denied'));
      }
    } catch (e) {
      console.error('Error in base64FileStore:', e);
      Alert.alert('Error', 'An unexpected error occurred.');
      reject(e);
    }
  });
};

export const CheckFilePermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      console.log(
        'ggggggggggggg',
        granted,
        granted['android.permission.POST_NOTIFICATIONS'],
        granted['android.permission.READ_EXTERNAL_STORAGE'],
        granted['android.permission.WRITE_EXTERNAL_STORAGE'],
      );

      if (
        granted['android.permission.POST_NOTIFICATIONS'] &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE']
      ) {
        // user granted permissions
        console.log('aaaaaaaa');

        return true;
      } else {
        console.log('bbbbbbbbbbb');
        // user didn't grant permission... handle with toastr, popup, something...
        return false;
      }
    } catch (err) {
      console.log('ccccccccccc');

      console.log('err', err);
      // unexpected error
      return false;
    }
  } else {
    // platform is iOS
    return true;
  }
};

export const backgroundColorHandler = () => {
  let {isDarkMode} = useSelector(state => state.user);
  if (isDarkMode) {
    return theme.color.darkTheme;
  } else {
    return theme.color.white;
  }
};
export const checkIsDarkMode = () => {
  let {isDarkMode} = useSelector(state => state.user);
  if (isDarkMode) {
    return true;
  } else {
    return false;
  }
};
export const getShortTimeAgo = date => {
  const now = moment();
  const duration = moment.duration(now.diff(date));

  if (duration.asMinutes() < 1) {
    return 'Just now';
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} min ago`; // e.g., 5m
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} h ago`; // e.g., 3h
  } else if (duration.asDays() < 7) {
    return `${Math.floor(duration.asDays())} d ago`; // e.g., 1d
  } else if (duration.asWeeks() < 4) {
    return `${Math.floor(duration.asWeeks())} w ago`; // e.g., 2w
  } else if (duration.asMonths() < 12) {
    return `${Math.floor(duration.asMonths())} mo ago`; // e.g., 1mo
  } else {
    return `${Math.floor(duration.asYears())} y ago`; // e.g., 1y
  }
};

export const textColorHandler = () => {
  let {isDarkMode} = useSelector(state => state.user);
  if (isDarkMode) {
    return theme.color.white;
  } else {
    return theme.color.primary;
  }
};

export const dateFormatHander = (date, format) => {
  // Check if the date is valid
  if (!moment(date).isValid()) {
    return 'Invalid date';
  }

  // Return the formatted date
  return moment(date).format(format);
};

export const checkIsNotEmptyArray = (arr = []) => {
  return Array.isArray(arr) && arr.length > 0;
};

export const formatCurrency = amount => {
  if (isNaN(amount)) return 'Invalid amount';

  // Convert to string and ensure it's a valid number
  const amountStr = parseFloat(amount).toFixed(2).toString();

  // Split integer and decimal parts
  const [integerPart, decimalPart] = amountStr.split('.');

  // Use regex to format the integer part with commas as per Indian numbering
  const formattedInteger = integerPart.replace(/(\d)(?=(\d\d)+\d$)/g, '$1,');

  return `${formattedInteger}`;
  // return `${formattedInteger}.${decimalPart}`;
};

export const generateMeaningfulAbbreviation = phrase => {
  const words = phrase.split(' ').filter(word => word.length > 0);

  if (words.length === 0) return '';

  if (words.length === 1) {
    const word = words[0];
    return word.slice(0, 2).toUpperCase(); // First two letters
  }

  // Generate abbreviation using the first two letters of each important word
  let abbreviation = words.map(word => word.slice(0, 2).toUpperCase()).join('');

  if (abbreviation.length < 4) {
    abbreviation += words[words.length - 1].charAt(1).toUpperCase(); // Add second letter of the last word
  }

  return abbreviation;
};
