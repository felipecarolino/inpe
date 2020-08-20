import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import api from '../../services/api';

import './style.css';

export default function PublicSubmissionsForm() {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [institution, setInstitution] = useState('');
    const [department, setDepartment] = useState('');
    const [position, setPosition] = useState('');
    const [observations, setObservations] = useState('');

    const [successModalShow, setSuccessModalShow] = useState(false);

    const [file, setFile] = useState('');

    function SuccessModal(props) {
        return (
            <Modal
                {...props}
                centered
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We’ve received your submission and we’re starting our review. Pay attention to your e-mail box, and at your spam folder, in case we reach out for more information.
                    <br />
                    We appreciate your interest in our portal.
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setSuccessModalShow(false)}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    async function create(data) {
        try {
            await api.post('submissions', data, { // receive two parameter endpoint url ,form data 
            })
                .then(res => { // then print response status
                    console.warn(res);
                    if (res.data.status_code === 200) {
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setInstitution('');
                        setDepartment('');
                        setPosition('');
                        setObservations('');
                        setSuccessModalShow(true);
                    }

                })
        } catch (error) {
            setErrorsList([
                {
                    "id": 8, "message": "Error to submit new submission"
                },
                error.response.data.errors.name ?
                    {
                        "id": 9, "message": error.response.data.errors.name
                    } : {}
            ]);
            setClassErros("block");
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

        if (file === "") {
            errors.push({ "id": "7", "message": "File cannot be empty" });
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

        e.preventDefault();

        if (formValidation(e)) {
            const data = new FormData()

            data.append('file', file)
            data.append('first_name', firstName)
            data.append('last_name', lastName)
            data.append('email', email)
            data.append('institution', institution)
            data.append('department', department)
            data.append('position', position)
            data.append('observations', observations)

            console.warn(file);

            create(data);
        }
    }

    return (
        <>
            <div className={"alert alert-danger " + classErrors} >
                {[...errorsList].map((item) => (
                    <span key={item.id}>{item.message} <br /></span>
                ))}
            </div>

            <Form onSubmit={handleSave} className="public-submissions-form">
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
                <Form.Row>
                    <Form.Group controlId="file">
                        <Form.Label>File</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Submit</Button>
            </Form>

            <SuccessModal
                show={successModalShow}
                onHide={() => {
                    setSuccessModalShow(false)
                }}
            />
        </>
    );
}
