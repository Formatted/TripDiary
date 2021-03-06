import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Menu, Card, FAB, Paragraph, ActivityIndicator } from 'react-native-paper';
import firebase from '../../Firebase.js';
import moment from 'moment';

import { fetchTrips } from '../model/Trip.js';

export default class MyTripsPage extends React.Component{

  state = {
    showAppBarMenu: false,
    trips: []
  }

  componentDidMount() {
    let user = firebase.auth().currentUser;
    if(user != null){
      let userId = user.uid;
    
    this.props.navigation.addListener(
      'willFocus', () => fetchTrips(userId).then((trips) => this.setState({ trips }))
    );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="My Trips" />
          <Menu
            onDismiss={() => this.setState({ showAppBarMenu: false })}
            visible={this.state.showAppBarMenu}
            anchor={
              <Appbar.Action
                  color="white"
                  icon="dots-vertical"
                  onPress={() => this.setState({ showAppBarMenu: true })}
              />
            }
          >
              <Menu.Item icon="logout" title="Sign Out" onPress={() => firebase.auth().signOut()} />
          </Menu>
        </Appbar.Header>
        <ScrollView>
          { this.state.trips.map((item, index) => {
              return (<Card 
                key={`trip-${index}`} style={styles.tripCard}
                onPress={() => this.props.navigation.navigate("trip", {trip: item})}
              >
                <Card.Title 
                  title={item.name}
                  testID = 'Trip ID' //for integration testing
                  subtitle={item.location}
                />
                <Card.Content>
                  <Paragraph>From {moment(item.startDate).format('MMMM Do')} to {moment(item.endDate).format('MMMM Do')}</Paragraph>
                </Card.Content>
              </Card>);
          }) }
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          label="Add Trip"
          onPress={() => this.props.navigation.navigate("create")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    margin: 35,
    right: 0,
    bottom: 0,
  },
  tripCard: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
    backgroundColor: 'pink',
  }
});
