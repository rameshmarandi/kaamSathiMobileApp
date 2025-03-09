import React, {useMemo, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import theme from '../../utility/theme';
import {getFontSize, getResHeight, getResWidth} from '../../utility/responsive';
import {VectorIcon} from '../../Components/VectorIcon';

const SkillInput = ({
  selectedSkills = [],
  setSelectedSkills,
  skilledWorkers = [],
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Get unique skills from skilledWorkers
  const uniqueSkills = useMemo(() => {
    if (!Array.isArray(skilledWorkers)) return [];
    const validSkills = skilledWorkers
      .map(worker => worker?.skill)
      .filter(Boolean);
    return [...new Set(validSkills)];
  }, [skilledWorkers]);

  // Filter suggestions based on input
  const filteredSuggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    return uniqueSkills.filter(skill =>
      skill.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, uniqueSkills]);

  const handleSkillSelect = skill => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills(prev => [...prev, skill]);
    }
    setInputValue('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const removeSkill = skillToRemove => {
    setSelectedSkills(prev => prev.filter(skill => skill !== skillToRemove));
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {
            borderRadius:
              selectedSkills.length > 1 ? getResHeight(2) : getResHeight(5),
          },
        ]}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.selectedSkillsContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.skillWrapper}>
            {selectedSkills.map(skill => (
              <View key={skill} style={styles.skillPill}>
                <Text style={styles.skillText}>{skill}</Text>
                <TouchableOpacity
                  onPress={() => removeSkill(skill)}
                  style={styles.removeButton}>
                  <VectorIcon
                    type="Ionicons"
                    name="close"
                    size={getFontSize(3)}
                    color={'grey'}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <TextInput
              ref={inputRef}
              style={[
                styles.input,
                {width: selectedSkills.length > 0 ? 100 : '100%'},
              ]}
              cursorColor={theme.color.secondary}
              selectionColor={theme.color.secondary}
              value={inputValue}
              onChangeText={text => {
                if (selectedSkills.length == 5) {
                  return Alert.alert("You can't add more than 5 skills");
                }
                setInputValue(text);
                setShowSuggestions(true);
              }}
              placeholder={
                selectedSkills.length > 0 ? '' : 'Type your skills...'
              }
              placeholderTextColor={theme.color.outlineColor}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                setTimeout(() => setShowSuggestions(false), 200);
              }}
            />
          </View>
        </ScrollView>
      </View>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPressIn={() => setIsFocused(true)}
                onPress={() => handleSkillSelect(item)}
                activeOpacity={0.7}>
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    marginVertical: getResHeight(1),
    zIndex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: theme.color.outlineColor,
    backgroundColor: 'white',
    minHeight: getResHeight(2),
    paddingHorizontal: '3%',

    overflow: 'hidden',
  },
  selectedSkillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  skillWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  skillPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.color.dimGrey,
    borderRadius: getResHeight(2),
    paddingVertical: getResHeight(0.5),
    paddingHorizontal: getResWidth(2.5),
    margin: getResHeight(0.5),
  },
  skillText: {
    fontSize: getFontSize(1.5),
    fontFamily: theme.font.medium,
    color: theme.color.dimBlack,
  },
  removeButton: {
    marginLeft: '1.4%',
  },
  removeText: {
    color: '#666',
    fontSize: getFontSize(1.5),
  },
  input: {
    backgroundColor: 'white',
    color: theme.color.charcolBlack,
  },
  suggestionsContainer: {
    position: 'absolute',
    width: '100%',
    top: '100%',

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: getResHeight(2),
    maxHeight: getResHeight(30),
    backgroundColor: theme.color.white,
    zIndex: 9999999,
  },
  suggestionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: getResHeight(1.5),
  },
  suggestionText: {
    fontSize: getFontSize(1.6),
    fontFamily: theme.font.medium,
    color: theme.color.dimBlack,
  },
});

export default SkillInput;
