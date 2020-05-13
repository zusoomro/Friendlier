import React from 'react';
import { Button, Text } from 'react-native';

const Register = ({ navigation }) => {
  return (
    <div>
      <Text>Register Page</Text>
      <Button
        title="Have an account? Login here."
        onPress={() => navigation.navigate('Login')}
      />
    </div>
  );
};

export default Register;
