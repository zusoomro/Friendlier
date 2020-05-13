import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import env from '../../env';

export const login = createAsyncThunk('auth/login', async (data, api) => {
  return true;
});

const initialState = {
  authenticated: false,
  loading: true,
  user: {},
  token: {},
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
    },
    [login.rejectedWithValue]: (state, action) => {
      state.loading = false;
      state.authenticated = false;
    },
  },
});

export default authSlice.reducer;
