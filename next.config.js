/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", 
  basePath: "/ignite-shop",
  images: {
    domains: ["files.stripe.com"],
  },
};

module.exports = nextConfig;
