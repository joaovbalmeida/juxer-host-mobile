import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';

import PlayerStack from '../routes/player';
import PlayerComponent from '../components/player';
import Footer from '../components/footer';
import actions from '../store/actions';

const {
  stopEvent: stopEventAction,
  increaseIndex: increaseIndexAction,
  resetIndex: resetIndexAction,
} = actions;

class Player extends Component {
  static router = PlayerStack.router;

  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    if (props.event.queue.length) {
      this.state = {
        visible: false,
        name: props.event.queue[0].name,
        artist: props.event.queue[0].artist,
        album: props.event.queue[0].album,
        cover: props.event.queue[0].cover,
        owner: props.event.queue[0].owner,
        playing: false,
      };
    } else {
      this.state = {
        visible: false,
        name: '',
        artist: '',
        album: '',
        cover: null,
        owner: '',
        playing: false,
      };
    }

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.stop = this.stop.bind(this);
    this.forward = this.forward.bind(this);
  }

  componentDidMount() {
    Spotify.on('metadataChange', (data) => {
      if (data.state.playing) {
        this.setState({
          name: data.metadata.currentTrack.name,
          artist: data.metadata.currentTrack.artistName,
          album: data.metadata.currentTrack.albumName,
          cover: data.metadata.currentTrack.albumCoverArtURL,
          owner: this.props.event.queue[this.props.index].owner,
        });
      }
    });

    Spotify.on('trackDelivered', (data) => {
      if (this.props.index + 1 < this.props.event.queue.length) {
        this.props.increaseIndex();
        if (!data.state.playing) {
          Spotify.playURI(this.props.event.queue[this.props.index].uri, 0, 0);
        }
      }
    });

    Spotify.on('pause', () => {
      this.setState({ playing: false });
    });

    Spotify.on('play', () => {
      this.setState({ playing: true });
    });

    if (this.props.event.queue.length) {
      Spotify.playURI(this.props.event.queue[0].uri, 0, 0);
    }
  }

  componentWillUnmount() {
    this.resetPlayer();
  }

  resetPlayer() {
    this.props.resetIndex();
    this.props.stopEvent(this.props.event._id); // eslint-disable-line
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  forward() {
    this.setState({ visible: false });
  }

  stop() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <PlayerStack navigation={this.props.navigation} />
        <Footer
          name={this.state.name}
          artist={this.state.artist}
          show={this.show}
          playing={this.state.playing}
          play={() => Spotify.setPlaying(true)}
          pause={() => Spotify.setPlaying(false)}
        />
        <PlayerComponent
          name={this.state.name}
          artist={this.state.artist}
          album={this.state.album}
          owner={this.state.owner}
          visible={this.state.visible}
          hide={this.hide}
          cover={this.state.cover}
          play={() => Spotify.setPlaying(true)}
          pause={() => Spotify.setPlaying(false)}
          stop={this.stop}
          forward={this.forward}
          playing={this.state.playing}
        />
      </View>
    );
  }
}

Player.propTypes = {
  stopEvent: PropTypes.func.isRequired,
  increaseIndex: PropTypes.func.isRequired,
  resetIndex: PropTypes.func.isRequired,
  event: PropTypes.shape({
    queue: PropTypes.array,
  }).isRequired,
  index: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const PlayerConnector = connect(state => (
  {
    event: state.event.event.data,
    index: state.event.index,
  }
), dispatch => (
  {
    stopEvent: event => (
      dispatch(stopEventAction(event))
    ),
    increaseIndex: () => (
      dispatch(increaseIndexAction())
    ),
    resetIndex: () => (
      dispatch(resetIndexAction())
    ),
  }
))(Player);

export default PlayerConnector;
