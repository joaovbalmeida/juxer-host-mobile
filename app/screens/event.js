import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Playlist from '../components/playlist';
import actions from '../store/actions';

const {
  fetchUserPlaylists: fetchUserPlaylistsAction,
} = actions;

class Event extends Component {
  static navigationOptions = () => ({
    title: 'Novo Evento',
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      secret: '',
      selected: [],
    };

    this.selectPlaylist = this.selectPlaylist.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserPlaylists();
  }

  selectPlaylist(e) {
    this.setState((state) => {
      if (state.selected.includes(e)) {
        const selected = [...state.selected];
        selected.splice(selected.indexOf(e), 1);
        return { selected };
      }
      return { selected: [...state.selected, e] };
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="Nome"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Código"
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={secret => this.setState({ secret })}
          value={this.state.secret}
        />
        <FlatList
          style={styles.playlists}
          data={this.props.playlists.data}
          extraData={this.state.selected}
          renderItem={({ item, index }) => (
            <Playlist
              name={item.name}
              qty={item.tracks.total.toString()}
              image={item.images[0].url}
              onPress={() => this.selectPlaylist(index)}
              selected={this.state.selected.includes(index)}
            />
          )}
          keyExtractor={item => item.id}
          horizontal
        />
        <Button
          title="Continuar"
          onPress={() => {
            this.props.navigation.navigate('Playlist', {
              name: this.state.name,
              secret: this.state.secret,
              selected: this.state.selected,
            });
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
  fetchUserPlaylists: PropTypes.func.isRequired,
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
    fetchUserPlaylists: () => (
      dispatch(fetchUserPlaylistsAction())
    ),
  }
))(Event);

export default EventConnector;
