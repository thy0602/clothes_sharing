import React, { Component } from 'react';
import {
  Alert, KeyboardAvoidingView, Image,
  View, StyleSheet, Dimensions, ImageBackground, ScrollView, Picker, Keyboard
} from 'react-native';
import { Block, Text, theme } from "galio-framework";
import { Icon, Button } from "../components";
import Input from "../components/Input";
import { Images, argonTheme } from "../constants";
import { MaterialIcons, SimpleLineIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import DatePicker from 'react-native-datepicker';
import { Dialog } from 'react-native-simple-dialogs';
import ToggleSwitch from 'toggle-switch-react-native';

// import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";

//import {BackgroundColor} from 'react-native-background-color';
import StarRating from 'react-native-star-rating';

import AuthAPI from '../api/AuthAPI';
import PetAPI from '../api/PetAPI';

const { width, height } = Dimensions.get("screen");
const imageEvent = require("../assets/imgs/clothes-event.jpg")

const nameItem = "Áo ấm cho em";
const contentItem = "Với mong muốn mang đến cho các em nhỏ một mùa đông ấm áp, một chút hơi ấm xua tan cái giá lạnh vùng cao đang về, Vietravel đã thực hiện các chương trình du lịch kết hợp từ thiện mang tên “Áo ấm cho em”. \n\nĐặc biệt, chương trình này là hành trình du lịch từ thiện, hướng cho du khách có được niềm vui, sự sẻ chia với những mảnh đời khó khăn và tìm được giá trị của cuộc sống trong mỗi chuyến đi."
const organizationItem = "Vietravel and Volunteer Team - Áo Ấm Cho Em"
const locationItem = "* Phòng 302 - Nhà tập ĐH Ngoại thương Hà Nội. 0974397179 (Ms.Linh) - 0983243991 (Ms.Yến).\n\n*Phòng 203 - KTX HV Ngoại giao. 0982728665 (Ms.Trang) - 0944367603 (Ms.Lan).\n\n*Phòng 39 - Nhà 3 - KTX ĐH Kinh tế Quốc Dân. 01656094425 (Ms.Hạnh) - 0987643520 (Mr.Định).\n\n*Phòng 110 - Nhà B - KTX HV Ngân hàng. 1652229303 (Ms.Thảo).\n\n\n Quyên góp tiền mặt xin gửi về:\nTên tài khoản: Phạm Ngọc Bích - Ngân hàng Vietcombank \nSố tài khoản: 0491001919452 - SDT: 01679056073\n\n\n Mọi chi tiết liên hệ: \nLê Hải Yến: 0983 243 991. Email: yenlh.tec@gmail.com\nNguyễn Duy Đức: 0983 404 469. Email: nguyenduyduc.ftu@gmail.com"


const starItem = 3.5



export default class EventDetails extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      content: "",
      organization: "",
      location: "",
      keyboardHeight: 0,

      starCount: 0
    };
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
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
    // this.didFocus = this.props.navigation.addListener('willFocus', () => {
    //   this.setState({ loading: true }, () => {
    //     this.setData();
    //   })
    // })
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  }

  componentWillUnmount() {
    // this.didFocus.remove();
    this.keyboardDidShowListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }

  setData() {
    this.setState({
      name: nameItem,
      content: contentItem,
      organization: organizationItem,
      location: locationItem,
      // weight: weightItem,
      // usedTime: usedTimeItem,
      // price: priceItem,
      // nameSeller: nameSellerItem,
      // phoneSeller: phoneSellerItem,
      // addressSeller: addressSellerItem,
      starCount: starItem
    })
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
            <Text color="#ffffff" size={30} style={{ fontFamily: 'Roboto' }} >
              Event Details
            </Text>
          </View>
        </ImageBackground>

        
        <ScrollView style={{ marginBottom: 15 }}>
          <Block flex={1} style={styles.imageBlock}>
            <ImageBackground source={imageEvent} resizeMode='stretch' style={styles.eventImage}> 
              </ImageBackground>
          </Block>

          <Text style={styles.headerTxt}> {nameItem} </Text>

          <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginTop: 10, marginBottom: 10 }} />

            <Block flex={1} style={styles.booking}>
                <Text style={styles.headerTxt}>Event info</Text>
                  <View style={styles.row}>
                    <Text style={styles.value}> {contentItem}</Text>
                  </View>

                  <Text style={styles.headerTxt}>Organization</Text>
                  <View style={styles.row}>
                    <Text style={styles.value}> {organizationItem} </Text>
                  </View>

                  <Text style={styles.headerTxt}>Collection Points</Text>
                  <View style={styles.row}>
                    <Text style={styles.value}> {locationItem} </Text>
                  </View>

                  <Text> {'\n'} </Text>

                  
            </Block>

            <View style = {{borderWidth: 0.5, borderColor:'green', marginLeft:50, marginRight:50, marginBottom: 10 }} />
          
            <Text style={{
                color: '#363636', 
                fontSize: 17, 
                fontWeight: "bold", 
                marginBottom: 5, 
                alignSelf: 'center'}}> 
                Confirmation
            </Text>

            <Block flex={0.5} center>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                //keyboardVerticalOffset={this.state.keyboardHeight}
                keyboardVerticalOffset={200}
                enabled
              >
                <Block width={width * 0.9} style={{ marginTop: 10, marginBottom: 15 }}>
                  <Input
                      borderless
                      placeholder="Enter verify code from organization"
                      onChangeText={(email) => { this.setState({ email }) }}
                      value={this.state.email}
                      // iconContent={
                      //   <Icon
                      //     size={16}
                      //     color={'white'}
                      //     name="ic_mail_24px"
                      //     family="ArgonExtra"
                      //     style={styles.inputIcons}
                      //   />
                      // }
                      style={{ backgroundColor: 'rgba(192, 192, 192, 0.8)' }}
                    />
                </Block>
              </KeyboardAvoidingView>
            </Block>
          

            <Block style={styles.buttonRow}>
              {/* <Button style={styles.button} onPress={() => {this.addCareItem()}}>
                <Text bold size={12} color={"black"}>
                  Add care
                </Text>
              </Button> */}
              <Button style={styles.button} onPress={() => {this.goChat()}}>
                <Text bold size={12} color={"black"}>
                  Confirm
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
  eventImage: {
    width: "100%",
    height: 300
  },
  inforBlock: {
    backgroundColor: 'white',
    width: width,
    //height: 200,
    marginTop: 5
  },
  buttonRow: {
    width: width, 
    flexDirection: 'row', 
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    // marginBottom: 10,
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