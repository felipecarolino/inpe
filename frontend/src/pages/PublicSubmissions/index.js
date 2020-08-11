import React from 'react';
import PublicSubmissionsForm from './form';
import Card from 'react-bootstrap/Card';
import IconDownload from './../../assets/img/download.svg';
import template from './../../assets/template.csv';

export default function Create() {


    return (
        <div className="public-submissions">
            <Card className="public-submissions-card">
                <Card.Header>
                    <h5>Submit New Cataclysmic Variable</h5>
                    <a href={template} download="template.csv">
                        <img width="21px" src={IconDownload} alt="Download Icon" className="iconDownload" />
                    </a>
                </Card.Header>
                <Card.Body className="public-submissions-card-body">
                    <PublicSubmissionsForm />
                </Card.Body>
            </Card>
        </div >
    )
}