import React, {useState, memo, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  getResHeight,
  getFontSize,
  getResWidth,
} from '../../../utility/responsive';
import {useSelector} from 'react-redux';
import theme from '../../../utility/theme';
import CustomHeader from '../../../Components/CustomHeader';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import {store} from '../../../redux/store';
import {
  getNewApplicationAPIHander,
  updateApplicationStatusAPIHander,
} from '../../../redux/reducer/Profile/ProfileAPI';
import {dateFormatHander} from '../../../Components/commonHelper';
import ImageView from 'react-native-image-viewing';
import NoDataFound from '../../../Components/NoDataFound';

const sampleData = [
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  {id: '1', name: 'John Doe', image: ''},
  {id: '2', name: 'Jane Smith', image: ''},
  // Add more sample data as needed
];

const ApprovalCard = memo(
  ({
    item,
    onAccept,
    onReject,
    onProfileImagePress,
    currentBgColor,
    currentTextColor,
  }) => {
    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: currentBgColor,
            borderWidth: 0.5,
            borderColor: currentTextColor,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            onProfileImagePress(item);
          }}>
          <Image
            // defaultSource={Image}
            source={{uri: item.avatar}}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.name,
              {
                color: currentTextColor,
              },
            ]}>
            {item.fullName}
          </Text>
          <View
            style={{
              flexDirection: 'column',
              flexWrap: 'wrap',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <Text
                style={[
                  styles.textStyles,
                  {color: currentTextColor},
                  {},
                ]}>{`Gender : ${item.gender}`}</Text>
              <Text
                style={[
                  styles.textStyles,
                  {color: currentTextColor},
                  {},
                ]}>{`Dob : ${dateFormatHander(item.dob, 'DD MMM YYYY')}`}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <Text
                style={[
                  styles.textStyles,
                  {color: currentTextColor},
                  {},
                ]}>{`Mob : ${item.mobile}`}</Text>
              <Text
                style={[
                  styles.textStyles,
                  {color: currentTextColor},
                  {},
                ]}>{`Branch : ${
                item.branchName ? item.branchName : '_'
              }`}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.button,
                styles.rejectButton,
                {
                  marginRight: getResHeight(0.5),
                },
              ]}
              onPress={() => onReject(item._id)}>
              <Text style={[styles.buttonText, {}]}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button, styles.acceptButton]}
              onPress={() => onAccept(item._id)}>
              <Text style={[styles.buttonText, {}]}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#f3f3f3',
            height: getResHeight(2.5),
            width: getResWidth(19),
            position: 'absolute',
            right: getResHeight(0),
            top: 0,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 10,
          }}>
          <Text
            style={[
              {
                color: currentBgColor,
                fontSize: getFontSize(1.3),
                fontFamily: theme.font.semiBold,
              },
            ]}>
            6h ago
          </Text>
        </View>
      </View>
    );
  },
);

const Approval = memo(props => {
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );
  const {getAllPendingUser} = useSelector(state => state.profile);
  const [isImageViewerModal, setIsImageViewerModal] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const {navigation} = props;

  useEffect(() => {
    APIHandler();
  }, []);

  const APIHandler = async () => {
    try {
      await store.dispatch(getNewApplicationAPIHander());
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // Image viewer
  const images = [
    {
      uri: viewImageUrl,
    },
  ];

  const handleAccept = async id => {
    try {
      // 0 - Pending
      // 1 - Accept
      // 2 - Reject
      // setShowAlert(true);
      await store.dispatch(
        updateApplicationStatusAPIHander({
          _id: id,
          status: 1,
        }),
      );
    } catch (error) {
      console.error('Applicaiton Accepter Error:', error);
    }
  };

  const handleReject = async id => {
    try {
      // 0 - Pending
      // 1 - Accept
      // 2 - Reject
      await store.dispatch(
        updateApplicationStatusAPIHander({
          _id: id,
          status: 2,
        }),
      );
    } catch (error) {
      console.error('Applicaiton rejection Error:', error);
    }
  };

  const renderItem = ({item}) => (
    <ApprovalCard
      item={item}
      onAccept={handleAccept}
      onReject={handleReject}
      currentTextColor={currentTextColor}
      currentBgColor={currentBgColor}
      onProfileImagePress={item => {
        console.log('onProfileImagePress', item);
        if (item.avatar !== '') {
          setViewImageUrl(item.avatar);
          setIsImageViewerModal(true);
        }
      }}
    />
  );

  console.log('getAllPendingUser', getAllPendingUser);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentBgColor,
        },
      ]}>
      <ConfirmAlert
        visible={showAlert}
        onCancel={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false);
        }}
      />
      <CustomHeader
        Hamburger={() => {
          navigation.openDrawer();
          // Keyboard.dismiss();
        }}
        onPressNotificaiton={() => {
          navigation.navigate('UserNotification');
        }}
        centerLogo={true}
      />
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageViewerModal}
        onRequestClose={() => setIsImageViewerModal(false)}
      />
      <View
        style={{
          paddingHorizontal: '3%',
          flex: 1,
        }}>
        <FlatList
          data={getAllPendingUser}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => APIHandler(false)}
            />
          }
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => {
            return <NoDataFound />;
          }}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // padding: getResHeight(2),
  },
  list: {
    // paddingBottom: getResHeight(2),
  },

  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: getResHeight(2),
    elevation: 3,
    marginBottom: getResHeight(1),
    overflow: 'hidden',
    // alignItems: 'center',
    paddingHorizontal: getResHeight(1.5),
    paddingVertical: getResHeight(2),
    margin: getResHeight(0.4),
  },
  image: {
    width: getResHeight(10),
    height: getResHeight(10),
    borderRadius: 50,
    marginRight: getResHeight(1),
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: theme.color.error,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: getFontSize(1.9),
    fontFamily: theme.font.bold,
  },
  textStyles: {
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.5),
    marginBottom: getResHeight(0.5),
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: getResHeight(1),

    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#ff4d4d',
  },
  acceptButton: {
    backgroundColor: '#54D454',
  },
  buttonText: {
    color: 'white',
    fontFamily: theme.font.medium,
    fontSize: getFontSize(1.5),
  },
});

export default Approval;
