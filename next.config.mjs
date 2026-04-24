/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimise images
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Experimental features
  experimental: {
    // Use Bun-compatible optimisations
    optimizePackageImports: ["react", "react-dom"],
  },
};

export default nextConfig;
