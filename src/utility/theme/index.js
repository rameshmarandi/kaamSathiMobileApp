import {StyleSheet} from 'react-native';
// import {CardStyleInterpolators} from 'react-navigation-stack';

import assets from './assets';
import {getResHeight} from '../responsive';

const regex = {
  percentage: /^(\d*\.{0,1}\d{0,2}$)/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  instagram:
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im,
  facebook: /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i,
  twitter: /^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/i,
  linkedin:
    'http[s]?://www.linkedin.com/(in|pub|public-profile/in|public-profile/pub)/([w]{6}-[w]{1,}-[w]+)$',
  youtube:
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
};
const color = {
  primary: '#2F3B75',
  darkTheme: '#012537',
  // "#000f0b",
  iconCircleBg: '#011621',

  darkModeTextInputOutline: '#666666',
  normalModeTextInputOutline: '#C4C4C4',
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

const font = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
  extraBold: 'Poppins-ExtraBold',
  italic: 'Poppins-Italic',
  thin: 'Poppins-Thin',
};

const fontSizes = {
  extraSmall: 10,
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  extraLarge: 25,
  ultraLarge: 45,
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
  font,
  styles,

  assets,
};

export default theme;
