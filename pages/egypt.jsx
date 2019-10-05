import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { i18n, withTranslation } from '../i18n';

import HomePage from '../components/homePage';
import { setCountry } from '../store';

const Egypt = ({ t, lang }) => {
  useDispatch()(setCountry('egypt'));

  return (
    <HomePage t={t} lang={lang} />
  );
};

Egypt.getInitialProps = async ({ req }) => {
  const lang = (req ? req.language : i18n.language) || 'en';

  return {
    namespacesRequired: ['common', 'egypt'],
    lang,
  };
};

Egypt.propTypes = {
  t: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default withTranslation('egypt')(Egypt);
