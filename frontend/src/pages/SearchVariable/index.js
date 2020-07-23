import React, { useState, useEffect } from 'react';
import FormSearch from './form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Pagination from "react-js-pagination";
import './style.css';

export default function SearchVariable(props) {

    const [variable, setVariable] = useState([]);
    const [showTable, setShowTable] = useState(false);

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
    }, [variable])

    useEffect(() => {
        setVariable([]);
        setShowTable(false);
        setTotalItems(0);
        setCurrentPage(1);
        setTotalPageItems(1);
    }, [props.match.params.type])

    function handlePageChange(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="search-variable">
            <FormSearch
                type={props.match.params.type}
                update={(variable) => setVariable(variable)}
                showTable={(show) => setShowTable(show)}
                currentPage={currentPage}
                pagination={setPage}
            />

            {showTable ?
                <>
                    <Card className="search-variable-card">
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