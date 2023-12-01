import React from 'react';
import '../styles/footerStyles.css';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
  return (
    <Nav fixed="bottom" className="footer">
        <p>© 2023 PetPal Inc.</p>
    </Nav>
  );
};

export default Footer;
