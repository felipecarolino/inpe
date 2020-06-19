import React, { useState, useEffect } from 'react';
import FormSearch from './form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import './style.css';

export default function SearchVariable(props) {

    const [variable, setVariable] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect( () => {
        if (variable.id !== undefined) {
            setShowTable(true);
        }
    
    }, [variable])

    return (

        <div className="search-variable">
            <FormSearch type={props.match.params.type} update={(variable) => setVariable(variable)} />

            {showTable ? <Card className="search-variable-card">
                <Card.Header>
                    <h5>Search Cataclysmic Variable</h5>
                </Card.Header>
                <Card.Body className="search-variable-card-body">
                    <div className="search-variable-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr >
                                    <th className="w-25">ID</th>
                                    <td>{variable.id}</td>
                                </tr>
                                <tr >
                                    <th className="w-25">Name</th>
                                    <td>{variable.Name_RK}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">RA</th>
                                    <td>{variable.RAJ2000_RK}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">DEC</th>
                                    <td>{variable.DEJ2000_RK}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">SIMBAD</th>
                                    <td>
                                        <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${variable.Name_RK.toLowerCase().replace(/ /g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            View object in SIMBAD
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="w-25">ADS</th>
                                    <td>
                                        <a href={`https://ui.adsabs.harvard.edu/search/q=object:${variable.Name_RK.toLowerCase().replace(/ /g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            View object in ADS
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card> : null}
        </div>
    )
}   