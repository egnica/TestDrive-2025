/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["mybarlow.barlowresearch.com", "barlowresearch.com"],
  },
  env: {
    FILEMAKER_API_USERNAME: process.env.FILEMAKER_API_USERNAME,
    FILEMAKER_API_PASSWORD: process.env.FILEMAKER_API_PASSWORD,
  },
};

export default nextConfig;
