import React, {memo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import theme from '../../../utility/theme';
import {getFontSize} from '../../../utility/responsive';
import {ActivityIndicator} from 'react-native';

const PrivacyPolicy = memo(({onAccept, onSkip, isLoading}) => {
  // Get values from Redux state
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const sections = [
    {
      title: '1. Information We Collect',
      content: 'We collect the following types of information:',
      bullets: [
        'Personal Information: When you create an account or interact with our services, we may collect personal information such as your name, email address, phone number, and other contact details.',
        'Usage Data: We may collect information about your usage of the services, including IP addresses, browser type, and access times.',
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the collected information for the following purposes:',
      bullets: [
        'To provide services: We use your information to manage your account, provide services, and communicate with you.',
        'To improve services: We analyze usage data to improve our app, develop new features, and enhance the user experience.',
        'For marketing: With your consent, we may use your information to send newsletters, updates, and promotional materials.',
      ],
    },
    {
      title: '3. Data Security',
      content:
        'We implement reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of data transmission or storage is completely secure.',
    },
    {
      title: '4. Third-Party Services',
      content:
        'We may use third-party services to facilitate our operations, such as payment processors or analytics providers. These third parties may have their own privacy policies and are responsible for handling your information in accordance with their practices.',
    },
    {
      title: '5. Your Choices',
      content: 'You have the following options regarding your information:',
      bullets: [
        'Access and update: You can access and update your personal information by logging into your account.',
        'Opt-out: You can opt-out of receiving marketing communications by following the instructions provided in those communications.',
      ],
    },
    {
      title: "6. Children's Privacy",
      content:
        'Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.',
    },
    {
      title: '7. Changes to the Privacy Policy',
      content:
        'We may update this privacy policy from time to time. We will notify you of any significant changes. Continued use of our services after changes have been made constitutes acceptance of the new policy.',
    },
    {
      title: '8. Contact Us',
      content:
        'If you have any questions or concerns about this privacy policy, please contact us at lightoflifeministires@gmail.com',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, {color: currentTextColor}]}>
          Privacy Policy
        </Text>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={[styles.sectionTitle, {color: currentTextColor}]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionContent, {color: currentTextColor}]}>
              {section.content}
            </Text>
            {section.bullets &&
              section.bullets.map((bullet, i) => (
                <View key={i} style={styles.bulletPointContainer}>
                  <Text style={[styles.bulletPoint, {color: currentTextColor}]}>
                    {'\u2022'}
                  </Text>
                  <Text
                    style={[styles.bulletContent, {color: currentTextColor}]}>
                    {bullet}
                  </Text>
                </View>
              ))}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={onAccept}
            activeOpacity={0.8}
            disabled={isLoading}
            style={[
              styles.buttonAccept,
              {
                backgroundColor: currentTextColor,
              },
            ]}>
            {isLoading ? (
              <>
                <ActivityIndicator
                  size={getFontSize(3)}
                  color={currentBgColor}
                />
              </>
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: currentBgColor,
                  },
                ]}>
                Accept
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
  },
  title: {
    fontSize: getFontSize(2.1),
    fontFamily: theme.font.bold,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.semiBold,
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.regular,
    marginBottom: 10,
    lineHeight: 24,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    fontSize: getFontSize(1.9),
    marginRight: 5,
    fontFamily: theme.font.semiBold,
  },
  bulletContent: {
    fontSize: getFontSize(1.6),
    flexShrink: 1,
    fontFamily: theme.font.regular,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    paddingHorizontal: 20,
    marginBottom: '5%',
  },

  buttonAccept: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
  },
});

export default PrivacyPolicy;
