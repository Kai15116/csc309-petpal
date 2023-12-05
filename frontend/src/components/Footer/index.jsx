import React from 'react';
import './style.css';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <Nav sticky="bottom" className="footer">
        <p>© 2023 PetPal Inc.</p>
    </Nav>
  );
};

export default Footer;
