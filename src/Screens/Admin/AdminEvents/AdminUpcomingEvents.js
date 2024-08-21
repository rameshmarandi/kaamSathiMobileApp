import React, {useState, memo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {getFontSize, getResHeight} from '../../../utility/responsive/index.js';
import theme from '../../../utility/theme/index.js';
import * as Animatable from 'react-native-animatable';

const AdminUpcomingEvents = memo(() => {
  const {currentBgColor, currentTextColor} = useSelector(state => state.user);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const routes = [{title: 'Birthday'}, {title: 'Anniversaries'}];

  return (
    <View style={styles.container}>
      <Text style={[styles.categoryTitle, {color: currentTextColor}]}>
        Upcoming Birthday & Anniversaries
      </Text>
      <View style={styles.tabContainer}>
        {routes.map((item, index) => {
          const isActive = currentTabIndex === index;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => setCurrentTabIndex(index)}>
              {/* <Animatable.View
                animation="fadeInUp"
                duration={500}
                delay={200}
                style={{
                  // paddingHorizontal: '7%',
                  // marginTop: '5%',
                }}> */}
              <View
                // animation="fadeInUp"
                // duration={500}
                // delay={200}
                style={[
                  styles.tab,
                  {
                    backgroundColor: isActive
                      ? currentBgColor
                      : currentTextColor,
                    borderColor: isActive ? currentBgColor : currentTextColor,
                  },
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    {
                      width: '100%',
                      color: isActive ? currentTextColor : currentBgColor,
                      fontFamily: isActive
                        ? theme.font.bold
                        : theme.font.semiBold,
                    },
                  ]}
                  numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              {/* </Animatable.View> */}
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '5%',
  },
  categoryTitle: {
    marginBottom: getResHeight(1.5),
    fontFamily: theme.font.semiBold,
    fontSize: getFontSize(1.7),
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 50,
    overflow: 'hidden', // Ensure the content inside does not overflow
  },
  tab: {
    width: '50%', // Each button takes up 50% of the parent width
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '3%',

    borderRadius: 50,
    borderWidth: 1,
  },
  tabText: {
    fontSize: getFontSize(1.5),
    textAlign: 'center',
  },
});

export default AdminUpcomingEvents;
