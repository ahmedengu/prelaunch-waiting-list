import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Parse from 'parse';

import Head from 'next/head';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import cookie from 'js-cookie';
import { i18n } from '../i18n';

const changeLang = (user) => () => {
  const newLang = i18n.language === 'en' ? 'ar' : 'en';
  i18n.changeLanguage(newLang);
  if (user && user.objectId) {
    const newUser = { ...user };
    newUser.className = '_User';
    const current = Parse.User.fromJSON(newUser);
    current.set('lang', newLang);
    current.save();
  }
};

function normalHead(t) {
  return (
    <>
      <title>{t('title')}</title>
      <meta name="title" content={t('title')} />
      <meta
        name="description"
        content={t('description')}
      />
      <meta
        name="keywords"
        content={t('keywords')}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={t('url')} />
      <meta property="og:title" content={t('title')} />
      <meta
        property="og:description"
        content={t('description')}
      />
      <meta
        property="og:image"
        content={t('og-image')}
      />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={t('url')} />
      <meta property="twitter:title" content={t('title')} />
      <meta
        property="twitter:description"
        content={t('description')}
      />
      <meta
        property="twitter:image"
        content={t('og-image')}
      />
    </>
  );
}
function refHead(t) {
  return (
    <>
      <title>{t('ref-title')}</title>
      <meta name="title" content={t('ref-title')} />
      <meta
        name="description"
        content={t('ref-description')}
      />
      <meta
        name="keywords"
        content={t('ref-keywords')}
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={t('ref-url')} />
      <meta property="og:title" content={t('ref-title')} />
      <meta
        property="og:description"
        content={t('ref-description')}
      />
      <meta
        property="og:image"
        content={t('ref-og-image')}
      />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:url" content={t('ref-url')} />
      <meta property="twitter:title" content={t('ref-title')} />
      <meta
        property="twitter:description"
        content={t('ref-description')}
      />
      <meta
        property="twitter:image"
        content={t('ref-og-image')}
      />
    </>
  );
}

const Header = ({
  t, country, user,
}) => (
  <>
    <Head>
      {cookie.get('ref') && Object.keys(user).length === 0 ? refHead(t) : normalHead(t)}
      <meta name="twitter:site" content="@MerQuant" />
      <link rel="shortcut icon" type="image/png" href="../static/assets/favicon.ico" />
      <link href="https://fonts.googleapis.com/css?family=Signika&display=swap" rel="stylesheet" />
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
            className="col-4 col-md-2 text-right text-md-center order-lg-6"
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

          <div className="collapse navbar-collapse col-12 col-md-5 order-lg-1" id="navbarNav2">
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

          <ul className="navbar-nav justify-content-end col-sm-5 order-lg-12 d-none d-md-flex">
            <li className="nav-item">
              <a
                title="Facebook"
                className="nav-link"
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
                onClick={changeLang(user)}
              >
                {t('lang')}
              </button>
            </li>
          </ul>

        </nav>
      </div>
    </header>

  </>
);


Header.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  country: state.country,
});

export default connect(mapStateToProps)(Header);
