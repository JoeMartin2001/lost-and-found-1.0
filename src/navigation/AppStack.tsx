import React, {useEffect} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Home from '../screens/Home/Home';
import {useAppDispatch} from '../hooks/hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import {logoutUser} from '../redux/auth/authSlice';
import {Alert, Image, StyleSheet, Text} from 'react-native';
import SearchScreen from '../screens/Search/SearchScreen';
import {AppParamList} from './AppParamList';
import ItemInfo from '../screens/ItemInfo/ItemInfo';
import ChatRoom from '../screens/ChatRoom/ChatRoom';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Settings from '../screens/Settings/Settings';
import TermsAndServices from '../screens/TermsAndServices/TermsAndServices';
import Support from '../screens/Support/Support';
import About from '../screens/About/About';
import {colors} from '../config/colors';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {socketIO} from '../common/socketIO';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator<AppParamList>();

const AppStack = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketIO.on('connect', () => {
      socketIO.on('receive_msg', (msg: string) => console.log(msg));
    });
  }, []);

  const handleLogOut = async () => {
    const userId = await AsyncStorage.getItem('userId');

    socketIO.emit('end', userId);
    dispatch(logoutUser());
  };

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: '#ffffff',
      })}
      initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerTitle: () => (
            <Image source={require('./img/Choralogo_white.png')} />
          ),
          headerRight: () => (
            <Menu style={{paddingHorizontal: 5}}>
              <MenuTrigger>
                <Entypo
                  name="dots-three-vertical"
                  size={20}
                  color="#ffffff"
                  style={{padding: 10}}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => console.log(`Save`)}
                  style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 16}}>Settings</Text>
                </MenuOption>
                <MenuOption
                  onSelect={handleLogOut}
                  style={{
                    paddingVertical: 10,
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: 'black', fontSize: 16}}>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          ),
        })}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="ItemInfo"
        component={ItemInfo}
        options={{
          title: t('Details'),
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="TermsAndServices"
        component={TermsAndServices}
        options={{
          title: t('Terms & Services'),
        }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{
          title: t('Support'),
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
          title: t('About Us'),
        }}
      />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  logOutTouchable: {
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
});

export default AppStack;
