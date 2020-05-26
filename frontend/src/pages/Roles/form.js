import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './style.css';

export default function FormRoles(props) {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group controlId="roleName">
                    <Form.Label>Role name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter name"
                        defaultValue={props.name}
                        onChange={(event) => props.setRoleName(event.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group controlId="roleDescription">
                    <Form.Label>Role description</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter description"
                        defaultValue={props.description}
                        onChange={(event) => props.setRoleDescription(event.target.value)}
                    />
                </Form.Group>
            </Form.Row>
            <Button type="submit" >Submit</Button>
            {/* <Button onClick={props.submit} >Submit</Button> */}
        </Form>
    );
}