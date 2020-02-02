import React from 'react';
import './Volunteer.css';
import MapContainer from "../MapContainer/MapContainer";
import axios from 'axios';

class Volunteer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depth: 0.0,
            capacity: 0,
            latitude: 0.0,
            longitude: 0.0,
            phoneNumber: '',
            googleKey: '',
            keyIsLoading: true,
            gpxData: [],
            dataIsLoading: true
        };
    }

    componentDidMount() {
        axios.get('/getKey')
            .then((res) => {
                const key = res.data;
                this.setState({
                    googleKey: key
                }, () => {
                    this.setState({
                        keyIsLoading: false
                    })
                })
            });
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
        axios.get(`/api/getGPX?phone=${this.state.phoneNumber}`)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    gpxData: res.data.tracks[0].segments[0]
                }, () => {
                    this.setState({
                        dataIsLoading: false
                    })
                })
            })
    };

    render() {
        return(
          <div className="volunteer-page parallax">
              <div className="row" style={{height:"100vh"}}>
                  <div className="flex-column-40 col-volunteer-left">
                      <div className="volunteer-title">
                        Volunteer
                      </div>
                      <div className="volunteer-form">
                          <div className="variable">
                              <label>Phone Number</label>
                              <input
                                  placeholder="0123456789"
                                  type="text"
                                  name="phoneNumber"
                                  onChange={this.handleChange}
                              />
                          </div>
                          <div className="variable">
                              <label>Draft (meters)</label>

                              <input
                                  placeholder="0.0 m"
                                  type="text"
                                  name="depth"
                                  onChange={this.handleChange}
                              />
                          </div>
                          <div className="variable">
                              <label>Max. Boat Capacity</label>
                              <input
                                  placeholder="0-20"
                                  type="text"
                                  name="capacity"
                                  onChange={this.handleChange}
                              />
                          </div>
                          <div className="variable">
                              <label>Boat Starting Latitude</label>
                              <input
                                  placeholder="0.000000"
                                  type="text"
                                  name="latitude"
                                  onChange={this.handleChange}
                              />
                          </div>
                          <div className="variable">
                              <label>Boat Starting Longitude</label>
                              <input
                                  placeholder="0.000000"
                                  type="text"
                                  name="longitude"
                                  onChange={this.handleChange}
                              />
                          </div>
                          <div className="request" onClick={() => this.onSubmit()}>
                              Request Job
                          </div>
                      </div>
                  </div>
                  <div className="flex-column-60 col-volunteer-right">
                      {
                        !this.state.keyIsLoading && !this.state.dataIsLoading ?
                        <MapContainer
                            googleKey={this.state.googleKey}
                            geoData={this.state.gpxData}
                            id="google-map"
                        />
                        : null
                      }
                  </div>
              </div>
          </div>
        )
    }
}

export default Volunteer;
