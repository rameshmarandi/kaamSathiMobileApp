// import React, {useState, memo} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {useTranslation} from 'react-i18next';
// import {VectorIcon} from '../Components/VectorIcon';
// import {MultiLngModal} from '../Components/ModalsComponent';
// import {languageOptions} from '../../i18n';
// import {getFontSize, getResWidth} from '../utility/responsive';
// import theme from '../utility/theme';

// const LanguageSelector = () => {
//   const {i18n} = useTranslation();
//   const [isModalVisible, setModalVisible] = useState(false);

//   const openModal = () => setModalVisible(true);
//   const closeModal = () => setModalVisible(false);

//   const selectedLanguage =
//     languageOptions.find(lang => lang.code === i18n.language)?.label ||
//     'Select';

//   return (
//     <View>
//       {/* Modal */}
//       <MultiLngModal
//         isModalVisible={isModalVisible}
//         onBackdropPress={closeModal}
//       />

//       {/* Touchable to open modal */}
//       <TouchableOpacity onPress={openModal} style={styles.languageSelector}>
//         <VectorIcon
//           type="MaterialIcons"
//           name="language"
//           size={getFontSize(3)}
//           color={theme.color.darkText}
//         />
//         <Text style={styles.languageText}>{selectedLanguage}</Text>
//         <VectorIcon
//           type="MaterialCommunityIcons"
//           name="chevron-down"
//           size={getFontSize(3)}
//           color={theme.color.darkText}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   languageSelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: theme.color.border,
//     paddingHorizontal: getResWidth(1.3),
//     paddingVertical: getResWidth(0.8),
//     borderRadius: getResWidth(1.5),
//     backgroundColor: theme.color.background,
//     justifyContent: 'space-between',
//   },
//   languageText: {
//     fontSize: getFontSize(1.5),
//     fontFamily: theme.font.semiBold,
//     color: theme.color.darkText,
//     paddingHorizontal: getResWidth(1),
//   },
// });

// export default memo(LanguageSelector);

import React, {useState, memo, forwardRef, useImperativeHandle} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {VectorIcon} from '../Components/VectorIcon';
import {MultiLngModal} from '../Components/ModalsComponent';
import {languageOptions} from '../../i18n';
import {getFontSize, getResWidth} from '../utility/responsive';
import theme from '../utility/theme';

const LanguageSelector = forwardRef((props, ref) => {
  const {isOnlyIcon} = props;
  const {i18n} = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);

  // Expose openModal function to parent component
  useImperativeHandle(ref, () => ({
    openModal: () => setModalVisible(true),
  }));

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const selectedLanguage =
    languageOptions.find(lang => lang.code === i18n.language)?.label ||
    'Select';

  return (
    <View>
      {/* Modal */}
      <MultiLngModal
        isModalVisible={isModalVisible}
        onBackdropPress={closeModal}
      />

      {!isOnlyIcon && (
        <>
          {/* Touchable to open modal */}
          <TouchableOpacity onPress={openModal} style={styles.languageSelector}>
            <VectorIcon
              type="Ionicons"
              name="language"
              size={getFontSize(3)}
              color={theme.color.darkText}
            />
            <Text style={styles.languageText}>{selectedLanguage}</Text>
            <VectorIcon
              type="MaterialCommunityIcons"
              name="chevron-down"
              size={getFontSize(2)}
              color={theme.color.darkText}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.color.border,
    paddingHorizontal: getResWidth(1.3),
    paddingVertical: getResWidth(0.8),
    borderRadius: getResWidth(1.5),
    backgroundColor: theme.color.background,
    justifyContent: 'space-between',
  },
  languageText: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.semiBold,
    color: theme.color.darkText,
    paddingHorizontal: getResWidth(1),
  },
});

export default memo(LanguageSelector);
