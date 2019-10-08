import React from 'react';
import PropTypes from 'prop-types';

const HomeFeatures = ({ t }) => (
  <section className="fdb-block pt-0">
    <div className="container">
      <div className="row text-center">
        <div className="col-12">
          <h1>{t('features-title')}</h1>
        </div>
      </div>
      <div className="row text-left mt-5">
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-3">
              <img
                alt="image"
                className="fdb-icon"
                src={t('feature1-img')}
              />
            </div>
            <div className="col-9">
              <h3>{t('feature1-title')}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 pt-3 pt-sm-4 pt-md-0">
          <div className="row">
            <div className="col-3">
              <img
                alt="image"
                className="fdb-icon"
                src={t('feature2-img')}
              />
            </div>
            <div className="col-9">
              <h3>{t('feature2-title')}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 pt-3 pt-sm-4 pt-md-0">
          <div className="row">
            <div className="col-3">
              <img
                alt="image"
                className="fdb-icon"
                src={t('feature3-img')}
              />
            </div>
            <div className="col-9">
              <h3>{t('feature3-title')}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row text-left pt-3 pt-sm-4 pt-md-5">
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-3">
              <img
                alt="image"
                className="fdb-icon"
                src={t('feature4-img')}
              />
            </div>
            <div className="col-9">
              <h3>{t('feature4-title')}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 pt-3 pt-sm-4 pt-md-0">
          <div className="row">
            <div className="col-3">
              <img
                alt="image"
                className="fdb-icon"
                src={t('feature5-img')}
              />
            </div>
            <div className="col-9">
              <h3>{t('feature5-title')}</h3>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 pt-3 pt-sm-4 pt-md-0">
          <div className="row">
            <div className="col-3">
              <img
                alt="image"
                className="fdb-icon"
                src={t('feature6-img')}
              />
            </div>
            <div className="col-9">
              <h3>{t('feature6-title')}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

HomeFeatures.propTypes = {
  t: PropTypes.func.isRequired,
};

export default HomeFeatures;
