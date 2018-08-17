
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

import Placeholder from '../assets/images/coverPlaceholder.png';
import ArrowDown from '../assets/images/arrowDown.png';
import Pause from '../assets/images/pause.png';
import Play from '../assets/images/play.png';
import Stop from '../assets/images/stop.png';
import Forward from '../assets/images/forward.png';

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
    <ImageBackground
      style={styles.container}
      blurRadius={10}
      source={cover ? { uri: cover } : null}
      resizeMode="cover"
      opacity={0.1}
    >
      <View style={styles.top}>
        <TouchableOpacity
          onPress={hide}
          style={styles.arrow}
        >
          <Image style={styles.arrowImage} source={ArrowDown} />
        </TouchableOpacity>
      </View>
      <Image
        style={styles.cover}
        source={cover ? { uri: cover } : Placeholder}
      />
      <View style={styles.bottom}>
        <View style={styles.labels}>
          <Text style={styles.name}>
            {name}
          </Text>
          <Text style={styles.artist}>
            {artist}
            {' - '}
            {album}
          </Text>
        </View>
        <Text style={styles.owner}>
          {owner}
        </Text>
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={stop}
            style={styles.buttons}
          >
            <Image style={styles.stop} source={Stop} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={playing ? pause : play}
            style={styles.playPause}
          >
            <Image
              style={{
                alignSelf: 'center',
                width: playing ? 40 : 36.5,
                height: 42,
              }}
              source={playing ? Pause : Play}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={forward}
            style={styles.buttons}
          >
            <Image style={styles.forward} source={Forward} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  bottom: {
    flex: 5,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cover: {
    flex: 5,
    aspectRatio: 1,
    alignSelf: 'center',
  },
  labels: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttons: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPause: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stop: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  forward: {
    height: 25,
    width: 22,
    alignSelf: 'center',
  },
  arrow: {
    padding: 15,
  },
  arrowImage: {
    width: 20,
    height: 13,
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
    fontWeight: '700',
    fontSize: 15,
    color: '#ff005A',
  },
  playArrow: {
    width: 27,
    height: 27,
  },
});

export default Player;
