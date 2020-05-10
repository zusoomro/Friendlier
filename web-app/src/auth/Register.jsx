import React, { useState } from 'react';
import { useDispatch, useSelector } from '@reduxjs/toolkit';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  console.log('register being rendered');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    retypePassword: '',
  });

  const { username, email, password, retypePassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('form submitted');
  };

  return (
    <div classname="d-flex align-items-center justify-content-center vh-100">
      <Form onSubmit={(e) => onSubmit(e)}>
        <h1>Register</h1>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            name="retypePassword"
            type="password"
            value={retypePassword}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
