const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const Honeybadger = require('honeybadger').configure({
  apiKey: '9c499114',
});

const port = process.env.NEXT_PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const nextI18next = require('./i18n');


(async () => {
  await app.prepare();
  const server = express();
  server.set('trust proxy', true);

  server.use(Honeybadger.requestHandler);
  server.use(nextI18NextMiddleware(nextI18next));

  server.get('*', (req, res) => handle(req, res));
  server.use(Honeybadger.errorHandler);

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
