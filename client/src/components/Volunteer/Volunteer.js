import React from 'react';
import './Volunteer.css';
import MapContainer from "../MapContainer/MapContainer";
import axios from 'axios';

const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/);
const longitudeRegex = RegExp(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
const latitudeRegex = longitudeRegex;
const draftRegex = RegExp(/^(?:[1-9]|[1-4][0-9]|50)$/);
const capacityRegex = RegExp(/^[1-9]$|^0[1-9]$|^1[0-9]$|^20$/);

const round = (float, places) => {
    return Number(parseFloat(float).toFixed(places));
};

class Volunteer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name         : null,
            draft        : null,
            capacity     : null,
            latitude     : null,
            longitude    : null,
            phoneNumber  : null,
            googleKey:   '',
            keyIsLoading : true,
            gpxData: [],
            dataIsLoading: true,
            formErrors: { name: "", draft: "", capacity: "", phoneNumber: "", longitude: "", latitude: ""},
        };
    }

    getCoordinates =  async () => {
        await navigator.geolocation.getCurrentPosition(
            (position) => this.setState({
                latitude: round(position.coords.latitude, 6),
                longitude: round(position.coords.longitude, 6)
            }, () => {
                console.log(this.state.latitude, this.state.longitude);
                this.getLong();
                this.getLat();
            })
        )
    };

    componentDidMount() {
      /*
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
            });*/
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, () => {
            console.log(name, "=", value);
        })
        e.preventDefault();
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "name":
                formErrors.name = value.length < 3 ? "minimum 3 characters required" : "";
            break;
            case "phoneNumber":
                formErrors.phoneNumber = phoneRegex.test(value) ? "" : "invalid phone number";
            break;
            case "draft":
                formErrors.draft = draftRegex.test(value) ? "" : "invalid draft (m)";
            break;
            case "capacity":
                formErrors.capacity = capacityRegex.test(value) ? "" : "invalid capacity";
            break;
            case "longitude":
                formErrors.longitude = longitudeRegex.test(value) ? "" : "invalid longitude";
            break;
            case "latitude":
                formErrors.latitude = latitudeRegex.test(value) ? "" : "invalid latitude";
            break;
            default:
            break;
        }
        this.setState({ formErrors, [name]: value });
    };

    onSubmit = () => {
        axios.post('/api/rescuerNewMission', {
            name: "",
            phone: this.state.phoneNumber.replace(/\D/g, ""),
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            boat: "",
            boat_capacity: this.state.capacity,
            boat_depth: this.state.draft
        }).then((res) => {
            console.log(res.data);
            this.setState({
                gpxData: res.data.tracks[0].segments[0]
          }, () => {
                      this.setState({
                        dataIsLoading: false
                  })
          })
        })
        /*
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
            */
    };

    getLong() {
        return this.state.longitude;
    }

    getLat() {
        return this.state.latitude;
    }

    render() {
        const { formErrors } = this.state;
        return(
          <div className="volunteer-page parallax">
              <div className="row" style={{height:"120vh"}}>
                  <div className="flex-column-40 col-volunteer-left">
                      <div className="volunteer-title">
                        Volunteer
                      </div>
                      <div className="volunteer-form">
                          <div className="variable">
                               <label htmlFor="name">Name</label>
                               <input className={formErrors.name.length > 0 ? "error" : null}
                                      placeholder="Your Name"
                                      type="name"
                                      name="name"
                                      noValidate
                                      onChange={this.handleChange}/>
                               {formErrors.name.length > 0 && (
                                   <span className="errorMessage">{formErrors.name}</span>
                               )}
                           </div>
                           <div className="variable">
                                <label htmlFor="phoneNumber">Your Phone Number</label>
                                <input className={formErrors.phoneNumber.length > 0 ? "error" : null}
                                       placeholder="(---) --- ---"
                                       type="phoneNumber"
                                       name="phoneNumber"
                                       noValidate
                                       onChange={this.handleChange}/>
                                {formErrors.phoneNumber.length > 0 && (
                                    <span className="errorMessage">{formErrors.phoneNumber}</span>
                                )}
                            </div>
                          <div className="variable">
                              <label htmlFor="draft">Draft (m)</label>
                              <input className={formErrors.draft.length > 0 ? "error" : null}
                                     placeholder="0-50 m"
                                     type="draft"
                                     name="draft"
                                     noValidate
                                     onChange={this.handleChange}/>
                              {formErrors.draft.length > 0 && (
                                  <span className="errorMessage">{formErrors.draft}</span>
                              )}
                          </div>
                          <div className="variable">
                              <label>Max. Boat Capacity</label>
                              <input className={formErrors.capacity.length > 0 ? "error" : null}
                                  placeholder="0-20"
                                  type="text"
                                  name="capacity"
                                  noValidate
                                  onChange={this.handleChange}/>
                              {formErrors.capacity.length > 0 && (
                                  <span className="errorMessage">{formErrors.capacity}</span>
                              )}
                          </div>
                          <div className="variable longitude">
                              <label>Starting Longitude</label>
                              <input className={formErrors.longitude.length > 0 ? "error" : null}
                                  placeholder="0.000000"
                                  type="text"
                                  name="longitude"
                                  noValidate
                                  value={this.getLong()}
                                  onChange={this.handleChange}/>
                              {formErrors.longitude.length > 0 && (
                                  <span className="errorMessage">{formErrors.longitude}</span>
                              )}
                          </div>
                          <div className="variable latitude">
                              <label>Starting Latitude</label>
                              <input className={formErrors.latitude.length > 0 ? "error" : null}
                                  placeholder="0.000000"
                                  type="text"
                                  name="latitude"
                                  noValidate
                                  value={this.getLat()}
                                  onChange={this.handleChange}/>
                              {formErrors.latitude.length > 0 && (
                                  <span className="errorMessage">{formErrors.latitude}</span>
                              )}
                          </div>
                          <div className="get-coordinates">
                              <div className="coord-button" onClick={() => this.getCoordinates()}>
                                  Get My Coordinates
                              </div>
                          </div>
                          <div className="request" onClick={() => this.onSubmit()}>
                              Request Job
                          </div>
                      </div>
                  </div>
                  <div className="flex-column-60 col-volunteer-right">
                      {
                        !false && !this.state.dataIsLoading ?
                        <MapContainer
                            googleKey={'AIzaSyAcCv2aPhvkiRdWFtFptCuobFWxza1G4Ww'}
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
