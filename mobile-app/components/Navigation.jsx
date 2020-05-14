import React from 'react';
import { Button, Text, View } from 'react-native';
import { login } from './auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './auth/Login';
import Register from './auth/Register';
import Feed from './feed/Feed';

const Stack = createStackNavigator();

const Navigation = () => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {authenticated ? (
          <>
            <Stack.Screen name="Feed" component={Feed} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
