import React from 'react';
import { Button, Text } from 'react-native';
import { login } from './authSlice';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Text>Login Page</Text>

      <Button onPress={() => dispatch(login())} title="Login" />
      <Button
        onPress={() => navigation.navigate('Register')}
        title="Need an account? Register Here"
      />
    </div>
  );
};

export default Login;
