import React from 'react';
import App from 'next/app';
import Parse from 'parse';
import { Provider } from 'react-redux';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import * as qs from 'qs';
import { appWithTranslation } from '../i18n';
import withReduxStore from '../lib/with-redux-store';
import { setUser } from '../store';
import { countries } from '../constants';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {
      reduxStore, res, pathname, query,
    } = ctx;
    let { user } = (nextCookie(ctx));
    user = user && JSON.parse(user);
    if (user) {
      reduxStore.dispatch(setUser(user));
      const myCountry = `/${user.country}`;
      if (((!query || query.ref !== user.ref) && myCountry === pathname)
        || (myCountry !== pathname && countries.includes(pathname.replace('/', '')))) {
        query.ref = user.ref;

        if (res) {
          res.writeHead(302, {
            Location: `${myCountry}?${qs.stringify(query)}`,
          });
          res.end();
        } else {
          Router.push(`${myCountry}?${qs.stringify(query)}`);
        }
      }
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    Parse.initialize('xxxxx', 'xxxxx', 'xxxxx');

    Parse.serverURL = 'http://localhost:3000/api';

    const {
      Component, pageProps, reduxStore,
    } = this.props;

    Parse.User.currentAsync().then((user) => {
      const userJson = user && user.toJSON();
      reduxStore.dispatch(setUser(userJson));

      if (userJson) {
        cookie.set('user', userJson);
      } else {
        cookie.remove('user');
      }
    });
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(appWithTranslation(MyApp));
