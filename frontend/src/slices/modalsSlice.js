/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opened: false,
  modalType: null,
  channelId: null,
};

const modalsSlice = createSlice({
  name: 'modals',

  initialState,

  reducers: {
    open: (state, { payload }) => {
      const { modalType, channelId } = payload;
      state.modalType = modalType;
      state.opened = true;
      state.channelId = channelId;
    },
    close: (state) => {
      state.modalType = null;
      state.opened = false;
    },
  },
});

export const { open, close } = modalsSlice.actions;
export default modalsSlice.reducer;
