import React, {memo, useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import ImagePickerComp from './ImagePickerComp';
import {VectorIcon} from './VectorIcon';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {useSelector} from 'react-redux';
import theme from '../utility/theme';
import LottieView from 'lottie-react-native';
import {requestGalleryPermission} from '../utility/PermissionContoller';
import {documentPickeComp} from './DocumentPickerComp';

// Memoized component to prevent unnecessary re-renders
const FileUploadComponent = memo(
  ({
    selectedImage,
    onImageSuccess,
    onImageError,
    isDocumentPicker = false,
    allowedTypes = ['image/jpeg'],
    customHeight,
    customWidth,
    labelText,
  }) => {
    const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
      state => state.user,
    );

    // Pass dynamic height and width if provided
    const styles = getUploadStyles({
      height: customHeight,
      width: customWidth,
    });

    // Handle Image Selection
    const handleImagePicker = useCallback(
      mediaType => {
        requestGalleryPermission().then(result => {
          if (result) {
            if (isDocumentPicker) {
              documentPickeComp({
                allowedTypes: allowedTypes, // Define file types
                multiple: true, // Enable multiple file selection
                onSuccess: onImageSuccess, // Pass the success callback
                onError: onImageError, // Pass the error callback
              });
            } else {
              ImagePickerComp(
                'gallery',
                {
                  mediaType: 'pdf',
                  quality: 0.8,

                  // includeBase64: true,
                },
                onImageSuccess,
                onImageError,
              );
            }
          } else {
            console.log('Permission denied');
          }
        });
      },
      [onImageSuccess, onImageError],
    );

    return (
      <>
        {labelText && (
          <Text style={[styles.labelText, {color: currentTextColor}]}>
            {labelText} <Text style={{color: 'red'}}>{'*'}</Text>
          </Text>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{overflow: 'hidden'}}
          onPress={handleImagePicker}>
          {
            <View
              style={[styles.uploadContainer, {borderColor: currentTextColor}]}>
              {selectedImage[0]?.type == 'application/pdf' ? (
                <>
                  <VectorIcon
                    type={'AntDesign'}
                    name={'pdffile1'}
                    size={getFontSize(10)}
                    color={theme.color.error}
                  />
                  <Text
                    style={{
                      color: currentTextColor,
                    }}>
                    {selectedImage[0]?.name}
                  </Text>
                </>
              ) : selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  resizeMode="cover"
                  style={styles.imageContainer}
                />
              ) : (
                <>
                  {/* <VectorIcon
                    type={'MaterialCommunityIcons'}
                    name={'cloud-upload'}
                    size={getFontSize(8)}
                    color={currentTextColor}
                  /> */}
                  <LottieView
                    source={require('../assets/animationLoader/uploadfile.json')}
                    autoPlay
                    loop
                    style={{
                      height: getResHeight(15),
                      width: getResWidth(40),
                    }}
                  />
                  <Text
                    style={[
                      styles.uploadText,
                      {
                        marginTop: getResHeight(-3),
                        color: currentTextColor,
                      },
                    ]}>
                    Click here to upload
                  </Text>
                </>
              )}
            </View>
          }
        </TouchableOpacity>
      </>
    );
  },
);

// Dynamic styling function for flexibility
export const getUploadStyles = ({
  height = getResHeight(25), // Default height
  width = getResWidth(90), // Default width
  imageHeight = 220, // Default image height
  imageWidth = '100%', // Default image width
} = {}) => {
  return StyleSheet.create({
    imageContainer: {
      height: imageHeight,
      width: imageWidth,
      backgroundColor: '#095b76',
      borderRadius: getResHeight(1.3),
    },
    uploadContainer: {
      marginTop: getResHeight(1),
      height: height,
      width: width,
      borderWidth: 1,
      borderRadius: getResHeight(2),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    labelText: {
      fontFamily: theme.font.medium,
      marginTop: getResHeight(1),
    },
    uploadText: {
      fontFamily: theme.font.medium,
      fontSize: getFontSize(1.8),
    },
  });
};

export default FileUploadComponent;
