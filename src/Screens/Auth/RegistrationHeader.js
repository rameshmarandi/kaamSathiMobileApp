import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../utility/theme';
import {getFontSize} from '../../utility/responsive';

const RegistrationHeader = ({
  mainText,
  mainTextStyle,
  firstWord,
  secondWord,
  firstWordStyle,
  secondWordStyle,
  containerStyle,
  wordContainerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View>
        <Text style={[styles.mainText, mainTextStyle]}>{mainText}</Text>
      </View>
      <View style={[styles.wordsContainer, wordContainerStyle]}>
        <Text style={[styles.firstWord, firstWordStyle]}>{firstWord}</Text>
        <Text style={[styles.secondWord, secondWordStyle]}>{secondWord}</Text>
      </View>
    </View>
  );
};

RegistrationHeader.propTypes = {
  mainText: PropTypes.string,
  firstWord: PropTypes.string,
  secondWord: PropTypes.string,
  mainTextStyle: PropTypes.object,
  firstWordStyle: PropTypes.object,
  secondWordStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  wordContainerStyle: PropTypes.object,
};

RegistrationHeader.defaultProps = {
  mainText: 'Registration with',
  firstWord: 'Kaam',
  secondWord: 'sathi',
  mainTextStyle: {},
  firstWordStyle: {},
  secondWordStyle: {},
  containerStyle: {},
  wordContainerStyle: {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.color.whiteBg,
  },
  mainText: {
    color: theme.color.dimBlack,
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.medium,
  },
  wordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstWord: {
    color: theme.color.dimBlack,
    fontSize: getFontSize(2.5),
    fontFamily: theme.font.semiBold,
  },
  secondWord: {
    color: theme.color.secondary,
    fontSize: getFontSize(2.5),
    fontFamily: theme.font.semiBold,
  },
});

export default RegistrationHeader;
