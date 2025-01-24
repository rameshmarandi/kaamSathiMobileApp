// UserCard Component

import React, {useState, useRef, useCallback, useEffect, memo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {getResHeight, getResWidth, getFontSize} from '../utility/responsive';

import {VectorIcon} from '../Components/VectorIcon';
import theme from '../utility/theme';

import {ButtonIconComp} from '../Components/commonComp';

import SmallMenuComp from '../Components/SmallMenuComp';

const UserCard = ({
  item,
  isLoading,
  selectedCard,
  currentBgColor,
  currentTextColor,
  setSelectedCard,
  handleMunuData,
  MenuItemOnPressHandler,
  setViewImageUrl,
  setIsImageViewerModal,
  openBottomSheetWithContent,
  setShowAlert,
  theme,
}) => {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: currentBgColor,
          borderColor: currentTextColor,
        },
      ]}>
      <View
        style={{
          position: 'absolute',
          top: getResHeight(1.4),
          right: getResWidth(2),
          zIndex: 9999,
        }}>
        {isLoading && item.id == selectedCard?.id ? (
          <ActivityIndicator size={getFontSize(2.5)} color={currentTextColor} />
        ) : (
          <SmallMenuComp
            buttonLabel={openMenu => (
              <ButtonIconComp
                onPress={() => {
                  setSelectedCard(item);
                  openMenu();
                }}
                icon={
                  <VectorIcon
                    type={'Entypo'}
                    name={'dots-three-vertical'}
                    size={getFontSize(2.1)}
                    color={currentTextColor}
                  />
                }
                containerStyle={{
                  width: getResHeight(5),
                  height: getResHeight(5),
                  borderRadius: getResHeight(100),
                }}
              />
            )}
            menuItems={handleMunuData(item)}
            onMenuPress={MenuItemOnPressHandler}
          />
        )}
      </View>
      <View style={styles.cardContent}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (item.avatar !== '') {
              setViewImageUrl(item.avatar);
              setIsImageViewerModal(true);
            }
          }}
          style={styles.avatarContainer}>
          <Image
            source={{uri: item.avatar}}
            style={[
              styles.avatar,
              {
                borderColor: item.isBlocked
                  ? theme.color.error
                  : theme.color.green,
              },
            ]}
          />
        </TouchableOpacity>
        <View style={styles.userInfoContainer}>
          <Text style={[styles.userNameText, {color: currentTextColor}]}>
            {item.userBio['Full name']}
          </Text>
          <Text style={styles.branchText}>Branch name : {item.branchName}</Text>
          {['branch_admin', 'super_admin'].includes(item.role) && (
            <Text style={styles.branchText}>
              {`Designation: ${
                item.role === 'branch_admin' ? 'Branch admin' : 'Super admin'
              }`}
            </Text>
          )}
          {item.isBlocked && (
            <Text style={[styles.branchText, {color: theme.color.error}]}>
              {`Status: ${item.isBlocked ? 'Blocked' : 'Active'}`}
            </Text>
          )}
        </View>
        <View style={styles.menuButtonContainer}>
          <SmallMenuComp
            buttonLabel={openMenu => (
              <ButtonIconComp
                onPress={() => openMenu()}
                icon={
                  <VectorIcon
                    type={'Entypo'}
                    name={'dots-three-vertical'}
                    size={getFontSize(2.1)}
                    color={currentTextColor}
                  />
                }
                containerStyle={styles.menuButton}
              />
            )}
            menuItems={handleMunuData(item)} // Assuming handleMunuData can be reused
            onMenuPress={menuIndex => {
              if (menuIndex === 0) {
                const res = singleUserCardData(item); // Ensure this function is defined
                openBottomSheetWithContent(res);
              } else if (menuIndex === 2) {
                setShowAlert(true);
              }
            }}
          />
        </View>
      </View>
      <View style={styles.userBioContainer}>
        <UserBioComponent
          userBio={item.userBio}
          currentTextColor={currentTextColor}
        />
      </View>
    </View>
  );
};
const UserBioComponent = ({userBio, currentTextColor}) => {
  // Convert userBio object to an array of key-value pairs
  const userBioArray = Object.entries(userBio).map(([key, value]) => ({
    key,
    value,
  }));

  // Render each item in the FlatList
  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.keyText, {color: currentTextColor}]}>
        {item.key}
      </Text>
      <Text style={[styles.valueText, {color: currentTextColor}]}>
        {item.value}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={userBioArray}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: getResWidth(90),
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: getResHeight(2),
    marginBottom: getResHeight(2),
  },
  cardContent: {
    paddingVertical: getResHeight(2),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  avatarContainer: {
    width: getResWidth(26),
    paddingLeft: getResHeight(2),
  },
  avatar: {
    height: getResHeight(10),
    width: getResHeight(10),
    borderRadius: getResHeight(100),
    borderWidth: 2,
  },
  userInfoContainer: {
    width: getResWidth(48),
    marginLeft: '5%',
    flexWrap: 'wrap',
  },
  userNameText: {
    maxWidth: '100%',
    fontSize: getFontSize(2),
    fontFamily: theme.font.semiBold,
  },
  branchText: {
    width: '98%',
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.5),
    // color: 'white',
    color: theme.color.green,
  },
  menuButtonContainer: {
    position: 'absolute',
    top: getResHeight(1),
    right: getResWidth(-10),
    zIndex: 9999,
  },
  menuButton: {
    width: getResHeight(5),
    height: getResHeight(5),
    borderRadius: getResHeight(100),
  },
  userBioContainer: {
    borderTopWidth: 0.5,
    borderColor: 'white',
    width: '100%',
    paddingTop: '5%',
    flexDirection: 'row',
    paddingHorizontal: getResWidth(2),
    paddingVertical: getResHeight(2),
  },

  itemContainer: {
    flexDirection: 'row',
    paddingHorizontal: getResWidth(2),
    marginTop: getResHeight(1),
  },
  keyText: {
    width: getResWidth(40),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.5),
  },
  valueText: {
    width: getResWidth(43),
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.5),
  },
});

const SectionHeaderName = props => {
  const {sectionName} = props;
  return (
    <>
      <Text
        style={{
          fontFamily: theme.font.semiBold,
          fontSize: getFontSize(1.7),
          color: theme.color.charcolBlack,
          paddingHorizontal: '5%',
        }}>
        {sectionName}
      </Text>
    </>
  );
};
export {UserCard, UserBioComponent, SectionHeaderName};
