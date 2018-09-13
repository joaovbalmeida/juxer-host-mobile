import Spotify from 'rn-spotify-sdk';

const requestSptAuth = () => (
  {
    type: 'REQUEST_SPT_AUTH',
  }
);

const receiveSptAuth = (auth, fetching) => (
  {
    type: 'RECEIVE_SPT_AUTH',
    auth,
    fetching,
  }
);

const requestUserPlaylists = () => (
  {
    type: 'REQUEST_USER_PLAYLISTS',
  }
);

const receiveUserPlaylists = playlists => (
  {
    type: 'RECEIVE_USER_PLAYLISTS',
    playlists,
  }
);

const requestSptUser = () => (
  {
    type: 'REQUEST_SPT_USER',
  }
);

const receiveSptUser = user => (
  {
    type: 'RECEIVE_SPT_USER',
    user,
  }
);

const resetSptUser = () => (
  {
    type: 'RESET_SPT_USER',
  }
);

const getTracksPagination = (id, offset, tracks = []) => {
  const url = `v1/playlists/${id}/tracks`;
  return new Promise((resolve, reject) => Spotify.sendRequest(url, 'GET', {
    fields: 'limit,offset,total,next,previous,items(track(name,uri,available_markets,id'
    + ',album(name,images),artists))',
    offset,
  }, true)
    .then((result) => {
      tracks = [...tracks, ...result.items]; // eslint-disable-line
      if (result.next) {
        getTracksPagination(id, result.offset + result.limit, tracks).then(resolve).catch(reject);
      } else {
        resolve(tracks);
      }
    }).catch(reject));
};

const fetchPlaylistTracks = id => (
  () => Spotify.sendRequest(`v1/playlists/${id}/tracks`, 'GET', {
    fields: 'limit,offset,total,next,previous,items(track(name,uri,available_markets,id'
    + ',album(name,images),artists))',
  }, true).then((response) => {
    if (response.next) {
      return getTracksPagination(id, response.offset + response.limit)
        .then(tracks => [...tracks, ...response.items], error => error);
    }
    return response.items;
  }, error => error)
);

const fetchUserPlaylists = () => (
  (dispatch) => {
    dispatch(requestUserPlaylists());

    return Spotify.sendRequest('v1/me/playlists', 'GET', { limit: 50 }, true)
      .then((response) => {
        dispatch(receiveUserPlaylists(response.items));
        return response;
      }, (error) => {
        dispatch(receiveUserPlaylists([]));
        return error;
      });
  }
);

const fetchSptUser = () => (
  (dispatch) => {
    dispatch(requestSptUser());

    return Spotify.getMe()
      .then((response) => {
        dispatch(receiveSptUser(response));
        return response;
      }, (error) => {
        dispatch(receiveSptUser({}));
        return error;
      });
  }
);

const checkSptToken = () => (
  (dispatch) => {
    dispatch(requestSptAuth());

    return Spotify.getAuthAsync().then((response) => {
      dispatch(receiveSptAuth(response, true));
      return response;
    }, (error) => {
      dispatch(receiveSptAuth('', false));
      return error;
    });
  }
);

const sptAuth = () => (
  (dispatch) => {
    dispatch(requestSptAuth());

    return Spotify.login()
      .then((logged) => {
        if (logged) {
          return Spotify.getAuthAsync().then((response) => {
            dispatch(receiveSptAuth(response, true));
            return response;
          }, (error) => {
            dispatch(receiveSptAuth('', false));
            return error;
          });
        }
        dispatch(receiveSptAuth('', false));
        return logged;
      }).catch((error) => {
        dispatch(receiveSptAuth('', false));
        return error;
      });
  }
);

const sptLogout = () => (
  (dispatch) => {
    dispatch(requestSptAuth());

    return Spotify.logout().then((response) => {
      dispatch(receiveSptAuth('', false));
      dispatch(resetSptUser());
      return response;
    }, error => error);
  }
);

export default {
  receiveSptAuth,
  requestSptAuth,
  sptLogout,
  sptAuth,
  checkSptToken,
  fetchSptUser,
  fetchUserPlaylists,
  fetchPlaylistTracks,
};
