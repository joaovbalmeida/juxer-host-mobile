
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
    <TouchableOpacity onPress={show} style={styles.button}>
      <Image style={styles.upArror} source={UpArrow} />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.labels}
      onPress={show}
    >
      <Text style={styles.playerTitle}>
        {name}
      </Text>
      <Text style={styles.playerArtist}>
        {artist}
      </Text>
    </TouchableOpacity>
    <View style={{ marginRight: 15 }}>
      <Image
        style={styles.play}
      />
    </View>
    <TouchableOpacity onPress={playing ? pause : play} style={styles.button}>
      <Image
        style={{
          alignSelf: 'center',
          height: 20,
          width: playing ? 12 : 18,
        }}
        source={playing ? Pause : Play}
      />
    </TouchableOpacity>
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
    height: 50,
    width: '100%',
    backgroundColor: '#0E1214',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labels: {
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerTitle: {
    fontFamily: 'Raleway',
    fontWeight: '600',
    color: 'white',
  },
  playerArtist: {
    color: 'white',
    fontFamily: 'Raleway',
    fontWeight: '500',
  },
  button: {
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upArrow: {
    width: 20,
    height: 20,
  },
});

export default Footer;
