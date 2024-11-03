// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import UnderReviewLoader from '../../Components/UnderReviewLoader';
// import {useSelector} from 'react-redux';
// import theme from '../../utility/theme';
// import {getFontSize, getResHeight} from '../../utility/responsive';
// import {VectorIcon} from '../../Components/VectorIcon';
// import {CommonButtonComp} from '../../Components/commonComp';
// // import {CommonButtonComp} from '../../../Components/commonComp'; // Assuming you have a button component

// const ApplicationUnderReview = ({navigation}) => {
//   const {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
//     state => state.user,
//   );
//   const handleGoHome = () => {
//     // Navigate to the home page
//     navigation.navigate('Home'); // Make sure 'Home' matches the name of your home screen in your navigator
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           backgroundColor: currentBgColor,
//         },
//       ]}>
//       <View
//         style={
//           {
//             //   marginBottom: '5%',
//           }
//         }>
//         <UnderReviewLoader />
//       </View>
//       <View
//         style={{
//           position: 'absolute',
//           top: getResHeight(45),
//         }}>
//         <Text
//           style={[
//             styles.message,
//             {
//               color: currentTextColor,
//               fontFamily: theme.font.medium,
//               fontSize: getFontSize(1.8),
//               lineHeight: getFontSize(2.9),
//               marginBottom: '8%',
//             },
//           ]}>
//           We've received your details, and your application is now under review.
//           Our team will evaluate the information and get back to you soon. Thank
//           you for your patience!
//         </Text>
//         <CommonButtonComp
//           title={'Go to Home'}
//           onPress={() => {
//             navigation.navigate('Home');
//           }}
//           iconLeft
//           icon={
//             <VectorIcon
//               type={'Ionicons'}
//               name={'home'}
//               size={getFontSize(3)}
//               color={currentBgColor}
//             />
//           }
//         />
//       </View>
//       {/* <CommonButtonComp title="Go to Home" onPress={handleGoHome} /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     // backgroundColor: '#f9f9f9', // Change as per your design
//   },
//   message: {
//     textAlign: 'center',
//     marginBottom: 20,
//     fontSize: 16,
//     color: '#333', // Change as per your design
//   },
// });

// export default ApplicationUnderReview;

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UnderReviewLoader from '../../Components/UnderReviewLoader'; // Assuming this is your custom loader
import {useSelector} from 'react-redux';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import {VectorIcon} from '../../Components/VectorIcon';
import {CommonButtonComp} from '../../Components/commonComp';
import LottieView from 'lottie-react-native';
// import LottieView from 'lottie-react-native'; // Import Lottie

const ApplicationUnderReview = ({navigation}) => {
  const {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
    state => state.user,
  );

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentBgColor,
        },
      ]}>
      {/* Lottie Animation Background */}
      <LottieView
        source={require('../../assets/animationLoader/backgroundAnimation.json')} // Adjust the path to your Lottie file
        autoPlay
        loop
        style={styles.lottieBackground}
      />

      <View
        style={[
          styles.loaderContainer,
          {
            marginTop: getResHeight(-20),
          },
        ]}>
        <UnderReviewLoader />
      </View>

      <View style={styles.messageContainer}>
        <Text
          style={[
            styles.message,
            {color: currentTextColor, fontFamily: theme.font.medium},
          ]}>
          We've received your details, and your application is now under review.
          Our team will evaluate the information and get back to you soon. Thank
          you for your patience!
        </Text>
        <CommonButtonComp
          title={'Go to Home'}
          onPress={handleGoHome}
          iconLeft
          icon={
            <VectorIcon
              type={'Ionicons'}
              name={'home'}
              size={getFontSize(3)}
              color={currentBgColor}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieBackground: {
    position: 'absolute',

    width: '100%',
    height: '100%',

    top: 0,
    left: 0,
  },
  loaderContainer: {
    // Adjust this if you want to change the loader position
  },
  messageContainer: {
    width: '100%',

    alignItems: 'center',
    paddingHorizontal: getResWidth(5),
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: getFontSize(1.8), // Adjust font size according to your design
    lineHeight: getFontSize(2.9),
  },
});

export default ApplicationUnderReview;
