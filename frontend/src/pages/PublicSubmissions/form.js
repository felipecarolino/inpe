import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import './style.css';

export default function PublicSubmissionsForm() {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [name, setName] = useState('');
    const [ra, setRa] = useState('');
    const [dec, setDec] = useState('');
    const [per, setPer] = useState('');


    async function create(data) {
        try {
            await api.post('submissions', data);
        } catch (error) {
            setErrorsList([
                {
                    "id": 5, "message": "Error to submit new variable"
                },
                error.response.data.errors.name ?
                    {
                        "id": 6, "message": error.response.data.errors.name
                    } : {}
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

        if (ra === "") {
            errors.push({ "id": "2", "message": "RA cannot be empty" });
            validade = false
        }

        if (dec === "") {
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
                name,
                ra,
                dec,
                per
            };

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

            <Form onSubmit={handleSave}>
                <Form.Row>
                    <Form.Group controlId="variableName">
                        <Form.Label>Variable name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="variableRa">
                        <Form.Label>RA</Form.Label>
                        <Input
                            mask="99 99 99.9999999999"
                            value={ra}
                            onChange={(e) => setRa(e.target.value)}
                            placeholder="hh mm ss.ssssssssss" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="variableDec">
                        <Form.Label>DEC</Form.Label>
                        <Input
                            formatChars={
                                {
                                    "9": "[0-9]",
                                    "?": "[+,-]"
                                }
                            }
                            mask="?99 99 99.999999999"
                            value={dec}
                            onChange={(e) => setDec(e.target.value)}
                            placeholder="+/-dd mm ss.sssssssss" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="variablePer">
                        <Form.Label>Orb_Per</Form.Label>
                        <Input
                            formatChars={
                                {
                                    "9": "[0-9]"
                                }
                            }
                            mask="9.999999"
                            value={per}
                            onChange={(e) => setPer(e.target.value)}
                            placeholder="0.000000" />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.File>
                        <Form.File.Label>File</Form.File.Label>
                        <Form.File.Input />
                    </Form.File>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    );
}

const Input = (props) => (
    <InputMask
        formatChars={props.formatChars}
        mask={props.mask}
        maskChar={null}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder} >
        {(inputProps) => <Form.Control {...inputProps} type="text" />}
    </InputMask>
);