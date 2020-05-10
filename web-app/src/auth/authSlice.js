import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  authenticated: false,
  loading: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8000/jwt/create/', data);

      console.log(res);

      return res.data;
    } catch (err) {
      rejectWithValue(err.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLogin: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.authenticated = true;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.authenticated = false;
      state.loading = false;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.authenticated = true;
    },
    [login.rejectedWithValue]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
  },
});

export const { startLogin, loginSuccess, loginFailure } = authSlice.actions;

export const register = async (data) => {
  try {
    const res = await axios.post('http://localhost:8000/users/', data);

    loginSuccess();
  } catch (err) {
    loginFailure();
  }
};

export default authSlice.reducer;
