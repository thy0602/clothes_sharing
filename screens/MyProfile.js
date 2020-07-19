import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Users from '../constants/User.js';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.currentUser = 2;
    this.users = Users;
    this.logout = this.logout.bind(this);
    this.clickLogout = this.clickLogout.bind(this);
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === this.currentUser) {
        this.user = this.users[i];
        break;
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
    return (
      <ScrollView>
      <View style={styles.container}>
        <Image
          source={{uri: this.user.avatar}}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.loremIpsum}>{this.user.address}</Text>
        <Text style={styles.nguyenNgocBangTam}>{this.user.name}</Text>
        <View style={styles.groupStackStack}>
          <View style={styles.groupStack}>
            <View style={styles.group}>
              <Text style={styles.phone}>Phone</Text>
              <Text style={styles.loremIpsum2}>{this.user.phone}</Text>
              <Text style={styles.email}>Email</Text>
              <Text style={styles.loremIpsum4}></Text>
              <Text style={styles.sharingPoints}>Sharing points:</Text>
            </View>
            <Text style={styles.loremIpsum3}>{this.user.email}</Text>
          </View>
          <Text style={styles.loremIpsum5}>{this.user.point}</Text>
        </View>
        <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('AddProducts')}>
                      <Text style={{color: "white"}}>ADD ITEM</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button1}
                    onPress={this.clickLogout}><Text style={{color: "white"}}>LOGOUT</Text></TouchableOpacity>
      </View>
      </ScrollView>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 95,
    marginLeft: 88
  },
  loremIpsum: {
    fontFamily: "Roboto",
    color: "#121212",
    opacity: 0.59,
    marginTop: 50,
    marginLeft: 111
  },
  nguyenNgocBangTam: {
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 25,
    marginTop: -59,
    marginLeft: 70
  },
  group: {
    top: 0,
    left: 0,
    width: 96,
    height: 161,
    position: "absolute",
    justifyContent: "space-between"
  },
  phone: {
    fontFamily: "Roboto",
    color: "#121212"
  },
  loremIpsum2: {
    top: 22,
    left: 0,
    position: "absolute",
    fontFamily: "Roboto",
    color: "#121212"
  },
  email: {
    fontFamily: "Roboto",
    color: "#121212"
  },
  loremIpsum4: {
    top: 101,
    left: 58,
    position: "absolute",
    fontFamily: "Roboto",
    color: "#121212"
  },
  sharingPoints: {
    fontFamily: "Roboto",
    color: "#121212"
  },
  loremIpsum3: {
    top: 93,
    left: 0,
    position: "absolute",
    fontFamily: "Roboto",
    color: "#121212"
  },
  groupStack: {
    top: 0,
    left: 0,
    width: 217,
    height: 161,
    position: "absolute"
  },
  loremIpsum5: {
    top: 143,
    left: 100,
    position: "absolute",
    fontFamily: "Roboto",
    color: "#121212"
  },
  groupStackStack: {
    width: 217,
    height: 161,
    marginTop: 59,
    marginLeft: 37
  },
  button: {
    width: 268,
    height: 43,
    backgroundColor: "rgba(0,0,0,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 44,
    marginLeft: 54,
    // alignSelf: "center",
    alignItems: "center",
  },
  button1: {
    width: 268,
    height: 43,
    backgroundColor: "rgba(0,0,0,1)",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 0,
    marginTop: 25,
    marginLeft: 54,
    // alignSelf: "center",
    alignItems: "center",
  }
});

export default MyProfile;