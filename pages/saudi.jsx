import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withTranslation } from '../i18n';

import HomePage from '../components/homePage';
import { setCountry } from '../store';

const Saudi = ({ t }) => {
  useDispatch()(setCountry('saudi'));

  return (
    <HomePage t={t} />
  );
};

Saudi.getInitialProps = async () => ({
  namespacesRequired: ['saudi'],
});

Saudi.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('saudi')(Saudi);
