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
