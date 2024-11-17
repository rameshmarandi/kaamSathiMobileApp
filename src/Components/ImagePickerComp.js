import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePickerComp = (mode, options = {}, onSuccess, onError) => {
  // Default options
  const defaultOptions = {
    mediaType: 'photo', // Choose between 'photo', 'video', or 'mixed'
    quality: 1.0, // Image quality (0 to 1)
    maxWidth: 1024, // Max width of the image
    maxHeight: 1024, // Max height of the image
    includeBase64: false, // Set true if you need base64 output
    saveToPhotos: false, // Only for camera: whether to save to gallery
  };

  // Merge the passed options with default options
  const pickerOptions = {...defaultOptions, ...options};

  // Handle based on the mode (camera or gallery)
  if (mode === 'camera') {
    launchCamera(pickerOptions, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
        onError && onError('User cancelled camera');
      } else if (response.errorCode) {
        console.error(
          'Camera error: ',
          response.errorCode,
          response.errorMessage,
        );
        onError && onError(response.errorMessage);
      } else {
        onSuccess && onSuccess(response.assets[0]); // Sending the picked image data
      }
    });
  } else if (mode === 'gallery') {
    launchImageLibrary(pickerOptions, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        onError && onError('User cancelled image picker');
      } else if (response.errorCode) {
        console.error(
          'Image picker error: ',
          response.errorCode,
          response.errorMessage,
        );
        onError && onError(response.errorMessage);
      } else {
        onSuccess && onSuccess(response.assets[0]); // Sending the picked image data
      }
    });
  } else {
    console.error('Invalid mode selected: ', mode);
    onError && onError('Invalid mode selected');
  }
};

// const DocumentPicker = ()=>{
//   // Pick document (common for both iOS and Android)
//   const response = await DocumentPicke.pick({
//     type: fileTypes,
//     includeBase64: Platform.OS === 'android', // base64 is only needed on Android
//   });
// }
export default ImagePickerComp;
