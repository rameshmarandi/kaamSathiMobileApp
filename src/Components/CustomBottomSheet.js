import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';

const CustomBottomSheet = forwardRef((props, ref) => {
  const bottomSheetRef = useRef(null);
  const {isDarkMode, currentBgColor} = useSelector(state => state.user);

  const {modalHeight = 300, onOpen, onClose, children, ...rest} = props;

  // Animated value for height transition
  const [animatedHeight] = useState(new Animated.Value(modalHeight));

  useEffect(() => {
    // Animate the height whenever modalHeight changes
    Animated.timing(animatedHeight, {
      toValue: modalHeight,
      duration: 300, // Adjust duration for smoother or faster animation
      easing: Easing.out(Easing.cubic), // Smooth easing function
      useNativeDriver: false,
    }).start();
  }, [modalHeight]);

  useImperativeHandle(ref, () => ({
    open: () => {
      bottomSheetRef.current?.open();
      if (props.onOpen) {
        props.onOpen();
      }
    },
    close: () => {
      bottomSheetRef.current?.close();
      if (props.onClose) {
        props.onClose();
      }
    },
  }));

  useEffect(() => {
    // Reset the bottom sheet state on unmount
    return () => {
      bottomSheetRef.current?.close();
    };
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      height={modalHeight} // Base height for initial render
      draggable={true}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: currentBgColor,
        },
      }}>
      <Animated.View
        style={[
          styles.contentContainer,
          {backgroundColor: currentBgColor, height: animatedHeight},
        ]}>
        {children}
      </Animated.View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingHorizontal: '5%',
  },
});

export default CustomBottomSheet;
