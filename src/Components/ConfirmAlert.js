import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';

const ConfirmAlert = ({visible, onCancel, alertTitle, onConfirm}) => {
  const [opacity] = useState(new Animated.Value(0));
  let {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <Animated.View style={[styles.container, {opacity}]}>
        <View
          style={[
            styles.alertBox,
            {
              width: getResWidth(80),
              backgroundColor: currentBgColor,
              borderWidth: 1,
              borderColor: currentTextColor,
              paddingTop: '5%',
            },
          ]}>
          <Image
            source={theme.assets.deleteIcon}
            resizeMode="cover"
            style={{height: getResHeight(10), width: getResHeight(10)}}
          />
          <Text
            style={{
              color: currentTextColor,
              fontFamily: theme.font.medium,
              fontSize: getFontSize(2),
            }}>
            {alertTitle ? alertTitle : 'Are you sure?'}
          </Text>
          <View
            style={[
              styles.buttonsContainer,
              {
                width: '100%',
              },
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cancelButton}
              onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cancelButton}
              onPress={onConfirm}>
              <Text style={[styles.buttonText]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99999,
  },
  alertBox: {
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginVertical: '5%',
  },
  cancelButton: {
    width: '46%',
    backgroundColor: '#ccc',
    paddingVertical: '3%',
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: getFontSize(1.8),
    color: '#000',
    fontFamily: theme.font.medium,
  },
});

export default ConfirmAlert;
