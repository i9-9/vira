'use client'

import { useState, useEffect, useRef } from 'react'

// Variable global para evitar múltiples cargas
let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;

// Definir tipos para Google Maps
interface GoogleMapsMarker {
  setAnimation: (animation: unknown) => void;
  getPosition: () => unknown;
  addListener: (event: string, callback: () => void) => void;
  content?: HTMLElement;
  position: { lat: number; lng: number };
}

interface GoogleMapsMap {
  panTo: (position: unknown) => void;
}

interface GoogleMapsType {
  maps: {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => GoogleMapsMap;
    Marker: new (options: Record<string, unknown>) => GoogleMapsMarker;
    InfoWindow: new (options: Record<string, unknown>) => {
      open: (map: GoogleMapsMap, marker: GoogleMapsMarker) => void;
    };
    LatLng: new (lat: number, lng: number) => unknown;
    Size: new (width: number, height: number) => unknown;
    Point: new (x: number, y: number) => unknown;
  };
}

interface WindowWithGoogleMaps extends Window {
  google?: GoogleMapsType;
  [key: string]: unknown;
}

interface PointOfInterest {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface PointsData {
  gastronomia: PointOfInterest[];
  servicios: PointOfInterest[];
}

interface MarkerWithCoords extends GoogleMapsMarker {
  originalCoords?: { lat: number; lng: number };
}

// Ubicación del proyecto Vira Triunvirato
const projectLocation = { 
  lat: -34.5815601744141, 
  lng: -58.474381348588494,
  address: "Av. Triunvirato, Villa Urquiza, CABA"
};

// Puntos de interés cercanos a Vira Triunvirato con coordenadas precisas
const pointsOfInterest: PointsData = {
  gastronomia: [
    {
      name: "DOHO ZONA",
      address: "Av. Álvarez Thomas",
      lat: -34.57521265719602,
      lng: -58.47279210321759
    }
  ],
  servicios: [
    {
      name: "Estación Los Incas - Línea B SUBE",
      address: "Los Incas",
      lat: -34.58135614132666,
      lng: -58.47386903205338
    },
    {
      name: "Supermercado Jumbo",
      address: "Av. Triunvirato",
      lat: -34.58324404304368,
      lng: -58.465001819086474
    },
    {
      name: "Sport Club",
      address: "Cerca de Av. Triunvirato",
      lat: -34.58352312528429,
      lng: -58.46539190558546
    },
    {
      name: "Centro Comercial Villa Urquiza",
      address: "Villa Urquiza",
      lat: -34.57783157172449,
      lng: -58.48459957360854
    },
    {
      name: "Club Arquitectura",
      address: "Villa Urquiza",
      lat: -34.58922862471361,
      lng: -58.4840340775306
    },
    {
      name: "Estación de Tren FFCC Mitre",
      address: "FFCC Mitre",
      lat: -34.57457334231884,
      lng: -58.48701869839317
    },
    {
      name: "Facultad de Agronomía",
      address: "UBA",
      lat: -34.59065218892187,
      lng: -58.48248647009202
    },
    {
      name: "Sede UBA",
      address: "Universidad de Buenos Aires",
      lat: -34.590506428375875,
      lng: -58.48109360296291
    },
    {
      name: "Estación de Tren FFCC Urquiza",
      address: "FFCC Urquiza",
      lat: -34.58647600245906,
      lng: -58.454923091332
    },
    {
      name: "Diagnóstico Maipú",
      address: "Centro médico",
      lat: -34.57978536757091,
      lng: -58.486118680007074
    },
    {
      name: "Centro Médico Adventista",
      address: "Atención médica",
      lat: -34.57433123073305,
      lng: -58.46817679395558
    }
  ]
};

// Función para cargar Google Maps
function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const windowWithGM = window as unknown as WindowWithGoogleMaps;
    
    // Si ya está cargado, resolver inmediatamente
    if (isGoogleMapsLoaded && windowWithGM.google?.maps?.Map) {
      console.log('✅ Google Maps ya cargado');
      resolve();
      return;
    }

    // Si ya se está cargando, esperar
    if (isGoogleMapsLoading) {
      console.log('⏳ Google Maps ya se está cargando, esperando...');
      const checkInterval = setInterval(() => {
        if (isGoogleMapsLoaded && windowWithGM.google?.maps?.Map) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Timeout esperando Google Maps'));
      }, 10000);
      return;
    }

    // Marcar como cargando
    isGoogleMapsLoading = true;

    console.log('🔄 Cargando Google Maps...');

    // Función de callback global
    const callbackName = 'initGoogleMapsSimple';
    windowWithGM[callbackName] = () => {
      console.log('✅ Google Maps cargado exitosamente');
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      resolve();
    };

    // Crear script solo si no existe
    let script = document.getElementById('google-maps-api') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'google-maps-api';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        console.error('❌ Error cargando Google Maps');
        isGoogleMapsLoading = false;
        reject(new Error('Error cargando Google Maps'));
      };

      document.head.appendChild(script);
    } else {
      // El script ya existe, solo esperar a que se cargue
      const checkExisting = setInterval(() => {
        if (windowWithGM.google?.maps?.Map) {
          clearInterval(checkExisting);
          isGoogleMapsLoaded = true;
          isGoogleMapsLoading = false;
          resolve();
        }
      }, 100);
    }
  });
}

function GoogleMapComponent({ apiKey, onMarkerHover }: { 
  apiKey: string,
  onMarkerHover: (pointName: string | null) => void
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMapsMap | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<GoogleMapsMap | null>(null);

  // Cargar Google Maps
  useEffect(() => {
    let isMounted = true;

    const initGoogleMaps = async () => {
      try {
        await loadGoogleMaps(apiKey);
        if (isMounted) {
          setIsLoaded(true);
          setError(null);
        }
      } catch (err) {
        console.error('Error cargando Google Maps:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      }
    };

    initGoogleMaps();

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  // Crear el mapa
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current || error) return;

    try {
      console.log('🗺️ Creando instancia del mapa...');
      const windowWithGM = window as unknown as WindowWithGoogleMaps;
      const googleMaps = windowWithGM.google!.maps;
      
      const mapInstance = new googleMaps.Map(mapRef.current, {
        center: projectLocation,
        zoom: 14,
        mapTypeId: 'roadmap',
        styles: [
          // Estilos personalizados del mapa
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#f5f5f5" }]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#ffffff" }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#c9c9c9" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        fullscreenControl: true,
        gestureHandling: 'greedy'
      });

      // Marker principal del proyecto
      const projectMarker = new googleMaps.Marker({
        position: projectLocation,
        map: mapInstance,
        title: "VIRA TRIUNVIRATO",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#000000" stroke="#ffffff" stroke-width="3"/>
            </svg>
          `),
          scaledSize: new googleMaps.Size(40, 40),
          anchor: new googleMaps.Point(20, 20)
        },
        zIndex: 1000
      });

      // InfoWindow personalizada
      const infoWindow = new googleMaps.InfoWindow({
        content: `
          <div style="padding: 12px; text-align: center; font-family: Arial;">
            <h3 style="margin: 0 0 8px 0; color: #000; font-size: 16px; font-weight: bold;">
              VIRA TRIUNVIRATO
            </h3>
            <p style="margin: 0; color: #888; font-size: 11px; line-height: 1.3;">
              📍 ${projectLocation.address}
            </p>
          </div>
        `,
        maxWidth: 280
      });

      projectMarker.addListener('click', () => {
        infoWindow.open(mapInstance, projectMarker);
      });

      // Mostrar InfoWindow automáticamente después de 1 segundo
      setTimeout(() => {
        infoWindow.open(mapInstance, projectMarker);
      }, 1000);

      mapInstanceRef.current = mapInstance;
      setMap(mapInstance);

      console.log('✅ Mapa creado exitosamente');

    } catch (err) {
      console.error('Error creando mapa:', err);
      setError('Error creando el mapa');
    }
  }, [isLoaded, error]);

  // Crear markers de puntos de interés
  useEffect(() => {
    if (!map || !isLoaded || error) return;

    try {
      const windowWithGM = window as unknown as WindowWithGoogleMaps;
      const googleMaps = windowWithGM.google!.maps;
      const newMarkers: { [key: string]: MarkerWithCoords } = {};

      // Markers de gastronomía
      pointsOfInterest.gastronomia.forEach(point => {
        try {
          const marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(point.lat, point.lng),
            map: map,
            title: point.name,
            label: {
              text: '2', // DOHO ZONA es el número 2
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px'
            },
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#000000" stroke="#ffffff" stroke-width="2"/>
                </svg>
              `),
              scaledSize: new googleMaps.Size(32, 32),
              anchor: new googleMaps.Point(16, 16)
            }
          }) as MarkerWithCoords;

          marker.addListener('mouseover', () => onMarkerHover(point.name));
          marker.addListener('mouseout', () => onMarkerHover(null));
          marker.originalCoords = { lat: point.lat, lng: point.lng };
          newMarkers[point.name] = marker;
        } catch (markerError) {
          console.error(`Error creando marker para ${point.name}:`, markerError);
        }
      });

      // Markers de servicios con números correspondientes
      const serviceNumbers = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Números para cada servicio
      pointsOfInterest.servicios.forEach((point, index) => {
        try {
          const marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(point.lat, point.lng),
            map: map,
            title: point.name,
            label: {
              text: serviceNumbers[index]?.toString() || (index + 1).toString(),
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px'
            },
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#000000" stroke="#ffffff" stroke-width="2"/>
                </svg>
              `),
              scaledSize: new googleMaps.Size(32, 32),
              anchor: new googleMaps.Point(16, 16)
            }
          }) as MarkerWithCoords;

          marker.addListener('mouseover', () => onMarkerHover(point.name));
          marker.addListener('mouseout', () => onMarkerHover(null));
          marker.originalCoords = { lat: point.lat, lng: point.lng };
          newMarkers[point.name] = marker;
        } catch (markerError) {
          console.error(`Error creando marker para ${point.name}:`, markerError);
        }
      });

      console.log('✅ Markers creados:', Object.keys(newMarkers).length);
    } catch (err) {
      console.error('Error general creando markers:', err);
    }
  }, [map, isLoaded, error, onMarkerHover]);

  if (error) {
    return (
      <div className="w-full h-full bg-red-50 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 className="font-bold text-lg text-red-800 mb-2">
            Error cargando el mapa
          </h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 className="font-medium text-lg text-gray-800 mb-2">
            Cargando mapa...
          </h3>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}

export default function Map() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  
  // Obtener API key de variables de entorno
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "TU_API_KEY_AQUI";

  // Lista numerada de puntos de interés para la leyenda
  const legendItems = [
    { id: 1, name: "Estación Los Incas – Línea B SUBTE" },
    { id: 2, name: "DOHO ZONA" },
    { id: 3, name: "Supermercado Jumbo" },
    { id: 4, name: "Sport Club" },
    { id: 5, name: "Centro Comercial Villa Urquiza" },
    { id: 6, name: "Club Arquitectura" },
    { id: 7, name: "Estación de Tren FFCC Mitre" },
    { id: 8, name: "Facultad de Agronomía" },
    { id: 9, name: "Sede UBA" },
    { id: 10, name: "Estación de Tren FFCC Urquiza" },
    { id: 11, name: "Diagnóstico Maipú" },
    { id: 12, name: "Centro Médico Adventista" }
  ];

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Mapa - Ocupa toda la pantalla en mobile, lado derecho en desktop */}
      <div className="relative flex-1 h-64 lg:h-full">
        <GoogleMapComponent 
          apiKey={GOOGLE_MAPS_API_KEY} 
          onMarkerHover={setHoveredPoint}
        />
        
        {/* Botón para mostrar leyenda en mobile */}
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="lg:hidden absolute top-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg z-20 hover:bg-gray-700 transition-colors"
        >
          <svg 
            className={`w-6 h-6 transition-transform ${showLegend ? 'rotate-45' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>

        {/* Leyenda flotante para mobile */}
        {showLegend && (
          <div className="lg:hidden absolute inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
            <div 
              className="bg-gray-800 text-white p-6 rounded-lg shadow-xl max-h-full overflow-y-auto w-full max-w-sm"
              style={{
                backdropFilter: 'blur(15px)',
                WebkitBackdropFilter: 'blur(15px)',
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  PUNTOS DE INTERÉS
                </h3>
                <button
                  onClick={() => setShowLegend(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <p className="text-sm text-gray-200 mb-4 leading-tight">
                Amplia variedad de opciones gastronómicas, escuelas, servicios médicos, bancos, locales comerciales y espacios verdes.
              </p>
              
              <div className="space-y-1">
                {legendItems.map((item) => (
                  <div 
                    key={item.id}
                    className={`flex items-start space-x-3 p-2 rounded transition-all duration-200 ${
                      hoveredPoint === item.name 
                        ? 'bg-white text-black font-medium' 
                        : 'hover:bg-gray-700'
                    }`}
                  >
                    <span className={`font-bold text-sm min-w-[2rem] ${
                      hoveredPoint === item.name ? 'text-black' : 'text-white'
                    }`}>
                      {item.id.toString().padStart(2, '0')}
                    </span>
                    <span className={`text-sm leading-relaxed ${
                      hoveredPoint === item.name ? 'text-black' : 'text-white'
                    }`}>
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leyenda fija para desktop */}
        <div className="hidden lg:block absolute top-6 left-6 w-80 xl:w-96 max-h-[calc(100%-3rem)] overflow-y-auto z-10">
          <div 
            className="text-white p-6 rounded-lg shadow-xl"
            style={{
              background: 'rgba(107, 114, 128, 0.85)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide text-white">
              PUNTOS DE INTERÉS
            </h3>
            <p className="text-sm text-gray-200 mb-6 leading-tight">
              Amplia variedad de opciones gastronómicas, escuelas, servicios médicos, bancos, locales comerciales y espacios verdes.
            </p>
            
            <div className="space-y-0.5">
              {legendItems.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-start space-x-3 cursor-pointer transition-all duration-200 p-1.5 rounded ${
                    hoveredPoint === item.name 
                      ? 'bg-white text-black font-medium transform scale-105' 
                      : 'hover:bg-gray-500 hover:bg-opacity-50'
                  }`}
                  onMouseEnter={() => setHoveredPoint(item.name)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <span className={`font-bold text-sm min-w-[2rem] mt-0.5 ${
                    hoveredPoint === item.name ? 'text-black' : 'text-white'
                  }`}>
                    {item.id.toString().padStart(2, '0')}
                  </span>
                  <span className={`text-sm font-normal leading-relaxed ${
                    hoveredPoint === item.name ? 'text-black' : 'text-white'
                  }`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Panel de leyenda para mobile (debajo del mapa) */}
      <div className="lg:hidden bg-gray-50 p-4">
        <div className="text-center">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            PUNTOS DE INTERÉS CERCANOS
          </h4>
          <p className="text-xs text-gray-600 mb-3">
            Toca el botón + en el mapa para ver la lista completa
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {legendItems.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center space-x-2 bg-white p-2 rounded">
                <span className="font-bold text-gray-800 min-w-[1.5rem]">
                  {item.id.toString().padStart(2, '0')}
                </span>
                <span className="text-gray-600 truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
          {legendItems.length > 6 && (
            <p className="text-xs text-gray-500 mt-2">
              +{legendItems.length - 6} puntos más
            </p>
          )}
        </div>
      </div>
    </div>
  );
}