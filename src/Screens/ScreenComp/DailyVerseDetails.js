import React, {useState, useEffect, memo} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  getDailyVersesAPIHander,
  viewPostAPIHander,
} from '../../redux/reducer/DailyVerses/dailyVersesAPI';
import {checkIsNotEmptyArray} from '../../Components/commonHelper';
import TabViewComp from '../../Components/TabViewComp';
import SectionHeader from '../../Components/SectionHeader';
import MsgConfig from '../../Config/MsgConfig';
import {getResHeight, getResWidth} from '../../utility/responsive';
import theme from '../../utility/theme';
import {store} from '../../redux/store';
import ImageView from 'react-native-image-viewing';
import {setSelectedDailyVerse} from '../../redux/reducer/DailyVerses';
import CustomHeader from '../../Components/CustomHeader';
import {DailyVerbs} from './DailyVersesComp';

import {Reaction} from 'react-native-reactions';
import ReactionCard from './ReactionCard';
const DailyVerseDetails = props => {
  const {navigation} = props;
  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');

  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {dailyVerses, selectedDailyVerse} = useSelector(
    state => state.dailyVerses,
  );
  // Image viewer
  const images = [
    {
      uri: viewImageUrl,
    },
  ];
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
        screenTitle={`${selectedDailyVerse.language} ${MsgConfig.dailyVerseDetails}`}
      />
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewerModal}
        onRequestClose={() => setIsImageViewerModal(false)}
      />
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            height: getResHeight(40),
            width: '100%',
          }}>
          <DailyVerbs
            dailyVerseData={selectedDailyVerse}
            onPress={() => {
              if (selectedDailyVerse.imageUrl !== '') {
                setViewImageUrl(selectedDailyVerse.imageUrl);
                setIsImageViewerModal(true);
              }
            }}
          />
          <View></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
