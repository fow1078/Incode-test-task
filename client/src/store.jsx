import { configureStore } from '@reduxjs/toolkit';
import tickersControlSlice from './features/TickersControl/tickersControlSlice';
import modalSlice from './features/Modal/modalSlice';

export const store = configureStore({
  reducer: {
    ticker_control: tickersControlSlice,
    modal: modalSlice
  }
})