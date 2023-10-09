import { useSelector } from 'react-redux';

import ChannelsBox from './Channels/ChannelsBox';
import MessagesBox from './Messages/MessagesBox';
import ErrorPage from '../Errors/ErrorPage';
import LoadingSpinner from './LoadingSpinner';
import { selectors as channelsSelectors } from '../../selectors/channels';

const statuses = {
  loading: 'loading',
  loaded: 'loaded',
  loadError: 'loadError',
};

const ChatBox = () => {
  const loadingStatus = useSelector(channelsSelectors.selectLoadingStatus);

  switch (loadingStatus) {
    case statuses.loaded:
      return (
        <>
          <ChannelsBox />
          <MessagesBox />
        </>
      );

    case statuses.loadError:
      return <ErrorPage />;

    default:
      return <LoadingSpinner />;
  }
};

export default ChatBox;
