import React from 'react';
import { Link} from "react-router-dom";
import FormUsers from './form';

import Card from 'react-bootstrap/Card';

import IconBack from './../../assets/img/arrowLeft.svg';

export default function Edit(props) {

    
    return (
        <div className="edit-user">
            <Card className="edit-user-card">
                <Card.Header>
                    <Link to="/user-management/users" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Edit user</h5>
                </Card.Header>
                <Card.Body className="edit-user-card-body">
                    <FormUsers
                        id = {props.match.params.id}
                    />
                </Card.Body>
            </Card>
        </div>
    )
}