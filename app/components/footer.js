
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

import ImageButton from './imageButton';
import Play from '../assets/images/miniPlay.png';
import Pause from '../assets/images/miniPause.png';
import UpArrow from '../assets/images/arrowUp.png';

const Footer = ({
  name,
  artist,
  show,
  playing,
  play,
  pause,
}) => (
  <Animated.View style={styles.container}>
    <ImageButton
      onPress={show}
      image={UpArrow}
      height={20}
      width={20}
    />
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
        style={styles.play}
      />
    </View>
    <ImageButton
      onPress={playing ? pause : play}
      image={playing ? Pause : Play}
      height={20}
      width={playing ? 12 : 18}
    />
  </Animated.View>
);

Footer.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
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
