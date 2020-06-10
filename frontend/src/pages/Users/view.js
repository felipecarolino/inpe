import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import IconBack from './../../assets/img/arrowLeft.svg';

import './style.css';

export default function View(props) {

    const [user, setuser] = useState([]);
    const [role, setRole] = useState('');
    
    useEffect(() => {
        const Getuser = async () => {
            const result = await api.get('users/' + props.match.params.id);
            setuser(result.data.data);
        };
        Getuser();
    }, [props.match.params.id]);

    const GetRole = async () => {
        const result = await api.get('roles/' + user.role_id);
        setRole(result.data.data.name);
    };

    if(user.role_id) {
        GetRole();
    }

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
                                    <th className="w-25">Role</th>
                                    <td>{role}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}
