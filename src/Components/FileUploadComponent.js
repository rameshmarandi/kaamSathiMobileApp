import React, {memo, useCallback} from 'react';
import {TouchableOpacity, StyleSheet, View, Image, Text} from 'react-native';
import ImagePickerComp from './ImagePickerComp';
import {VectorIcon} from './VectorIcon';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {useSelector} from 'react-redux';
import theme from '../utility/theme';

// Memoized component to prevent unnecessary re-renders
const FileUploadComponent = memo(
  ({
    selectedImage,
    onImageSuccess,
    onImageError,
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
        ImagePickerComp(
          'gallery',
          {mediaType: 'photo', quality: 0.8},
          onImageSuccess,
          onImageError,
        );
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
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  resizeMode="cover"
                  style={styles.imageContainer}
                />
              ) : (
                <>
                  <VectorIcon
                    type={'MaterialCommunityIcons'}
                    name={'cloud-upload'}
                    size={getFontSize(8)}
                    color={currentTextColor}
                  />
                  <Text style={[styles.uploadText, {color: currentTextColor}]}>
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
