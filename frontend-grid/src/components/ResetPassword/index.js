import React from 'react';

import Form from './form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

export default function ResetPassword() {

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Navbar.Brand><strong>Reset User Password</strong></Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2" sm={10} md={8}>
                    <Form />
                </Col>
            </Row>
        </Container>
    )
}