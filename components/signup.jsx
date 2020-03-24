/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import * as qs from 'qs';
import { toast } from 'react-toastify';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import OwlCarousel from 'react-owl-carousel2';
import { Router } from '../i18n';
import { setLang, setUser } from '../store';
import HomeFeatures from './homeFeatures';
import { logEvent, logUserId } from '../utils/analytics';
import Header from './Header';
import { addLoading, documentReady, removeLoading } from '../static/assets/js/custom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
      country: '',
      playVideo: false,
    };

    if (process.browser) {
      const { query: { email, username, ref } } = Router;
      if (email || username) {
        this.state.email = decodeURIComponent(email || username);
        this.register(true);
      } else if (ref) {
        cookie.set('ref', ref, { expires: 1 });
      }
    }
  }

  componentDidMount() {
    documentReady();
  }

  setPlay = (playVideo) => {
    this.setState({ playVideo });
  };

  videoOnClick = () => {
    window.scrollTo({
      top: window.$('#merquant-video').offset().top - 100,
      behavior: 'smooth',
    });
    this.setPlay(false);
    setTimeout(() => {
      this.setPlay(true);
    }, 100);
  };

  async register(notMounted = false, providerName = '', authData = {}) {
    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email)
        .toLowerCase());
    };

    let { email } = this.state;
    if (!email || !validateEmail(email)) {
      if (notMounted) {
        this.state = { ...this.state, error: 'invalid-email' };
      } else {
        this.setState({ error: 'invalid-email' });
      }
      return;
    }
    if (notMounted) {
      this.state = {
        ...this.state,
        loading: true,
        error: '',
      };
    } else {
      this.setState({
        loading: true,
        error: '',
      });
    }

    email = email.toLowerCase()
      .trim();
    const atSplit = email.split('@');
    if (email.includes('gmail.com')) {
      email = `${atSplit[0].split('+')[0].replace(/\./g, '')}@${atSplit[1]}`;
    }
    try {
      let user;
      if (providerName) {
        try {
          user = await Parse.User.logInWith(providerName, { authData });
        } catch (e) {
          user = await Parse.User.logIn(email, email);
          // eslint-disable-next-line no-underscore-dangle
          await user._linkWith(providerName, { authData });
        }
        logEvent('user', `social_login_${providerName}`);
      } else {
        user = await Parse.User.logIn(email, email);
        logEvent('user', 'logIn_normal');
      }
      this.loggedIn(user);
      logEvent('user', 'logIn');
    } catch (e) {
      const { country, lang, referral } = this.props;
      const { query: { ref } } = Router;

      const user = new Parse.User();
      user.set('username', email);
      user.set('password', email);
      user.set('email', email);
      user.set('country', country);
      user.set('lang', lang);
      user.set('referred', referral || ref);

      try {
        if (providerName) {
          // eslint-disable-next-line no-underscore-dangle
          await user._linkWith(providerName, { authData });
          logEvent('new_user', `social_signUp_${providerName}`);
          logEvent('new_user_social', `social_signUp_${providerName}`);
        } else {
          await user.signUp();
          logEvent('new_user', 'signUp_normal');
          logEvent('new_user_normal', 'signUp_normal');
        }
        this.loggedIn(user, true);
        logEvent('user', 'signUp');
      } catch (error) {
        logEvent('signUp', error.message);

        if (notMounted) {
          this.state = {
            ...this.state, error: error.message, loading: false,

          };
        } else {
          this.setState({
            error: error.message, loading: false,

          });
        }
      }
    }
  }

  async loggedIn(user, isNew = false) {
    const { setUserHandler, t, setLangHandler } = this.props;
    const { pathname } = Router;
    const userJson = user && (await user.fetch()).toJSON();
    setLangHandler(userJson.lang);
    setUserHandler(userJson);
    logUserId(userJson.objectId);
    cookie.set('user', userJson);


    Router.push(`${pathname}?${qs.stringify({ ref: userJson.ref })}`);
    toast(t(isNew ? 'welcome' : 'welcome-back'));
  }

  responseFacebook(res) {
    if (res.email) {
      const authData = {
        id: res.id,
        access_token: res.accessToken,
      };
      const providerName = 'facebook';
      this.setState({ email: res.email }, () => {
        this.register(false, providerName, authData);
      });
    }
  }

  responseGoogle(res) {
    if (res.accessToken && res.profileObj) {
      const authData = {
        id: res.googleId,
        access_token: res.accessToken,
      };
      const providerName = 'google';
      this.setState({ email: res.profileObj.email }, () => {
        this.register(false, providerName, authData);
      });
    }
  }

  render() {
    const { t, country, referral } = this.props;
    const {
      email, loading, error, playVideo,
    } = this.state;
    const countriesData = [
      {
        tag: 'country-eg',
        route: 'egypt',
      },
      {
        tag: 'country-ksa',
        route: 'saudi',
      },
      {
        tag: 'country-uae',
        route: 'emirates',
      },
      // {
      //   name: 'nigeria',
      //   tag: 'country-ng',
      // },
    ];
    const countriesImgs = {
      egypt: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5AMRAgAo2DXFigAAA8JJREFUSMfllrFvHUUQxn+zu3f33guObexAEoHsYBoUEVCQkgaBQgsSHVWKNEj8A/wBFFAgUdFDRZeCmhKRhiiR0iUyQgoofnEiyHt5tvPubneG4i62E+z4OXEKxEirk/Z25/vmm9mdhf+bydUzZ0iqCLg7GxsyihF5TmBmZl7EkpmFpOpaIH2p1+NlEd65fPlAAT+fnubk3BwOqM1cz3uRX06dIi8K78wWb62tLazFiIjgAe8cAljD9lnxHXC7EFk+Oz1dhiLPF8TsO4Fzc52OuPGYUpValSpGDJB2PKvSgFQiV38eDM4Hge+BcwbayzLLnWNUVdSqJDNKVcqUiGaoWUNCnpqGmdnpWvWHALwLKCBqJt45poqCUVXhVCm8R0MgmlGltKmGbvO2Txopmb0dgLB9rwFehOkWvIwRJ0ImQp5lHDIjmVGpUqpStcqYGSIyCQkPWBDv/7X2YV4Pd7ts1DUbdQ0i2LadXVN6IihCpbqpRmxJ0KZkFyIS4mDwRHodwGJkva4AQUQwU3x2CNWIpZJMHBnQA2KrRKlKbInsRCLMX7hwfy9tRMTKOrrh+lpXTcX73O6v/CpF7wid2SU0lQ2phzlrz+BmXcTaJTNUtypDxma6F7DRHMIS5O7wHr4zy/UfP0V8hzc+/pbx8Dbii3blNsJtpGaGmpJiIsaamBKyVsfJbgZTfJbxYPUK/Rs/cXP5OkW3R9Hp0Zl/k+nXPyKVQ0TcI4S3qdaSEQwjiPcT4WJt0emIqcFF/J3f+fPumENdx6sffI2EDGoHbsuf7OwGENxkqFumaYxJxlvvf8Lp9z4kUZBS2velElJKE0acEOdJ4/vki+fBd3nlaAf34lmGayPqukY1PZ7mXU1sguLaEkmw+BcbN74hDn/DMIrDC2RLnzGURcoHQ/Ehm6ihhC++/Go0uUAGklGtXkMf3G6m8iHd4xcxU1ZX+93BvYELIZiBPCl8OXHitX30u+aASvYCIqFxawmrR4gIqkq/v0JZlntHPDM7O2latgWemgEgAjLTiCHC/JEj9PsrrNy6hYjgnNtR+mDN7D4bjHt0hzVqmBkxRo4dO06e5/xx8yYxxh2py9TUlFrTFv3D18buLGTXn4/wMPDBs7G+TlVVjy9NgENELrV4iYbA8xwJMOfcNWZmZpZCCJdExERE2+/zGAqYiFzx3p8UgKNHj2WDwWAJmBdpXiP7rbc9zMzwKcW/QwjLhlUUReFaw7l936BPY84550LIMs3zgrIcOxGRzWZ6oNb4jDFZ8M6ipoMG+A/YP/JPF/e3AQk9AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTE3VDAyOjAwOjQwLTA3OjAweg2zeAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0xN1QwMjowMDo0MC0wNzowMAtQC8QAAAAASUVORK5CYII=',
      saudi: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5AMRAgMVq3DaWAAABc1JREFUSMfllttvHVcVxn9r7z1nzjk+9nF8bAe38SVubo5TIZJYJCINAolKpfShF6kICRrxQP8BJHhAtM/8B6VI8IKqPpSi9gUIFS9UbdpAkyZKjUziOE7tnMQ58SU+l5nZe/FwbMe5CKQGS0is0WhrZs+sb+1vrf3tBf9vJvzyZVAVwMjiquhKC3QLkBQwApHxBNShatZee+3ugJ/8dmuW+ONn28DNTMg747AmkIUSwlG5uVLSnz6nqICsRbge1n9jxVZUcu59rCw4fNiL8BYwTrmoxhmhlaGpolkAr8BaIA8L7VW0mc3g5HkHvA6MA5lGTigXMc0W4gMaFJKAJh5NA4S10OULR6GoDuP5jQOO0HbpCAGMIeTz2GYLKwFfNJiCQ32AVNE0EJIM8W1PIkJAEREEUAVFMSLoeooEdOOBQNBxBzjWiIyMxfsUFcHnLFkjwaklBA/GILGgOYhKBbJWikkyfDNBxEHmCSED60CEkGZgLRvoxq4zZQB1gAiCqqcr7uDJwcN0RXlmV2vkXczvzpzkpf3f4rNbc/y9OsWxRw5QjHKUcgX2bHuUD+cmqa4sUpY8Xyp0c25+Gg1wfPQAjSxhunaNvlI3H8x8xs3btxBjURCzDlrOFZmoDHKkfyexsRzrH+X7u75K//ZhJJ+j6VO+u/c4PXGRos2RE8eZ6iVO7P8mcZwj7swzPjTK2MhOrvibPDU2wb7eRxgs9zHWu4OuuAghbNSHQ4AQ6MwV+MbgfhTliYE9VBvLnK9dRVT5cOESiYWcjdiW76RS6KLhU948/yfKUUxkHMvNOlO1z/m8XmOg0sevzp/k2V1HeOfy31j0dXKRa9Me2tQbVQVjWWis8OvJ9/nH4nU+ujHNu5fPUGveJjaW1Hu6ix2smJRqc4nfXzxFI2vx8+MnmFyc5/HKILPLVYwxOLF477mdtShEMYM9fSxLg65KGcoRpiNCnGB55tCrgpD5lO5CiYXGEj1xBy/t+xoH+4bpK3YRu4jYWF7YdZjJpTkKNs/3dh+jkbV4b/ZTegtlrHWICFkIXKsv0pUrcKO+RG+hjDGW5bTOXOMmrhBD3uLWRUWMZX51kZHtj/HX6kWGOytU4g7emDrFxaXrHB3Yw59nznJkYA+H+kboMjEzy1WeHp3g9LUpjBhUFYPSnSuwnDSIrOOTG5c4OrCP6aUqqGxUuVvfXCLC4z2PcnxgN/UswWtgvr7E5GKVVw4/QxYCpxdmeLq8nVdPv8Pzowf5oDbNhWvTJFnCamuVA73D1KxjrHeIoVIvH1cv8vHsOYZKFVo+21DOO8CqRNaxu7ydgosYKvVQa63yx6sXeHJwnP5CJ7daDXaWKvzso7d57es/4A9XzvHp4iyJVVbqDb49cojT1X/yndEJ3rjwF2ZWFtjR2csTI4fIVJmszeJcvCEkwms/0jVxwSJ0Rjn6OrZxeek6sTFkCBI8EwO7ODU/RTNN6MgX2VGqMF9fohUyul1b6eaWb1CM8mQaACELnlIuT73VIBhBNgn+BvA6OBpQn4EG8OmdmbQJUR7EQPDt29p1PWx/n3oKrkAza6LeY6IYFYMVue+Ac/c8o2KIcgWe2/kVBks9qN7R4SwEArpBl9dAUKV9gQ+evcV+zlRnyFnHyStnubqyAMbdkc4HAa9PpT7jwq158jYibyNyxqIoWQh4DXjV9hgCmYa1AAKJ9wyWKoz1D/Ll7iHqaYs3a+9hbIS/Z83C6y8HHnTaZglkKQ/uAmTTcPevcb6DYCwmTZFWQuKztdze5Ucd12+3E9s+NTbMSLsYRMx9sLq2E+7mqW3J0nI7FSLgA6J6b+gBQRyrrU8IehDINocf+GImm5yo3MeXojisnHfE7oek/i1UH1urkYdqcvTfTbUpnMGZE47InsXIBIk/hg8Oka1obtupMZubvXpiaGWLGHkXVfjF21uCu97eaqPd3gqvvNiupCwYfJCHaOT+84qtgDOeoFvD6v+0/QtGoLSvBZCXCgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0xN1QwMjowMzoyMS0wNzowMPEiCkgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMTdUMDI6MDM6MjEtMDc6MDCAf7L0AAAAAElFTkSuQmCC',
      emirates: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5AMRAgMVq3DaWAAABC9JREFUSMflls+LHEUUxz+vqnp6umdn1002oIloxCRKIgQUNSGQqIgnURFEPOSP8H/xIgiCxnvw5EHxrCEhIjmYgDnExPwiG3dmp7urq+p5mNl1szu7yWa9iF/oPnRXv+/3fd+r1wX/N8i5j09SEZm7H8yfN27JaGmICuSt8vkHBRcOOXq1ksyOqUgpqTNOU0oqv719zCwsBtqOSTYpCz/dRLj276b3ETz10gIiQozRFN0CUeDMp29mL1wZHbz++/Xn6+FQEehGI19+2K9/OZTFskpEAdCd0JukerPoFJdPHD3m3bn3jx86cXH0VR54fa47r7eHIk1T0xk01KNlhiOLNqBGdpq3AuJbf+H7n3887RYG6euy0dcU0nyvp2WWc2dpSNYJ7J7PZKZssaHGp5aUEgiICMJjCVHV+HIb/Dcu9/qqChGwISWyzLLwxAwjPyBzHeb7fbou4lNL7RsaX+FbT0xx3DLbFxFjikedGZfNAgiQVHHOsmfXLHlHCTEAQuY6dFyOln1CDPi2oW5qfNsQYkBRBEHkoSIsoG7Ct4oVchGYn93FTOERP1xdJggd1yHPcvrFLDFFfOtp2prG17ShRVWnurGmNcVNUygyvobtMtFajFMG1QCZBNM1IcbPDLZjKbICFxy1H4vw3pM0TuSOA8tEgPNNu9EMI1RVy6m9b40OHtnf5lWgamtzZ/BXEVXFijy4sXRyE1nNUnVcptpX1L42MSZSiqiOxbt61GzM2Fiq4YB3D7xXlIePFxojYi1JkWv3B4y8x1mDTt3Wa9xYEQGklGhDoG09bQhsYbWQNIkCSRMksMawd7bg6uIyi9UIZ+zG6m0iY9x4QCY4B26zxQoYMQhgxYCxKJBZx6GFJ/njr0VuDZawZvtDXMSyra9WvFHg6bl5np3fjaqiqtseJ26rlyml1fpMw0LZIzOGq/fu4kPYVvZuY4llte2NMSqMa4u1UwPMFSVH9z3DjWqZQVOLefgAGROPQpjiqWCN8O3Zs9WdS5daV9eim2SjqlhjiClxd3lQhDYYEVHY2n05d+DAupYUVKCbEp/t2cOvRUGREomtISIYoKprfNs+dHS6rRaUZclsv/9IxCuYmZ2lbhqaptmS3E21Rf4ZcduFqtLNc6wxVHU97vg1k24SUd3927dXt+3KxwkoUuI6cLUsKVMirRHxKHImx5zxD+fBVxEwrmmay8T44oRPV4iNKsPhUJZCkLANq9eTrzcEsNbaC85k2SdqzBlSOqIT2wUQVaxzOOdwj0k8hdQYY85nWXba9dv2YlX2Xhmhh5Oz+1CSioCqFHk+zPK8zVOSHRIr4wPAvU6eXzn5xikv35WlMSGoiqgA7zTNzig2wXP79yMihBhNt5sjP/R6hCwTD5LceJAlIFfli7k5zne79NY11+NAAFVVY62mlHZ0Tv5v4m8VGhSkQ+x2gwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0xN1QwMjowMzoyMS0wNzowMPEiCkgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMTdUMDI6MDM6MjEtMDc6MDCAf7L0AAAAAElFTkSuQmCC',
    };
    const CountriesSelector = () => countriesData.map(({ tag, route }) => {
      if (route === country) {
        return false;
      }
      const onCountrySelectorHandler = (countryRoute) => {
        removeLoading();
        Router.push(`/${countryRoute}`);
        addLoading();
      };
      return (
        <li
          key={tag}
          role="button"
          tabIndex="0"
          onClick={(e) => {
            e.preventDefault();
            onCountrySelectorHandler(route);
          }}
          onKeyPress={(e) => {
            e.preventDefault();
            if (e.key === 'Enter' || e.key === 'Space') {
              onCountrySelectorHandler(route);
            }
          }}
        >
          <div className="row">
            <div className="col">
              <span>
                {t(tag)}
              </span>
            </div>
            <div className="col">
              <img className="flag" src={countriesImgs[route]} alt="" />
            </div>
          </div>
        </li>
      );
    });
    return (
      <div className="scroll-to-top">
        <header id="page-top" className="ts-full-screen">
          <Header t={t} />
          <div className="container align-self-center main-content">
            <div className="row align-items-center">
              <div className="col-lg-7 col-sm-12 offset-sm-1 signup">
                <h1 className="typography-head text-center">{t('Investment-Simplified')}</h1>
                <h2 className="typography-subhead text-center mb-3">
                  {t(referral ? 'ref-sub-1' : 'sub-1')}
                </h2>
                <form
                  className="ts-form ts-form-email ts-labels-inside-input"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.register();
                  }}
                >
                  <div className="row text-center">
                    <div className="col-2">
                      <div className="dropdown m-0">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          <img className="flag" src={countriesImgs[country]} alt="" />
                          <span className="caret" />
                        </button>
                        <ul className="dropdown-menu">
                          <CountriesSelector />
                        </ul>
                      </div>
                    </div>
                    <div className="col-7 p-0">
                      <div className="form-group mb-0">
                        <input
                          style={{ direction: 'ltr', textAlign: 'left' }}
                          dir="ltr"
                          type="search"
                          className={`signup-input form-control ${error ? 'is-invalid' : ''}`}
                          placeholder={t('enter_email')}
                          value={email}
                          onChange={(event) => {
                            this.setState({
                              email: event.target.value,
                              error: '',
                            });
                          }}
                          id="email-subscribe"
                          aria-describedby="subscribe"
                          name="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-3 p-0">
                      <button
                        className={`btn btn-primary submit-a ${loading && 'processing'}`}
                        type="submit"
                        disabled={loading}
                      >
                        {t('submit')}
                        <div className="status">
                          <i
                            className="fas fa-circle-notch fa-spin spinner"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </form>
                {error && (<p className="text-danger" style={{ margin: 0 }}>{t(error)}</p>)}
                <div className="row">
                  <div className="col-6 p-0">
                    <FacebookLogin
                      isMobile={false}
                      appId="403863870540210"
                      fields="email"
                      callback={(res) => {
                        this.responseFacebook(res);
                      }}
                      render={(renderProps) => (
                        <FacebookLoginButton
                          className="social-login"
                          text={t('login_with_facebook')}
                          disabled={renderProps.disabled}
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                  </div>
                  <div
                    className="col-6 p-0"
                  >
                    <GoogleLogin
                      clientId="449870039809-vernaus5vu13rmqga2rf6t9lpofm9nuf.apps.googleusercontent.com"
                      onSuccess={(res) => {
                        this.responseGoogle(res);
                      }}
                      render={(renderProps) => (
                        <GoogleLoginButton
                          className="social-login"
                          text={t('login_with_google')}
                          disabled={renderProps.disabled}
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="row align-items-baseline">
                  <div className="col-12 text-dark text-nowrap font-italic legal-subhead">
                    <small>
                      {t('signup-legal')}
                    </small>
                  </div>
                </div>
                <div className="row text-center mt-2">
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-outline-dark push-image-container"
                      onClick={this.videoOnClick}
                    >
                      {t('watch-video')}
                      {' '}
                      <i className="far fa-play-circle" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <OwlCarousel
                  options={{
                    items: 1,
                    nav: true,
                    rewind: true,
                    autoplay: true,
                    navText: [],
                    dots: false,
                  }}
                  className="owl-carousel text-center"
                  data-owl-nav="1"
                  data-owl-loop="1"
                >
                  <img
                    src={t('carousel-1')}
                    className="d-inline-block mw-100 ts-width__auto"
                    alt=""
                  />
                  <img
                    src={t('carousel-2')}
                    className="d-inline-block mw-100 ts-width__auto"
                    alt=""
                  />
                  <img
                    src={t('carousel-3')}
                    className="d-inline-block mw-100 ts-width__auto"
                    alt=""
                  />
                </OwlCarousel>
              </div>
            </div>
          </div>
        </header>

        <div
          id="ts-dynamic-waves"
          className="ts-background"
          data-bg-color="rgba(255, 171, 3, 0.72)"
        >
          <svg
            className="ts-svg"
            width="100%"
            height="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs />
            <path
              className="ts-dynamic-wave"
              d=""
              data-wave-color="#fff"
              data-wave-height=".2"
              data-wave-bones="6"
              data-wave-speed="0.2"
            />
          </svg>
        </div>

        <HomeFeatures t={t} playVideo={playVideo} setPlay={this.setPlay} />
      </div>
    );
  }
}

Signup.defaultProps = { referral: '' };
Signup.propTypes = {
  t: PropTypes.func.isRequired,
  setUserHandler: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  referral: PropTypes.string,
  lang: PropTypes.string.isRequired,
  setLangHandler: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  country: state.country,
  referral: state.referral,
  lang: state.lang,
});

const mapDispatchToProps = {
  setUserHandler: setUser,
  setLangHandler: setLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
