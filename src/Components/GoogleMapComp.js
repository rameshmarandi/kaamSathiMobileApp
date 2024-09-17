import React, {useState, useEffect, useRef, memo} from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {getFontSize, getResHeight, getResWidth} from '../utility/responsive';
import {VectorIcon} from './VectorIcon'; // Adjust path if needed
import theme from '../utility/theme';

const GoogleUIComp = ({selectedChurch}) => {
  const {isDarkMode, currentBgColor} = useSelector(state => state.user);

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
    {
      latitude: 18.59179,
      longitude: 73.81964,
      title: 'Ambegaon',
      description: 'Description for Ambegaon',
    },
    {
      latitude: 18.5890345,
      longitude: 73.7925924,
      title: 'Pimple Gurav',
      description: 'Description for Pimple Gurav',
    },
    {
      latitude: 18.989088,
      longitude: 75.760078,
      title: 'Beed',
      description: 'Description for Beed',
    },
    {
      latitude: 18.5204,
      longitude: 73.8567,
      title: 'Pune',
      description: 'Description for Pune',
    },
    {
      latitude: 19.076,
      longitude: 72.8777,
      title: 'Mumbai',
      description: 'Description for Mumbai',
    },
    {
      latitude: 23.0225,
      longitude: 72.5714,
      title: 'Ahmedabad',
      description: 'Description for Ahmedabad',
    },
    {
      latitude: 12.9716,
      longitude: 77.5946,
      title: 'Bangalore',
      description: 'Description for Bangalore',
    },
    {
      latitude: 22.5726,
      longitude: 88.3639,
      title: 'Kolkata',
      description: 'Description for Kolkata',
    },
    {
      latitude: 13.0827,
      longitude: 80.2707,
      title: 'Chennai',
      description: 'Description for Chennai',
    },
    {
      latitude: 26.9124,
      longitude: 75.7873,
      title: 'Jaipur',
      description: 'Description for Jaipur',
    },
    {
      latitude: 17.385,
      longitude: 78.4867,
      title: 'Hyderabad',
      description: 'Description for Hyderabad',
    },
    {
      latitude: 26.8467,
      longitude: 80.9462,
      title: 'Lucknow',
      description: 'Description for Lucknow',
    },
    {
      latitude: 23.2599,
      longitude: 77.4126,
      title: 'Bhopal',
      description: 'Description for Bhopal',
    },
    {
      latitude: 21.1702,
      longitude: 72.8311,
      title: 'Surat',
      description: 'Description for Surat',
    },
    {
      latitude: 21.1458,
      longitude: 79.0882,
      title: 'Nagpur',
      description: 'Description for Nagpur',
    },
  ];

  // Animate to the selected church
  useEffect(() => {
    if (selectedChurch && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedChurch.latitude,
          longitude: selectedChurch.longitude,
          latitudeDelta: 0.01, // Zoom in closely to the selected church
          longitudeDelta: 0.01,
        },
        1000,
      ); // Smooth animation duration
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
        100,
      ); // Smooth animation duration
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
        region={region}
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
              title={coordinate.title}
              description={coordinate.description}
            />
          </Marker>
        ))}
      </MapView>
    </>
  );
};

const MarkPopup = memo(({title, description, onPress}) => {
  return (
    <Callout
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      style={{
        width: 150,
        height: 100,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          backgroundColor: 'white', // Ensure the Callout background is visible
        }}>
        {/* <Image
          source={theme.assets.church_logo_origianl}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
        /> */}
        <Image
          source={theme.assets.church_logo_origianl}
          resizeMode="cover"
          style={{
            width: getResHeight(5),
            height: getResHeight(5),
            borderRadius: getResHeight(100),
            backgroundColor: 'red',
          }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: getResWidth(4),
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: getFontSize(1.2),
              fontWeight: '700',
            }}>
            {title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontSize: getFontSize(1),
              fontWeight: '500',
              marginBottom: getResHeight(1),
            }}>
            {description}
          </Text>
          <Text
            style={{
              fontSize: getFontSize(1),
              fontWeight: '700',
              color: theme.color.primary,
            }}>
            View Offer
          </Text>
        </View>
      </View>
    </Callout>
  );
});

export default GoogleUIComp;
