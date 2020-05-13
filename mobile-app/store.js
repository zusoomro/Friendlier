import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './components/auth/authSlice';

const rootReducer = combineReducers({ auth });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
