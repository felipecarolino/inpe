import React from 'react';

import { Link } from "react-router-dom";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function SuccessMessage() {

    return (
        <div className="success-message">
            <Card className="success-message-card text-center">
                <Card.Header>
                    <h5>Success!</h5>
                </Card.Header>
                <Card.Body className="success-message-card-body">
                    <Card.Text>
                        We’ve received your submission and we’re starting our review. Pay attention to your e-mail box, and at your spam folder, in case we reach out for more information.
                        <br />
                        We appreciate your interest in our portal.
                    </Card.Text>

                    <Link to={{ pathname: "/submissions" }} className="nav-link">
                        <Button variant="primary" className="success-message-confirm">Confirm</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div >
    )
}