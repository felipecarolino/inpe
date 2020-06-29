import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from './form';
import View from './view';

import { isAuthenticated } from "./../../services/auth";

import './style.css';

export default function Login() {

    return (
        <Card className="login-card">
            <Card.Header as="h5">Restrict Area</Card.Header>
            <Card.Body>
                {isAuthenticated() ? <View /> : <Form />}
            </Card.Body>
        </Card>
    )
}