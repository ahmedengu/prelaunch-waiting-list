import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { setLang } from '../store';
import { domain } from '../constants';

class CustomHead extends Component {
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
      t, user, referral, router: { asPath, query: { ref } }, lang,
    } = this.props;
    const queryString = asPath.includes('ref') ? `?ref=${ref || referral}` : '';
    const shareUrl = `${domain}${asPath.includes(lang) ? '' : `/${lang}`}${asPath.split('?')[0]}${queryString}`;

    return (
      <Head>
        {this.normalHead(t, shareUrl)}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />

        <meta name="twitter:site" content="@MerQuant" />
        <link rel="shortcut icon" type="image/png" href="/static/assets/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:400,500,600" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Almarai&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/static/assets/bootstrap/css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="/static/assets/font-awesome/css/fontawesome-all.min.css" />
        <link rel="stylesheet" href="/static/assets/css/style.css" />
        <link rel="stylesheet" href="/static/assets/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/react-toastify@5.5.0/dist/ReactToastify.min.css" />
      </Head>
    );
  }
}

CustomHead.defaultProps = { referral: '' };
CustomHead.propTypes = {
  t: PropTypes.func.isRequired,
  setLangHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomHead));
