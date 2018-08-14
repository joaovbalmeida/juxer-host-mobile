const initialState = {
  userEvents: {
    isFetching: false,
    lastUpdated: '',
    data: [],
  },
  event: {
    isFetching: false,
    lastUpdated: '',
    data: {},
  },
  index: 0,
};

const sptAuth = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_USER_EVENTS':
      return Object.assign({}, state, {
        userEvents: {
          isFetching: true,
          lastUpdated: '',
          data: [],
        },
      });

    case 'REQUEST_EVENT':
      return Object.assign({}, state, {
        event: {
          isFetching: true,
          lastUpdated: '',
          data: {},
        },
      });

    case 'RECEIVE_USER_EVENTS':
      return Object.assign({}, state, {
        userEvents: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.events,
        },
      });

    case 'RECEIVE_EVENT':
      return Object.assign({}, state, {
        event: {
          isFetching: false,
          lastUpdated: Date.now(),
          data: action.event,
        },
      });

    case 'RESET_EVENT':
      return Object.assign({}, state, {
        event: {
          isFetching: false,
          lastUpdated: '',
          data: {},
        },
      });

    case 'RESET_INDEX':
      return Object.assign({}, state, {
        index: 0,
      });

    case 'INCREASE_INDEX':
      return Object.assign({}, state, {
        index: state.index + 1,
      });

    case 'RESET_USER_EVENTS':
      return Object.assign({}, state, {
        userEvents: {
          isFetching: false,
          lastUpdated: '',
          data: [],
        },
      });

    default:
      return state;
  }
};

export default sptAuth;
