import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import FormSearch from './form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Pagination from "react-js-pagination";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";
import { logout } from "../../services/auth";

import { isAuthenticated } from "./../../services/auth";

import api from '../../services/api';

import './style.css';

export default function SearchVariable(props) {

    const history = useHistory();
    const [variable, setVariable] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showHeader, setShowHeader] = useState("hidden")

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

    const [id, setId] = useState();

    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [errorModalShow, setErrorModalShow] = useState(false);

    const [errorsList, setErrorsList] = useState([]);
    const [classErrors, setClassErros] = useState("hidden")

    function setPage(totalItems, currentPage, totalPageItems) {
        setTotalItems(totalItems);
        setCurrentPage(currentPage);
        setTotalPageItems(totalPageItems);
    }

    useEffect(() => {
        setShowTable(true);
        if (variable.length > 0) {
            setShowHeader("block");
        }
    }, [variable])

    useEffect(() => {
        setVariable([]);
        setShowTable(false);
        setShowHeader("hidden");
        setTotalItems(0);
        setCurrentPage(1);
        setTotalPageItems(1);
    }, [props.match.params.type])

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
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

    function exportCSVFile(items, fileTitle) {

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

    async function deleteVariable() {
        try {
            await api.delete('variables/' + id);
            setDeleteModalShow(false);
            setVariable(variable.filter(variable => variable.id !== id))
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

    const Logout = () => {
        history.push('/restrict-area');
        logout();
    }

    return (
        <div className="search-variable">
            <FormSearch
                type={props.match.params.type}
                update={(variable) => setVariable(variable)}
                showTable={(show) => setShowTable(show)}
                currentPage={currentPage}
                pagination={setPage}
                catalog={(variables) => setCatalog(variables)}
            />

            {showTable ?
                <>
                    <Card className="search-variable-card">
                        <div className={showHeader}>
                            <Card.Title>
                                <Link to="#" className="nav-link download-catalog" onClick={() => exportCSVFile(catalog, 'Variables')}>
                                    Download Results <img src='/img/download.svg' alt="Download Icon" className="iconDownload" />
                                </Link>
                            </Card.Title>
                            <Card.Header>
                                <h5>Search objects by {props.match.params.type}</h5>
                            </Card.Header>
                        </div>
                        <Card.Body className={"search-variable-card-body " + showHeader}>
                            <div className="search-variable-table">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>RA (J2000.0)</th>
                                            <th>DEC (J2000.0)</th>
                                            <th>Orbital period (d)</th>
                                            <th>Type</th>
                                            <th>SIMBAD</th>
                                            <th>ADS</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            variable.map((item, idx) => {
                                                return <tr key={item.id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.ra.substr(0, 11)}</td>
                                                    <td>{item.dec.substr(0, 12)}</td>
                                                    <td>{item.per}</td>
                                                    <td>{item.type}</td>
                                                    <td>
                                                        <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            View object in SIMBAD
                                                            </a>
                                                    </td>
                                                    <td>
                                                        <a href={`https://ui.adsabs.harvard.edu/search/q=object:("${item.name}")`}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            View object in ADS
                                                            </a>
                                                    </td>
                                                    <td>
                                                        <Link to={{ pathname: `/cataclysmic-variables/variables/view/${item.id}` }} className="nav-link">
                                                            <img src='/img/eye.svg' alt="View Icon" className="iconView" />
                                                        </Link>
                                                        {isAuthenticated() ?
                                                            <>
                                                                <Link to={{ pathname: `/cataclysmic-variables/variables/edit/${item.id}` }} className="nav-link">
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
                            onChange={handlePageChange.bind(this)}
                        />
                    </div>
                </>
                : null}
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