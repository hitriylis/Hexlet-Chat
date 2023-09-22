/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  modalType: null,
};

const modalsSlice = createSlice({
  name: 'modals',

  initialState,

  reducers: {
    open: (state, { payload }) => {
      state.modalType = payload;
      state.opened = true;
    },
    close: (state) => {
      state.modalType = null;
      state.opened = false;
    },
  },
});

export const { open, close } = modalsSlice.actions;
export default modalsSlice.reducer;
