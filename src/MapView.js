import React from 'react';

const MapView = () => {
  return (
    <iframe 
      src="https://storage.googleapis.com/maps-solutions-1hjx68pn6y/neighborhood-discovery/h2nc/neighborhood-discovery.html"
      width="100%" 
      height="500px"
      style={{border: 0}} 
      loading="lazy"
      title="Neighborhood Discovery"
    >
    </iframe>
  );
};

export default MapView;