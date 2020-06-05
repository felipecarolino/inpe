import React from 'react';
import { Link} from "react-router-dom";
import FormRoles from './form';

import Card from 'react-bootstrap/Card';

import IconBack from './../../assets/img/arrowLeft.svg';

export default function Edit(props) {

    
    return (
        <div className="edit-role">
            <Card className="edit-role-card">
                <Card.Header>
                    <Link to="/user-management/roles" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Edit Role</h5>
                </Card.Header>
                <Card.Body className="edit-role-card-body">
                    <FormRoles
                        id = {props.match.params.id}
                    />
                </Card.Body>
            </Card>
        </div>
    )
}