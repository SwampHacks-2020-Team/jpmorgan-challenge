import React from 'react';
import './FAQ.css';

class FAQ extends React.Component {
    getTitle() {
        if (window.screen.width <= 680) {
            return "FAQ"
        }
        else {
            return "Frequently Asked Questions"
        }
    }
    render() {
        return(
            <div className="faq-container parallax">
                <div className="faq-header">{this.getTitle()}</div>
                <div className="accordion">
                    <div className="accordion-item" id="question1">
                        <a className="accordion-link" href="#question1">
                            <span>How can I request help?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                                Navigate to the "Get Help" page and enter your contact
                                information and coordinates (or use our built-in feature
                                to get your coordinates). Be sure to inform us of any
                                obstacles near your location that may prevent us from
                                reaching you so that our system can plan accordingly.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item" id="question2">
                        <a className="accordion-link" href="#question2">
                            <span>How does RTRescue work?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                                Once your location is added to the queue, our system
                                uses a genetic algorithm to determine a near-optimal route
                                for ordering the different locations in the queue to
                                minimize total travel distance. Topographical data is analyzed in
                                conjuction with flood water depths to determine the exact path
                                of the boat to various ordered waypoints.

                            </p>
                        </div>
                    </div>
                    <div className="accordion-item" id="question3">
                        <a className="accordion-link" href="#question3">
                            <span>I just submitted my location. What happens now?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                            Your contact information and location have been added into a queue
                            and a volunteer will be arriving soon to assist you.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item" id="question4">
                        <a className="accordion-link" href="#question4">
                            <span>Question 4?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                            Answer 4.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FAQ
