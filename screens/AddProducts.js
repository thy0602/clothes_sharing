import React, { Component } from 'react';
import {
  Alert, KeyboardAvoidingView, Image,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker,
} from 'react-native';
import { Block, Text, theme, Input } from "galio-framework";
//import Input from "../components/Input";
import { Icon, Button } from "../components";
import { Images, argonTheme } from "../constants";
import { Avatar } from 'react-native-elements';
import { MaterialIcons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';
import * as ImagePicker from 'expo-image-picker';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");

export default class AddProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      size: "",
      height: "",
      weight: "",
      usedTime: "",
      priceItem: "",
      // species: "",
      // breed: "",
      // weight: "",
      // height: "",
      // date: "",
      successDialogVisible: false,
      image: null,
    };
    this.authAPI = new AuthAPI();
    this.petAPI = new PetAPI();
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({
        name: "",
        size: "",
        height: "",
        weight: "",
        usedTime: "",
        priceItem: "",
        // species: "",
        // breed: "",
        // weight: "",
        // height: "",
        // date: "",
        successDialogVisible: false,
      })
    })

  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

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

  createPet = async () => {
    if (!this.validateInput()) {
      return;
    }

    let customerId = await this.authAPI.retrieveCustomerId();

    const { date } = this.state;
    var d = date.split('-');
    var mydate = new Date(parseInt(d[0]), parseInt(d[1]) - 1, parseInt(d[2]), 0, 0, 0, 0);

    let pet = new Object({
      name: this.state.name,
      weight: parseFloat(this.state.weight).toFixed(1),
      height: parseFloat(this.state.height).toFixed(1),
      species: this.state.species,
      breed: this.state.breed,
      customerId: customerId,
      dateOfBirth: mydate
    })

    this.petAPI.createPet(pet, (res) => {
      if (res) {
        this.setState({
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

  render() {
    var todayDate = new Date().toISOString().slice(0, 10);

    let { image } = this.state;

    return (
      <Block flex>
      {/* <ImageBackground source={require("../assets/imgs/background2.gif")} resizeMode='cover' style={{ flex: 1, width: '100%', height: '100%' }}> */}
        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <Block>
            <MaterialIcons name='keyboard-backspace' size={40} style={styles.backArrow}
              onPress={() => this.props.navigation.goBack()} />
          </Block>
          <View style={styles.textHeader}>
            <Text color="#ffffff" size={30} style={{ fontFamily: 'ITCKRIST' }} >
              Add Products
            </Text>
          </View>
        </ImageBackground>


        <Dialog
          visible={this.state.successDialogVisible}
          dialogStyle={{
            borderRadius: 15, backgroundColor: "#232124",
            borderWidth: 4, width: width * 0.6,
            alignSelf: 'center',
          }}
          onTouchOutside={() => this.setState({ successDialogVisible: false })} >
          <Block flex middle style={{ flexDirection: 'row' }}>
            <AntDesign name='checkcircleo' size={25} color='#1df232' style={{ marginRight: 10, marginBottom: -4 }} />
            <Text bold style={{ color: '#E1E1E1', fontSize: 16, marginBottom: -4 }}>
              Created successfully
                  </Text>
          </Block>
        </Dialog>

        <ScrollView style={{ flex: 1, width: width, marginTop: 10 }} keyboardShouldPersistTaps="handled">

          <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20 }}>
            <Button style={styles.buttonPick} onPress={this._pickImage}>
              <Text bold size={12} color={"black"}>
              Pick clothes image
              </Text>
            </Button>
          </Block>

          <Block style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </Block> 

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            enabled
          >
            <Block flex middle>
              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="black" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Name
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                {/* <Input
                  borderless
                  placeholder="Enter clothes name"
                  onChangeText={(name) => { this.setState({ name }) }}
                  value={this.state.name}
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.8)' }}
                /> */}
                <Input
                  placeholder="Enter clothes name"
                  style={{ borderColor: "black" }}
                  onChangeText={(name) => { this.setState({ name }) }}
                  value={this.state.name}
                  placeholderTextColor="grey"
                />
              </View>

              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="black" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Size
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                {/* <Input
                  borderless
                  placeholder="Enter size"
                  onChangeText={(size) => { this.setState({ size }) }}
                  value={this.state.size}
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.8)' }}
                /> */}
                <Input
                  placeholder="Enter size"
                  style={{ borderColor: "black" }}
                  onChangeText={(size) => { this.setState({ size }) }}
                  value={this.state.size}
                  placeholderTextColor="grey"
                />
              </View>

              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="black" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Height
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                {/* <Input
                  borderless
                  placeholder="Enter height"
                  onChangeText={(height) => { this.setState({ height }) }}
                  value={this.state.height}
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.8)' }}
                /> */}
                <Input
                  placeholder="Enter height"
                  style={{ borderColor: "black" }}
                  onChangeText={(height) => { this.setState({ height }) }}
                  value={this.state.height}
                  placeholderTextColor="grey"
                />
              </View>

              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="black" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Weight
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                {/* <Input
                  borderless
                  placeholder="Enter weight"
                  onChangeText={(weight) => { this.setState({ weight }) }}
                  value={this.state.weight}
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.8)' }}
                /> */}
                <Input
                  placeholder="Enter weight"
                  style={{ borderColor: "black" }}
                  onChangeText={(weight) => { this.setState({ weight }) }}
                  value={this.state.weight}
                  placeholderTextColor="grey"
                />
              </View>

              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="black" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Used Time
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                {/* <Input
                  borderless
                  placeholder="Enter clothes used time"
                  onChangeText={(usedTime) => { this.setState({ usedTime }) }}
                  value={this.state.usedTime}
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.8)' }}
                /> */}
                <Input
                  placeholder="Enter clothes used time"
                  style={{ borderColor: "black" }}
                  onChangeText={(usedTime) => { this.setState({ usedTime }) }}
                  value={this.state.usedTime}
                  placeholderTextColor="grey"
                />
              </View>

              <Block style={{ width: width * 0.9, alignSelf: 'center', marginTop: 15 }}>
                <Text color="black" size={18} style={{ marginLeft: 15, fontWeight: 'bold' }}>
                  Price
                  </Text>
              </Block>
              <View width={width * 0.9} style={{ alignSelf: 'center' }}>
                {/* <Input
                  borderless
                  placeholder="Enter exchange price"
                  onChangeText={(price) => { this.setState({ price }) }}
                  value={this.state.price}
                  style={{ backgroundColor: 'rgba(111, 111, 111, 0.8)' }}
                /> */}
                <Input
                  placeholder="Enter exchange price"
                  style={{ borderColor: "black" }}
                  onChangeText={(price) => { this.setState({ price }) }}
                  value={this.state.price}
                  placeholderTextColor="grey"
                />
              </View>

              <Block middle style={{ elevation: 1, height: height * 0.2, marginTop: -20 }}>
                {/* <Button style={styles.buttonAdd} onPress={() => {}}>
                  <Text bold size={12} color={"black"}>
                    Add
                  </Text>
                </Button> */}
                <Button color="primary" style={styles.button}
                  onPress={() => {}}
                >
                  <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                    Add
                    </Text>
                </Button>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </ScrollView>
      {/* </ImageBackground> */}
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
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
  },
  inputStyle: {
    backgroundColor: "#282828"
  },
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  },
  pickerIcon: {
    marginRight: 10,
    position: 'absolute',
    paddingTop: 14,
    paddingLeft: 15,
    zIndex: 10,
    elevation: 10
  },
  textField: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 5
  },


  //New
  buttonPick: {
    width: 130,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#a0a7fa"
  },
  buttonAdd: {
    width: 50,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#a0a7fa"
  }
});