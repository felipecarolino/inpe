import React from 'react';
import { Link } from "react-router-dom";
import FormSubmissions from './form';

import Card from 'react-bootstrap/Card';

import IconBack from './../../assets/img/arrowLeft.svg';

export default function Edit(props) {


    return (
        <div className="edit-submission">
            <Card className="edit-submission-card">
                <Card.Header>
                    <Link to="/management-submissions/submissions" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Edit submission</h5>
                </Card.Header>
                <Card.Body className="edit-submission-card-body">
                    <FormSubmissions
                        id={props.match.params.id}
                    />
                </Card.Body>
            </Card>
        </div>
    )
}