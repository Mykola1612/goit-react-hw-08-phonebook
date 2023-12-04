import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: `https://connections-api.herokuapp.com/`,
});

const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/users/signup', formData);
      setToken(data.token);

      return data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/users/login', formData);
      setToken(data.token);

      return data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setToken(token);
      const { data } = await instance.post('/users/logout', token);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.data);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setToken(token);
      const { data } = await instance.get('/users/current');

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.data);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

const initialState = {
  userData: null,
  isLoading: false,
  error: null,
  token: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: 'contacts',

  initialState,

  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(registerThunk.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.authenticated = true;
        state.userData = payload.user;
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(loginThunk.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.token = payload.token;
        state.authenticated = true;
        state.userData = payload.user;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(refreshThunk.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = true;
        state.userData = payload;
      })
      .addCase(refreshThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(logoutThunk.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.authenticated = false;
      })
      .addCase(logoutThunk.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }),
});

export const authReducer = authSlice.reducer;
