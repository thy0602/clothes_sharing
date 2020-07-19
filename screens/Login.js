import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import Loader from '../components/Loader';
import Users from '../constants/User.js';

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    keyboardHeight: 0
  }
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.users = Users;
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }
  _keyboardDidShow(e) {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  }
  setUser = async (id) => {
    await AsyncStorage.setItem('currentUser', JSON.stringify(id));
  }
  login() {
    this.setState({ loading: true });
    for (let i = 0; i < this.users.length; ++i) {
      let user = this.users[i];
      if (this.state.email.trim() === user.email && this.state.password.trim() === user.password) {
        this.setState({
          loading: false,
          email: '',
          password: ''
        });
        this.setUser(user.id);
        this.props.navigation.navigate('Home');
        return;
      }
    }
    Alert.alert(
        'Login unsuccessful',
        'Wrong email or password. Please try again.',
        [
          {
            text: 'OK',
            onPress: () => {this.setState({loading: false})}
          }
        ]
    );
  }
  render() {
    if (this.state.loading)
      var loader = <Loader/>
    return (
      <View style={styles.container}>
        {loader}
        <Text style={styles.logIn}>Log in</Text>
        <TextInput placeholder="Username" style={styles.username}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}></TextInput>
        <TextInput placeholder="Password" style={styles.username2}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}></TextInput>
        <TouchableOpacity style={styles.button}
          onPress={this.login}>
            <Text style={{color: "white"}}>Next</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logIn: {
    fontFamily: "Roboto",
    color: "#121212",
    fontSize: 50,
    marginTop: 181,
    marginLeft: 35
  },
  username: {
    fontFamily: "Roboto",
    color: "#121212",
    height: 47,
    width: 306,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 37,
    marginLeft: 35
  },
  username2: {
    fontFamily: "Roboto",
    color: "#121212",
    height: 47,
    width: 306,
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 27,
    marginLeft: 35
  },
  button: {
    width: 306,
    height: 47,
    backgroundColor: "rgba(0,0,0,1)",
    marginTop: 31,
    marginLeft: 35,
    alignItems: "center",
  }
});

export default Login;