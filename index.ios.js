import React, { Component } from 'react';
import {
  NavigatorIOS,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var CalendarPage = require('./CalendarPage');

class SportPlanner extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Plan your sport activity',
          component: CalendarPage
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('SportPlanner', () => SportPlanner);
