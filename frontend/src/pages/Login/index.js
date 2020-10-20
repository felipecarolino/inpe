import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from './form';
import View from './view';

import { isAuthenticated } from "./../../services/auth";

import './style.css';

export default function Login() {

    return (
        <div className="view-login">
            <Card className="login-card">
                <Card.Header as="h5">Restricted Area</Card.Header>
                <Card.Body>
                    {isAuthenticated() ? <View /> : <Form />}
                </Card.Body>
            </Card>
        </div>
    )
}