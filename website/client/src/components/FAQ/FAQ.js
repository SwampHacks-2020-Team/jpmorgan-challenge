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
                            <span>Question 1?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                                Answer 1.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item" id="question2">
                        <a className="accordion-link" href="#question2">
                            <span>Question 2?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                                Answer 2.
                            </p>
                        </div>
                    </div>
                    <div className="accordion-item" id="question3">
                        <a className="accordion-link" href="#question3">
                            <span>Question 3?</span>
                            <i className="icon ion-md-add"/>
                            <i className="icon ion-md-remove"/>
                        </a>
                        <div className="answer">
                            <p>
                                Answer 3.
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
