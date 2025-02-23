import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {VectorIcon} from '../../Components/VectorIcon';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import CustomButton from '../../Components/CustomButton';
import ProfileSection from './ProfileSection';
import CustomHeader from '../../Components/CustomHeader';
import CustomSwitch from '../../Components/CustomSwitch';
import WaveButton from '../../Components/WaveButton';
import {store} from '../../redux/store';
import {setIsUserOnline} from '../../redux/reducer/Auth';
import {useSelector} from 'react-redux';

const options = [
  {icon: 'user', label: 'Profile Details', screen: 'ProfileDetails'},
  {icon: 'key', label: 'Change Password', screen: 'ChangePassword'},
  {icon: 'credit-card', label: 'Payment history', screen: 'PaymentHistory'},
  {icon: 'shield', label: 'Privacy & Security', screen: 'PrivacyPolicy'},
  {icon: 'headphones', label: 'Help & Support', screen: 'HelpSupport'},
  {
    icon: 'trash',
    label: 'Delecte Account',
    screen: 'HelpSupport',
    delete: true,
  },
];

const Profile = props => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(false);

  let {isUserOnline} = useSelector(state => state.user);
  const handleLogout = () => {
    console.log('User logged out');
  };

  const waveButtonProps = useCallback(
    color => ({
      onPress: () => {
        /* Navigation action */
      },
      circleContainer: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
      circleStyle: {
        width: getResHeight(2),
        height: getResHeight(2),
        borderRadius: getResHeight(2) / 2,
        backgroundColor: color,
      },
    }),
    [],
  );

  const handleDarkMode = async () => {
    store.dispatch(setIsUserOnline(!isUserOnline));
    // setIsOnline(prevState => !prevState);
  };
  const waveButtonPropsFirstRoute = waveButtonProps(theme.color.primary);
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backPress={() => props.navigation.goBack()}
        screenTitle={`Account Settings`}
      />
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* User Info Section */}

        <ProfileSection />

        <View
          style={[
            styles.statusContainer,
            {
              borderColor: isUserOnline
                ? theme.color.primary
                : theme.color.redBRGA,
              marginVertical: getResHeight(1),
            },
          ]}>
          <View style={styles.statusTextContainer}>
            {isUserOnline ? (
              <WaveButton {...waveButtonPropsFirstRoute} disabled />
            ) : (
              <VectorIcon
                type="FontAwesome"
                name={'circle'}
                size={16}
                color={theme.color.redBRGA}
              />
            )}

            <Text style={styles.statusText}>
              {isUserOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
          <CustomSwitch value={isUserOnline} onValueChange={handleDarkMode} />
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <AccountOption
              key={index}
              icon={option.icon}
              label={option.label}
              onPress={() => {
                if (option.delete && option.delete == true) {
                  Alert.alert(
                    'Delete Account',
                    'Are you sure you want to permanently delete your account? This action cannot be undone, and all your data will be lost forever.',
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {
                        text: 'Delete',
                        onPress: inputText => {
                          // if (inputText === 'DELETE') {
                          //   console.log('Account Deleted');
                          // } else {
                          //   Alert.alert(
                          //     'Error',
                          //     'Incorrect confirmation text.',
                          //   );
                          // }
                        },
                      },
                    ],
                    'plain-text',
                  );
                } else {
                  navigation.navigate(option.screen);
                }
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Fixed Logout Button */}
      <View style={styles.logoutContainer}>
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          leftIcon={
            <VectorIcon
              type="MaterialCommunityIcons"
              name="logout"
              size={24}
              color={theme.color.white}
            />
          }
        />
      </View>
      <Text
        style={{
          color: theme.color.outlineColor,
          fontSize: getFontSize(1.5),
          textAlign: 'center',
          fontFamily: theme.font.semiBold,
        }}>
        Version 1.0.0
      </Text>
    </SafeAreaView>
  );
};

const AccountOption = ({icon, label, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={[
      styles.option,
      {
        width: '100%',
        paddingLeft: '9%',
        paddingRight: '5%',
      },
    ]}
    onPress={onPress}>
    <View
      style={{
        flexDirection: 'row',
        width: '90%',
      }}>
      <View
        style={{
          width: '10%',
          // backgroundColor: 'red',
        }}>
        <VectorIcon
          type="FontAwesome"
          name={icon}
          size={20}
          color={theme.color.grey}
        />
      </View>
      <Text style={styles.optionText}>{label}</Text>
    </View>
    <VectorIcon
      type="Entypo"
      name={'chevron-right'}
      size={20}
      color={theme.color.grey}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
  scrollContainer: {
    paddingTop: getResHeight(5),
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: getResHeight(2),
  },
  profileImage: {
    width: getResHeight(18),
    height: getResHeight(18),
    borderRadius: getResHeight(100),
    borderWidth: 1,
    borderColor: theme.color.secondary,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: getResHeight(2),
  },
  userName: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  userEmail: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.medium,
    color: theme.color.dimBlack,
  },
  optionsContainer: {
    backgroundColor: theme.color.white,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getResHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: theme.color.dimGrey,
  },
  optionText: {
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.medium,
    color: theme.color.charcolBlack,
  },

  // Online?Offline
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: getResHeight(1),
    paddingHorizontal: getResWidth(5),
    borderWidth: 1.8,
    borderRadius: getResWidth(10), // Smooth edges
    marginHorizontal: getResHeight(3),
  },
  statusTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: theme.color.charcolBlack,
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.semiBold,
    marginLeft: 8,
  },
});

export default Profile;
