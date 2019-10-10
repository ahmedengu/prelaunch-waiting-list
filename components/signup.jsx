/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import Router from 'next/router';
import * as qs from 'qs';
import { toast } from 'react-toastify';
import { setUser } from '../store';
import HomeFeatures from './homeFeatures';

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

  async register(notMounted = false) {
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
    if (email.includes('gmail')) {
      email = `${atSplit[0].split('+')[0].replace('.', '')}@${atSplit[1]}`;
    }
    try {
      const user = await Parse.User.logIn(email, email);
      this.loggedIn(user);
    } catch (e) {
      const { country, lang, referral } = this.props;

      const user = new Parse.User();
      user.set('username', email);
      user.set('password', email);
      user.set('email', email);
      user.set('country', country);
      user.set('lang', lang);
      user.set('referred', referral);

      try {
        await user.signUp();
        this.loggedIn(user, true);
      } catch (error) {
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

  loggedIn(user, isNew = false) {
    const { setUserHandler, lang, t } = this.props;
    const { query, pathname } = Router;
    const userJson = user && user.toJSON();
    setUserHandler(userJson);
    cookie.set('user', userJson);

    query.ref = userJson.ref;

    Router.push(pathname, `/${lang}${pathname}?${qs.stringify(query)}`);
    toast(t(isNew ? 'welcome' : 'welcome-back'));
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
            <div className="row align-items-center">
              <div
                className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
              >
                <div className="embed-responsive embed-responsive-16by9 m-2">
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
                    type="email"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
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
};

const mapStateToProps = (state) => ({
  country: state.country,
  referral: state.referral,
  lang: state.lang,
});

const mapDispatchToProps = {
  setUserHandler: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
