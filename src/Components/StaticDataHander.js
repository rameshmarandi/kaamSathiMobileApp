import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import MsgConfig from '../Config/MsgConfig';
import {getFontSize} from '../utility/responsive';
import theme from '../utility/theme';
import {VectorIcon} from './VectorIcon';
import {checkIsDarkMode, textColorHandler} from './commonHelper';

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

const adminDashboardCardData = [
  {
    category: 'User Management',
    items: [
      {
        id: 0,
        title: 'All Members',
        image: theme.assets.members,
        routeName: 'Members',
      },
      {
        id: 1,
        title: 'Admin Management',
        image: theme.assets.adminManag,
        routeName: 'AdminManagment',
      },
      {
        id: 1,
        title: 'Add New User',
        image: theme.assets.add_new_user,
        routeName: 'AddMemberForm',
      },
    ],
  },
  {
    category: 'Spiritual Resources',
    items: [
      {
        id: 3,
        title: 'Daily Verses',
        image: theme.assets.DBible,
        routeName: 'DailyVerse', // Add the route name
      },
      {
        id: 5,
        title: 'Free Resources',
        image: theme.assets.pdf,
        routeName: '', // Add the route name
      },
      {
        id: 6,
        title: 'Prayer Request',
        image: theme.assets.prayer,
        routeName: '', // Add the route name
      },
      {
        id: 9,
        title: 'What We Believe',
        image: theme.assets.contact,
        routeName: '', // Add the route name
      },
    ],
  },
  {
    category: 'Community Engagement',
    items: [
      {
        id: 2,
        title: 'Momentous Posts',
        image: theme.assets.camera,
        routeName: '', // Add the route name
      },
      {
        id: 8,
        title: 'Testimonial Wall',
        image: theme.assets.contact,
        routeName: '', // Add the route name
      },
      {
        id: 4,
        title: 'Notification Controls',
        image: theme.assets.alert,
        routeName: '', // Add the route name
      },
    ],
  },
  {
    category: 'Support and Contact',
    items: [
      {
        id: 7,
        title: 'Contact Us',
        image: theme.assets.contact,
        routeName: 'AdminContact',
      },
      {
        id: 10,
        title: 'Church Locations',
        image: theme.assets.churchLocation,
        routeName: 'ChurchMap',
      },
    ],
  },
  // {
  //   category: 'Location and Navigation',
  //   items: [

  //   ],
  // },
];

export {adminDashboardCardData, DrawerData};
