import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  View,
  ScrollView
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import AuthAPI from '../api/AuthAPI'
import UserProfileAPI from '../api/UserProfileAPI'
import StarRating from 'react-native-star-rating';
import Users from '../constants/User.js';
const { width, height } = Dimensions.get("screen");

const nameItem = "White dress";
const sizeItem = "M";
const heightItem = "1m5 - 1m6"
const weightItem = "45-55 kg"
const usedTimeItem = "2 years"
const priceItem = "100,000 VND"

const nameSellerItem = "Phạm Nguyên Minh Thy"
const phoneSellerItem = "0928299998"
const addressSellerItem = "15 Nguyễn Trãi, phường 14, Q.5, TP.HCM"

const FONT_SIZE = 15;
const BASE = 16;

class MyProfile extends React.Component {
  state = {
    edit: false,
    popUpDialog: false,
    firstName: "",
    email: "",
    lastName: "",
    mobile: "",
    question: "",
    popUpType: 0,
    keyboardHeight: 0
  }

  constructor(props) {
    super(props);
    this.currentUser = 2;
    this.users = Users;
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }

  retrieveData(userId) {
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i] === userId) {
        this.user = this.users[i];
        return;
      }
    }
  }

  logout() {
    this.props.navigation.navigate('Account');
  }

  clickLogout() {
    Alert.alert('Are you sure?', 'Do you want to log out?', [
      {
        text: 'OK',
        onPress: this.logout
      },
      {
        text: 'Cancel'
      }
    ]);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Block flex center style={styles.home}>
          
          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                Your Profile
              </Text>
            </View>
          </ImageBackground>

          <ScrollView style={{marginTop: 5}}>

            <Block flex={1} style={styles.booking}>
              <Text style={styles.headerTxt}>Your information</Text>
              <View style={styles.detailInfo}>
                <View style={styles.row}>
                  <Text style={styles.field}>Name:
                      <Text style={styles.value}> {nameSellerItem}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Phone number:
                      <Text style={styles.value}> {phoneSellerItem}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Email:
                      <Text style={styles.value}> {'pnmthy0602@gmail.com'}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Address:
                      <Text style={styles.value}> {addressSellerItem}</Text>
                  </Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.field}>Sharing point:
                      <Text style={styles.value}> {"40"}</Text>
                  </Text>
                </View>

                <Text style={styles.headerTxt}>Reliability</Text>

                <View style={{alignItems: 'center'}}>
                  <StarRating
                    name="small-rating" 
                    caption="Small!"
                    disabled={true}
                    maxStars={5}
                    rating={3.5}
                    starSize={30}
                    // rating={this.state.starCount}
                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                    fullStarColor={'yellow'}
                  />
                </View>

                <Text> {'\n'} </Text>
              </View>
            </Block>

            <Block flex={0.1} middle style={{ marginBottom: height * 0.1 }}>
              <Button style={styles.passwordBtn} onPress={(event) => { this.clickLogout(event) }}>
                <Text bold size={16} color={argonTheme.COLORS.GREY}>
                  Logout
                </Text>
              </Button>
            </Block>
          </ScrollView>

          <Ionicons name='ios-add-circle' size={60} color='#511efa' style={styles.addIcon} 
                    onPress={() => this.props.navigation.navigate('AddProducts')}/>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: 80
  },
  avatar: {
    width: BASE * 2.5,
    height: BASE * 2.5,
    borderRadius: BASE * 1.25,
  },
  textHeader: {
    alignItems: 'center', 
    marginTop: 7
  },
  // headerImage: {
  //   width: width,
  //   height: 90,
  //   justifyContent: 'flex-start',
  //   borderRadius: 4,
  //   position: 'absolute',
  // },
  registerContainer: {
    width: width * 0.9,  //0.9
    height: height * 0.78,
    backgroundColor: "#05060A", //#F4F5F7
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  inputIcons: {
    marginRight: 12,
  },
  logoutIcon: {
    color: 'red',
    fontWeight: '200',
  },
  action: {
    width: "90%",
    alignSelf: 'center',
    marginTop: 10
  },
  logoutTxt: {
    color: 'red',
    marginLeft: 5
  },
  editIcon: {
    color: 'white',
    fontWeight: '200',
    textAlign: 'left'
  },
  editTxt: {
    color: 'black',
    marginLeft: 5,
    textAlign: 'left'
  },
  passwordBtn: {
    marginTop: 15,
    width: 60,
    height: 30,
    backgroundColor: 'rgba(128, 128, 192, 0.8)'
  },
  picker: {
    width: '100%',
    paddingBottom: 0,
    backgroundColor: 'transparent',
    paddingLeft: 0,
    transform: [{ scaleX: 0.77 }, { scaleY: 0.77 }],
    position: 'absolute',
    color: "#cccccc"
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

  //New
  addIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default MyProfile;
