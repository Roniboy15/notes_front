import React, { useContext, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { UserContext } from '../../context/createContext';
import { TOKEN_KEY } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const { user, fetchUserData } = useContext(UserContext);
    const nav = useNavigate();

    useEffect(() => {
    }, [user])

    return (
        <Container className='p-3'>
            <Row>
                <Col xs={12} md={8}>
                    <h1>Welcome to the Note Taking App</h1>
                    <br></br>
                    <h2>We are still in the building phase <br></br>
                        Check the app by logging in with the test user and have fun!
                    </h2>
                    <h2>Happy for any feedback</h2>
                    <br></br>
                    {/* <h3>Login: test@test.com</h3>
            <h3>Password: 123</h3> */}
                    {user ?
                        <h4>User "{user.username}" is logged in!</h4>
                        :
                        <h4>No user is logged in <br />Request access at <a href="mailto:jaron.111@hotmail.com">jaron.111@hotmail.com</a></h4>
                    }
                    <br></br>
                    <h4>The compare button in the notes-view component lets you change the order of the notes so that the clicked note is on top and the most matching and related other notes are sorted below it.</h4>
                    <button className='btn btn-outline-success p-1'>Compare</button>
                </Col>
            </Row>



        </Container>
    )
}

export default Home;
