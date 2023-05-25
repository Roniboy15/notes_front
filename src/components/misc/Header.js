import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="light" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/">Note Taking App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNavbar} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" onClick={closeNavbar}>Home</Nav.Link>
            <Nav.Link as={Link} to="/create" onClick={closeNavbar}>Create Note</Nav.Link>
            <Nav.Link as={Link} to="/view" onClick={closeNavbar}>View Notes</Nav.Link>
            <Nav.Link as={Link} to="/login" onClick={closeNavbar}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
