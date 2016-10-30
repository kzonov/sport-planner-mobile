import React, { NavigatorIOS, Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
  ListView,
  AsyncStorage
} from 'react-native';

var AddActivity = require('./AddActivity');
var CalendarPicker = require('react-native-calendar-picker'),
    CalendarPicker2;

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    marginTop: 30,
    alignItems: 'center'
  },
  selectedDate: {
    marginTop: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#000'
  },
  buttonText: {
    marginTop: 1,
    fontSize: 18,
    color: 'black',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  popup: {
    paddingTop: 10,
    backgroundColor: '#f0f0f0',
    height: 200
  }
});

class CalendarPage extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.loadActivities();
    this.state = {
      current_date: new Date(),
      date: new Date(),
      dataSource: ds.cloneWithRows([])
    };
  }

  async loadActivities() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    await AsyncStorage.getItem('@ActivityStore:activities').then((result) =>  activities = JSON.parse(result));
    console.log(activities);
    this.setState({ dataSource: ds.cloneWithRows(activities) });
  }

  onDateChange(date) {
    this.setState({ date: date });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
        <Text style={styles.buttonText}>{rowData.activityTitle}</Text>
      </View>
    );
  }

  addActivity() {
    this.props.navigator.push({
      title: 'Add activity',
      component: AddActivity,
      passProps: { date: this.state.date }
    });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.description}>
            Select the day to set or view the training
          </Text>
          <Text style={styles.selectedDate}> Selected date: { this.state.date.toString() } </Text>
          <CalendarPicker
            selectedDate={this.state.date}
            onDateChange={this.onDateChange.bind(this)}
            screenWidth={Dimensions.get('window').width}
            startFromMonday={true}
            weekdays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            selectedBackgroundColor={'#5ce600'} />
        </View>
        <TouchableHighlight style={styles.button} onPress={this.addActivity.bind(this)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Add activity for selected day</Text>
        </TouchableHighlight>
        <View style={styles.popup}>
          <Text style={styles.buttonText}>Activities for selected day</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
        </View>
      </View>
    );
  }
}

module.exports = CalendarPage;
