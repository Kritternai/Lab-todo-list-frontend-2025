/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// Determine repo name for GitHub Pages base path
// Priority: NEXT_PUBLIC_BASE_PATH (may include leading slash) -> GITHUB_REPOSITORY (owner/repo) -> fallback
const envBase = process.env.NEXT_PUBLIC_BASE_PATH || '';
const repoFromEnv = envBase.replace(/^\//, '').trim();
const repoFromGitHub = (process.env.GITHUB_REPOSITORY || '').split('/')[1];
const repoName = repoFromEnv || repoFromGitHub || 'Lab-todo-list-frontend-2025';

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
    return [];
  },
};

module.exports = nextConfig;
