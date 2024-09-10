import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from 'react-native';

const AllPrayerReq = () => {
  const [messages, setMessages] = useState([
    {
      id: 'msg1',
      senderId: 'user1',
      content: 'Hello!',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'msg2',
      senderId: 'user2',
      content: 'Hi there!',
      timestamp: new Date().toISOString(),
    },
    // More messages...
  ]);

  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef(null);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: `msg${prevMessages.length + 1}`,
          senderId: 'user1',
          content: messageText,
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessageText('');
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the list whenever messages change
    flatListRef.current.scrollToEnd({animated: true});
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={
              item.senderId === 'user1'
                ? styles.sentMessage
                : styles.receivedMessage
            }>
            <Text>{item.content}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageContainer}
        keyboardShouldPersistTaps="handled"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Type a message..."
          onSubmitEditing={handleSendMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    paddingBottom: 80, // Padding to prevent message from hiding behind the keyboard
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1ffd6',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
});

export default AllPrayerReq;
