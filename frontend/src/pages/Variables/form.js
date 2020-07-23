import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import api from '../../services/api';

import { logout } from "../../services/auth";

import './style.css';

export default function FormVariables(props) {

    const history = useHistory();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [name, setName] = useState('');
    const [ra, setRa] = useState('');
    const [dec, setDec] = useState('');
    const [per, setPer] = useState('');
    const [id, setId] = useState(props.id);

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    useEffect(() => {

        if (props.id) {
            const GetVariable = async () => {
                const result = await api.get('variables/' + props.id);
                setName(result.data.data.name);
                setRa(result.data.data.ra);
                setDec(result.data.data.dec);
                setPer(result.data.data.per);
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
            if (error.response.data.message === "Token has expired") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 5, "message": "Error to create new variable"
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
            await api.put('variables/' + props.id, data);
            history.push('/cataclysmic-variables/variables');
        } catch (error) {
            if (error.response.data.message === "Token has expired") {
                Logout();
            }
            setErrorsList([
                ...errorsList,
                {
                    "id": 7, "message": "Error to edit variable"
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
                <Button type="submit">Save</Button>
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