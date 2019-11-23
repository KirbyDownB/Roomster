import openSocket from 'socket.io-client';
import { BASE_URL } from './constants';

const socket = openSocket(BASE_URL);

export const subscribeToNotifications = (callback) => {
  socket.on('notification', notifications => {
    console.log('Received notifications via socket', notifications);
    callback(null, notifications);
  })
}