import React from 'react';
import PublicSubmissionsForm from './form';
import Card from 'react-bootstrap/Card';

export default function Create() {

    return (
        <div className="public-submissions">
            <Card className="public-submissions-card">
                <Card.Header>
                    <h5>Submit New Cataclysmic Variable</h5>
                    <a href='/template.csv' download="template.csv">
                        <img width="21px" src='/img/download.svg' alt="Download Icon" className="iconDownload" />
                    </a>
                </Card.Header>
                <Card.Body className="public-submissions-card-body">
                    <PublicSubmissionsForm />
                </Card.Body>
            </Card>
        </div >
    )
}