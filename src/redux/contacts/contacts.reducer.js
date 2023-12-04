import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from 'redux/auth/auth.reducer';

export const fetchContact = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/contacts`);

      return data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (itemsData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/contacts`, itemsData);
      return data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/contacts/${itemId}`);

      return data;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',

  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(fetchContact.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchContact.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(addContact.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = [...state.items, payload];
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteContact.pending, (state, { payload }) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items.filter(item => item.id !== payload.id);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const contactsReducer = contactsSlice.reducer;
