import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from './form';
import { logout } from "../../services/auth";

import './style.css';


export default function Login() {


    return (
        <Card className="login-card">
            <Card.Header as="h5">Login</Card.Header>
            <Card.Body>
                <Form />

                <button onClick={logout}> Logout</button>
            </Card.Body>
        </Card>
    )
}