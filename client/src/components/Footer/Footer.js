import React from 'react';
import FBLogo from './../../assets/logo-facebook.svg';
import IGLogo from './../../assets/logo-instagram.svg';
import './Footer.css'

class Footer extends React.Component {

    render() {
        return(
          <div className="footer">
              <div className="socialmedia-list">
                  <a href="https://fb.me/rtrescue.swamphacks" target="_blank" rel="noopener noreferrer"><img src={FBLogo} alt="Facebook logo" style={{height: "50px"}}/></a>
                  <a href="https://instagram.com/rtrescue" target="_blank" rel="noopener noreferrer"><img src={IGLogo} alt="Instagram logo" style={{height: "50px"}}/></a>
                  <span className="footer-credits">
                      All images by &nbsp;<a href="https://www.gaiavisual.com/tsunami-images/" target="_blank" rel="noopener noreferrer">Gaia Visual</a>.
                  </span>
              </div>
          </div>
        )
    }
}

export default Footer
