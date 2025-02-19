import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';

const HelpSupport = ({navigation}) => {
  return (
    <>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`Help & support`}
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
          help HelpSupport
        </Text>
      </View>
    </>
  );
};

export default HelpSupport;
