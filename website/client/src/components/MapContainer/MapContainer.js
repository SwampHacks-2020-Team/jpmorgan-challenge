import GoogleMapReact from 'google-map-react';
import React from "react";
import './MapContainer.css'

const MapContainer = (props) => {
    let markerList = props.geoData.map((point) => {
        return (
            <Marker lat={point.lat} lng={point.lon} />
        );
    });

    return (
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: props.googleKey }}
                defaultZoom={15}
                defaultCenter={{lat: 29.642, lng: -82.347}}
            >
                {markerList}
            </GoogleMapReact>
        </div>
    )
};

const Marker = () => {
    return <div className="route"/>
};

const Route = () => {
    return <div className="route"/>
};

export default MapContainer;
