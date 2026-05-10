/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint tetep jalan pas build (biar tau kalau ada error)
  // Tapi jangan gagalin build dulu selama masih development
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Hapus images.unoptimized karena Vercel handle ini
};

module.exports = nextConfig;