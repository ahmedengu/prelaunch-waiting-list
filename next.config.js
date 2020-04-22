const HoneybadgerSourceMapPlugin = require('@honeybadger-io/webpack');
const withSass = require('@zeit/next-sass');
const withPurgeCss = require('next-purgecss');

module.exports = withSass(withPurgeCss({
  purgeCssEnabled: ({ dev, isServer }) => (!dev && !isServer),
  purgeCss: {
    whitelist: ['iframe', 'show', 'in'],
    whitelistPatterns: [/owl*./, /embed*./, /.*loading*./, /.*collaps*./, /.*oast*./],
  },
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
}));
