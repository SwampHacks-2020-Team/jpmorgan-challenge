import React, { Component } from "react";
import "./EmergencyForm.css";
const GetHelp = require('./GetHelp.js');

/* Using Tutorial: https://www.youtube.com/watch?v=4CeTFW4agRw by Brice Ayres*/

const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/);
const partySizeRegex = RegExp(/^[1-9][0-9]?$/);

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
                        message:    null,
                        formErrors: { name: "", partySize: "", phone: "", message: "" },
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
                formErrors.partySize = partySizeRegex.test(value) ? "not a valid number of people" : "";
            break;
            case "phone":
                formErrors.phone = phoneRegex.test(value) ? "" : "invalid phone number";
            break;
            case "message":
                formErrors.message = value.length < 10 ? "minimum 10 characaters required" : "";
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
                        <label htmlFor="partySize">Party Size</label>
                        <input className={formErrors.partySize.length > 0 ? "error" : null}
                               placeholder="Last Name"
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

                    <div className="message">
                        <label htmlFor="message">Message</label>
                        <textarea className={formErrors.message.length > 0 ? "error" : null}
                               placeholder="Message"
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
