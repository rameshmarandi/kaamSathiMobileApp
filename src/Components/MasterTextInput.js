import React, {forwardRef, useImperativeHandle, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {TextInput as PaperTextInput, HelperText} from 'react-native-paper';
import DatePicker from 'react-native-ui-datepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../utility/theme';
import {getFontSize, getResHeight} from '../utility/responsive';
import {useSelector} from 'react-redux';

const MasterTextInput = forwardRef(
  (
    {
      label,

      value,
      onChangeText,
      timePicker,
      placeholder,
      mode = 'outlined', // 'outlined' or 'flat'
      secureTextEntry = false,
      keyboardType = 'default', // 'numeric', 'email-address', etc.
      isDate = false,
      onSubmitEditing,
      style,
      error,
      minDate,
      maxDate,
      calendarMode,
      maxLength,
      ...rest
    },
    ref,
  ) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    let {isDarkMode, currentBgColor, isAdmin, currentTextColor} = useSelector(
      state => state.user,
    );
    const [isSecureEntry, setIsSecureEntry] = useState(secureTextEntry);
    const textInputRef = useRef(null);

    const handleConfirm = params => {
      const selectedDate = moment(params.date).format('YYYY-MM-DD HH:mm');
      onChangeText(selectedDate); // Format date and time
    };

    useImperativeHandle(ref, () => ({
      focus: () => {
        textInputRef.current?.focus();
      },
      blur: () => {
        textInputRef.current?.blur();
      },
    }));

    return (
      <View style={[styles.container, style]}>
        {isDate ? (
          <>
            <TouchableOpacity
              style={styles.dateInputWrapper}
              onPress={() => {
                setShowDatePicker(true);
              }}>
              <Text style={styles.dateInputText}>
                {value ? moment(value).format('YYYY-MM-DD HH:mm') : placeholder}
              </Text>
            </TouchableOpacity>
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
                  mode={calendarMode ? calendarMode : 'single'} // 'single', 'range', 'multiple'
                  date={value ? new Date(value) : new Date()}
                  onChange={handleConfirm}
                  timePicker={timePicker !== undefined ? timePicker : true} // Enable time picker
                  displayFullDays={true}
                  locale="en"
                  minDate={minDate}
                  maxDate={maxDate}
                  style={styles.datePicker}
                  headerTextStyle={styles.headerTextStyle}
                  yearContainerStyle={styles.yearContainerStyle}
                  monthContainerStyle={styles.monthContainerStyle}
                  headerButtonColor={'#45A245'}
                  selectedItemColor={'#45A245'}
                  selectedTextStyle={{
                    fontFamily: theme.font.semiBold,
                    fontSize: getFontSize(1.3),
                    color: 'white',
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
                    style={styles.closeButton}
                    onPress={() => setShowDatePicker(false)}>
                    <Text style={styles.closeButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <View style={styles.textInputWrapper}>
            <PaperTextInput
              mode={mode}
              label={label}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              secureTextEntry={isSecureEntry}
              outlineColor={currentTextColor}
              placeholderTextColor={'green'}
              activeOutlineColor={currentTextColor}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmitEditing}
              maxLength={maxLength}
              selectionColor="green"
              backgroundColor={{}}
              activeUnderlineColor={'red'}
              cursorColor={currentTextColor}
              theme={{
                colors: {
                  primary: 'white', // Active color
                  placeholder: 'white', // Inactive color
                  text: 'white', // Floating label color
                },
              }}
              style={[
                {
                  backgroundColor: currentBgColor,
                  textAlignVertical: 'center',
                },
              ]}
              contentStyle={{
                fontFamily: theme.font.regular,
                fontSize: getFontSize(1.7),
                textAlignVertical: 'center',
              }}
              textColor={isDarkMode ? currentTextColor : 'green'}
              ref={textInputRef}
              {...rest}
            />
            {secureTextEntry && (
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setIsSecureEntry(!isSecureEntry)}>
                <Icon
                  name={isSecureEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color={currentTextColor}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {error && <HelperText type="error">{error}</HelperText>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginVertical: getResHeight(1),
  },

  dateInputWrapper: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  dateInputText: {
    fontSize: 16,
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
    color: '#45A245',
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
    right: 10,
    top: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    width: '48%',
    padding: 10,
    backgroundColor: '#45A245',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MasterTextInput;
