import React from 'react';

import { isAuthenticated } from "./../../services/auth";

import Login from './../../components/Login/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export default function RestrictArea() {

    return (
        <Container fluid="md" className="mt-3">
            <Row className="justify-content-center">
                <Col lg="6" md="6">
                    {isAuthenticated() ?
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{localStorage.getItem("name")}</td>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <td>{localStorage.getItem("user")}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{localStorage.getItem("email")}</td>
                                </tr>
                            </tbody>
                        </Table>
                        :
                        <Login />}
                </Col>
            </Row>
        </Container>
    )
}