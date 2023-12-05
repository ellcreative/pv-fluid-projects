const overviewBtn = document.querySelector('#overview');
const permianBtn = document.querySelector('#permian');
const eagleFordBtn = document.querySelector('#eagleFord');
const haynesvilleBtn = document.querySelector('#haynesville');
const montneyBtn = document.querySelector('#montney');
const bakkenBtn = document.querySelector('#bakken');
const allBtns = document.querySelectorAll('.map-nav-button');

const basinDetails = document.querySelectorAll('.basin-details');

const permianDetails = document.querySelector('#permian-details');
const eagleFordDetails = document.querySelector('#eagleFord-details');
const haynesvilleDetails = document.querySelector('#haynesville-details');
const montneyDetails = document.querySelector('#montney-details');
const bakkenDetails = document.querySelector('#bakken-details');

const closeDetails = document.querySelectorAll('.basin-info-close');

const basinsDropdown = document.querySelector('.basins-dropdown');
const basinsDropdownList = document.querySelector('.basins-dropdown .dropdown-list');

const montneyCo = [-120.61030713997361,
  56.24978355428195];
const permianCo = [-102.6354997888134,
  32.26956675303414];
const eagleFordCo = [-99.5624151640399,
  28.420748473242938];
const haynesvilleCo = [-94.06734718138622,
  32.14745092485698];
const bakkenCo = [-102.87689398880654,
  47.526117429328764];

const basinLayerIDs = ['permian', 'eagle-ford', 'haynesville', 'bakken', 'montney'];
const glowLayerIDs = ['permian-glow', 'eagle-ford-glow', 'haynesville-glow', 'bakken-glow', 'montney-glow'];

function resetBasinColors() {
  basinLayerIDs.forEach(function (basinLayerID) {
    map.setPaintProperty(basinLayerID, 'fill-color', 'rgba(189, 190, 193, 0.29)');
    map.setPaintProperty(basinLayerID, 'fill-opacity', 0.8);
  });
  glowLayerIDs.forEach(function (glowLayerID) {
    map.setPaintProperty(glowLayerID, 'line-opacity', 0);
  });
}

function fly(target, basinLayer, glowLayer) {
  const detailsVisible = document.querySelector('.basin-details.show');
  if(detailsVisible) {
    detailsVisible.classList.remove('show');
  }
  resetBasinColors();

  if(target!=overview) {
    map.setPaintProperty(basinLayer, 'fill-color', '#000fff');
    map.setPaintProperty(basinLayer, 'fill-opacity', 0.6);
    map.setPaintProperty(glowLayer, 'line-opacity', 0.8);
  }

  map.flyTo({
    ...target,
    speed: 2,
    curve: 2,
    easing(t) {
      return t;
    }
  });
  
}

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yaXNsaW5kaG91dCIsImEiOiJjbG1pMHRrZWMyZ2NnM2tscGxmb25wZWR0In0.5z8RhWNo2il4w6ohxJVTZg';

const overview = {
  center: [-100, 38],
  zoom: 4.75,
  pitch: 40,
  bearing: 0
};
const permianEnd = {
  center: permianCo,
  zoom: 6,
  bearing: 0,
  pitch: 65
};
const eagleFordEnd = {
  center: eagleFordCo,
  zoom: 7,
  bearing: 0,
  pitch: 65
};
const haynesvilleEnd = {
  center: haynesvilleCo,
  zoom: 7.5,
  bearing: 0,
  pitch: 65
};
const montneyEnd = {
  center: montneyCo,
  zoom: 5,
  bearing: 0,
  pitch: 75
};
const bakkenEnd = {
  center: bakkenCo,
  zoom: 5,
  bearing: 0,
  pitch: 75
};

function deactivateButtons() {
  allBtns.forEach((element) => {
    element.classList.remove('active');
  });
}

function goBackToOverview() {
  fly(overview);
  const detailsVisible = document.querySelector('.basin-details.show');
  if(detailsVisible) {
    detailsVisible.classList.remove('show');
  }
  map.fitBounds([
    [-118.499997,10.895345], // southwestern corner of the bounds
    [-79.098706,61.300583] // northeastern corner of the bounds
  ]);
}

closeDetails.forEach(function (closeDetail) {
  closeDetail.addEventListener('click', () => {
    deactivateButtons();
    goBackToOverview();
  });
});

overviewBtn.addEventListener('click', (e) => {
  basinsDropdownList.style.display = 'none';
  deactivateButtons();
  goBackToOverview();
  overviewBtn.classList.add('active');
});

permianBtn.addEventListener('click', (e) => {
  basinsDropdownList.style.display = 'none';
  fly(permianEnd, 'permian', 'permian-glow');
  permianDetails.classList.add('show');
  deactivateButtons();
  permianBtn.classList.add('active');
});

eagleFordBtn.addEventListener('click', (e) => {
  basinsDropdownList.style.display = 'none';
  fly(eagleFordEnd, 'eagle-ford', 'eagle-ford-glow');
  eagleFordDetails.classList.add('show');
  deactivateButtons();
  eagleFordBtn.classList.add('active');
});

haynesvilleBtn.addEventListener('click', (e) => {
  basinsDropdownList.style.display = 'none';
  fly(haynesvilleEnd, 'haynesville', 'haynesville-glow');
  haynesvilleDetails.classList.add('show');
  deactivateButtons();
  haynesvilleBtn.classList.add('active');
});

montneyBtn.addEventListener('click', (e) => {
  basinsDropdownList.style.display = 'none';
  fly(montneyEnd, 'montney', 'montney-glow');
  montneyDetails.classList.add('show');
  deactivateButtons();
  montneyBtn.classList.add('active');
});

bakkenBtn.addEventListener('click', (e) => {
  basinsDropdownList.style.display = 'none';
  fly(bakkenEnd, 'bakken', 'bakken-glow');
  bakkenDetails.classList.add('show');
  deactivateButtons();
  bakkenBtn.classList.add('active');
});


const map = new mapboxgl.Map({
  container: 'basins',
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/jorislindhout/clohjy53h001g01nt2qdzbs59',
  // style: 'mapbox://styles/jorislindhout/clordbgnk00gr01qq70lrg1y5',
  antialias: true,
  ...overview
});

map.scrollZoom.disable();
map.scrollZoom.disable();
map.boxZoom.disable();
map.dragRotate.disable();
map.dragPan.disable();
map.keyboard.disable();
map.touchZoomRotate.disable();

map.on('load', function(){

  map.fitBounds([
    [-118.499997,10.895345], // southwestern corner of the bounds
    [-79.098706,61.300583] // northeastern corner of the bounds
  ]);

  //console.log(map.getStyle().layers);

});
