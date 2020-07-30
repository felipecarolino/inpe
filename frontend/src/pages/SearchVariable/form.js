import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './style.css';
import InputMask from 'react-input-mask';
import Navbar from 'react-bootstrap/Navbar';

import api from '../../services/api';


export default function FormSearch(props) {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")
    const [name, setName] = useState("");
    const [ra, setRa] = useState("");
    const [dec, setDec] = useState("");
    const [arcosec, setArcosec] = useState(5);

    useEffect(() => {
        setErrorsList([]);
        setClassErros("hidden");
    }, [props.type])

    useEffect(() => {
        if (name && props.type === "name") {
            searchName({name})
        }

        if (ra && dec && arcosec && props.type === "coordinates") {
            const data = {
                ra,
                dec,
                arcosec
            };
            searchCoordinates(data);
        }
        // eslint-disable-next-line
    }, [props.currentPage])

    async function searchName(data) {
        try {
            const result = await api.post('variables/searchByName?page=' + props.currentPage, data);
            if (JSON.parse(result.data.data).data[0] !== undefined) {
                props.update(JSON.parse(result.data.data).data)
                props.pagination(JSON.parse(result.data.data).total, props.currentPage, JSON.parse(result.data.data).per_page);
            }
            else {
                setErrorsList([
                    {
                        "id": 2, "message": "Variable not found"
                    }
                ]);
                setClassErros("block");
                props.showTable(false);
            }
        } catch (error) {
            setErrorsList([
                {
                    "id": 2, "message": "Error to search variable"
                }
            ]);
            setClassErros("block");
        }
    }

    async function searchCoordinates(data) {
        try {
            const result = await api.post('variables/searchByCoord?page=' + props.currentPage, data);
            if (JSON.parse(result.data.data).data[0] !== undefined) {
                props.update(JSON.parse(result.data.data).data)
                props.pagination(JSON.parse(result.data.data).total, props.currentPage, JSON.parse(result.data.data).per_page);
            }
            else {
                setErrorsList([
                    {
                        "id": 2, "message": "Variable not found"
                    }
                ]);
                setClassErros("block");
                props.showTable(false);
            }
        } catch (error) {
            setErrorsList([
                {
                    "id": 3, "message": "Error to search variable"
                }
            ]);
            setClassErros("block");
        }
    }

    async function getAllByName(data) {
        let itemsFormatted = [];
        const result = await api.post('variables/searchByName', data);
        result.data.data.forEach((item) => {
            itemsFormatted.push({
                name: item.name.replace(/,/g, ''), // remove commas to avoid errors,
                ra: item.ra,
                dec: item.dec,
                per: item.per,
                simbad: `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`,
                ads: `https://ui.adsabs.harvard.edu/search/q=object:${item.name}`
            });
        });
        props.catalog(itemsFormatted);
    };

    async function getAllByCoord(data) {
        let itemsFormatted = [];
        const result = await api.post('variables/searchByCoord', data);
        result.data.data.forEach((item) => {
            itemsFormatted.push({
                name: item.name.replace(/,/g, ''), // remove commas to avoid errors,
                ra: item.ra,
                dec: item.dec,
                per: item.per,
                simbad: `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`,
                ads: `https://ui.adsabs.harvard.edu/search/q=object:${item.name}`
            });
        });
        props.catalog(itemsFormatted);
    };

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
                getAllByName(data);
            }
            else {
                const data = {
                    ra,
                    dec,
                    arcosec
                };
                searchCoordinates(data);
                getAllByCoord(data);
            }
        }

        else {
            props.showTable(false);
        }
    }

    return (
        <>

            <div className="search-form">

                <Navbar bg="light" className="title">
                    <Navbar.Brand>Search results by {props.type}</Navbar.Brand>
                </Navbar>

                <div className={"alert alert-danger " + classErrors} >
                    {[...errorsList].map((item) => (
                        <span key={item.id}>{item.message} <br /></span>
                    ))}
                </div>

                {props.type === "name" ?
                        <Form onSubmit={handleSave} className="form-name">
                            <Form.Row>
                                <Form.Group controlId="variableName">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter variable name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit">Search</Button>
                        </Form>

                    :

                        <Form onSubmit={handleSave} className="form-coordinates">
                            <Form.Row>
                                <Form.Group controlId="variableRa">
                                    <Form.Label>RA</Form.Label>
                                    <Input
                                        mask="99 99 99.99"
                                        value={ra}
                                        onChange={(e) => setRa(e.target.value)}
                                        placeholder="hh mm ss.ss" />
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
                                        mask="?99 99 99.99"
                                        value={dec}
                                        onChange={(e) => setDec(e.target.value)}
                                        placeholder="+/-dd mm ss.ss" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group controlId="variableArcosec">
                                    <Form.Label>Arcosec</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter variable Arcosec"
                                        min="5"
                                        max="10000"
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