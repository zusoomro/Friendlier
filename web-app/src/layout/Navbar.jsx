import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { default as BNavbar } from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <BNavbar bg="light" className="fixed-top">
      <BNavbar.Brand as={Link} to="/" className="mr-auto">
        Friendlier
      </BNavbar.Brand>
    </BNavbar>
  );
};

export default Navbar;
