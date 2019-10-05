import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { i18n, withTranslation } from '../i18n';

import HomePage from '../components/homePage';
import { setCountry } from '../store';

const Saudi = ({ t, lang }) => {
  useDispatch()(setCountry('saudi'));

  return (
    <HomePage t={t} lang={lang} />
  );
};

Saudi.getInitialProps = async ({ req }) => {
  const lang = (req ? req.language : i18n.language) || 'en';

  return {
    namespacesRequired: ['common', 'saudi'],
    lang,
  };
};

Saudi.propTypes = {
  t: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default withTranslation('saudi')(Saudi);
