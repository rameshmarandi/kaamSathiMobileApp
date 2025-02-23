import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import FAQList from '../../Components/FAQListComp';
import FAQListComp from '../../Components/FAQListComp';

import theme from '../../utility/theme';

import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import CustomHeader from '../../Components/CustomHeader';
import {VectorIcon} from '../../Components/VectorIcon';

const faqData = [
  {
    lableName: 'What is KaamSathi?',
    lableValue:
      'KaamSathi is a platform that connects users with professional service providers for various home and business needs.',
  },
  {
    lableName: 'How do I book a service on KaamSathi?',
    lableValue:
      'You can book a service through our website or mobile app by selecting the service, choosing a provider, and confirming your booking.',
  },
  {
    lableName: 'Is there a registration fee to use KaamSathi?',
    lableValue:
      'No, registering on KaamSathi is free for users. Service providers may have a subscription or commission-based model.',
  },
  {
    lableName: 'How can I contact customer support?',
    lableValue:
      'You can reach our customer support via email, phone, or live chat through the KaamSathi app.',
  },
  {
    lableName: 'What types of services are available on KaamSathi?',
    lableValue:
      'KaamSathi offers services like home cleaning, plumbing, electrical work, carpentry, beauty services, repairs, and more.',
  },
  {
    lableName: 'How do I cancel or reschedule a booking?',
    lableValue:
      'Go to your bookings section in the app, select the booking, and choose the cancel or reschedule option. Cancellation policies may apply.',
  },
  {
    lableName: 'Are the service providers verified?',
    lableValue:
      'Yes, all service providers undergo a verification process, including ID verification and background checks.',
  },
  {
    lableName: 'How do I make a payment?',
    lableValue:
      'Payments can be made online through UPI, debit/credit cards, wallets, or in cash after service completion.',
  },
  {
    lableName: 'Is there a refund policy?',
    lableValue:
      'Yes, refunds are processed based on our cancellation and service quality policy. Contact support for assistance.',
  },
  {
    lableName: 'Can I tip the service provider?',
    lableValue:
      'Yes, tipping is optional and can be given directly to the provider or through the app (if available).',
  },
  {
    lableName: 'What if I am not satisfied with the service?',
    lableValue:
      'You can report issues via the app, and we will take necessary actions, including refunds or reassigning a provider.',
  },
  {
    lableName: 'How can I become a service provider on KaamSathi?',
    lableValue:
      'Download the KaamSathi Provider app, register with your details, complete verification, and start receiving job requests.',
  },
  {
    lableName: 'How do I update my profile details?',
    lableValue:
      'You can update your profile details in the "My Account" section of the app or website.',
  },
  {
    lableName: 'Is there a referral program?',
    lableValue:
      'Yes! You can refer friends to KaamSathi and earn rewards. Check the app for more details.',
  },
  {
    lableName: 'Do I need to provide materials for the service?',
    lableValue:
      'Some services require the customer to provide materials, while others include materials in the pricing. Check the service details before booking.',
  },
  {
    lableName: 'What safety measures are in place for services?',
    lableValue:
      'We conduct background checks on providers, and they follow COVID-19 safety guidelines and hygiene protocols.',
  },
  {
    lableName: 'How do I track my service request?',
    lableValue:
      'You can track your service status in the app under "My Bookings" and receive real-time updates.',
  },
  {
    lableName: 'Can I choose a specific service provider?',
    lableValue:
      'Yes, you can browse provider profiles, check reviews, and select a specific provider if available.',
  },
  {
    lableName: 'What if my service provider is late or does not show up?',
    lableValue:
      'If your provider is late, you will be notified. If they don’t show up, you can request a reassignment or refund.',
  },
  {
    lableName: 'How do I leave a review for a service provider?',
    lableValue:
      'After service completion, you can leave a review and rating through the app to help others choose better providers.',
  },
  {
    lableName: 'Can I book services for someone else?',
    lableValue:
      'Yes, you can book a service for a friend or family member by entering their address and contact details.',
  },
  {
    lableName: 'Does KaamSathi operate in my city?',
    lableValue:
      'KaamSathi is available in multiple cities. Check the app or website to see if we operate in your area.',
  },
  {
    lableName: 'How can I delete my account?',
    lableValue:
      'To delete your account, go to settings in the app or contact our customer support.',
  },
];

const HelpSupport = props => {
  const {navigation} = props;
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.color.white,
        }}>
        <CustomHeader
          backPress={() => navigation.goBack()}
          screenTitle={`Support & FAQ`}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingHorizontal: getResWidth(5),
          }}>
          <ContactSupport />
          <FAQListComp data={faqData} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const ContactSupport = () => {
  const handlePress = type => {
    switch (type) {
      case 'call':
        Linking.openURL('tel:+1234567890');
        break;
      case 'email':
        Linking.openURL('mailto:support@example.com?subject=Support Request');
        break;
        // case 'whatsapp':
        //   Linking.openURL('https://wa.me/1234567890');
        //   break;
        // case 'chat':
        //   console.log('Navigate to live chat');
        break;
      default:
        break;
    }
  };

  const supportOptions = [
    {id: 'call', label: 'Call Support', icon: 'phone', type: 'Feather'},
    {id: 'email', label: 'Email Support', icon: 'mail', type: 'Feather'},
    // {
    //   id: 'whatsapp',
    //   label: 'WhatsApp Support',
    //   icon: 'message-circle',
    //   type: 'Feather',
    // },
    // {id: 'chat', label: 'Live Chat', icon: 'message-square', type: 'Feather'},
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact Support</Text>
      {supportOptions.map(option => (
        <TouchableOpacity
          key={option.id}
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => handlePress(option.id)}>
          <VectorIcon
            type={option.type}
            name={option.icon}
            size={getFontSize(2)}
            color={theme.color.black}
          />
          <Text style={styles.buttonText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: theme.color.background,
  },
  header: {
    fontSize: getFontSize(2),
    fontFamily: theme.font.semiBold,
    color: theme.color.dimBlack,
    marginBottom: getResHeight(2),
    paddingTop: getResHeight(2),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.color.white,
    borderColor: theme.color.secondary,
    borderWidth: 1,
    paddingVertical: getResHeight(1.5),
    borderRadius: getResHeight(1),
    justifyContent: 'center',
    marginVertical: getResHeight(0.8),
  },
  buttonText: {
    fontSize: getFontSize(1.7),
    fontFamily: theme.font.medium,
    color: theme.color.black,
    marginLeft: getResWidth(2),
  },
});

export default HelpSupport;
