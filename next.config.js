/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true // اگه استفاده می‌کنی
  }
}

module.exports = nextConfig
