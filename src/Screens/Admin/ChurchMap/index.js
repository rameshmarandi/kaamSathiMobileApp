import React, {useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import {VectorIcon} from '../../../Components/VectorIcon';
import GoogleUIComp from '../../../Components/GoogleMapComp';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {AutoScrollBtnCom} from '../../../Components/AutoScrollBtnCom';
import theme from '../../../utility/theme';
import WaveButton from '../../../Components/WaveButton';
import {ButtonIconComp} from '../../../Components/commonComp';

const ChurchMap = React.memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [selectedChurch, setSelectedChurch] = useState(null);
  const bottomSheetRef = useRef(null);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: currentBgColor}}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Church Map"
      />

      <View
        style={{
          width: '100%',
          height: getResHeight(80),
        }}>
        <GoogleUIComp selectedChurch={selectedChurch} />
      </View>
    </SafeAreaView>
  );
});

export default ChurchMap;
