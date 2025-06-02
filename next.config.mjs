/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/mybarlow/testdrive2025",
  assetPrefix: "/mybarlow/testdrive2025",
  images: {
    domains: ["mybarlow.barlowresearch.com", "barlowresearch.com"],
  },
};

export default nextConfig;
