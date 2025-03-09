// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Animated,
//   Image,
// } from 'react-native';
// import {
//   Camera,
//   runAsync,
//   useCameraDevice,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import {readFile} from 'react-native-fs';
// // import {FaceDetector} from 'react-native-google-mlkit';
// // import FaceDetection from '@react-native-ml-kit/face-detection';
// import {
//   GestureHandlerRootView,
//   TapGestureHandler,
// } from 'react-native-gesture-handler';
// import Reanimated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';
// import LinearGradient from 'react-native-linear-gradient';
// import {request, PERMISSIONS, check} from 'react-native-permissions';
// import {useToast} from 'react-native-toast-notifications';

// const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// const DocumentScanner = ({mode = 'document'}) => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [faces, setFaces] = useState([]);
//   const camera = useRef(null);
//   const toast = useToast();
//   const device = useCameraDevice('front');
//   const scaleAnim = useSharedValue(1);
//   const borderColor = useSharedValue('#FFD700');

//   // Camera overlay dimensions
//   const CAPTURE_WIDTH = SCREEN_WIDTH - 40;
//   const CAPTURE_HEIGHT = CAPTURE_WIDTH * 0.6;

//   useEffect(() => {
//     const checkPermissions = async () => {
//       const cameraStatus = await request(PERMISSIONS.ANDROID.CAMERA);
//       setHasPermission(cameraStatus === 'granted');

//       if (mode === 'document') {
//         await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//       }
//     };

//     checkPermissions();
//   }, []);

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{scale: scaleAnim.value}],
//     borderColor: borderColor.value,
//   }));

//   const processImage = async frame => {
//     // 1. Save frame to temporary file
//     const jpegPath = `${RNFS.TemporaryDirectoryPath}/${Date.now()}.jpg`;
//     await frame.saveToFile(jpegPath, 'jpeg', 85);

//     // 2. Get image dimensions
//     const {width, height} = await new Promise(resolve =>
//       Image.getSize(jpegPath, (w, h) => resolve({width: w, height: h})),
//     );

//     // 3. Create ML Kit compatible format
//     return {
//       path: jpegPath,
//       width,
//       height,
//       orientation: frame.orientation,
//       isMirrored: frame.isMirrored,
//       uri: `file://${jpegPath}`,
//     };
//   };

//   // const frameProcessor = useFrameProcessor(
//   //   frame => {
//   //     'worklet';
//   //     if (mode === 'face') {
//   //       runAsync(frame, async () => {
//   //         return;
//   //         const processedImage = await processImage(frame);
//   //         const detectedFaces = await FaceDetection.detect(processedImage);
//   //         if (detectedFaces.length > 0) {
//   //           borderColor.value = '#00FF00';
//   //           scaleAnim.value = withSpring(1.05);
//   //         } else {
//   //           borderColor.value = '#FFD700';
//   //           scaleAnim.value = withSpring(1);
//   //         }
//   //         setFaces(detectedFaces);
//   //       });
//   //     }
//   //   },
//   //   [mode],
//   // );

//   const captureHandler = async () => {
//     if (isProcessing) return;

//     setIsProcessing(true);
//     try {
//       const photo = await camera.current.takePhoto({
//         qualityPrioritization: 'quality',
//         skipMetadata: true,
//       });

//       const croppedImage = await cropToCaptureArea(photo.path);
//       setCapturedImage(croppedImage);

//       toast.show(mode === 'face' ? 'Face captured!' : 'Document scanned!', {
//         type: 'success',
//         placement: 'bottom',
//       });
//     } catch (error) {
//       toast.show('Capture failed. Please try again.', {
//         type: 'danger',
//         placement: 'bottom',
//       });
//     }
//     setIsProcessing(false);
//   };

//   const cropToCaptureArea = async imagePath => {
//     // Implement image cropping logic using react-native-image-crop-picker or similar
//     // Return cropped image path
//     return imagePath;
//   };

//   if (!device || !hasPermission) {
//     return (
//       <View style={styles.permissionContainer}>
//         <Text style={styles.permissionText}>
//           Camera permission required. Please enable in settings.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <Camera
//         ref={camera}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         photo={true}
//         frameProcessor={undefined}
//         // frameProcessor={mode === 'face' ? frameProcessor : undefined}
//       />

//       <LinearGradient
//         colors={[
//           'rgba(0,0,0,0.8)',
//           'transparent',
//           'transparent',
//           'rgba(0,0,0,0.8)',
//         ]}
//         style={styles.overlay}>
//         <Reanimated.View style={[styles.captureArea, animatedStyle]}>
//           {mode === 'face' && (
//             <View style={styles.faceGuide}>
//               <Text style={styles.instructionText}>
//                 Align your face within the frame
//               </Text>
//             </View>
//           )}
//         </Reanimated.View>

//         <View style={styles.bottomControls}>
//           <TapGestureHandler onActivated={captureHandler}>
//             <Reanimated.View style={styles.captureButton}>
//               {isProcessing ? (
//                 <ActivityIndicator size={24} color="white" />
//               ) : (
//                 <View style={styles.captureButtonInner} />
//               )}
//             </Reanimated.View>
//           </TapGestureHandler>

//           {capturedImage && (
//             <TouchableOpacity
//               style={styles.previewButton}
//               onPress={() => {
//                 /* Handle preview */
//               }}>
//               <Text style={styles.previewText}>View {mode}</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       </LinearGradient>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   captureArea: {
//     width: SCREEN_WIDTH - 40,
//     height: (SCREEN_WIDTH - 40) * 0.6,
//     borderWidth: 3,
//     borderRadius: 12,
//     backgroundColor: 'transparent',
//   },
//   faceGuide: {
//     position: 'absolute',
//     top: -40,
//     alignItems: 'center',
//   },
//   instructionText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   bottomControls: {
//     position: 'absolute',
//     bottom: 40,
//     alignItems: 'center',
//     width: '100%',
//   },
//   captureButton: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 3,
//     borderColor: 'white',
//   },
//   captureButtonInner: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'white',
//   },
//   previewButton: {
//     marginTop: 20,
//     padding: 12,
//     backgroundColor: 'rgba(255,215,0,0.3)',
//     borderRadius: 8,
//   },
//   previewText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   permissionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: 'black',
//   },
//   permissionText: {
//     color: 'white',
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });

// export default DocumentScanner;

import {View, Text} from 'react-native';
import React from 'react';

const DocumentScanner = () => {
  return (
    <View>
      <Text>DocumentScanner</Text>
    </View>
  );
};

export default DocumentScanner;
