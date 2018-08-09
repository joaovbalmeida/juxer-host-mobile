import { createBottomTabNavigator } from 'react-navigation';

import QueueScreen from '../screens/queue';

const PlayerTab = createBottomTabNavigator({
  Queue: QueueScreen,
}, {
  initialRouteName: 'Queue',
});

export default PlayerTab;
