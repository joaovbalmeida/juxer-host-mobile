import auth from './auth';
import spotify from './spotify';
import event from './event';
import playlist from './playlist';

export default {
  ...auth,
  ...spotify,
  ...event,
  ...playlist,
};
