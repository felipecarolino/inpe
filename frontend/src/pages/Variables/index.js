import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Pagination from "react-js-pagination";

import { isAuthenticated } from "./../../services/auth";
import { logout } from "../../services/auth";

import './style.css';

export default function Variables() {

    const history = useHistory();
    const [variables, setVariables] = useState([]);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);
    const [id, setId] = useState();
    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    async function GetVariables(page) {
        const result = await api.get('variables?page=' + page);
        setVariables(result.data.data);
        setTotalItems(result.data.total);
        setCurrentPage(page);
        setTotalPageItems(result.data.per_page);
    };

    useEffect(() => {
        GetVariables(currentPage);
    }, [currentPage]);

    async function getAll() {
        let itemsFormatted = [];
        const result = await api.get('variables');
        result.data.forEach((item) => {
            itemsFormatted.push({
                name: item.name.replace(/,/g, ''), // remove commas to avoid errors,
                ra: item.ra,
                dec: item.dec,
                per: item.per,
                type: item.type,
                simbad: `http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`,
                ads: `https://ui.adsabs.harvard.edu/search/q=object:${item.name}`
            });
        });
        return itemsFormatted;
    };

    async function deleteVariable() {
        try {
            await api.delete('variables/' + id);
            setDeleteModalShow(false);
            setVariables(variables.filter(variable => variable.id !== id))
        } catch (error) {
            if (error.response.data.message === "Token has expired") {
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
            setClassErros("block");
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
            ra: "RA (J2000.0)",
            dec: "DEC (J2000.0)",
            per: "Orbital period (d)",
            type: "Type",
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
        <div className="variables">
            <Card className="variables-card">
                <Card.Header>
                    <h5>Cataclysmic Variables List</h5>
                        {isAuthenticated()
                            ?
                            <Link to="/cataclysmic-variables/variables/create" className="nav-link">
                                <img src='/img/add.svg' alt="Add Icon" className="iconAdd" />
                            </Link> : null}
                </Card.Header>
                <Card.Title>
                    <Link to="#" className="nav-link download-catalog" onClick={() => exportCSVFile('Variables')}>
                        Download Catalog <img src='/img/download.svg' alt="Download Icon" className="iconDownload" />
                    </Link>
                </Card.Title>
                <Card.Body className="variables-card-body">
                    <div className="variables-table">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>RA (J2000.0)</th>
                                    <th>DEC (J2000.0)</th>
                                    <th>Orbital period (d)</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    variables.map((item, idx) => {
                                        return <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.ra.substr(0, 11)}</td>
                                            <td>{item.dec.substr(0, 12)}</td>
                                            <td>{item.per}</td>
                                            <td>{item.type}</td>
                                            <td>
                                                <Link to={{ pathname: `/cataclysmic-variables/variables/view/${item.id}` }} className="nav-link" target="_blank">
                                                    <img src='/img/eye.svg' alt="View Icon" className="iconView" />
                                                </Link>
                                                {isAuthenticated() ?
                                                    <>
                                                        <Link to={{ pathname: `/cataclysmic-variables/variables/edit/${item.id}` }} className="nav-link" target="_blank">
                                                            <img src='/img/edit.svg' alt="Edit Icon" className="iconEdit" />
                                                        </Link>
                                                        <img
                                                            className="iconDelete"
                                                            src='/img/trash.svg' alt="Delete Icon"
                                                            onClick={() => {
                                                                setId(item.id);
                                                                setDeleteModalShow(true);
                                                            }}
                                                        />
                                                    </>
                                                    : null}
                                            </td>
                                        </tr>
                                    })}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>

            <div className="variables-pagination">
                <Pagination
                    hideDisabled
                    activePage={currentPage}
                    itemsCountPerPage={totalPageItems}
                    totalItemsCount={totalItems}
                    onChange={(GetVariables)}
                />
            </div>

            <DeleteModal
                show={deleteModalShow}
                onHide={() => {
                    setDeleteModalShow(false)
                    setErrorsList([])
                    setClassErros("hidden")
                }}
            />
            <ErrorModal
                show={errorModalShow}
                onHide={() => {
                    setErrorModalShow(false)
                    setErrorsList([])
                    setClassErros("hidden")
                }}
            />
        </div>
    )
}
