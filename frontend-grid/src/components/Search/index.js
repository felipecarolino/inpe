import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import Form from './form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

import Pagination from "react-js-pagination";

import download from './../../assets/images/download.svg';

export default function Search(props) {

    const [variable, setVariable] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showHeader, setShowHeader] = useState("d-none")

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

    function setPage(totalItems, currentPage, totalPageItems) {
        setTotalItems(totalItems);
        setCurrentPage(currentPage);
        setTotalPageItems(totalPageItems);
    }

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        setShowTable(true);
        if (variable.length > 0) {
            setShowHeader("");
        }
    }, [variable])

    useEffect(() => {
        setVariable([]);
        setShowTable(false);
        setShowHeader("d-none");
        setTotalItems(0);
        setCurrentPage(1);
        setTotalPageItems(1);
    }, [props.match.params.type])

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
                    <Form
                        type={props.match.params.type}
                        update={(variable) => setVariable(variable)}
                        showTable={(show) => setShowTable(show)}
                        showHeader={(show) => setShowHeader(show)}
                        currentPage={currentPage}
                        pagination={setPage}
                        catalog={(variables) => setCatalog(variables)}
                    />
                </Col>
            </Row>
            <Row className={showHeader}>
                <Col className="mt-2">
                    <Navbar variant="light" className={"justify-content-between"} style={{ borderBottom: "solid 4px #0f4098" }}>
                        <Navbar.Brand>Search results</Navbar.Brand>
                        <Link to="#">
                            <Image width="22px" src={download} onClick={() => exportCSVFile(catalog, 'Variables')} alt="Download Icon" />
                        </Link>
                    </Navbar>
                </Col>
            </Row>
            {showTable ?
                <>
                    <Row>
                        <Col className="mt-2">
                            {
                                variable.map((item, idx) => {
                                    return (
                                        <Table striped bordered hover key={item.id}>
                                            <tbody>
                                                <tr >
                                                    <th>ID</th>
                                                    <td>{item.id}</td>
                                                </tr>
                                                <tr >
                                                    <th>Name</th>
                                                    <td>{item.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>RA</th>
                                                    <td>{item.ra}</td>
                                                </tr>
                                                <tr>
                                                    <th>DEC</th>
                                                    <td>{item.dec}</td>
                                                </tr>
                                                <tr>
                                                    <th>Orb_Per</th>
                                                    <td>{item.per}</td>
                                                </tr>
                                                <tr>
                                                    <th>SIMBAD</th>
                                                    <td>
                                                        <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            View object in SIMBAD
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>ADS</th>
                                                    <td>
                                                        <a href={`https://ui.adsabs.harvard.edu/search/q=object:${item.name}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer">
                                                            View object in ADS
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-2">
                        <Col xs="auto">
                            <Pagination
                                hideDisabled
                                activePage={currentPage}
                                itemsCountPerPage={totalPageItems}
                                totalItemsCount={totalItems}
                                onChange={handlePageChange.bind(this)}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </Col>
                    </Row>
                </>
                : null}
        </Container>
    )
}   