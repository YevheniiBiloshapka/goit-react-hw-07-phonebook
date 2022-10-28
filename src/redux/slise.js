import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContacts, addContacts } from './operation';
import { toast } from 'react-toastify';

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
      if (
        state.contacts.some(
          contact =>
            contact.number.toLocaleLowerCase() ===
            payload.number.toLocaleLowerCase()
        )
      ) {
        state.isLoading = false;
        state.error = null;
        messageError(payload);
        return;
      } else {
        messageAdd(payload);
        state.isLoading = false;
        state.error = null;
        state.contacts.unshift(payload);
      }
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

const messageAdd = contact =>
  toast.success(`${contact.name} add from contacts `, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
const messageRemove = contact =>
  toast.success(`${contact.name} removed from contacts `, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });
const messageError = payload =>
  toast.error(
    `User ${payload.name} with such a phone number ${payload.number} already exists`,
    {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    }
  );
