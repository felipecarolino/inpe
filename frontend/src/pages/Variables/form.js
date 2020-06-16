import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import './style.css';

export default function FormVariables(props) {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [Name_RK, setName] = useState('');
    const [RAJ2000_RK, setRa] = useState('');
    const [DEJ2000_RK, setDec] = useState('');
    const [id, setId] = useState(props.id);

    useEffect(() => {

        if (props.id) {
            const GetVariable = async () => {
                const result = await api.get('variables/' + props.id);
                setName(result.data.data.Name_RK);
                setRa(result.data.data.RAJ2000_RK);
                setDec(result.data.data.DEJ2000_RK);
                setId(props.id);
            };
            GetVariable();
        }
    }, [props.id]);

    async function create(data) {

        try {
            await api.post('variables', data);
            history.push('/cataclysmic-variables/variables');
        } catch (error) {
            setErrorsList([
                {
                    "id": 4, "message": "Error to create new variable"
                },
                error.response.data.errors.Name_RK ?
                    {
                        "id": 5, "message": error.response.data.errors.Name_RK
                    } : {}
            ]);
            setClassErros("block");
        }
    }

    async function edit(data) {

        try {
            await api.put('variables/' + props.id, data);
            history.push('/cataclysmic-variables/variables');
        } catch (error) {
            setErrorsList([
                ...errorsList,
                {
                    "id": 6, "message": "Error to edit variable"
                }
            ]);
        }
    }

    const formValidation = (e) => {

        let errors = [];
        let validade = true;
        e.preventDefault();

        if (Name_RK === "") {
            errors.push({ "id": "1", "message": "Name cannot be empty" });
            validade = false
        };

        if (RAJ2000_RK === "") {
            errors.push({ "id": "2", "message": "RA cannot be empty" });
            validade = false
        }

        if (DEJ2000_RK === "") {
            errors.push({ "id": "3", "message": "DEC cannot be empty" });
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
                Name_RK,
                RAJ2000_RK,
                DEJ2000_RK
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
                    <Form.Group controlId="variableName">
                        <Form.Label>Variable name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={Name_RK}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="variableRa">
                        <Form.Label>RA</Form.Label>
                        <Input
                            mask="99 99 99.99"
                            value={RAJ2000_RK}
                            onChange={(e) => setRa(e.target.value)}
                            placeholder="hh mm ss.ss" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="variableDec">
                        <Form.Label>DEC</Form.Label>
                        <Input
                            mask="99 99 99.99"
                            value={DEJ2000_RK}
                            onChange={(e) => setDec(e.target.value)}
                            placeholder="+/-dd mm ss.ss" />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Save</Button>
            </Form>
        </>
    );
}

const Input = (props) => (
    <InputMask
        mask={props.mask}
        maskChar={null}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder} >
            {(inputProps) => <Form.Control {...inputProps} type="text" />}
    </InputMask>
);