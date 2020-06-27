import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { login } from "../../services/auth";

import api from '../../services/api';

import './style.css';

export default function LoginForm() {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function signIn(data) {
        try {
            const result = await api.post('user/login', data);
            console.log(result.data.data.auth_token);
            login(result.data.data.auth_token);
        } catch (error) {
            console.log(error.response.data.message)
            setErrorsList([
                {
                    "id": 4, "message": "Error to login",
                }
            ]);
            setClassErros("block");
        }
    }

    const formValidation = (e) => {
        let errors = [];
        let validade = true;
        e.preventDefault();

        if (email === "") {
            errors.push({ "id": "1", "message": "Email cannot be empty" });
            validade = false
        }

        if (password === "") {
            errors.push({ "id": "2", "message": "Password cannot be empty" });
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
                email,
                password
            };
            signIn(data);
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
                    <Form.Group controlId="email">
                        <Form.Label>Email adress</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}