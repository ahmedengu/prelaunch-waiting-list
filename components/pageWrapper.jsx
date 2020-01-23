import React from 'react';
import '../scss/main.scss';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const PageWrapper = ({
  t, children, lang,
}) => (
  <>
    <main
      data-spy="scroll"
      data-target=".navbar"
      className="has-loading-screen"
      data-bg-parallax="scroll"
      data-bg-parallax-speed="3"
    >
      <div className={lang === 'ar' ? 'rtl' : ''}>
        {children}
      </div>
    </main>
    <Footer t={t} />
  </>
);

PageWrapper.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(PageWrapper);
