import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';

const socket = io('http://localhost:3030/', {
  transports: ['websocket'],
  forceNew: true,
  pingInterval: 10000,
  pingTimeout: 50000,
});

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({
    storage: AsyncStorage,
  }));

export default {
  auth: feathersClient.authenticate,
  logout: feathersClient.logout,
  users: feathersClient.service('users'),
  playlists: feathersClient.service('playlists'),
  events: feathersClient.service('events'),
};
