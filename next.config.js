/** @type {import('next').NextConfig} */
const CIFS_URL = 'https://cifs-site.vercel.app'

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      // Les formations sont gérées par le CIFS, centre de formation de la CRCI
      { source: '/formations', destination: `${CIFS_URL}/#formations`, permanent: false },
      { source: '/formations/:path*', destination: `${CIFS_URL}/#formations`, permanent: false },
    ]
  },
}

module.exports = nextConfig
