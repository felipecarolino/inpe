import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import IconBack from './../../assets/img/arrowLeft.svg';

import './style.css';

export default function View(props) {

    const [role, setRole] = useState([]);

    useEffect(() => {
        const GetRole = async () => {
            const result = await api.get('roles/' + props.match.params.id);
            setRole(result.data.data);
        };
        GetRole();
    }, [props.match.params.id]);

    return (
        <div className="view-role">
            <Card className="view-role-card">
                <Card.Header>
                    <Link to="/users/roles" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>View Role</h5>
                </Card.Header>
                <Card.Body className="view-role-card-body">
                    <div className="view-role-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
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
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
