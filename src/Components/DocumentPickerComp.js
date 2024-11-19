import DocumentPicker from 'react-native-document-picker';
import {Alert} from 'react-native';

export const documentPickeComp = async ({
  allowedTypes = ['application/pdf', 'image/jpeg', 'application/msword'],
  multiple = false,
  onSuccess = files => {},
  onError = error => {},
}) => {
  try {
    // Open the document picker
    const result = await DocumentPicker.pick({
      type: allowedTypes, // Restrict the file types
      multiple: multiple, // Allow multiple file selection
    });

    // Normalize to array if single file is picked
    const files = multiple ? result : [result];

    // Call the success callback with the picked files
    onSuccess(files);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // If the user cancels, you can handle it or simply show a message
      // Alert.alert('Operation Cancelled');
    } else {
      // Handle any other errors, such as permission issues or unsupported file types
      console.error('Document Picker Error:', err);
      onError(err); // Trigger the error callback with the error message
      // Alert.alert('Error picking document', err.message || err);
    }
  }
};
