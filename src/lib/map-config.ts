export interface PointOfInterest {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// Ubicación del proyecto
export const projectLocation = {
  lat: -34.5778,
  lng: -58.4741,
  address: "Av. Triunvirato 3900, Villa Urquiza"
};

// Puntos de interés por categoría
export const pointsOfInterest = {
  gastronomia: [
    { name: "Café Martínez", address: "Av. Triunvirato 3950", lat: -34.5775, lng: -58.4745 },
    { name: "La Panadería de Pablo", address: "Av. Triunvirato 3850", lat: -34.5780, lng: -58.4738 }
  ],
  servicios: [
    { name: "Banco Galicia", address: "Av. Triunvirato 4000", lat: -34.5770, lng: -58.4750 },
    { name: "Farmacia", address: "Av. Triunvirato 3800", lat: -34.5785, lng: -58.4735 }
  ],
  transporte: [
    { name: "Estación Villa Urquiza", address: "Av. Triunvirato y Monroe", lat: -34.5765, lng: -58.4760 },
    { name: "Parada Metrobus", address: "Av. Triunvirato 3900", lat: -34.5778, lng: -58.4741 }
  ],
  educacion: [
    { name: "Colegio San Pablo", address: "Av. Triunvirato 3800", lat: -34.5783, lng: -58.4737 },
    { name: "Universidad de Buenos Aires", address: "Av. Triunvirato 4200", lat: -34.5760, lng: -58.4765 }
  ]
};

// Estilos personalizados para el mapa
export const mapStyles = [
  {
    "featureType": "all",
    "elementType": "geometry",
    "stylers": [{ "color": "#E5DDD6" }]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{ "color": "#FFFFFF" }]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{ "color": "#8BA0BD" }]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  },
  {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [{ "visibility": "off" }]
  }
]; 