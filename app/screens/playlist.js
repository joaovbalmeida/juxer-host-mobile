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
import DatePicker from 'react-native-datepicker';

import PlaylistComponent from '../components/playlist';
import actions from '../store/actions';


const {
  fetchSptPlaylists: fetchSptPlaylistsAction,
} = actions;

class Playlist extends Component {
  static navigationOptions = () => ({
    title: 'Playlists',
  });

  constructor(props) {
    super(props);
    const playlists = props.navigation.state.params.selected.map((item) => {
      const playlist = {};
      playlist.name = props.playlists.data[item].name;
      playlist.tracks = props.playlists.data[item].tracks.total;
      playlist.url = props.playlists.data[item].href.replace('https://api.spotify.com/', '');
      playlist.image = props.playlists.data[item].images[0].url;
      playlist.start = '';
      playlist.end = '';
      return playlist;
    });

    this.state = {
      playlists,
      startPicker: false,
      endPicker: false,
    };
  }

  _showPicker() {
    this.setState({ startPicker: true });
  }

  _hidePicker() {
    this.setState({ endPicker: false });
  }

  render() {
    return (
      <View>
        <FlatList
          style={styles.playlists}
          data={this.state.playlists}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer}>
              <PlaylistComponent
                name={item.name}
                qty={item.tracks.toString()}
                image={item.image}
                disabled
              />
              <View style={styles.rightView}>
                <DatePicker
                  style={styles.picker}
                  date={this.state.playlists[index].start}
                  mode="datetime"
                  placeholder="Início"
                  format="DD-MM-YYYY HH:MM"
                  minDate={Date()}
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={start => this.setState((state) => {
                    const playlists = [...state.playlists];
                    playlists[index].start = start;
                    return { playlists };
                  })}
                />
                <DatePicker
                  style={styles.picker}
                  date={this.state.playlists[index].end}
                  mode="datetime"
                  placeholder="Término"
                  format="DD-MM-YYYY HH:MM"
                  minDate={Date()}
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={end => this.setState((state) => {
                    const playlists = [...state.playlists];
                    playlists[index].end = end;
                    return { playlists };
                  })}
                />
              </View>
            </View>
          )}
          keyExtractor={item => item.url}
        />
        <Button
          title="Criar Evento"
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

Playlist.propTypes = {
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      images: PropTypes.array.isRequired,
      tracks: PropTypes.shape({}).isRequired,
    }).isRequired).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string,
        secret: PropTypes.string,
        selected: PropTypes.array,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  playlists: {
    height: '80%',
    width: '100%',
    paddingVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
  },
  rightView: {
    flex: 1,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
  picker: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
  },
});

const PlaylistConnector = connect(state => (
  {
    playlists: state.spotify.playlists,
  }
), dispatch => (
  {
    fetchSptPlaylists: () => (
      dispatch(fetchSptPlaylistsAction())
    ),
  }
))(Playlist);

export default PlaylistConnector;
