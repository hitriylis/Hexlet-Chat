/* eslint-disable react/jsx-no-constructed-context-values */

import { io } from 'socket.io-client';
import { useCallback } from 'react';
import { SocketContext } from '.';

const SocketProvider = ({ children }) => {
  const socket = io();

  const newMessage = useCallback(async (message) => {
    await socket.emit('newMessage', message);
  }, [socket]);

  const newChannel = useCallback(async (channel) => {
    await socket.emit('newChannel', channel);
  }, [socket]);

  const removeChannel = useCallback(async (id) => {
    await socket.emit('removeChannel', id);
  }, [socket]);

  const renameChannel = useCallback(async (channel) => {
    await socket.emit('renameChannel', channel);
  }, [socket]);

  return (
    <SocketContext.Provider value={{
      socket,
      newMessage,
      newChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
