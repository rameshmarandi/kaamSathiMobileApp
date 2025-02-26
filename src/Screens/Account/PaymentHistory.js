import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {CircularProgress} from 'react-native-circular-progress';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../Components/CustomHeader';
import theme from '../../utility/theme';

import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import {VectorIcon} from '../../Components/VectorIcon';
import {initiatePayment} from '../../Components/PaymentHandler';

const PaymentHistory = props => {
  const {navigation} = props;
  const [activeTab, setActiveTab] = useState('progress');
  const [spent, setSpent] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const handleTransaction = (amount, type) => {
    const newSpent = type === 'spend' ? spent + amount : spent - amount;
    if (newSpent < 0 || newSpent > 100) return;

    setSpent(newSpent);
    setTransactions([
      {
        id: Date.now(),
        amount,
        type,
        date: new Date().toISOString(),
      },
      ...transactions,
    ]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return (
          <FlatList
            data={transactions}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.transactionCard}>
                <Ionicons
                  name={item.type === 'spend' ? 'arrow-up' : 'arrow-down'}
                  size={20}
                  color={item.type === 'spend' ? '#ff6b6b' : '#4ecdc4'}
                />
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionType}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Text>
                  <Text style={styles.transactionDate}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    item.type === 'spend' ? styles.spent : styles.refunded,
                  ]}>
                  {item.type === 'spend' ? '-' : '+'}
                  {item.amount}
                </Text>
              </View>
            )}
          />
        );
      case 'refund':
        return (
          <View style={styles.refundContainer}>
            <Text style={styles.sectionTitle}>Pending Refunds</Text>
            <View style={styles.refundCard}>
              <Ionicons name="card" size={24} color="#6369ff" />
              <Text style={styles.refundText}>No pending refunds</Text>
              <TouchableOpacity style={styles.refundButton}>
                <Text style={styles.refundButtonText}>Request Refund</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.progressSection}>
            <CircularProgress
              size={getResHeight(20)}
              width={getResWidth(3)}
              fill={100 - spent}
              tintColor={theme.color.secondary2}
              // "#6369ff"
              backgroundColor="#f0f0f8"
              rotation={0}
              lineCap="round">
              {() => (
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressValue}>{spent}/100</Text>
                  <Text style={styles.progressLabel}>Points Used</Text>
                </View>
              )}
            </CircularProgress>

            <View style={styles.controls}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.actionButton,
                  {backgroundColor: theme.color.secondary2},
                ]}
                onPress={() => handleTransaction(10, 'spend')}>
                <Ionicons name="arrow-up" size={20} color="white" />
                <Text style={styles.actionButtonText}>Spend 10 Points</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.actionButton, {backgroundColor: '#4ecdc4'}]}
                onPress={() => handleTransaction(10, 'refund')}>
                <Ionicons name="arrow-down" size={20} color="white" />
                <Text style={styles.actionButtonText}>Refund 10 Points</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };
  const handlePaymentGateway = values => {
    try {
      // setIsPayBtnLoading(true);
      // setTimeout(() => {
      // bottomSheetRef.current?.close();
      initiatePayment(
        '100',
        {},
        async data => {
          // console.log('Payment_Success_front', data);
          if (data?.razorpay_payment_id) {
            // const res = await store.dispatch(
            //   createTransactionAPIHandler({
            //     amount: values.amount,
            //     transactionID: data?.razorpay_payment_id,
            //     donationMessage: 'Church offering',
            //     paymentStatus: 'success',
            //   }),
            // );
          }
        },
        async data => {
          console.error('API_FES', data);
        },
      );
      // setIsPayBtnLoading(false);
      // }, 300);
    } catch (error) {
      console.error('Initialite_payment_error', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle={`Payment History`}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Wallet Overview</Text>
          <View
            style={[
              styles.balanceCard,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <View>
              <Text style={styles.balanceText}>Available Points</Text>
              <Text style={styles.balanceValue}>{100 - spent}</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handlePaymentGateway}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: getResHeight(5),
                paddingVertical: getResHeight(0.3),
                paddingHorizontal: getResWidth(2),
                borderRadius: 12,
                backgroundColor: theme.color.secondary2,
              }}>
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'hand-coin'}
                size={getFontSize(3)}
                color={theme.color.white}
              />
              <Text
                style={{
                  fontFamily: theme.font.semiBold,
                  fontSize: getFontSize(1.7),
                  color: theme.color.white,
                  marginLeft: getResWidth(1),
                }}>
                Buy coins
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'progress' && styles.activeTab]}
            onPress={() => setActiveTab('progress')}>
            <Ionicons
              name="stats-chart"
              color={activeTab === 'progress' ? theme.color.secondary2 : '#888'}
              size={20}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'progress' && styles.activeTabText,
              ]}>
              Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}>
            <Ionicons
              name="list"
              color={
                activeTab === 'history'
                  ? //  theme.color.secondary2
                    theme.color.secondary2
                  : '#888'
              }
              size={20}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'history' && styles.activeTabText,
              ]}>
              History
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'refund' && styles.activeTab]}
            onPress={() => setActiveTab('refund')}>
            <Ionicons
              name="refresh"
              color={activeTab === 'refund' ? theme.color.secondary2 : '#888'}
              size={20}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === 'refund' && styles.activeTabText,
              ]}>
              Refund
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fe',
  },
  content: {
    padding: getResHeight(2.8),
  },
  header: {
    marginBottom: getResHeight(2),
  },
  title: {
    fontSize: getFontSize(2),
    // fontWeight: '700',
    fontFamily: theme.font.bold,
    color: '#2d3142',
    marginBottom: getResHeight(1),
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.color.secondary2,
    //  theme.color.secondary2,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#f0f2ff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  activeTabText: {
    color: theme.color.secondary2,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  progressTextContainer: {
    alignItems: 'center',
  },
  progressValue: {
    fontSize: getFontSize(2.6),
    fontFamily: theme.font.bold,
    color: '#2d3142',
  },
  progressLabel: {
    fontSize: getFontSize(1.4),
    color: '#888',
    marginTop: 8,
  },
  controls: {
    marginTop: 32,
    gap: 16,
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3142',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  spent: {
    color: '#ff6b6b',
  },
  refunded: {
    color: '#4ecdc4',
  },
  refundContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3142',
    marginBottom: 16,
  },
  refundCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  refundText: {
    color: '#888',
    fontSize: 16,
  },
  refundButton: {
    backgroundColor: '#f0f2ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  refundButtonText: {
    color: theme.color.secondary2,
    fontWeight: '600',
  },
});

export default PaymentHistory;
