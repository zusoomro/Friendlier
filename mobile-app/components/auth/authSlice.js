import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from '../../env';
import axios from 'axios';
import { Alert } from 'react-native';

axios.defaults.headers.post['Content-Type'] = 'application/json'; // for POST requests

export const login = createAsyncThunk('auth/login', async (data, api) => {
  try {
    console.log(`${env.dev.apiUrl}/jwt/create/`);

    const res = await axios.post(`${env.dev.apiUrl}/jwt/create/`, data);

    return res.data;
  } catch (err) {
    Alert.alert(
      'Invalid Credentials',
      'You have entered invalid credentials.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
    );
    console.log(err);
    console.log(err.response.data);
    return api.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (data, api) => {
  console.log('register called with this data: ' + data);
  try {
    const res = await axios.post(`${env.dev.apiUrl}/users/`, data);
  } catch (err) {
    console.error('register failed with error' + err);
    return api.rejectWithValue(err.message);
  }
});

const initialState = {
  authenticated: false,
  loading: true,
  user: {},
  accessToken: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authenticated = true;
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
    },
    [login.rejectedWithValue]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
  },
});

export default authSlice.reducer;
