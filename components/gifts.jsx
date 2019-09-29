import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';

const Gifts = ({ t, user }) => (
  <section className="fdb-block" data-block-type="features" data-id="8">
    <div className="container">
      <div className="row text-center">
        <div className="col-12" style={{ zIndex: 10000 }}><h1>{t('gifts-h1')}</h1></div>
      </div>
      <div className="m-4">
        <ProgressBar percent={(user.referrals || 0) * 2} stepPositions={[0, 10, 25, 50, 100]}>
          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              />
            )}
          </Step>

          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              >
                5
              </div>
            )}
          </Step>

          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              >
                10
              </div>
            )}
          </Step>

          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              >
                25
              </div>
            )}
          </Step>

          <Step>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? 'accomplished' : null}`}
              >
                50
              </div>
            )}
          </Step>
        </ProgressBar>

      </div>
      <div className="row text-center justify-content-center mt-5">
        <div className="col-12 col-sm-6 col-lg-2" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="monitor"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/monitor.svg"
            />
          </p>
          <h3><strong>{t('gift1-h')}</strong></h3>
          <p>
            {t('gift1-p')}
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-2" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="map-pin"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/map-pin.svg"
            />
          </p>
          <h3><strong>{t('gift2-h')}</strong></h3>
          <p>
            {t('gift2-p')}
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-2" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="life-buoy"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/life-buoy.svg"
            />
          </p>
          <h3><strong>{t('gift3-h')}</strong></h3>
          <p>
            {t('gift3-p')}
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-2" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="package"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/package.svg"
            />
          </p>
          <h3><strong>{t('gift4-h')}</strong></h3>
          <p>
            {t('gift4-p')}
          </p>
        </div>
      </div>
    </div>
  </section>
);

Gifts.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Gifts);
