import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {VectorIcon} from '../../Components/VectorIcon';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import CustomButton from '../../Components/CustomButton';

const options = [
  {icon: 'user', label: 'Edit Profile', screen: 'EditProfile'},
  {icon: 'key', label: 'Change Password', screen: 'ChangePassword'},
  {icon: 'credit-card', label: 'Payment history', screen: 'PaymentMethods'},
  {icon: 'shield', label: 'Privacy & Security', screen: 'PrivacySettings'},
  {icon: 'headphones', label: 'Help & Support', screen: 'Support'},
];

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {/* User Info Section */}
        <View style={styles.profileSection}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/smiling-young-afro-american-builder-man-uniform-with-safety-helmet-thumbing-up-isolated-white-background-with-copy-space_141793-105397.jpg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Ramesh Marandi</Text>
            <Text style={styles.userEmail}>ramesh.marandi@aiab.in</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <AccountOption
              key={index}
              icon={option.icon}
              label={option.label}
              onPress={() => navigation.navigate(option.screen)}
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
    // padding: getResWidth(5),
    paddingTop: getResHeight(5),
    // paddingHorizontal: getResWidth(8),

    // paddingBottom: 80, // Ensure space for the fixed button
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
    // borderRadius: 10,
    // padding: 10,
    // elevation: 2,
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
    // marginLeft: getResWidth(3),
  },
  logoutContainer: {
    // position: 'absolute',
    // bottom: 20,
    // left: 20,
    // right: 20,
  },
});

export default Profile;
