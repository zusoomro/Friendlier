import React, { Fragment } from 'react';
import { Button, Text } from 'react-native';
import { login } from './auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './auth/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import Feed from './feed/Feed';

const Stack = createStackNavigator();

const Navigation = () => {
  const { authenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        {authenticated ? (
          <Fragment>
            <Stack.Screen name="Feed" component={Feed} />
          </Fragment>
        ) : (
          <Fragment>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Fragment>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
