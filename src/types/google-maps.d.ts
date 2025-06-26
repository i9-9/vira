/// <reference types="@types/google.maps" />

declare namespace google {
  namespace maps {
    interface Map {}
    interface MapOptions {
      center: LatLngLiteral;
      zoom: number;
      styles?: any[];
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      scrollwheel?: boolean;
      zoomControlOptions?: ZoomControlOptions;
      gestureHandling?: string;
      backgroundColor?: string;
    }
    interface Marker {}
    interface MarkerOptions {
      position: LatLngLiteral;
      map: Map;
      title?: string;
      icon?: Symbol;
      animation?: any;
      zIndex?: number;
    }
    interface InfoWindow {}
    interface InfoWindowOptions {
      maxWidth?: number;
      pixelOffset?: Size;
    }
    interface LatLngBounds {
      extend(latLng: LatLng | LatLngLiteral): void;
    }
    interface LatLng {}
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    interface Size {
      width: number;
      height: number;
    }
    interface Symbol {
      path: SymbolPath;
      scale: number;
      fillColor: string;
      fillOpacity: number;
      strokeColor: string;
      strokeWeight: number;
    }
    enum SymbolPath {
      CIRCLE,
    }
    enum Animation {
      DROP,
      BOUNCE,
    }
    enum ControlPosition {
      RIGHT_CENTER,
    }
    interface ZoomControlOptions {
      position: ControlPosition;
    }
  }
}

declare global {
  interface Window {
    google: typeof google;
  }
} 