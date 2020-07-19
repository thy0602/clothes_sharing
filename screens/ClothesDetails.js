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

// import AuthAPI from '../api/AuthAPI';
// import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");
const imageCLothes = require("../assets/imgs/white-dress.jpg")

const nameItem = "White dress";
const sizeItem = "M";
const heightItem = "1m5 - 1m6"
const weightItem = "45-55 kg"
const usedTimeItem = "2 years"
const priceItem = "100,000 VND"

const nameSellerItem = "Phạm Nguyên Minh Thy"
const phoneSellerItem = "0928299998"
const addressSellerItem = "15 Nguyễn Trãi, phường 14, Q.5, TP.HCM"

const starItem = 3.5

const clothesList = []
const userList = []

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

  
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  addCareItem() {
    Alert.alert(
      'Add care',
      'Do you want to rent this item?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => console.log('OK Pressed'), style: 'OK'
        },
      ],
      { cancelable: false }
    )
  }


  goChat() {
    this.props.navigation.navigate('Chat');  
  }

  componentDidMount() {
    // BackgroundColor.setColor("#CFCFCF");
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        //this._retrieveData();
        this.setData();
      })
    })
  }

  componentWillUnmount() {
    this.didFocus.remove();

  }

  setData() {
    this.setState({
      name: nameItem,
      size: sizeItem,
      height: heightItem,
      weight: weightItem,
      usedTime: usedTimeItem,
      price: priceItem,
      nameSeller: nameSellerItem,
      phoneSeller: phoneSellerItem,
      addressSeller: addressSellerItem,
      starCount: starItem
    })
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

    let index = 0;

    return (
      <Block flex>
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{ fontFamily: 'Roboto' }} >
              Clothes Details
            </Text>
          </View>
        </ImageBackground>

        
        <ScrollView style={{ marginBottom: 15 }}>
          <Block flex={1} style={styles.imageBlock}>
            <ImageBackground source={{uri: clothes[index].imgSource}} resizeMode='stretch' style={styles.clothesImage}> 
              </ImageBackground>
          </Block>

          <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginBottom: 10 }} />

            <Block flex={1} style={styles.booking}>
              <Text style={styles.headerTxt}>Clothes info</Text>
                <View style={styles.detailInfo}>
                  <View style={styles.row}>
                    <Text style={styles.field}>Name:
                        <Text style={styles.value}> {clothes[index].name}</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Size:
                        <Text style={styles.value}> {clothes[index].size}</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Height:
                        <Text style={styles.value}> {clothes[index].height} </Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Weight:
                        <Text style={styles.value}> {clothes[index].weight} </Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Used Time:
                          <Text style={styles.value}> {clothes[index].usedTime}</Text>
                    </Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.field}>Price:
                          <Text style={styles.value}> {clothes[index].price}</Text>
                    </Text>
                  </View>
                </View>

              <Text style={styles.headerTxt}>Customer info</Text>
              <View style={styles.detailInfo}>
                <View style={styles.row}>
                  <Text style={styles.field}>Name:
                      <Text style={styles.value}> {users[currentUser - 1].name}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Phone number:
                      <Text style={styles.value}> {users[currentUser - 1].phone}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Address:
                      <Text style={styles.value}> {users[currentUser - 1].address}</Text>
                  </Text>
                </View>

                <Text> {'\n'} </Text>
              </View>
            </Block>

            <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginBottom: 10 }} />
          
            <Text style={{
                color: '#363636', 
                fontSize: 17, 
                fontWeight: "bold", 
                marginBottom: 5, 
                alignSelf: 'center'}}> 
                Review
            </Text>
          
            <View style={{alignItems: 'center'}}>
              <StarRating
                name="small-rating" 
                caption="Small!"
                disabled={true}
                maxStars={5}
                rating={this.state.starCount}
                starSize={30}
                // rating={this.state.starCount}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={'yellow'}
              />
            </View>

            <Block style={styles.buttonRow}>
              <Button style={styles.button} onPress={() => {this.addCareItem()}}>
                <Text bold size={12} color={"black"}>
                  Rent
                </Text>
              </Button>
              <Button style={styles.button} onPress={() => {this.goChat()}}>
                <Text bold size={12} color={"black"}>
                  Chat
                </Text>
              </Button>
            </Block>
          </ScrollView>
        

        
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 80
  },
  textHeader: {
    alignItems: 'center',
    marginTop: 7
  },
  backArrow: {
    left: 10,
    top: 10,
    color: 'white',
    position: 'absolute'
  },
  clothesImage: {
    width: "100%",
    height: 250
  },
  inforBlock: {
    backgroundColor: 'white',
    width: width,
    //height: 200,
    marginTop: 5
  },
  buttonRow: {
    width: 280, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20
  }, 
  button: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#a0a7fa"
  },




  //New
  imageBlock: {
    backgroundColor: "rgba(45, 45, 45, 0.95)",
    borderRadius: 15,
    width: "95%",
    // paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: 'center'
  },
  booking: {
    backgroundColor: "rgba(224, 224, 224, 1)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: 'center'
  },
  headerTxt: {
    fontFamily: "opensans",
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: "400",
    color: 'black',
  },
  row: {
    textAlign: "left",
    width: "100%",
    marginTop: 10,
  },
  detailInfo: {
    width: "100%",
    left: 0
  },
  field: {
    fontWeight: '500',
    fontFamily: 'opensans',
    fontSize: 17,
    color: 'black'
  },
});