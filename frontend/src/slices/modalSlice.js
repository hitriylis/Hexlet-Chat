/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
  isOpened: false,
  targetId: null,
};

const modalSlice = createSlice({
  name: 'modals',

  initialState,

  reducers: {
    open: (state, { payload }) => {
      state.modalType = payload.type;
      state.isOpened = true;
      state.targetId = payload.targetId;
    },

    close: (state) => {
      state.modalType = null;
      state.isOpened = false;
      state.targetId = null;
    },
  },
});

export { modalSlice };

export default modalSlice.reducer;
