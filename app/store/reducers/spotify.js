const initialState = {
  authenticated: false,
  token: {
    isFetching: false,
    lastUpdated: '',
    data: '',
  },
  user: {
    isFetching: false,
    lastUpdated: '',
    data: {},
  },
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_SPT_USER':
      return Object.assign({}, state, {
        user: {
          isFetching: true,
          lastUpdated: '',
          data: {},
        },
      });

    case 'RECEIVE_SPT_USER':
      return Object.assign({}, state, {
        user: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.user,
        },
      });

    case 'RESET_SPT_USER':
      return Object.assign({}, state, {
        user: {
          isFetching: false,
          lastUpdated: '',
          data: {},
        },
      });

    case 'REQUEST_SPT_AUTH':
      return Object.assign({}, state, {
        token: {
          data: '',
          isFetching: true,
          lastUpdated: '',
        },
        authenticated: false,
      });

    case 'RECEIVE_SPT_AUTH':
      return Object.assign({}, state, {
        token: {
          data: action.auth,
          isFetching: false,
          lastUpdated: Date.now(),
        },
        authenticated: true,
      });

    default:
      return state;
  }
};

export default auth;
