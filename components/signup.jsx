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
import { Router } from '../i18n';
import { setLang, setUser } from '../store';
import HomeFeatures from './homeFeatures';
import { logEvent, logUserId } from '../utils/analytics';
import Header from './Header';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
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
    window.documentReady();
  }

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
        } else {
          await user.signUp();
          logEvent('new_user', 'signUp_normal');
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
    const { t, referral } = this.props;
    const {
      email, loading, error,
    } = this.state;

    return (
      <>
        <header id="ts-hero" className="ts-full-screen">
          <Header t={t} />
          <div className="container align-self-center">
            <div className="row align-items-center">
              <div className="col-sm-4 d-none d-sm-block">
                <div className="owl-carousel text-center" data-owl-nav="1" data-owl-loop="1">
                  <img
                    src="/static/assets/img/app-03.png"
                    className="d-inline-block mw-100 ts-width__auto"
                    alt=""
                  />
                  <img
                    src="/static/assets/img/app-01.png"
                    className="d-inline-block mw-100 ts-width__auto"
                    alt=""
                  />
                  <img
                    src="/static/assets/img/app-02.png"
                    className="d-inline-block mw-100 ts-width__auto"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-sm-7 offset-sm-1 signup">
                <h1 className="typography-head">{ t('Investment-Simplified') }</h1>
                <h3 className="typography-subhead">
                  { t('sub-1') }
                </h3>
                <form
                  className="ts-form ts-form-email ts-labels-inside-input"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.register();
                  }}
                >
                  <div className="row">
                    <div className="col-md-9 col-sm-12 ">
                      <div className="form-group mb-0">
                        <label htmlFor="email-subscribe">{t('signup-email')}</label>
                        <input
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
                    <div className="col-md-3 col-sm-3 col-3">
                      <input
                        className="btn btn-primary submit-a"
                        type="submit"
                        value={t('submit')}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </form>
                {error && (<p className="text-danger" style={{ margin: 0 }}>{t(error)}</p>)}
                <div className="row">
                  <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                    <FacebookLogin
                      isMobile={false}
                      appId="403863870540210"
                      fields="email"
                      callback={(res) => {
                        this.responseFacebook(res);
                      }}
                      render={(renderProps) => (
                        <FacebookLoginButton
                          text={t('login_with_facebook')}
                          disabled={renderProps.disabled}
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                  </div>

                  <div className="col-12 col-lg-6 col-xl-6 col-md-6">
                    <GoogleLogin
                      clientId="449870039809-vernaus5vu13rmqga2rf6t9lpofm9nuf.apps.googleusercontent.com"
                      onSuccess={(res) => {
                        this.responseGoogle(res);
                      }}
                      render={(renderProps) => (
                        <GoogleLoginButton
                          text={t('login_with_google')}
                          disabled={renderProps.disabled}
                          onClick={renderProps.onClick}
                        />
                      )}
                    />
                  </div>
                </div>


                <div className="row margin-top-10">
                  <div className="col-12">
                    <a
                      className="push-image-container typography-headline-2"
                      data-toggle="modal"
                      data-target="#video-popup"
                    >
                      {t('watch-video')}
                      {' '}
                      <i className="far fa-play-circle" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="video-modal modal"
            id="video-popup"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="video-popup-label"
          >
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span className="color-white x-button" aria-hidden="true">&times;</span>
            </button>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-body">

                  <div className="video-container embed-responsive embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item"
                      width="1280"
                      height="720"
                      src="https://www.youtube.com/embed/ExzAb3t6DkI"
                      frameBorder="0"
                      allow="accelerometer; autoplay;"
                      scrolling="no"
                      allowFullScreen
                      title="video"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </header>

        <div id="ts-dynamic-waves" className="ts-background" data-bg-color="rgb(255,171,3)">
          <svg
            className="ts-svg ts-parallax-element"
            width="100%"
            height="100%"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs />
            <path
              className="ts-dynamic-wave"
              d=""
              data-wave-height=".6"
              data-wave-bones="4"
              data-wave-speed="0.15"
            />
          </svg>
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

        <HomeFeatures t={t} />
      </>
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
