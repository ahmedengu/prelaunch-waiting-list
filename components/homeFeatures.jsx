import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from '@u-wave/react-youtube';
import ContactForm from './ContactForm';
import FaqQuestionCard from './faqQuestionCard';
import BlogSection from './blogSection';

const backToSignup = () => {
  window.$('html').animate({
    scrollTop: 0,
  }, 1000, 'linear', () => {
    window.$('#email-subscribe').focus();
  });
};

class HomeFeatures extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.video = {};
  }

  componentDidUpdate(prevProps) {
    const { playVideo } = this.props;
    if (!prevProps.playVideo && playVideo && this.video && typeof this.video.playVideo === 'function') {
      this.video.playVideo();
    }
  }

  renderFaqList = (index = 1, list = []) => {
    const { t } = this.props;
    const key = `faq-q-${index}`;
    if (t(key) === key) {
      return list.map((({ faq, key: id }) => (
        <FaqQuestionCard key={id} id={id} faq={faq} />
      )));
    }
    const faq = {
      q: t(`faq-q-${index}`),
      a: t(`faq-a-${index}`),
    };
    return this.renderFaqList(index + 1, [...list, { key, faq }]);
  }

  renderFaqSection = () => {
    const { t } = this.props;
    return (
      <section id="faq" className="faq ts-block text-center">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ts-title text-center">
              <h2 className="faq-heading typography-head">{t('faq-section-title')}</h2>
            </div>
            <div className="col-md-6 d-md-block d-none faq-side-img">
              <div className="image">
                <img src={t('faq-img')} className="opacity-hover mw-100" alt="" />
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div className="faq-wrapper">
                <div className="faq-group">
                  {this.renderFaqList()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  render() {
    const { t } = this.props;
    const FaqSection = this.renderFaqSection;
    return (
      <>
        <section
          id="what-is-merquant"
          className="text-center ts-block"
          data-bg-size="inherit"
        >
          <div className="container">
            <div className="ts-title">
              <h2 className="typography-head">{t('header-3')}</h2>
              <h5 className="typography-sub mt-3">
                {t('sub-2')}
              </h5>
            </div>
            <div className="embed-responsive embed-responsive-16by9">
              <YouTube
                showRelatedVideos={false}
                id="merquant-video"
                onReady={(vid) => {
                  this.video = vid.target;
                }}
                video={(t('youtube-video') || '').replace('https://www.youtube.com/embed/', '')}
              />
            </div>
          </div>
        </section>

        <section id="features" className="ts-block">
          <div className="container">
            <div className="row flex-row-reverse align-items-center">
              <div className="col-md-6 col-xl-6" data-animate="ts-fadeInUp" data-offset="100">
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
                  <li>
                    <a
                      target="_blank"
                      href={t('read-more-url')}
                      className="ts-font-color__black"
                      role="button"
                    >
                      <h6 className="my-2">{t('read-more')}</h6>
                    </a>
                  </li>
                </ul>

              </div>
              <div
                className="col-md-6 col-xl-6 text-center"
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
                    <i className="stroke-transparent fas fa-lightbulb" />
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
                    alt="Commission Free Trading"
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
        <BlogSection t={t} />
        <FaqSection />
        <section id="bottomSignup" className="ts-block ts-shape-mask__up ts-shape-mask__down">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="ts-promo-number text-center">
                  <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '-12px',
                  }}
                  >
                    {t('start_with_merquant')}
                  </h1>
                  <h1 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '3rem' }}>
                    {t(
                      'free-signup',
                    )}
                  </h1>
                  <button
                    type="button"
                    onClick={backToSignup}
                    className="btn btn-lg btn-outline-dark mb-5"
                  >
                    {t('early-access')}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
        <section id="numbers" className="ts-block ts-separate-bg-element pb-0">
          <div className="container">
            <div className="ts-promo-numbers">
              <div className="row">
                <div className="col-sm-4">
                  <div className="ts-promo-number text-center">
                    <h2 data-animate="ts-zoomIn" className="typography-head">3000+</h2>
                    <h3 className="mb-0 ts-opacity__50">{t('clients')}</h3>
                    <span className="ts-promo-number-divider" />
                  </div>

                </div>

                <div className="col-sm-4">
                  <div className="ts-promo-number text-center">
                    <h2
                      className="typography-head"
                      data-animate="ts-zoomIn"
                      data-delay="0.2s"
                    >
0
                    </h2>
                    <h3 className="mb-0 ts-opacity__50">{t('commission')}</h3>
                    <span className="ts-promo-number-divider" />
                  </div>

                </div>

                <div className="col-sm-4">
                  <div className="ts-promo-number text-center">
                    <h2
                      className="typography-head"
                      data-animate="ts-zoomIn"
                      data-delay="0.2s"
                    >
0
                    </h2>
                    <h3 className="mb-0 ts-opacity__50">{t('minimums')}</h3>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="ts-separate-bg-element mb-0 pt-10"
        >
          <div className="container contact">
            <div className="ts-box mb-0 p-5 ts-mt__n-10">
              <div className="row" style={{ direction: 'ltr', flexDirection: 'row-reverse' }}>
                <div className="col-md-8">
                  <ContactForm t={t} />
                </div>
                <div className="col-md-4">
                  <h3>{t('follow-us')}</h3>
                  <address className="text-left">
                    <figure>
                      <div className="font-weight-bold">
                        <i className="fa fa-envelope" />
                        {' '}
                        Email:
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
                        <i className="fab fa-blogger" />
                        {' '}
                        Blog:
                      </div>
                      <a
                        target="_blank"
                        rel="dofollow"
                        href="https://blog.merquant.com"
                      >
                        blog.merquant.com
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
                        facebook.com/merquant
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
                        twitter.com/merquant
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
                        href="https://www.instagram.com/merquant"
                      >
                        instagram.com/merquant
                      </a>
                    </figure>
                    <figure>
                      <div className="font-weight-bold">
                        <i className="fab fa-linkedin" />
                        {' '}
                        Linkedin:
                      </div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/merquant"
                      >
                        linkedin.com/company/merquant
                      </a>
                    </figure>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

HomeFeatures.propTypes = {
  t: PropTypes.func.isRequired,
  setPlay: PropTypes.func.isRequired,
  playVideo: PropTypes.bool.isRequired,
};


export default HomeFeatures;
