import React from 'react';
import { Link } from "react-router-dom";
import FormVariables from './form';
import Card from 'react-bootstrap/Card';
import IconBack from './../../assets/img/arrowLeft.svg';

export default function Create() {


    return (
        <div className="create-variable">
            <Card className="create-variable-card">
                <Card.Header>
                    <Link to="/cataclysmic-variables/variables" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Create Cataclysmic Variable</h5>
                </Card.Header>
                <Card.Body className="create-variable-card-body">
                    <FormVariables />
                </Card.Body>
            </Card>
        </div >
    )
}