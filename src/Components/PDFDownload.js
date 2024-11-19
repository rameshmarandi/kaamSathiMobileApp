import React, {useState, useCallback, memo, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {useSelector} from 'react-redux';
import {VectorIcon} from './VectorIcon';
import {CheckFilePermissions, downloadFileHandler} from './commonComp';
import {getFontSize} from '../utility/responsive';
import theme from '../utility/theme';

const PDFDownload = memo(
  ({
    isVisisble,
    urlType,
    onClose,
    showDownloadBtn,
    pdfLink,
    onRequestClose,
  }) => {
    const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
      state => state.user,
    );
    const [downloadProgress, setDownloadProgress] = useState(false);
    const [percent, setPercentage] = useState(0);
    const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false);
    const [onLoading, setOnLoading] = useState(false);
    const [downloadOnComplete, setDownloadOnComplete] = useState(false);
    const [downlaodSuccess, setDownlaodSuccess] = useState(false);

    // Animated value for header visibility
    const headerOpacity = useRef(new Animated.Value(1)).current;

    const handleDownload = useCallback(async () => {
      if (await CheckFilePermissions()) {
        setDownloadProgress(true);
        try {
          const response = await downloadFileHandler(pdfLink, 'Ramesh');
          if (response.respInfo.status === 200) {
            setDownlaodSuccess(true);
          }
        } catch (error) {
          console.error('Error during download:', error);
        } finally {
          setDownloadProgress(false);
        }
      }
    }, [pdfLink]);

    const handleScroll = event => {
      const contentOffsetY = event.nativeEvent.contentOffset.y;

      // If scrolled down, hide header, else show header
      if (contentOffsetY > 50) {
        Animated.timing(headerOpacity, {
          toValue: 0, // Hide header
          duration: 300, // Smooth transition
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(headerOpacity, {
          toValue: 1, // Show header
          duration: 300, // Smooth transition
          useNativeDriver: true,
        }).start();
      }
    };

    return (
      <Modal
        transparent
        visible={isVisisble}
        onRequestClose={onRequestClose}
        animationType="slide">
        <SafeAreaView
          style={[styles.safeArea, {backgroundColor: currentBgColor}]}>
          <Animated.View
            style={[
              styles.header,
              {opacity: headerOpacity, borderBottomColor: currentTextColor},
            ]}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onClose();
                setIsDarkThemeEnabled();
              }}>
              <VectorIcon
                type="AntDesign"
                name="arrowleft"
                size={getFontSize(3)}
                color={currentTextColor}
              />
            </TouchableOpacity>
            {!onLoading && showDownloadBtn && downloadOnComplete && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: downloadProgress ? '40%' : '20%',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setIsDarkThemeEnabled(!isDarkThemeEnabled);
                    }}
                    style={{}}>
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name={
                        isDarkThemeEnabled
                          ? 'lightbulb-on'
                          : 'lightbulb-on-outline'
                      }
                      size={24}
                      color={currentTextColor}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleDownload}>
                    {downloadProgress ? (
                      <Text
                        style={[
                          styles.downloadText,
                          {color: currentTextColor},
                        ]}>
                        Downloading..
                      </Text>
                    ) : (
                      <VectorIcon
                        type="FontAwesome5"
                        name="download"
                        size={getFontSize(3)}
                        color={currentTextColor}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Animated.View>

          <View style={styles.pdfContainer}>
            <Pdf
              trustAllCerts={false}
              source={{uri: pdfLink}}
              scale={1}
              onLoadProgress={percent => {
                setPercentage(percent * 100);
                setOnLoading(true);
              }}
              onLoadComplete={() => {
                setPercentage(0);
                setDownloadOnComplete(true);
                setOnLoading(false);
              }}
              renderActivityIndicator={() => (
                <View style={styles.activityIndicator}>
                  <ActivityIndicator size="large" color={currentTextColor} />
                  <Text style={[styles.percentText, {color: currentTextColor}]}>
                    {`Please wait...${Math.round(percent)}%`}
                  </Text>
                </View>
              )}
              style={styles.pdf}
              onScroll={handleScroll} // Add onScroll handler
            />

            {isDarkThemeEnabled && (
              <View style={styles.darkOverlay} pointerEvents="none" />
            )}
          </View>
        </SafeAreaView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    borderBottomWidth: 0.5,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent black for dark mode effect
  },
  downloadText: {
    fontSize: 16,
    fontFamily: 'Regular',
  },
  pdfContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.semiBold,
    marginTop: 10,
  },
});

export default PDFDownload;
