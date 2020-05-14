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
import { register } from './authSlice';
import { useDispatch } from 'react-redux';
import { StyledInput, Container } from '../common/CommonStyles';

const init = {
  username: '',
  email: '',
  password: '',
  re_password: '',
};

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Formik
          initialValues={init}
          onSubmit={(values, actions) => {
            actions.resetForm();
            dispatch(register(values));
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
                placeholder="Email"
                onChangeText={formikProps.handleChange('email')}
                value={formikProps.values.email}
              />
              <StyledInput
                placeholder="password"
                onChangeText={formikProps.handleChange('password')}
                value={formikProps.values.password}
                secureTextEntry
              />
              <StyledInput
                placeholder="re_password"
                onChangeText={formikProps.handleChange('re_password')}
                value={formikProps.values.re_password}
                secureTextEntry
              />
              <Button title="Submit" onPress={formikProps.handleSubmit} />
            </View>
          )}
        </Formik>
        <Button
          title="Have an account? Login here."
          onPress={() => navigation.navigate('Login')}
        />
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Register;
