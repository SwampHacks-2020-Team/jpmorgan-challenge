import React, { Component } from "react";
import "./EmergencyForm.css";
const SendEmail = require('./SendEmail.js');

/* Using Tutorial: https://www.youtube.com/watch?v=4CeTFW4agRw by Brice Ayres*/

const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

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
        this.state = {  firstName:  null,
                        lastName:   null,
                        email:      null,
                        message:    null,
                        formErrors: { firstName: "", lastName: "", email: "", message: "" },
                        success:    false
                     };
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log('--Submitting--');
            SendEmail.sendEmail(this.state.firstName.concat(" ", this.state.lastName),
                                this.state.email,
                                this.state.message
                               )
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
            case "firstName":
                formErrors.firstName = value.length < 3 ? "minimum 3 characaters required" : "";
            break;
            case "lastName":
                formErrors.lastName = value.length < 3 ? "minimum 3 characaters required" : "";
            break;
            case "email":
                formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
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
                <h1>Request Help</h1>
                <form onSubmit={this.handleSubmit} noValidate>

                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input className={formErrors.firstName.length > 0 ? "error" : null}
                               placeholder="First Name"
                               type="text"
                               name="firstName"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.firstName.length > 0 && (
                            <span className="errorMessage">{formErrors.firstName}</span>
                        )}
                    </div>

                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input className={formErrors.lastName.length > 0 ? "error" : null}
                               placeholder="Last Name"
                               type="text"
                               name="lastName"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.lastName.length > 0 && (
                            <span className="errorMessage">{formErrors.lastName}</span>
                        )}
                    </div>

                    <div className="email">
                        <label htmlFor="email">Your Email</label>
                        <input className={formErrors.email.length > 0 ? "error" : null}
                               placeholder="Your Email"
                               type="email"
                               name="email"
                               noValidate
                               onChange={this.handleChange}/>
                        {formErrors.email.length > 0 && (
                            <span className="errorMessage">{formErrors.email}</span>
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

                    <div className="sendEmail">
                        <button type="submit" disabled={this.state.success}>
                            { !this.state.success ? 'Send Email' : 'Submitted!'}
                        </button>
                    </div>

                </form>
            </div>
        );
    }
}

export default App;
