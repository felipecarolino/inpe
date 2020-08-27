import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import FormSearch from './form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Pagination from "react-js-pagination";

import './style.css';

export default function SearchVariable(props) {

    const [variable, setVariable] = useState([]);
    const [catalog, setCatalog] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [showHeader, setShowHeader] = useState("hidden")

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPageItems, setTotalPageItems] = useState(1);

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
                            <Card.Header>
                                <h5>Search Results</h5>
                            </Card.Header>
                            <Card.Title>
                                <Link to="#" className="nav-link download-catalog" onClick={() => exportCSVFile(catalog, 'Variables')}>
                                    Download Results <img src='/img/download.svg' alt="Download Icon" className="iconDownload" />
                                </Link>
                            </Card.Title>
                        </div>
                        <Card.Body className="search-variable-card-body">
                            <div className="search-variable-table">
                                {
                                    variable.map((item, idx) => {
                                        return (
                                            <Table striped bordered hover key={item.id}>
                                                <tbody>
                                                    <tr >
                                                        <th className="w-25">ID</th>
                                                        <td>{item.id}</td>
                                                    </tr>
                                                    <tr >
                                                        <th className="w-25">Name</th>
                                                        <td>{item.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="w-25">RA</th>
                                                        <td>{item.ra}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="w-25">DEC</th>
                                                        <td>{item.dec}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="w-25">Orb_Per</th>
                                                        <td>{item.per}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="w-25">SIMBAD</th>
                                                        <td>
                                                            <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${item.name}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer">
                                                                View object in SIMBAD
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="w-25">ADS</th>
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
        </div>
    )
}   