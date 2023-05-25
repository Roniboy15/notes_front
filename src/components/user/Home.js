import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Home = () => {

    return (
        <Container className='p-3'>
            <Row>
                <Col xs={12} md={8}>
                </Col>
            </Row>
            <h2>Welcome to the Note Taking App</h2>
            <h3>Login: test@test.com</h3>
            <h3>Password: 123</h3>
        </Container>
    )
}

export default Home;
