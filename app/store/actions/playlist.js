import { paramsForServer } from 'feathers-hooks-common';

import api from '../../api';
import store from '../index';

const requestPlaylist = () => (
  {
    type: 'REQUEST_PLAYLIST',
  }
);

const receivePlaylist = playlist => (
  {
    type: 'RECEIVE_PLAYLIST',
    playlist,
  }
);

const resetPlaylists = () => (
  {
    type: 'RESET_PLAYLISTS',
  }
);

const createPlaylist = playlist => (
  (dispatch) => {
    dispatch(requestPlaylist());

    return api.playlists.create({
      url: playlist.url,
      name: playlist.name,
      image: playlist.image,
      total: playlist.total,
      tracks: playlist.tracks,
      event: playlist.event,
    }, paramsForServer({
      user: store.getState().auth.user.data,
    })).then((response) => {
      dispatch(receivePlaylist(response));
      return response;
    }, (error) => {
      dispatch(receivePlaylist(false));
      return error;
    });
  }
);

const fetchPlaylist = playlist => (
  (dispatch) => {
    dispatch(requestPlaylist());

    return api.events.get(playlist).then((response) => {
      console.log(response);
      dispatch(receivePlaylist(response));
      return response;
    }, (error) => {
      dispatch(receivePlaylist(false));
      return error;
    }, error => error);
  }
);

export default {
  createPlaylist,
  fetchPlaylist,
  resetPlaylists,
};