
import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import Tick from '../assets/images/tick.png';

const Player = ({
  name,
  artist,
  album,
  cover,
  owner,
  visible,
  hide,
}) => (
  <Modal
    animationType="slide"
    transparent={false}
    visible={visible}
  >
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={hide}
        >
          <View style={{ padding: 15 }}>
            <Image
              style={styles.upArrow}
              source={Tick}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Image
        style={{ height: 150, width: 150, alignSelf: 'center', borderRadius: 10 }}
        source={Tick}
      />
      <Text>Thunder</Text>
      <Text>Imagine Dragons</Text>
    </View>
  </Modal>
);

Player.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222222',
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

export default Player;
