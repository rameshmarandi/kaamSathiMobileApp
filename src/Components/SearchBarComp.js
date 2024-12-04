import React from 'react';
import {View} from 'react-native';
import {SearchBar} from 'react-native-elements';
import theme from '../utility/theme';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';

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
  round = 10,
}) => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  return (
    <View
      style={
        {
          // marginBottom: '14%',
        }
      }>
      <SearchBar
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || theme.color.dimGray}
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
        cursorColor={isDarkMode ? theme.color.darkTheme : currentTextColor}
        containerStyle={[
          containerStyle || {
            width: getResWidth(95),
            height: getResHeight(2),
            alignSelf: 'center',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            backgroundColor: currentBgColor,
            margin: 0,
            alignItems: 'center',
          },
        ]}
        inputStyle={{
          color: theme.color.darkTheme,
          fontSize: getFontSize(1.6),
          fontFamily: theme.font.medium,
          alignItems: 'center',
          marginTop: '1%',
        }}
        inputContainerStyle={{
          alignItems: 'center',
          backgroundColor: isDarkMode ? currentTextColor : theme.color.dimWhite,
        }}
      />
    </View>
  );
};

export default React.memo(SearchBarComp);
