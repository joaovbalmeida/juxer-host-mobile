const initialState = {
  playlists: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
};

const playlist = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_PLAYLIST':
      return Object.assign({}, state, {
        playlists: {
          isFetching: true,
          lastUpdated: '',
          data: state.playlists.data,
        },
      });

    case 'RECEIVE_PLAYLIST':
      return Object.assign({}, state, {
        playlists: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: [...state.playlists.data, action.playlist],
        },
      });

    case 'RESET_PLAYLISTS':
      return Object.assign({}, state, {
        playlists: {
          isFetching: false,
          lastUpdated: '',
          data: [],
        },
      });

    default:
      return state;
  }
};

export default playlist;
