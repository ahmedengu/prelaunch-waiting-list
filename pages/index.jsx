import React from 'react';
import Router from 'next/router';
import * as qs from 'qs';
import { codes, countries } from '../constants';

export default class extends React.Component {
  static async getInitialProps({ res, req }) {
    const { query: { subpath, lng, ...query } } = req;
    const queryString = Object.keys(query).length ? `?${qs.stringify(query)}` : '';
    let country = 'egypt';

    if (!process.browser) {
      const geoip = require('geoip-country');
      const geo = geoip.lookup(req.ip);
      country = geo && geo.country && codes.includes(geo.country)
        ? countries[codes.indexOf(geo.country)]
        : 'egypt';
    }

    if (res) {
      res.writeHead(302, {
        Location: `/${country}${queryString}`,
      });
      res.end();
    } else {
      Router.push(`/${country}${queryString}`);
    }
    return {};
  }
}
