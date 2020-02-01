import React, { Component } from "react";
import "./EmergencyForm.css";
const GetHelp = require('./GetHelp.js');

const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/);
const partySizeRegex = RegExp(/^[1-9][0-9]?$/);
const longitudeRegex = RegExp(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
const latitudeRegex = longitudeRegex;

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
    return valid;
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  name:       null,
                        phone:      null,
                        partySize:  null,
                        longitude:  null,
                        latitude:   null,
                        message:    null,
                        formErrors: { name: "", partySize: "", phone: "", longitude: "", latitude: "", message: "" },
                        success:    false
                     };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log('--Submitting--');
            GetHelp.getHelp(this.state.name,
                            this.state.partySize,
                            this.state.phone, 
                            this.longitude,
                            this.latitude,
                            this.state.message)
            this.setState({success: true});
        }
        else {
          console.error("Invalid Form");
        }
    };

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "name":
                formErrors.name = value.length < 3 ? "minimum 3 characaters required" : "";
            break;
            case "partySize":
                formErrors.partySize = partySizeRegex.test(value) ? "" : "not a valid number of people";
            break;
            case "phone":
                formErrors.phone = phoneRegex.test(value) ? "" : "invalid phone number";
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

    render() {
        const { formErrors } = this.state;
        return (
            <div className="form-wrapper">
                <h1>Let Us Help You.</h1>
                <form onSubmit={this.handleSubmit} noValidate>

                    <div className="name">
                        <label htmlFor="name">Name</label>
                        <input className={formErrors.name.length > 0 ? "error" : null}
                               placeholder="Name"
                               type="text"
                               name="name"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.name.length > 0 && (
                            <span className="errorMessage">{formErrors.name}</span>
                        )}
                    </div>

                    <div className="party-size">
                        <label htmlFor="partySize">Number Stranded</label>
                        <input className={formErrors.partySize.length > 0 ? "error" : null}
                               placeholder="0-99"
                               type="text"
                               name="partySize"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.partySize.length > 0 && (
                            <span className="errorMessage">{formErrors.partySize}</span>
                        )}
                    </div>

                    <div className="phone">
                        <label htmlFor="phone">Your Phone Number</label>
                        <input className={formErrors.phone.length > 0 ? "error" : null}
                               placeholder="(---) --- ---"
                               type="phone"
                               name="phone"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.phone.length > 0 && (
                            <span className="errorMessage">{formErrors.phone}</span>
                        )}
                    </div>

                    <div className="longitude">
                        <label htmlFor="longitude">Longitude</label>
                        <input className={formErrors.longitude.length > 0 ? "error" : null}
                               placeholder="0.000000"
                               type="longitude"
                               name="longitude"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.longitude.length > 0 && (
                            <span className="errorMessage">{formErrors.longitude}</span>
                        )}
                    </div>

                    <div className="latitude">
                        <label htmlFor="latitude">Latitude</label>
                        <input className={formErrors.latitude.length > 0 ? "error" : null}
                               placeholder="0.000000"
                               type="latitude"
                               name="latitude"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.phone.length > 0 && (
                            <span className="errorMessage">{formErrors.latitude}</span>
                        )}
                    </div>

                    <div className="get-coordinates">
                        <button type="submit" disabled={this.state.success}>
                            Get Coordinates 
                        </button>
                    </div>

                    <div className="message">
                        <label htmlFor="message">Tell us how we can help.</label>
                        <textarea className={formErrors.message.length > 0 ? "error" : null}
                               placeholder="Inform us of any outstanding conditions."
                               type="message"
                               name="message"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.message.length > 0 && (
                            <span className="errorMessage">{formErrors.message}</span>
                        )}
                    </div>

                    <div className="get-help">
                        <button type="submit" disabled={this.state.success}>
                            { !this.state.success ? 'Get Help' : 'Submitted!'}
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}

export default App;
