/** @type {import('next').NextConfig} */
const repoName = 'todo-frontend';
const isProd = process.env.NODE_ENV === 'production';

const BACKEND_API = 'https://flask-todo-app-ci0o.onrender.com/api';

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async rewrites() {
    if (isProd) return [];
    // Dev-only proxy to avoid CORS: /api/* -> BACKEND_API
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_API}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
