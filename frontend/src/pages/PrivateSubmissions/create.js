import React from 'react';
import { Link } from "react-router-dom";
import FormSubmissions from './form';
import Card from 'react-bootstrap/Card';
import IconBack from './../../assets/img/arrowLeft.svg';

export default function Create() {


    return (
        <div className="create-submission">
            <Card className="create-submission-card">
                <Card.Header className="create-submission-card-header">
                    <Link to="/management-submissions/submissions" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Create Submission</h5>
                </Card.Header>
                <Card.Body className="create-submission-card-body">
                    <FormSubmissions />
                </Card.Body>
            </Card>
        </div >
    )
}