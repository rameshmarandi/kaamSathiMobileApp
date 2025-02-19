import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons
import theme from '../../utility/theme';
import {getFontSize, getResHeight} from '../../utility/responsive';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Main Heading */}
      <View style={styles.headerContainer}>
        <Icon
          name="lock"
          size={getFontSize(3)}
          color={theme.color.charcolBlack}
        />
        <Text style={styles.heading}>Privacy Policy & Terms of Service</Text>
      </View>

      {/* English Section */}
      <View style={styles.subHeaderContainer}>
        <Icon name="info" size={getFontSize(3)} color={theme.color.dimBlack} />
        <Text style={styles.subHeading}>
          General Disclaimer & Responsibility
        </Text>
      </View>
      <Text style={styles.text}>
        Our platform acts as an intermediary between laborers and owners. We do
        not take responsibility for any accidents, injuries, damages, or
        disputes arising during work engagements. Owners and laborers must
        establish clear agreements before proceeding.
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon
          name="handshake"
          size={getFontSize(3)}
          color={theme.color.dimBlack}
        />
        <Text style={styles.subHeading}>Labor & Owner Responsibilities</Text>
      </View>
      <Text style={styles.text}>
        - Owners must ensure proper working conditions and safety measures.
        {'\n'}- Laborers must complete assigned work within the agreed time.
        {'\n'}- Any disputes must be settled between the involved parties.
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon
          name="cancel"
          size={getFontSize(3)}
          color={theme.color.dimBlack}
        />
        <Text style={styles.subHeading}>Cancellation & Refund Policy</Text>
      </View>
      <Text style={styles.text}>
        - If an owner cancels after booking confirmation, 80% of the coins will
        be refunded.
        {'\n'}- If cancellation occurs after the booking timeframe, no refund
        will be issued.
        {'\n'}- Refunds are processed only in digital coins and cannot be
        converted into cash.
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon name="gavel" size={getFontSize(3)} color={theme.color.dimBlack} />
        <Text style={styles.subHeading}>User Conduct & Platform Rules</Text>
      </View>
      <Text style={styles.text}>
        - Fraud, fake reviews, or misleading job posts will result in permanent
        account suspension.
        {'\n'}- Harassment, discrimination, or misconduct leads to immediate
        account termination.
        {'\n'}- Users must respect agreements and follow platform policies.
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon
          name="security"
          size={getFontSize(3)}
          color={theme.color.dimBlack}
        />
        <Text style={styles.subHeading}>Data Protection & Privacy</Text>
      </View>
      <Text style={styles.text}>
        - We collect basic user data (name, contact, work history) for service
        facilitation.
        {'\n'}- Your data is not shared with third parties unless legally
        required.
        {'\n'}- Users can request data deletion at any time.
      </Text>

      {/* Hindi Section
      <View style={styles.headerContainer}>
        <Icon
          name="lock"
          size={getFontSize(3)}
          color={theme.color.charcolBlack}
        />
        <Text style={styles.heading}>गोपनीयता नीति और सेवा की शर्तें</Text>
      </View>

      <View style={styles.subHeaderContainer}>
        <Icon name="info" size={getFontSize(3)} color={theme.color.dimBlack} />
        <Text style={styles.subHeading}>सामान्य अस्वीकरण और जिम्मेदारी</Text>
      </View>
      <Text style={styles.text}>
        हमारा प्लेटफॉर्म मालिकों और श्रमिकों के बीच एक मध्यस्थ के रूप में कार्य
        करता है। हम किसी भी दुर्घटना, क्षति या विवाद के लिए उत्तरदायी नहीं हैं।
        मालिकों और श्रमिकों को स्पष्ट समझौते करने चाहिए।
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon name="handshake" size={getFontSize(3)} color={theme.color.dimBlack} />
        <Text style={styles.subHeading}>श्रमिक और मालिक की जिम्मेदारियाँ</Text>
      </View>
      <Text style={styles.text}>
        - मालिक को सुनिश्चित करना चाहिए कि सुरक्षित कार्य परिस्थितियाँ हों।
        {'\n'}- श्रमिकों को समय पर कार्य पूरा करना होगा।
        {'\n'}- कोई भी विवाद सीधे संबंधित पक्षों द्वारा हल किया जाना चाहिए।
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon name="cancel" size={getFontSize(3)} color="#d9534f" />
        <Text style={styles.subHeading}>रद्दीकरण और धनवापसी नीति</Text>
      </View>
      <Text style={styles.text}>
        - यदि कोई मालिक पुष्ट बुकिंग रद्द करता है, तो 80% सिक्के वापस किए
        जाएंगे।
        {'\n'}- यदि समय सीमा के बाद रद्द किया जाता है, कोई धनवापसी नहीं होगी।
        {'\n'}- धनवापसी केवल डिजिटल सिक्कों में की जाएगी और इसे नकद में नहीं
        बदला जा सकता।
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon name="gavel" size={getFontSize(3)} color={theme.color.dimBlack} />
        <Text style={styles.subHeading}>
          उपयोगकर्ता आचार संहिता और प्लेटफॉर्म नियम
        </Text>
      </View>
      <Text style={styles.text}>
        - धोखाधड़ी, झूठी समीक्षा या फर्जी नौकरियाँ स्थायी खाता निलंबन का कारण
        बनेंगी।
        {'\n'}- उत्पीड़न, भेदभाव या दुराचार के परिणामस्वरूप खाता तुरंत समाप्त
        किया जाएगा।
        {'\n'}- उपयोगकर्ताओं को नीतियों का पालन करना होगा।
      </Text>

      <View style={styles.subHeaderContainer}>
        <Icon name="security" size={getFontSize(3)} color={theme.color.dimBlack} />
        <Text style={styles.subHeading}>डेटा सुरक्षा और गोपनीयता</Text>
      </View>
      <Text style={styles.text}>
        - हम मूल उपयोगकर्ता डेटा (नाम, संपर्क जानकारी, कार्य इतिहास) एकत्र करते
        हैं।
        {'\n'}- आपका डेटा तीसरे पक्ष के साथ साझा नहीं किया जाएगा।
        {'\n'}- उपयोगकर्ता किसी भी समय डेटा हटाने का अनुरोध कर सकते हैं।
      </Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResHeight(2),
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getResHeight(3),
  },
  heading: {
    fontSize: getFontSize(1.9),
    marginLeft: '2%',
    fontFamily: theme.font.semiBold,
    color: theme.color.charcolBlack,
  },
  subHeading: {
    fontSize: getFontSize(1.7),
    marginLeft: '2%',
    color: theme.color.charcolBlack,
    fontFamily: theme.font.semiBold,
  },
  text: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.6),
    lineHeight: getResHeight(3),
    marginTop: getResHeight(1),
    color: '#555',
  },
});

export default PrivacyPolicy;
