import React from 'react';
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { StyledInput, Container } from '../common/CommonStyles';
import { login } from './authSlice';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const init = {
    username: '',
    password: '',
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Formik
          initialValues={init}
          onSubmit={(values, actions) => {
            actions.resetForm();
            dispatch(login(values));
          }}
        >
          {(formikProps) => (
            <View>
              <StyledInput
                placeholder="Username"
                onChangeText={formikProps.handleChange('username')}
                value={formikProps.values.username}
              />
              <StyledInput
                placeholder="Password"
                onChangeText={formikProps.handleChange('password')}
                value={formikProps.values.password}
                secureTextEntry
              />
              <Button title="Submit" onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>
        <Button
          title="Need an account? Register here."
          onPress={() => navigation.navigate('Register')}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Login;
