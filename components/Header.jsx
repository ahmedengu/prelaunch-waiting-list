import React from 'react';
import PropTypes from 'prop-types';
import '../static/app.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/froala-design-blocks/dist/css/froala_blocks.css';
import { connect } from 'react-redux';
import Link from 'next/link';

import Head from 'next/head';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { i18n } from '../i18n';

const changeLang = () => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
const Header = ({
  t, title, country, meta, user,
}) => (
  <>
    <Head>
      <title>{title || `${t('merquant')} - ${t(country)}`}</title>
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
                hidden={user && user.country !== 'egypt'}
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
                hidden={user && user.country !== 'emirates'}
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
                hidden={user && user.country !== 'saudi'}
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
                onClick={changeLang}
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
};

const mapStateToProps = (state) => ({
  user: state.user,
  title: state.title,
  country: state.country,
  meta: state.meta,
});

export default connect(mapStateToProps)(Header);
