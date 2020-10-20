import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import './style.css';

export default function Documentation() {

    return (
        <div className="documentation">
            <Jumbotron fluid>
                <Container>
                    <p>
                        Presently, the CV Portal provides access to a CV catalog, which is described in the following <a href="/documentation" className="documentation-link">publication</a>.
                    </p>
                </Container>
            </Jumbotron>
        </div>
    )
}