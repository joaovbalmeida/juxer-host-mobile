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

export default {
  receiveSptAuth,
  requestSptAuth,
};
