import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import './style.css';

export default function Home() {

    return (
        <div className="home">
            <Jumbotron fluid>
                <Container>
                    <div className="div-img">
                        <Image src='/img/CV.jpg' fluid rounded className="cv-img" />
                        <figcaption><a href="https://en.wikipedia.org/wiki/GK_Persei#/media/File:GKPersei-MiniSuperNova-20150316.jpg" className="home-link" target="_blank" rel="noopener noreferrer">Image credit</a></figcaption>
                    </div>
                    <div className="text-div">
                        <h2>Cataclysmic Variables Portal</h2>
                        <p>
                            This site, the Cataclysmic Variable Portal (CV Portal), aims to be a repository of information to CV research.
                        Currently, the CV portal provides a collaborative <a href="/cataclysmic-variables/variables" className="home-link" target="_blank" rel="noopener noreferrer">catalog</a> of CVs.
                        The first version of this catalog is a merger of the <a href="https://wwwmpa.mpa-garching.mpg.de/RKcat/" className="home-link" target="_blank" rel="noopener noreferrer">Ritter & Kolb's</a> and <a href="https://archive.stsci.edu/prepds/cvcat/" className="home-link" target="_blank" rel="noopener noreferrer">Downes et al.'s</a> catalogs.
                        The present version allows the user to inspect (or download) the entire catalog or search objects by name or coordinates.
                        The object page has direct links to ADS and SIMBAD queries of the object.
                        The user can also submit new entries to the catalog on a single-object basis by a form or by submitting a csv file.
                        Those submissions should be approved by one of the CV Portal administrators and, after that, are automatically included in the catalog.
                        <br />
                            <a href="mailto:claudia.rodrigues@inpe.br?subject=Comments about Cataclysmic Variables Portal" className="home-link" target="_blank" rel="noopener noreferrer">Comments are welcome!</a>
                        </p>
                    </div>
                </Container>
            </Jumbotron>
        </div>
    )
}