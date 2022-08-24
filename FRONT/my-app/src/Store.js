import { configureStore } from '@reduxjs/toolkit';
import loggedReducer from './Anonymus/LogSlice';
import searchReducer from './components/SearchSlice';
import buyReducer from './components/BuySlice';

export const store = configureStore({
  reducer: {
    logged: loggedReducer,
    search : searchReducer,
    buy : buyReducer,

  },
});
