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

const requestSptPlaylists = () => (
  {
    type: 'REQUEST_SPT_PLAYLISTS',
  }
);

const receiveSptPlaylists = playlists => (
  {
    type: 'RECEIVE_SPT_PLAYLISTS',
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

const fetchSptPlaylists = () => (
  (dispatch) => {
    dispatch(requestSptPlaylists());

    return Spotify.sendRequest('v1/me/playlists', 'GET', { limit: 50 }, true)
      .then((response) => {
        dispatch(receiveSptPlaylists(response.items));
        return response;
      }, (error) => {
        dispatch(receiveSptPlaylists({}));
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
  fetchSptPlaylists,
};
