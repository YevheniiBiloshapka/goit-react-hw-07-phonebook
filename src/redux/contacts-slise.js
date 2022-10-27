import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const contactReducer = createSlice({
  name: 'contact',
  initialState: { contacts: [] },
  reducers: {
    addContact: (state, { payload }) => {
      if (
        state.contacts.some(
          contact =>
            contact.number.toLocaleLowerCase() ===
            payload.number.toLocaleLowerCase()
        )
      ) {
        messageError(payload);
      } else {
        messageAdd(payload);
        state.contacts.push(payload);
      }
    },
    deleteContact: (state, { payload }) => {
      const contact = state.contacts.find(c => c.id === payload);
      messageRemove(contact);
      state.contacts = state.contacts.filter(contact => contact.id !== payload);
    },
  },
});

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
  toast.error(`${payload.name} is already in contact`, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });

export const { addContact, deleteContact } = contactReducer.actions;
export default contactReducer.reducer;
