import React from 'react';
import './AboutUs.css';

class AboutUs extends React.Component {
    render() {
        return(
          <div className="about-us-page">
              <div className="row" style={{height:"100vh"}}>
                  <div className="flex-column-40 col-about-left">
                  </div>
                  <div className="flex-column-60 col-about-right">
                      <div className="about-us-title">
                          OBJECTIVE: s u r v i v e
                      </div>
                      <div className="description">
                          <p>
                              Here, we have one objective: to help any person, in any place, at any time, affected by
                              any flood-related disaster, to survive. Our missions is, at the very least, to ensure that
                              all those stranded by flooding can survive and continue living their lives to the fullest.
                          </p>
                          <p>
                              Started by four young men in 2020 at the University of Florida with a passion for
                              engineering, we wanted to combine our interest in the interdisciplinary topics of
                              disaster relief and sustainability. We know first hand the impact floods caused by
                              hurricanes, tsunamis, heavy rain, and other natural disasters can have on people's lives.
                          </p>
                          <p>
                              People currently stranded by floods can send us their name, phone number, party size, and
                              a message. We will use an advanced technical synergy of algorithms, machine learning,
                              cloud computing, and information communication to find an optimal path that rescue boats
                              can take to reach everyone in danger.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default AboutUs
