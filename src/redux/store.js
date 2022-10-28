import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filter.slice';
import { contactReducer } from 'redux/slise';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filtersReducer,
  },
});
