import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Parse from 'parse';

import Head from 'next/head';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { i18n } from '../i18n';
import { setLang } from '../store';

class Header extends Component {
  changeLang = (user) => () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);

    const { setLangHandler } = this.props;
    setLangHandler(newLang);

    if (user && user.objectId) {
      const newUser = { ...user };
      newUser.className = '_User';
      const current = Parse.User.fromJSON(newUser);
      current.set('lang', newLang);
      current.save();
    }
  };

  normalHead = (t) => (
    <>
      <title>{t('title')}</title>
      <meta name="title" content={t('title')} />
      <meta
        name="description"
        content={t('meta-description')}
      />
      <meta
        name="keywords"
        content={t('keywords')}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('title')} />
      <meta
        property="og:description"
        content={t('meta-description')}
      />
      <meta
        property="og:image"
        content={t('og-image')}
      />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={t('title')} />
      <meta
        property="twitter:description"
        content={t('meta-description')}
      />
      <meta
        property="twitter:image"
        content={t('og-image')}
      />
    </>
  );

  refHead = (t) => (
    <>
      <title>{t('ref-title')}</title>
      <meta name="title" content={t('ref-title')} />
      <meta
        name="description"
        content={t('ref-meta-description')}
      />
      <meta
        name="keywords"
        content={t('ref-keywords')}
      />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('ref-title')} />
      <meta
        property="og:description"
        content={t('ref-meta-description')}
      />
      <meta
        property="og:image"
        content={t('ref-og-image')}
      />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={t('ref-title')} />
      <meta
        property="twitter:description"
        content={t('ref-meta-description')}
      />
      <meta
        property="twitter:image"
        content={t('ref-og-image')}
      />
    </>
  );

  render() {
    const {
      t, country, user, referral,
    } = this.props;
    return (
      <>
        <Head>
          {referral && Object.keys(user).length === 0 ? this.refHead(t) : this.normalHead(t)}
          <meta name="twitter:site" content="@MerQuant" />
          <link rel="shortcut icon" type="image/png" href="../static/assets/favicon.ico" />
        </Head>
        <header data-block-type="headers" data-id="1">
          <div className="container">
            <nav className="navbar navbar-expand-md no-gutters">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav2"
                aria-controls="navbarNav2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="col-4 col-md-2 text-right text-md-center order-lg-6 d-lg-none mr-md-2 m-auto"
                style={{ zIndex: 10000 }}
              >
                <p>
                  <Link href={`/${country}`}>
                    <a>
                      <img
                        src="../static/assets/logo.png"
                        height="50"
                        alt="MerQuant"
                        className="fr-fic fr-dii"
                      />
                    </a>
                  </Link>
                </p>
              </div>

              <div className="collapse navbar-collapse" id="navbarNav2">
                <div
                  className="col-4 col-md-2 text-right text-md-center order-lg-6 d-none d-lg-block d-xl-block"
                  style={{ zIndex: 10000 }}
                >
                  <p>
                    <Link href={`/${country}`}>
                      <a>
                        <img
                          src="../static/assets/logo.png"
                          height="50"
                          alt="MerQuant"
                          className="fr-fic fr-dii"
                        />
                      </a>
                    </Link>
                  </p>
                </div>
                <div className="col-12 col-md-5 order-lg-1">
                  <ul className="navbar-nav col-5">
                    <li
                      className={`nav-item ${(country === 'egypt' ? 'active' : '')}`}
                      hidden={user && user.country && user.country !== 'egypt'}
                    >
                      <Link href="/egypt">
                        <a
                          className="nav-link"
                          style={{
                            outline: 'none',
                            display: 'inline-block',
                          }}
                        >
                          {t('Egypt')}
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${(country === 'emirates' ? 'active' : '')}`}
                      hidden={user && user.country && user.country !== 'emirates'}
                    >
                      <Link href="/emirates">
                        <a
                          className="nav-link"
                          style={{
                            outline: 'none',
                            display: 'inline-block',
                          }}
                        >
                          {t('Emirates')}
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`nav-item ${(country === 'saudi' ? 'active' : '')}`}
                      hidden={user && user.country && user.country !== 'saudi'}
                    >
                      <Link href="/saudi">
                        <a
                          className="nav-link"
                          style={{
                            outline: 'none',
                            display: 'inline-block',
                          }}
                        >
                          {t('Saudi')}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>

                <ul className="navbar-nav justify-content-end col-sm-5 order-lg-12 d-md-flex ml-2">
                  <li className="nav-item">
                    <a
                      title="Facebook"
                      className="nav-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/merquant"
                      style={{
                        outline: 'none',
                        display: 'inline-block',
                      }}
                    >
                      <FiFacebook />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      title="Twitter"
                      className="nav-link"
                      href="https://twitter.com/merquant"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        outline: 'none',
                        display: 'inline-block',
                      }}
                    >
                      <FiTwitter />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      title="Linkedin"
                      className="nav-link"
                      href="https://www.linkedin.com/company/merquant"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        outline: 'none',
                        display: 'inline-block',
                      }}
                    >
                      <FiLinkedin />
                    </a>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-primary ml-md-3"
                      onClick={this.changeLang(user)}
                    >
                      {t('lang')}
                    </button>
                  </li>
                </ul>
              </div>

            </nav>
          </div>
        </header>

      </>
    );
  }
}


Header.propTypes = {
  t: PropTypes.func.isRequired,
  setLangHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  referral: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  country: state.country,
  referral: state.referral,
});

const mapDispatchToProps = {
  setLangHandler: setLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
