'use client'

import { useEffect, useRef, useState } from 'react'
import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { mapStyles, projectLocation, pointsOfInterest, type PointOfInterest } from '@/lib/map-config'

// Componente del mapa interno
function MapComponent({
  center,
  zoom,
  hoveredPoint,
}: {
  center: google.maps.LatLngLiteral
  zoom: number
  hoveredPoint: string | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()
  const [markers, setMarkers] = useState<{ [key: string]: google.maps.Marker }>({})
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>()

  // Inicializar el mapa
  useEffect(() => {
    if (ref.current && !map) {
      const mapInstance = new google.maps.Map(ref.current, {
        center,
        zoom,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
      })
      setMap(mapInstance)

      // Crear ventana de información
      setInfoWindow(new google.maps.InfoWindow({
        maxWidth: 280,
      }))
    }
  }, [ref, map, center, zoom])

  // Crear y actualizar marcadores
  useEffect(() => {
    if (!map || !infoWindow) return

    // Limpiar marcadores existentes
    Object.values(markers).forEach(marker => marker.setMap(null))
    const newMarkers: { [key: string]: google.maps.Marker } = {}

    // Marcador del proyecto
    const projectMarker = new google.maps.Marker({
      position: projectLocation,
      map,
      title: "VIRA TRIUNVIRATO",
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#E2C18A",
        fillOpacity: 1,
        strokeColor: "#2B303B",
        strokeWeight: 2,
      },
      zIndex: 1000,
    })

    projectMarker.addListener('click', () => {
      infoWindow.setContent(`
        <div style="padding: 12px; text-align: center; font-family: 'Beatrice', Arial, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #2B303B; font-size: 16px; font-weight: bold;">
            VIRA TRIUNVIRATO
          </h3>
          <p style="margin: 0; color: #536A84; font-size: 12px; line-height: 1.3;">
            📍 ${projectLocation.address}
          </p>
        </div>
      `)
      infoWindow.open(map, projectMarker)
    })

    newMarkers["proyecto"] = projectMarker

    // Crear marcadores para puntos de interés
    Object.entries(pointsOfInterest).forEach(([category, points]) => {
      points.forEach((point: PointOfInterest) => {
        const marker = new google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map,
          title: point.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#8BA0BD",
            fillOpacity: 0.8,
            strokeColor: "#FFFFFF",
            strokeWeight: 1,
          },
        })

        marker.addListener('click', () => {
          infoWindow.setContent(`
            <div style="padding: 12px; text-align: center; font-family: 'Beatrice', Arial, sans-serif;">
              <h3 style="margin: 0 0 8px 0; color: #2B303B; font-size: 14px; font-weight: bold;">
                ${point.name}
              </h3>
              <p style="margin: 0; color: #536A84; font-size: 12px; line-height: 1.3;">
                📍 ${point.address}
              </p>
            </div>
          `)
          infoWindow.open(map, marker)
        })

        newMarkers[point.name] = marker
      })
    })

    setMarkers(newMarkers)
  }, [map, infoWindow])

  // Manejar hover en puntos
  useEffect(() => {
    if (!map || !hoveredPoint || !markers[hoveredPoint]) return
    
    const marker = markers[hoveredPoint]
    map.panTo(marker.getPosition() as google.maps.LatLng)
    marker.setAnimation(google.maps.Animation.BOUNCE)
    
    // Detener la animación después de un momento
    setTimeout(() => {
      marker.setAnimation(null)
    }, 1500)
  }, [hoveredPoint, markers, map])

  return <div ref={ref} className="w-full h-full" />
}

// Componente wrapper principal
export function Map() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  const renderMap = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
            <span className="text-neutral-400 text-lg">Cargando mapa...</span>
          </div>
        )
      case Status.FAILURE:
        return (
          <div className="w-full h-full flex items-center justify-center bg-neutral-100">
            <span className="text-neutral-400 text-lg">Error al cargar el mapa</span>
          </div>
        )
      case Status.SUCCESS:
        return (
          <MapComponent
            center={projectLocation}
            zoom={16}
            hoveredPoint={hoveredPoint}
          />
        )
    }
  }

  return (
    <div className="w-full h-full relative">
      <Wrapper apiKey={apiKey} render={renderMap} />
      {/* Lista de puntos de interés */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-[300px] max-h-[calc(100%-2rem)] overflow-y-auto">
        <h3 className="text-lg font-medium mb-4 text-[#2B303B]">Puntos de Interés</h3>
        {Object.entries(pointsOfInterest).map(([category, points]) => (
          <div key={category} className="mb-4">
            <h4 className="text-sm font-medium text-[#536A84] capitalize mb-2">{category}</h4>
            {points.map((point) => (
              <p
                key={point.name}
                className="text-sm text-[#2B303B] mb-1 cursor-pointer hover:text-[#E2C18A] transition-colors"
                onMouseEnter={() => setHoveredPoint(point.name)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {point.name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
} 