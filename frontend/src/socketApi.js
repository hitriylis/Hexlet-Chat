import { io } from 'socket.io-client';

const socket = io();

export const newMessage = async (message) => {
  await socket.emit('newMessage', message);
};

export const newChannel = async (channel) => {
  const { data } = await socket.emitWithAck('newChannel', channel);
  return data.id;
};

export const removeChannel = async (channel) => {
  await socket.emit('removeChannel', channel);
};

export const renameChannel = async (channel) => {
  await socket.emit('renameChannel', channel);
};

export const listen = (event, cb) => socket.on(event, cb);
