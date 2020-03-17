import React from 'react';
import '../scss/main.scss';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from './Footer';
import CustomHead from './CustomHead';
import BackToTop from './backToTop';

const PageWrapper = ({
  t, children, lang,
}) => (
  <>
    <CustomHead t={t} />
    <BackToTop />
    <main>
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
