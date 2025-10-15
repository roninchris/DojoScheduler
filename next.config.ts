/** @type {import('next').NextConfig} */
const nextConfig = {
  // Este bloco autoriza o Next.js a carregar imagens do site placehold.co
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;