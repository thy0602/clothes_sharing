import React, { Fragment, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  ScrollView, 
  Platform,
  Alert
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import { Button, 
  Icon, 
  Input,
 } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Avatar } from 'react-native-elements';

import { MaterialIcons, Entypo, AntDesign, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { ViewPager } from 'rn-viewpager'

import StepIndicator from 'react-native-step-indicator'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import SearchableDropdown from 'react-native-searchable-dropdown';
import CustomeSearchableDropdown from '../components/CustomSearchableDropdown';
import DatePicker from 'react-native-datepicker';
import { Dialog, ConfirmDialog } from 'react-native-simple-dialogs';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Polyline } from '@mapbox/polyline';
import { Marker, Callout }from 'react-native-maps';
import MapView from 'react-native-maps';
import Tooltip from 'react-native-walkthrough-tooltip';

// import CalendarView from './CalendarView';
import Loader from '../components/Loader';

import CustomizedCard from "../components/card/CustomizedCard";

const { width, height } = Dimensions.get("screen");

class Events extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
    };
  }


  async componentDidMount() {
    this.didFocus = this.props.navigation.addListener('willFocus', () => {
      this.setState({
        currentPage: 0,
      })
    })
  }

  componentWillUnmount() {
    this.didFocus.remove();
  }

  goEventDetails(item){
    this.props.navigation.navigate('EventDetails',{item: item});  
 }


  showMap = () => {
    const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#746855"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#242f3e"
          }
        ]
      }
    ];
  }


  render() {
    const { navigation } = this.props;

    if (this.state.isLoading) {
      var loader = <Loader />
    }

    return (
      <Block flex>
        {/* {loader} */}

        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <View style={styles.textHeader}>
          <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
              Events
          </Text>
        </View>
        </ImageBackground>

        <ScrollView style={{ flex: 1, width: width}}>
          <TouchableOpacity onPress={() => {this.goEventDetails("item")}}>
            <Block flex style={{ marginTop: 10, marginBottom: 10, width: 0.7*width, alignSelf: 'center'}}>
              <CustomizedCard 
                imageSrc={require("../assets/imgs/clothes-event.jpg")}
                // avatarSrc={{uri: "http://i.pravatar.cc/100?id=skater"}}
                avatarSrc={require("../assets/imgs/organization-logo.jpg")}
                product="Áo Ấm Cho Em"
                title="Volunteer Team"
                caption="12/10 - 26/10"
                location="Hà Nội" 
              />
            </Block>
          </TouchableOpacity>
          
        </ScrollView>
        
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  // headerImage: {
  //   width: width,
  //   height: 200,
  //   borderRadius: 4,
  // },
  // home: {
  //   width: width,
  //   paddingBottom: 120
  // },
  // headerImage: {
  //   width: width,
  //   height: 200
  // },
  // textHeader: {
  //   alignItems: 'center', 
  //   marginTop: 7
  // },
  backArrow: {
    left: 10, 
    top: 10, 
    color: 'white', 
    position: 'absolute'
  },
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
  socialConnect: {
    backgroundColor: "#404957", //argonTheme.COLORS.WHITE
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  button: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  },
  button2: {
    width: width * 0.3,
    marginTop: 25,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    marginVertical: 65,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#999999'
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f'
  },
  map: {
    //borderRadius: 20,
  },
  booking: {
    backgroundColor: "rgba(60, 60, 60, 0.9)",
    borderRadius: 15,
    width: "95%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTxt: {
    fontFamily: "opensans",
    fontSize: 25,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: "400",
    color: 'white'
  },
  row:{
    textAlign: "left",
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    //paddingTop: 10,
  },
  detailInfo: {
    width: "100%",
  },
  field:{
    fontWeight: '500',
    fontFamily: 'opensans',
    fontSize: 17,
    color: 'white'
  },
  value: {
    fontFamily: 'opensans',
    fontWeight: '300',
    marginLeft: 20,
  },
  cancelBtn: {
    alignSelf: 'center', 
    width: 100,
    marginTop: 5
  },
  backBtn: {
    position: 'absolute', 
    marginTop: 50, 
    marginLeft: 20,
    alignSelf: 'flex-start',
    color: 'white'
  },
  home: {
    width: width,    
    marginTop: 0,
    paddingBottom: 20
  },
  warningText: {
    fontFamily: 'opensans',
    fontSize: 15,
    color: '#ff1414'
  },
  tooltipStyle: {
    backgroundColor: "rgba(60, 60, 60, 0.9)", 
    flexDirection: "row",
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  //New
  headerImage: {
    width: width,
    height: 80
  },
  textHeader: {
    alignItems: 'center', 
    marginTop: 7
  },
});

export default Events;
