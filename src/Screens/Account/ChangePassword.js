import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';

const ChangePassword = ({navigation}) => {
  return (
    <>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`Change password`}
      />
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
    </>
  );
};

export default ChangePassword;
