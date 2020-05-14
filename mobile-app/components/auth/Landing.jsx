import React from 'react';
import { Button, Text } from 'react-native';
import { Container } from '../common/CommonStyles';

const Landing = ({ navigation }) => {
  return (
    <Container>
      <Text>Welcome to Friendlier.</Text>
      <Button
        onPress={() => navigation.navigate('Login')}
        title="Login"
      ></Button>
      <Button
        onPress={() => navigation.navigate('Register')}
        title="Register"
      ></Button>
    </Container>
  );
};

export default Landing;
