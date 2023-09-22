/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  addChannel: (state, { payload }) => {
    state.channels.push(payload);
    state.currentChannelId = payload.id;
  },
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    }),
});

export const { setChannel, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
