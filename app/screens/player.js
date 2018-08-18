import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';

import PlayerStack from '../routes/player';
import PlayerComponent from '../components/player';
import Footer from '../components/footer';
import actions from '../store/actions';

const {
  increaseIndex: increaseIndexAction,
  pauseEvent: pauseEventAction,
  clearEvent: clearEventAction,
} = actions;

class Player extends Component {
  static router = PlayerStack.router;

  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: '',
      artist: '',
      album: '',
      cover: null,
      owner: '',
      playing: false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.stop = this.stop.bind(this);
    this.play = this.play.bind(this);
    this.clear = this.clear.bind(this);
    this.pause = this.pause.bind(this);
    this.forward = this.forward.bind(this);
  }

  componentDidMount() {
    const { queue, index } = this.props.event;

    Spotify.on('metadataChange', (data) => {
      if (data.metadata.currentTrack) {
        this.setState({
          name: data.metadata.currentTrack.name,
          artist: data.metadata.currentTrack.artistName,
          album: data.metadata.currentTrack.albumName,
          cover: data.metadata.currentTrack.albumCoverArtURL,
          owner: queue.length >= index + 1 ? queue[index].owner : '',
        });
      }
    });

    Spotify.on('trackDelivered', () => {
      if (index + 1 < queue.length) {
        this.skipTrack();
      } else if (index + 1 === queue.length) {
        this.props.increaseIndex(this.props.event._id, index + 1); // eslint-disable-line
      }
    });

    Spotify.on('pause', () => {
      this.setState({ playing: false });
    });

    Spotify.on('play', () => {
      this.setState({ playing: true });
    });

    if (queue.length >= index + 1) {
      Spotify.playURI(queue[index].uri, 0, 0);
    }
  }

  componentWillUnmount() {
    Spotify.setPlaying(false);
    this.props.pauseEvent(this.props.event._id); // eslint-disable-line
  }

  componentWillReceiveProps(nextProps) {
    const { queue, index } = nextProps.event;
    if (queue) {
      if ((queue.length >= index + 1) && !this.state.playing) {
        Spotify.playURI(queue[index].uri, 0, 0);
      }
    }
  }

  skipTrack() {
    const { queue, index, _id } = this.props.event;
    this.props.increaseIndex(_id, index + 1)
      .then(() => {
        Spotify.playURI(queue[index].uri, 0, 0);
      });
  }

  forward() {
    if (this.props.event.index + 1 < this.props.event.queue.length) {
      this.skipTrack();
    }
  }

  play() {
    const { queue, index } = this.props.event;
    if (queue.length >= index + 1) Spotify.setPlaying(true);
  }

  pause() {
    const { queue, index } = this.props.event;
    if (queue.length >= index + 1) Spotify.setPlaying(false);
  }

  stop() {
    Alert.alert(
      'Sair do Evento?',
      'Tem certeza que deseja parar o evento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            Spotify.setPlaying(false);
            this.props.pauseEvent(this.props.event._id) // eslint-disable-line
              .then(() => this.props.navigation.navigate('Events'));
          },
        },
      ],
    );
  }

  clear() {
    Spotify.setPlaying(false);
    this.props.clearEvent(this.props.event._id); // eslint-disable-line
    this.setState({
      visible: false,
      name: '',
      artist: '',
      album: '',
      cover: null,
      owner: '',
      playing: false,
    });
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <PlayerStack
          navigation={this.props.navigation}
          screenProps={{ clear: this.clear }}
        />
        <Footer
          name={this.state.name}
          artist={this.state.artist}
          show={this.show}
          playing={this.state.playing}
          play={this.play}
          pause={this.pause}
        />
        <PlayerComponent
          name={this.state.name}
          artist={this.state.artist}
          album={this.state.album}
          owner={this.state.owner}
          visible={this.state.visible}
          hide={this.hide}
          cover={this.state.cover}
          play={this.play}
          pause={this.pause}
          stop={this.stop}
          forward={this.forward}
          playing={this.state.playing}
        />
      </View>
    );
  }
}

Player.propTypes = {
  clearEvent: PropTypes.func.isRequired,
  increaseIndex: PropTypes.func.isRequired,
  pauseEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    queue: PropTypes.array,
    index: PropTypes.number,
  }).isRequired,
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
  }
), dispatch => (
  {
    pauseEvent: event => (
      dispatch(pauseEventAction(event))
    ),
    increaseIndex: (event, index) => (
      dispatch(increaseIndexAction(event, index))
    ),
    clearEvent: event => (
      dispatch(clearEventAction(event))
    ),
  }
))(Player);

export default PlayerConnector;
