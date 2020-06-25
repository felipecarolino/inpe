import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default function FormResetPassword() {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden");
    const [successAlert, setSuccessAlert] = useState("hidden");
    const [successMessage, setSuccessMessage] = useState("");
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function resetPassword(data) {
        try {
            const result = await api.post('user/resetPassword', data);
            setSuccessMessage(result.data.data);
            setSuccessAlert("block");
            setTimeout(() => setSuccessAlert("hidden"),3000);
            setUsername('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.log(error.response.data.message)
            setErrorsList([
                {
                    "id": 4, "message": "Error to reset password",
                },
                error.response.data.message ?
                {
                    "id": 5, "message": error.response.data.message
                } : {}
            ]);
            setClassErros("block");
        }
    }

    const formValidation = (e) => {
        let errors = [];
        let validade = true;
        e.preventDefault();

        if (username === "") {
            errors.push({ "id": "1", "message": "Username cannot be empty" });
            validade = false
        }

        if (newPassword === "") {
            errors.push({ "id": "2", "message": "New password cannot be empty" });
            validade = false
        }

        if (confirmPassword === "") {
            errors.push({ "id": "3", "message": "Confirm password cannot be empty" });
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
                username,
                new_password: newPassword,
                confirm_password: confirmPassword
            };
            resetPassword(data);
        }
    }

    return (
        <>
            <div className={"alert alert-danger " + classErrors} >
                {[...errorsList].map((item) => (
                    <span key={item.id}>{item.message} <br /></span>
                ))}
            </div>

            <div className={"alert alert-success " + successAlert} >
                    <span>{successMessage} <br /></span>
            </div>

            <Form onSubmit={handleSave}>
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
                <Form.Row className={"newPassword"}>
                    <Form.Group controlId="newPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row className={"confirmPassword"}>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}