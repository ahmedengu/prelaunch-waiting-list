import React from 'react';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap.css';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';
import '../node_modules/froala-design-blocks/dist/css/froala_blocks.css';
import '../node_modules/animate.css/animate.css';
import '../static/app.css';

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
