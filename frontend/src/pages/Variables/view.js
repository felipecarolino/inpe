import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import './style.css';

export default function View(props) {

    const [variable, setVariable] = useState([]);
    const [name, setName] = useState('');
    const [ra, setRa] = useState('');
    const [dec, setDec] = useState('');

    useEffect(() => {
        const GetVariable = async () => {
            const result = await api.get('variables/' + props.match.params.id);
            setVariable(result.data.data);
            setName(result.data.data.name);
            setRa(result.data.data.ra.substr(0, 11));
            setDec(result.data.data.dec.substr(0, 12));
        };
        GetVariable();

    }, [props.match.params.id]);

    return (
        <div className="view-variable">
            <Card className="view-variable-card">
                <Card.Header>
                    <Link to="/cataclysmic-variables/variables" className="nav-link">
                        <img src='/img/arrowLeft.svg' alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>Object information</h5>
                </Card.Header>
                <Card.Body className="view-variable-card-body">
                    <div className="view-variable-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr >
                                    <th className="w-25">Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">RA (J2000.0)</th>
                                    <td>{ra}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">DEC (J2000.0)</th>
                                    <td>{dec}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Orbital period (d)</th>
                                    <td>{variable.per}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Type</th>
                                    <td>{variable.type}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">SIMBAD</th>
                                    <td>
                                        <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${name.indexOf("+") > -1 ? name.replace(/\+/g, "%2b") : name}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            View object in SIMBAD
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="w-25">ADS</th>
                                    <td>
                                        <a href={`https://ui.adsabs.harvard.edu/search/q=object:("${name.indexOf("+") > -1 ? name.replace(/\+/g, "%2b") : name}")`}
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
            </Card>
        </div>
    )
}
