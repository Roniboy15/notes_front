import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { UserContext } from '../../context/createContext';
import { TOKEN_KEY } from '../../services/apiService';

const Header = () => {

  const { user, fetchUserData } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  const onLogOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    fetchUserData();
    alert('You logged out, see you soon!');
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
      {user ?
          <Link to={"/"} className='p-2 m-2' onClick={() => {
            onLogOut()
          }}>Log out</Link>
          : ''
                    }
    </Navbar>
  );
}

export default Header;
