/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.messages = action.payload.messages;
    }),
});

export default messagesSlice.reducer;
