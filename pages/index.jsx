import React from 'react';
import * as qs from 'qs';
import { Router } from '../i18n';
import { codes, countries } from '../constants';

export default class extends React.Component {
  static async getInitialProps({ res, req }) {
    const { query: { subpath, lng, ...query } } = req;
    const queryString = Object.keys(query).length ? `?${qs.stringify(query)}` : '';
    let country = 'egypt';

    if (!process.browser) {
      const geoip = require('geoip-country');
      const geo = geoip.lookup((req.ip || '').split(':')[0]) || geoip.lookup((req.ip));
      country = geo && geo.country && codes.includes(geo.country)
        ? countries[codes.indexOf(geo.country)]
        : 'egypt';
    }

    if (res) {
      res.writeHead(302, {
        Location: `/${lng}/${country}${queryString}`,
      });
      res.end();
    } else {
      Router.push(`/${country}${queryString}`);
    }
    return {};
  }
}
