import React from 'react';

import { Link } from "react-router-dom";

import Form from './form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

import back from './../../assets/images/back.svg';

export default function Create() {

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Link to="/variables" className="mr-3">
                            <Image width="24px" src={back} fluid />
                        </Link>
                        <Navbar.Brand><strong>Create variable</strong></Navbar.Brand>
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