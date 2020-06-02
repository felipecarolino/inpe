import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default function FormUsers(props) {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState();
  
    const [id, setId] = useState(props.id);

    useEffect(() => {

        if (props.id) {
            const Getuser = async () => {
                const result = await api.get('users/' + props.id);
                setName(result.data.data.name);
                setUsername(result.data.data.username);
                setEmail(result.data.data.email);
                setRoleId(result.data.data.role_id);
                setId(props.id);
            };
            Getuser();
        }
    }, [props.id]);

    async function create(data) {

        try {
            await api.post('users', data);
            history.push('/users/users');
        } catch (error) {
            setErrorsList([
                {
                    "id": 1, "message": "Error to create new user"
                }
            ]);
        }
    }

    async function edit(data) {

        try {
            await api.put('users/' + props.id, data);
            history.push('/users/users');
        } catch (error) {
            setErrorsList([
                ...errorsList,
                {
                    "id": 1, "message": "Error to edit user"
                }
            ]);
        }
    }

    const formValidation = (e) => {

        let errors = [];
        let validade = true;
        e.preventDefault();

        if (name === "") {
            errors.push({ "id": "1", "message": "Name cannot be empty" });
            validade = false
        };

        if (username === "") {
            errors.push({ "id": "2", "message": "Username cannot be empty" });
            validade = false
        }

        if (email === "") {
            errors.push({ "id": "3", "message": "Email cannot be empty" });
            validade = false
        }

        if (roleId === "") {
            errors.push({ "id": "4", "message": "Role cannot be empty" });
            validade = false
        }

        if (errors.length > 0) {
            setClassErros("block");
        }

        else {
            setClassErros("hidden");
        }

        setErrorsList(errors);
        return validade;
    }

    const handleSave = (e) => {

        if (formValidation(e)) {
            const data = {
                name,
                username,
                email,
                roleId
            };

            if (id) {
                edit(data);
            }

            else {
                create(data);
            }
        }
    }

    return (
        <>
            <div className={"alert alert-danger " + classErrors} >
                {[...errorsList].map((item) => (
                    <span key={item.id}>{item.message} <br /></span>
                ))}
            </div>

            <Form onSubmit={handleSave}>
                <Form.Row>
                    <Form.Group controlId="userName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="userUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}