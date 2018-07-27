import auth from './auth';
import spotify from './spotify';
import queue from './queue';

export default {
  ...auth,
  ...spotify,
  ...queue,
};
