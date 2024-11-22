import React, {useState, useEffect, memo, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDailyVersesAPIHander,
  viewPostAPIHander,
} from '../../redux/reducer/DailyVerses/dailyVersesAPI';
import {
  checkIsNotEmptyArray,
  dateFormatHander,
} from '../../Components/commonHelper';
import TabViewComp from '../../Components/TabViewComp';
import SectionHeader from '../../Components/SectionHeader';
import MsgConfig from '../../Config/MsgConfig';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import {store} from '../../redux/store';
import ImageView from 'react-native-image-viewing';
import {setSelectedDailyVerse} from '../../redux/reducer/DailyVerses';
import CustomHeader from '../../Components/CustomHeader';
import {DailyVerbs} from './DailyVersesComp';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {Reaction} from 'react-native-reactions';
import ReactionCard from './ReactionCard';
import {VectorIcon} from '../../Components/VectorIcon';
import {KeyboardAvoidingView} from 'react-native';
import {convertImageToBase64} from '../../Helpers/CommonHelpers';

const ReactionItems = [
  {
    id: 0,
    emoji: '😇',
    title: 'like',
  },
  {
    id: 1,
    emoji: '🥰',
    title: 'love',
  },
  {
    id: 2,
    emoji: '🤗',
    title: 'care',
  },
  {
    id: 3,
    emoji: '😘',
    title: 'kiss',
  },
  {
    id: 4,
    emoji: '😂',
    title: 'laugh',
  },
  {
    id: 5,
    emoji: '😎',
    title: 'cool',
  },
];
const DailyVerseDetails = props => {
  const {navigation} = props;
  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const {dailyVerses, selectedDailyVerse} = useSelector(
    state => state.dailyVerses,
  );

  const {selectedLng, selectedIndex} = selectedDailyVerse;

  // Reordering the data based on the desired sequence
  const orderedLanguages = ['Marathi', 'Hindi', 'English'];
  // let images = [];
  // const imageDetailsExtracotr = () => {
  const images = orderedLanguages
    .map(
      lang =>
        Array.isArray(dailyVerses) &&
        dailyVerses[0].images.find(verse => verse.language === lang),
    )
    .map(verse => ({
      uri: verse.imageUrl,
      language: verse.language,
    }));

  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [selectedIndex, selectedLng]);

  const [selectedEmoji, setSelectedEmoji] = useState();
  const [reaction, setReaction] = useState(null);
  const handleReaction = reactionId => {
    setReaction(reactionId);
    // You can perform actions with the reactionId, such as sending the reaction to your server
    console.log('User reacted with:', reactionId);
  };
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const postData = [
    {
      id: '1',
      title: 'First Post',
      image: 'https://via.placeholder.com/300x200.png?text=Post+1',
    },
    {
      id: '2',
      title: 'Second Post',
      image: 'https://via.placeholder.com/300x200.png?text=Post+2',
    },
    {
      id: '3',
      title: 'Third Post',
      image: 'https://via.placeholder.com/300x200.png?text=Post+3',
    },
  ];

  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      senderId: 'user1',
      content: 'Hello! How can I pray for you today?',
      timestamp: new Date().toISOString(),
      isLiked: ['like', 'love', 'like'],
    },
    {
      id: 'msg2',
      senderId: 'user2',
      content: 'Please pray for my health.',
      timestamp: new Date().toISOString(),
      isLiked: [],
    },
    {
      id: 'msg3',
      senderId: 'user1',
      content: 'Of course, I will pray for healing.',
      timestamp: new Date().toISOString(),
      isLiked: ['love'],
    },
    {
      id: 'msg2',
      senderId: 'user2',
      content: 'Please pray for my health.',
      timestamp: new Date().toISOString(),
      isLiked: ['like'],
    },
    {
      id: 'msg2',
      senderId: 'user1',
      content: 'Please pray for my health.',
      timestamp: new Date().toISOString(),
      isLiked: [],
    },
    // Add more messages...
  ]);

  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef(null);
  const scrollViewRef = useRef(null);
  // State for modal
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: `msg${messages.length + 1}`,
        senderId: 'user1',
        content: messageText,
        timestamp: new Date().toISOString(),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessageText('');
      scrollViewRef.current?.scrollToEnd({animated: true});
      flatListRef.current?.scrollToEnd({animated: true});
      // Keyboard.dismiss();
    }
  };
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const users = [
    {
      id: '1',
      name: 'Ramesh Marandi',
      message: "Hello, I'm Ramesh from this side..",
      time: '22:45',
      unreadCount: 12,
    },
    {
      id: '2',
      name: 'Sukal Marandi',
      message: 'Hi..',
      time: '1:45',
      unreadCount: 1,
    },
    // Add more random users...
  ];

  const onShare = async (message, base64Image, title) => {
    const options = {
      title: title,
      message: message,
      url: `data:image/png;base64,${base64Image}`, // Use base64 image
      type: 'image/png', // Set the MIME type
    };
    try {
      let res = await Share.open(options);
      console.log('ShareRes', res);
    } catch (error) {
      console.error('Error_during_daily_vers_sharing', error);
    }
  };

  const ShareBtnHander = async imageUrl => {
    try {
      let currentLanguage = isImageViewerModal
        ? images[currentIndex].uri
        : selectedLng.imageUrl;

      const filePath = `${RNFS.DocumentDirectoryPath}/tempImage.png`;
      const base64String = await convertImageToBase64(
        currentLanguage,
        filePath,
      );

      onShare('Daily verse', base64String, '');
    } catch (error) {}
  };

  const FooterLikeComp = () => {
    return (
      <>
        <View
          style={{
            paddingHorizontal: getResWidth(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.likeContainer}>
              <VectorIcon
                type={'FontAwesome'}
                name={'heart'}
                // name={'like1'}
                size={getFontSize(2.8)}
                color={theme.color.error}
                // color={'white'}
              />
              <Text style={styles.likeText}>Like</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={ShareBtnHander}
              activeOpacity={0.8}
              style={styles.likeContainer}>
              <VectorIcon
                type={'MaterialCommunityIcons'}
                name={'share'}
                size={getFontSize(3)}
                color={'white'}
              />
              <Text style={styles.likeText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <CustomHeader
        backPress={() => {
          navigation.goBack();
        }}
        screenTitle={`${selectedLng.language} ${MsgConfig.dailyVerseDetails}`}
      />
      <ImageView
        images={images}
        imageIndex={selectedIndex}
        visible={isImageViewerModal}
        swipeToCloseEnabled
        onRequestClose={() => {
          setCurrentIndex(selectedIndex);
          setIsImageViewerModal(false);
        }}
        keyExtractor={(_, index) => index.toString()}
        animationType="fade"
        onImageIndexChange={index => setCurrentIndex(index)}
        HeaderComponent={() => {
          let currentLanguage = images[currentIndex].language;

          const currentIndexInArray = images.findIndex(
            img => img.language === currentLanguage,
          );

          return (
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: getResHeight(2),
                flexDirection: 'row',
                paddingHorizontal: getResWidth(4),
              }}>
              <Text style={styles.footerText}>{currentLanguage}</Text>
              <Text style={styles.footerText}>
                {currentIndexInArray + 1}/{images.length}
              </Text>
              <TouchableOpacity onPress={() => setIsImageViewerModal(false)}>
                <VectorIcon
                  type={'MaterialCommunityIcons'}
                  name={'close'}
                  size={getFontSize(4.4)}
                  color={currentTextColor}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        FooterComponent={() => (
          <>
            <View
              style={{
                paddingBottom: getResHeight(5),
              }}>
              <FooterLikeComp />
            </View>
          </>
        )}
      />
      {/* <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled"> */}
      <View
        style={{
          height: getResHeight(40),
          width: '100%',
        }}>
        <DailyVerbs
          dailyVerseData={selectedLng}
          onPress={() => {
            if (selectedLng.imageUrl !== '') {
              setViewImageUrl(selectedLng.imageUrl);
              setIsImageViewerModal(true);
            }
          }}
        />
        <View
          style={{
            width: '100%',
            borderBottomWidth: 0.5,
            borderBottomColor: theme.color.outlineColor,
            paddingBottom: '3%',
          }}>
          <FooterLikeComp />
        </View>
      </View>
      {/* </ScrollView> */}

      {/* <View
        style={[
          {
            marginTop: getResHeight(7),
            backgroundColor: currentBgColor,
          },
        ]}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View
              style={[
                styles.messageWrapper,
                item.senderId === 'user1'
                  ? styles.sentMessageWrapper
                  : styles.receivedMessageWrapper,
                {
                  maxWidth: getResWidth(95),
                  marginBottom: 30,
                },
              ]}>
              <Image
                source={{
                  uri:
                    item.senderId === 'user1'
                      ? 'https://www.esri.com/about/newsroom/wp-content/uploads/2024/06/arcnews-article-simplifyinghow-1-768x433.jpg' // Replace with user1 profile image
                      : 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-solutions/assets/arcgis-solutions-overview-mts-intersecting-business-technology.png', // Replace with user2 profile image
                }}
                style={styles.profileImage}
              />
              <View>
                <View
                  style={[
                    item.senderId === 'user1'
                      ? styles.sentMessage
                      : styles.receivedMessage,
                    {maxWidth: '95%'},
                  ]}>
                  <Text
                    style={{
                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.8),
                      color: '#363434',
                      lineHeight: getFontSize(2.8),
                    }}>
                    {item.content}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }}>
                    {item.senderId === 'user1' && (
                      <VectorIcon
                        type={'Ionicons'}
                        name={'checkmark-done-outline'}
                        size={getFontSize(1.9)}
                        color={'#4FB6EC'}
                        style={{marginRight: 3}}
                      />
                    )}
                    <Text style={styles.timestamp}>
                      {dateFormatHander(item.timestamp, 'DD MMM')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: getResHeight(-2.8),
                  }}>
                  {Array.isArray(item.isLiked) &&
                    item.isLiked?.length !== 0 && (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            position: 'relative',
                            paddingTop: 24,
                            flexDirection: 'flex-end',
                          }}>
                          {item.isLiked.lenght > 3
                            ? item.isLiked.slice(0, 3)
                            : item.isLiked.map((reactionIcon, index) => {
                                const iconSize = getFontSize(2); // Adjust size if needed
                                const offset = index * 5; // Adjust this to control overlap spacing

                                return (
                                  <View
                                    key={index}
                                    activeOpacity={0.8}
                                    style={[
                                      styles.likeContainer,
                                      {
                                        position: 'absolute',
                                        left: index * 10, // Control how much leftward the icons should shift
                                        // bottom: index * 3, // Control vertical stacking spacing
                                      },
                                    ]}>
                                    {reactionIcon == 'like' ? (
                                      <VectorIcon
                                        type={'AntDesign'}
                                        name={'like1'}
                                        size={getFontSize(2)}
                                        color={'#ffffff'}
                                      />
                                    ) : reactionIcon == 'love' ? (
                                      <VectorIcon
                                        type={'AntDesign'}
                                        name={'heart'}
                                        size={iconSize}
                                        color={theme.color.error}
                                      />
                                    ) : null}
                                  </View>
                                );
                              })}

                          {item.isLiked.length > 3 && (
                            <View
                              style={[
                                styles.likeContainer,
                                {
                                  position: 'absolute',
                                  right: 3 * 10, // Align it with the third reaction
                                },
                              ]}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: getFontSize(2),
                                }}>
                                +
                              </Text>
                            </View>
                          )}
                        </View>
                      </>
                    )}
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.messageContainer}
          keyboardShouldPersistTaps="handled"
        />
      </View> */}

      {/* <View style={[styles.inputContainer, {}]}>
        <TextInput
          style={[
            styles.input,
            {
              color: currentTextColor,
              borderRadius:
                messageText.length < 35 ? getResHeight(5) : getResHeight(2),

              borderColor: currentTextColor,
            },
          ]}
          multiline={true}
          value={messageText}
          placeholderTextColor={currentTextColor}
          onChangeText={setMessageText}
          cursorColor={currentTextColor}
          selectionColor={currentTextColor}
          placeholder="Type your message..."
        />

        <TouchableOpacity
          onPress={handleSendMessage}
          touchableOpacity={0.8}
          style={{
            height: getResHeight(6),
            width: getResHeight(6),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.color.green,
            borderRadius: getResHeight(100),
            marginLeft: 5,
          }}>
          <VectorIcon
            type={'MaterialCommunityIcons'}
            name={'send'}
            size={getFontSize(2.8)}
            color={'#090909'}
          />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //Chat section styles
  messageContainer: {
    padding: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginBottom: 10,
  },
  sentMessageWrapper: {
    alignSelf: 'flex-end',
  },
  receivedMessageWrapper: {
    alignSelf: 'flex-start',
  },
  profileImage: {
    width: getResHeight(5),
    height: getResHeight(5),
    borderRadius: getResHeight(100),
    marginRight: getResWidth(1.3),
  },
  sentMessage: {
    backgroundColor: theme.color.chatBox,

    padding: getResHeight(0.4),

    borderRadius: 5,
  },
  receivedMessage: {
    backgroundColor: theme.color.chatBox,
    padding: 8,
    borderRadius: 5,
    marginVertical: getResHeight(0.7),
  },
  timestamp: {
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.4),
    color: '#363434',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopColor: '#cccccc',
  },
  input: {
    width: getResWidth(80),
    maxHeight: getResHeight(10),
    minHeight: getResHeight(4),
    paddingHorizontal: '5%',
    lineHeight: 22,
    borderWidth: 1,
    padding: getResHeight(1),
  },

  likeContainer: {
    // position: 'absolute',
    // bottom: getResHeight(-2),
    // zIndex: 11,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  likeText: {
    color: 'white',
    fontFamily: theme.font.medium,
    marginLeft: '3%',
    paddingTop: '2%',
  },

  likeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeText: {
    color: 'white',
    fontFamily: theme.font.medium,
    marginLeft: '9%',
    paddingTop: '2%',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  reactionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  reactionsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedReaction: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});
export default DailyVerseDetails;
