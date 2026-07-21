/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/showcase',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
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
