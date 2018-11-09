import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import LoginPage from './pages/login'
import MainPage from './pages/main'
import BoardPage from './pages/board'
import PersonCenterPage from './pages/personcenter'

const BottomTabNav = createBottomTabNavigator({
    Board: {
        screen: BoardPage,
    },
    PersonCenter: {
        screen: PersonCenterPage
    }
},{
    initialRouteName:'Board'
});

const RootStack = createStackNavigator({
    Login: {
        screen: LoginPage,
        key: 'Login',
        navigationOptions: {
            header: null
        }
    },
    Board: {
        screen: BoardPage,
        key: 'Board'
    },
    Main: BottomTabNav,
    PersonCenter: {
        screen: PersonCenterPage,
        navigationOptions: ({ navigation }) => ({
            header: renderStatusBar()
        })
    },
}, {
        initialRouteName: 'Login'
    });

export default RootStack;
