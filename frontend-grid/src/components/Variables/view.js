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

    const [variable, setVariable] = useState([]);

    const getVariable = async () => {
        const result = await api.get('variables/' + props.match.params.id);
        setVariable(result.data.data);
    };

    useEffect(() => {
        getVariable();
        // eslint-disable-next-line
    }, [props.match.params.id]);

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" className="justify-content-center justify-content-md-start" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Link to="/variables" className="mr-3">
                            <Image width="24px" src={back} fluid />
                        </Link>
                        <Navbar.Brand><strong>Variable view</strong></Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    <Table striped bordered hover responsive>
                        <tbody>
                            <tr >
                                <th>ID</th>
                                <td>{variable.id}</td>
                            </tr>
                            <tr >
                                <th>Name</th>
                                <td>{variable.name}</td>
                            </tr>
                            <tr>
                                <th>RA</th>
                                <td>{variable.ra}</td>
                            </tr>
                            <tr>
                                <th>DEC</th>
                                <td>{variable.dec}</td>
                            </tr>
                            <tr>
                                <th>Orb_Per</th>
                                <td>{variable.per}</td>
                            </tr>
                            <tr>
                                <th>SIMBAD</th>
                                <td>
                                    <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${variable.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        View object in SIMBAD
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>ADS</th>
                                <td>
                                    <a href={`https://ui.adsabs.harvard.edu/search/q=object:${variable.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        View object in ADS
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}