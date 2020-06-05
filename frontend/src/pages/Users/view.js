import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import IconBack from './../../assets/img/arrowLeft.svg';

import './style.css';

export default function View(props) {

    const [user, setuser] = useState([]);

    useEffect(() => {
        const Getuser = async () => {
            const result = await api.get('users/' + props.match.params.id);
            setuser(result.data.data);
        };
        Getuser();
    }, [props.match.params.id]);

    return (
        <div className="view-user">
            <Card className="view-user-card">
                <Card.Header>
                    <Link to="/user-management/users" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>View user</h5>
                </Card.Header>
                <Card.Body className="view-user-card-body">
                    <div className="view-user-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr >
                                    <th className="w-25">ID</th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Username</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Email</th>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Role ID</th>
                                    <td>{user.role_id}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
