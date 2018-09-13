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

      api.events.on('patched', updateEventCallback);

      api.events.on('updated', updateEventCallback);

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
      }, error => error);
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
      dispatch(receiveEvent({}));
      return error;
    });
  }
);

const clearEvent = event => (
  () => (
    api.events.patch(event, { queue: [], index: 0 }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then(response => response, error => error)
  )
);

const pauseEvent = event => (
  (dispatch) => {
    dispatch(resetEvent());

    api.events.removeListener('patched', updateEventCallback);

    api.events.removeListener('updated', updateEventCallback);

    return api.events.patch(event, { active: false }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then(response => response, error => error);
  }
);

const increaseIndex = (event, index) => (
  () => (
    api.events.patch(event, { index }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then(response => response, error => error)
  )
);

export default {
  fetchUserEvents,
  resetUserEvents,
  startEvent,
  resetEvent,
  clearEvent,
  createEvent,
  resetQueue,
  increaseIndex,
  pauseEvent,
};
