import React, {useRef} from 'react';
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
  const flatListRef = useRef(null);
  return (
    <>
      <View style={styles.container}>
        <Carousel
          // data={getBanner}
          data={[
            {
              imageUrl:
                'https://res.cloudinary.com/de6ewhwuo/image/upload/v1737300246/Work_Made_Easy_Connections_Made_Strong_oomu6f.png',
            },
            {
              imageUrl:
                'https://res.cloudinary.com/de6ewhwuo/image/upload/v1737300283/your_xmnily.png',
            },
          ]}
          width={width} // Full-width banners with padding
          height={getResHeight(40)}
          pagingEnabled={false} // Prevents locking gestures
          vertical={false} // Ensures only horizontal swiping
          // gestureHandlerProps={{
          //   activeScrollView: flatListRef, // Pass FlatList ref to handle gestures
          // }}
          autoPlay
          autoPlayInterval={3000}
          loop
          snapEnabled
          mode="parallax"
          modeConfig={{
            parallaxScrollingOffset: 50,
            parallaxScrollingScale: 0.9,
          }}
          renderItem={({item}) => (
            <TouchableOpacity
              disabled
              activeOpacity={0.8}
              onPress={() => {}}
              style={styles.slide}>
              <Image
                source={{uri: item.imageUrl}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              {/* <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.overlay}
                />
                <Text style={styles.bannerTitle}>{item.title}</Text> */}
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  slide: {},
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  overlay: {},
  bannerTitle: {},
});

export default BannerComponent;
