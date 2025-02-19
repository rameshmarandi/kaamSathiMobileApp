import {View, Text} from 'react-native';
import React from 'react';

const ChangePassword = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'grey',
        }}>
        Password change
      </Text>
    </View>
  );
};

export default ChangePassword;
