import React, {memo, useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
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
import {
  base64FileStore,
  CheckFilePermissions,
  formatCurrency,
} from '../../../Components/commonHelper';
import {VectorIcon} from '../../../Components/VectorIcon';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import {store} from '../../../redux/store';
import {
  generateInvoiceAPIHandler,
  getTranscHistoryAPIHandler,
} from '../../../redux/reducer/Transactions/transactionAPI';
import {DateFormator} from '../../../Helpers/CommonHelpers';
import {RefreshControl} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {CustomAlertModal} from '../../../Components/commonComp';
import NoDataFound from '../../../Components/NoDataFound';

const PaymentCard = ({
  item,
  isLoading,
  selectedCard,
  currentTextColor,
  onDownloadPress,
}) => (
  <View style={[styles.transactionContainer, {borderColor: currentTextColor}]}>
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
            {item.transactionID}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, {color: currentTextColor}]}>
              {item.status}
            </Text>
          </View>
          <Text style={[styles.statusDate, {color: currentTextColor}]}>
            {DateFormator(item.donationDate, 'DD MMM YYYY HH:mm A')}
          </Text>
        </View>
      </View>
    </View>
    <TouchableOpacity
      onPress={() => onDownloadPress(item)}
      activeOpacity={0.8}
      style={styles.downloadButton}>
      {selectedCard._id === item._id && isLoading ? (
        <>
          <ActivityIndicator size={getFontSize(3)} color={'white'} />
        </>
      ) : (
        <>
          <VectorIcon
            type="MaterialIcons"
            name="download-for-offline"
            size={getFontSize(4)}
            color={currentTextColor}
          />
        </>
      )}
    </TouchableOpacity>
  </View>
);

const PaymentHistory = memo(props => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alertIcons, setAlertIcons] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const {getTransactionHistory} = useSelector(state => state.transaction);
  useEffect(() => {
    InitialAPICall();
  }, []);

  const InitialAPICall = async () => {
    try {
      await store.dispatch(getTranscHistoryAPIHandler());
    } catch (error) {
      console.error('InitialAPICall', error);
    }
  };

  const alertConfirmHandler = () => {
    setShowAlert(false);
    generatePDF();
    try {
    } catch (error) {}
  };

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      const apiRes = await store.dispatch(
        generateInvoiceAPIHandler({
          transactionID: selectedCard._id,
        }),
      );

      if (apiRes.payload.statusCode == 200) {
        const downloadDir =
          Platform.OS === 'android'
            ? RNFS.DownloadDirectoryPath // Android public Downloads directory
            : RNFS.DocumentDirectoryPath; // iOS internal Documents directory

        // Options for generating the PDF
        const options = {
          html: apiRes.payload.htmlContent,
          fileName: `Donation_Invoice_${Date.now()}`,
          directory: downloadDir,
        };

        // Generate PDF
        const file = await RNHTMLtoPDF.convert(options);

        // Log the generated file path

        const pdfFilePath = `${file.filePath}`;

        const base64PDF = await RNFS.readFile(pdfFilePath, 'base64');
        console.log('Base64 PDF:', base64PDF);
        base64FileStore(
          base64PDF,
          options.fileName,
          'application/pdf',
          item => {
            if (item == 'success') {
              setIsLoading(false);
              setAlertMessage({
                status: 'success',

                alertMsg: 'Invoice download successfully',
              });

              setIsAlertVisible(true);
            } else {
              setIsLoading(false);
              setIsAlertVisible(true);
              setAlertMessage({
                status: 'error',
                alertMsg:
                  'We are facing some technical issues, please try again later',
              });
            }
          },
        );
      } else {
        setIsLoading(false);
        setIsAlertVisible(true);
        setAlertMessage({
          status: 'error',
          alertMsg:
            'We are facing some technical issues, please try again later',
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error generating PDF or converting to Base64:', error);
      Alert.alert(
        'Error',
        'An error occurred while generating the PDF or converting it to Base64.',
      );
    }
  };
  const handleClose = () => {
    setIsAlertVisible(false);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <CustomHeader
        backPress={() => {
          props.navigation.goBack();
        }}
        screenTitle={MsgConfig.paymentHistory}
      />
      <CustomAlertModal
        visible={isAlertVisible}
        message={alertMessage}
        duration={3000} // duration in milliseconds
        onClose={handleClose}
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
        // data={[]}
        data={getTransactionHistory?.transactions}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => InitialAPICall(false)}
          />
        }
        ListEmptyComponent={() => {
          return <NoDataFound />;
        }}
        renderItem={({item}) => (
          <PaymentCard
            item={item}
            isLoading={isLoading}
            selectedCard={selectedCard}
            currentTextColor={currentTextColor}
            onDownloadPress={item => {
              setSelectedCard(item);

              setAlertIcons(
                <VectorIcon
                  type="MaterialIcons"
                  name="download-for-offline"
                  size={getFontSize(8)}
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
    justifyContent: 'space-between',
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
    width: getResWidth(65),
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
