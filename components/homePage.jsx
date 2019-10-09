import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PageWrapper from './pageWrapper';
import Signup from './signup';
import LoggedIn from './loggedIn';

const HomePage = ({
  t, user, lang,
}) => (
  <PageWrapper t={t} lang={lang}>
    {user && user.objectId ? <LoggedIn t={t} /> : <Signup t={t} />}
  </PageWrapper>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  lang: state.lang,
});

export default connect(mapStateToProps)(HomePage);
