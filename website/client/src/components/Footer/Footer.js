import React from 'react';
import './Footer.css'

class Footer extends React.Component {

    render() {
        return(
          <div className="footer">
              <p>
                  All images by &nbsp;<a href="https://www.gaiavisual.com/tsunami-images/" target="_blank" rel="noopener noreferrer">Gaia Visual</a>.
              </p>
          </div>
        )
    }
}

export default Footer
