import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet'; 


import 'leaflet/dist/leaflet.css';

const DestinationMap = ({ destinations }) => {
  return (
    <MapContainer
      center={[0, 0]} 
      zoom={2} 
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {destinations.map((destination, index) => {
        if (destination.latitude && destination.longitude) {
          const position = [destination.latitude, destination.longitude];

          return (
            <Marker key={index} position={position}>
              <Popup>
                <strong>{destination.destination}</strong>
                <br />
                {destination.location}
                <br />
                {destination.description}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default DestinationMap;
