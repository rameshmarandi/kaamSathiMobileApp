import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {getFontSize, getResHeight} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {VectorIcon} from '../../../Components/VectorIcon';

const DistanceSelectorModalComponent = ({
  isModalVisible,
  selectedDistance = 0,
  onBackdropPress,
  handleSelectDistance,
  onSelectDistance,
}) => {
  const distances = [
    ...Array.from({length: 15}, (_, index) => `${index + 1} km`), // 1 to 15 km
    ...Array.from({length: 17}, (_, index) => `${(index + 4) * 5} km`), // 20, 25, 30, ... 100 km
  ];

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        handleSelectDistance({
          id: index,
          distance: item,
        });
        onBackdropPress();
      }}>
      <Text
        style={[
          styles.itemText,
          {
            backgroundColor:
              selectedDistance.id === index ? theme.color.lighYellow : 'white',
            // borderRadius: 10,
          },
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={onBackdropPress} // Close modal when tapping outside
        onSwipeComplete={onBackdropPress} // Swipe down to close
        swipeDirection="down"
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={800}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>Select Distance</Text>
            <TouchableOpacity
              onPress={onBackdropPress}
              activeOpacity={0.8}
              style={{
                alignItems: 'flex-end',
                position: 'absolute',
                right: '-1%',
                top: '-35%',
              }}>
              <VectorIcon
                type="Ionicons"
                name="close-circle-sharp"
                size={getFontSize(4)}
                color={theme.color.charcolBlack}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={distances}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end', // Align modal at the bottom
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '40%', // Set a medium height (40% of the screen height)
    maxHeight: getResHeight(50), // Ensure it doesn't grow too tall
  },
  modalTitle: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
    marginBottom: getResHeight(1.5),
    textAlign: 'center',
    color: theme.color.charcolBlack,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemText: {
    fontSize: getFontSize(1.6),
    paddingVertical: getResHeight(1.3),
    color: theme.color.charcolBlack,
    fontFamily: theme.font.semiBold,
    textAlign: 'center',
  },
});

export default DistanceSelectorModalComponent;
