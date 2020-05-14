import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Landing = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <h1>Landing Page</h1>
        <Button as={Link} to="/login">
          Login
        </Button>
        <Button as={Link} to="/register">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Landing;
