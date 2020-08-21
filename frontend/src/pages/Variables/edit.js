import React from 'react';
import { Link } from "react-router-dom";
import FormVariables from './form';

import Card from 'react-bootstrap/Card';

export default function Edit(props) {


    return (
        <div className="edit-variable">
            <Card className="edit-variable-card">
                <Card.Header>
                    <Link to="/cataclysmic-variables/variables" className="nav-link">
                        <img src='/img/arrowLeft.svg' alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Edit Variable</h5>
                </Card.Header>
                <Card.Body className="edit-variable-card-body">
                    <FormVariables
                        id={props.match.params.id}
                    />
                </Card.Body>
            </Card>
        </div>
    )
}