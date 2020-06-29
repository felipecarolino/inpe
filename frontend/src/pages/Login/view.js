import React from 'react';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { logout } from "../../services/auth";

import './style.css';

export default function View() {
   
    return (
        <div className="view-user">
            <Card className="view-user-card">
                <Card.Header>
                    <h5>Logged as</h5>
                </Card.Header>
                <Card.Body className="view-user-card-body">
                    <div className="view-user-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{localStorage.getItem("name")}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Email</th>
                                    <td>{localStorage.getItem("email")}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
                <button onClick={logout}> Logout</button>
            </Card>
        </div>
    )
}
