import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import MapView, {Marker, Callout, Circle} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {useSelector} from 'react-redux';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import {getFontSize, getResWidth, getResHeight} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import {Linking} from 'react-native';
import {AutoScrollBtnCom} from './AutoScrollBtnCom';

const GoogleUIComp = props => {
  const {onCreateBranch, allBranchList} = props;
  const {currentBgColor, userLocation, currentTextColor} = useSelector(
    state => state.user,
  );

  const [currentLocation, setCurrentLocation] = useState(null); // For storing user's location
  const [region, setRegion] = useState(null); // For region state
  const [selectedChurch, setSelectedChurch] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);
  const mapRef = useRef(null); // Ref for the MapView

  // Function to fetch the current location
  const fetchCurrentLocation = () => {
    console.log('fethcin_wokring', userLocation);
    // return;
    // Geolocation.getCurrentPosition(
    //   position => {
    // const {latitude, longitude} = position.coords;
    if (userLocation.address !== 'error') {
      setCurrentLocation({
        latitude: userLocation?.coordinate?.latitude,
        longitude: userLocation?.coordinate?.longitude,
      });
      setRegion({
        latitude: userLocation?.coordinate?.latitude,
        longitude: userLocation?.coordinate?.longitude,
        latitudeDelta: 0.04, // Adjust for zoom
        longitudeDelta: 0.04,
      });

      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: userLocation?.coordinate?.latitude,
            longitude: userLocation?.coordinate?.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          },
          1000, // Animation duration
        );
      }
    }

    // },
    // error => {
    //   Alert.alert(
    //     'Location Error',
    //     error.message || 'Unable to fetch location',
    //   );
    // },
    // {
    //   enableHighAccuracy: true,
    //   timeout: 15000,
    //   maximumAge: 10000,
    // },
    // );
  };

  // Fetch the current location on component mount
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  // Handle reset to current location
  const handleReset = () => {
    if (currentLocation) {
      mapRef.current.animateToRegion(
        {
          ...currentLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000,
      );
    }
  };

  const handleCardPress = useCallback(church => {
    setSelectedChurch(church);
  }, []);

  // Animate to selected church when a card is pressed
  // useEffect(() => {
  //   const selectedBranch = selectedChurch?.churchDetails || null;
  //   if (selectedBranch && mapRef.current) {
  //     mapRef.current.animateToRegion(
  //       {
  //         latitude: selectedBranch.latitude,
  //         longitude: selectedBranch.longitude,
  //         latitudeDelta: 0.05,
  //         longitudeDelta: 0.05,
  //       },
  //       1000,
  //     );
  //   }
  // }, [selectedChurch]);

  return (
    <>
      {/* Reset button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          position: 'absolute',
          bottom: getResHeight(5),
          right: 20,
          zIndex: 9999,
          backgroundColor: 'white',
          borderRadius: 100,
          padding: 5,
        }}
        onPress={handleReset}>
        <VectorIcon
          type={'MaterialCommunityIcons'}
          name={'crosshairs-gps'}
          size={getFontSize(4)}
          color={'black'}
        />
      </TouchableOpacity>

      {/* MapView */}
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        region={region} // Set region dynamically
        showsBuildings
        showsTraffic
        zoomTapEnabled
        showsCompass
        onRegionChangeComplete={setRegion}>
        {currentLocation && (
          <>
            {/* Marker at the user's current location */}
            {/* <Marker coordinate={currentLocation} pinColor={'red'}>
              <Callout>
                <Text>{userLocation.address}</Text>
              </Callout>
            </Marker> */}
            <ModernUserMarker
              currentLocation={{
                latitude: userLocation?.coordinate?.latitude,
                longitude: userLocation?.coordinate?.longitude,
              }}
              userLocation={{
                address: userLocation.address,
                profileImage:
                  'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png',
              }}
            />
            {/* Radiation effect around the current location */}
            <Circle
              center={currentLocation}
              radius={200} // Radius in meters
              strokeWidth={2}
              strokeColor="#FF9800"
              fillColor="#FFF8E1"
            />
          </>
        )}
      </MapView>
    </>
  );
};

const ModernUserMarker = ({currentLocation, userLocation}) => {
  return (
    <Marker coordinate={currentLocation} pinColor={'red'}>
      <Callout tooltip>
        <View style={styles.calloutContainer}>
          {/* Profile Image */}
          {/* <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  // userLocation.profileImage ||
                  'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/35b6e539-7a9d-4a2d-a5d9-04eb0a8ecb8a/2a1ffde8-5b98-432a-927e-94d29b109890.png',
              }}
              style={styles.profileImage}
            />
          </View> */}

          {/* Address Information */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Your Location</Text>
            <Text style={styles.address}>{userLocation.address}</Text>

            {/* Action Button */}
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => {
                // Example action: Open navigation
                const {latitude, longitude} = currentLocation;
                const url = `geo:${latitude},${longitude}`;
                Linking.openURL(url).catch(err =>
                  console.error('Error opening navigation:', err),
                );
              }}>
              <Text style={styles.buttonText}>Navigate</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GoogleUIComp;
