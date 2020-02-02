import { Map, GoogleApiWrapper } from "google-maps-react";
import React from "react";

const mapStyles = {
    width: '55%',
    height: '55%',
};

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={16}
                style={mapStyles}
                initialCenter={{lat: 29.642, lng: -82.347}}
            >

            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDSxlGO_smSUXTkG2iufmROXSdRFYrtDO4'
})(MapContainer);