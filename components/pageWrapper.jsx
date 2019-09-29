import React from 'react';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap.css';
import '../node_modules/bootstrap-v4-rtl/dist/css/bootstrap-rtl.css';
import '../node_modules/froala-design-blocks/dist/css/froala_blocks.css';
import '../node_modules/animate.css/animate.css';
import '../static/app.css';

import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import { i18n } from '../i18n';

const PageWrapper = ({
  t, children,
}) => (
  <>
    <main>
      <Header t={t} />
      <div className={i18n.language === 'ar' ? 'rtl' : ''}>
        {children}
      </div>
    </main>
    <Footer t={t} />
  </>
);

PageWrapper.propTypes = {
  t: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};


export default PageWrapper;
