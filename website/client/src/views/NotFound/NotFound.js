import React from 'react';
import Button from 'react-bootstrap/Button';
import './NotFound.css';

const NotFound = () => {
    return(
        <div className="not-found-container">
            <p id="page404-code"> Oops!
                <div id="page404-text">
                    It appears that the page you are looking for is not available.
                </div>
            </p>
            <p id="page404-button">
                <Button variant="info" onClick={(event) =>
                    {window.history.back();}}> Go Back
                </Button>
            </p>
        </div>
    )
};

export default NotFound;
