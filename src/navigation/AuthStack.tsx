import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from '../screens/Login/Login';
import {AuthParamList} from './AuthParamList';
import SignUp from '../screens/SignUp/SignUp';

const Stack = createStackNavigator<AuthParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={() => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
