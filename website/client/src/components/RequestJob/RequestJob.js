import React from 'react';
import './RequestJob.css';
import '../../components/GoogleApiWrapper'
import GoogleApiWrapper from "../GoogleApiWrapper";

class RequestJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depth: 0.0,
            capacity: 0,
            latitude: 0.0,
            longitude: 0.0
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(name, "=", value);
        })
    };

    onSubmit = () => {
        // TODO
    };

    render() {
        return(
          <div className="request-job-page">
              <div className="about-us-title">
                  Request Job
              </div>
              <div className="row" style={{height:"100vh"}}>
                  <div className="flex-column-40 col-about-left">
                      <div className="variable">
                          <label>Boat Depth (meters)</label>
                          <input
                              placeholder="0.0 m"
                              type="text"
                              name="depth"
                              onChange={this.handleChange}
                          />
                      </div>
                      <div className="variable">
                          <label>Boat Max Capacity</label>
                          <input
                              placeholder="0 people"
                              type="text"
                              name="capacity"
                              onChange={this.handleChange}
                          />
                      </div>
                      <div className="variable">
                          <label>Boat Starting Latitude</label>
                          <input
                              placeholder="0.0"
                              type="text"
                              name="latitude"
                              onChange={this.handleChange}
                          />
                      </div>
                      <div className="variable">
                          <label>Boat Starting Longitude</label>
                          <input
                              placeholder="0.0"
                              type="text"
                              name="longitude"
                              onChange={this.handleChange}
                          />
                      </div>
                      <div className="request" onClick={() => this.onSubmit}>
                          Request Job
                      </div>
                  </div>
                  <div className="flex-column-60 col-about-right">
                      <GoogleApiWrapper/>
                  </div>
              </div>
          </div>
        )
    }
}

export default RequestJob;