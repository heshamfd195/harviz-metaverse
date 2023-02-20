import { configureStore } from '@reduxjs/toolkit';
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
// import storage from 'redux-persist/lib/storage'
import storage from 'redux-persist/lib/storage/session'
import { combineReducers } from '@reduxjs/toolkit'
import appStateReducer from './slice-1'



import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import thunk from 'redux-thunk';









const persistConfig={
  key:"root",
  version:2,
  blacklist:["appState"],
  storage
}

const reducer =combineReducers({
    appState: appStateReducer,


})

const persistedReducer =persistReducer(persistConfig,reducer)

const store = configureStore({
    reducer: persistedReducer,
  

    middleware:(getDefaultMiddleware)=>(
      getDefaultMiddleware(
     {   serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }}
      )
    )

  });

  let persistor =persistStore(store);

  export type RootState = ReturnType<typeof store.getState>

  export { store, persistor };
