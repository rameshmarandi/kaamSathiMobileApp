import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';

const FAQItem = React.memo(({item, index, expandedIndex, setExpandedIndex}) => {
  const isExpanded = expandedIndex === index;
  const toggleCollapse = useCallback(() => {
    setExpandedIndex(isExpanded ? null : index);
  }, [isExpanded, index, setExpandedIndex]);

  // const {currentTextColor} = useSelector(state => state.user);
  let currentTextColor = theme.color.placeholder;
  return (
    <Animatable.View
      style={[
        styles.itemContainer,
        {
          borderColor: isExpanded ? theme.color.secondary : theme.color.black,
        },
      ]}
      duration={300}
      transition="backgroundColor">
      <TouchableOpacity onPress={toggleCollapse} style={styles.itemHeader}>
        <View style={styles.itemTitleContainer}>
          <Text
            style={[
              styles.itemTitle,
              {color: theme.color.black, fontSize: getFontSize(1.6)},
            ]}>
            {item.lableName}
          </Text>
        </View>

        <TouchableOpacity onPress={toggleCollapse}>
          <VectorIcon
            type={'AntDesign'}
            name={isExpanded ? 'caretup' : 'caretdown'}
            size={getFontSize(2)}
            color={isExpanded ? theme.color.secondary : theme.color.dimBlack}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      <Collapsible collapsed={!isExpanded}>
        <Animatable.Text
          animation={isExpanded ? 'fadeIn' : undefined}
          style={[
            styles.itemContent,
            {
              borderTopWidth: 1,
              borderColor: isExpanded
                ? theme.color.secondary
                : theme.color.grey,
              color: theme.color.dimBlack,
              fontSize: getFontSize(1.6),
            },
          ]}>
          {item.lableValue}
        </Animatable.Text>
      </Collapsible>
    </Animatable.View>
  );
});

const FAQListComp = ({data}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const renderItem = useCallback(
    ({item, index}) => (
      <FAQItem
        item={item}
        index={index}
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
      />
    ),
    [expandedIndex],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: getFontSize(2),
          color: theme.color.dimBlack,
          fontFamily: theme.font.semiBold,
          marginVertical: getResHeight(1),
        }}>
        FAQ's
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: getResHeight(10),
  },
  itemContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: getResHeight(1.3),
    paddingVertical: getResHeight(1),
    borderRadius: getResHeight(1),
    backgroundColor: 'white',
  },
  itemHeader: {
    paddingHorizontal: getResHeight(1.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitleContainer: {
    width: getResWidth(70),
  },
  itemTitle: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.6),
  },
  itemContent: {
    lineHeight: 27,
    paddingHorizontal: getResHeight(1.3),
    paddingVertical: getResHeight(1),
    fontFamily: theme.font.medium,
  },
});

export default FAQListComp;
