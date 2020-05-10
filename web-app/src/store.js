import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import auth from './auth/authSlice';

const rootReducer = combineReducers({ auth });

export default configureStore({
  reducer: rootReducer,
});
