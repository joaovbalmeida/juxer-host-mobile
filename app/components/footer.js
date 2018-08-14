
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Tick from '../assets/images/tick.png';

const Footer = ({
  name,
  artist,
  show,
}) => (
  <Animated.View style={styles.container}>
    <TouchableOpacity onPress={show}>
      <View style={{ marginLeft: 15 }}>
        <Image
          style={styles.upArrow}
          source={Tick}
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={show}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.playerTitle}>
          {name}
        </Text>
        <Text style={styles.playerArtist}>
          {artist}
        </Text>
      </View>
    </TouchableOpacity>
    <View style={{ marginRight: 15 }}>
      <Image
        style={styles.playArrow}
        source={Tick}
      />
    </View>
  </Animated.View>
);

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 49,
    height: 50,
    width: '100%',
    backgroundColor: '#0E1214',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerTitle: {
    color: 'white',
  },
  playerArtist: {
    color: 'white',
  },
  upArrow: {
    width: 20,
    height: 20,
  },
  playArrow: {
    width: 27,
    height: 27,
  },
});

export default Footer;
