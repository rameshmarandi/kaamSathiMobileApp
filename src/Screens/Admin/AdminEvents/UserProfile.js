import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight} from '../../../utility/responsive';
import theme from '../../../utility/theme';

const UserProfile = ({name, date, imageUri}) => {
  const {currentBgColor, loginUser, currentTextColor, isDarkMode} = useSelector(
    state => state.user,
  );

  const isUserValid = loginUser?.user && Object.keys(loginUser.user).length > 0;

  const {fullName, avatar} = loginUser?.user || {};

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUri}} style={styles.avatar} />
      <Text
        style={[
          styles.name,
          {
            color: currentTextColor,
          },
        ]}>
        {name}
      </Text>
      <Text
        style={[
          styles.date,
          {
            color: currentTextColor,
          },
        ]}>
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: getResHeight(0.7),
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
  },
  date: {
    fontSize: getFontSize(1),
    fontFamily: theme.font.medium,

    textAlign: 'center',
  },
});

export default UserProfile;
