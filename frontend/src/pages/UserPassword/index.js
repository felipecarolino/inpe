import React from 'react';
import FormResetPassword from './form';
import Card from 'react-bootstrap/Card';
import './style.css';

export default function UserPassword() {
    return (
        <div className="user-password">
            <Card className="user-password-card">
                <Card.Header>
                    <h5>Reset User Password</h5>
                </Card.Header>
                <Card.Body className="user-password-card-body">
                    <FormResetPassword />
                </Card.Body>
            </Card>
        </div>
    )
}