import React from 'react';
import { Link} from "react-router-dom";
import FormRoles from './form';
import Card from 'react-bootstrap/Card';

export default function Create() {


    return (
        <div className="create-role">
            <Card className="create-role-card">
                <Card.Header>
                    <Link to="/user-management/roles" className="nav-link">
                        <img src='/img/arrowLeft.svg' alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Create Role</h5>
                </Card.Header>
                <Card.Body className="create-role-card-body">

                <FormRoles/>

                </Card.Body>
            </Card>
        </div >
    )
}