import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from '../selectors/channels';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'messages',

  initialState,

  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },

  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const messagesToRemove = Object.values(state.entities)
        .filter((message) => message.channelId === action.payload)
        .map((message) => message.id);

      messagesAdapter.removeMany(state, messagesToRemove);
    });
  },
});

export { messageSlice, messagesAdapter };

export default messageSlice.reducer;
