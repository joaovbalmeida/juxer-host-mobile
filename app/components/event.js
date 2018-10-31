import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import ArrowRight from '../assets/images/arrowRight.png';

const Event = ({
  name,
  onPress,
}) => (
  <TouchableHighlight
    style={styles.container}
    underlayColor="#1e2326"
    onPress={onPress}
  >
    <View
      style={styles.view}
    >
      <Text style={styles.text}>
        {name}
      </Text>
      <Image source={ArrowRight} style={styles.arrow} />
    </View>
  </TouchableHighlight>
);

Event.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

Event.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  view: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    backgroundColor: '#0E1214',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: 'Raleway',
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
  arrow: {
    width: 8.6,
    height: 16,
  },
});

export default Event;
