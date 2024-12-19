import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {getResHeight} from '../utility/responsive';
import SectionHeader from './SectionHeader';
import MsgConfig from '../Config/MsgConfig';
import {store} from '../redux/store';
import {setSelectedDailyVerse} from '../redux/reducer/DailyVerses';

const {width} = Dimensions.get('window');

const BannerComponent = props => {
  const {getBanner} = store.getState().banner;
  const {navigation} = props;
  if (getBanner.length == 0) {
    return null;
  }
  return (
    <>
      <View
        style={{
          paddingLeft: '4%',
        }}>
        <SectionHeader sectionTitle={MsgConfig.bannerComp} />
      </View>
      <View style={styles.container}>
        <Carousel
          data={getBanner}
          width={width} // Full-width banners with padding
          height={getResHeight(45)}
          autoPlay
          autoPlayInterval={3000}
          loop
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 50,
            parallaxScrollingScale: 0.9,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                store.dispatch(
                  setSelectedDailyVerse({
                    selectedLng: item,
                    headerTitle: 'Momentious Occasion',
                  }),
                );
                navigation.navigate('VerseDetails');
              }}
              style={styles.slide}>
              <Image
                source={{uri: item.imageUrl}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.overlay}
              />
              <Text style={styles.bannerTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    // paddingVertical: 20,
  },
  slide: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 15,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});

export default BannerComponent;
