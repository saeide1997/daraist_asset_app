const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // سایر تنظیمات دلخواه
};

module.exports = withPWA(nextConfig);
