/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    // Permitimos imágenes servidas desde el Azure Blob Storage usado en el proyecto
    domains: [
      'resourcesyacare.blob.core.windows.net'
    ],
    // Alternativamente, si usas múltiples contenedores/subdominios, puedes
    // usar `remotePatterns` (comentado aquí como referencia):
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '**.blob.core.windows.net',
    //     pathname: '/**',
    //   },
    // ],
  },
}
