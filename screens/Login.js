import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  Alert,
  AsyncStorage
} from "react-native";
import { Block, Text } from "galio-framework";
import {
  Button,
  Icon,
  Input
} from "../components";
import { 
  Images, 
  argonTheme 
} from "../constants";
import { ScrollView } from "react-native-gesture-handler";
import Loader from '../components/Loader';
import Users from '../constants/User.js';
const { width, height } = Dimensions.get("screen");
const headerImg = require("../assets/imgs/headerLogin.png");

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    loading: false,
    keyboardHeight: 0,
    loggedIn: false
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
    // if (this.state.loggedIn) {
    //   this.props.navigation.navigate('Home');
    //   return null;
    // }
    // AsyncStorage.getAllKeys()
    //     .then(keys => AsyncStorage.multiRemove(keys))
    //     .then(() => alert('success'));
    if (this.state.loading)
      var loader = <Loader/>
    return (
      <Block flex middle >
          {loader}
          <Block flex={0.62} middle>
            <ImageBackground
              source={headerImg} 
              resizeMode='contain' 
              style={styles.headerImage}>
              <Block flex middle>
                <Image 
                  source={Images.petsImg} 
                  resizeMode='contain' 
                  style={styles.petImage}/>
              </Block>
            </ImageBackground>
          </Block>

          <Block flex>
            <Block flex={0.85} center>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={200}>
                <ScrollView 
                  style={{ width: width }}>
                  <Block
                    center width={width * 0.9} 
                    style={{ marginTop: 20, marginBottom: 15 }}>
                    <Input
                      style={styles.input}
                      borderless
                      placeholder="Email"
                      onChangeText={email => this.setState({ email })}
                      value={this.state.email}
                      iconContent={
                        <Icon
                          size={16}
                          color={'grey'}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}/>
                      }/>
                  </Block>
                  <Block 
                    center width={width * 0.9}>
                    <Input
                      style={styles.input}
                      password
                      viewPass
                      borderless
                      placeholder="Password"
                      onChangeText={password => this.setState({ password }) }
                      value={this.state.password}
                      iconContent={
                        <Icon
                          size={16}
                          color={'grey'}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}/>
                      }/>
                  </Block>

                  <Block flex middle>
                    <Button color="primary" style={styles.loginButton} onPress={this.login}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                  </Block>
                </ScrollView>
              </KeyboardAvoidingView>
            </Block>
          </Block>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: height,
    justifyContent: 'flex-start',
    borderRadius: 4,
  },
  petImage: {
    marginTop: -50,
    width: '80%', 
    height: '80%'
  },
  input: {
    backgroundColor: 'rgba(214, 214, 214, 0.8)' 
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
  loginButton: {
    width: width * 0.5,
    marginTop: 25,
    borderRadius: 10,
  }
});
export default Login;