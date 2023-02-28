const path = require('path');
const withVideos = require('next-videos');

const nextJSConfig = {
  trailingSlash: true,
  compress: false, // NOTE: enable this when doing SSR
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_DELIVERY_API_ACCESS_TOKEN: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_API_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN
  },
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  devIndicators: { buildActivity: false },
  sassOptions: { includePaths: [path.join(__dirname, 'src/styles')] },
  distDir: process.env.NEXT_PUBLIC_DIST_DIR || '.next',
  webpack: function (config, options) {
    config.module.rules.push({ test: /\.svg$/, use: [{ loader: '@svgr/webpack' }] });
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `/_next/static/sounds/`,
            outputPath: `static/sounds/`,
            name: '[name]-[hash].[ext]',
            esModule: false
          }
        }
      ]
    });
    return config;
  }
};

const nextPlugins = [withVideos];

if (process.env.BUNDLE_ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: true });
  nextPlugins.push(withBundleAnalyzer);
}

const finalConfig = nextPlugins.reduce((config, plugin) => {
  if (typeof plugin === 'function') return plugin(config);
  return plugin[0]({ ...config, ...plugin[1] });
}, nextJSConfig);

module.exports = finalConfig;
