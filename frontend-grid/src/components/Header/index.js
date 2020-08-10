import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import logo from './../../assets/images/logo.svg';
import br from './../../assets/images/br.svg';
import us from './../../assets/images/us.svg';

import HeaderNav from './navbar';

export default function Header() {
    return (
        <Container fluid="md" className="mt-2">
            <Row className="justify-content-md-between justify-content-center">
                <Col xs="auto" className="pl-0 pr-0"><Image width="150px" src={logo} fluid /></Col>
                <Col xs="auto" className="align-self-center text-center"><h1 className="mb-0">Cataclysmic Variables Portal</h1></Col>
                <Col lg="auto" className="align-self-end">
                    <Row className="justify-content-end">
                        <Col xs="auto" className="pl-0 pr-1"><Image width="36px" src={br} fluid /></Col>
                        <Col xs="auto" className="pl-0 pr-md-0 pr-2"><Image width="36px" src={us} fluid /></Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col className="pl-0 pr-0">
                    <HeaderNav />
                </Col>
            </Row>
        </Container>
    )
}