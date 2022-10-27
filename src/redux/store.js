import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filter.slice';
import contactReducer from 'redux/contacts-slise';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filtersReducer,
  },
});
