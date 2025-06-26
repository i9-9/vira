'use client'

/// <reference types="@types/google.maps" />

import React, { useEffect, useRef, useState } from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'
import { cn } from '@/lib/utils'
import { mapStyles, pointsOfInterest, projectLocation } from '@/lib/map-config'
import { Button } from './ui/button'
import { ScrollArea } from './ui/scroll-area'

interface MapProps {
  center: { lat: number; lng: number }
  zoom: number
}

const Map = ({ center, zoom }: MapProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)
  const [markers, setMarkers] = useState<{ [key: string]: google.maps.Marker }>({})
  const [hoveredPoint, setHoveredPoint] = useState<string>()

  // Inicializar mapa
  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scrollwheel: false,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },
        gestureHandling: 'cooperative',
        backgroundColor: '#f5f5f5',
      })

      const newInfoWindow = new window.google.maps.InfoWindow({
        maxWidth: 200,
        pixelOffset: new window.google.maps.Size(0, -30),
      })

      setMap(newMap)
      setInfoWindow(newInfoWindow)

      // Limpiar marcadores al desmontar
      return () => {
        Object.values(markers).forEach((marker) => {
          marker.setMap(null)
        })
      }
    }
  }, [center, zoom, map, markers])

  // Crear marcadores para puntos de interés con delay
  useEffect(() => {
    if (!map || !infoWindow) return

    // Crear marcador del proyecto
    const projectMarker = new window.google.maps.Marker({
      position: projectLocation,
      map,
      title: 'VIRA TRIUNVIRATO',
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: '#E2C18A',
        fillOpacity: 1,
        strokeColor: '#2B303B',
        strokeWeight: 2,
      },
      zIndex: 1000,
      animation: window.google.maps.Animation.DROP,
    })

    projectMarker.addListener('click', () => {
      infoWindow.setContent(`
        <div style="padding: 8px;">
          <h3 style="margin: 0 0 8px; font-weight: 600;">VIRA TRIUNVIRATO</h3>
          <p style="margin: 0; font-size: 14px;">${projectLocation.address}</p>
        </div>
      `)
      infoWindow.open(map, projectMarker)
    })

    setMarkers((prev) => ({ ...prev, proyecto: projectMarker }))

    // Crear marcadores de puntos de interés
    Object.entries(pointsOfInterest).forEach(([, points], categoryIndex) => {
      points.forEach((point, pointIndex) => {
        setTimeout(() => {
          const marker = new window.google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map,
            title: point.name,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#8BA0BD',
              fillOpacity: 0.8,
              strokeColor: '#FFFFFF',
              strokeWeight: 1,
            },
            animation: window.google.maps.Animation.DROP,
            zIndex: 1,
          })

          marker.addListener('click', () => {
            infoWindow.setContent(`
              <div style="padding: 8px;">
                <h3 style="margin: 0 0 8px; font-weight: 600;">${point.name}</h3>
                <p style="margin: 0; font-size: 14px;">${point.address}</p>
              </div>
            `)
            infoWindow.open(map, marker)
          })

          setMarkers((prev) => ({ ...prev, [point.name]: marker }))
        }, (categoryIndex * points.length + pointIndex) * 200)
      })
    })

    // Ajustar el zoom para mostrar todos los marcadores
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend(projectLocation)
    Object.values(pointsOfInterest).flat().forEach((point) => {
      bounds.extend({ lat: point.lat, lng: point.lng })
    })
    map.fitBounds(bounds, { padding: 50 })

    return () => {
      Object.values(markers).forEach((marker) => {
        marker.setMap(null)
      })
    }
  }, [map, infoWindow, markers])

  // Manejar hover en puntos
  useEffect(() => {
    if (!map || !hoveredPoint || !markers[hoveredPoint]) return
    
    const marker = markers[hoveredPoint]
    map.panTo(marker.getPosition() as google.maps.LatLng)
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    
    const timeout = setTimeout(() => {
      marker.setAnimation(null)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [hoveredPoint, markers, map])

  const categoryLabels: { [key: string]: string } = {
    gastronomia: 'Gastronomía',
    servicios: 'Servicios',
    transporte: 'Transporte',
    educacion: 'Educación',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 h-[600px] lg:h-[700px]">
      <ScrollArea className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-4 space-y-2">
          {Object.entries(pointsOfInterest).map(([category, points]) => (
            <div key={category} className="space-y-2">
              <h3 className="font-medium">{categoryLabels[category]}</h3>
              {points.map((point) => (
                <Button
                  key={point.name}
                  variant="ghost"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    hoveredPoint === point.name && 'bg-accent'
                  )}
                  onMouseEnter={() => setHoveredPoint(point.name)}
                  onMouseLeave={() => setHoveredPoint(undefined)}
                  onClick={() => {
                    if (!infoWindow || !markers[point.name]) return
                    infoWindow.setContent(`
                      <div style="padding: 8px;">
                        <h3 style="margin: 0 0 8px; font-weight: 600;">${point.name}</h3>
                        <p style="margin: 0; font-size: 14px;">${point.address}</p>
                      </div>
                    `)
                    infoWindow.open(map, markers[point.name])
                  }}
                >
                  {point.name}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div ref={ref} className="h-full rounded-lg" />
    </div>
  )
}

const MapWrapper = () => {
  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <Map
        center={projectLocation}
        zoom={15}
      />
    </Wrapper>
  )
}

export default MapWrapper