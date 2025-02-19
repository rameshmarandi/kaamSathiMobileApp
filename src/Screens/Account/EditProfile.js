import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';

const EditProfile = props => {
  const {navigation} = props;
  return (
    <>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`Edit Profile`}
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
          Edit profile
        </Text>
      </View>
    </>
  );
};

export default EditProfile;
