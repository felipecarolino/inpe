import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from '../../services/api';

import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import IconBack from './../../assets/img/arrowLeft.svg';

import './style.css';

export default function View(props) {

    const [submission, setSubmission] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const getSubmission = async () => {
            const result = await api.get('submissions/' + props.match.params.id);
            setSubmission(result.data.data);
            setName(result.data.data.name);
        };
        getSubmission();

    }, [props.match.params.id]);

    return (
        <div className="view-submission">
            <Card className="view-submission-card">
                <Card.Header>
                    <Link to="/management-submissions/submissions" className="nav-link">
                        <img src={IconBack} alt="Back Icon" className="iconBack" />
                    </Link>
                    <h5>View Submission</h5>
                </Card.Header>
                <Card.Body className="view-submission-card-body">
                    <div className="view-submission-table">
                        <Table striped bordered hover>
                            <tbody>
                                <tr >
                                    <th className="w-25">ID</th>
                                    <td>{submission.id}</td>
                                </tr>
                                <tr >
                                    <th className="w-25">Name</th>
                                    <td>{submission.name}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">RA</th>
                                    <td>{submission.ra}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">DEC</th>
                                    <td>{submission.dec}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Orb_Per</th>
                                    <td>{submission.per}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">Observations</th>
                                    <td>{submission.observations}</td>
                                </tr>
                                <tr>
                                    <th className="w-25">SIMBAD</th>
                                    <td>
                                        <a href={`http://simbad.u-strasbg.fr/simbad/sim-id?Ident=${name}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            View object in SIMBAD
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="w-25">ADS</th>
                                    <td>
                                        <a href={`https://ui.adsabs.harvard.edu/search/q=object:${name}`}
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
