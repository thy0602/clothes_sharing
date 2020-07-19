// import React, { Component } from "react";
// import { StyleSheet, View, Image, Text } from "react-native";
// //import Svg, { Ellipse } from "react-native-svg";

import React, { Component } from 'react';
import {
  Alert, KeyboardAvoidingView, Image,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker, AsyncStorage
} from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Icon, Button } from "../components";
import Input from "../components/Input";
import { Images, argonTheme } from "../constants";
import { MaterialIcons, SimpleLineIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';
import ToggleSwitch from 'toggle-switch-react-native';

import StarRating from 'react-native-star-rating';

import Cloth from "../constants/Cloth"
import Users from "../constants/User"

const { width, height } = Dimensions.get("screen");
const BASE = 16;

export default class ClothesDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      size: "",
      height: "",
      weight: "",
      usedTime: "",
      price: "",
      nameSeller: "",
      phoneSeller: "",
      addressSeller: "",

      starCount: 0
    };
  }

  render() {
    try {
        let users = AsyncStorage.get('users');
        if (users === null)
          users = Users;
      } catch (error) {
        users = Users;
      }
  
      try {
        let currentUser = AsyncStorage.get('currentUser');
        if (currentUser === null)
          currentUser = 1;
      } catch (error) {
        currentUser = 1;
      }
  
      try {
        let clothes = AsyncStorage.get('clothes');
        if (clothes === null)
          clothes = Cloth;
      } catch (error) {
        clothes = Cloth;
      }
  
      //this.props.navigation.
  
      let item = this.props.navigation.getParam("pet");
      console.log(item);
  
      let seller = 0;
      users.forEach((x, index) => {
        if (item.seller === x.id)
          seller = x
      })

    return (
      <ScrollView>
        <Block>
             <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
        </Block>
      <View style={styles.container}>
        <Image
          //source={require("../assets/imgs/off-shoulder.jpg")}
          source = {{uri: item.imgSource}}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <View style={styles.ellipseRow}>
          <Image
            //source={require("../assets/imgs/off-shoulder.jpg")}
            source = {{uri: seller.avatar}}
            style={styles.avatar}/>
          <Text style={styles.nameSeller}>{seller.name}</Text>
        </View>
        <Image
          source={require("../assets/imgs/shopping-cart.png")}
          resizeMode="contain"
          style={styles.image2}
        ></Image>
        {/* <Text style={styles.loremIpsum}></Text>
        <Text style={styles.loremIpsum6}></Text> */}
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.sizeRow}>
          <Text style={styles.size}>Size</Text>
          <Text style={styles.m13}>{item.size}</Text>
        </View>
        <View style={styles.heightRow}>
          <Text style={styles.height}>Height</Text>
          <Text style={styles.loremIpsum12}>{item.height}</Text>
        </View>
        <View style={styles.weightRow}>
          <Text style={styles.weight}>Weight</Text>
          <Text style={styles.loremIpsum13}>{item.weight}</Text>
        </View>
        <View style={styles.usedTimeRow}>
          <Text style={styles.usedTime}>Used Time</Text>
          <Text style={styles.loremIpsum14}>{item.usedTime}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.loremIpsum15}>{item.price}</Text>
        </View>
        <Text style={styles.ownersInfo}>Owner&#39;s Info</Text>
        <Text style={styles.phone}>Phone</Text>
        <Text style={styles.loremIpsum9}>{seller.phone}</Text>
        <Text style={styles.loremIpsum11}>Address</Text>
        <Text style={styles.loremIpsum9}>{seller.address}</Text>
        <Text style={{marginBottom: 30}}> {""}</Text>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 375,
    height: 274,
    marginTop: 100
  },
  ellipse: {
    width: 42,
    height: 42
  },
  nameSeller: {
    fontFamily: "Roboto",
    color: "#121212",
    marginLeft: 11,
    marginTop: 9
  },
  ellipseRow: {
    height: 42,
    flexDirection: "row",
    marginTop: -333,
    marginLeft: 24,
    marginRight: 261
  },
  image2: {
    width: 53,
    height: 43,
    marginTop: 311,
    marginLeft: 30
  },
  loremIpsum: {
    fontFamily: "Roboto",
    color: "#121212",
    marginTop: 5,
    marginLeft: 35
  },
  loremIpsum6: {
    fontFamily: "Roboto",
    color: "#121212",
    marginTop: 31,
    marginLeft: 77
  },
  name: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 20,
    marginTop: 10,
    marginLeft: 36
  },
  size: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#121212"
  },
  m13: {
    fontFamily: "Roboto",
    color: "#121212",
    marginLeft: 52
  },
  sizeRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 17,
    marginLeft: 56,
    marginRight: 229
  },
  height: {
    fontFamily: "Roboto",
    color: "#121212",
    fontWeight: "bold",
    fontSize: 14
  },
  loremIpsum12: {
    fontFamily: "Roboto",
    color: "#121212",
    marginLeft: 37
  },
  heightRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 9,
    marginLeft: 55,
    marginRight: 214
  },
  weight: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#121212"
  },
  loremIpsum13: {
    fontFamily: "Roboto",
    color: "#121212",
    marginLeft: 34
  },
  weightRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 13,
    marginLeft: 57,
    marginRight: 211
  },
  usedTime: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#121212"
  },
  loremIpsum14: {
    fontFamily: "Roboto",
    color: "#121212",
    marginLeft: 15
  },
  usedTimeRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 55,
    marginRight: 195
  },
  price: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: "#121212"
  },
  loremIpsum15: {
    fontFamily: "Roboto",
    color: "#121212",
    marginLeft: 46
  },
  priceRow: {
    height: 17,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 55,
    marginRight: 168
  },
  ownersInfo: {
    fontFamily: "Roboto",
    color: "#121212",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 24,
    marginLeft: 35
  },
  phone: {
    fontFamily: "Roboto",
    color: "#121212",
    fontWeight: "bold",
    marginTop: 13,
    marginLeft: 57
  },
  loremIpsum9: {
    fontFamily: "Roboto",
    color: "#121212",
    marginTop: 8,
    marginLeft: 72
  },
  loremIpsum11: {
    fontFamily: "Roboto",
    color: "#121212",
    fontWeight: "bold",
    marginTop: 7,
    marginLeft: 58
  },
  avatar: {
    width: BASE * 2.5,
    height: BASE * 2.5,
    borderRadius: BASE * 1.25,
  },
  backArrow: {
    left: 10,
    top: 10,
    color: 'black',
    position: 'absolute'
  },
});

// export default Untitled;

// import React, { Component } from 'react';
// import {
//   Alert, KeyboardAvoidingView, Image,
//   View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker, AsyncStorage
// } from 'react-native';
// import { Block, Text, theme } from "galio-framework";
// import { Icon, Button } from "../components";
// import Input from "../components/Input";
// import { Images, argonTheme } from "../constants";
// import { MaterialIcons, SimpleLineIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import DatePicker from 'react-native-datepicker';
// import { Dialog } from 'react-native-simple-dialogs';
// import ToggleSwitch from 'toggle-switch-react-native';

// import StarRating from 'react-native-star-rating';

// import Cloth from "../constants/Cloth"
// import Users from "../constants/User"

// // import AuthAPI from '../api/AuthAPI';
// // import PetAPI from '../api/PetAPI';

// const { width, height } = Dimensions.get("screen");
// const imageCLothes = require("../assets/imgs/white-dress.jpg")

// const nameItem = "White dress";
// const sizeItem = "M";
// const heightItem = "1m5 - 1m6"
// const weightItem = "45-55 kg"
// const usedTimeItem = "2 years"
// const priceItem = "100,000 VND"

// const nameSellerItem = "Phạm Nguyên Minh Thy"
// const phoneSellerItem = "0928299998"
// const addressSellerItem = "15 Nguyễn Trãi, phường 14, Q.5, TP.HCM"

// const starItem = 3.5

// const clothesList = []
// const userList = []

// export default class ClothesDetails extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       name: "",
//       size: "",
//       height: "",
//       weight: "",
//       usedTime: "",
//       price: "",
//       nameSeller: "",
//       phoneSeller: "",
//       addressSeller: "",

//       starCount: 0
//     };
//   }

  
//   onStarRatingPress(rating) {
//     this.setState({
//       starCount: rating
//     });
//   }

//   addCareItem() {
//     Alert.alert(
//       'Add care',
//       'Do you want to rent this item?',
//       [
//         { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
//         {
//           text: 'OK', onPress: () => console.log('OK Pressed'), style: 'OK'
//         },
//       ],
//       { cancelable: false }
//     )
//   }


//   goChat() {
//     this.props.navigation.navigate('Chat');  
//   }

//   componentDidMount() {
//     // BackgroundColor.setColor("#CFCFCF");
//     this.didFocus = this.props.navigation.addListener('willFocus', () => {
//       this.setState({ loading: true }, () => {
//         //this._retrieveData();
//         this.setData();
//       })
//     })
//   }

//   componentWillUnmount() {
//     this.didFocus.remove();

//   }

//   setData() {
//     this.setState({
//       name: nameItem,
//       size: sizeItem,
//       height: heightItem,
//       weight: weightItem,
//       usedTime: usedTimeItem,
//       price: priceItem,
//       nameSeller: nameSellerItem,
//       phoneSeller: phoneSellerItem,
//       addressSeller: addressSellerItem,
//       starCount: starItem
//     })
//   }

//   render() {
//     try {
//       let users = AsyncStorage.get('users');
//       if (users === null)
//         users = Users;
//     } catch (error) {
//       users = Users;
//     }

//     try {
//       let currentUser = AsyncStorage.get('currentUser');
//       if (currentUser === null)
//         currentUser = 1;
//     } catch (error) {
//       currentUser = 1;
//     }

//     try {
//       let clothes = AsyncStorage.get('clothes');
//       if (clothes === null)
//         clothes = Cloth;
//     } catch (error) {
//       clothes = Cloth;
//     }

//     //this.props.navigation.

//     let item = this.props.navigation.getParam("pet");
//     console.log(item);

//     let seller = 0;
//     users.forEach((x, index) => {
//       if (item.seller === x.id)
//         seller = x
//     })

//     return (
//       <Block flex>
//         <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
//           <Block>
//             <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
//               onPress={() => this.props.navigation.goBack()} />
//           </Block>
//           <View style={styles.textHeader}>
//             <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
//               Clothes Details
//             </Text>
//           </View>
//         </ImageBackground>

        
//         <ScrollView style={{ marginBottom: 15 }}>
//           <Block flex={1} style={styles.imageBlock}>
//             <ImageBackground source={{uri: item.imgSource}} resizeMode='stretch' style={styles.clothesImage}> 
//               </ImageBackground>
//           </Block>

//           <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginBottom: 10 }} />

//             <Block flex={1} style={styles.booking}>
//               <Text style={styles.headerTxt}>Clothes info</Text>
//                 <View style={styles.detailInfo}>
//                   <View style={styles.row}>
//                     <Text style={styles.field}>Name:
//                         <Text style={styles.value}> {item.name}</Text>
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.field}>Size:
//                         <Text style={styles.value}> {item.size}</Text>
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.field}>Height:
//                         <Text style={styles.value}> {item.height} </Text>
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.field}>Weight:
//                         <Text style={styles.value}> {item.weight} </Text>
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.field}>Used Time:
//                           <Text style={styles.value}> {item.usedTime}</Text>
//                     </Text>
//                   </View>

//                   <View style={styles.row}>
//                     <Text style={styles.field}>Price:
//                           <Text style={styles.value}> {item.price}</Text>
//                     </Text>
//                   </View>
//                 </View>

//               <Text style={styles.headerTxt}>Customer info</Text>
//               <View style={styles.detailInfo}>
//                 <View style={styles.row}>
//                   <Text style={styles.field}>Name:
//                       <Text style={styles.value}> {seller.name}</Text>
//                   </Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.field}>Phone number:
//                       <Text style={styles.value}> {seller.phone}</Text>
//                   </Text>
//                 </View>

//                 <View style={styles.row}>
//                   <Text style={styles.field}>Address:
//                       <Text style={styles.value}> {seller.address}</Text>
//                   </Text>
//                 </View>

//                 <Text> {'\n'} </Text>
//               </View>
//             </Block>

//             <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginBottom: 10 }} />
          
//             <Text style={{
//                 color: '#363636', 
//                 fontSize: 17, 
//                 fontWeight: "bold", 
//                 marginBottom: 5, 
//                 alignSelf: 'center'}}> 
//                 Review
//             </Text>
          
//             <View style={{alignItems: 'center'}}>
//               <StarRating
//                 name="small-rating" 
//                 caption="Small!"
//                 disabled={true}
//                 maxStars={5}
//                 rating={this.state.starCount}
//                 starSize={30}
//                 // rating={this.state.starCount}
//                 // selectedStar={(rating) => this.onStarRatingPress(rating)}
//                 fullStarColor={'yellow'}
//               />
//             </View>

//             <Block style={styles.buttonRow}>
//               <Button style={styles.button} onPress={() => {this.addCareItem()}}>
//                 <Text bold size={12} color={"black"}>
//                   Rent
//                 </Text>
//               </Button>
//               <Button style={styles.button} onPress={() => {this.goChat()}}>
//                 <Text bold size={12} color={"black"}>
//                   Chat
//                 </Text>
//               </Button>
//             </Block>
//           </ScrollView>
        

        
//       </Block>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     width: width,
//     height: 80
//   },
//   textHeader: {
//     alignItems: 'center',
//     marginTop: 7
//   },
//   backArrow: {
//     left: 10,
//     top: 10,
//     color: 'white',
//     position: 'absolute'
//   },
//   clothesImage: {
//     width: "100%",
//     height: 250
//   },
//   inforBlock: {
//     backgroundColor: 'white',
//     width: width,
//     //height: 200,
//     marginTop: 5
//   },
//   buttonRow: {
//     width: 280, 
//     flexDirection: 'row', 
//     justifyContent: 'space-between',
//     alignSelf: 'center',
//     marginTop: 20,
//     alignItems: 'center',
//     marginBottom: 20
//   }, 
//   button: {
//     width: 100,
//     height: 30,
//     borderRadius: 10,
//     backgroundColor: "#a0a7fa"
//   },




//   //New
//   imageBlock: {
//     backgroundColor: "rgba(45, 45, 45, 0.95)",
//     borderRadius: 15,
//     width: "95%",
//     // paddingHorizontal: 20,
//     marginTop: 5,
//     marginBottom: 20,
//     alignSelf: 'center'
//   },
//   booking: {
//     backgroundColor: "rgba(224, 224, 224, 1)",
//     borderRadius: 15,
//     width: "95%",
//     paddingHorizontal: 20,
//     marginTop: 5,
//     marginBottom: 20,
//     alignSelf: 'center'
//   },
//   headerTxt: {
//     fontFamily: "opensans",
//     fontSize: 25,
//     textAlign: 'center',
//     marginTop: 20,
//     fontWeight: "400",
//     color: 'black',
//   },
//   row: {
//     textAlign: "left",
//     width: "100%",
//     marginTop: 10,
//   },
//   detailInfo: {
//     width: "100%",
//     left: 0
//   },
//   field: {
//     fontWeight: '500',
//     fontFamily: 'opensans',
//     fontSize: 17,
//     color: 'black'
//   },
// });