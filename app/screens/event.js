import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArrowLeft from '../assets/images/arrowLeft.png';
import Playlist from '../components/playlist';
import HeaderTitle from '../components/headerTitle';
import Subtitle from '../components/subtitle';
import actions from '../store/actions';

const {
  fetchUserPlaylists: fetchUserPlaylistsAction,
} = actions;

class Event extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title="Novo Evento" />,
    headerLeft: (
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={ArrowLeft} style={styles.arrowLeft} />
      </TouchableOpacity>
    ),
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
      <View style={styles.container}>
        <Subtitle subtitle="NOME" />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            selectionColor="#ff005a"
            maxLength={40}
          />
        </View>
        <Subtitle subtitle="CÓDIGO" />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={secret => this.setState({ secret })}
            value={this.state.secret}
            selectionColor="#ff005a"
            maxLength={40}
          />
        </View>
        <Subtitle subtitle="SELECIONE AS PLAYLISTS" />
        <View style={styles.listContainer}>
          <FlatList
            style={styles.playlists}
            data={this.props.playlists.data}
            extraData={this.state.selected}
            horizontal
            renderItem={({ item, index }) => (
              <Playlist
                name={item.name}
                qty={item.tracks.total.toString()}
                image={item.images[0].url}
                onPress={() => this.selectPlaylist(index)}
                selected={this.state.selected.includes(index)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('Playlist', {
                name: this.state.name,
                secret: this.state.secret,
                selected: this.state.selected,
              });
            }}
          >
            <Text style={styles.buttonText}>
              SEGUIR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B1E',
    alignItems: 'center',
  },
  playlists: {
    height: 220,
    width: 360,
  },
  listContainer: {
    height: 220,
  },
  arrowLeft: {
    height: 16,
    width: 8.6,
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: '#F0EFF4',
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    color: '#F0EFF4',
    fontFamily: 'Raleway',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: 150,
    borderRadius: 20,
    backgroundColor: '#ff005a',
  },
  buttonText: {
    fontFamily: 'Raleway',
    color: '#F0EFF4',
    fontWeight: '700',
  },
});

Event.propTypes = {
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  fetchUserPlaylists: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const EventConnector = connect(state => (
  {
    playlists: state.spotify.userPlaylists,
  }
), dispatch => (
  {
    fetchUserPlaylists: () => (
      dispatch(fetchUserPlaylistsAction())
    ),
  }
))(Event);

export default EventConnector;
