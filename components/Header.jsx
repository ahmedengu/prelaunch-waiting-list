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
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
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
            <a href="#" className="navbar-brand">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50%"
                viewBox="0 0 1163 410"
                className="logo"
              >
                <path
                  className="cls-1"
                  d="M692,388c-0.584-.013-50.036.5-50,0-7.134-9.019-10.013-27.271-10-47,9.864,1.378,5.751-12.484,4-12-6.986-2.112-15.366-22.365-20-39H600c-19.827-38.832-74.8-48.671-103-57,28.713-1.1,64.255,3.207,84,9,4.318,1.267,12.1,5.282,23,14,2.24,1.791,6.826.679,7,0a64.928,64.928,0,0,1,27-36c-6.09,11.268-9.507,19.709-10,28-1.961,32.95,15.3,61.053,31,78,1.855,2,2.187.761,5,0,0.363-.1,1.7,5.915,3,6-18.09,7.937-17.5,16.849-12,38l27-1c3.4-16.7,14.612-26.851,30-48,15.83-21.757,25.081-52.036,21-66,0.158-4.263-6.334-4.334-10-8,0.667-.667-0.667-4.333,0-5,10.114,3.009,26.289,6.1,33,0,9.721,2.513,13.854,10.591,25,12,0-1,1-2,1-3-7.918-17.479-21.3-32.748-49-27-3.981-17.213-15.42-43.069-29-61-23.192-30.622-55.571-53.865-89-67-11.307-4.443-33.6-10.15-47-12-11.05-1.526-16.322-1.658-23-3,10.281-4.189,31.4-3.693,47-5,7.674-.643,11.727.256,17-4l-1-3c-34.482-24.74-59.345-21.287-87-20-11.463.534-27.634,0.837-40,6-57.491,24-107.461,55.825-157,87l-63,42c8.878-12.152,20.865-22.24,22-42l-1-2c-47.884,24.371-115.956,34.524-144,79-51.7,1.072-110.473,2.729-132-27-6.79-9.377-7.709-25.681-3-37,4.689-11.272,8.381-15.918,19-26,2.747-2.608-.59-3.374,0-7,0.8-4.94,8.227-14.449,11-17,4.213-3.876,16.226-8.206,33-7-2.156-2.582-.667-8.667-1-13l1,2c2.666,3.666,3.185,7.995,8,11,0.125,27.088-16.292,29.131-33.054,33.066-3.1.728-6.927-1.093-9.946-.066-2.668.907-4.544,4.609-7,6-19.717,37.531-1.766,55.1,25,58,20.127,2.178,74.914-13.62,96-22L417,47c8.559-4.092,35.769-17.193,61-29C498.9,8.222,518.419-1.071,525,0c9.91,1.613,19.217,6.525,29,11,13.532,6.189,27.23,12.709,38,19,53.908,31.49,99.849,66.091,135,116l28,48,7,19c2.757,2.518,5.242,3.482,8,6,4.909,4.482,10.091,10.518,15,15,6.737,13.474,12.262,28.524,19,42,4.263,8.525,9.738,15.476,14,24-16.218-4.038-29.867-13.227-40-22-5.827-5.045-8.362-9.348-15-14l-2,2c-3.218,2.439-4.458,4.662-5,10,7.529,19.957,19.259,34.626,29,52-9.5-2.51-22.112-6.974-30-13-4.076-3.113-6.6-7.178-11-10l-3,1c-2.729,6.575-3.777,9.735-8,15-5.051,6.3-11.154,13.715-17,20C703.957,353.948,692.719,366.784,692,388ZM506,253c80.36-5.35,98.981,94.224,38,124l4,4c3.366,7.707,9.577,15.862,9,23-2.614,7.446-10.411,6.636-13,5-2.345-1.482-3.87-8.184-7-14-2.876-5.343-8.056-10.75-15-11-31.013-1.118-31.925-4.6-43-10-2.572-1.254-11.152-4.573-23-25-11.942-20.59-10.733-51,6-71C469.467,269.074,478.246,258.742,506,253ZM89,256c2.672,2.775,16.05,22.883,22,33,10.84,18.431,24.3,46.143,29,49h1q24-41,48-82c11.406-3.362,10.012,3.365,13,5,0.281,42.173,0,75.671,0,116-10.022,10.389-12.139,2.094-16,0-0.333-28.331.333-54.669,0-83l-3,2c-2.129,6.678-10.815,19.543-20,35-6.093,10.254-12.311,21.757-18,29-2.628,3.346-8.455,1.451-11,1-13.665-22.331-26-46-41-68,0.115,8.631-.375,26.31,0,41,0.321,12.576.713,26.862,0,36-0.447,5.736.725,6.036-1,9-0.667.333-3.333,2.667-4,3-1.666-.333-5.334-0.667-7-1-2-1.667-2-3.333-4-5-0.144-11.207.111-30.581,0-52-0.066-12.7-.566-15.22.132-40.529C77.451,271.938,72.934,250.122,89,256Zm148,15v39c21.331,0.333,40.669-.333,62,0,11.844,7.227,1.327,15.909,1,16-14.29-.165-14.263.108-25,0-13.707-.138-28.719.134-38,0v40c15.72,0.132,68.266-.385,72,1,3.8,1.409,8.985,6.983,2,14-3.573,1.22-49.738,1.1-81,1-3.33-.01-6.4-3.129-8-4-1.859-9.792-1.23-34.046-1.263-59.967-0.028-21.515.213-55.141,0.3-56.491A6.327,6.327,0,0,1,225,256c11.067-1.4,76.957-1.473,83,0-0.12,0,10.114,6.313-1,15C283,271.333,261,270.667,237,271Zm114,1c-0.333,35.663.333,69.337,0,105-5.352,6.166-9.136,5.9-15,2-1.242-6.353-1.094-28.884-1-53,0.124-31.944.254-66.348,0-66,1.859-1.2,2.216-3.8,6-4,6.63-.348,45.661,0,52,0,15.741,0,33.873,12.571,36,33,1.305,12.538,2,33.793-20,44,8.009,6.655,21.5,31.052,20,43,0,0-5.407,12.185-14,2-5.785-12.051-3.309-23.444-23-37-0.772-.532-6.19-1.929-19-2-0.292.057-9.492-8.126,0-14,5.8-5.336,38.849,4.606,41-27,1.226-20.829-14.759-29.382-34-26C379.613,272.068,351.424,272.061,351,272Zm499-14c6.354-5.623,9.333-2.333,11-2,5.28,7.835,47.746,101.423,54,118-2.153,6.168-2.667,4.667-4,7-2,0-7.587.523-10-1-5.953-11.3-10.735-22.278-13-28-40.676-9.576-66.676,16.741-80,29-8.942,1.2-9.627-1.455-11-3,1.415-11.374,7.822-22.848,12-32C823.246,314.794,834.366,290.964,850,258Zm95-2c9.843,8.735,80.4,95.576,81,96,0.33-31-.33-61,0-92,4.2-5.87,12.51-7,16,2-0.04.5-.17,113.725,0,114-0.75,1.783-5.48,9.8-13,4-6.85-5.285-67.941-83.046-79-94-0.2,1.154-.009,90.091,0,90-4.643,6.218-9.374,9.278-16,1-0.147-35.708.2-116.971,0-117C936.467,254.142,944.713,256.349,945,256Zm175,15c0.42,23.458-.25,105.05,0,105-8.94,11.521-15.96.58-16,0V271c-0.05-.211-38.18-0.227-38,0-10.75-6.55-2.35-14.9,1-16,0.53,0.547,89.73.06,90,0,11.83,7.041,3.89,13.909,1,16C1144.67,271.333,1133.33,270.667,1120,271Zm-613-2a68.805,68.805,0,0,0-21,8c-9.684,5.321-17.441,17.035-20,26-7.271,25.472,7.469,46.333,15,52,1.608,1.21,6.473,6.327,12,9,4.349,2.1,12.717,3.7,18,4,3.384,0.191,6.533.6,10,0C582.878,357.225,577.949,264.638,507,269Zm349,13c-10.638,24.416-22.6,47.634-30,66,11.7-6.067,23.207-12.577,55-12C872.652,319.026,863.9,297.186,856,282Z"
                />
              </svg>
            </a>
            {' '}
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
                  {t('home')}
                </a>
                <a className="nav-item nav-link ts-scroll" href="#what-is-merquant">{t('about')}</a>
                <a
                  target="_blank"
                  rel="dofollow"
                  className="nav-item nav-link ts-scroll"
                  href="https://blog.merquant.com"
                >
                  {t('blog')}
                </a>
                <div className="btn-group nav-item nav-link ts-scroll">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {t('current-lang')}
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button" onClick={this.changeLang(user)}>{t('lang')}</button>
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
