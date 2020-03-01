import React from 'react';
import App from 'next/app';
import Parse from 'parse';
import { Provider } from 'react-redux';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import * as qs from 'qs';
import { PageTransition } from 'next-page-transitions';
import { toast } from 'react-toastify';
import fetch from 'isomorphic-unfetch';
import { appWithTranslation, i18n, Router } from '../i18n';
import withReduxStore from '../lib/with-redux-store';
import { setLang, setReferral, setUser } from '../store';
import {
  countries, javaScriptKey, applicationId, serverURL,
} from '../constants';
import { initGA, logEvent, logPageView } from '../utils/analytics';

class MyApp extends App {
  constructor(props) {
    super(props);
    const {
      reduxStore,
      lang,
      router: { pathname, query: { token, link, username } },
      pageProps: { namespacesRequired },
    } = props;


    if (process.browser) {
      toast.configure();

      const Honeybadger = require('honeybadger-js');
      Honeybadger.configure({
        apiKey: 'd4871a0d',
        revision: (__NEXT_DATA__ || {}).buildId,
      });

      Parse.initialize(applicationId, javaScriptKey);
      Parse.serverURL = serverURL;

      if (token && link && username) {
        const onfulfilled = (event) => (response) => {
          logEvent('user', event);
          this.refreshUser(reduxStore, lang);
          Router.push(pathname);
          this.refreshUser(reduxStore, lang);
          toast(i18n.getFixedT(
            (reduxStore.getState().user && reduxStore.getState().user.lang) || lang,
            (reduxStore.getState().user && reduxStore.getState().user.country) || namespacesRequired[0] || 'egypt',
          )(response));
        };

        if (link.includes('verify_email')) {
          Parse.Cloud.run('verifyEmail', { username, token }).then(onfulfilled('verifyEmail'));
        } else if (link.includes('unsub')) {
          Parse.Cloud.run('manageSub', { username, token, sendEmails: false })
            .then(onfulfilled('unsub'));
        } else if (link.includes('resub')) {
          Parse.Cloud.run('manageSub', { username, token, sendEmails: true })
            .then(onfulfilled('resub'));
        }
      }

      this.refreshUser(reduxStore, lang);
    }
  }

  refreshUser = (reduxStore, lang) => {
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
  };

  static async getInitialProps({ Component, ctx }) {
    const {
      reduxStore, res, pathname, query: { lng, subpath, ...query }, req,
    } = ctx;

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    const lang = (req ? req.language : i18n.language);
    reduxStore.dispatch(setLang(lang || 'ar'));

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
    } else {
      const { ref: cookieRef } = (nextCookie(ctx));
      const { ref } = query;

      await this.checkAndSetRef(ref, cookieRef, reduxStore);
    }

    return {
      pageProps,
      lang,
    };
  }

  static async checkAndSetRef(ref, cookieRef, reduxStore) {
    const anyRef = ref || cookieRef;
    let referral = '';
    try {
      if (anyRef) {
        const newRef = await fetch(`${serverURL}/functions/checkRef`, {
          headers: {
            'x-parse-application-id': applicationId,
            'X-Parse-JavaScript-Key': javaScriptKey,
          },
          body: `{"ref":"${anyRef}"}`,
          method: 'POST',
        });
        const message = await newRef.json();
        referral = (message && message.result) || referral;
      }
    } catch (e) {
      const Honeybadger = process.browser ? require('honeybadger-js') : require('honeybadger');
      Honeybadger.configure({
        apiKey: 'd4871a0d',
        revision: (__NEXT_DATA__ || {}).buildId,
      });
      Honeybadger.notify(e);
    }
    reduxStore.dispatch(setReferral(referral));
  }

  componentDidMount() {
    if (window && !window.GA_INITIALIZED && window.location && window.location.host.includes(
      'merquant.com',
    )) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    Router.events.on('routeChangeComplete', () => {
      window.scrollTo(0, 0);
    });
  }


  render() {
    const {
      Component, pageProps, reduxStore,
    } = this.props;

    return (
      <Provider store={reduxStore}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withReduxStore(appWithTranslation(MyApp));
