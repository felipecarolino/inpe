import React from 'react';
import PublicSubmissionsForm from './form';
import Card from 'react-bootstrap/Card';

export default function Create() {

    return (
        <div className="public-submissions">
            <Card className="public-submissions-card">
                <Card.Header>
                    <h5>Submit New Cataclysmic Variable</h5>
                </Card.Header>
                <Card.Title>
                    <a href='/template.csv' download="template.csv" className="nav-link download-template">
                        Download Template
                    </a>
                </Card.Title>
                <Card.Body className="public-submissions-card-body">
                    <PublicSubmissionsForm />
                </Card.Body>
            </Card>
        </div >
    )
}