/* eslint-disable react/jsx-no-constructed-context-values */

import { io } from 'socket.io-client';
import { useCallback } from 'react';
import { SocketContext } from '.';

const SocketProvider = ({ children }) => {
  const socket = io();
  const newMessage = useCallback(async (data) => {
    await socket.emit('newMessage', data);
  }, [socket]);
  return (
    <SocketContext.Provider value={{ socket, newMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
