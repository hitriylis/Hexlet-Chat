/* eslint-disable react/jsx-no-constructed-context-values */

import { io } from 'socket.io-client';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from '.';
import { addChannel } from '../slices/channelsSlice';

const SocketProvider = ({ children }) => {
  const socket = io();
  const dispatch = useDispatch();

  const newMessage = useCallback(async (message) => {
    await socket.emit('newMessage', message);
  }, [socket]);

  const newChannel = useCallback(async (channel) => {
    await socket.emit('newChannel', channel, ({ data }) => {
      dispatch(addChannel(data));
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, newMessage, newChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
