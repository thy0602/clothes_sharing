import * as React from 'react';
import { Button, Text, Dimensions, StyleSheet, Easing, Animated } from "react-native";
import {
  createStackNavigator,
  createAppContainer, 
  createSwitchNavigator,
  createBottomTabNavigator
} from "react-navigation";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import { fadeIn, fromLeft, fromRight } from 'react-navigation-transitions';
// screens
import Home from "../screens/Home";
import MyWardrobe from "../screens/MyWardrobe";
import MixAndMatch from "../screens/MixAndMatch";
import MyProfile from "../screens/MyProfile";
import Login from "../screens/Login";
import Register from "../screens/Register";
import ForgetPassword from "../screens/ForgetPassword"
import Events from "../screens/Events"
import AddProducts from "../screens/AddProducts";
import ClothesDetails from "../screens/ClothesDetails";
import ChangePassword from "../screens/ChangePassword";
import Activities from "../screens/Activities";
import EventDetails from "../screens/EventDetails";
import Chat from "../screens/Chat";
const { width, height } = Dimensions.get('screen');
// drawer
import { MaterialIcons } from '@expo/vector-icons';
import App from '../App';


const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions:{
        header: null
      }
    },
    ClothesDetails: {
      screen: ClothesDetails,
      navigationOptions:{
        header: null
      }
    },
    Chat: {
      screen: Chat,
      navigationOptions:{
        header: null
      }
    },
    MyWardrobe: {
      screen: MyWardrobe,
      navigationOptions:{
        header: null
      }
    },
    MixAndMatch: {
      screen: MixAndMatch,
      navigationOptions:{
        header: null
      }
    },
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const EventsStack = createStackNavigator(
  {
    Events: {
      screen: Events,
      navigationOptions: {
        header: null,
      }
    },
    EventDetails: {
      screen: EventDetails,
      navigationOptions: {
        header: null
      }
    },
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: MyProfile,
      navigationOptions:{
        header: null
      }
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions:{
        header: null
      }
    },
    AddProducts: {
      screen: AddProducts,
      navigationOptions:{
        header: null
      }
    }
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

// const ActivitiesStack = createStackNavigator(
//   {
//     Activities: {
//       screen: Activities,
//       navigationOptions: {
//         header: null,
//       }
//     },
//     AddProducts: {
//       screen: AddProducts,
//       navigationOptions:{
//         header: null
//       }
//     },
//   },
//   {
//     transitionConfig: () => {
//         return fromRight(1000);
//     }
//   }
// );

const HomeTab = createBottomTabNavigator(
  {
    Home: HomeStack,
    Events: EventsStack,
    //Activities: ActivitiesStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      const route = navigation.state.routeName;
  
      return {
        tabBarIcon: ({ tintColor }) => {
          const name = {
            'Home': 'apps',
            'Profile': 'person',
            'Events': 'list',
            //'Activities': 'mail'
          }[route]
          return <MaterialIcons name={name} color={tintColor} size={22} />
        },
        tabBarOptions: {
          activeBackgroundColor: 'rgb(20,20,20)',
          activeTintColor: 'white',
          inactiveTintColor: '#fafafa',
          style: styles.container,
          tabStyle: styles.tab,
        }
      }
    },
    transitionConfig: () => {
      return fromRight(1000);
    }
  },
);

const LoginStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: Register,  
      navigationOptions: {
        header: null,
      }
    },
    ForgetPassword: {
      screen: ForgetPassword,  
      navigationOptions: {
        header: null,
      }
    }
  },
  {
    transitionConfig: () => {
        return fromRight(1000);
    }
  }
);

const AppContainer = createAppContainer(createSwitchNavigator({
  AuthLoading:{
    screen: AuthLoadingScreen,  
    navigationOptions: {
      header: null,
    }
  },
  Account: {
    screen: LoginStack,
    navigationOptions: {
      header: null
    }
  }, 
  Main : {
    screen: HomeTab,  
    navigationOptions: {
      header: null,
    }
  }, 
  }
));

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(45, 45, 45, 0.95)',
    height: 45,
    borderTopWidth: 0
  },
  tab: {
    borderRadius: 20,
  }
});

