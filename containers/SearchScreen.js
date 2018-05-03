import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, WebView, Image, TextInput, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import AppNavigation from '../AppNavigation';

var foodArray;
var recipeURL = "http://www.recipepuppy.com/api/?i=";

export default class SearchScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	// _handleTextChange = event => {
  //   this.setState( {food: event.nativeEvent.food}).bind(this);
  //   global.ingredients = this.state.food;
  // }



  sendData = (data)=>{
	  // this._handleTextChange.bind(this);
	  this.setState({text:data}, function(){
		  foodArray = data.split(',');
		  var i;
		  	for(i = 0; i < foodArray.length; i++){
				recipeURL+= (foodArray[i]+",");
			}
          global.food = this.state.text;
    	  this.props.navigation.navigate('Recipe', {food: this.state.text});
	  });
  }

	render(){
		return (
			<View style = {styles.container}>
				<Text style={styles.otherText}>Write ingredients, separate each with comma, no spaces:</Text>
				<TextInput style={styles.nameInput} onSubmitEditing={(event) => this.sendData(event.nativeEvent.text)}/>

		   </View>
		 );
	}

}

const styles = StyleSheet.create({

  MainContainer: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
  },

  TextStyle: {

	color: '#E91E63',
	fontSize: 20,

},
  flatListItem: {
        color: 'white',
		textDecorationLine: 'underline',
        padding: 10,
        fontSize: 16,
},
container1: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});
