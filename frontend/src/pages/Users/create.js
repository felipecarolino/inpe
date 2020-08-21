import React from 'react';
import { Link} from "react-router-dom";
import FormUsers from './form';
import Card from 'react-bootstrap/Card';

export default function Create() {


    return (
        <div className="create-user">
            <Card className="create-user-card">
                <Card.Header>
                    <Link to="/user-management/users" className="nav-link">
                        <img src='/img/arrowLeft.svg' alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Create User</h5>
                </Card.Header>
                <Card.Body className="create-user-card-body">

                <FormUsers/>

                </Card.Body>
            </Card>
        </div >
    )
}