export function SchemaMarkup() {
  const realEstateSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "VIRA Triunvirato",
    "description": "Proyecto inmobiliario premium en Buenos Aires. Amenities de lujo, ubicación estratégica en Av. Triunvirato y Los Incas.",
    "url": "https://vira.com.ar",
    "logo": "https://vira.com.ar/logos/vira_1.png",
    "image": "https://vira.com.ar/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Triunvirato y Av. de Los Incas",
      "addressLocality": "Villa Urquiza",
      "addressRegion": "Ciudad Autónoma de Buenos Aires",
      "postalCode": "1414",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.5965,
      "longitude": -58.4448
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ],
    "sameAs": [
      "https://instagram.com/vira_proyecto",
      "https://facebook.com/vira.proyecto"
    ],
    "member": {
      "@type": "Organization",
      "name": "P&G Desarrollos Urbanos",
      "url": "https://pyg-desarrollos.com.ar"
    }
  }

  const residenceSchema = {
    "@context": "https://schema.org",
    "@type": "Residence",
    "name": "VIRA Triunvirato",
    "description": "Proyecto inmobiliario con amenidades premium: gimnasio, pileta, terraza con parrilla, cocheras, bicicleteros, SUM y jardín urbano.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Triunvirato y Av. de Los Incas",
      "addressLocality": "Villa Urquiza", 
      "addressRegion": "Ciudad Autónoma de Buenos Aires",
      "postalCode": "1414",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -34.5965,
      "longitude": -58.4448
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Gimnasio",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Pileta",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Terraza con Parrilla",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Cocheras",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "SUM",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Jardín Urbano",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Control de Acceso",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Cámaras de Seguridad",
        "value": true
      }
    ],
    "numberOfRooms": "1-4",
    "floorSize": {
      "@type": "QuantitativeValue",
      "minValue": 35,
      "maxValue": 120,
      "unitCode": "MTK"
    }
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "P&G Desarrollos Urbanos",
    "description": "Desarrolladora inmobiliaria especializada en proyectos premium en Buenos Aires.",
    "url": "https://pyg-desarrollos.com.ar",
    "logo": "https://vira.com.ar/logos/p-g.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Buenos Aires",
      "addressRegion": "Ciudad Autónoma de Buenos Aires",
      "addressCountry": "AR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-11-XXXX-XXXX",
      "contactType": "sales",
      "availableLanguage": "Spanish"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(residenceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  )
} 