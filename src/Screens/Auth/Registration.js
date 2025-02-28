import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import {skilledWorkers} from '../../Components/StaticDataHander';
import SkillInput from './SkillInput';

const COLORS = {
  primary: '#FF6B35',
  secondary: '#FF1D15',
  background: '#F8F9FA',
  text: '#2D3142',
  muted: '#ADB5BD',
};

const Registration = () => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    otp: '',
    role: 'worker',
    skills: '',
    experience: '0-1',
    image: null,
  });

  const handleNext = () => step < 5 && setStep(prev => prev + 1);
  const handleBack = () => step > 1 && setStep(prev => prev - 1);

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
    }).then(image => {
      setFormData({...formData, image: {uri: image.path}});
    });
  };

  const sendOtp = () => {
    if (/^\d{10}$/.test(formData.phone)) {
      setOtpSent(true);
      Alert.alert('OTP Sent', '1234');
    } else {
      Alert.alert('Invalid Number', 'Please enter 10-digit phone number');
    }
  };

  const verifyOtp = () => {
    if (formData.otp === '1234') {
      handleNext();
    } else {
      Alert.alert('Wrong OTP', 'Please enter correct OTP');
    }
  };
  // Update skills handling
  const handleSkillsChange = newSkills => {
    setFormData({...formData, skills: newSkills});
  };

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      {[1, 2, 3, 4, 5].map(num => (
        <React.Fragment key={num}>
          <LinearGradient
            colors={
              num <= step
                ? [COLORS.primary, COLORS.secondary]
                : ['#E9ECEF', '#E9ECEF']
            }
            style={styles.progressCircle}>
            <Text style={styles.progressText}>{num}</Text>
          </LinearGradient>
          {num !== 5 && (
            <LinearGradient
              colors={
                num < step
                  ? [COLORS.primary, COLORS.secondary]
                  : ['#E9ECEF', '#E9ECEF']
              }
              style={styles.progressLine}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ProgressBar />

        {step === 1 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Welcome to Kaamsathi! 👋</Text>
            <Text style={styles.subHeader}>
              Enter your mobile number to begin your journey
            </Text>

            <View style={styles.phoneContainer}>
              <View style={styles.countryCode}>
                <Image
                  source={{uri: 'https://flagcdn.com/in.svg'}}
                  style={styles.flag}
                />
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter 10-digit number"
                placeholderTextColor={COLORS.muted}
                keyboardType="phone-pad"
                maxLength={10}
                value={formData.phone}
                onChangeText={text => setFormData({...formData, phone: text})}
              />
            </View>

            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.primaryButton}>
              <TouchableOpacity onPress={sendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            </LinearGradient>

            {otpSent && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter OTP"
                  placeholderTextColor={COLORS.muted}
                  keyboardType="numeric"
                  value={formData.otp}
                  onChangeText={text => setFormData({...formData, otp: text})}
                />
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={verifyOtp}>
                  <Text style={[styles.buttonText, {color: COLORS.primary}]}>
                    Verify OTP
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Create Your Profile 🎨</Text>
            <Text style={styles.subHeader}>Add your photo and full name</Text>

            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={handleImageUpload}>
              {formData.image ? (
                <Image source={formData.image} style={styles.avatar} />
              ) : (
                <>
                  <Icon name="camera" size={32} color={COLORS.muted} />
                  <Text style={styles.avatarText}>Add Photo</Text>
                </>
              )}
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.muted}
              value={formData.name}
              onChangeText={text => setFormData({...formData, name: text})}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleBack}>
                <Text style={[styles.buttonText, {color: COLORS.primary}]}>
                  Back
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.primaryButton}>
                <TouchableOpacity onPress={handleNext}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Professional Details 💼</Text>
            <Text style={styles.subHeader}>
              Help us understand your expertise
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Your Role</Text>
              <View style={[styles.pickerContainer, styles.elevated]}>
                <Picker
                  selectedValue={formData.role}
                  onValueChange={value =>
                    setFormData({...formData, role: value})
                  }>
                  <Picker.Item label="Worker" value="worker" />
                  <Picker.Item label="Supervisor" value="supervisor" />
                  <Picker.Item label="Contractor" value="contractor" />
                </Picker>
              </View>
            </View>

            {/* <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Skills</Text>
              <TextInput
                style={[styles.input, styles.elevated]}
                placeholder="e.g., Plumbing, Electrical Work"
                placeholderTextColor={COLORS.muted}
                value={formData.skills}
                onChangeText={text => setFormData({...formData, skills: text})}
              />
            </View> */}
            {/* 
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Skills</Text>
              <SkillInput
                selectedSkills={formData.skills}
                setSelectedSkills={skills => setFormData({...formData, skills})}
                skilledWorkers={skilledWorkers}
              />
            </View> */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Primary Skills</Text>
              <SkillInput
                selectedSkills={formData.skills}
                setSelectedSkills={handleSkillsChange}
                skilledWorkers={skilledWorkers}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Experience</Text>
              <View style={[styles.pickerContainer, styles.elevated]}>
                <Picker
                  selectedValue={formData.experience}
                  onValueChange={value =>
                    setFormData({...formData, experience: value})
                  }>
                  <Picker.Item label="0-1 years" value="0-1" />
                  <Picker.Item label="1-3 years" value="1-3" />
                  <Picker.Item label="3-5 years" value="3-5" />
                  <Picker.Item label="5+ years" value="5+" />
                </Picker>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleBack}>
                <Text style={[styles.buttonText, {color: COLORS.primary}]}>
                  Back
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.primaryButton}>
                <TouchableOpacity onPress={handleNext}>
                  <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}

        {step === 4 && (
          <View style={styles.stepContainer}>
            <Text style={styles.header}>Review & Submit ✅</Text>
            <Text style={styles.subHeader}>
              Verify your information before submitting
            </Text>

            <View style={styles.reviewCard}>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Name:</Text>
                <Text style={styles.reviewValue}>{formData.name}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Phone:</Text>
                <Text style={styles.reviewValue}>+91 {formData.phone}</Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Role:</Text>
                <Text style={styles.reviewValue}>
                  {formData.role.charAt(0).toUpperCase() +
                    formData.role.slice(1)}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Skills:</Text>
                <Text style={styles.reviewValue}>
                  {' '}
                  {formData.skills.join(', ')}
                </Text>
              </View>
              <View style={styles.reviewRow}>
                <Text style={styles.reviewLabel}>Experience:</Text>
                <Text style={styles.reviewValue}>
                  {formData.experience} years
                </Text>
              </View>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleBack}>
                <Text style={[styles.buttonText, {color: COLORS.primary}]}>
                  Back
                </Text>
              </TouchableOpacity>
              <LinearGradient
                colors={[COLORS.primary, COLORS.secondary]}
                style={styles.primaryButton}>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert('Success!', 'Registration Completed')
                  }>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    padding: 25,
    paddingTop: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressLine: {
    width: 50,
    height: 4,
    borderRadius: 2,
  },
  stepContainer: {
    marginBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subHeader: {
    fontSize: 16,
    color: COLORS.muted,
    marginBottom: 40,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    borderRightWidth: 1,
    borderColor: '#E9ECEF',
  },
  flag: {
    width: 24,
    height: 18,
    marginRight: 8,
    borderRadius: 2,
  },
  countryCodeText: {
    fontSize: 16,
    color: COLORS.text,
  },
  phoneInput: {
    flex: 1,
    paddingLeft: 15,
    fontSize: 16,
    color: COLORS.text,
    fontFamily: 'Inter-Regular',
  },
  primaryButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E9ECEF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  avatarText: {
    color: COLORS.muted,
    marginTop: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
    marginVertical: 10,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 8,
    fontFamily: 'Inter-Medium',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  elevated: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 15,
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  reviewLabel: {
    color: COLORS.muted,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  reviewValue: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    maxWidth: '60%',
    textAlign: 'right',
  },
});

export default Registration;

// import React, {useState, useMemo} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import {skilledWorkers} from '../../Components/StaticDataHander';

// const Registration = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   // Get unique skills
//   const uniqueSkills = useMemo(() => {
//     const skills = skilledWorkers.map(worker => worker.skill);
//     return [...new Set(skills)];
//   }, []);

//   // Filter suggestions
//   const filteredSuggestions = useMemo(() => {
//     if (!inputValue) return [];
//     return uniqueSkills.filter(skill =>
//       skill.toLowerCase().includes(inputValue.toLowerCase()),
//     );
//   }, [inputValue, uniqueSkills]);

//   const handleSkillSelect = skill => {
//     if (!selectedSkills.includes(skill)) {
//       setSelectedSkills([...selectedSkills, skill]);
//     }
//     setInputValue('');
//     setShowSuggestions(true);
//   };

//   const removeSkill = skillToRemove => {
//     setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         <ScrollView
//           horizontal={false} // Wraps content properly
//           contentContainerStyle={styles.selectedSkillsContainer}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.skillWrapper}>
//             {selectedSkills.map(skill => (
//               <View key={skill} style={styles.skillPill}>
//                 <Text style={styles.skillText}>{skill}</Text>
//                 <TouchableOpacity
//                   onPress={() => removeSkill(skill)}
//                   style={styles.removeButton}>
//                   <Text style={styles.removeText}>×</Text>
//                 </TouchableOpacity>
//               </View>
//             ))}
//             <TextInput
//               style={[
//                 styles.input,
//                 {
//                   width: selectedSkills.length ? 100 : '100%', // Adjust input width dynamically
//                 },
//               ]}
//               value={inputValue}
//               onChangeText={text => {
//                 setInputValue(text);
//                 setShowSuggestions(true);
//               }}
//               placeholder={selectedSkills.length ? '' : 'Type a skill...'} // Hide placeholder if skills exist
//               onFocus={() => setShowSuggestions(true)}
//             />
//           </View>
//         </ScrollView>
//       </View>

//       {showSuggestions && filteredSuggestions.length > 0 && (
//         <View style={styles.suggestionsContainer}>
//           <FlatList
//             data={filteredSuggestions}
//             keyExtractor={item => item}
//             renderItem={({item}) => (
//               <TouchableOpacity
//                 style={styles.suggestionItem}
//                 onPress={() => handleSkillSelect(item)}>
//                 <Text style={styles.suggestionText}>{item}</Text>
//               </TouchableOpacity>
//             )}
//             keyboardShouldPersistTaps="handled"
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     paddingHorizontal: 16,
//     marginVertical: 8,
//   },
//   inputContainer: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     minHeight: 50,
//     padding: 8,
//   },
//   selectedSkillsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//   },
//   skillWrapper: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//   },
//   skillPill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#e1ecf4',
//     borderRadius: 15,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     margin: 4,
//   },
//   skillText: {
//     fontSize: 14,
//     color: '#1a73e8',
//   },
//   removeButton: {
//     marginLeft: 8,
//   },
//   removeText: {
//     color: '#666',
//     fontSize: 16,
//   },
//   input: {
//     fontSize: 16,
//     padding: 8,
//     margin: 4,
//   },
//   suggestionsContainer: {
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     maxHeight: 200,
//   },
//   suggestionItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   suggestionText: {
//     fontSize: 16,
//   },
// });

// export default Registration;
