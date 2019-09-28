import React from 'react';
import PropTypes from 'prop-types';
import '../static/app.css';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap.css';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';
import '../node_modules/froala-design-blocks/dist/css/froala_blocks.css';
import '../node_modules/animate.css/animate.css';

import { connect } from 'react-redux';
import PageWrapper from './pageWrapper';
import Signup from './signup';
import LoggedIn from './loggedIn';

const HomePage = ({
  t, user,
}) => (
  <PageWrapper t={t}>
    {user ? <LoggedIn t={t} /> : <Signup t={t} />}
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
