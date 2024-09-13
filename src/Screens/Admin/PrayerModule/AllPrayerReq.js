import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader.js';
import {VectorIcon} from '../../../Components/VectorIcon.js';
import {dateFormatHander} from '../../../Components/commonHelper.js';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive/index.js';
import theme from '../../../utility/theme/index.js';

const AllPrayerReq = props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      senderId: 'user1',
      content: 'Hello! How can I pray for you today?',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'msg2',
      senderId: 'user2',
      content: 'Please pray for my health.',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'msg3',
      senderId: 'user1',
      content: 'Of course, I will pray for healing.',
      timestamp: new Date().toISOString(),
    },
    // Add more messages...
  ]);

  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef(null);

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
      flatListRef.current?.scrollToEnd({animated: true});
      // Keyboard.dismiss();
    }
  };

  const openChatModal = user => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
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

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: currentBgColor}]}>
      <CustomHeader
        backPress={() => {
          props.navigation.goBack();
        }}
        screenTitle={'Prayer Requests'}
      />

      <FlatList
        data={users}
        keyExtractor={item => item.id}
        style={{paddingHorizontal: '2%'}}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openChatModal(item)}>
            <View
              style={{
                width: '100%',
                backgroundColor: currentBgColor,
                marginBottom: 10,
                borderRadius: 10,
                padding: 10,
                borderWidth: 0.4,
                borderColor: currentTextColor,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{
                    uri: 'https://www.esri.com/about/newsroom/wp-content/uploads/2024/06/arcnews-article-simplifyinghow-1-768x433.jpg',
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                  }}
                />

                <View style={{marginLeft: 10, width: getResWidth(74)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: currentTextColor,
                        fontFamily: 'SemiBold',
                        fontSize: 16,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: currentTextColor,
                        fontFamily: 'SemiBold',
                        fontSize: 14,
                      }}>
                      {item.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <VectorIcon
                        type={'Ionicons'}
                        name={'checkmark-done-outline'}
                        size={16}
                        color={'#4FB6EC'}
                      />
                      <Text
                        style={{
                          color: currentTextColor,
                          fontFamily: 'Medium',
                          fontSize: 14,
                          marginLeft: 5,
                        }}>
                        {item.message}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: getResHeight(2.4),
                        width: getResHeight(2.4),
                        borderRadius: 14,
                        backgroundColor: theme.color.green,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontFamily: 'SemiBold',
                          fontSize: 12,
                        }}>
                        {item.unreadCount}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal for chat screen */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={closeModal}>
        {selectedUser && (
          <SafeAreaView
            style={[
              styles.container,
              {
                backgroundColor: currentBgColor,
              },
            ]}>
            <CustomHeader
              backPress={() => {
                closeModal();
                setMessageText('');
              }}
              screenTitle={selectedUser.name}
            />

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
                      maxWidth: getResWidth(100),
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

                  <View
                    style={[
                      item.senderId === 'user1'
                        ? styles.sentMessage
                        : styles.receivedMessage,
                      {maxWidth: '80%'},
                    ]}>
                    {/* Message Content */}
                    <Text
                      style={{
                        fontFamily: theme.font.medium,
                        fontSize: getFontSize(1.5),
                        color: '#363434',
                        lineHeight: getFontSize(2), // Control the line height to reduce vertical space
                      }}>
                      {item.content}
                    </Text>

                    {/* Checkmark and Timestamp */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        // marginTop: 2, // Reduced margin to make it more compact
                      }}>
                      {item.senderId === 'user1' && (
                        <VectorIcon
                          type={'Ionicons'}
                          name={'checkmark-done-outline'}
                          size={getFontSize(1.9)}
                          color={'#4FB6EC'}
                          style={{marginRight: 3}} // Adjusted for closer spacing to the timestamp
                        />
                      )}
                      <Text style={styles.timestamp}>
                        {dateFormatHander(item.timestamp, 'DD MMM')}
                      </Text>
                    </View>
                  </View>
                </View>

                // <View
                //   style={[
                //     styles.messageWrapper,
                //     item.senderId === 'user1'
                //       ? styles.sentMessageWrapper
                //       : styles.receivedMessageWrapper,
                //     {
                //       maxWidth: getResWidth(100),
                //     },
                //   ]}>
                //   <Image
                //     source={{
                //       uri:
                //         item.senderId === 'user1'
                //           ? 'https://www.esri.com/about/newsroom/wp-content/uploads/2024/06/arcnews-article-simplifyinghow-1-768x433.jpg' // Replace with user1 profile image
                //           : 'https://www.esri.com/content/dam/esrisites/en-us/arcgis/products/arcgis-solutions/assets/arcgis-solutions-overview-mts-intersecting-business-technology.png', // Replace with user2 profile image
                //     }}
                //     style={styles.profileImage}
                //   />
                //   <View
                //     style={[
                //       item.senderId === 'user1'
                //         ? styles.sentMessage
                //         : styles.receivedMessage,
                //       {maxWidth: '80%'},
                //     ]}>
                //     <Text
                //       style={{
                //         fontFamily: theme.font.medium,
                //         fontSize: getFontSize(1.5),
                //         color: '#363434',
                //       }}>
                //       {item.content}{' '}
                //       <View
                //         style={{
                //           width: '100%',
                //           flexDirection: 'row',
                //           justifyContent: 'flex-end',
                //         }}>
                //         <VectorIcon
                //           type={'Ionicons'}
                //           name={'checkmark-done-outline'}
                //           size={getFontSize(1.9)}
                //           color={'#4FB6EC'}
                //         />
                //         <Text style={styles.timestamp}>
                //           {dateFormatHander(item.timestamp, 'DD MMM')}
                //         </Text>
                //       </View>
                //     </Text>
                //   </View>
                // </View>
              )}
              contentContainerStyle={styles.messageContainer}
              keyboardShouldPersistTaps="handled"
            />

            <View style={[styles.inputContainer, {}]}>
              <TextInput
                style={[
                  styles.input,
                  {
                    color: currentTextColor,
                    borderRadius:
                      messageText.length < 35
                        ? getResHeight(5)
                        : getResHeight(2),

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
                }}>
                <VectorIcon
                  type={'MaterialCommunityIcons'}
                  name={'send'}
                  size={getFontSize(2.8)}
                  color={'#090909'}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#DCF8C6',
    // padding: 8,
    padding: getResHeight(0.4),

    borderRadius: 5,
    marginVertical: 4,
  },
  receivedMessage: {
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 5,
    marginVertical: 4,
  },
  timestamp: {
    marginTop: 2,
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
});

export default AllPrayerReq;
