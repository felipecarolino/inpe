import React, { useState, useEffect } from 'react';

import { Link, useHistory } from "react-router-dom";

import api from '../../services/api';

import { isAuthenticated, logout } from "./../../services/auth";

import Pagination from "react-js-pagination";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import eye from './../../assets/images/eye.svg';
import edit from './../../assets/images/edit.svg';
import deleteIcon from './../../assets/images/delete.svg';
import download from './../../assets/images/download.svg';
import add from './../../assets/images/add.svg';


export default function ListVariables() {

    const history = useHistory();

    const [variables, setVariables] = useState([]);

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [id, setId] = useState();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("d-none")

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    async function getVariables(page) {
        const result = await api.get('variables?page=' + page);
        setVariables(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    async function getAll() {
        let itemsFormatted = [];
        const result = await api.get('variables');
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
        return itemsFormatted;
    };

    useEffect(() => {
        getVariables(currentPage);
    }, [currentPage]);

    async function deleteVariable() {
        try {
            await api.delete('variables/' + id);
            setDeleteModalShow(false);
            setVariables(variables.filter(variable => variable.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired" || error.response.data.message === "Token not provided") {
                Logout();
            }
            setErrorsList([
                {
                    "id": 1, "message": "Error to delete variable"
                },
                {
                    "id": 2, "message": error.response.data.message
                },
            ]);
            setClassErros("");
            setDeleteModalShow(false);
            setErrorModalShow(true);
        }
    }

    function ErrorModal(props) {
        return (
            <Modal
                {...props}
                centered
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"alert alert-danger " + classErrors} >
                        {[...errorsList].map((item) => (
                            <span key={item.id}>{item.message} <br /></span>
                        ))}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onHide}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function DeleteModal(props) {
        return (
            <Modal
                {...props}
                centered
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this variable? This process cannot be undone.
            </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
                    <Button variant="primary" onClick={deleteVariable}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function convertToCSV(objArray) {
        var array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line !== '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    async function exportCSVFile(fileTitle) {
        let items = await getAll();

        let headers = {
            name: 'Name', // remove commas to avoid errors
            ra: "RA",
            dec: "DEC",
            per: "Orb_per",
            simbad: "SIMBAD",
            ads: "ADS"
        };

        if (headers) {
            items.unshift(headers);
        }

        // Convert Object to JSON
        var jsonObject = JSON.stringify(items);

        var csv = convertToCSV(jsonObject);

        var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, exportedFilenmae);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", exportedFilenmae);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    return (
        <Container fluid="md" className="pr-0 pl-0">
            <Row>
                <Col className="mt-2">
                    <Navbar bg="light" variant="light" className="justify-content-between" style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Navbar.Brand className="m-0"><strong>Cataclysmic Variables List</strong></Navbar.Brand>
                        <Col xs="auto" className="p-0">
                            <Link to="variables/create" className={isAuthenticated() ? "" : "d-none"}>
                                <Image width="24px" src={add} alt="Add Icon" />
                            </Link>
                            <Link to="#" className="ml-sm-3 ml-2">
                                <Image width="20px" src={download} onClick={() => exportCSVFile('Variables')} alt="Download Icon" />
                            </Link>
                        </Col>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>RA</th>
                                <th>DEC</th>
                                <th>Orb_Per</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                variables.map((item, idx) => {
                                    return <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.ra}</td>
                                        <td>{item.dec}</td>
                                        <td>{item.per}</td>
                                        <td>
                                            <Link to={{ pathname: `/variables/view/${item.id}` }} className="mr-2">
                                                <Image width="24px" src={eye} fluid />
                                            </Link>
                                            <Link to={{ pathname: `/variables/edit/${item.id}` }} className={isAuthenticated() ? "mr-2" : "d-none"}>
                                                <Image width="22px" src={edit} fluid />
                                            </Link>
                                            <Link to="#" className={isAuthenticated() ? "" : "d-none"}>
                                                <Image width="19px" src={deleteIcon} fluid
                                                    onClick={() => {
                                                        setId(item.id);
                                                        setDeleteModalShow(true);
                                                    }}
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="justify-content-center mt-2">
                <Col xs="auto">
                    <Pagination
                        hideDisabled
                        activePage={currentPage}
                        itemsCountPerPage={totalPageItems}
                        totalItemsCount={totalItems}
                        onChange={(getVariables)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </Col>
            </Row>
            <DeleteModal
                show={deleteModalShow}
                onHide={() => {
                    setDeleteModalShow(false)
                    setErrorsList([])
                    setClassErros("d-none")
                }}
            />
            <ErrorModal
                show={errorModalShow}
                onHide={() => {
                    setErrorModalShow(false)
                    setErrorsList([])
                    setClassErros("d-none")
                }}
            />
        </Container>
    )
}