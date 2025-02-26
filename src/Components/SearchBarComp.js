import React from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import theme from '../utility/theme';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import MarqueeComp from './MarqueeComp';

const SearchBarComp = ({
  autoFocus = false,
  disabled = false,
  placeholder,
  containerStyle,
  onChangeText,
  value,
  placeholderTextColor,
  autoCapitalize = 'none',
  isLoading,
  onFocus,
  onClear = () => {},
  round = 10,
}) => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <View
      style={{
        zIndex: 9999,
      }}>
      <SearchBar
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.color.charcolBlack}
        searchIcon={{
          iconStyle: {
            fontSize: getFontSize(3),
          },
        }}
        disabled={disabled}
        showLoading={isLoading}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        onFocus={onFocus}
        value={value}
        round={round}
        onClear={onClear}
        cursorColor={isDarkMode ? theme.color.charcolBlack : currentTextColor}
        containerStyle={[
          containerStyle || {
            width: getResWidth(95),
            height: getResHeight(2),
            alignSelf: 'center',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor:
              // 'white',
              theme.color.whiteBg,
            margin: 0,
            alignItems: 'center',
          },
        ]}
        inputStyle={{
          color: theme.color.charcolBlack,
          fontSize: getFontSize(1.6),
          fontFamily: theme.font.medium,
          alignItems: 'center',
          marginTop: '1%',
        }}
        inputContainerStyle={{
          alignItems: 'center',
          backgroundColor:
            // isDarkMode ? currentTextColor :
            theme.color.dimGrey,
        }}
      />
    </View>
  );
};

export default React.memo(SearchBarComp);
