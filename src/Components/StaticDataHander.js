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
    category: 'Support the Mission',
    items: [
      {
        id: 0,
        title: 'Donate Now',
        image: theme.assets.payment_history,

        routeName: 'razorpay',
      },
      {
        id: 1,
        title: 'Payment History',
        image: theme.assets.payment_history,
        routeName: 'PaymentHistory',
        type: 'payment_history',
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
        routeName: 'AdminResource', // Add the route name
      },
      {
        id: 6,
        title: 'Prayer Request',
        image: theme.assets.prayer,
        routeName: 'AllPrayerReq', // Add the route name
      },
      {
        id: 9,
        title: 'What We Believe',
        image: theme.assets.contact,
        routeName: 'AdminOurBelieve', // Add the route name
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
        routeName: 'UploadBanner', // Add the route name
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
      {
        id: 4,
        title: 'ChatGPT AI',
        image: theme.assets.chatGPT,
        routeName: 'https://chatgpt.com/', // Add the route name
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

const freeResourceData = [
  {
    category: 'Spiritual Resources',
    items: [
      {
        id: 6,
        title: 'E-Books (Free)',
        image: theme.assets.ebook,
        routeName: ALL_LINKS.E_BOOKS,
      },
      {
        id: 1,
        title: 'Theology & More',
        image: theme.assets.theology,
        routeName: 'theology',
      },
      {
        id: 2,
        title: 'GotQuestion (English)',
        image: theme.assets.gotquestion,
        routeName: ALL_LINKS.GOTQUESTION_ENGLISH,
      },
      {
        id: 3,
        title: 'GotQuestion (Hindi)',
        image: theme.assets.gotquestion,
        routeName: ALL_LINKS.GOTQUESTION_HINDI,
      },
      {
        id: 0,
        title: 'Missionary Biography',
        image: theme.assets.missionary,
        routeName: ALL_LINKS.MISSIONARY_BIOGRAPHY,
      },
      {
        id: 4,
        title: 'Christian Rights',
        image: theme.assets.unity,
        routeName: ALL_LINKS.CHRISTIAN_RIGHTS,
      },
    ],
  },
];

const beliefsData = [
  {
    id: 1,
    text: 'That the Bible (66 books) is the inspired and infallible Word of God, the sole and sufficient guide for our life on earth.',
  },
  {
    id: 2,
    text: 'That there is one God eternally existent in three Persons: Father, Son and Holy Spirit.',
  },
  {
    id: 3,
    text: 'In the Deity of our Lord Jesus Christ, His virgin birth, His humanity, His perfectly sinless life, His substitutionary death as an atonement for our sins, His bodily resurrection, His ascension to the Father, and His personal return to the earth for His saints.',
  },
  {
    id: 4,
    text: 'That all human beings are dead in sin and utterly lost and that the only way their sins can be forgiven is through repentance and through faith in the death and resurrection of our Lord Jesus Christ.',
  },
  {
    id: 5,
    text: 'In the regenerating work of the Holy Spirit, whereby a person is born again to be a child of God.',
  },
  {
    id: 6,
    text: 'That justification is by faith in Christ alone, the evidence of this being good works that glorify God.',
  },
  {
    id: 7,
    text: 'In baptism in water, by immersion, after regeneration, in the Name of the Father, the Son and the Holy Spirit.',
  },
  {
    id: 8,
    text: 'In the necessity of being filled with the Holy Spirit continually in order to have power to be witnesses for Christ - by life and by word.',
  },
  {
    id: 9,
    text: 'In the resurrection of the righteous to eternal life and the resurrection of the unrighteous to eternal damnation.',
  },
];

const HindiBeliefsData = [
  {
    id: 1,
    text: 'कि बाइबल (66 पुस्तकें) परमेश्वर का प्रेरित और अचूक वचन है, जो पृथ्वी पर हमारे जीवन के लिए एकमात्र और पर्याप्त मार्गदर्शक है।',
  },
  {
    id: 2,
    text: 'कि एक ही परमेश्वर है जो तीन व्यक्तियों में अनन्तकाल से विद्यमान है: पिता, पुत्र और पवित्र आत्मा।',
  },
  {
    id: 3,
    text: 'हमारे प्रभु यीशु मसीह की दिव्यता, उनका कुँवारी से जन्म, उनकी मानवता, उनका पापरहित जीवन, हमारे पापों का प्रायश्चित करने के लिए उनका स्थानापन्न बलिदान, उनका शारीरिक पुनरुत्थान, पिता के पास उनका आरोहण और उनके संतों के लिए पृथ्वी पर उनका व्यक्तिगत आगमन।',
  },
  {
    id: 4,
    text: 'सभी मनुष्य पाप में मृत और पूरी तरह से खोए हुए हैं, और उनके पापों की क्षमा केवल हमारे प्रभु यीशु मसीह की मृत्यु और पुनरुत्थान में विश्वास और पश्चाताप के द्वारा ही संभव है।',
  },
  {
    id: 5,
    text: 'पवित्र आत्मा के पुनर्जनन कार्य में विश्वास, जिसके द्वारा एक व्यक्ति परमेश्वर का पुत्र बनकर नया जन्म पाता है।',
  },
  {
    id: 6,
    text: 'कि धार्मिकता केवल मसीह में विश्वास के द्वारा है, और इसका प्रमाण अच्छे कार्य हैं जो परमेश्वर की महिमा के लिए होते हैं।',
  },
  {
    id: 7,
    text: 'पुनर्जनन के बाद, पिता, पुत्र और पवित्र आत्मा के नाम से जल में पूर्ण रूप से बपतिस्मा लेने में विश्वास।',
  },
  {
    id: 8,
    text: 'यह आवश्यक है कि हमें लगातार पवित्र आत्मा से भरना चाहिए, ताकि हमारे जीवन और शब्दों के द्वारा मसीह के साक्षी बनने की शक्ति प्राप्त हो।',
  },
  {
    id: 9,
    text: 'धार्मिकों का अनंत जीवन के लिए और अधार्मिकों का अनंत दंड के लिए पुनरुत्थान में विश्वास।',
  },
];

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

// Study resouces samples data

const adminStudyResouce = [
  {
    id: 1,
    title: 'The Power of Prayer',
    tag: 'Hindi',
    posterUrl:
      'https://familyradio316.com/wp-content/uploads/2022/03/power-of-prayer.jpg',
    pdfUrl: 'https://example.com/pdfs/the-power-of-prayer.pdf',
    pdfName: 'The Power of Prayer.pdf',
  },
  {
    id: 2,
    title: 'Understanding Faith',
    tag: 'English',
    posterUrl:
      'https://d1zx0zj5kmre28.cloudfront.net/images/covers/understanding_faith.jpg',
    pdfUrl: '',
    pdfName: 'Understanding Faith.pdf',
  },
  {
    id: 3,
    title: 'Journey Through Psalms',
    tag: 'Marathi',
    posterUrl:
      'https://m.media-amazon.com/images/I/71onirxyEkS._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: 'https://example.com/pdfs/journey-through-psalms.pdf',
    pdfName: 'Journey Through Psalms.pdf',
  },
  {
    id: 4,
    title: 'The Ten Commandments',
    tag: 'Marathi',
    posterUrl:
      'https://spaces.filmstories.co.uk/uploads/2021/02/the-ten-commandments.jpg',
    pdfUrl: '',
    pdfName: 'The Ten Commandments.pdf',
  },
  {
    id: 5,
    title: 'Living in Grace',
    tag: 'English',
    posterUrl:
      'https://cdn.msia.org/shop/wp-content/uploads/sites/9/2008/06/3903-CD-artwork.jpg',
    pdfUrl: 'https://example.com/pdfs/living-in-grace.pdf',
    pdfName: 'Living in Grace.pdf',
  },
  {
    id: 6,
    title: 'Biblical Wisdom',
    tag: 'Hindi',
    posterUrl:
      'https://m.media-amazon.com/images/I/91I8Om24MDL._AC_UF1000,1000_QL80_.jpg',
    pdfUrl: 'https://example.com/pdfs/biblical-wisdom.pdf',
    pdfName: 'Biblical Wisdom.pdf',
  },
  {
    id: 7,
    title: 'Hope for All',
    tag: 'English',
    posterUrl: 'https://pictures.abebooks.com/isbn/9780977279357-us.jpg',
    pdfUrl: 'https://example.com/pdfs/faith-and-hope.pdf',
    pdfName: 'Faith and Hope.pdf',
  },
  {
    id: 8,
    title: 'Spiritual Growth',
    tag: 'Marathi',
    posterUrl:
      'https://joemarino.org/wp-content/uploads/2018/05/SpiritualGrowth-1-608x405.jpg',
    pdfUrl: 'https://example.com/pdfs/spiritual-growth.pdf',
    pdfName: 'Spiritual Growth.pdf',
  },
  {
    id: 9,
    title: 'God’s Love Revealed',
    tag: 'Hindi',
    posterUrl: 'https://i.ytimg.com/vi/BXy2QkBuZwY/sddefault.jpg?v=64f54773',
    pdfUrl: 'https://example.com/pdfs/gods-love-revealed.pdf',
    pdfName: 'God’s Love Revealed.pdf',
  },
  {
    id: 10,
    title: 'Foundation of faith',
    tag: 'English',
    posterUrl:
      'https://marvel-b1-cdn.bc0a.com/f00000000039764/cmsedit.cbn.com/sites/default/files/styles/image_xl_640x480/public/foundations-of-the-faith_si_0.jpg?itok=hxi_GJ-P',
    pdfUrl: 'https://example.com/pdfs/the-role-of-faith.pdf',
    pdfName: 'The Role of Faith.pdf',
  },
  {
    id: 11,
    title: 'The Wisdom of Proverbs',
    tag: 'Marathi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/the-wisdom-of-proverbs.pdf',
    pdfName: 'The Wisdom of Proverbs.pdf',
  },
  {
    id: 12,
    title: 'Grace and Forgiveness',
    tag: 'Hindi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/grace-and-forgiveness.pdf',
    pdfName: 'Grace and Forgiveness.pdf',
  },
  {
    id: 13,
    title: 'Prayer for Strength',
    tag: 'English',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/prayer-for-strength.pdf',
    pdfName: 'Prayer for Strength.pdf',
  },
  {
    id: 14,
    title: 'Understanding Salvation',
    tag: 'Marathi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/understanding-salvation.pdf',
    pdfName: 'Understanding Salvation.pdf',
  },
  {
    id: 15,
    title: 'The Gift of Grace',
    tag: 'Hindi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/the-gift-of-grace.pdf',
    pdfName: 'The Gift of Grace.pdf',
  },
  {
    id: 16,
    title: 'Living in Faith',
    tag: 'English',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/living-in-faith.pdf',
    pdfName: 'Living in Faith.pdf',
  },
  {
    id: 17,
    title: 'The Fruit of the Spirit',
    tag: 'Marathi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/the-fruit-of-the-spirit.pdf',
    pdfName: 'The Fruit of the Spirit.pdf',
  },
  {
    id: 18,
    title: 'The Essence of Worship',
    tag: 'Hindi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/the-essence-of-worship.pdf',
    pdfName: 'The Essence of Worship.pdf',
  },
  {
    id: 19,
    title: 'Overcoming Doubt',
    tag: 'English',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/overcoming-doubt.pdf',
    pdfName: 'Overcoming Doubt.pdf',
  },
  {
    id: 20,
    title: 'The Path of Righteousness',
    tag: 'Marathi',
    posterUrl: '',
    pdfUrl: 'https://example.com/pdfs/the-path-of-righteousness.pdf',
    pdfName: 'The Path of Righteousness.pdf',
  },
];

export {
  adminDashboardCardData,
  DrawerData,
  freeResourceData,
  adminStudyResouce,
  toastConfig,
  beliefsData,
  HindiBeliefsData,
};
