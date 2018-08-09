import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spotify from 'rn-spotify-sdk';

import PlayerTab from '../routes/player';
import PlayerComponent from '../components/player';
import Footer from '../components/footer';
import actions from '../store/actions';

const {
  stopEvent: stopEventAction,
} = actions;

class Player extends Component {
  static router = PlayerTab.router;

  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
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
        <PlayerTab navigation={this.props.navigation} />
        <Footer
          show={this.show}
        />
        <PlayerComponent
          visible={this.state.visible}
          hide={this.hide}
        />
      </View>
    );
  }
}

Player.propTypes = {
  stopEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    queue: PropTypes.array.isRequired,
  }).isRequired,
  user: PropTypes.shape({}).isRequired,
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
    user: state.auth.user.data,
  }
), dispatch => (
  {
    stopEvent: event => (
      dispatch(stopEventAction(event))
    ),
  }
))(Player);

export default PlayerConnector;
