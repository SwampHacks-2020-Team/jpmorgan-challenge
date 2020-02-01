import React, { useState } from 'react';
import EmergencyForm from './../../components/EmergencyForm/EmergencyForm';
import Hurricane from '../../assets/hurricane.svg';
import './Home.css';

const Home = () => {
    const [coordinates, setCoordinates] = useState({
        latitude: 0.0,
        longitude: 0.0,
    });

    const getCoordinates =  async () => {
        await navigator.geolocation.getCurrentPosition(
            (position) => setCoordinates({
                latitude: position.coords.latitude, longitude: position.coords.longitude
            })
        )
    };

    //getCoordinates().then(() => console.log(coordinates));

    return (
        <div className="App">
            <div className="row" style={{height:"100vh"}}>
                <div className="flex-column-65 col-home-left">
                    <div className="homepage-content">
                        <header className="page-name">STRONGER TOGETHER.</header>
                        <div className="page-name-description">Hurricane &nbsp;Relief</div>
                        <div className="inspirational-quote">"There are no problems we cannot solve together, but very few that we can solve by ourselves." - Lyndon B. Johnson</div>
                        <div className="city-callout">WE'RE HERE FOR YOU, <br/>GAINESVILLE.</div>
                    </div>
                </div>
                <div className="flex-column-35 col-home-right">
                     <EmergencyForm id="GetHelp"/>
                </div>
            </div>
        </div>
    );
};

export default Home;
