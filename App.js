import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, WebView, Image, TextInput, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

global.ingredients = "";
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
					   backgroundColor: 'mediumseagreen'
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
 class RecipeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state ={
		isLoading: true,
		showWebPart: false,
		recipePage: ''}
  }

  componentDidMount(){
    return fetch('http://www.recipepuppy.com/api/?i='+{ingredients})
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
	else if (this.state.showWebPart) {
		this.setState({showWebPart: false});
		return(
			<WebView
				source={{uri:this.state.recipePage}}
			/>
		);
	}
    return(
      // <View style={{flex: 1, paddingTop:20}}>
      //   <FlatList
      //     data={this.state.dataSource}
      //     renderItem={({item}) => <Text onPress={ e => this.setState({showWebPart:true, recipePage: Linking.openURL(item.href.replace(/\\/,""))})} >{item.title + "\n"}</Text>}
      //     keyExtractor={(item, index) => index}
      //   />
      // </View>
	  <View style={{flex: 1, marginTop: 22}}>
	  	<Text>{ingredients}</Text>
            <FlatList
                data={this.state.dataSource}
                renderItem={({item, index})=>{
                    //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    return (
                    <FlatListItem item={item} index={index}>

                    </FlatListItem>);
                }}
				keyExtractor={(item, index) => index}
			>
            </FlatList>
	</View>
    );
  }
}

class SearchScreen extends React.Component{
	constructor(props) {
		super(props);
		this.state = { text: '' };
	}

	_handleTextChange = event => {
    this.setState( {text: event.nativeEvent.text});
    global.ingredients = this.state.text;
  }

  sendData(){
	  this._handleTextChange;
	  console.log("THIS IS A TEST");
	  this.props.navigation.navigate('Recipe', {ingredients: this.state.text});

  }

	render(){
		return (
			<View style = {styles.container}>
				<Text style={styles.otherText}>Write ingredients, separate each with comma, no spaces:</Text>
				<TextInput style={styles.nameInput} onSubmitEditing={this.sendData.bind(this)}/>
		   </View>
		 );
	}

}

const RootStack = StackNavigator(
  {
    Recipe: {
      screen: RecipeScreen,
    },
    Search: {
      screen: SearchScreen,
    },
},
  {
    initialRouteName: 'Search',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
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
	textDecorationLine: 'underline'

},
  flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
}
});
