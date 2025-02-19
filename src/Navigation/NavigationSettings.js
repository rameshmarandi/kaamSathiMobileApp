export const screenOptions = {
  headerShown: false,
  animationEnabled: true,
  navigationBarHidden: true, // Hide the navigation bar if needed
  animation: 'fade', //
  animationDuration: 5000,
};

export const transitionCard = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, next, layouts}) => {
    const translateX = Animated.timing(current.progress, {
      toValue: 1,
      duration: 2000, // Adjust duration as needed
      useNativeDriver: true,
    }).interpolate({
      inputRange: [0, 1],
      outputRange: [layouts.screen.width, 0],
    });

    const opacity = next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        })
      : 1;

    return {
      cardStyle: {
        transform: [{translateX}],
        opacity,
      },
    };
  },
};

// export const transitionCard = {
//   gestureDirection: 'horizontal',
//   cardStyleInterpolator: ({current, next, layouts}) => ({
//     cardStyle: {
//       transform: [
//         {
//           translateX: current.progress.interpolate({
//             inputRange: [0, 1],
//             outputRange: [layouts.screen.width, 0],
//           }),
//         },
//         {
//           translateX: next
//             ? next.progress.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, -layouts.screen.width],
//               })
//             : 0,
//         },
//       ],
//     },
//   }),
// };

// export const transitionCard = {
//   animation: 'spring', // Define your preferred animation type
//   gestureDirection: 'horizontal', // Specify the gesture direction for the animation
//   cardStyleInterpolator: ({current, layouts}) => ({
//     cardStyle: {
//       transform: [
//         {
//           translateX: current.progress.interpolate({
//             inputRange: [0, 1],
//             outputRange: [layouts.screen.width, 0],
//           }),
//         },
//       ],
//     },
//   }),
// };
