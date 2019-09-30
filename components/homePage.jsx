import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PageWrapper from './pageWrapper';
import Signup from './signup';
import LoggedIn from './loggedIn';

const HomePage = ({
  t, user,
}) => (
  <PageWrapper t={t}>
    {user && user.objectId ? <LoggedIn t={t} /> : <Signup t={t} />}
  </PageWrapper>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(HomePage);
