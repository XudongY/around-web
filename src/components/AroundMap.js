import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow} from'react-google-maps';

class AroundMaps extends React.Component {

    render() {
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}>
                <Marker
                    position={{ lat: -34.397, lng: 150.644 }}>
                    {/*{props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
                       <div>google map</div>
                    </InfoWindow>}*/}
                </Marker>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMaps));