import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';

const SkillInput = ({selectedSkills, setSelectedSkills, skilledWorkers}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Get unique skills
  const uniqueSkills = useMemo(() => {
    const skills = skilledWorkers.map(worker => worker.skill);
    return [...new Set(skills)];
  }, [skilledWorkers]);

  // Filter suggestions
  const filteredSuggestions = useMemo(() => {
    if (!inputValue) return [];
    return uniqueSkills.filter(skill =>
      skill.toLowerCase().includes(inputValue.toLowerCase()),
    );
  }, [inputValue, uniqueSkills]);

  const handleSkillSelect = skill => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setInputValue('');
    setShowSuggestions(true);
  };

  const removeSkill = skillToRemove => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  console.log('selectedSkills_comp', selectedSkills);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.selectedSkillsContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.skillWrapper}>
            {Array.isArray(selectedSkills) &&
              selectedSkills.length > 0 &&
              selectedSkills.map(skill => (
                <View key={skill} style={styles.skillPill}>
                  <Text style={styles.skillText}>{skill}</Text>
                  <TouchableOpacity
                    onPress={() => removeSkill(skill)}
                    style={styles.removeButton}>
                    <Text style={styles.removeText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            <TextInput
              style={[
                styles.input,
                {width: selectedSkills.length ? 100 : '100%'},
              ]}
              value={inputValue}
              onChangeText={text => {
                setInputValue(text);
                setShowSuggestions(true);
              }}
              placeholder={selectedSkills.length ? '' : 'Type a skill...'}
              onFocus={() => setShowSuggestions(true)}
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
                onPress={() => handleSkillSelect(item)}>
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

// Keep the same styles as in your working code
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 50,
    padding: 8,
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
    backgroundColor: '#e1ecf4',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  skillText: {
    fontSize: 14,
    color: '#1a73e8',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeText: {
    color: '#666',
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    padding: 8,
    margin: 4,
  },
  suggestionsContainer: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 200,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default SkillInput;
