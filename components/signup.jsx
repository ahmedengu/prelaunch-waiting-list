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
    const { t, country } = this.props;
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
              <img className="flag" src={`/static/assets/img/${route}.png`} alt="" />
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
                  {t('sub-1')}
                </h2>
                <form
                  className="ts-form ts-form-email ts-labels-inside-input"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.register();
                  }}
                >
                  <div className="row text-center align-items-baseline">
                    <div className="col-2">
                      <div className="dropdown m-0">
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          data-toggle="dropdown"
                        >
                          <img className="flag" src={`/static/assets/img/${country}.png`} alt="" />
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
