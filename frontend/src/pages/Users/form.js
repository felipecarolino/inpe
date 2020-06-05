import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default function FormUsers(props) {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden");
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setrole_id] = useState();
    const [roles, setRoles] = useState([]);

    const [showPassword, setShowPassword] = useState("block");

    const [id, setId] = useState(props.id);

    useEffect(() => {

        if (props.id) {
            const Getuser = async () => {
                const result = await api.get('users/' + props.id);
                setName(result.data.data.name);
                setUsername(result.data.data.username);
                setEmail(result.data.data.email);
                setrole_id(result.data.data.role_id);
                setId(props.id);
                setShowPassword("hidden");
            };
            Getuser();
        }

        const GetRoles = async () => {
            const result = await api.get('roles');
            setRoles(result.data.data);
        };
        GetRoles();

    }, [props.id]);

    async function create(data) {

        try {
            await api.post('users', data);
            history.push('/user-management/users');
        } catch (error) {
            setErrorsList([
                {
                    "id": 9, "message": "Error to create new user"
                },
                {
                    "id": 10, "message": error.response.data.errors.username
                },
                {
                    "id": 11, "message": error.response.data.errors.password
                },
                {
                    "id": 12, "message": error.response.data.errors.email
                },
                {
                    "id": 13, "message": error.response.data.errors.role_id
                }
            ]);
            setClassErros("block");
        }
    }

    async function edit(data) {
        try {
            await api.put('users/' + props.id, data);
            history.push('/user-management/users');
        } catch (error) {
            setErrorsList([
                {
                    "id": 6, "message": "Error to edit user",
                },
                {
                    "id": 7, "message": error.response.data.errors.username
                },
                {
                    "id": 8, "message": error.response.data.errors.email
                }
            ]);
                setClassErros("block");
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

        if (!role_id || role_id === "0") {
            errors.push({ "id": "4", "message": "Role cannot be empty" });
            validade = false
        }

        if (!id){
            if (password === "") {
                errors.push({ "id": "5", "message": "Password cannot be empty" });
                validade = false
            }
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
            if (id) {
                const data = {
                    username,
                    name,
                    email,
                    role_id
                };

                edit(data);
            }

            else {
                const data = {
                    username,
                    name,
                    email,
                    password,
                    role_id
                };

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
                <Form.Row className={"passwordRow " + showPassword}>
                    <Form.Group controlId="userPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="userRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            value={role_id}
                            onChange={(e) => setrole_id(e.target.value)}
                        >
                            <option value="0">Select a role</option>
                            {
                                roles.map(item =>
                                    <option
                                        key={item.id}
                                        value={item.id}>
                                        {item.name}
                                    </option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}