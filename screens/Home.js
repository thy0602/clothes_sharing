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
  Image,
  TouchableOpacity
} from "react-native";
import { Block, Text, theme, Card } from "galio-framework";
import { argonTheme } from "../constants";
import { Button, Icon, Input/*, CardGalio*/ } from "../components";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import ToggleSwitch from 'toggle-switch-react-native';
import Popup from '../components/Popup';
import Loader from '../components/Loader';
import { Avatar } from "react-native-elements";

import NotiCard from "../components/card/NotiCard";

import CustomizedCard from "../components/card/CustomizedCard";

import AuthAPI from "../api/AuthAPI";
import PetAPI from "../api/PetAPI";

import whitedress from "../assets/imgs/white-dress.jpg";

const { width, height } = Dimensions.get("screen");



const imageClothes = require("../assets/imgs/white-dress.jpg")

class Home extends React.Component {
  state = {
    popUpDialog: false,
    petList: [],
    loading: true,
  }

  constructor(props) {
    super(props);
  }


  goClothesDetails(item){
    this.props.navigation.navigate('ClothesDetails',{pet: item});  
  }

  render() {
    const { navigation } = this.props;

    if (this.state.loading) {
      var loader = <Loader />
    }

    return (
      <Block flex>
        {/* {loader} */}

        <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
          <View style={styles.textHeader}>
          <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
              Sharing Clothes
          </Text>
        </View>
        </ImageBackground>

        <ScrollView style={{ flex: 1, width: width}}>
            <Block flex style={{ marginTop: 10, marginBottom: 10, width: 0.7*width, alignSelf: 'center'}}>
              <NotiCard 
                //imageSrc={require("../assets/imgs/white-dress.jpg")}
                // avatarSrc={{uri: "http://i.pravatar.cc/100?id=skater"}}
                //avatarSrc={require("../assets/imgs/pikachu.jpg")}
                product="White Dress"
                title="Phạm Nguyên Minh Thy"
                caption="2 days"
                location="Nguyễn Trãi, HCM" 
              />
            </Block>
          <TouchableOpacity onPress={() => {this.goClothesDetails("item")}}>
            <Block flex style={{ marginTop: 10, marginBottom: 10, width: 0.7*width, alignSelf: 'center'}}>
              <CustomizedCard 
                imageSrc={require("../assets/imgs/white-dress.jpg")}
                // avatarSrc={{uri: "http://i.pravatar.cc/100?id=skater"}}
                avatarSrc={require("../assets/imgs/pikachu.jpg")}
                product="White Dress"
                title="Phạm Nguyên Minh Thy"
                caption="2 days"
                location="Nguyễn Trãi, HCM" 
              />
            </Block>
          </TouchableOpacity>
          

          <TouchableOpacity onPress={() => {this.goClothesDetails("item")}}>
            <Block flex style={{ marginTop: 10, marginBottom: 10, width: 0.7*width, alignSelf: 'center'}}>
              <CustomizedCard 
                imageSrc={require("../assets/imgs/white-dress.jpg")}
                // avatarSrc={{uri: "http://i.pravatar.cc/100?id=skater"}}
                avatarSrc={require("../assets/imgs/pikachu.jpg")}
                product="White Dress"
                title="Phạm Nguyên Minh Thy"
                caption="2 days"
                location="Nguyễn Trãi, HCM" 
              />
            </Block>
          </TouchableOpacity>
        </ScrollView>
        
      </Block>

      // <Block flex center style={styles.home}>
      //   <ImageBackground
      //     source={require("../assets/imgs/background2.gif")}
      //     style={{ width, height, zIndex: 1 }}
      //   >

      //     {loader}

      //     <ImageBackground source={require("../assets/imgs/headerBooking.png")} resizeMode='stretch' style={styles.headerImage}>
      //       <View style={styles.textHeader}>
      //         <Text color="#ffffff" size={30} style={{fontFamily: 'ITCKRIST'}} >
      //           Your pets
      //         </Text>
      //       </View>
      //     </ImageBackground>

      //     <ScrollView style={{marginTop: 5}}>
      //       <View style={{ marginBottom: 10 }}>
      //         <Block center>
      //           {this.renderCard()}
      //         </Block>
      //       </View>

      //       {/* <Block style={styles.typesRow}>
      //         <TouchableOpacity onPress={this.goClothesDisplay("woman")}>
      //           <View style={{color:'white', width: width / 3, height: 50}}>
      //             <Text style={{color: 'black'}}></Text>
      //           </View>
      //         </TouchableOpacity>
      //       </Block> */}

      //       <Block style={{height: height * 0.2}} />
      //     </ScrollView>
      //     {/* <Ionicons name='ios-add-circle' size={60} color='#511efa' style={styles.addIcon} 
      //               onPress={() => this.props.navigation.navigate('AddPet')}/> */}
      //   </ImageBackground>
      // </Block>
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
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardService: {
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    alignItems: "center",
    height: 160,
    alignSelf: "center",
    borderRadius: 10,
    padding: 0,
    flex: 0.5
  },
  petIcon: {
    marginTop: 20,
    color: '#885DDA'
  },
  cardFooter: {
    justifyContent: 'center',
    marginTop: 12,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    width: "100%",
    height: 38
  },
  priceTxt: {
    marginTop: 15,
    fontFamily: "opensans",
    fontSize: 16,
    color: '#fafafa'
  },
  itemTxt: {
    fontFamily: 'opensans',
    color: '#fafafa',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500'
  },
  addBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 2,
    backgroundColor: "#FF9B70",
    position: 'absolute',
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    right: 30,
    bottom: 100
  },
  addIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 120,
    right: 20,
  },
  button: {
    width: 60,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#a0a7fa"
  },
  buttonRow: {
    width: 130, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 20
  },




  cardImageRadius: {
    // borderRadius: width*0.8,
    width: width*0.9,
    height: 200
  },
  card: {
    width: width*0.9,
    height: 100,
    alignSelf: 'center'
  },
  imageBlock: {
    // padding: theme.SIZES.BASE / 2,
    width: 0.9*width,
    height: 200,
    // backgroundColor: 'blue'
  }
});

export default Home;