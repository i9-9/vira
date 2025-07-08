import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración híbrida: static export por defecto, pero compatible con Vercel
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  trailingSlash: true,
  
  // Configuración para Vercel con ISR
  experimental: {
    // Habilitar ISR para Vercel
    // isrMemoryCacheSize: 0, // Removido - no existe en Next.js 15
  },
  
  images: {
    unoptimized: process.env.STATIC_EXPORT === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.ctfassets.net',
        pathname: '/**',
      },
    ],
  },
  
  // Headers para Vercel
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
