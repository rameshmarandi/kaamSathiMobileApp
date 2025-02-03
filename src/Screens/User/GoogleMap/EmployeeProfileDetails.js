import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {VectorIcon} from '../../../Components/VectorIcon';
import CustomHeader from '../../../Components/CustomHeader';
import Modal from 'react-native-modal';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import MsgConfig from '../../../Config/MsgConfig';

const EmployeeProfileDetails = props => {
  const {navigation} = props;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.backgroundColor}}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`User profile`}
        // filterIcon={() => {}}
      />
    </SafeAreaView>
  );
};

export default EmployeeProfileDetails;
