import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Picker,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input } from "../components";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Loader from '../components/Loader';
import NotificationAPI from '../api/NotificationAPI'
import AuthAPI from '../api/AuthAPI'
import PetAPI from '../api/PetAPI'
import VendorAPI from "../api/VendorAPI";

import NotiCard from "../components/card/NotiCard";

const { width, height } = Dimensions.get("screen");

class Activities extends React.Component {

  state = {
    notifications: [],
    loading: true,
    notiData: []
  }

  constructor(props) {
    super(props)
    this.state = { address: "", notifications: [] }
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      <Block flex /*style={styles.home}*/>
          {/* {loader} */}

          <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
            <View style={styles.textHeader}>
              <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
                Activities
              </Text>
            </View>
          </ImageBackground>

          <ScrollView style={{ flex: 1, width: width}}>

            <Block flex style={{ marginTop: 10, marginBottom: 10, width: 0.7*width, alignSelf: 'center'}}>
              <NotiCard 
                avatarSrc={require("../assets/imgs/off-shoulder.jpg")}
                product="Blue Off Shoulder"
                title="Posted"
                caption="7h35 1-7-2020"
                price="100,000 VND" 
              />
            </Block>

            <Block flex style={{ marginTop: 10, marginBottom: 10, width: 0.7*width, alignSelf: 'center'}}>
              <NotiCard 
                avatarSrc={require("../assets/imgs/off-shoulder.jpg")}
                product="Blue Off Shoulder"
                title="Sold"
                caption="15h45 15-7-2020"
                price="100,000 VND" 
              />
            </Block>
          </ScrollView>

          <Ionicons name='ios-add-circle' size={60} color='#511efa' style={styles.addIcon} 
                    onPress={() => this.props.navigation.navigate('AddProducts')}/>
      </Block>
    );
  }
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const styles = StyleSheet.create({
  home: {
    width: width,
    //paddingBottom: 20
  },
  headerImage: {
    width: width,
    height: 80
  },
  textHeader: {
    alignItems: 'center', 
    marginTop: 7
  },
  inputIcons: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  agenda: {
    width: "90%",
    borderRadius: 15,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    flexDirection: 'row',
    marginBottom: 20
  },
  notiTxt: {
    fontWeight: '100',
    fontSize: 17,
    color: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center',
    fontFamily: 'opensans',
    paddingLeft: 10
  },
  leftIcon: {
    backgroundColor: "#520099",
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 25,
    alignItems: 'center'
  },
  time: {
    fontFamily: 'opensans',
    fontSize: 14,
    color: '#cccccc',
    paddingLeft: 10
  },


  //New
  addIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Activities;
