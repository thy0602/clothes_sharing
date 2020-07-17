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


export default class PetProfile extends React.Component {
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
    return (
      <Block flex>
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
              Chat
            </Text>
          </View>
        </ImageBackground>
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