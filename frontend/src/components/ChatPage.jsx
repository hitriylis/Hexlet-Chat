/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth, useSocket } from '../hooks';
import fetchData from '../slices/fetchData';
import Channels from './Channels';
import Messages from './Messages';
import { addMessage } from '../slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setError,
} from '../slices/channelsSlice';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const authHeader = auth.getAuthHeader();
  const { socket } = useSocket();

  useEffect(() => {
    dispatch(fetchData(authHeader));
  }, []);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off('newMessage');
    };
  }, []);

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    return () => {
      socket.off('newChannel');
    };
  });

  useEffect(() => {
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });
    return () => {
      socket.off('removeChannel');
    };
  }, []);

  useEffect(() => {
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
    return () => {
      socket.off('renameChannel');
    };
  }, []);

  const { error, loading } = useSelector((state) => state.channels);

  useEffect(() => {
    socket.on('connect_error', () => {
      toast.error(t('errorNetwork'));
      dispatch(setError(true));
    });
    return () => {
      socket.off('connect_error');
    };
  }, []);

  if (error) {
    auth.logOut();
    navigate('/login');
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

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
