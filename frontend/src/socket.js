import openSocket from 'socket.io-client';
import { BASE_URL } from './constants';

const socket = openSocket(BASE_URL);

export const subscribeToNotifications = (token, callback) => {
  socket.on('success', data => {
    console.log("Connected to backend", data);
  })

  socket.on(`${token} notification`, notification => {
    console.log('Received notification via socket', notification);
    callback(notification);
  });
}