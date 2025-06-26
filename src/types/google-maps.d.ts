/// <reference types="@types/google.maps" />

declare global {
  namespace google.maps.marker {
    class AdvancedMarkerElement extends google.maps.MVCObject {
      constructor(options?: AdvancedMarkerElementOptions);
      position: google.maps.LatLng | google.maps.LatLngLiteral | null;
      title: string | null;
      map: google.maps.Map | null;
      content: HTMLElement | null;
      zIndex: number | null;
    }

    class PinElement {
      constructor(options?: PinElementOptions);
      element: HTMLElement;
    }

    interface AdvancedMarkerElementOptions {
      position?: google.maps.LatLng | google.maps.LatLngLiteral;
      title?: string;
      map?: google.maps.Map;
      content?: HTMLElement;
      zIndex?: number;
    }

    interface PinElementOptions {
      scale?: number;
      background?: string;
      borderColor?: string;
      glyphColor?: string;
    }
  }
}

export {}; 