import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Linking, StyleSheet, WebView, Image} from 'react-native';

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
						   <Text style={styles.flatListItem}>{this.props.item.title}</Text>
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
export default class ChefMeUp extends React.Component {

  constructor(props){
    super(props);
    this.state ={
		isLoading: true,
		showWebPart: false,
		recipePage: ''}
  }

  componentDidMount(){
    return fetch('http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3')
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
