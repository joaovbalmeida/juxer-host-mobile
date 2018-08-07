import { paramsForServer } from 'feathers-hooks-common';

import api from '../../api';
import store from '../index';

const requestEvent = () => (
  {
    type: 'REQUEST_EVENT',
  }
);

const receiveEvent = event => (
  {
    type: 'RECEIVE_EVENT',
    event,
  }
);

const resetEvent = () => (
  {
    type: 'RESET_EVENT',
  }
);

const requestUserEvents = () => (
  {
    type: 'REQUEST_USER_EVENTS',
  }
);

const receiveUserEvents = events => (
  {
    type: 'RECEIVE_USER_EVENTS',
    events,
  }
);

const resetUserEvents = () => (
  {
    type: 'RESET_USER_EVENTS',
  }
);

const resetQueue = () => (
  {
    type: 'RESET_QUEUE',
  }
);

const forwardTrack = () => (
  {
    type: 'FORWARD_TRACK',
  }
);

const createEvent = event => (
  (dispatch) => {
    dispatch(requestEvent());

    return api.events.create({
      name: event.name,
      secret: event.secret,
      playlists: event.playlists,
      active: true,
    }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then((response) => {
      dispatch(receiveEvent(response, true));

      api.events.on('patched', (data) => {
        dispatch(receiveEvent(data, true));
      });

      api.events.on('updated', (data) => {
        dispatch(receiveEvent(data, true));
      });

      return response;
    }, (error) => {
      dispatch(receiveEvent('', false));
      return error;
    });
  }
);

const fetchUserEvents = () => (
  (dispatch) => {
    dispatch(requestUserEvents());

    return api.events.find({ query: { user: api.getState().auth.user.data._id } }) // eslint-disable-line
      .then((response) => {
        dispatch(receiveUserEvents(response, true));
        return response;
      }, (error) => {
        dispatch(receiveUserEvents('', false));
        return error;
      });
  }
);

const createPlaylist = playlist => (
  api.playlists.create({ ...playlist })
    .then(response => response, error => error)
);

const fetchPlaylist = id => (

  api.event.find({ query: { _id: id } })
    .then((response) => {
      console.log(response);
      return response;
    }, error => error)
);

export default {
  fetchUserEvents,
  resetUserEvents,
  fetchEvent,
  resetEvent,
  createEvent,
  resetQueue,
  forwardTrack,
};
