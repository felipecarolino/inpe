import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import api from '../../services/api';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';

import back from './../../assets/images/back.svg';

export default function View(props) {

    const [role, setRole] = useState([]);

    const getRole = async () => {
        const result = await api.get('roles/' + props.match.params.id);
        setRole(result.data.data);
    };

    useEffect(() => {
        getRole();
        // eslint-disable-next-line
    }, [props.match.params.id]);

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" className="justify-content-center justify-content-md-start" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Link to="/management/roles" className="mr-3">
                            <Image width="24px" src={back} fluid />
                        </Link>
                        <Navbar.Brand><strong>Role view</strong></Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    <Table striped bordered hover responsive>
                        <tbody>
                            <tr >
                                <th>ID</th>
                                <td>{role.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{role.name}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{role.description}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}