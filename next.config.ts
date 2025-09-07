import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    remotePatterns:[new URL("https://reservasi.labsipilunsoed.com/storage/**")]
  }
};

export default nextConfig;
