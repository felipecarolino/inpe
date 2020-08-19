import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';

import { logout } from "../../services/auth";

import './style.css';

export default function FormVariables(props) {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [observations, setObservations] = useState('');
    const [id, setId] = useState(props.id);

    const [successAlert, setSuccessAlert] = useState("hidden");
    const [successMessage, setSuccessMessage] = useState("");

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    useEffect(() => {

        if (props.id) {
            const getSubmission = async () => {
                const result = await api.get('submissions/' + props.id);
                setFirstName(result.data.data.first_name);
                setLastName(result.data.data.last_name);
                setEmail(result.data.data.email);
                setInstitution(result.data.data.institution);
                setDepartment(result.data.data.department);
                setPosition(result.data.data.position);
                setObservations(result.data.data.observations);
                setId(props.id);
            };
            getSubmission();
        }
    }, [props.id]);

    async function create(data) {
        try {
            await api.post('submissions', data);
            history.push('/management-submissions/submissions');
            setSuccessMessage("submission successfully sent!");
            setSuccessAlert("block");
            setTimeout(() => setSuccessAlert("hidden"),3000);
        } catch (error) {
            if (error.response.data.message === "Token has expired" || error.response.data.message === "Token not provided") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 5, "message": "Error to create new submission"
                },
                error.response.data.errors.name ?
                    {
                        "id": 6, "message": error.response.data.errors.name
                    } : {}
            ]);
            setClassErros("block");
        }
    }

    async function edit(data) {
        try {
            await api.put('submissions/' + props.id, data);
            history.push('/management-submissions/submissions');
            setSuccessMessage("submission successfully sent!");
            setSuccessAlert("block");
            setTimeout(() => setSuccessAlert("hidden"),3000);
        } catch (error) {
            if (error.response.data.message === "Token has expired" || error.response.data.message === "Token not provided") {
                Logout();
            }
            setErrorsList([
                ...errorsList,
                {
                    "id": 7, "message": "Error to edit submission"
                }
            ]);
        }
    }

    const formValidation = (e) => {

        let errors = [];
        let validade = true;
        e.preventDefault();

        if (firstName === "") {
            errors.push({ "id": "1", "message": "First name cannot be empty" });
            validade = false
        };

        if (lastName === "") {
            errors.push({ "id": "2", "message": "Last name cannot be empty" });
            validade = false
        }

        if (email === "") {
            errors.push({ "id": "3", "message": "Email cannot be empty" });
            validade = false
        }

        if (institution === "") {
            errors.push({ "id": "4", "message": "Institution cannot be empty" });
            validade = false
        }

        if (department === "") {
            errors.push({ "id": "5", "message": "Department cannot be empty" });
            validade = false
        }

        if (position === "") {
            errors.push({ "id": "6", "message": "Position cannot be empty" });
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
                first_name: firstName,
                last_name: lastName,
                email,
                institution,
                department,
                position,
                observations
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

            <div className={"alert alert-success " + successAlert} >
                    <span>{successMessage} <br /></span>
            </div>

            <Form onSubmit={handleSave}>
                <Form.Row>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Institution"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="position">
                        <Form.Label>Position</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="Observations">
                        <Form.Label>Observations</Form.Label>
                        <Form.Control as="textarea" rows="3"
                        value={observations}
                        onChange={(e) => setObservations(e.target.value)} />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.File>
                        <Form.File.Label>File</Form.File.Label>
                        <Form.File.Input />
                    </Form.File>
                </Form.Group>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}
