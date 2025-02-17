import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {VectorIcon} from '../../Components/VectorIcon';
import theme from '../../utility/theme';
import {getResHeight, getResWidth} from '../../utility/responsive';
import {SafeAreaView} from 'react-native';
import CustomButton from '../../Components/CustomButton';

// import {VectorIcon} from '../../../Components/VectorIcon';

const Profile = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Implement logout logic here
    console.log('User logged out');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/smiling-young-afro-american-builder-man-uniform-with-safety-helmet-thumbing-up-isolated-white-background-with-copy-space_141793-105397.jpg',
          }}
          style={styles.profileImage}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.userName}>Ramesh Marandi</Text>
          <Text style={styles.userEmail}>ramesh.marandi@aiab.in</Text>
        </View>
      </View>

      {/* Account Options */}
      <View style={styles.optionsContainer}>
        <AccountOption
          icon="user"
          label="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <AccountOption
          icon="key"
          label="Change Password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <AccountOption
          icon="credit-card"
          label="Payment Methods"
          onPress={() => navigation.navigate('PaymentMethods')}
        />
        <AccountOption
          icon="shield"
          label="Privacy & Security"
          onPress={() => navigation.navigate('PrivacySettings')}
        />
        <AccountOption
          icon="headphones"
          label="Help & Support"
          onPress={() => navigation.navigate('Support')}
        />
      </View>

      {/* Logout Button */}
      <CustomButton
        title={'Logout'}
        onPress={() => {
          // setIsModalVisible(true);
        }}
        leftIcon={
          <VectorIcon
            type="MaterialCommunityIcons"
            name="logout"
            size={24}
            color={theme.color.white}
          />
        }
        // disabled
        // loading={true}
      />
      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <VectorIcon
          type="MaterialCommunityIcons"
          name="logout"
          size={24}
          color={theme.color.white}
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const AccountOption = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <VectorIcon
      type="FontAwesome"
      name={icon}
      size={20}
      color={theme.color.primary}
    />
    <Text style={styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.white,
    // paddingHorizontal: getResWidth(4),
    padding: getResWidth(5),
  },
  profileSection: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: getResHeight(18),
    height: getResHeight(18),
    borderRadius: getResHeight(100),
    marginRight: 15,
    borderWidth: 1,
    borderColor: theme.color.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.color.charcolBlack,
  },
  userEmail: {
    fontSize: 14,
    color: theme.color.charcolBlack,
  },
  optionsContainer: {
    backgroundColor: theme.color.white,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.color.lightGray,
  },
  optionText: {
    fontSize: 16,
    color: theme.color.charcolBlack,
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.primary,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: theme.color.white,
    marginLeft: 10,
  },
});

export default Profile;
