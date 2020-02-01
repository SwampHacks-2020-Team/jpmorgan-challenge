import React from 'react';
import './RequestJob.css';

class RequestJob extends React.Component {
    render() {
        return(
          <div className="request-job-page">
              <div className="row" style={{height:"100vh"}}>
                  <div className="flex-column-40 col-about-left">
                  </div>
                  <div className="flex-column-60 col-about-right">
                      <div className="about-us-title">
                          Request Job
                      </div>
                  </div>
              </div>
          </div>
        )
    }
}

export default RequestJob
