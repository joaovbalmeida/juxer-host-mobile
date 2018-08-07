import { createSwitchNavigator } from 'react-navigation';

import EventsStack from './events';
import PlayerStack from './player';

const AppStack = createSwitchNavigator({
  Events: EventsStack,
  Player: PlayerStack,
}, {
  initialRouteName: 'Events',
});

export default AppStack;
