import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MsgConfig from '../Config/MsgConfig';
import {getFontSize} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import {checkIsDarkMode, textColorHandler} from './commonHelper';
import {ALL_LINKS} from '../Config/constants';
import {BaseToast, ErrorToast} from 'react-native-toast-message';

const DrawerData = () => {
  const [currentTextColor, setCurrentTextColor] = useState(textColorHandler());

  const {isDarkMode} = useSelector(state => state.user);

  useEffect(() => {
    setCurrentTextColor(textColorHandler());
  }, [isDarkMode]);

  let iconFontSize = getFontSize(3);

  let drawerStaticData = [
    {
      id: 1,
      lable: MsgConfig.home,
      route: 'HomePage',
      icon: (
        <VectorIcon
          type={'Entypo'}
          name={'home'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 2,
      lable: MsgConfig.myProfile,
      route: 'SpecialMoment',
      icon: (
        <VectorIcon
          type={'FontAwesome'}
          name={'user'}
          size={getFontSize(2.9)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 3,
      lable: MsgConfig.freeResource,
      route: 'FreeResource',
      icon: (
        <VectorIcon
          type={'FontAwesome5'}
          name={'compress-arrows-alt'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 4,
      lable: MsgConfig.prayerRequest,
      route: '',
      icon: (
        <VectorIcon
          type={'FontAwesome5'}
          name={'pray'}
          size={getFontSize(3.3)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 5,
      lable: MsgConfig.event,
      route: 'Events',
      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'event-note'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 6,
      lable: MsgConfig.contactWithUs,
      route: 'ContactWithUs',
      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'contact-mail'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 7,
      lable: MsgConfig.feedBack,
      route: 'Feedback',
      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'feedback'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 8,
      lable: MsgConfig.setting,
      route: '',
      icon: (
        <VectorIcon
          type={'Ionicons'}
          name={'settings'}
          size={iconFontSize}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 9,
      lable: MsgConfig.darkmode,
      route: '',
      icon: (
        <VectorIcon
          type={'MaterialCommunityIcons'}
          name={isDarkMode ? 'lightbulb-on' : 'lightbulb-on-outline'}
          size={getFontSize(3.3)}
          color={currentTextColor}
        />
      ),
    },
    {
      id: 10,
      lable: 'Set Admin',
      route: '',
      icon: (
        <VectorIcon
          type={'MaterialIcons'}
          name={'admin-panel-settings'}
          size={getFontSize(3.3)}
          color={currentTextColor}
        />
      ),
    },
  ];

  return {drawerStaticData};
};

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#13e913'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontFamily: theme.font.bold,
        fontSize: getFontSize(1.5),
      }}
      text2Style={{
        fontFamily: theme.font.semiBold,
        fontSize: getFontSize(1.2),
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: '#ff0303'}}
      text1Style={{
        fontFamily: theme.font.bold,
        fontSize: getFontSize(1.5),
      }}
      text2Style={{
        fontFamily: theme.font.semiBold,
        fontSize: getFontSize(1.2),
      }}
    />
  ),

  tomatoToast: ({text1, props}) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

const skilledWorkers = [
  {
    id: 1,
    name: 'Amit Kumar',
    skill: 'Electrician',
    location: 'Delhi',
    experience: 5,
  },
  {
    id: 2,
    name: 'Suresh Verma',
    skill: 'Plumber',
    location: 'Mumbai',
    experience: 3,
  },
  {
    id: 3,
    name: 'Rajesh Singh',
    skill: 'Carpenter',
    location: 'Bangalore',
    experience: 7,
  },
  {
    id: 4,
    name: 'Pooja Sharma',
    skill: 'Painter',
    location: 'Pune',
    experience: 4,
  },
  {
    id: 5,
    name: 'Deepak Mehta',
    skill: 'Mechanic',
    location: 'Chennai',
    experience: 6,
  },
  {
    id: 6,
    name: 'Anjali Chauhan',
    skill: 'Gardener',
    location: 'Kolkata',
    experience: 2,
  },
  {
    id: 7,
    name: 'Ramesh Gupta',
    skill: 'Welder',
    location: 'Hyderabad',
    experience: 8,
  },
  {
    id: 8,
    name: 'Meena Kapoor',
    skill: 'Tailor',
    location: 'Lucknow',
    experience: 5,
  },
  {
    id: 9,
    name: 'Vikas Yadav',
    skill: 'Mason',
    location: 'Jaipur',
    experience: 9,
  },
  {
    id: 10,
    name: 'Rita Sharma',
    skill: 'Housekeeper',
    location: 'Ahmedabad',
    experience: 4,
  },
  {
    id: 11,
    name: 'Kiran Singh',
    skill: 'Beautician',
    location: 'Chandigarh',
    experience: 6,
  },
  {
    id: 12,
    name: 'Ajay Pandey',
    skill: 'Chef',
    location: 'Surat',
    experience: 10,
  },
  {
    id: 13,
    name: 'Manoj Patel',
    skill: 'Driver',
    location: 'Indore',
    experience: 3,
  },
  {
    id: 14,
    name: 'Sunita Joshi',
    skill: 'Babysitter',
    location: 'Bhopal',
    experience: 2,
  },
  {
    id: 15,
    name: 'Santosh Das',
    skill: 'Barber',
    location: 'Nagpur',
    experience: 4,
  },
  {
    id: 16,
    name: 'Nisha Gupta',
    skill: 'Teacher',
    location: 'Patna',
    experience: 7,
  },
  {
    id: 17,
    name: 'Arjun Reddy',
    skill: 'Delivery Person',
    location: 'Vijayawada',
    experience: 2,
  },
  {
    id: 18,
    name: 'Geeta Rao',
    skill: 'Photographer',
    location: 'Visakhapatnam',
    experience: 5,
  },
  {
    id: 19,
    name: 'Kartik Iyer',
    skill: 'Personal Trainer',
    location: 'Coimbatore',
    experience: 6,
  },
  {
    id: 20,
    name: 'Priya Nair',
    skill: 'Yoga Instructor',
    location: 'Thiruvananthapuram',
    experience: 4,
  },
  {
    id: 21,
    name: 'Rohit Sharma',
    skill: 'Security Guard',
    location: 'Gurgaon',
    experience: 8,
  },
  {
    id: 22,
    name: 'Jyoti Singh',
    skill: 'Receptionist',
    location: 'Noida',
    experience: 3,
  },
  {
    id: 23,
    name: 'Aman Tiwari',
    skill: 'Auto Mechanic',
    location: 'Ghaziabad',
    experience: 6,
  },
  {
    id: 24,
    name: 'Sneha Mishra',
    skill: 'Cobbler',
    location: 'Faridabad',
    experience: 4,
  },
  {
    id: 25,
    name: 'Harish Kumar',
    skill: 'Painter',
    location: 'Delhi',
    experience: 7,
  },
  {
    id: 26,
    name: 'Alok Mehta',
    skill: 'Electrician',
    location: 'Mumbai',
    experience: 5,
  },
  {
    id: 27,
    name: 'Seema Verma',
    skill: 'Seamstress',
    location: 'Jaipur',
    experience: 4,
  },
  {
    id: 28,
    name: 'Ravi Sharma',
    skill: 'AC Technician',
    location: 'Lucknow',
    experience: 6,
  },
  {
    id: 29,
    name: 'Rajni Gupta',
    skill: 'Makeup Artist',
    location: 'Pune',
    experience: 5,
  },
  {
    id: 30,
    name: 'Sahil Khan',
    skill: 'Tutor',
    location: 'Bangalore',
    experience: 8,
  },
  {
    id: 31,
    name: 'Tanvi Kulkarni',
    skill: 'Event Planner',
    location: 'Hyderabad',
    experience: 3,
  },
  {
    id: 32,
    name: 'Yash Kapoor',
    skill: 'Graphic Designer',
    location: 'Chennai',
    experience: 4,
  },
  {
    id: 33,
    name: 'Shivani Aggarwal',
    skill: 'Content Writer',
    location: 'Delhi',
    experience: 5,
  },
  {
    id: 34,
    name: 'Asha Devi',
    skill: 'Housemaid',
    location: 'Mumbai',
    experience: 10,
  },
  {
    id: 35,
    name: 'Manish Yadav',
    skill: 'Cook',
    location: 'Bangalore',
    experience: 7,
  },
  {
    id: 36,
    name: 'Rekha Chawla',
    skill: 'Laundry Worker',
    location: 'Kolkata',
    experience: 4,
  },
  {
    id: 37,
    name: 'Prakash Naik',
    skill: 'Driver',
    location: 'Nagpur',
    experience: 3,
  },
  {
    id: 38,
    name: 'Kavita Jain',
    skill: 'Data Entry Operator',
    location: 'Pune',
    experience: 6,
  },
  {
    id: 39,
    name: 'Ganesh Rao',
    skill: 'Security Guard',
    location: 'Chennai',
    experience: 8,
  },
  {
    id: 40,
    name: 'Pankaj Tiwari',
    skill: 'Car Washer',
    location: 'Ahmedabad',
    experience: 2,
  },
  {
    id: 41,
    name: 'Vandana Mishra',
    skill: 'Florist',
    location: 'Lucknow',
    experience: 3,
  },
  {
    id: 42,
    name: 'Ashok Sharma',
    skill: 'Electrician',
    location: 'Surat',
    experience: 5,
  },
  {
    id: 43,
    name: 'Ankur Singh',
    skill: 'IT Technician',
    location: 'Noida',
    experience: 4,
  },
  {
    id: 44,
    name: 'Kritika Mehra',
    skill: 'Hair Stylist',
    location: 'Jaipur',
    experience: 6,
  },
  {
    id: 45,
    name: 'Aakash Jain',
    skill: 'Fitness Coach',
    location: 'Bhopal',
    experience: 7,
  },
  {
    id: 46,
    name: 'Sonali Verma',
    skill: 'Waitress',
    location: 'Patna',
    experience: 2,
  },
  {
    id: 47,
    name: 'Vivek Gupta',
    skill: 'Bike Mechanic',
    location: 'Gurgaon',
    experience: 5,
  },
  {
    id: 48,
    name: 'Parul Saxena',
    skill: 'Event Coordinator',
    location: 'Chandigarh',
    experience: 3,
  },
  {
    id: 49,
    name: 'Ashish Yadav',
    skill: 'Civil Engineer',
    location: 'Delhi',
    experience: 10,
  },
  {
    id: 50,
    name: 'Anita Sharma',
    skill: 'Tailor',
    location: 'Lucknow',
    experience: 5,
  },
  {
    id: 51,
    name: 'Abhay Pratap',
    skill: 'Miscellaneous',
    location: 'Varanasi',
    experience: 2,
  },
];

export {
  skilledWorkers,
  // adminDashboardCardData,
  DrawerData,
  // freeResourceData,
  // adminStudyResouce,
  // toastConfig,
  // beliefsData,
  // HindiBeliefsData,
};
