import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {
  handlePermission,
  PERMISSIONS_KEYS,
} from '../../../Components/PermissionManager';

const index = () => {
  //   useEffect(() => {
  //     const requestPermissions = async () => {
  //       // Request camera permission
  //       const cameraPermission = await handlePermission(PERMISSIONS_KEYS.CAMERA);
  //       console.log('Camera Permission Granted:', cameraPermission);

  //       // Request gallery permission
  //       const galleryPermission = await handlePermission(
  //         PERMISSIONS_KEYS.GALLERY,
  //       );
  //       console.log('Gallery Permission Granted:', galleryPermission);
  //     };

  //     requestPermissions();
  //   }, []);

  return (
    <View>
      <Text>Permission Management Example</Text>
      <Button
        title="Check Camera Permission"
        onPress={async () => {
          const status = await handlePermission(PERMISSIONS_KEYS.CAMERA);
          console.log('Camera Permission Status:', status);
        }}
      />
      <Button
        title="Check Gallery Permission"
        onPress={async () => {
          const status = await handlePermission(PERMISSIONS_KEYS.GALLERY);
          console.log('Gallery Permission Status:', status);
        }}
      />
    </View>
  );
};

export default index;
