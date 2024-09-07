import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// Assuming you're using this for icons
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {useSelector} from 'react-redux';
import {VectorIcon} from './VectorIcon';

const MasterDeleteSelect = ({
  selectedItem = [], // Array of items to be deleted
  onClosePress, // Callback to delete selected items
  onDeletePress,
}) => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: getResHeight(7),
        backgroundColor: currentTextColor,
        zIndex: 99,
        paddingHorizontal: '5%',
        borderBottomWidth: 0.3,
        borderBottomColor: currentBgColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={onClosePress} activeOpacity={0.8}>
          <VectorIcon
            type={'Ionicons'}
            name={'close'}
            size={getFontSize(4)}
            color={currentBgColor}
          />
        </TouchableOpacity>
        <Text style={[styles.itemText, {color: currentBgColor}]}>
          {selectedItem?.length} items selected
        </Text>
      </View>

      <TouchableOpacity onPress={onDeletePress} activeOpacity={0.8}>
        <VectorIcon
          type={'MaterialCommunityIcons'}
          name={'delete-circle'}
          size={getFontSize(5)}
          color={theme.color.error}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: getFontSize(2),
    marginLeft: getResWidth(2),
    fontFamily: theme.font.semiBold,
  },
});

export default MasterDeleteSelect;
