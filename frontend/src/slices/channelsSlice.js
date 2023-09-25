/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import fetchData from './fetchData';

const initialState = {
  channels: [],
  currentChannelId: 1,
  loading: false,
  error: false,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(({ id }) => id !== payload);
      if (payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
    },
    renameChannel: (state, { payload }) => {
      state.channels = state.channels.map((channel) => {
        if (payload.id === channel.id) {
          return { ...channel, name: payload.name };
        }
        return channel;
      });
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    extraReducers: (builder) => builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.currentChannelId = action.payload.currentChannelId;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
  },
});

export const {
  setChannel,
  addChannel,
  removeChannel,
  renameChannel,
  setError,
} = channelsSlice.actions;
export default channelsSlice.reducer;
