/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { Animated } from 'react-animated-css';
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
        <section className="fdb-block" data-block-type="contents" data-id="3">
          <div className="container">
            <div className="row">
              <div
                className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
              >
                <div className="embed-responsive embed-responsive-16by9 mb-2">
                  <iframe
                    title="video"
                    src={t('youtube-video')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>

              <div
                className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
              >
                <p>
                  <img
                    alt="Gift"
                    className="fdb-icon fr-fic fr-dii"
                    src={t('country-pic')}
                  />
                </p>
                <h1>{referral ? t('ref-header') : t('header')}</h1>
                <p className="lead">
                  {referral ? t('ref-description') : t('description')}
                </p>
                <form
                  className="input-group"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.register();
                  }}
                >
                  <input
                    dir="ltr"
                    type="search"
                    name="email"
                    style={{ backgroundImage: 'unset', paddingRight: '0.75rem' }}
                    className={`signup-input form-control ${error ? 'is-invalid' : ''}`}
                    placeholder={t('enter_email')}
                    value={email}
                    onChange={(event) => {
                      this.setState({
                        email: event.target.value,
                        error: '',
                      });
                    }}
                  />
                  <div className="input-group-append">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value={t('submit')}
                      disabled={loading}
                    />
                  </div>
                </form>

                <Animated
                  animationIn="fadeIn"
                  animationInDuration={3000}
                  animationOutDuration={3000}
                  animationOut="fadeOut"
                  isVisible={error !== ''}
                >
                  <p className="text-danger" style={{ marginTop: 10 }}>{t(error)}</p>
                </Animated>

                <div className="row justify-content-center">
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
              </div>
            </div>
          </div>
        </section>
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
