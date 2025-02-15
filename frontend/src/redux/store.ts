import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice.js'
import jobSlice from './jobSlice.js'
import companySlice from './companySlice.js'
import applicationSlice from './applicationSlice.js'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }  
const rootReducer=combineReducers({
    authSlice,
    jobSlice,
    companySlice,
    applicationSlice
})
  const persistedReducer = persistReducer(persistConfig, rootReducer)
const store=configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export type RootState = ReturnType<typeof store.getState>;
export default store;