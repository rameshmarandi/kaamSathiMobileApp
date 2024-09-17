import {StyleSheet} from 'react-native';
import {getResHeight, getResWidth, getFontSize} from '../../utility/responsive';
import theme from '../../utility/theme';

export const verseResourceCommonStyle = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    // padding: '3%',
    paddingHorizontal: '4%',
    paddingTop: '4%',
    marginBottom: '4%',
    borderRadius: getResHeight(1),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2%',
  },
  boldText: {
    fontFamily: theme.font.bold,
    marginLeft: '8%',
    fontSize: getFontSize(1.5),
  },
  regularText: {
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.6),
  },
  imageContainer: {
    height: 220,
    width: '100%',
    backgroundColor: '#095b76',
    borderRadius: getResHeight(1.3),
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  tabViewContainer: {
    flex: 1,
    paddingHorizontal: getResWidth(3),
  },
  indicatorStyle: {
    backgroundColor: 'red',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire card
    zIndex: 1, // Ensure overlay appears on top of content
  },
  tabBar: {
    marginBottom: '4%',
  },
  labelStyle: {
    fontFamily: theme.font.bold,
  },
});
