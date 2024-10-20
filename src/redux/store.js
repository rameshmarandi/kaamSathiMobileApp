// import {configureStore} from '@reduxjs/toolkit';
// import {persistStore, persistReducer} from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import reactotron from '../Config/ReactotronConfig';
// import rootReducer from './reducer';

// // Configuration for persisting state
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// };

// // Combine persisted reducer with root reducer
// const persistedReducer = persistReducer(
//   persistConfig,
//   rootReducer,
//   reactotron.createEnhancer(),
// );

// // Create Redux store with persisted reducer and middleware
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false, // Disable for specific state parts if needed
//     }),
//   enhancers: () => [reactotron.createEnhancer()],

//   devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
// });

// // Create persistor for handling persistence
// export const persistor = persistStore(store);

import {configureStore} from '@reduxjs/toolkit';
// import rootReducer from './features';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Reactotron from 'reactotron-react-native';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  // Reactotron.createEnhancer(),
  /* other middlewares */
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
