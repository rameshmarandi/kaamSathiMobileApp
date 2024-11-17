import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Reaction} from 'react-native-reactions';

const reactionItems = [
  {id: 0, emoji: '😇', title: 'Like'},
  {id: 1, emoji: '🥰', title: 'Love'},
  {id: 2, emoji: '🤗', title: 'Care'},
  {id: 3, emoji: '😘', title: 'Kiss'},
  {id: 4, emoji: '😂', title: 'Laugh'},
  {id: 5, emoji: '😎', title: 'Cool'},
];

interface ReactionCardProps {
  post: {
    id: string;
    title: string;
    image: string;
  };
  onEnableScroll: (enableScroll: boolean) => void;
}

const ReactionCard: React.FC<ReactionCardProps> = ({post, onEnableScroll}) => {
  const [selectedReaction, setSelectedReaction] = useState<null | {
    id: number;
    emoji: string;
  }>({
    id: -1,
    emoji: '',
  });

  return (
    <View style={styles.card}>
      <Image source={{uri: post.image}} style={styles.image} />
      <Text style={styles.title}>{post.title}</Text>
      <View style={styles.reactionContainer}>
        <Reaction
          items={reactionItems}
          onTap={reaction => {
            setSelectedReaction(reaction); // Update the selected reaction
          }}
          onShowDismissCard={(isVisible: boolean) =>
            onEnableScroll(!isVisible)
          }>
          <Text style={styles.reactionText}>
            {selectedReaction && selectedReaction.emoji
              ? selectedReaction.emoji
              : 'React'}
          </Text>
        </Reaction>
        <Text style={styles.shareText}>Share</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  reactionText: {
    fontSize: 16,
    color: '#007AFF',
  },
  shareText: {
    fontSize: 16,
    color: '#007AFF',
  },
});

export default ReactionCard;
