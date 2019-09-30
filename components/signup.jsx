import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import Router from 'next/router';
import * as qs from 'qs';
import { i18n } from '../i18n';
import { setUser } from '../store';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
    };
  }

  async register() {
    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email)
        .toLowerCase());
    };

    let { email } = this.state;
    if (!email || !validateEmail(email)) {
      this.setState({ error: 'invalid-email' });
      return;
    }
    this.setState({
      loading: true,
      error: '',
    });
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
      const { country } = this.props;
      const { query: { ref } } = Router;

      const user = new Parse.User();
      user.set('username', email);
      user.set('password', email);
      user.set('email', email);
      user.set('country', country);
      user.set('lang', i18n.language);
      user.set('referred', ref);

      try {
        await user.signUp();
        this.loggedIn(user);
      } catch (error) {
        this.setState({ error: error.message });
      }
    }
    this.setState({ loading: false });
  }

  loggedIn(user) {
    const { setUserHandler } = this.props;
    const { query, pathname } = Router;
    const userJson = user && user.toJSON();
    setUserHandler(userJson);
    cookie.set('user', userJson);

    query.ref = userJson.ref;

    Router.push(pathname, `${pathname}?${qs.stringify(query)}`);
  }

  componentDidMount() {
    const { query: { email } } = Router;
    if (email) {
      this.setState({ email: decodeURIComponent(email) }, this.register);
    }
  }

  render() {
    const { t } = this.props;
    const { email, loading, error } = this.state;

    return (
      <section className="fdb-block" data-block-type="contents" data-id="3">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-10 col-sm-6 col-md-5 col-lg-4 m-auto pb-5 pb-md-0"
              style={{ zIndex: 10000 }}
            >
              <p>
                <img
                  alt="App"
                  className="img-fluid rounded-0 fr-fic fr-dii"
                  src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//draws/iphone-hand.svg"
                />
              </p>
            </div>

            <div
              className="col-12 ml-md-auto col-md-7 col-lg-6 pb-5 pb-md-0"
              style={{ zIndex: 10000 }}
            >
              <p>
                <img
                  alt="Gift"
                  className="fdb-icon fr-fic fr-dii"
                  src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/gift.svg"
                />
              </p>
              <h1>{t('header')}</h1>
              <p className="lead">
                {t('description')}
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
                <p className="text-danger" style={{ marginTop: 10 }}>{error}</p>
              </Animated>

            </div>
          </div>
        </div>
      </section>
    );
  }
}

Signup.propTypes = {
  t: PropTypes.func.isRequired,
  setUserHandler: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  country: state.country,
});

const mapDispatchToProps = {
  setUserHandler: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
