import React from 'react';
import { StyleSheet, Text, View, Image, Alert, Button, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation'; // 1.1.1
import OpenWeatherMap from "./Open_weather_map";
import Forecast from "./Forecast";

let lat = 0;
let long = 0;
global.name = "";

export default class HomeScreen extends React.Component {
	constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  _handleTextChange = event => {
  this.setState( {text: event.nativeEvent.text});
  global.name = this.state.text;
};

render() {
	let pic = { uri: 'https://www1.villanova.edu/content/villanova/unicommunication/brandguidelines/UniversityLogosandHierarchy/university-logo-examples/_jcr_content/widgetiparsys/textimage_0/image.img.png/1483981998255.png'};
   return (
      <View style = {styles.container}>
		   <Text style={styles.otherText}>Write Name and Hit Enter on Keyboard:</Text>
		   <TextInput style={styles.nameInput} onSubmitEditing={this._handleTextChange}/>
            <View style={styles.buttonContainer}>
                <Button onPress={() => this.props.navigation.navigate('Details', {name: this.state.text})} style={{borderWidth: 1, borderColor: 'red'}} title="Coordinates"/>
            </View>
			<View style={styles.buttonContainer}>
                <Button onPress={() => this.props.navigation.navigate('Weather', {name: this.state.text})} style={{borderWidth: 1, borderColor: 'red'}} title="Weather"/>
            </View>
			<Text style={styles.title}>{name}</Text>
      </View>
    );
  }
}
class DetailsScreen extends React.Component {
	constructor(props) {
      super(props);

      this.state = {
        latitude: null,
        longitude: null,
        error: null,
      };
    }

	componentDidMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
			lat = position.coords.latitude;
			long = position.coords.longitude;
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

  render() {
    return (
      <View style={styles.container}>
	  	<Text style={styles.title}>Villanova to the Final Four</Text>
	  	<View style={styles.coordinates}>
			<Text>Latitude: {this.state.latitude}</Text>
			<Text>Longitude: {this.state.longitude}</Text>
			{this.state.error ? <Text>Error: {this.state.error}</Text> : null}
		</View>
         <View style={styles.buttonContainer}>
		 	<Button title="Go Home" onPress={() => this.props.navigation.navigate('Home')} style={{borderWidth: 1, borderColor: 'red'}}/>
         </View>
		 <Text style={styles.title}>{name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	welcome: {
		margin: 10,
		fontSize: 20,
		textAlign: 'center',
	},
	input: {
		fontSize: 20,
		borderWidth: 2,
		padding: 2,
		height: 40,
		width: 100,
		textAlign: "center"
	},
	title: {
		color: 'white',
		fontFamily: 'sans-serif',
		fontSize: 30,
	},
	otherText: {
		 color: 'lightgray',
		 fontSize: 20,
	 },
	 container: {
		 flex: 1,
		 backgroundColor: '#001F5B',
		 alignItems: 'center',
		 justifyContent: 'center',
	 },
	 coordinates: {
		 backgroundColor: 'white',
	 },
	 nameInput: {
		 height: 40,
		 width: 200,
		 backgroundColor: 'white',
		 borderColor: 'gray',
		 borderWidth: 1,
		 fontSize: 20,
	 },
	 buttonContainer: {
		 backgroundColor: 'lightgray',
		 margin: 30,
		 borderRadius: 10,
	 },
});
