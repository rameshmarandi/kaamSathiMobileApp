import React, {useState, useEffect, useRef, useCallback, memo} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {Svg, Image as ImageSvg} from 'react-native-svg';

import {getFontSize, getResWidth, getResHeight} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import {Linking} from 'react-native';
import {AutoScrollBtnCom} from './AutoScrollBtnCom';

const GoogleUIComp = props => {
  const {onCreateBranch, allBranchList} = props;
  const {
    currentBgColor,

    currentTextColor,
  } = useSelector(state => state.user);

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

  const [selectedChurch, setSelectedChurch] = useState(null);
  const handleCardPress = useCallback(
    church => {
      setSelectedChurch(church);
    },
    [handleCardPress, selectedChurch],
  );
  const [selectedItem, setSelectedItem] = useState(0);

  // Animate to the selected church when a card is pressed
  useEffect(() => {
    const selectedBranch = selectedChurch?.churchDetails || null;
    if (selectedBranch && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedBranch.latitude,
          longitude: selectedBranch.longitude,
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
          padding: 5,
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
        {allBranchList.map((coordinate, index) => {
          return (
            <Marker
              key={index}
              coordinate={coordinate.churchDetails}
              pinColor={theme.color.error}>
              <MarkPopup
                title={coordinate.churchDetails['Branch name']}
                coordinate={coordinate.churchDetails}
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
          );
        })}
      </MapView>

      {allBranchList.length > 0 && (
        <>
          <View>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: getResHeight(3),
                paddingHorizontal: '5%',
                marginBottom: '2%',
              }}>
              <Text
                style={{
                  color: currentTextColor,
                  fontFamily: theme.font.bold,
                }}>
                All church branch list
              </Text>
            </View>

            <AutoScrollBtnCom
              data={allBranchList}
              selectedTab={selectedItem}
              onPress={(item, index) => {
                handleCardPress(item);
                setSelectedItem(index);
              }}
            />
          </View>
        </>
      )}
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
