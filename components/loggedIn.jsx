import React from 'react';
import PropTypes from 'prop-types';

import Share from './share';
import Gifts from './gifts';

const LoggedIn = ({ t }) => (
  <>
    <Share t={t} />
    <Gifts t={t} />
  </>
);

LoggedIn.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LoggedIn;
