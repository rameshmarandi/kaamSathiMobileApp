import React, {useState, useEffect, useRef, memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import {getFontSize, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import {Linking} from 'react-native';

const GoogleUIComp = ({selectedChurch}) => {
  const {isDarkMode, currentBgColor, currntTextColor} = useSelector(
    state => state.user,
  );

  // Center around India's geographical location
  const initialLatitude = 20.5937; // Center of India
  const initialLongitude = 78.9629; // Center of India
  const initialLatitudeDelta = 28; // Adjust to fit India initially
  const initialLongitudeDelta = 28; // Adjust to fit India initially

  const [region, setRegion] = useState({
    latitude: initialLatitude,
    longitude: initialLongitude,
    latitudeDelta: initialLatitudeDelta,
    longitudeDelta: initialLongitudeDelta,
  });

  const mapRef = useRef(null); // Ref for the MapView

  const coordinates = [
    {id: '1', name: 'Ambegaon', latitude: 18.59179, longitude: 73.81964},
    {
      id: '2',
      name: 'Pimple Gurav',
      latitude: 18.5890345,
      longitude: 73.7925924,
    },
    {id: '3', name: 'Beed', latitude: 18.989088, longitude: 75.760078},
    {id: '4', name: 'Pune', latitude: 18.5204, longitude: 73.8567},
    {id: '5', name: 'Mumbai', latitude: 19.076, longitude: 72.8777},
    {id: '6', name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714},
    {id: '7', name: 'Bangalore', latitude: 12.9716, longitude: 77.5946},
    {id: '8', name: 'Kolkata', latitude: 22.5726, longitude: 88.3639},
    {id: '9', name: 'Chennai', latitude: 13.0827, longitude: 80.2707},
    {id: '10', name: 'Jaipur', latitude: 26.9124, longitude: 75.7873},
    {id: '11', name: 'Hyderabad', latitude: 17.385, longitude: 78.4867},
    {id: '12', name: 'Lucknow', latitude: 26.8467, longitude: 80.9462},
    {id: '13', name: 'Bhopal', latitude: 23.2599, longitude: 77.4126},
    {id: '14', name: 'Surat', latitude: 21.1702, longitude: 72.8311},
    {id: '15', name: 'Nagpur', latitude: 21.1458, longitude: 79.0882},
  ];

  // Animate to the selected church when a card is pressed
  useEffect(() => {
    if (selectedChurch && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedChurch.latitude,
          longitude: selectedChurch.longitude,
          latitudeDelta: 0.01, // Zoom level for a closer look
          longitudeDelta: 0.01,
        },
        1000, // Animation duration
      );
    }
  }, [selectedChurch]);

  const handleReset = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: initialLatitudeDelta,
          longitudeDelta: initialLongitudeDelta,
        },
        1000, // Smooth animation duration
      );
    }
  };

  return (
    <>
      {/* Reset button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 9999,
          backgroundColor: currentBgColor,
          borderRadius: 5,
          padding: 10,
        }}
        onPress={handleReset}>
        <VectorIcon
          type={'MaterialCommunityIcons'}
          name={'reload'}
          size={getFontSize(4)}
          color={'white'}
        />
      </TouchableOpacity>

      {/* MapView with reference */}
      <MapView
        ref={mapRef} // Attach the ref to MapView
        style={{flex: 1}}
        initialRegion={region} // Initial region setup
        showsBuildings
        showsTraffic
        zoomTapEnabled
        showsCompass
        onRegionChangeComplete={setRegion} // Update region on changes
      >
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            pinColor={theme.color.error}>
            <MarkPopup
              title={coordinate.name}
              coordinate={coordinate}
              description={
                'Welcome! Join us this Sunday for a blessed service.'
              }
              currentBgColor={currentBgColor}
              imageURL={
                'https://images.template.net/wp-content/uploads/2017/01/20120247/Catholic-Church-Logo.jpg'
              }
              onPress={coordinate => {
                const {latitude, longitude} = coordinate;

                const url =
                  Platform.OS === 'ios'
                    ? `http://maps.apple.com/?ll=${latitude},${longitude}`
                    : `geo:${latitude},${longitude}`;
                Linking.openURL(url).catch(err =>
                  console.error('Error opening map:', err),
                );
              }}
            />
          </Marker>
        ))}
      </MapView>
    </>
  );
};

const MarkPopup = ({
  title,
  imageURL,
  coordinate,
  currentBgColor,
  description,
  onPress,
}) => {
  return (
    <Callout
      onPress={() => {
        console.log('ONPRESS_ARDSdsfds');
        if (onPress) {
          onPress(coordinate);
        }
      }}
      style={{
        width: getResWidth(50),
        height: getResWidth(20),
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg
          width={getResWidth(20)}
          height={getResWidth(20)}
          style={{borderRadius: getResWidth(100)}}>
          <ImageSvg
            width={'100%'}
            height={'100%'}
            preserveAspectRatio="xMidYMid slice"
            href={{
              uri: `${imageURL}`,
            }}
          />
        </Svg>

        <View
          style={{
            flex: 1,
            height: '90%',
            marginLeft: getResWidth(4),
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={3}
            style={{
              color: 'red',
              fontFamily: theme.font.bold,
              fontSize: getFontSize(1.6),
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: currentBgColor,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1),
            }}>
            {description}
          </Text>

          <Text
            style={{
              color: theme.color.primary,
              fontFamily: theme.font.regular,
              fontSize: getFontSize(1.5),
              fontWeight: '700',
            }}>
            Visit now
          </Text>
        </View>
      </View>
    </Callout>
  );
};

export default GoogleUIComp;
