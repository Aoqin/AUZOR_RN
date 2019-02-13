import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
// import Ionicons from 'react-native-vector-icons/Ionicons';
import SignInScreen from "./pages/signIn";
// import HomeScreen from "./pages/home";
import AuthLoadingScreen from "./pages/auth";

import BoardScreen from "./pages/board";
import PersonalScreen from "./pages/personal";
import RecordsScreen from "./pages/records";




//bottom tab
const AppStack = createBottomTabNavigator({
  board: {
    screen: BoardScreen
  },
  records: {
    screen: RecordsScreen
  },
  personal: {
    screen: PersonalScreen
  }
}, {
    initialRouteName: 'board',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  })


//
const AuthStack = createStackNavigator({
  SignIn: {
    key: 'SignIn',
    screen: SignInScreen
  }
});

//
// const AppStack = createStackNavigator({
//   mainStack: mainStack
// });

//自动验证
const AuthLoadingStack = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack
}, {
    initialRouteName: 'AuthLoading'
  });

export default createAppContainer(AuthLoadingStack);