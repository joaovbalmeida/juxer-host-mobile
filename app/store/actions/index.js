import auth from './auth';
import spotify from './spotify';
import event from './event';

export default {
  ...auth,
  ...spotify,
  ...event,
};
