
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import Placeholder from '../assets/images/coverPlaceholder.png';
import ArrowDown from '../assets/images/arrowDown.png';
import Pause from '../assets/images/pause.png';
import Play from '../assets/images/play.png';
import Stop from '../assets/images/stop.png';
import Forward from '../assets/images/forward.png';
import ImageButton from './imageButton';

const Player = ({
  name,
  artist,
  album,
  cover,
  owner,
  visible,
  hide,
  play,
  pause,
  stop,
  forward,
  playing,
}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <StatusBar hidden />
    <View style={styles.container}>
      <View style={styles.top}>
        <ImageButton
          onPress={hide}
          image={ArrowDown}
          height={13}
          width={20}
        />
      </View>
      <Image
        style={styles.cover}
        source={cover ? { uri: cover } : Placeholder}
      />
      <View style={styles.bottom}>
        <Text style={styles.name}>
          {name}
        </Text>
        <Text style={styles.artist}>
          {artist}
          {' - '}
          {album}
        </Text>
        <Text style={styles.owner}>
          {owner}
        </Text>
        <View style={styles.controls}>
          <ImageButton
            onPress={stop}
            image={Stop}
            height={25}
            width={25}
          />
          <ImageButton
            onPress={playing ? pause : play}
            image={playing ? Pause : Play}
            height={playing ? 42 : 46}
            width={40}
          />
          <ImageButton
            onPress={forward}
            image={Forward}
            height={25}
            width={22}
          />
        </View>
      </View>
    </View>
  </Modal>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  cover: PropTypes.string,
  owner: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  playing: PropTypes.bool.isRequired,
};

Player.defaultProps = {
  cover: Placeholder,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0E1214',
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  bottom: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrow: {
    padding: 15,
  },
  arrowImage: {
    width: 13,
    height: 8,
  },
  cover: {
    width: '80%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  name: {
    paddingTop: 5,
    paddingBottom: 2,
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  artist: {
    paddingBottom: 5,
    paddingTop: 2,
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 15,
    color: 'lightgrey',
  },
  owner: {
    paddingVertical: 5,
    fontFamily: 'Raleway',
    fontWeight: '600',
    fontSize: 15,
    color: '#ff005A',
  },
  playArrow: {
    width: 27,
    height: 27,
  },
});

export default Player;
