import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {getResHeight} from '../utility/responsive';
import SectionHeader from './SectionHeader';
import MsgConfig from '../Config/MsgConfig';

const {width} = Dimensions.get('window');
const data = [
  {
    title: 'Beautiful Mountain',
    image:
      'https://img.freepik.com/free-vector/happy-easter-day-wishes-background-with-colorful-3d-eggs_1017-37937.jpg',
  },
  {
    title: 'Sunny Beach',
    image:
      'https://madhuedits.com/wp-content/uploads/2024/03/Birthday-Flex-Design-1024x683.jpg',
  },
  {
    title: 'Lush Forest',
    image:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/anniversary-wishes-design-template-77af685489e36388b7fbb71150a950a1_screen.jpg?ts=1691182808',
  },
  {
    title: 'Lush Forest',
    image:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/happy-anniversary-greeting-card-template-design-c6a8f53d14bd693cbb85c241972e425d_screen.jpg?ts=1637015305',
  },
  {
    title: 'Lush Forest',
    image:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-anniversary-design-template-581d885ccff3403b6006f1c97f7783c8_screen.jpg?ts=1706256093',
  },
  // {
  //   title: 'Lush Forest',
  //   image:""
  //        },
  // {
  //   title: 'Lush Forest',
  //   image:""
  //        },
  // {
  //   title: 'Lush Forest',
  //   image:""
  //        },
];

const BannerComponent = () => {
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
          data={data}
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
            <View style={styles.slide}>
              <Image
                source={{uri: item.image}}
                style={styles.bannerImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.overlay}
              />
              <Text style={styles.bannerTitle}>{item.title}</Text>
            </View>
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
