import {StyleSheet} from 'react-native';

import assets from './assets';
import {getResHeight} from '../responsive';

const color = {
  primary: '#4CAF50',
  secondary2: '#FF9800',
  secondary: '#FFC107',
  naviBlue: '#263238',
  textColor: '#333333',
  black: '#000000',
  dimGrey: '#ECEFF1',
  charcolBlack: '#212121',
  whiteText: '#FFFFFF',
  offWhite: '#FAFAFA',

  dardkModeOnBGColor: '#012537',
  darkModeOffBGColor: '#FFFFFF',
};

const englishFont = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  italic: 'Poppins-Italic',
  thin: 'Poppins-Thin',
};
const hindiFont = {
  regular: 'hindi-Regular',
  semiBold: 'hindi-SemiBold',
  medium: 'hindi-Medium',
  bold: 'hindi-Bold',
  extraBold: 'hindi-ExtraBold',
  italic: 'hindi-Thin',
  thin: 'hindi-Thin',
};

const styles = StyleSheet.create({
  roundBtnShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 15,
  },
  cardEffect: {
    backgroundColor: color.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(0.3),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
});

const theme = {
  color,
  font: englishFont,
  styles,

  assets,
};

export default theme;
