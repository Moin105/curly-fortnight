// Import necessary dependencies
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk"; 
// Your reducer
import userAuthReducer from '../Slices/authSlice';
 

// Configuration for persisting the userAuth slice
const persistConfig = {
  key: 'root', // Change this to a unique key
  storage,
};

// Create a persisted reducer
const persistedUserAuthReducer = persistReducer(persistConfig, userAuthReducer);

// Create the Redux store
const store = configureStore({
  reducer: {
    userAuth: persistedUserAuthReducer,
  },
  middleware: [thunk],
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
