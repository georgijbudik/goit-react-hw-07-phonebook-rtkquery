import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { contactApi } from './contactApi';

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    filter: filterReducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactApi.middleware,
  ],
});
