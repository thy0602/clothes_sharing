import React, { Component } from 'react';
import {
  Alert, KeyboardAvoidingView, Image,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker
} from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Icon, Button } from "../components";
import Input from "../components/Input";
import { Images, argonTheme } from "../constants";
import { MaterialIcons, SimpleLineIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';
import ToggleSwitch from 'toggle-switch-react-native';

//import {BackgroundColor} from 'react-native-background-color';
import StarRating from 'react-native-star-rating';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

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

export default class PetProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      //name: "",
      species: "",
      breed: "",
      weight: "",
      height: "",
      date: "",
      successDialogVisible: false,
      edit: false,
      popUpDialog: false,
      petId: "",
      pet: null,
      message: "",

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
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
    this.retrieveData = this.retrieveData.bind(this);
    this.deletePet = this.deletePet.bind(this);
    this.pet = new Object();
  }

  
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  addCareItem() {
    Alert.alert(
      'Add care',
      'Do you want to add care to this item?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => console.log('OK Pressed'), style: 'OK'
        },
      ],
      { cancelable: false }
    )
  }

  goChat() {}

  componentDidMount() {
    // BackgroundColor.setColor("#CFCFCF");
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
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

  retrieveData() {
    const pet = this.props.navigation.state.params.pet;

    var date = new Date(pet.dateOfBirth);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    var dateString = date.toISOString().split("T")[0];

    this.setState({
      petId: pet._id,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      weight: pet.weight.toString(),
      height: pet.height.toString(),
      date: dateString,
      loading: false,
    })
  }

  UpdatePetProfile = async () => {
    if (!this.validateInput()) {
      return;
    }

    let customerId = await this.authAPI.retrieveCustomerId();

    const { date } = this.state;
    var d = date.split('-');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), 0, 0, 0, 0);

    let pet = new Object({
      _id: this.state.petId,
      name: this.state.name,
      weight: parseFloat(this.state.weight).toFixed(1),
      height: parseFloat(this.state.height).toFixed(1),
      species: this.state.species,
      breed: this.state.breed,
      customerId: customerId,
      dateOfBirth: mydate
    })

    this.petAPI.updatePetById(pet, (res) => {
      if (res) {
        this.setState({
          message: "Updated successfully!",
          successDialogVisible: true,
        });
        setTimeout(() => {
          this.setState({
            successDialogVisible: false,
          });
          this.props.navigation.goBack();
        }, 2000);
      }
      else {
        Alert.alert('Error', "Server error",
          [{ text: 'Ok' }])
      }
    })

  }

  validateInput() {
    var str = "";
    if (!this.state.name)
      str += "name";
    if (!this.state.species) {
      if (str == "")
        str += "species";
      else
        str += ", species";
    }
    if (!this.state.weight) {
      if (str == "")
        str += "weight";
      else
        str += ", weight";
    }
    if (!this.state.height) {
      if (str == "")
        str += "height";
      else
        str += ", height";
    }
    if (!this.state.date) {
      if (str == "")
        str += "date of birth";
      else
        str += ", date of birth";
    }
    if (str != "") {
      Alert.alert('Error', "Input field can not be empty: " + str,
        [{ text: 'OK' }])
      return false;
    }
    return true;
  }

  deletePet(petId) {
    Alert.alert(
      'Delete Pet',
      'Are you sure to delete this pet?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            this.petAPI.deletePetByPetId(petId, (res) => {
              if (res) {
                this.setState({
                  message: "Deleted successfully!",
                  successDialogVisible: true,
                });
                setTimeout(() => {
                  this.setState({
                    successDialogVisible: false,
                  });
                  this.props.navigation.goBack();
                }, 2000);
              }
              else {
                Alert.alert('Error', "Server error",
                  [{ text: 'Ok' }])
              }
            })
          }
        },
      ],
      { cancelable: false }
    )
  }

  get imageSource() {
    switch (this.state.species) {
      case "cat":
        return require('../assets/imgs/cat.png');
      case "dog":
        return require('../assets/imgs/dog.png');
      case "bird":
        return require('../assets/imgs/bird.png');
      default:
        return null
    }
  }
  render() {

    if (this.state.species) {
      var img = <Image resizeMode='contain' source={this.imageSource} style={styles.imgPet} />
    }
    else {
      img = null
    }

    return (
      <Block flex>
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
              Pet Profile
            </Text>
          </View>
        </ImageBackground>

        <ScrollView style={{ flex: 1, width: width, marginTop: 10}}>
          <ImageBackground source={imageCLothes} resizeMode='stretch' style={styles.clothesImage}> 
          </ImageBackground>

          <Block style={{flex: 1, width: width, marginLeft: 20, marginTop: 20, flexDirection: 'row'}}>
            <AntDesign name="shoppingcart" size={24} color="blue" />
            <Text style={{color: 'white', marginTop: 3}}> {" "} Product Information </Text>
          </Block>

          <Block style={styles.inforBlock}>
            <Block style={{flex: 1, width: width, marginLeft: 20, marginTop: 5, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Name: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.name} </Text>
            </Block>
            <Block style={{flex: 1, width: width, marginLeft: 20, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Height: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.height} </Text>
            </Block>
            <Block style={{flex: 1, width: width, marginLeft: 20, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Weight: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.weight} </Text>
            </Block>
            <Block style={{flex: 1, width: width, marginLeft: 20, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Used Time: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.usedTime} </Text>
            </Block>
            <Block style={{flex: 1, width: width, marginLeft: 20, marginBottom: 5, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Price: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.price} </Text>
            </Block>
          </Block>

          <Block style={{flex: 1, width: width, marginLeft: 20, marginTop: 20, flexDirection: 'row'}}>
            <AntDesign name="contacts" size={24} color="blue" />
            <Text style={{color: 'white', marginTop: 3}}> {" "} Contact </Text>
          </Block>
          <Block style={styles.inforBlock}>
            <Block style={{flex: 1, width: width, marginLeft: 20, marginTop: 5, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Seller: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.nameSeller} </Text>
            </Block>
            <Block style={{flex: 1, width: width, marginLeft: 20, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Phone number: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.phoneSeller} </Text>
            </Block>
            <Block style={{flex: 1, width: width, marginLeft: 20, marginBottom: 10, flexDirection: 'row'}}>
                <Text style={{color: '#363636', fontSize: 13}}> Address: </Text>
                <Text style={{color: '#363636', fontSize: 13}}> {this.state.addressSeller} </Text>
            </Block>

            <Text style={{
                color: '#363636', 
                fontSize: 17, 
                fontWeight: "bold", 
                marginBottom: 5, 
                alignSelf: 'center'}}> 
                Review 
            </Text>
            
            <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginBottom: 10 }} />
          
            <View style={{alignItems: 'center'}}>
              <StarRating
                name="small-rating" 
                caption="Small!"
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                starSize={30}
                // rating={this.state.starCount}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={'yellow'}
              />
            </View>
          </Block>

          <Block style={styles.buttonRow}>
            <Button style={styles.button} onPress={() => {this.addCareItem()}}>
              <Text bold size={12} color={"black"}>
                Add care
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

const imgs = {
  'cat': 'https://drive.google.com/open?id=1jWdUyCNEcycVt9qaY2DTctZTnXfmQ28U',
  'dog': 'https://drive.google.com/open?id=1iFH_6_qt8OFqHkSMvlC_QB2qFZu9HtIv',
  'bird': 'https://drive.google.com/open?id=1iFH_6_qt8OFqHkSMvlC_QB2qFZu9HtIv'
}

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
//   inputStyle: {
//     backgroundColor: "#282828"
//   },
//   button: {
//     width: width * 0.5,
//     marginTop: 25,
//     borderRadius: 10,
//   },
//   deleteButton: {
//     width: 100,
//     height: 30,
//     borderRadius: 15,
//     backgroundColor: "red",
//   },
//   buttonRow: {
//     width: width * 0.9,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignSelf: 'center',
//     marginTop: 5
//   },
//   textField: {
//     width: width * 0.9,
//     alignSelf: 'center',
//     marginTop: 5
//   },
//   inputIcons: {
//     marginRight: 12,
//   },
//   pickerIcon: {
//     marginRight: 10,
//     position: 'absolute',
//     paddingTop: 14,
//     paddingLeft: 15,
//     zIndex: 10,
//     elevation: 10
//   },
//   imgPet: {
//     width: 100,
//     height: 100,
//     alignSelf: 'center'
//   }
// });

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
    width: width,
    height: 200
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
});