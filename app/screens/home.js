import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Playlist from '../components/playlist';
import actions from '../store/actions';

const {
  logout: logoutAction,
  sptLogout: sptLogoutAction,
  fetchSptPlaylists: fetchSptPlaylistsAction,
} = actions;

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Juxer',
    headerRight: (
      <Button
        onPress={() => navigation.navigate('Event')}
        title="Criar Evento"
      />
    ),
  });

  componentDidMount() {
    this.props.fetchSptPlaylists();
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.playlists}
          data={this.props.playlists.data}
          renderItem={({ item }) => (
            <Playlist
              name={item.name}
              qty={item.tracks.total.toString()}
              image={item.images[0].url}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
        />
        <Button
          title="logout"
          onPress={() => {
            Promise.all([
              this.props.logout(),
              this.props.sptLogout(),
            ]).then(() => {
              this.props.navigation.navigate('Loading');
            });
          }}
        />
      </View>
    );
  }
}

Home.propTypes = {
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

const HomeConnector = connect(state => (
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
))(Home);

export default HomeConnector;
