const HoneybadgerSourceMapPlugin = require('@honeybadger-io/webpack');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack: (config, {
    buildId, dev, isServer, defaultLoaders, webpack,
  }) => {
    if (!dev) {
      config.plugins.push(new HoneybadgerSourceMapPlugin({
        apiKey: 'd4871a0d',
        assetsUrl: process.env.ASSETS_URL || 'https://merquant.com/_next/static/*',
        revision: buildId,
      }));
    }
    return config;
  },
});
