import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Circle, Svg} from 'react-native-svg';
// import {CheckCircle} from 'react-native-feather';
import {getFontSize, getResHeight} from '../../utility/responsive';
import theme from '../../utility/theme';
import {VectorIcon} from '../../Components/VectorIcon';

const ProfileSection = ({
  profileCompletion = 100,
  verificationCompletion = 100,
}) => {
  const isVerified = verificationCompletion === 100;
  const imageSize = getResHeight(16); // Adjusted dynamically
  const strokeWidth = isVerified ? getResHeight(0.5) : getResHeight(0.8);
  const circleSize = imageSize + strokeWidth * 2; // Ensuring the border perfectly surrounds the image
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = verificationCompletion / 100;

  // Change stroke color dynamically
  const progressColor = isVerified
    ? theme.color.primary
    : theme.color.secondary;

  return (
    <View style={styles.container}>
      {/* Circular Progress around Image */}
      <View
        style={[styles.imageWrapper, {width: circleSize, height: circleSize}]}>
        <Svg
          height={circleSize}
          width={circleSize}
          style={styles.progressCircle}>
          {/* Background Circle */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
          />
        </Svg>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/smiling-young-afro-american-builder-man-uniform-with-safety-helmet-thumbing-up-isolated-white-background-with-copy-space_141793-105397.jpg',
          }}
          style={[
            styles.profileImage,
            {width: imageSize, height: imageSize, borderRadius: imageSize / 2},
          ]}
        />

        {/* Verified Badge */}
        {isVerified && (
          <View style={styles.verifiedBadge}>
            <VectorIcon
              type="MaterialIcons"
              name={'verified'}
              size={getFontSize(2.9)}
              color={theme.color.primary}
            />
          </View>
        )}
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Ramesh Marandi</Text>
        <Text style={styles.userEmail}>ramesh.marandi@aiab.in</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    position: 'absolute',
  },
  profileImage: {
    resizeMode: 'cover',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: '7%',
    backgroundColor: 'white',
    borderRadius: 50,
    padding: getResHeight(0.5),
    borderWidth: 2,
    borderColor: theme.color.primary,
  },
  userInfo: {
    alignItems: 'center',
    marginVertical: getResHeight(1),
  },
  userName: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  userEmail: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.medium,
    color: theme.color.dimBlack,
  },
});

export default ProfileSection;
