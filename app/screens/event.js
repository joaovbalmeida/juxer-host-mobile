import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import actions from '../store/actions';

const {
  logout: logoutAction,
  sptLogout: sptLogoutAction,
  fetchSptPlaylists: fetchSptPlaylistsAction,
} = actions;

class Event extends Component {
  static navigationOptions = () => ({
    title: 'Novo Evento',
  });

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Button
          title="logout"
          onPress={() => {
            
          }}
        />
      </View>
    );
  }
}

Event.propTypes = {
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  sptLogout: PropTypes.func.isRequired,
  fetchSptPlaylists: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  playlists: {
    height: 200,
    width: '100%',
    paddingVertical: 5,
  },
});

const EventConnector = connect(state => (
  {
    playlists: state.spotify.playlists,
  }
), dispatch => (
  {
    logout: () => (
      dispatch(logoutAction())
    ),
    sptLogout: () => (
      dispatch(sptLogoutAction())
    ),
    fetchSptPlaylists: () => (
      dispatch(fetchSptPlaylistsAction())
    ),
  }
))(Event);

export default EventConnector;
