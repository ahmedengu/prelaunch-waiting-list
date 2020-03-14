import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from './ContactForm';

const HomeFeatures = ({ t }) => (
  <>
    <section
      id="how-it-works"
      className="text-center ts-block"
      data-bg-size="inherit"
    >
      <div className="container">
        <div className="ts-title">
          <h2 className="typography-head">{t('header-2')}</h2>
          <h5 className="typography-sub mt-3">
            {t('sub-2')}
          </h5>
        </div>
        <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">

          <li className="nav-item">
            <a
              className="nav-link"
              id="mobile-tab"
              data-toggle="tab"
              href="#mobile"
              role="tab"
              aria-controls="mobile"
              aria-selected="false"
            >
              <h4 className="typography-sub">{t('sub-2-1')}</h4>
            </a>
          </li>
        </ul>

        <div
          className="tab-content pt-sm-2 pt-lg-2 ts-tabs-presentation"
          id="myTabContent"
          data-animate="ts-fadeInUp"
        >
          <div
            className="tab-pane fade show active"
            id="mobile"
            role="tabpanel"
            aria-labelledby="mobile"
          >
            <img src={t('img-phone1')} className="mw-25" alt="" />
          </div>
        </div>

      </div>
    </section>

    <section id="what-is-merquant" className="ts-block">
      <div className="container">
        <div className="ts-title">
          <h2 className="typography-head width-70">{t('header-3')}</h2>
        </div>

        <div className="row">
          <div
            className="col-md-7 col-xl-7 mt-lg-3 mt-sm-3"
            data-animate="ts-fadeInUp"
            data-offset="100"
          >
            <p className="typography-body">
              {t('sub-3')}
            </p>
            <a
              rel="dofollow"
              target="_blank"
              href={t('read-more-url')}
              className="btn btn-primary mb-4 ts-scroll"
            >
              {t('read-more')}
            </a>
          </div>

          <div
            className="col-md-5 col-xl-5 text-center"
            data-animate="ts-fadeInUp"
            data-delay="0.1s"
            data-offset="100"
          >
            <div className="px-3">
              <div className="badge" style={{ backgroundImage: `url(${t('img-whatis')})` }}>
                <div className="text">{t('commission-free')}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="features" className="ts-block">
      <div className="container">
        <div className="row flex-row-reverse">
          <div className="col-md-5 col-xl-5" data-animate="ts-fadeInUp" data-offset="100">
            <div className="ts-title">
              <h2 className="typography-head">{t('header-4')}</h2>
            </div>

            <p className="typography-body">
              {t('sub-4')}
            </p>

            <ul className="list-unstyled ts-list-divided">
              <li>
                <a
                  href="#feature-1"
                  className="ts-font-color__black"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="feature-1"
                >
                  <h6 className="my-2">{t('sub-4-1')}</h6>
                </a>
                <div className="collapse" id="feature-1">
                  <p className="typography-caption">
                    {t('sub-4-1-1')}
                  </p>
                </div>

              </li>
              <li>
                <a
                  href="#feature-2"
                  className="ts-font-color__black"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="feature-2"
                >
                  <h6 className="my-2">{t('sub-4-2')}</h6>
                </a>
                <div className="collapse" id="feature-2">
                  <p className="typography-caption">
                    {t('sub-4-2-1')}
                  </p>
                </div>

              </li>
              <li>
                <a
                  href="#feature-3"
                  className="ts-font-color__black"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="feature-3"
                >
                  <h6 className="my-2">{t('sub-4-3')}</h6>
                </a>
                <div className="collapse" id="feature-3">
                  <p className="typography-caption">
                    {t('sub-4-3-1')}
                  </p>
                </div>

              </li>
            </ul>

          </div>
          <div className="col-md-7 col-xl-7 text-center">
            <div className="position-relative">
              <div
                className="col-md-12 col-xl-12 text-center"
                data-animate="ts-fadeInUp"
                data-delay="0.1s"
                data-offset="100"
              >
                <div className="px-3">
                  <img
                    src={t('img-features')}
                    className="mw-100 ts-shadow__lg ts-border-radius__md"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="organize" className="ts-block">
      <div className="container">
        <div className="ts-title text-center">
          <h2 className="typography-head">{t('header-5')}</h2>
        </div>

        <div className="row align-items-center">
          <div className="col-md-4">
            <figure
              className="text-right ts-xs-text-center"
              data-animate="ts-fadeInUp"
              data-delay=".1s"
            >
              <span style={{ fontSize: '3em' }}>
                <i className="stroke-transparent fas fa-lightbulb-o" />
              </span>
              <h4 className="mb-2">{t('sub-5-2')}</h4>
              <p className="typography-body">
                {t('sub-5-2-1')}
              </p>
            </figure>
            <figure
              className="text-right ts-xs-text-center"
              data-animate="ts-fadeInUp"
              data-delay=".3s"
            >
              <span style={{ fontSize: '3em' }}>
                <i className="stroke-transparent fas fa-bolt" />
              </span>
              <h4 className="mb-2">{t('sub-5-4')}</h4>
              <p className="typography-body">
                {t('sub-5-4-1')}
              </p>
            </figure>
          </div>

          <div className="col-md-4 my-5 d-flex justify-content-center align-items-center">
            <div className="image position-relative">
              <img
                src={t('img-phone2')}
                className="mw-100"
                alt=""
                data-animate="ts-zoomInShort"
                data-delay=".1s"
              />
              <aside
                className="ts-svg ts-svg__organic-shape-01 ts-background-size-contain"
                data-animate="ts-zoomInShort"
                data-delay=".4s"
              />
            </div>
          </div>

          <div className="col-md-4">
            <figure className="ts-xs-text-center" data-animate="ts-fadeInUp" data-delay=".1s">
              <span style={{ fontSize: '3em' }}>
                <i className=" stroke-transparent fas fa-filter" />
              </span>
              <h4 className="mb-2">{t('sub-5-1')}</h4>
              <p className="typography-body">
                {t('sub-5-1-1')}
              </p>
            </figure>
            <figure className="ts-xs-text-center" data-animate="ts-fadeInUp" data-delay=".3s">
              <span style={{ fontSize: '3em' }}>
                <i className="stroke-transparent fas fa-magic" />
              </span>
              <h4 className="mb-2">{t('sub-5-3')}</h4>
              <p className="typography-body">
                {t('sub-5-3-1')}
              </p>
            </figure>
          </div>

        </div>
      </div>
    </section>

    <section id="bottomSignup" className="ts-block ts-separate-bg-element">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="ts-promo-number text-center">
              <h1 style={{ fontSize: '2.5rem', marginBottom: '-12px' }}>Start Investment with MerQuant</h1>
              <h1 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '3rem' }}>Sign Up, it's free!</h1>
              {/* eslint-disable-next-line react/button-has-type */}
              <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="signupBottom">Get Early Access</button>
            </div>
          </div>

        </div>
      </div>
    </section>
    <section id="numbers" className="ts-block ts-separate-bg-element">
      <div className="container">
        <div className="ts-promo-numbers">
          <div className="row">
            <div className="col-sm-4">
              <div className="ts-promo-number text-center">
                <h2 data-animate="ts-zoomIn" className="typography-head">2000+</h2>
                <h3 className="mb-0 ts-opacity__50">{t('clients')}</h3>
                <span className="ts-promo-number-divider" />
              </div>

            </div>

            <div className="col-sm-4">
              <div className="ts-promo-number text-center">
                <h2 className="typography-head" data-animate="ts-zoomIn" data-delay="0.2s">0</h2>
                <h3 className="mb-0 ts-opacity__50">{t('commission')}</h3>
                <span className="ts-promo-number-divider" />
              </div>

            </div>

            <div className="col-sm-4">
              <div className="ts-promo-number text-center">
                <h2 className="typography-head" data-animate="ts-zoomIn" data-delay="0.2s">0</h2>
                <h3 className="mb-0 ts-opacity__50">{t('minimums')}</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <section
      id="contact"
      style={{ margin: 0 }}
      className="ts-separate-bg-element"
    >
      <div className="container contact">
        <div className="ts-box mb-0 p-5 ts-mt__n-10">
          <div className="row">
            <div className="col-md-4">
              <h3>{t('contact-us')}</h3>
              <address>
                <figure>
                  <div className="font-weight-bold">
                    {t('signup-email')}
                    :
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="mailto:support@merquant.com"
                  >
                    support@merquant.com
                  </a>
                </figure>
                <figure>
                  <div className="font-weight-bold">
                    <i className="fab fa-facebook" />
                    {' '}
                    Facebook:
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.facebook.com/merquant"
                  >
                    facebook.com/MerQuant
                  </a>
                </figure>
                <figure>
                  <div className="font-weight-bold">
                    <i className="fab fa-twitter" />
                    {' '}
                    Twitter:
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://twitter.com/merquant"
                  >
                    twitter.com/MerQuant
                  </a>
                </figure>
                <figure>
                  <div className="font-weight-bold">
                    <i className="fab fa-instagram" />
                    {' '}
                    Instagram:
                  </div>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/merquant/"
                  >
                    instagram.com/MerQuant
                  </a>
                </figure>
              </address>
            </div>
            <div className="col-md-8">
              <ContactForm t={t} />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

HomeFeatures.propTypes = {
  t: PropTypes.func.isRequired,
};

export default HomeFeatures;
