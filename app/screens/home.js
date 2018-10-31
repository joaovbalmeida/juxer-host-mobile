import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewEvent from '../assets/images/newEvent.png';
import Logout from '../assets/images/logout.png';
import Placeholder from '../assets/images/coverPlaceholder.png';
import Playlist from '../components/playlist';
import Event from '../components/event';
import HeaderTitle from '../components/headerTitle';
import Subtitle from '../components/subtitle';
import actions from '../store/actions';

const {
  logout: logoutAction,
  sptLogout: sptLogoutAction,
  fetchUserPlaylists: fetchUserPlaylistsAction,
  fetchUserEvents: fetchUserEventsAction,
  startEvent: startEventAction,
} = actions;

class Home extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: <HeaderTitle title="JUXER" />,
    headerLeft: (
      <TouchableOpacity
        style={{ ...styles.button, marginLeft: 5 }}
        onPress={() => navigation.state.params.logout()}
      >
        <Image source={Logout} style={{ height: 20, width: 18.6 }} />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ ...styles.button, marginRight: 5 }}
        onPress={() => navigation.navigate('Event')}
      >
        <Image source={NewEvent} style={{ height: 20, width: 20 }} />
      </TouchableOpacity>
    ),
  });

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (this.props.event.length) {
      this.props.navigation.navigate('Player');
    } else {
      this.props.navigation.setParams({
        logout: this.logout,
      });
      this.props.fetchUserPlaylists();
      this.props.fetchUserEvents();
    }
  }

  logout() {
    Promise.all([
      this.props.logout(),
      this.props.sptLogout(),
    ]).then(() => {
      this.props.navigation.navigate('Loading');
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Subtitle subtitle="PLAYLISTS RAPIDAS" />
          <FlatList
            style={styles.playlists}
            data={this.props.playlists.data}
            renderItem={({ item }) => (
              <Playlist
                name={item.name}
                qty={item.tracks.total.toString()}
                image={item.images.length ? item.images[0].url : Placeholder}
              />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
        <Subtitle subtitle="ULTIMOS EVENTOS" />
        {
          this.props.events.data.map(item => (
            <Event
              key={item._id} // eslint-disable-line
              name={item.name}
              id={item._id} // eslint-disable-line
              onPress={() => {
                this.props.startEvent(item._id).then((result) => { // eslint-disable-line
                  if (result._id) { // eslint-disable-line
                    this.props.navigation.navigate('Player');
                  }
                });
              }}
            />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1214',
  },
  playlists: {
    height: 220,
  },
  events: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#15191B',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
  },
});

Home.propTypes = {
  playlists: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  events: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  event: PropTypes.shape({
    length: PropTypes.number,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  sptLogout: PropTypes.func.isRequired,
  fetchUserPlaylists: PropTypes.func.isRequired,
  fetchUserEvents: PropTypes.func.isRequired,
  startEvent: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
};

const HomeConnector = connect(state => (
  {
    playlists: state.spotify.userPlaylists,
    events: state.event.userEvents,
    event: state.event.event.data,
  }
), dispatch => (
  {
    logout: () => (
      dispatch(logoutAction())
    ),
    sptLogout: () => (
      dispatch(sptLogoutAction())
    ),
    fetchUserPlaylists: () => (
      dispatch(fetchUserPlaylistsAction())
    ),
    fetchUserEvents: () => (
      dispatch(fetchUserEventsAction())
    ),
    startEvent: event => (
      dispatch(startEventAction(event))
    ),
  }
))(Home);

export default HomeConnector;
