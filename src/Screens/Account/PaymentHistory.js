import {View, Text} from 'react-native';
import React from 'react';

const PaymentHistory = () => {
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
        PaymentHistory
      </Text>
    </View>
  );
};

export default PaymentHistory;
