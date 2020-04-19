import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { domain } from '../constants';

const CustomHead = (props) => {
  const {
    t, user, referral, router: { asPath, query: { ref } }, lang,
  } = props;
  const queryString = asPath.includes('ref') ? `?ref=${ref || referral}` : '';
  const shareUrl = `${domain}${asPath.includes(lang)
    ? ''
    : `/${lang}`}${asPath.split('?')[0]}${queryString}`;
  const prefix = referral && Object.keys(user).length === 0 ? 'ref-' : '';

  return (
    <Head>
      <title>{t(`${prefix}title`)}</title>
      <meta name="title" content={t(`${prefix}title`)} />
      <meta
        name="description"
        content={t(`${prefix}meta-description`)}
      />
      <meta
        name="keywords"
        content={t(`${prefix}keywords`)}
      />

      <meta property="og:url" content={shareUrl} />
      <meta property="fb:app_id" content="403863870540210" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={t(`${prefix}title`)} />
      <meta property="og:image:alt" content={t(`${prefix}title`)} />
      <meta
        property="og:description"
        content={t(`${prefix}meta-description`)}
      />
      <meta
        property="og:image"
        content={t(`${prefix}og-image`)}
      />

      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={t(`${prefix}title`)} />
      <meta
        property="twitter:description"
        content={t(`${prefix}meta-description`)}
      />
      <meta
        property="twitter:image"
        content={t(`${prefix}og-image`)}
      />
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
      />

      <meta name="twitter:site" content="@MerQuant" />
      <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
      <meta name="p:domain_verify" content="66ba3f2dcd70025dba6f6497cf4b8f41" />
    </Head>
  );
};

CustomHead.defaultProps = { referral: '' };
CustomHead.propTypes = {
  t: PropTypes.func.isRequired,
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


export default connect(mapStateToProps)(withRouter(CustomHead));
