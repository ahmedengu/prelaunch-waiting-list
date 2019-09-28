import React from 'react';
import PropTypes from 'prop-types';

const Share = ({ t }) => (
  <section className="fdb-block">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-10 col-sm-6 m-auto col-md-4 pb-4 pb-md-0">
          <img alt="chatting" className="img-fluid rounded-0" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs/draws/chatting.svg" />
        </div>
        <div className="col-12 ml-auto col-md-6 col-lg-5">
          <h1>{t('share-h1')}</h1>
          <p className="lead">
            {t('share-l2')}
          </p>
        </div>
      </div>
    </div>
  </section>
);

Share.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Share;
