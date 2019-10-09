import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withTranslation } from '../i18n';

import HomePage from '../components/homePage';
import { setCountry } from '../store';

const Emirates = ({ t }) => {
  useDispatch()(setCountry('emirates'));

  return (
    <HomePage t={t} />
  );
};

Emirates.getInitialProps = async () => ({
  namespacesRequired: ['emirates'],
});

Emirates.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('emirates')(Emirates);
