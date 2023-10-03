import { messageSlice, messagesAdapter } from '../slices/messagesSlice';

const { actions } = messageSlice;

const selectors = messagesAdapter.getSelectors((state) => state.messages);

const customSelectors = {
  selectAll: selectors.selectAll,

  selectById: (state) => {
    const { currentChannelId } = state.channels;
    const messages = selectors.selectAll(state);
    return messages.filter(({ channelId }) => channelId === currentChannelId);
  },

};

export { actions, customSelectors as selectors };
