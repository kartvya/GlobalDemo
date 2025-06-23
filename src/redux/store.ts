import AsyncStorage from '@react-native-async-storage/async-storage';
import { AnyAction, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { ThunkDispatch } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import backendBaseApi from '../services/config/backendBaseApi';
import RootReducer from './RootReducer';
import { authAPI } from '../services/apis/auth/authApi';
import { userAPI } from '../services/apis/user/userApi';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [backendBaseApi.reducerPath],
};

const rootReducer = combineReducers({
  [backendBaseApi.reducerPath]: backendBaseApi.reducer,
  authAPI: authAPI.reducer,
  userAPI: userAPI.reducer,
  root: RootReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      warnAfter: 100,
    }).concat(
      backendBaseApi.middleware,
      authAPI.middleware,
      userAPI.middleware,
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, never, AnyAction>;

type DispatchFunc = () => AppDispatch;
setupListeners(store.dispatch);
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { persistor, store };
