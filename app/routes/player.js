import { createStackNavigator } from 'react-navigation';

import QueueScreen from '../screens/queue';

const PlayerStack = createStackNavigator({
  Queue: QueueScreen,
}, {
  initialRouteName: 'Queue',
});

export default PlayerStack;
