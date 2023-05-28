import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../context/createContext';
import { TOKEN_KEY } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const { user, fetchUserData } = useContext(UserContext);
    const nav = useNavigate();

    useEffect(()=> {
    },[user])
    
    return (
        <Container className='p-3'>
            <Row>
                <Col xs={12} md={8}>
                </Col>
            </Row>
            <h2>Welcome to the Note Taking App</h2>
            <h3>Login: test@test.com</h3>
            <h3>Password: 123</h3>
            {user? 
            <h4>User {user.username} is logged in!</h4>
            : 
            <h4>No user is logged in</h4>
            
        }

        </Container>
    )
}

export default Home;
