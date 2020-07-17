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
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import AuthAPI from '../api/AuthAPI'
import UserProfileAPI from '../api/UserProfileAPI'
import StarRating from 'react-native-star-rating';

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
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    this.authAPI = new AuthAPI();
    this.userProfileAPI = new UserProfileAPI();
    this.retrieveData = this.retrieveData.bind(this);
    this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
    this.clickUpdate = this.clickUpdate.bind(this);
    this.handleChoice = this.handleChoice.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.customer = new Object();
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({ loading: true }, () => {
        this.retrieveData();
      })
    })
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  }

  componentWillUnmount() {
    this.didFocus.remove();
    this.keyboardDidShowListener.remove();
  }

  _keyboardDidShow(e){
    this.setState({keyboardHeight: e.endCoordinates.height});
  }

  async retrieveData(user) {
    let customerId = await this.authAPI.retrieveCustomerId();

    this.userProfileAPI.getUserById(customerId, (userProfile) => {
      this.customer = userProfile;
      this.setState({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        email: userProfile.email,
        mobile: userProfile.mobile
      })
    })
  }

  async logout() {
    await this.authAPI.clearToken();
    this.props.navigation.navigate('Account');
  }

  clickLogout() {
    this.setState({ popUpDialog: true, question: 'Do you want to logout?', popUpType: 1 })
  }

  clickUpdate() {
    this.setState({ popUpDialog: true, question: 'Do you want to update profile?', popUpType: 2 })
  }

  handleUpdateInfo() {
    if (!this.validateInput()) {
      return;
    }
    this.customer.firstName = this.state.firstName;
    this.customer.lastName = this.state.lastName;
    this.customer.mobile = this.state.mobile;
    this.userProfileAPI.updateUserById(this.customer, this.customer._id, (res) => {
      if (res == true) {
        Alert.alert('Successfully', "Your profile is updated successfully!",
          [{ text: 'OK' }]);
        this.setState({ edit: false })
      }
    })
  }

  validateInput() {
    if (!this.state.mobile || !this.state.firstName || !this.state.lastName) {
      Alert.alert('Error', "Input field can not be empty",
        [{ text: 'OK' }])
      return false;
    }
    return true;
  }

  handleChoice(bool) {
    this.setState({ popUpDialog: false })
    if (bool) {
      if (this.state.popUpType == 2) {
        this.handleUpdateInfo();
      }
      else if (this.state.popUpType == 1) {
        this.logout();
      }
    }
  }

  render() {
    const { navigation } = this.props;

    if (this.state.edit) {
      var updateInfo =
        <Button style={styles.loginButton} onPress={this.clickUpdate}>
          <Text bold size={16} color={argonTheme.COLORS.WHITE}>
            Update Info
        </Text>
        </Button>
    }
    else {
      updateInfo = null
    }

    return (
      <Block flex center style={styles.home}>

          <Popup visible={this.state.popUpDialog} choice={this.handleChoice} question={this.state.question} />

          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                Your Profile
              </Text>
            </View>
          </ImageBackground>

          <ScrollView style={{marginTop: 5}}>
            {/* <Block flex={0.8} row style={styles.action} >
              <View style={{ alignContent: 'flex-start', flex: 1, flexDirection: 'row' }} onTouchStart={(event) => { this.clickLogout(event) }}>
                <MaterialCommunityIcons name="logout-variant" size={30} style={styles.logoutIcon}></MaterialCommunityIcons>
                <Text size={20} style={styles.logoutTxt}>Logout</Text>
              </View>

              <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                <ToggleSwitch
                  isOn={this.state.edit}
                  onColor={"#511efa"}
                  offColor={"#999999"}
                  onToggle={(isOn) => { this.setState({ edit: isOn }) }}
                />
                <Text size={20} style={styles.editTxt}>Edit</Text>
              </View>
            </Block> */}

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
              {updateInfo}
              <Button style={styles.passwordBtn} onPress={(event) => { this.clickLogout(event) }}>
                <Text bold size={16} color={argonTheme.COLORS.GREY}>
                  Logout
                </Text>
              </Button>
            </Block>

            {/* <Block flex={0.4} center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={this.state.keyboardHeight}
                enabled
              >
                <Block width={width * 0.9} style={{ marginTop: 20, marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="First name:"
                    onChangeText={(firstName) => { this.setState({ firstName }) }}
                    value={this.state.firstName}
                    editable={this.state.edit}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="Last name:"
                    onChangeText={(lastName) => { this.setState({ lastName }) }}
                    value={this.state.lastName}
                    editable={this.state.edit}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="hat-3"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="Email"
                    value={this.state.email}
                    editable={false}
                    iconContent={
                      <Icon
                        size={16}
                        color={'#ffffff'}
                        name="ic_mail_24px"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={{ backgroundColor: '#1f1f1f' }}
                  />
                </Block>

                <Block width={width * 0.9} style={{ marginBottom: 15 }}>
                  <Input
                    borderless
                    placeholder="Phone number"
                    editable={this.state.edit}
                    onChangeText={(mobile) => { this.setState({ mobile }) }}
                    value={this.state.mobile}
                    iconContent={
                      <MaterialIcons
                        size={16}
                        color={'#ffffff'}
                        name="phone"
                        family="ArgonExtra"
                        style={styles.inputIcons}
                      />
                    }
                    style={this.state.edit ? { backgroundColor: '#333333' } : { backgroundColor: '#1f1f1f' }}
                  />
                </Block>
                <Block flex={0.1} middle style={{ marginBottom: height * 0.1 }}>
                  {updateInfo}
                  {/* <Button style={styles.passwordBtn} onPress={() => { navigation.navigate("ChangePassword") }}> */}
                  {/* <Button style={styles.passwordBtn} onPress={(event) => { this.clickLogout(event) }}>
                    <Text bold size={16} color={argonTheme.COLORS.GREY}>
                      Logout
                    </Text>
                  </Button>
                </Block>

                <Block flex middle style={{ elevation: 1, height: height * 0.15 }} />
              </KeyboardAvoidingView> */}
            {/* </Block> */}
          </ScrollView>
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
});

export default MyProfile;
