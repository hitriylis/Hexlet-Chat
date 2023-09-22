/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    }),
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
