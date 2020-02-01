import React from 'react';
import EmergencyForm from './../../components/EmergencyForm/EmergencyForm';
import Hurricane from '../../assets/hurricane.svg';
import './Home.css';

function Home() {
    return (
        <div className="App">
            <div className="row" style={{height:"100vh"}}>
                <div className="flex-column-60 col-home-left">
                    <div className="homepage-content">
                        <header className="page-name">STRONGER TOGETHER.</header>
                        <div className="inspirational-quote">"There are no problems we cannot solve together, but very few that we can solve by ourselves." - Lyndon B. Johnson</div>
                        <div className="city-callout">WE'RE HERE FOR YOU, <br/>GAINESVILLE.</div>
                    </div>
                </div>
                <div className="flex-column-40 col-home-right">
                     <EmergencyForm id="GetHelp"/>
                </div>
            </div>
        </div>
    );
}

export default Home;
