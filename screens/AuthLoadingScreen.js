import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  login() {
    this.props.navigation.navigate('Account');
  }
  render() {
  return (
    <ScrollView>
     
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/imgs/main_menu.jpg")}
        style={styles.image}
        imageStyle={styles.image_imageStyle}>
        <View style={styles.image2Stack}>
          <Image
            source={require("../assets/imgs/logo.png")}
            resizeMode="contain"
            style={styles.image2}
          ></Image>
        </View>
        <View style={styles.cont}>
          <TouchableOpacity style={styles.button}
              onPress={this.login}>
                <Text>LOG IN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
    </ScrollView>
  );
  }
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 200,
    alignSelf:'center',
    flex:0.5
  },
  container: {
    flex: 1
  },
  image: {
    height: 500,
    marginTop: 40
  },
  image_imageStyle: {},
  image2: {
    flexDirection: 'row',
    top: 0,
    left: 44,
    width: 147,
    height: 147,
    position: "absolute"
  },
  loremIpsum: {
    top: 118,
    left: 0,
    position: "absolute",
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 14,
    flexDirection: 'row',
  },
  image2Stack: {
    width: 236,
    height: 147,
    marginTop: 42,
    marginLeft: 73
  },
  image2StackFiller: {
    flex: 1
  },
  button: {
    alignItems:'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 141,
    height: 48,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "#000000"
  },
  button1: {
    width: 141,
    height: 48,
    backgroundColor: "rgba(0,0,0,1)",
    marginLeft: 15
  },
  buttonRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 72,
    marginLeft: 46,
    marginRight: 35
  }
});

export default AuthLoadingScreen;