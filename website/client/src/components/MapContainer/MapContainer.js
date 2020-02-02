import GoogleMapReact from 'google-map-react';
import React from "react";
import './MapContainer.css'

const MapContainer = (props) => {
    return (
        <div style={{ height: '70%', width: '90%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: props.googleKey }}
                defaultZoom={16}
                defaultCenter={{lat: 29.642, lng: -82.347}}
            >
                <Marker lat={29.642} lng={-82.347} />
                <Marker lat={29.643} lng={-82.346} />
            </GoogleMapReact>
        </div>
    )
};

const Marker = () => {
    return <div className="pin"/>
};

export default MapContainer;