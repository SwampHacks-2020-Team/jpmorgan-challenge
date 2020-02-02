import GoogleMapReact from 'google-map-react';
import React from "react";
import './MapContainer.css'

const MapContainer = (props) => {
    return (
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: props.googleKey }}
                defaultZoom={16}
                defaultCenter={{lat: 29.642, lng: -82.347}}
            >
                <Marker lat={29.642} lng={-82.347} />
                <Marker lat={29.643} lng={-82.346} />
                <Route lat={29.641} lng={-82.348} />
                <Route lat={29.640} lng={-82.349} />
                <Route lat={29.639} lng={-82.347} />
                <Route lat={29.638} lng={-82.346} />
            </GoogleMapReact>
        </div>
    )
};

const Marker = () => {
    return <div className="survivor"/>
};

const Route = () => {
    return <div className="route"/>
};

export default MapContainer;
