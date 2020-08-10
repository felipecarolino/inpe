import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {

    return (
        <Container>
            <Row>
                <Col className="pl-0 pr-0">
                    <Navbar bg="light" sticky="bottom">
                        <Navbar.Brand>Brand text</Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>
        </Container>
    )
}