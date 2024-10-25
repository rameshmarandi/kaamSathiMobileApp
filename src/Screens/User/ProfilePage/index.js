import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {memo, useState} from 'react';
import theme from '../../../utility/theme';
import {
  ButtonIconComp,
  EmptyUserProfile,
  StatusBarComp,
} from '../../../Components/commonComp';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {VectorIcon} from '../../../Components/VectorIcon';
import {useSelector} from 'react-redux';
import {Image} from 'react-native';
import moment from 'moment';
import {DateFormator} from '../../../Helpers/CommonHelpers';
import ImageView from 'react-native-image-viewing';
const index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, loginUser, currentTextColor} = useSelector(
    state => state.user,
  );

  const isUserValid = loginUser?.user && Object.keys(loginUser.user).length > 0;

  const {
    fullName,
    avatar,
    coverImage,
    email,
    mobile,
    DOB,
    baptismDate,
    marriageDate,
  } = loginUser?.user || {};

  const [visible, setIsVisible] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');
  let bioData = [
    {
      'Full Name': `${fullName || ''}`,
      Email: `${email || ''}`,
      Phone: `${mobile || ''}`,
      'Date of Birth': `${DateFormator(DOB, 'DD MMM YYYY') || ''}`,
      'Date of Baptism': `${DateFormator(baptismDate, 'DD MMM YYYY') || ''}`,
      'Date of Marriage': `${DateFormator(marriageDate, 'DD MMM YYYY') || '_'}`,
    },
  ];
  const images = [
    {
      uri: viewImageUrl,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      {/* <StatusBarComp /> */}

      <CustomHeader
        Hamburger={() => {
          navigation.openDrawer();
          // Keyboard.dismiss();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
        centerLogo={true}
      />
      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
      <FlatList
        data={[0, 1, 2, 3, 4, 5, 6]}
        renderItem={({item, index}) => {
          switch (item) {
            case 0:
              return (
                <>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        let viewImageURL = coverImage
                          ? coverImage
                          : 'https://i.ytimg.com/vi/jjWSIpXrbUs/maxresdefault.jpg';

                        setViewImageUrl(viewImageURL);
                        setIsVisible(true);
                      }}
                      style={{
                        width: '100%',
                        height: getResHeight(30),
                        backgroundColor: theme.color.outlineColor,
                      }}>
                      <Image
                        source={{
                          uri: coverImage
                            ? coverImage
                            : 'https://i.ytimg.com/vi/jjWSIpXrbUs/maxresdefault.jpg',
                        }}
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          bottom: getResHeight(1.2),
                          right: getResWidth(1.5),
                        }}>
                        <ButtonIconComp
                          onPress={() => {}}
                          icon={
                            <VectorIcon
                              type={'FontAwesome'}
                              name={'camera'}
                              size={getFontSize(2.1)}
                              color={currentBgColor}
                            />
                          }
                          containerStyle={{
                            width: getResHeight(5),
                            height: getResHeight(5),
                            backgroundColor: currentTextColor,
                            borderRadius: getResHeight(100),
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    <EmptyUserProfile
                      avatarURL={avatar}
                      onViewProfile={() => {
                        if (avatar !== '') {
                          setViewImageUrl(avatar);
                          setIsVisible(true);
                        }
                      }}
                      onPress={() => {
                        // alert('sdfsd');
                      }}
                    />
                  </View>
                </>
              );

            case 1:
              return (
                <>
                  <BioCompoent
                    bioData={bioData}
                    currentBgColor={currentBgColor}
                    currentTextColor={currentTextColor}
                  />
                </>
              );
          }
        }}
      />
    </SafeAreaView>
  );
});

const BioCompoent = memo(props => {
  const {currentBgColor, bioData, currentTextColor} = props;
  return (
    <>
      <View
        style={[
          theme.styles.cardEffect,
          {
            flex: 1,
            borderWidth: 0.4,
            backgroundColor: currentBgColor,
            borderColor: currentTextColor,
            paddingLeft: '5%',
            paddingRight: getResWidth(7),

            marginTop: getResHeight(6),
            width: '95%',
            alignSelf: 'center',
            borderRadius: getResHeight(1),
            paddingVertical: '5%',
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: currentTextColor,
              fontFamily: theme.font.semiBold,
              fontSize: getFontSize(1.9),
              marginTop: getResHeight(1.5),
            }}>
            Perosnal Informaton
          </Text>
          <View
            style={{
              position: 'absolute',
              right: '-4%',
              top: '3%',
            }}>
            <ButtonIconComp
              onPress={() => {}}
              icon={
                <VectorIcon
                  type={'FontAwesome'}
                  name={'edit'}
                  size={getFontSize(2.3)}
                  color={currentBgColor}
                />
              }
              containerStyle={{
                width: getResHeight(5),
                height: getResHeight(5),
                backgroundColor: currentTextColor,

                borderRadius: getResHeight(100),
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: getResHeight(3),
          }}>
          {
            <>
              {bioData.map(person =>
                Object.entries(person).map(([key, value]) => (
                  <View style={{marginBottom: getResHeight(0.9)}} key={key}>
                    <View style={styles.bioRow}>
                      <Text
                        style={{
                          fontFamily: theme.font.bold,
                          fontSize: getFontSize(1.5),
                          color: currentTextColor,
                        }}>
                        {key}
                      </Text>
                      <Text
                        style={{
                          fontFamily: theme.font.bold,
                          fontSize: getFontSize(1.5),
                          color: currentTextColor,
                        }}>
                        {value}
                      </Text>
                    </View>
                  </View>
                )),
              )}
            </>
          }
        </View>
      </View>
    </>
  );
});
const styles = StyleSheet.create({
  bioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default index;
