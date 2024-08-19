import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {memo} from 'react';
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

const index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  let bioData = [
    {
      'Full Name': 'Ramesh Marandi',
      Email: 'rameshtest@gmail.com',
      Phone: '9090909090',
      'Date of Birth': '12 April 1998',
      'Date of Baptism': '16 Jun 20121',
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
      <FlatList
        data={[0, 1, 2]}
        renderItem={({item, index}) => {
          switch (item) {
            case 0:
              return (
                <>
                  <View>
                    {/* <View
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        top: getResHeight(1),
                        paddingLeft: '5%',
                      }}>
                      <CustomHeader
                        backPress={() => {
                          navigation.navigate('Dashboard');
                        }}
                        // screenTitle={MsgConfig.profile}
                      />
                    </View> */}

                    <View
                      style={{
                        width: '100%',
                        height: getResHeight(30),
                        backgroundColor: theme.color.outlineColor,
                      }}>
                      <Image
                        source={{
                          uri: 'https://dailyverses.net/images/en/niv/romans-15-2-2.jpg',
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

                      <EmptyUserProfile
                        onPress={() => {
                          alert('sdfsd');
                        }}
                      />
                      {/* <View
                        style={{
                          width: getResHeight(18),
                          height: getResHeight(18),
                          borderRadius: getResHeight(100),
                          backgroundColor: theme.color.dimWhite,
                          marginTop: getResHeight(-10),
                          borderWidth: 2,
                          borderColor: currentTextColor,
                          marginLeft: getResWidth(3),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <VectorIcon
                          type={'FontAwesome'}
                          name={'user'}
                          size={getFontSize(8)}
                          color={
                            isDarkMode
                              ? theme.color.darkTheme
                              : currentTextColor
                          }
                        />
                        <View
                          style={{
                            position: 'absolute',
                            bottom: getResHeight(1),
                            right: getResWidth(-1.1),
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
                      </View> */}
                    </View>
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

            marginTop: getResHeight(15),
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
