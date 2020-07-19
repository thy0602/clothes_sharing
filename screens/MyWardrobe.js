import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Block, Text} from "galio-framework";
import { Button, Icon, Input/*, CardGalio*/ } from "../components";
import CustomizedCard from "../components/card/CustomizedCard";
import Users from '../constants/User.js'
import Users from '.../constants/Users.js'
import Clothes from '../constants/Cloth.js';
const { width, height } = Dimensions.get("screen");

class MyWardrobe extends React.Component {
  constructor(props) {
    super(props);
    this.clothes = Clothes;
  }
  componentDidMount() {
    this._loadData();
  }
  _loadData = async () => {
    await AsyncStorage.getItem('currentUser').then(res => this.currentUser = JSON.parse(res));
    try {
      await AsyncStorage.getItem('clothes').then(res => {
        this.clothes = JSON.parse(res);
        if (this.clothes === null)
          this.clothes = Clothes;
      })
    } catch (error) {
      this.clothes = Clothes;
      await AsyncStorage.setItem('clothes', JSON.stringify(Clothes));
    }
  }
  findSellerFromId(seller) {
    let users = Users
    for (let i = 0; i < users.length; ++i) {
      if (users[i].id === seller)
        return users[i];
    }
  }
  newsfeed() {
    let nf = [];
    for (let i = 0; i < this.clothes.length; ++i) {
      let cloth = this.clothes[i];
      if (cloth.seller === 2) {
        let view = (
        <View>
          <TouchableOpacity 
            key={`image${i}`}
            onPress={() => {this.goClothesDetails(cloth)}}>
            <Block flex style={styles.cardContainer}>
              <CustomizedCard 
                imageSrc={{uri: cloth.imgSource}}
                avatarSrc={{uri: mySeller.avatar}}
                product={cloth.name}
                title={mySeller.name}
                price={cloth.price}
                location={mySeller.address}/>
            </Block>
          </TouchableOpacity>
          <Button title={cloth.available ? 'Invalidate' : 'Validate'}
                backgroundColor={cloth.available ? 'green' : 'gray'}/>
        </View>
        )
        nf.push(view);
      }
    }
    return nf;
  }
  render() {
    const { navigation } = this.props;
    return (
      <Block flex>
        <ImageBackground
          source={require("../assets/imgs/headerBooking.png")}
          resizeMode='stretch'
          style={styles.headerImage}>
          <View
            style={styles.textHeader}>
            <Text
              color="#ffffff" 
              size={30} 
              style={{fontFamily: 'ITCKRIST'}}>
              My Wardrobe
            </Text>
          </View>
        </ImageBackground>

        <ScrollView
          style={{ flex: 1, width: width}}>
            {this.newsfeed()}
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
  cardContainer: { 
    marginTop: 10, 
    marginBottom: 10, 
    width: 0.7*width, 
    alignSelf: 'center'
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

export default MyWardrobe;