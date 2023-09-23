/* eslint-disable no-param-reassign */
/* eslint-disable functional/no-expression-statements */

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
  removeChannel: (state, { payload }) => {
    state.channels = state.channels.filter(({ id }) => id !== payload);
  },
  renameChannel: (state, { payload }) => {
    state.channels = state.channels.map((channel) => {
      if (payload.id === channel.id) {
        return { ...channel, name: payload.name };
      }
      return channel;
    });
  },
  extraReducers: (builder) => builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.channels = action.payload.channels;
      state.currentChannelId = action.payload.currentChannelId;
    }),
});

export const {
  setChannel,
  addChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
