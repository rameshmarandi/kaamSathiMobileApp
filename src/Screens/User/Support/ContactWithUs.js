import React, {Component, useState, useRef, memo, useEffect} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

import {Formik} from 'formik';
import theme from '../../../utility/theme';

import {getFontSize} from '../../../utility/responsive';

import CustomHeader from '../../../Components/CustomHeader';
import {
  backgroundColorHandler,
  textColorHandler,
} from '../../../Components/commonHelper';
import MsgConfig from '../../../Config/MsgConfig';

const ContactWithUs = memo(props => {
  useEffect(() => {}, []);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: backgroundColorHandler(),
        }}>
        <View>
          <CustomHeader
            backPress={() => {
              props.navigation.goBack();
            }}
            screenTitle={MsgConfig.contactUS}
          />

          <View
            style={{
              paddingHorizontal: '5%',
            }}>
            <HeaderAndDescComp
              title={'Contact Us'}
              desc={`We are here to assist you and welcome your inquiries, prayer requests, and messages. Please feel free to reach out to us through the following means:`}
            />
            <HeaderAndDescComp
              title={'General Inquiries:'}
              desc={`For general questions or comments about our church, events, or community, please email us at `}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
});

const HeaderAndDescComp = props => {
  const {title, desc} = props;
  return (
    <>
      <View
        style={{
          marginTop: '5%',
        }}>
        <Text
          style={{
            color: textColorHandler(),
            fontSize: getFontSize(2),
            fontFamily: theme.font.medium,
            fontWeight: '800',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: textColorHandler(),
            fontSize: getFontSize(2),
            fontFamily: theme.font.regular,
            lineHeight: 21,
          }}>
          {desc}
        </Text>
      </View>
    </>
  );
};
export default ContactWithUs;
