/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/zustand",
        destination: "/pages/zustand",
      },
      {
        source: "/context",
        destination: "/pages/context",
      },
    ];
  },
};

// module.exports = nextConfig;
export default nextConfig;
