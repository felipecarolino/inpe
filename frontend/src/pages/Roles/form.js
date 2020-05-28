import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

import api from '../../services/api';

import './style.css';

export default function FormRoles(props) {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
  
    const [id, setId] = useState(props.id);

    useEffect(() => {

        if (id) {
            const GetRole = async () => {
                const result = await api.get('roles/' + props.id);
                setName(result.data.data.name);
                setDescription(result.data.data.description);
                setId(props.id);
            };
            GetRole();
        }
    }, [id, props.id]);

    async function create(data) {

        try {
            await api.post('roles', data);
            history.push('/users/roles');
        } catch (error) {
            setErrorsList([
                {
                    "id": 1, "message": "Error to create new role"
                }
            ]);
        }
    }

    async function edit(data) {

        try {
            await api.put('roles/' + props.id, data);
            history.push('/users/roles');
        } catch (error) {
            setErrorsList([
                ...errorsList,
                {
                    "id": 1, "message": "Error to edit role"
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

        if (description === "") {
            errors.push({ "id": "2", "message": "Description cannot be empty" });
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
                description
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
                    <Form.Group controlId="roleName">
                        <Form.Label>Role name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="roleDescription">
                        <Form.Label>Role description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
}