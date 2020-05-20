import React, { useState, useEffect } from 'react';
import './style.css';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import api from '../../services/api';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export default function View(props) {

    const [role, setRole] = useState([]);

    useEffect(() => {
        const GetRole = async () => {
            const result = await api.get('roles/1');
            setRole(result.data.data);
            console.log(result)
        };
        GetRole();
    }, []);

    console.log(props.id)

    return (
        <div className="view-role">
            <Card className="view-role-card">
                <Card.Header>
                    <Link to="/users/roles" className="nav-link"><Button size="sm" href="/users/roles" className="btn-back">Back</Button></Link>
                    <h5>View Role</h5></Card.Header>
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
