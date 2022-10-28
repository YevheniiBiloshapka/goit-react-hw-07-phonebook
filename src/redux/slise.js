import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContacts, addContacts } from './operation';
import {
  messageAdd,
  messageRemove,
  messageError,
} from 'components/message/message';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.contacts = action.payload;
    },
    [fetchContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },

    [addContacts.pending]: state => {
      state.isLoading = true;
    },
    [addContacts.fulfilled]: (state, { payload }) => {
      messageAdd(payload);
      state.isLoading = false;
      state.error = null;
      state.contacts.unshift(payload);
    },

    [addContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContacts.pending]: state => {
      state.isLoading = true;
    },
    [deleteContacts.fulfilled]: (state, { payload }) => {
      const contact = state.contacts.find(c => c.id === payload);
      messageRemove(contact);
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
      state.isLoading = false;
      state.error = null;
    },
    [deleteContacts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const contactReducer = contactSlice.reducer;
