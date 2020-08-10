import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import InputMask from 'react-input-mask';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SearchForm(props) {

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("d-none")
    const [name, setName] = useState("");
    const [ra, setRa] = useState("");
    const [dec, setDec] = useState("");
    const [arcosec, setArcosec] = useState(5);

    useEffect(() => {
        setErrorsList([]);
        setClassErros("d-none");
    }, [props.type])

    useEffect(() => {
        if (name && props.type === "name") {
            searchName({ name })
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
                setClassErros("");
                props.showTable(false);
                props.showHeader("d-none");
            }
        } catch (error) {
            setErrorsList([
                {
                    "id": 2, "message": "Error to search variable"
                }
            ]);
            setClassErros("");
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
                setClassErros("");
                props.showTable(false);
                props.showHeader("d-none");
            }
        } catch (error) {
            setErrorsList([
                {
                    "id": 3, "message": "Error to search variable"
                }
            ]);
            setClassErros("");
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
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col>
                    <Navbar bg="light" variant="light" className="justify-content-center justify-content-md-start" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Navbar.Brand><strong>Search variables by {props.type}</strong></Navbar.Brand>
                    </Navbar>
                </Col>
            </Row>

            <div className={"mt-2 mb-0 alert alert-danger " + classErrors} >
                {[...errorsList].map((item) => (
                    <span key={item.id}>{item.message} <br /></span>
                ))}
            </div>

            {props.type === "name" ?
                <Form onSubmit={handleSave}>
                    <Row>
                        <Col className="mt-2">
                            <Form.Control
                                type="text"
                                placeholder="Enter variable name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="text-center text-md-left">
                        <Col className="mt-2">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
                :
                <Form onSubmit={handleSave}>
                    <Row>
                        <Col className="mt-2">
                            <Form.Label>RA</Form.Label>
                            <Input
                                mask="99 99 99.9999999999"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                                placeholder="hh mm ss.ssssssssss"
                            />

                            <Form.Label className="mt-2">DEC</Form.Label>
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
                                placeholder="+/-dd mm ss.sssssssss"
                            />

                            <Form.Label className="mt-2">Arcosec</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter variable Arcosec"
                                min="5"
                                max="10000"
                                value={arcosec}
                                onChange={(e) => setArcosec(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className="text-center text-md-left">
                        <Col className="mt-2">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Row>
                </Form>
            }
        </Container >
    )
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