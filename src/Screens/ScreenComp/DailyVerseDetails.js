import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDailyVersesAPIHander,
  viewPostAPIHander,
} from '../../redux/reducer/DailyVerses/dailyVersesAPI';
import {checkIsNotEmptyArray} from '../../Components/commonHelper';
import TabViewComp from '../../Components/TabViewComp';
import SectionHeader from '../../Components/SectionHeader';
import MsgConfig from '../../Config/MsgConfig';
import {getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import {store} from '../../redux/store';
import {setSelectedDailyVerse} from '../../redux/reducer/DailyVerses';

const DailyVerseDetails = props => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {dailyVerses, selectedDailyVerse} = useSelector(
    state => state.dailyVerses,
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <Text>DailyVerseDetails</Text>
    </SafeAreaView>
  );
};

export default DailyVerseDetails;
