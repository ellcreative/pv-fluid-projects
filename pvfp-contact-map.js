mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yaXNsaW5kaG91dCIsImEiOiJjbG1pMHRrZWMyZ2NnM2tscGxmb25wZWR0In0.5z8RhWNo2il4w6ohxJVTZg';

const size = 350;
 
// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.
const pulsingDot = {
  width: size,
  height: size,
  data: new Uint8Array(size * size * 4),
  
  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    this.context = canvas.getContext('2d');
  },
  
  // Call once before every frame where the icon will be used.
  render: function () {
    const duration = 4000;
    const t = (performance.now() % duration) / duration;
    
    const radius = (size / 2) * 0.15;
    const outerRadius = (size / 2) * 0.7 * t + radius;
    const context = this.context;
    
    // Draw the outer circle.
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      outerRadius,
      0,
      Math.PI * 2
    );
    context.fillStyle = `rgba(243, 246, 255, 0.25)`;
    context.strokeStyle = 'rgba(243, 246, 255, 0.75)';
    context.lineWidth = 2 + 4 * (1 - t);
    //context.fill();
    context.stroke();
    
    // Draw the inner circle.
    context.beginPath();
    context.arc(
      this.width / 2,
      this.height / 2,
      radius,
      0,
      Math.PI * 2
    );
    context.fillStyle = 'rgba(243, 246, 255, 0.25)';
    context.strokeStyle = 'rgba(243, 246, 255, 0.5)';
    context.lineWidth = 2 + 4 * (1 - t);
    context.fill();
    context.stroke();
    
    // Update this image's data with data from the canvas.
    this.data = context.getImageData(
      0,
      0,
      this.width,
      this.height
    ).data;
    
    // Continuously repaint the map, resulting
    // in the smooth animation of the dot.
    contactMap.triggerRepaint();
    
    // Return `true` to let the map know that the image was updated.
    return true;
  }
};

const contactMap = new mapboxgl.Map({
  container: 'contact-map',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/jorislindhout/clohjy53h001g01nt2qdzbs59',
  antialias: true,
  projection: {name: "mercator"},
});

contactMap.scrollZoom.disable();
contactMap.boxZoom.disable();
contactMap.dragRotate.disable();
contactMap.dragPan.disable();
contactMap.keyboard.disable();
contactMap.touchZoomRotate.disable();

contactMap.on('style.load', () => {

  contactMap.fitBounds([
    [-124.848974, 24.396308], // southwestern corner of the bounds
    [76.608074, 51.225808] // northeastern corner of the bounds
  ]);

  contactMap.addImage('houston', pulsingDot, { pixelRatio: 2 });
  contactMap.addImage('nisku', pulsingDot, { pixelRatio: 2 });
  contactMap.addImage('germany', pulsingDot, { pixelRatio: 2 });
  
  contactMap.addSource('houston-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'properties': {
          'description':
          '<strong>Houston, Texas</strong><p>PV Fluid Products, Inc.<br>11901 Cutten Rd<br>Houston, Texas, USA 77066</p>'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-95.530600, 29.954190] // icon position [lng, lat]
        }
      }]
    }
  });

  contactMap.addLayer({
    'id': 'houston-dot',
    'type': 'symbol',
    'source': 'houston-point',
    'layout': {
      'icon-image': 'houston'
    }
  });

  contactMap.addSource('nisku-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'properties': {
          'description':
          '<strong>Edmonton, Alberta, Canada</strong><p>PV Fluid Products, Ltd.<br>1054 103 A Street SW<br>Edmonton, AB, Canada T6W 2P6</p>'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [-113.511780, 53.317750] // icon position [lng, lat]
        }
      }]
    }
  });

  contactMap.addLayer({
    'id': 'nisku-dot',
    'type': 'symbol',
    'source': 'nisku-point',
    'layout': {
      'icon-image': 'nisku'
    }
  });

  contactMap.addSource('germany-point', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [{
        'type': 'Feature',
        'properties': {
          'description':
          '<strong>Wolfenbüttel, Germany</strong><p>PV Fluid Products GmbH<br>Wilhelm-Mast-Str. 15<br>38304 Wolfenbüttel<br>GERMANY</p>'
        },
        'geometry': {
          'type': 'Point',
          'coordinates': [10.496530, 52.157700] // icon position [lng, lat]
        }
      }]
    }
  });

  contactMap.addLayer({
    'id': 'germany-dot',
    'type': 'symbol',
    'source': 'germany-point',
    'layout': {
      'icon-image': 'germany'
    }
  });

  contactMap.on('click', 'houston-dot', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(contactMap);
  });

  contactMap.on('click', 'nisku-dot', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(contactMap);
  });

  contactMap.on('click', 'germany-dot', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    
    new mapboxgl.Popup()
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(contactMap);
  });
   
  contactMap.on('mouseenter', 'houston-dot', () => {
    contactMap.getCanvas().style.cursor = 'pointer';
  });
  contactMap.on('mouseleave', 'houston-dot', () => {
    contactMap.getCanvas().style.cursor = '';
  });

  contactMap.on('mouseenter', 'nisku-dot', () => {
    contactMap.getCanvas().style.cursor = 'pointer';
  });
  contactMap.on('mouseleave', 'nisku-dot', () => {
    contactMap.getCanvas().style.cursor = '';
  });

  contactMap.on('mouseenter', 'germany-dot', () => {
    contactMap.getCanvas().style.cursor = 'pointer';
  });
  contactMap.on('mouseleave', 'germany-dot', () => {
    contactMap.getCanvas().style.cursor = '';
  });

});