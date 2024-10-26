import React, {
  useState,
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import theme from '../utility/theme';
import {getFontSize, getResHeight} from '../utility/responsive';
import {useSelector} from 'react-redux';

const OTPInput = forwardRef(
  (
    {
      length = 4,
      onComplete,
      showConfirmation = false, // Prop to toggle confirmation OTP inputs
      otpText = 'Enter OTP',
      confirmOtpText = 'Confirm OTP',
      secureTextEntry = false,
    },
    ref,
  ) => {
    const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
      state => state.user,
    );

    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [confirmationOtp, setConfirmationOtp] = useState(
      new Array(length).fill(''),
    );
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(null); // Track confirmation status

    const otpRefs = useRef([]); // Refs for OTP inputs
    const confirmOtpRefs = useRef([]); // Refs for confirmation OTP inputs

    // Monitor when the OTP and confirmation OTP are fully entered
    useEffect(() => {
      if (otp.join('').length === length) {
        if (showConfirmation) {
          // If confirmation is required, wait until both are fully entered
          if (confirmationOtp.join('').length === length) {
            verifyOtp(); // Trigger verification after both OTP and confirmation are filled
          }
        } else {
          verifyOtp(); // Trigger verification after OTP is filled (if no confirmation is needed)
        }
      }
    }, [otp, confirmationOtp]); // Dependency array to monitor both otp and confirmationOtp

    const handleChangeText = (text, index, type) => {
      const newOtp = type === 'otp' ? [...otp] : [...confirmationOtp];

      // Update the appropriate OTP state
      newOtp[index] = text;

      // Update the state based on the input type
      if (type === 'otp') {
        setOtp(newOtp);
      } else {
        setConfirmationOtp(newOtp);
      }

      // Move focus to the next input
      if (text && index < length - 1) {
        if (type === 'otp') {
          otpRefs.current[index + 1].focus();
        } else if (showConfirmation) {
          confirmOtpRefs.current[index + 1].focus();
        }
      } else if (text === '' && index > 0) {
        if (type === 'otp') {
          otpRefs.current[index - 1].focus();
        } else if (showConfirmation) {
          confirmOtpRefs.current[index - 1].focus();
        }
      }

      // Auto-focus on confirmation box once the OTP input is filled
      if (
        type === 'otp' &&
        newOtp.join('').length === length &&
        showConfirmation
      ) {
        confirmOtpRefs.current[0].focus(); // Auto-focus on first confirmation box
      }
    };

    // Handle backspace and focus movement from Confirm OTP to OTP input
    const handleKeyPress = (e, index, type) => {
      if (e.nativeEvent.key === 'Backspace') {
        if (type === 'confirm' && confirmationOtp[index] === '') {
          // Move focus to the previous confirm input or to the OTP row if at index 0
          if (index > 0) {
            confirmOtpRefs.current[index - 1].focus();
          } else {
            // Move to the last input box in the OTP row
            otpRefs.current[length - 1].focus();
          }
        } else if (type === 'otp' && otp[index] === '' && index > 0) {
          // Move focus to the previous OTP input if backspacing
          otpRefs.current[index - 1].focus();
        }
      }
    };

    // Focus the first OTP input when the component mounts
    useEffect(() => {
      // if (otpRefs.current[0]) {
      //   otpRefs.current[0].focus();
      // }

      setTimeout(() => {
        if (otpRefs.current[0]) {
          otpRefs.current[0].focus();
        }
      }, 100);
    }, []);

    const handleFocus = (index, type) => {
      setFocusedIndex(type === 'otp' ? index : index + length);
    };

    const handleBlur = () => {
      setFocusedIndex(null);
    };

    // Expose verifyOtp via ref to allow external control
    useImperativeHandle(ref, () => ({
      verifyOtp,
    }));

    const verifyOtp = () => {
      const otpString = otp.join('');
      if (showConfirmation) {
        const confirmationString = confirmationOtp.join('');

        console.log('TOPENMDER', otpString, confirmationString);
        if (otpString === confirmationString) {
          setIsConfirmed(true);
          onComplete({otp: otpString, isConfirmed: true});
        } else {
          setIsConfirmed(false);
          onComplete({otp: otpString, isConfirmed: false});
        }
      } else {
        // If no confirmation is required, just pass the OTP
        onComplete({otp: otpString, isConfirmed: true});
      }
    };

    return (
      <View style={styles.container}>
        {otpText == '0' ? null : (
          <Text
            style={[
              styles.label,
              {
                color: currentTextColor,
              },
            ]}>
            {otpText}
          </Text>
        )}

        <View
          style={[
            styles.otpContainer,
            {
              marginTop: otpText == '0' ? '5%' : 0,
            },
          ]}>
          {otp.map((_, index) => (
            <TextInput
              key={`otp-${index}`}
              ref={ref => (otpRefs.current[index] = ref)}
              style={[
                styles.input,

                {
                  color: currentTextColor,
                  borderColor:
                    focusedIndex === index
                      ? currentTextColor
                      : theme.color.placeholder,
                },
              ]}
              keyboardType="numeric"
              maxLength={1}
              secureTextEntry={secureTextEntry}
              cursorColor={currentTextColor}
              selectionColor={currentTextColor}
              onChangeText={text => handleChangeText(text, index, 'otp')}
              onKeyPress={e => handleKeyPress(e, index, 'otp')}
              onFocus={() => handleFocus(index, 'otp')}
              onBlur={handleBlur}
              returnKeyType={index === length - 1 ? 'done' : 'next'}
            />
          ))}
        </View>

        {/* {showConfirmation && (
          <>
            <Text style={styles.label}>{confirmOtpText}</Text>
            <View style={styles.otpContainer}>
              {confirmationOtp.map((_, index) => (
                <TextInput
                  key={`confirm-${index}`}
                  ref={ref => (confirmOtpRefs.current[index] = ref)}
                  style={[
                    styles.input,
                    focusedIndex === index + length && 'white',
                    // styles.activeInput,
                  ]}
                  keyboardType="numeric"
                  maxLength={1}
                  cursorColor={'white'}
                  selectionColor={'white'}
                  onChangeText={text =>
                    handleChangeText(text, index, 'confirm')
                  }
                  secureTextEntry={true}
                  onKeyPress={e => handleKeyPress(e, index, 'confirm')}
                  onFocus={() => handleFocus(index, 'confirm')}
                  onBlur={handleBlur}
                  returnKeyType={index === length - 1 ? 'done' : 'next'}
                />
              ))}
            </View>
          </>
        )} */}

        {isConfirmed !== null && !isConfirmed && (
          <Text style={styles.resultText}>
            {'OTP does not match. Please try again.'}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginTop: getResHeight(1),

    fontSize: getFontSize(1.7),
    fontFamily: theme.font.medium,
    marginBottom: getResHeight(1),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: getResHeight(7.4),
    height: getResHeight(7),
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    // color:"red"
  },
  activeInput: {
    borderColor: theme.color.UOTM_primary,
  },
  resultText: {
    paddingTop: '5%',
    fontSize: getFontSize(12),
    fontFamily: theme.font.semiBold,
    color: 'red',
  },
});

export default OTPInput;
