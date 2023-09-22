import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from '../hooks';
import fetchData from '../slices/fetchData';
import Channels from './Channels';
import Messages from './Messages';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const authHeader = auth.getAuthHeader();

  useEffect(() => {
    dispatch(fetchData(authHeader));
  }, [authHeader, dispatch]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
