import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withTranslation } from '../i18n';

import HomePage from '../components/homePage';
import { setCountry } from '../store';

const Egypt = ({ t }) => {
  useDispatch()(setCountry('egypt'));

  return (
    <HomePage t={t} />
  );
};


Egypt.getInitialProps = async () => ({
  namespacesRequired: ['common', 'egypt'],
});

Egypt.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('egypt')(Egypt);
