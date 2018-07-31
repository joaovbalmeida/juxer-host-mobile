import api from '../../api';

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

const createEvent = event => (
  (dispatch) => {
    dispatch(requestEvent());

    const playlists = [...event.playlists.map((item) => {
      const playlist = {
        url: item.url,
        startDate: item.startDate,
        endDate: item.endDate,
      };
      let id = '';
      createPlaylist(playlist).then((result) => {
        id = `${result._id}`; // eslint-disable-line
      });
      console.log(id);
      return id;
    })];
    console.log(playlists);
    if (playlists.includes('')) {
      dispatch(receiveEvent('', false));
      return null;
    }
    return api.events.create({
      name: event.name,
      secret: event.secret,
      user: event.user,
      playlists,
    }).then((response) => {
      console.log(response);
      // dispatch(receiveEvent(response.accessToken, true));
      return response;
    }, (erro) => {
      console.log(erro);
      dispatch(receiveEvent('', false));
      return error;
    });
  }
);

const fetchUserEvents = user => (
  (dispatch) => {
    dispatch(requestUserEvents());

    return api.events.find({ query: { email: user } })
      .then((response) => {
        console.log(response);
        // dispatch(receiveUserEvents(response, true));
        return response;
      }, (error) => {
        dispatch(receiveUserEvents('', false));
        return error;
      });
  }
);

const fetchEvent = id => (
  (dispatch) => {
    dispatch(requestEvent());

    return api.event.find({ query: { _id: id } })
      .then((response) => {
        console.log(response);
        // dispatch(receiveEvent(response.accessToken, true));
        return response;
      }, (error) => {
        dispatch(receiveEvent('', false));
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
};
