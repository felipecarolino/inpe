import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl'
import './style.css';

import api from '../../services/api';


export default function FormSearch(props) {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [name, setName] = useState("");
    const [ra, setRa] = useState("");
    const [dec, setDec] = useState("");
    const [arcosec, setArcosec] = useState();


    async function searchName(data) {
        try {
            const result = await api.post('variables/searchByName', data);
            if (JSON.parse(result.data.data).data[0] !== undefined) {
                props.update(JSON.parse(result.data.data).data[0])
            }
            else {
                setErrorsList([
                    {
                        "id": 2, "message": "Variable not found"
                    }
                ]);
                setClassErros("block");
            }
            console.log(JSON.parse(result.data.data).data[0]);
        } catch (error) {
            setErrorsList([
                {
                    "id": 2, "message": "Error to search variable"
                }
            ]);
            setClassErros("block");
        }
    }

    async function searchCoordinate(data) {
        try {
            const result = await api.post('variables/searchByCoord', data);
            if (JSON.parse(result.data.data).data[0] !== undefined) {
                props.update(JSON.parse(result.data.data).data[0])
            }
            else {
                setErrorsList([
                    {
                        "id": 2, "message": "Variable not found"
                    }
                ]);
                setClassErros("block");
            }
            console.log(JSON.parse(result.data.data).data[0]);
        } catch (error) {
            setErrorsList([
                {
                    "id": 3, "message": "Error to search variable"
                }
            ]);
            setClassErros("block");
        }
    }

    const formValidation = (e) => {

        let errors = [];
        let validade = true;
        e.preventDefault();

        if (props.type === "name") {
            if (name === "") {
                errors.push({ "id": "1", "message": "Name cannot be empty" });
                validade = false
            };
        }

        else {
            if (ra === "") {
                errors.push({ "id": "1", "message": "RA cannot be empty" });
                validade = false
            };

            if (dec === "") {
                errors.push({ "id": "2", "message": "DEC cannot be empty" });
                validade = false
            };

            if (arcosec === "") {
                errors.push({ "id": "3", "message": "Arcosec cannot be empty" });
                validade = false
            };
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
            if (props.type === "name") {
                const data = {
                    name
                };
                searchName(data);
            }
            else {
                const data = {
                    ra,
                    dec,
                    arcosec
                };
                searchCoordinate(data);
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

            <div className="search-form">
                {props.type === "name" ?

                    <Form inline onSubmit={handleSave} className="form-name">
                        <FormControl type="text" placeholder="Enter variable name" className=" mr-sm-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Button type="submit">Search</Button>
                    </Form>

                    :

                    <Form onSubmit={handleSave}>
                        <Form.Row>
                            <Form.Group controlId="variableRa">
                                <Form.Label>RA</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter variable RA"
                                    value={ra}
                                    onChange={(e) => setRa(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="variableDec">
                                <Form.Label>DEC</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter variable DEC"
                                    value={dec}
                                    onChange={(e) => setDec(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="variableArcosec">
                                <Form.Label>Arcosec</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter variable Arcosec"
                                    value={arcosec}
                                    onChange={(e) => setArcosec(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Button type="submit">Search</Button>
                    </Form>
                }
            </div>
        </>
    );
}
