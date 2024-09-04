import React from 'react';
import {View, SafeAreaView} from 'react-native';
import theme from '../../../utility/theme';

import CustomHeader from '../../../Components/CustomHeader';
import {ALL_LINKS} from '../../../Config/constants';
import {backgroundColorHandler} from '../../../Components/commonHelper';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import MsgConfig from '../../../Config/MsgConfig';
import SquareCardComp from '../../../Components/SquareCardComp';
import {openInAppBrowser} from '../../../Components/InAppBrowserComp';
import {freeResourceData} from '../../../Components/StaticDataHander';

const FreeResource = ({navigation}) => {
  const handleOpenBrowser = url => {
    openInAppBrowser(url);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: backgroundColorHandler(), // Assuming backgroundColorHandler is defined elsewhere
      }}>
      <View>
        <CustomHeader
          backPress={() => {
            navigation.goBack();
          }}
          screenTitle={MsgConfig.freeResource}
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: '5%',
        }}>
        <View
          style={{
            width: getResWidth(100),
            alignSelf: 'center',
            padding: '4%',
            flexDirection: 'row',
          }}>
          <SquareCardComp
            onPress={item => {
              handleOpenBrowser(item.routeName);
            }}
            filteredData={freeResourceData}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FreeResource;
