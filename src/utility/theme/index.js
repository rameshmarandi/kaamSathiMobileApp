import {StyleSheet} from 'react-native';

import assets from './assets';
import {getResHeight} from '../responsive';

const color = {
  primary: '#2F3B75',
  darkTheme: '#012537',
  // "#000f0b",
  iconCircleBg: '#011621',

  // Textinput end
  seletedBtn: '#303254',
  disabledBtn: '#434e82',
  dimBlack: '#353535',
  dimGray: '#828282',
  lableColor: '#666666',
  white: '#F0F8FF',
  //  '#FFFFFF',
  iceWhite: '#f9f9f9',
  dimWhite: '#f1f1f1',
  outlineColor: '#999999',
  placeholder: '#C0C0C0',
  error: '#FF0000',
  green: '#25D366',
  black: '#000000',
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
  font:
    // hindiFont,
    englishFont,
  styles,

  assets,
};

export default theme;
