import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import { login } from "../../services/auth";
import api from '../../services/api';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login() {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("d-none");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function refreshPage() {
        window.location.reload(false);
    }

    const getUser = async (id) => {
        const result = await api.get('users/' + id);
        localStorage.setItem("user", result.data.data.username);
        refreshPage();
    };

    async function signIn(data) {
        try {
            const result = await api.post('user/login', data);
            if(result.data.success) {
                login(result.data.data.auth_token, result.data.data.id, result.data.data.email, result.data.data.name);
                getUser(result.data.data.id);
                history.push('/variables');
            }
            else {
                setErrorsList([
                    {
                        "id": 3, "message": result.data.message,
                    }
                ]);
                setClassErros("block");
            }

        } catch (error) {
            setErrorsList([
                {
                    "id": 4, "message": "Error to login",
                }
            ]);
            setClassErros("");
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
            setClassErros("");
        }

        else {
            setClassErros("d-none");
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
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}