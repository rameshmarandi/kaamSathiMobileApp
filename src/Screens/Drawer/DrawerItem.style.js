import {StyleSheet} from 'react-native';
import {backgroundColorHandler} from '../../Components/commonHelper';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import {useSelector} from 'react-redux';

// let backgrounColorG = backgroundColorHandler()

export const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 0,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnTitleStyle: {
    textAlign: 'left',
    fontSize: getFontSize(1.6),
    marginLeft: getResWidth(3),
  },
  btnContainerStyle: {
    marginBottom: getResHeight(0.7),
    width: '100%',
  },
  buttonStyle: {
    justifyContent: 'flex-start',
    width: '100%',
    overflow: 'hidden',
    paddingLeft: getResWidth(4),
  },
});
