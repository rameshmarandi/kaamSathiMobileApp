import React, {useState, useRef, useEffect, memo} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  getResHeight,
  getResWidth,
  getFontSize,
} from '../../../utility/responsive';
import CustomHeader from '../../../Components/CustomHeader';
import SearchBarComp from '../../../Components/SearchBarComp';
import SmallMenuComp from '../../../Components/SmallMenuComp';
import ConfirmAlert from '../../../Components/ConfirmAlert';
import CustomBottomSheet from '../../../Components/CustomBottomSheet';
import {VectorIcon} from '../../../Components/VectorIcon';
import theme from '../../../utility/theme';
import {Surface} from 'react-native-paper';
import MsgConfig from '../../../Config/MsgConfig';
import {
  ButtonIconComp,
  EmptyUserProfile,
  StatusBarComp,
} from '../../../Components/commonComp';
import {TextInput} from 'react-native';
import WaveButton from '../../../Components/WaveButton';

const demoUsers = [
  {
    id: '1',
    userBio: {
      'Full name': 'Ramesh Marandi',
      'Church branch': 'Pimple gurav',
      'Date of birth': '1 May 2003',
      'Date of baptism': '12 Feb 2015',
      Mobile: '9898989898',
      Email: 'textemail1@gmail.com',
    },
  },
  {
    id: '2',
    userBio: {
      'Full name': 'Suresh Gupta',
      'Church branch': 'Baner',
      'Date of birth': '15 Jun 2001',
      'Date of baptism': '5 Mar 2014',
      Mobile: '9797979797',
      Email: 'textemail2@gmail.com',
    },
  },
  {
    id: '3',
    userBio: {
      'Full name': 'Anita Sharma',
      'Church branch': 'Wakad',
      'Date of birth': '10 Jul 2000',
      'Date of baptism': '20 Jan 2013',
      Mobile: '9696969696',
      Email: 'textemail3@gmail.com',
    },
  },
  {
    id: '4',
    userBio: {
      'Full name': 'Ravi Kumar',
      'Church branch': 'Kothrud',
      'Date of birth': '23 Aug 1998',
      'Date of baptism': '15 Apr 2012',
      Mobile: '9595959595',
      Email: 'textemail4@gmail.com',
    },
  },
  {
    id: '5',
    userBio: {
      'Full name': 'Priya Desai',
      'Church branch': 'Viman Nagar',
      'Date of birth': '12 Sep 1995',
      'Date of baptism': '28 May 2010',
      Mobile: '9494949494',
      Email: 'textemail5@gmail.com',
    },
  },
  {
    id: '6',
    userBio: {
      'Full name': 'Manish Patel',
      'Church branch': 'Hinjewadi',
      'Date of birth': '18 Oct 2002',
      'Date of baptism': '8 Jun 2016',
      Mobile: '9393939393',
      Email: 'textemail6@gmail.com',
    },
  },
  {
    id: '7',
    userBio: {
      'Full name': 'Nisha Reddy',
      'Church branch': 'Kharadi',
      'Date of birth': '5 Nov 1999',
      'Date of baptism': '19 Jul 2014',
      Mobile: '9292929292',
      Email: 'textemail7@gmail.com',
    },
  },
  {
    id: '8',
    userBio: {
      'Full name': 'Amit Singh',
      'Church branch': 'Aundh',
      'Date of birth': '29 Dec 2001',
      'Date of baptism': '11 Aug 2013',
      Mobile: '9191919191',
      Email: 'textemail8@gmail.com',
    },
  },
  {
    id: '9',
    userBio: {
      'Full name': 'Kavita Agarwal',
      'Church branch': 'Hadapsar',
      'Date of birth': '17 Jan 2000',
      'Date of baptism': '30 Sep 2012',
      Mobile: '9090909090',
      Email: 'textemail9@gmail.com',
    },
  },
  {
    id: '10',
    userBio: {
      'Full name': 'Sunil Joshi',
      'Church branch': 'Magarpatta',
      'Date of birth': '6 Feb 2002',
      'Date of baptism': '14 Oct 2015',
      Mobile: '8989898989',
      Email: 'textemail10@gmail.com',
    },
  },
  {
    id: '11',
    userBio: {
      'Full name': 'Shweta Verma',
      'Church branch': 'Pimple Nilakh',
      'Date of birth': '25 Mar 2001',
      'Date of baptism': '22 Nov 2014',
      Mobile: '8888888888',
      Email: 'textemail11@gmail.com',
    },
  },
  {
    id: '12',
    userBio: {
      'Full name': 'Rahul Mehta',
      'Church branch': 'Bhosari',
      'Date of birth': '13 Apr 1997',
      'Date of baptism': '3 Dec 2011',
      Mobile: '8787878787',
      Email: 'textemail12@gmail.com',
    },
  },
  {
    id: '13',
    userBio: {
      'Full name': 'Deepa Shetty',
      'Church branch': 'Deccan',
      'Date of birth': '2 May 1996',
      'Date of baptism': '9 Jan 2010',
      Mobile: '8686868686',
      Email: 'textemail13@gmail.com',
    },
  },
  {
    id: '14',
    userBio: {
      'Full name': 'Vikram Khanna',
      'Church branch': 'Swargate',
      'Date of birth': '19 Jun 1998',
      'Date of baptism': '21 Feb 2012',
      Mobile: '8585858585',
      Email: 'textemail14@gmail.com',
    },
  },
  {
    id: '15',
    userBio: {
      'Full name': 'Pooja Nair',
      'Church branch': 'Shivaji Nagar',
      'Date of birth': '8 Jul 1999',
      'Date of baptism': '4 Mar 2013',
      Mobile: '8484848484',
      Email: 'textemail15@gmail.com',
    },
  },
  {
    id: '16',
    userBio: {
      'Full name': 'Ashok Rana',
      'Church branch': 'Bibvewadi',
      'Date of birth': '28 Aug 2001',
      'Date of baptism': '16 Apr 2014',
      Mobile: '8383838383',
      Email: 'textemail16@gmail.com',
    },
  },
  {
    id: '17',
    userBio: {
      'Full name': 'Meera Pandey',
      'Church branch': 'NIBM',
      'Date of birth': '14 Sep 2002',
      'Date of baptism': '29 May 2015',
      Mobile: '8282828282',
      Email: 'textemail17@gmail.com',
    },
  },
  {
    id: '18',
    userBio: {
      'Full name': 'Arjun Roy',
      'Church branch': 'Camp',
      'Date of birth': '22 Oct 2000',
      'Date of baptism': '10 Jun 2013',
      Mobile: '8181818181',
      Email: 'textemail18@gmail.com',
    },
  },
  {
    id: '19',
    userBio: {
      'Full name': 'Ritu Singh',
      'Church branch': 'Katraj',
      'Date of birth': '3 Nov 1997',
      'Date of baptism': '17 Jul 2011',
      Mobile: '8080808080',
      Email: 'textemail19@gmail.com',
    },
  },
  {
    id: '20',
    userBio: {
      'Full name': 'Sanjay Das',
      'Church branch': 'Warje',
      'Date of birth': '30 Dec 1998',
      'Date of baptism': '25 Aug 2012',
      Mobile: '7979797979',
      Email: 'textemail20@gmail.com',
    },
  },
  {
    id: '21',
    userBio: {
      'Full name': 'Rina Jain',
      'Church branch': 'Bavdhan',
      'Date of birth': '7 Jan 2000',
      'Date of baptism': '6 Sep 2013',
      Mobile: '7878787878',
      Email: 'textemail21@gmail.com',
    },
  },
  {
    id: '22',
    userBio: {
      'Full name': 'Rohan Thakur',
      'Church branch': 'Kalyani Nagar',
      'Date of birth': '26 Feb 2001',
      'Date of baptism': '13 Oct 2014',
      Mobile: '7777777777',
      Email: 'textemail22@gmail.com',
    },
  },
  {
    id: '23',
    userBio: {
      'Full name': 'Geeta Yadav',
      'Church branch': 'Nigdi',
      'Date of birth': '15 Mar 1999',
      'Date of baptism': '18 Nov 2012',
      Mobile: '7676767676',
      Email: 'textemail23@gmail.com',
    },
  },
  {
    id: '24',
    userBio: {
      'Full name': 'Karan Kapoor',
      'Church branch': 'Dhanori',
      'Date of birth': '4 Apr 2002',
      'Date of baptism': '27 Dec 2015',
      Mobile: '7575757575',
      Email: 'textemail24@gmail.com',
    },
  },
  {
    id: '25',
    userBio: {
      'Full name': 'Anjali Menon',
      'Church branch': 'Pashan',
      'Date of birth': '23 May 2000',
      'Date of baptism': '5 Jan 2014',
      Mobile: '7474747474',
      Email: 'textemail25@gmail.com',
    },
  },
  {
    id: '26',
    userBio: {
      'Full name': 'Vijay Chauhan',
      'Church branch': 'Baner',
      'Date of birth': '12 Jun 1998',
      'Date of baptism': '15 Feb 2013',
      Mobile: '7373737373',
      Email: 'textemail26@gmail.com',
    },
  },
  {
    id: '27',
    userBio: {
      'Full name': 'Maya Rao',
      'Church branch': 'Pimple Saudagar',
      'Date of birth': '31 Jul 1997',
      'Date of baptism': '30 Mar 2012',
      Mobile: '7272727272',
      Email: 'textemail27@gmail',
    },
  },
];

const menuItems = [{title: 'Update'}, {title: 'Block'}, {title: 'Delete'}];

const initialState = {
  filteredData: demoUsers,
  isLoading: false,
  searchText: '',
};

const Index = memo(props => {
  const {navigation} = props;
  const {isDarkMode, currentBgColor, currentTextColor} = useSelector(
    state => state.user,
  );

  const [state, setState] = useState(initialState);
  const [userData, setUserData] = useState([...demoUsers]);
  const [showAlert, setShowAlert] = useState(false);
  const sheetRef1 = useRef(null);

  const updateState = newState =>
    setState(prevState => ({...prevState, ...newState}));
  const {filteredData, isLoading, searchText} = state;

  const handleSearch = text => {
    updateState({searchText: text});
  };

  useEffect(() => {
    updateState({isLoading: true});
    const filtered = demoUsers.filter(item =>
      item.userBio['Full name']
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );

    updateState({setUserData: filtered});
    setTimeout(() => {
      updateState({isLoading: false});
    }, 300);
  }, [searchText]);
  const UserBioComponent = ({userBio}) => {
    // Convert userBio object to an array of key-value pairs
    const userBioArray = Object.entries(userBio).map(([key, value]) => ({
      key,
      value,
    }));

    // Render each item in the FlatList
    const renderItem = ({item}) => (
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: getResWidth(2),
          marginTop: getResHeight(1),
        }}>
        <Text
          style={{
            width: getResWidth(40),
            color: currentTextColor,
            fontFamily: theme.font.semiBold,
          }}>
          {item.key}
        </Text>
        <Text
          style={{
            width: getResWidth(43),
            color: currentTextColor,
            fontFamily: theme.font.regular,
          }}>
          {item.value}
        </Text>
      </View>
    );

    return (
      <FlatList
        data={userBioArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  };

  const bottomSheetRef = useRef(null);
  const [bottomSheetContent, setBottomSheetContent] = useState(null);

  const openBottomSheetWithContent = content => {
    setBottomSheetContent(content);
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  const singleUserCardData = item => {
    const {userBio} = item;

    console.log('sing_user', userBio);
    return (
      <View
        style={{
          flex: 1,
          // padding: '5%',
          alignItems: 'center',
        }}>
        <ScrollView
          style={{
            width: '100%',
          }}>
          <View
            style={{
              marginTop: getResHeight(12),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <EmptyUserProfile
              onPress={() => {
                alert('sdfsd');
              }}
            />
          </View>
          <View
            style={{
              marginTop: '5%',
            }}>
            <Text style={{color: 'red'}}>{userBio['Full name']}</Text>
          </View>
          {/* <FormikHandler /> */}

          <TextInput
            style={{
              width: '100%',
              borderWidth: 1,
            }}
            placeholder="Name"
            onChangeText={() => {}}
            onBlur={() => {}}
            value={''}
          />
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: currentBgColor,
      }}>
      <StatusBarComp />

      <View style={{}}>
        <CustomHeader
          backPress={() => {
            navigation.goBack();
          }}
          screenTitle={MsgConfig.allMembers}
          filterIcon={() => {}}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: getResHeight(7),
          right: getResWidth(7),
        }}>
        <WaveButton
          onPress={() => {
            props.navigation.navigate('AddMemberForm');
          }}
        />
      </View>
      <ConfirmAlert
        visible={showAlert}
        onCancel={() => setShowAlert(false)}
        onConfirm={() => {
          setShowAlert(false);
        }}
      />
      <View
        style={{
          marginTop: '3%',
          paddingHorizontal: '1%',
        }}>
        <SearchBarComp
          placeholder="Search all members..."
          isLoading={isLoading}
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>

      <CustomBottomSheet ref={bottomSheetRef} modalHeight={500}>
        {bottomSheetContent}
      </CustomBottomSheet>

      <View
        style={{
          zIndex: -9999,
          paddingBottom: getResHeight(10),
          paddingHorizontal: '2%',
          paddingTop: '2%',
        }}>
        {/* <ExampleUsage /> */}
        <FlatList
          data={userData}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: '20%'}}
          renderItem={({item, index}) => {
            console.log('single_items', item);
            return (
              <View
                style={[
                  theme.styles.cardEffect,
                  {
                    width: getResWidth(90),
                    backgroundColor: currentBgColor,
                    borderWidth: 1,
                    borderColor: currentTextColor,
                    alignSelf: 'center',
                    borderRadius: getResHeight(2),
                    paddingVertical: getResHeight(2),
                    marginBottom: '5%',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  },
                ]}>
                <View
                  style={{
                    position: 'absolute',
                    top: getResHeight(1.4),
                    right: getResWidth(2),
                    zIndex: 9999,
                  }}>
                  <SmallMenuComp
                    buttonLabel={openMenu => (
                      <ButtonIconComp
                        onPress={() => {
                          openMenu();
                        }}
                        icon={
                          <VectorIcon
                            type={'Entypo'}
                            name={'dots-three-vertical'}
                            size={getFontSize(2.1)}
                            color={currentTextColor}
                          />
                        }
                        containerStyle={{
                          width: getResHeight(5),
                          height: getResHeight(5),
                          backgroundColor: currentBgColor,
                          borderRadius: getResHeight(100),
                        }}
                      />
                    )}
                    menuItems={menuItems}
                    onMenuPress={menuIndex => {
                      if (menuIndex === 0) {
                        const res = singleUserCardData(item);
                        console.log('userData', res);
                        setTimeout(() => {
                          openBottomSheetWithContent(res);
                        }, 500);
                      }
                      if (menuIndex === 2) {
                        setShowAlert(true);
                      }
                    }}
                  />
                </View>
                <View
                  style={{
                    width: getResWidth(26),
                    paddingLeft: getResHeight(2),
                  }}>
                  <Image
                    source={{
                      uri: 'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1719',
                    }}
                    style={{
                      height: getResHeight(10),
                      width: getResHeight(10),
                      borderRadius: getResHeight(100),
                    }}
                  />
                </View>
                <View
                  style={{
                    width: getResWidth(48),
                    marginLeft: '5%',
                    flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      maxWidth: '100%',
                      fontSize: getFontSize(2),
                      fontFamily: theme.font.semiBold,
                      color: currentTextColor,
                    }}>
                    {item.userBio['Full name']}
                  </Text>
                  <Text
                    style={{
                      width: '98%',
                      fontFamily: theme.font.medium,
                      fontSize: getFontSize(1.5),
                      color: currentTextColor,
                    }}>
                    {item.userBio.Email}
                  </Text>
                </View>
                <View
                  style={{
                    borderTopWidth: 0.5,
                    borderColor: 'white',
                    width: '100%',
                    marginTop: '5%',
                    paddingTop: '5%',
                    flexDirection: 'row',
                    paddingHorizontal: getResWidth(2),
                  }}>
                  <UserBioComponent userBio={item.userBio} />
                  {/* {console.log(
                    'renderUserBio(item.userBio)',
                    renderUserBio(item.userBio)[0],
                  )}
                  {renderUserBio( <UserBioComponent userBio={userBio} />)[0]} */}
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
});

export default Index;
