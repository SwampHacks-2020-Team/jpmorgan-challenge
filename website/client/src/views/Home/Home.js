import React from 'react';
import EmergencyForm from './../../components/EmergencyForm/EmergencyForm';
import Hurricane from '../../assets/hurricane.svg';
import './Home.css';

function Home() {
    return (
        <div className="App">
            <header className="page-name">STRONGER TOGETHER</header>
            <div className="landing-page">
                <img src={Hurricane} alt="Hurricane"/>
                <EmergencyForm/>
            </div>
        </div>
    );
}

export default Home;
