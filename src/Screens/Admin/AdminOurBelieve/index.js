import React, {memo} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../../Components/CustomHeader';
import {getFontSize} from '../../../utility/responsive';
import theme from '../../../utility/theme';
import {beliefsData} from '../../../Components/StaticDataHander';

const BeliefsScreen = ({navigation}) => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);

  const renderBeliefItem = ({item}) => (
    <View style={[styles.beliefContainer, {backgroundColor: currentBgColor}]}>
      <Text style={[styles.index, {color: currentTextColor}]}>
        {item.id}.{'   '}
      </Text>
      <Text style={[styles.beliefText, {color: currentTextColor}]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor: currentBgColor}]}>
      <CustomHeader
        backPress={() => navigation.goBack()}
        screenTitle="Our Beliefs"
      />
      <View style={styles.container}>
        <FlatList
          data={beliefsData}
          renderItem={renderBeliefItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  beliefContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  index: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.medium,
  },
  beliefText: {
    fontSize: getFontSize(1.8),
    fontFamily: theme.font.medium,
    lineHeight: 26,
    flex: 1,
  },
});

export default memo(BeliefsScreen);
