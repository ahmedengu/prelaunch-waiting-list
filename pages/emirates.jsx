import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { i18n, withTranslation } from '../i18n';

import HomePage from '../components/homePage';
import { setCountry } from '../store';

const Emirates = ({ t, lang }) => {
  useDispatch()(setCountry('emirates'));

  return (
    <HomePage t={t} lang={lang} />
  );
};

Emirates.getInitialProps = async ({ req }) => {
  const lang = (req ? req.language : i18n.language) || 'en';

  return {
    namespacesRequired: ['emirates'],
    lang,
  };
};

Emirates.propTypes = {
  t: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default withTranslation('emirates')(Emirates);
