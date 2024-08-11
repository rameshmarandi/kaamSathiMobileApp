import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';

const SquareCardComp = ({filteredData, onPress}) => {
  const {currentTextColor} = useSelector(state => state.user);

  const renderSquareCardItem = props => {
    const {item, itemsLength} = props; // Accepting itemsLength as a prop
    console.tron.log(
      'Category: ' + item.category + ', Items Length: ' + itemsLength,
    );
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[
          styles.cardContainer,
          [0, 1, 2].includes(itemsLength) && {
            // Example usage of itemsLength
            marginRight: getResWidth(2),
          },
          {
            borderColor: currentTextColor,
          },
        ]}
        key={item.id.toString()}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <Text
          style={[
            styles.cardTitle,
            {
              color: currentTextColor,
              fontFamily: theme.font.semiBold,
            },
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const EmptyListComp = useCallback(
    () => (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: getFontSize(1.7),
            color: currentTextColor,
            marginTop: getResHeight(4),
          }}>
          ✨ Oops! nothing here. ✨
        </Text>
      </View>
    ),
    [],
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={filteredData}
        ListEmptyComponent={<EmptyListComp />}
        renderItem={({item}) => (
          <React.Fragment key={item.id}>
            <View
              style={[
                styles.container,
                {
                  borderColor: currentTextColor,
                },
              ]}>
              <Text style={[styles.categoryTitle, {color: currentTextColor}]}>
                {item.category}
              </Text>
              <View
                style={[
                  styles.itemsContainer,
                  ![1, 2].includes(item.items.length) && {
                    justifyContent: 'space-between',
                  },
                ]}>
                {item.items.map(subItem =>
                  renderSquareCardItem({
                    item: subItem,
                    itemsLength: item.items.length, // Passing items length here
                  }),
                )}
              </View>
            </View>
          </React.Fragment>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    borderWidth: 1,
    padding: getResWidth(3),
    marginBottom: getResHeight(2),
    borderRadius: getResHeight(1),
  },
  cardContainer: {
    width: Platform.OS == 'ios' ? getResHeight(12) : getResHeight(12.5),
    minHeight: getResHeight(11),
    borderWidth: 1,
    borderRadius: getResHeight(1),
    marginBottom: getResHeight(1),
    paddingHorizontal: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: getResHeight(5.5),
    width: getResHeight(5.5),
  },
  cardTitle: {
    textAlign: 'center',
    marginTop: '3%',
    fontSize: getFontSize(1.4),
  },
  categoryTitle: {
    marginBottom: getResHeight(1.5),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.7),
  },
  itemsContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default React.memo(SquareCardComp);
