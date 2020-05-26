import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Form from './form';
import api from '../../services/api';
import Card from 'react-bootstrap/Card';
import IconBack from './../../assets/img/arrowLeft.svg';

export default function Create() {

    const [role, setRole] = useState(
        {
            name: '',
            description: ''
        }
    );

    const createRole = () => {
        api.post('roles', role)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const setRoleName = (value) => {
        setRole({
            ...role,
            name: value
        })
    }

    const setRoleDescription = (value) => {
        setRole({
            ...role,
            description: value
        })
    }

    return (
        <div className="create-role">
            <Card className="create-role-card">
                <Card.Header>
                    <Link to="/users/roles" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Create Role</h5>
                </Card.Header>
                <Card.Body className="create-role-card-body">
                    <Form
                        setRoleName={setRoleName}
                        setRoleDescription={setRoleDescription}
                        submit={createRole}
                    />
                </Card.Body>
            </Card>
        </div >
    )
}