import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';
import Form from './form';

import Card from 'react-bootstrap/Card';

import IconBack from './../../assets/img/arrowLeft.svg';

export default function Edit(props) {
    
    const [role, setRole] = useState([]);

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

    useEffect(() => {
        const GetRole = async () => {
            const result = await api.get('roles/' + props.match.params.id);
            setRole(result.data.data);
        };
        GetRole();
    }, [props.match.params.id]);

    console.log(role);

    return (
        <div className="edit-role">
            <Card className="edit-role-card">
                <Card.Header>
                    <Link to="/users/roles" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Edit Role</h5>
                </Card.Header>
                <Card.Body className="edit-role-card-body">
                    <Form
                        name={role.name}
                        description={role.description}
                        setRoleName={setRoleName}
                        setRoleDescription={setRoleDescription}
                        />
                </Card.Body>
            </Card>
        </div>
    )
}