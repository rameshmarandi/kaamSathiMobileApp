import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from 'react-native';
import {TextInput as PaperTextInput} from 'react-native-paper';
import DatePicker from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../utility/theme';
import {getFontSize, getResHeight} from '../utility/responsive';
import {useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {VectorIcon} from './VectorIcon';

const MasterTextInput = forwardRef(
  (
    {
      label,
      value,
      onChangeText,
      timePicker,
      placeholder,
      mode = 'outlined',
      secureTextEntry = false,
      keyboardType = 'default',
      isDate = false,
      onSubmitEditing,
      topLableName,
      style,
      error,
      minDate,
      maxDate,
      calendarMode,
      maxLength,
      isDropdown = false,
      dropdownData = [],
      onDropdownChange,
      dropdownSearch,
      isValid,
      ...rest
    },
    ref,
  ) => {
    // State to manage the visibility of the date picker modal
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    // Fetching current theme settings from Redux store
    const {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
      state => state.user,
    );
    // State to manage secure text entry visibility
    const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);
    // Reference to the text input field
    const textInputRef = useRef(null);

    // Animated value for shake effect
    const shakeAnim = useRef(new Animated.Value(0)).current;

    // Expose focus and blur methods for the text input field to parent components via ref
    useImperativeHandle(ref, () => ({
      focus: () => textInputRef.current?.focus(),
      blur: () => textInputRef.current?.blur(),
    }));

    // Handle the date selection and format the date as 'YYYY-MM-DD HH:mm'
    const handleConfirm = useCallback(
      params => {
        const selectedDate = moment(params.date).format('YYYY-MM-DD HH:mm');
        onChangeText(selectedDate);
      },
      [onChangeText],
    );

    // Toggle visibility of secure text entry (e.g., show/hide password)
    const toggleSecureEntry = useCallback(() => {
      setIsSecureEntry(prev => !prev);
    }, []);

    // Function to trigger shake animation
    const triggerShake = () => {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: -10, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 10, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -5, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 5, // Smaller displacement for a subtle effect
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0, // Reset position
          duration: 50, // Shorter duration for quicker shake
          useNativeDriver: true,
        }),
      ]).start();
    };

    // Trigger shake animation if there's an error
    React.useEffect(() => {
      if (error) {
        triggerShake();
      }
    }, [error]);

    // Memoized function to render the date picker modal
    const renderDatePicker = useMemo(
      () => (
        <Modal
          isVisible={showDatePicker}
          animationIn="zoomIn"
          animationOut="zoomOut"
          animationOutTiming={500}
          animationInTiming={600}
          backdropTransitionOutTiming={0}
          onBackdropPress={() => setShowDatePicker(false)}>
          <View style={styles.datePickerContainer}>
            <DatePicker
              mode={calendarMode || 'single'}
              date={value ? new Date(value) : new Date()}
              onChange={handleConfirm}
              timePicker={timePicker !== undefined ? timePicker : true}
              displayFullDays={true}
              locale="en"
              minDate={minDate}
              maxDate={maxDate}
              style={styles.datePicker}
              todayTextStyle={{
                color: 'orange',
              }}
              // selectedTextStyle
              headerTextStyle={[
                styles.headerTextStyle,
                {
                  color: currentBgColor,
                },
              ]}
              yearContainerStyle={styles.yearContainerStyle}
              monthContainerStyle={styles.monthContainerStyle}
              headerButtonColor={currentBgColor}
              selectedItemColor={currentBgColor}
              selectedTextStyle={{
                fontFamily: theme.font.semiBold,
                fontSize: getFontSize(1.3),
                color: currentTextColor,
                // 'white',
              }}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: 'transparent',
                    borderColor: theme.color.primary,
                    borderWidth: 1,
                  },
                ]}
                onPress={() => setShowDatePicker(false)}>
                <Text style={[styles.closeButtonText, {color: 'black'}]}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor: currentBgColor,
                  },
                ]}
                onPress={() => setShowDatePicker(false)}>
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ),
      [
        showDatePicker,
        value,
        calendarMode,
        timePicker,
        minDate,
        maxDate,
        handleConfirm,
      ],
    );

    // Define border color based on error presence
    const borderColor = error ? 'red' : currentTextColor;

    const animatedStyle = {
      transform: [
        {
          translateX: shakeAnim,
        },
      ],
    };

    return (
      <View style={[styles.container, style]}>
        {topLableName && (
          <Text
            style={{
              color: currentTextColor,
              fontFamily: theme.font.medium,
              marginVertical: getResHeight(1),
            }}>
            {topLableName} <Text style={{color: 'red'}}>{'*'}</Text>
          </Text>
        )}
        {isDate ? (
          <>
            <TouchableOpacity
              style={[
                styles.dateInputWrapper,
                {
                  backgroundColor: currentBgColor,
                  textAlignVertical: 'center',
                  height: getResHeight(6),
                  borderColor: currentTextColor,
                },
              ]}
              onPress={() => setShowDatePicker(true)}>
              <Text
                style={[
                  styles.dateInputText,
                  {
                    color: currentTextColor,
                  },
                ]}>
                {value ? value : placeholder}
              </Text>
            </TouchableOpacity>
            {renderDatePicker}
          </>
        ) : isDropdown ? (
          <Dropdown
            data={dropdownData}
            labelField="label"
            valueField="value"
            search={dropdownSearch}
            placeholder={placeholder}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={onDropdownChange}
            style={[
              styles.dropdown,
              {
                borderColor: borderColor,
                backgroundColor: currentBgColor,
              },
            ]}
            selectedTextProps={{
              color: 'red',
            }}
            activeColor={currentBgColor}
            containerStyle={{
              backgroundColor: currentBgColor,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              marginTop: '-2%',
              borderWidth: 1,
              borderColor: currentTextColor,
              overflow: 'hidden',
            }}
            itemTextStyle={{
              color: currentTextColor,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.8),
              margin: 0,
              padding: 0,
            }}
            placeholderStyle={{
              color: currentTextColor,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.9),
            }}
            renderRightIcon={() => (
              <VectorIcon
                type={'AntDesign'}
                name={isFocus ? 'upcircle' : 'downcircle'}
                size={getFontSize(2.5)}
                color={currentTextColor}
                style={{
                  zIndex: 1,
                }}
              />
            )}
            selectedTextStyle={{
              color: currentTextColor,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.9),
            }}
          />
        ) : (
          <View style={styles.textInputWrapper}>
            <Animated.View style={[animatedStyle]}>
              <PaperTextInput
                mode={mode}
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={isSecureEntry}
                outlineColor={borderColor}
                placeholderTextColor={'grey'}
                activeOutlineColor={borderColor}
                keyboardType={keyboardType}
                onSubmitEditing={onSubmitEditing}
                maxLength={maxLength}
                selectionColor={currentTextColor}
                cursorColor={currentTextColor}
                style={{
                  backgroundColor: currentBgColor,
                  textAlignVertical: 'center',
                }}
                contentStyle={{
                  fontFamily: theme.font.regular,
                  fontSize: getFontSize(1.9),
                  textAlignVertical: 'center',
                  height: getResHeight(6),
                }}
                textColor={currentTextColor}
                ref={textInputRef}
                {...rest}
              />
            </Animated.View>
            {secureTextEntry && (
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={toggleSecureEntry}>
                <Icon
                  name={isSecureEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={currentTextColor}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {error && (
          <>
            <Text
              style={{
                fontFamily: theme.font.regular,
                marginTop: '2%',
                fontSize: getFontSize(1.5),
                color: '#ff0038',
              }}>
              {error}
            </Text>
            <AntDesign
              name="closecircle"
              size={getResHeight(2.3)}
              color={'#ff0038'}
              style={styles.eyeIcon}
            />
          </>
        )}
        {isValid && !error && (
          <Icon
            name="check-circle"
            size={getResHeight(2.7)}
            color={theme.color.green}
            style={styles.eyeIcon}
          />
        )}
      </View>
    );
  },
);

// Styles for the MasterTextInput component
const styles = StyleSheet.create({
  container: {
    marginVertical: getResHeight(1),
  },
  dateInputWrapper: {
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  dateInputText: {
    fontSize: 16,
    // color: 'orange',
    color: 'black',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: '#F4FAF3',
  },
  datePicker: {
    width: '100%',
  },
  headerTextStyle: {
    // color: 'red',
    // theme.color.green,
    fontFamily: theme.font.bold,
    fontSize: getFontSize(2),
  },
  yearContainerStyle: {
    backgroundColor: '#F4FAF3',
  },
  monthContainerStyle: {
    backgroundColor: '#F4FAF3',
  },
  textInputWrapper: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: getResHeight(1.5),
    top: getResHeight(2.5),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: '48%',
    padding: 10,
    backgroundColor: theme.color.green,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  dropdown: {
    height: getResHeight(6),
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default React.memo(MasterTextInput);
