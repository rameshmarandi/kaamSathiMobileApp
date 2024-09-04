import React, {useState, useRef, useEffect, memo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomHeader from '../../../Components/CustomHeader';
import SearchBarComp from '../../../Components/SearchBarComp';
import SmallMenuComp from '../../../Components/SmallMenuComp';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import {Surface} from 'react-native-paper';
import MsgConfig from '../../../Config/MsgConfig';
import {
  ButtonIconComp,
  CommonButtonComp,
  EmptyUserProfile,
  StatusBarComp,
} from '../../../Components/commonComp';
import WaveButton from '../../../Components/WaveButton';
import TabViewComp from '../../../Components/TabViewComp';
import {TouchableWithoutFeedback} from 'react-native';

const Card = ({
  backgroundColor,
  borderColor,
  textColor,
  waveButtonProps,
  currentTabIndex,
  scheduleText,
  date,
  onCardPress,
  imageSource,
}) => (
  <TouchableWithoutFeedback onPress={onCardPress}>
    <View style={[styles.card, {backgroundColor, borderColor}]}>
      <View style={styles.cardHeader}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <WaveButton {...waveButtonProps} />
          <Text
            style={[
              styles.boldText,
              {
                color: textColor,
                marginLeft: currentTabIndex == 0 ? '13%' : '8%',
              },
            ]}>
            {scheduleText}
          </Text>
        </View>
        <View>
          <Text style={[styles.regularText, {color: textColor}]}>{date}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={imageSource} resizeMode="cover" style={styles.image} />
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const Index = memo(({navigation}) => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const bottomSheetRef = useRef(null);
  const scrollRef = useRef(null);

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    mobile: useRef(null),
    birthDate: useRef(null),
    baptismDate: useRef(null),
    password: useRef(null),
  };

  // Reference for Formik
  const formikRef = useRef(null);

  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const openBottomSheetWithContent = content => {
    // setBottomSheetContent(content);
    bottomSheetRef.current?.open();
  };

  const waveButtonPropsFirstRoute = {
    onPress: () => {
      /* Navigation action */
    },
    circleContainer: {
      width: getResHeight(2),
      height: getResHeight(2),
      borderRadius: getResHeight(2) / 2,
      backgroundColor: 'rgba(17, 255, 0, 0.985)',
    },
    circleStyle: {
      width: getResHeight(2),
      height: getResHeight(2),
      borderRadius: getResHeight(2) / 2,
      backgroundColor: '#15ff00',
    },
  };

  const waveButtonPropsSecondRoute = {
    onPress: () => {
      /* Navigation action */
    },
    circleContainer: {
      width: getResHeight(2),
      height: getResHeight(2),
      borderRadius: getResHeight(2) / 2,
      backgroundColor: 'rgba(255, 157, 0, 0.985)',
    },
    circleStyle: {
      width: getResHeight(2),
      height: getResHeight(2),
      borderRadius: getResHeight(2) / 2,
      backgroundColor: '#ffa600',
    },
  };

  const FirstRoute = () => (
    <ScrollView>
      {['English', 'Marathi', 'Hindi'].map((item, index) => (
        <Card
          key={index}
          backgroundColor={currentBgColor}
          borderColor={currentTextColor}
          currentTabIndex={currentTabIndex}
          textColor={currentTextColor}
          scheduleText={'Live'}
          waveButtonProps={waveButtonPropsFirstRoute}
          date={item}
          imageSource={theme.assets.dailyVerbsBanner}
        />
      ))}
    </ScrollView>
  );

  const scheduleData = [
    {id: 1, date: '12 October 2024 | 06 AM'},
    {id: 2, date: '14 October 2024 | 07 PM'},
    {id: 3, date: '16 October 2024 | 05 AM'},
    {id: 4, date: '18 October 2024 | 08 PM'},
    {id: 5, date: '20 October 2024 | 09 AM'},
    {id: 6, date: '22 October 2024 | 10 PM'},
    {id: 7, date: '24 October 2024 | 11 AM'},
    {id: 8, date: '26 October 2024 | 12 PM'},
    {id: 9, date: '28 October 2024 | 01 PM'},
    {id: 10, date: '30 October 2024 | 02 PM'},
  ];

  const SecondRoute = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomBottomSheet ref={bottomSheetRef} modalHeight={getResHeight(90)}>
          {<DailyVersUploadForm />}
        </CustomBottomSheet>
        {scheduleData.map((item, index) => (
          <Card
            key={index}
            backgroundColor={currentBgColor}
            borderColor={currentTextColor}
            textColor={currentTextColor}
            currentTabIndex={currentTabIndex}
            waveButtonProps={waveButtonPropsSecondRoute}
            scheduleText={'Going live on'}
            date={item.date}
            imageSource={theme.assets.dailyVerbsBanner}
            onCardPress={() => {
              openBottomSheetWithContent();
            }}
          />
        ))}
      </ScrollView>
    );
  };

  const DailyVersUploadForm = () => {
    return (
      <>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={{flex: 1, paddingHorizontal: '5%'}}>
              <Formik
                innerRef={formikRef}
                initialValues={{
                  name: '',
                  email: '',
                  mobile: '',
                  birthDate: '',
                  baptismDate: '',
                  password: '',
                  otp: '',
                  gender: '',
                }}
                // validationSchema={getValidationSchema()}
                onSubmit={() => {}}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <ScrollView
                      contentContainerStyle={{flexGrow: 1}}
                      keyboardShouldPersistTaps="handled">
                      <View style={{flex: 1}}>
                        {/* {renderStep(
                          values,
                          handleChange,
                          handleBlur,
                          errors,
                          touched,
                          handleSubmit,
                        )} */}
                      </View>
                    </ScrollView>

                    <View
                    // style={[styles.buttonContainer, {bottom: keyboardHeight}]}
                    >
                      <CommonButtonComp
                        title={'Submit'}
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  };
  const routes = [
    {key: 'first', title: `Today's Verses`},
    {key: 'second', title: 'Upcoming'},
  ];

  const scenes = {
    first: FirstRoute,
    second: SecondRoute,
  };

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: currentBgColor}]}>
      <StatusBarComp />
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Daily Verse"
      />
      <View style={styles.tabViewContainer}>
        <TabViewComp
          routes={routes}
          scenes={scenes}
          indicatorStyle={styles.indicatorStyle}
          tabBarContainerStyle={[
            styles.tabBar,
            {backgroundColor: currentBgColor},
          ]}
          onIndexChange={setCurrentTabIndex}
          labelStyle={[styles.labelStyle, {color: currentTextColor}]}
        />
      </View>

      {currentTabIndex !== 0 && (
        <>
          <View
            style={{
              position: 'absolute',
              bottom: getResHeight(7),
              right: getResWidth(7),
            }}>
            <WaveButton
              onPress={() => {
                // props.navigation.navigate('AddMemberForm');
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  card: {
    borderWidth: 1,
    padding: '3%',
    marginBottom: '5%',
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
    marginTop: '3%',
    paddingHorizontal: getResWidth(3),
  },
  indicatorStyle: {
    backgroundColor: 'red',
  },
  tabBar: {
    marginBottom: '4%',
  },
  labelStyle: {
    fontFamily: theme.font.bold,
  },
});

export default Index;
