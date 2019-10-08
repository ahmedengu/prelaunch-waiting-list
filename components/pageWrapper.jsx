import React from 'react';
import '../scss/main.scss';

import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';

const PageWrapper = ({
  t, children, lang,
}) => (
  <>
    <main>
      <Header t={t} />
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


export default PageWrapper;
