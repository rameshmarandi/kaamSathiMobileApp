import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../Components/CustomHeader';

const PaymentHistory = ({navigation}) => {
  return (
    <>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`Payment History`}
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
          PaymentHistory
        </Text>
      </View>
    </>
  );
};

export default PaymentHistory;
