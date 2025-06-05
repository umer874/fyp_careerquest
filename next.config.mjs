/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,

  webpack(config) {
    config.resolve.alias.canvas = false;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://localhost/3000/api/auth/:path*',
      },
    ];
  },

  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'career-labs.upworkdeveloper.com',
        port: '',
        pathname: '/',
      },
      {
        protocol: 'https',
        hostname: 'career-labs.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/',
      },
    ],
  },
};

export default nextConfig;