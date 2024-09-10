import React, {useCallback, useMemo} from 'react';
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

  const renderSquareCardItem = useCallback(
    ({item, itemsLength}) => (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[
          styles.cardContainer,
          [0, 1, 2].includes(itemsLength) && {
            marginRight: getResWidth(3),
          },
          {
            borderColor: currentTextColor,
            marginBottom: getResWidth(3),
          },
        ]}
        key={item.id.toString()}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
        {console.log('sdfsdfsdfsdfsdf', item.title)}

        {item.title == 'Prayer Request' && (
          <>
            <View
              style={{
                position: 'absolute',
                height: getResHeight(2.3),
                width: getResHeight(2.3),
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                right: 0,
                top: 0,
                overflow: 'hidden',
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: 'white',
                  overflow: 'hidden',
                  fontSize: getFontSize(1.3),
                }}>
                12
              </Text>
            </View>
          </>
        )}
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
    ),
    [currentTextColor, onPress],
  );

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
    [currentTextColor],
  );

  const renderCategoryItem = useCallback(
    ({item}) => (
      <View
        style={[
          styles.container,
          {
            borderColor: currentTextColor,
          },
        ]}
        key={item.id}>
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
              itemsLength: item.items.length,
            }),
          )}
        </View>
      </View>
    ),
    [currentTextColor, renderSquareCardItem],
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={filteredData}
        ListEmptyComponent={EmptyListComp}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id} // Ensure consistent key extraction
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
