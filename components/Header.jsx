import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Parse from 'parse';

import Head from 'next/head';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { withRouter } from 'next/router';
import { i18n, Link } from '../i18n';
import { setLang } from '../store';
import { domain } from '../constants';

class Header extends Component {
  changeLang = (user) => () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
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

  normalHead = (t, shareUrl) => (
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

      <meta property="og:url" content={shareUrl} />
      <meta property="fb:app_id" content="403863870540210" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('title')} />
      <meta property="og:image:alt" content={t('title')} />
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

  refHead = (t, shareUrl) => (
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

      <meta property="og:url" content={shareUrl} />
      <meta property="fb:app_id" content="403863870540210" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t('ref-title')} />
      <meta property="og:image:alt" content={t('ref-title')} />
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
      t, country, user, referral, router: { asPath, query: { ref } }, lang,
    } = this.props;
    const queryString = asPath.includes('ref') ? `?ref=${ref || referral}` : '';
    const shareUrl = `${domain}${asPath.includes(lang) ? '' : `/${lang}`}${asPath.split('?')[0]}${queryString}`;

    return (
      <>
        <Head>
          {referral && Object.keys(user).length === 0
            ? this.refHead(t, shareUrl) : this.normalHead(t, shareUrl)}
          <meta name="twitter:site" content="@MerQuant" />
          <link rel="shortcut icon" type="image/png" href="/static/assets/favicon.ico" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/static/assets/bootstrap/css/bootstrap.min.css" type="text/css" />
          <link rel="stylesheet" href="/static/assets/font-awesome/css/fontawesome-all.min.css" />
          <link rel="stylesheet" href="/static/assets/css/style.css" />
          <link rel="stylesheet" href="/static/assets/css/owl.carousel.min.css" />

        </Head>
        <nav
          className="navbar navbar-expand-lg navbar-dark fixed-top ts-separate-bg-element"
          data-bg-color="rgb(31,31,31)"
        >
          <div className="container">
            <a className="navbar-brand" href="#page-top">
              <img className="logo img-responsive" src="/static/assets/img/image2vector.svg" alt="" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <a className="nav-item nav-link active ts-scroll" href="#page-top">
Home
                  <span
                    className="sr-only"
                  >
(current)
                  </span>
                </a>
                <a className="nav-item nav-link ts-scroll" href="#what-is-merquant">About</a>
                <a
                  target="_blank"
                  rel="dofollow"
                  className="nav-item nav-link ts-scroll"
                  href="http://blog.merquant.com"
                >
Blog
                </a>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    English
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">Arabic</button>
                    <button className="dropdown-item" type="button">Hausa</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

Header.defaultProps = { referral: '' };
Header.propTypes = {
  t: PropTypes.func.isRequired,
  setLangHandler: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  country: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  referral: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.user,
  country: state.country,
  referral: state.referral,
  lang: state.lang,
});

const mapDispatchToProps = {
  setLangHandler: setLang,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
