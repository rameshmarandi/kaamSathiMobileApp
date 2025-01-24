import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  getFontSize,
  getResHeight,
  getResWidth,
} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {VectorIcon} from '../../../Components/VectorIcon';

const DistanceSelectorModalComponent = ({
  isModalVisible,
  selectedDistance = 0,
  onBackdropPress,
  handleSelectDistance,
  onSelectDistance,
}) => {
  const [selectedHearts, setSelectedHearts] = useState([]);

  const handleHeartPress = index => {
    if (selectedHearts.includes(index)) {
      // If index is already selected, remove it
      setSelectedHearts(prev => prev.filter(i => i !== index));
    } else {
      // If not selected, add it
      setSelectedHearts(prev => [...prev, index]);
    }
  };

  const distances = [
    ...Array.from({length: 15}, (_, index) => `${index + 1} km`), // 1 to 15 km
    ...Array.from({length: 17}, (_, index) => `${(index + 4) * 5} km`), // 20, 25, 30, ... 100 km
  ];

  const btnArray = [{btnText: 'View Details'}, {btnText: 'Hire now'}];

  const renderItem = ({item, index}) => (
    <TouchableOpacity activeOpacity={1} style={styles.item}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://www.gngmodels.com/wp-content/uploads/2023/12/indian-male-models-11-682x1024.jpg',
          }}
          style={{
            height: getResHeight(14),
            width: getResHeight(14),
            borderRadius: 10,
          }}
        />
        <View>
          <View style={styles.cardDetails}>
            <Text style={[styles.itemText]}>Name :</Text>
            <Text style={[styles.rightText]}>Ramesh Marandi</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={[styles.itemText]}>Languages :</Text>
            <Text style={[styles.rightText]}>Hindi, English, Bengali</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={[styles.itemText]}>Distance :</Text>
            <Text style={[styles.rightText]}>{item}</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={[styles.itemText]}>Rating :</Text>
            <Text style={[styles.rightText]}>4.5</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'flex-end',
              marginLeft: getResWidth(1),
            }}>
            {btnArray.map((btn, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={btn.btnText}
                style={{
                  borderWidth: index === 1 ? 0 : 1,
                  paddingHorizontal: getResWidth(4),
                  paddingVertical: getResHeight(1),
                  borderRadius: 5,
                  marginHorizontal: 5,
                  borderColor:
                    index === 1
                      ? theme.color.secondary2
                      : theme.color.secondary,
                  backgroundColor:
                    index === 1 ? theme.color.secondary : 'white',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: getFontSize(1.3),
                    fontFamily: theme.font.semiBold,
                    paddingTop: getResHeight(0.3),
                  }}>
                  {btn.btnText}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => handleHeartPress(index)}
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          right: '2%',
          top: '1%',
        }}>
        <VectorIcon
          type="MaterialCommunityIcons"
          name={
            selectedHearts.includes(index) ? 'heart' : 'cards-heart-outline'
          }
          size={getFontSize(2.8)}
          color={
            selectedHearts.includes(index) ? 'red' : theme.color.charcolBlack
          }
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // const renderItem = ({item, index}) => (
  //   <View
  //     style={styles.item}
  //     // disabled
  //     // keyboardShouldPersistTaps="handled"
  //     // activeOpacity={0.9}
  //     // onPress={() => {
  //     //   // handleSelectDistance({
  //     //   //   id: index,
  //     //   //   distance: item,
  //     //   // });
  //     //   // onBackdropPress();
  //     // }}
  //   >
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //       }}>
  //       <View>
  //         <Image
  //           source={{
  //             uri: 'https://img.mensxp.com/media/content/2021/Mar/Models-Setting-Grooming-Goals-For-Men-14_605859946e40a.jpeg?w=720&h=1280&cc=1',
  //           }}
  //           style={{
  //             height: getResHeight(14),
  //             width: getResHeight(14),
  //             borderRadius: 10,
  //           }}
  //         />
  //       </View>
  //       <View>
  //         <View style={styles.cardDetails}>
  //           <Text style={[styles.itemText, {}]}>Name :</Text>
  //           <Text style={[styles.rightText, {}]}>Ramesh Marandi</Text>
  //         </View>
  //         <View style={styles.cardDetails}>
  //           <Text style={[styles.itemText, {}]}>Languages :</Text>
  //           <Text style={[styles.rightText, {}]}>Hindi, English, Bengali</Text>
  //         </View>
  //         <View style={styles.cardDetails}>
  //           <Text style={[styles.itemText, {}]}>Distance :</Text>
  //           <Text style={[styles.rightText, {}]}>{item}</Text>
  //         </View>
  //         <View style={styles.cardDetails}>
  //           <Text style={[styles.itemText, {}]}>Rating :</Text>
  //           <Text style={[styles.rightText, {}]}>4.5</Text>
  //         </View>
  //       </View>
  //     </View>
  //     <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
  //       {btnArray.map(btn => {
  //         return (
  //           <>
  //             <TouchableOpacity
  //               style={{
  //                 borderWidth: 1,
  //               }}>
  //               <Text
  //                 style={{
  //                   color: 'black',
  //                 }}>
  //                 {btn.btnText}
  //               </Text>
  //             </TouchableOpacity>
  //           </>
  //         );
  //       })}
  //     </View>
  //     <TouchableOpacity
  //       onPress={() => handleHeartPress(index)}
  //       style={{
  //         alignItems: 'flex-end',
  //         position: 'absolute',
  //         right: '2%',
  //         top: '1%',
  //       }}>
  //       <VectorIcon
  //         type="MaterialCommunityIcons"
  //         name={
  //           selectedHearts.includes(index) ? 'heart' : 'cards-heart-outline'
  //         }
  //         size={getFontSize(3)}
  //         // heart
  //         color={
  //           selectedHearts.includes(index) ? 'red' : theme.color.charcolBlack
  //         }
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );

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
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.modalTitle}>10 Electrician found</Text>
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
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
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
  cardDetails: {
    marginLeft: getResWidth(3),
    // justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: getResHeight(1),
  },
  itemText: {
    fontSize: getFontSize(1.2),
    fontFamily: theme.font.semiBold,

    color: theme.color.charcolBlack,
  },
  rightText: {
    fontFamily: theme.font.regular,
    fontSize: getFontSize(1.4),
    color: theme.color.charcolBlack,
    marginLeft: getResWidth(1),
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: getResHeight(90), // Set a medium height (40% of the screen height)
    maxHeight: getResHeight(300), // Ensure it doesn't grow too tall
  },
  modalTitle: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
    marginBottom: getResHeight(1.5),
    textAlign: 'center',
    color: theme.color.charcolBlack,
  },
  item: {
    borderWidth: 1,
    borderColor: theme.color.dimGrey,

    paddingHorizontal: getResWidth(3),
    paddingVertical: getResWidth(3),
    borderRadius: getResWidth(2),
    marginBottom: getResHeight(2),
  },
});

export default DistanceSelectorModalComponent;
