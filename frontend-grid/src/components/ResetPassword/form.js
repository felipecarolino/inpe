import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';

import { logout } from "../../services/auth";

export default function FormResetPassword() {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("d-none");
    const [successAlert, setSuccessAlert] = useState("d-none");
    const [successMessage, setSuccessMessage] = useState("");
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    async function resetPassword(data) {
        try {
            const result = await api.post('user/resetPassword', data);
            setSuccessMessage(result.data.data);
            setSuccessAlert("");
            setTimeout(() => setSuccessAlert("d-none"), 3000);
            setUsername('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            if (error.response.data.message === "Token has expired" || error.response.data.message === "Token not provided") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 4, "message": "Error to reset password",
                },
                error.response.data.message ?
                    {
                        "id": 5, "message": error.response.data.message
                    } : {}
            ]);
            setClassErros("");
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
                <Form.Group controlId="userUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}