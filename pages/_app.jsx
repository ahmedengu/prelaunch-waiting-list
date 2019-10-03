import React from 'react';
import App from 'next/app';
import Parse from 'parse';
import { Provider } from 'react-redux';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import * as qs from 'qs';
import { appWithTranslation, i18n } from '../i18n';
import withReduxStore from '../lib/with-redux-store';
import { setUser } from '../store';
import {
  countries, javaScriptKey, applicationId, serverURL,
} from '../constants';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {
      reduxStore, res, pathname, query, req,
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
    const lang = (req ? req.language : i18n.language);

    return {
      pageProps,
      lang,
    };
  }

  render() {
    if (process.browser) {
      Parse.initialize(applicationId, javaScriptKey);
      Parse.serverURL = serverURL;
    }
    const {
      Component, pageProps, reduxStore, lang,
    } = this.props;

    Parse.User.currentAsync()
      .then(async (user) => {
        let userJson = user && user.toJSON();
        reduxStore.dispatch(setUser(userJson));

        if (userJson) {
          cookie.set('user', userJson);
          try {
            if (userJson.lang === lang) {
              userJson = (await Parse.User.current()
                .fetch()).toJSON();
            } else {
              user.set('lang', lang);
              userJson = (await user.save())
                .toJSON();
            }
          } catch (e) {
            Parse.User.logOut();
            userJson = undefined;
          }
          reduxStore.dispatch(setUser(userJson));
          if (userJson) {
            cookie.set('user', userJson);
          } else {
            cookie.remove('user');
          }
        } else {
          cookie.remove('user');
        }
      });
    return (
      <Provider store={reduxStore}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(appWithTranslation(MyApp));
