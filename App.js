import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, WebView, Image, TextInput, BackHandler} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';
import AppNavigation from './AppNavigation';




console.disableYellowBox = true;
global.ingredients = "";
global.food = "";
var foodArray;
var recipeURL = "http://www.recipepuppy.com/api/?i=";

class FlatListItem extends React.Component{
	render() {
	   return (
		   <View style={{
			   flex: 1,
			   flexDirection:'column',
		   }}>
			   <View style={{
					   flex: 1,
					   flexDirection:'row',
					   // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
					   backgroundColor: '#3BC2F3'
			   }}>
				   <Image
					   source={{uri: this.props.item.thumbnail}}
					   style={{width: 100, height: 100, margin: 5}}
				   >

				   </Image>
				   <View style={{
						   flex: 1,
						   flexDirection:'column',
						   height: 100
					   }}>
						   <Text style={styles.flatListItem} onPress={() => Linking.openURL(this.props.item.href.replace(/\\/,""))}>{this.props.item.title}</Text>
						   <Text style={styles.TextStyle}>{this.props.item.ingredients}</Text>
				   </View>
			   </View>
			   <View style={{
				   height: 1,
				   backgroundColor:'white'
			   }}>

			   </View>
		 </View>
	   );
	}
}



export default class App extends React.Component {

  componentWillMount(){
	var config = {
		apiKey: "AIzaSyD5e9uuw6-6UqxYKS3Gf6IMxjkYQsGim9Y",
		authDomain: "chef-me-up.firebaseapp.com",
		databaseURL: "https://chef-me-up.firebaseio.com",
		projectId: "chef-me-up",
		storageBucket: "chef-me-up.appspot.com",
		messagingSenderId: "356573297289"
  };
  firebase.initializeApp(config);
  }

  render() {
    return <AppNavigation />;
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
