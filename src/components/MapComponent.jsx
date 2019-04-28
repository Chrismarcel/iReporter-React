import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { objectOf, number } from 'prop-types';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class MapComponent
 * @description Map component
 */
const MapComponent = ({ google, lat, lng }) => (
  <div className="map">
    <Map google={google} zoom={17} initialCenter={{ lat, lng }}>
      <Marker position={{ lat, lng }} />
    </Map>
  </div>
);

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_API_KEY
})(MapComponent);

MapComponent.propTypes = {
  google: objectOf.isRequired,
  lat: number.isRequired,
  lng: number.isRequired
};
