import React from 'react';
import Draggable from "./../Draggable/Draggable"
import './AboutUs.css';

class AboutUs extends React.Component {
    render() {
        return(
          <div className="about-us-page">
              <Draggable x={20} y={450}>
                  {/*Note: The 'sticky' class CSS is located in '~/assets/theme.css'*/}
                  <div className="sticky">
                      <div className="sticky-text"  /*contentEditable="true" spellCheck="false"*/>
                          COMING SOON
                      </div>
                  </div>
              </Draggable>
          </div>
        )
    }
}

export default AboutUs
