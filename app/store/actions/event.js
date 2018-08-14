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

const resetIndex = () => (
  {
    type: 'RESET_INDEX',
  }
);

const increaseIndex = () => (
  {
    type: 'INCREASE_INDEX',
  }
);

const updateEventCallback = (data) => {
  store.dispatch(receiveEvent(data));
};

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
      dispatch(receiveEvent(response));

      api.events.on('patched', (data) => {
        dispatch(receiveEvent(data));
      });

      api.events.on('updated', (data) => {
        dispatch(receiveEvent(data));
      });

      return response;
    }, (error) => {
      dispatch(receiveEvent({}));
      return error;
    });
  }
);

const fetchUserEvents = () => (
  (dispatch) => {
    dispatch(requestUserEvents());

    return api.events.find({ query: { user: store.getState().auth.user.data._id } }) // eslint-disable-line
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(receiveUserEvents(response.data));
          return response;
        }
        dispatch(receiveUserEvents([]));
        return response;
      }, (error) => {
        dispatch(receiveUserEvents([]));
        return error;
      });
  }
);

const startEvent = event => (
  (dispatch) => {
    dispatch(requestEvent());

    return api.events.patch(event, { active: true }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then((response) => {
      dispatch(receiveEvent(response));

      api.events.on('patched', updateEventCallback);

      api.events.on('updated', updateEventCallback);

      return response;
    }, (error) => {
      dispatch(requestEvent({}));
      return error;
    });
  }
);

const stopEvent = event => (
  (dispatch) => {
    dispatch(resetEvent());

    api.events.removeListener('patched', updateEventCallback);

    api.events.removeListener('updated', updateEventCallback);

    return api.events.patch(event, { active: false, queue: [] }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then(response => response, error => error);
  }
);

export default {
  fetchUserEvents,
  resetUserEvents,
  startEvent,
  resetEvent,
  stopEvent,
  createEvent,
  resetQueue,
  resetIndex,
  increaseIndex,
};
