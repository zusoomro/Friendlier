import React from 'react';
import { Button, Text } from 'react-native';

const Landing = ({ navigation }) => {
  return (
    <div>
      <Text>Welcome to Friendlier.</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Login"
      ></Button>
      <Button
        onPress={() => navigation.navigate('Register')}
        title="Register"
      ></Button>
    </div>
  );
};

export default Landing;
