import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/jogo-biblia' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/jogo-biblia' : '',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
    outputFileTracingIgnores: ['**/*'],
  },
};

export default nextConfig;
