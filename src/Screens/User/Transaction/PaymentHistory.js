import React, {memo, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import MsgConfig from '../../../Config/MsgConfig';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {formatCurrency} from '../../../Components/commonHelper';
import {VectorIcon} from '../../../Components/VectorIcon';
import ConfirmAlert from '../../../Components/ConfirmAlert';

const PaymentCard = ({item, currentTextColor, onDownloadPress}) => (
  <View style={[styles.transactionContainer, {borderColor: currentTextColor}]}>
    <TouchableOpacity
      onPress={onDownloadPress}
      activeOpacity={0.8}
      style={styles.downloadButton}>
      <VectorIcon
        type="MaterialIcons"
        name="download-for-offline"
        size={getFontSize(4)}
        color={currentTextColor}
      />
    </TouchableOpacity>
    <View style={styles.detailsContainer}>
      <View style={styles.detailsHeader}>
        <Text style={[styles.recipientText, {color: currentTextColor}]}>
          Paid to{' '}
          <Text style={[styles.recipientItalic, {color: currentTextColor}]}>
            {item.recipient}
          </Text>
        </Text>
        <Text style={[styles.amountText, {color: currentTextColor}]}>
          ₹ {formatCurrency(item.amount)}
        </Text>
      </View>
      <View style={styles.transactionDetails}>
        <View>
          <Text style={[styles.detailTitle, {color: currentTextColor}]}>
            Transaction ID
          </Text>
          <Text style={[styles.detailValue, {color: currentTextColor}]}>
            {item.transactionId}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, {color: currentTextColor}]}>
              {item.status}
            </Text>
          </View>
          <Text style={[styles.statusDate, {color: currentTextColor}]}>
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

const PaymentHistory = memo(props => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertIcons, setAlertIcons] = useState('');

  // Sample data for demonstration
  const paymentHistory = [
    {
      id: '1',
      recipient: 'Light of Life Ministries',
      amount: 100,
      transactionId: '98798799898798',
      status: 'Confirmed',
      date: '12 Dec 2024 11:34 PM',
    },
    {
      id: '2',
      recipient: 'Global Charity Trust',
      amount: 250,
      transactionId: '12345678901234',
      status: 'Confirmed',
      date: '10 Dec 2024 10:00 AM',
    },
    // Add more payment entries here
  ];

  const alertConfirmHandler = () => {
    setShowAlert(false);
    try {
    } catch (error) {}
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <CustomHeader
        backPress={() => {
          props.navigation.goBack();
        }}
        screenTitle={MsgConfig.paymentHistory}
      />

      <ConfirmAlert
        visible={showAlert}
        alertTitle={alertMsg}
        alertIcon={alertIcons}
        onCancel={() => {
          setAlertIcons('');
          setAlertMsg('');
          setShowAlert(false);
        }}
        onConfirm={alertConfirmHandler}
      />

      <FlatList
        data={paymentHistory}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PaymentCard
            item={item}
            currentTextColor={currentTextColor}
            onDownloadPress={() => {
              setAlertIcons(
                <VectorIcon
                  type="MaterialIcons"
                  name="download-for-offline"
                  size={getFontSize(10)}
                  color={currentTextColor}
                />,
              );
              setAlertMsg('Are you sure you want to download the invoice ?');
              setShowAlert(true);
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: getResWidth(4),
    paddingTop: getResHeight(2),
  },
  transactionContainer: {
    borderWidth: 1,
    padding: getResHeight(1),
    borderRadius: getResHeight(2),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getResHeight(2),
  },
  downloadButton: {
    height: getResHeight(6.6),
    width: getResHeight(6.6),
    borderRadius: getResHeight(100),
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: theme.color.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    width: getResWidth(70),
    marginLeft: getResWidth(3),
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipientText: {
    fontFamily: theme.font.bold,
    fontSize: getFontSize(1.4),
  },
  recipientItalic: {
    fontFamily: theme.font.italic,
    fontSize: getFontSize(1.4),
  },
  amountText: {
    fontFamily: theme.font.extraBold,
    fontSize: getFontSize(2.5),
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: getFontSize(1.4),
    fontFamily: theme.font.semiBold,
  },
  detailValue: {
    fontSize: getFontSize(1),
    fontFamily: theme.font.medium,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    width: getResWidth(17),
    backgroundColor: '#19a819',
    paddingVertical: getResHeight(0.5),
    borderRadius: getResHeight(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    fontSize: getFontSize(0.8),
    fontFamily: theme.font.semiBold,
  },
  statusDate: {
    fontSize: getFontSize(1.3),
    fontFamily: theme.font.semiBold,
    marginTop: getResHeight(0.5),
  },
});

export default PaymentHistory;
