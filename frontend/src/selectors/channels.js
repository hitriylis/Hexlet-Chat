import { channelsSlice, channelsAdapter } from '../slices/channelsSlice';

const { actions } = channelsSlice;

const selectors = channelsAdapter.getSelectors((state) => state.channels);

const customSelectors = {
  selectAll: selectors.selectAll,

  selectById: selectors.selectById,

  selectCurrentChannelId: (state) => state.channels.currentChannelId,

  selectCurrentChannel: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },

  selectChannelsNames: (state) => {
    const channels = selectors.selectAll(state);
    return channels.map(({ name }) => name);
  },

};

export { actions, customSelectors as selectors };
