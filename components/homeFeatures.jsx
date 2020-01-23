import React from 'react';
import PropTypes from 'prop-types';

const HomeFeatures = ({ t }) => (
  <>
    <section
      id="how-it-looks"
      className="pb-0 ts-block text-center ts-overflow__hidden ts-shape-mask__down"
      data-bg-size="inherit"
    >
      <div className="container">
        <div className="ts-title">
          <h2>How It Works</h2>
          <h5>Experience trading in an easy and unique way with MerQuant</h5>
        </div>
        <ul className="nav nav-tabs justify-content-center my-5" id="myTab" role="tablist">

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
              <h4>Mobile</h4>
            </a>
          </li>
        </ul>

        <div
          className="tab-content pt-5 ts-tabs-presentation"
          id="myTabContent"
          data-animate="ts-fadeInUp"
        >
          <div
            className="tab-pane fade show active"
            id="mobile"
            role="tabpanel"
            aria-labelledby="mobile"
          >
            <img src="/static/assets/img/phone.png" className="mw-50" alt="" />
          </div>
        </div>

      </div>
    </section>

    <section id="what-is-merquant" className="ts-block">
      <div className="container">
        <div className="ts-title">
          <h2>What Is MerQuant?</h2>
        </div>

        <div className="row">
          <div className="col-md-5 col-xl-5" data-animate="ts-fadeInUp" data-offset="100">
            <p>
              MerQuant is the first commission-free brokerage firm, allowing people to trade in the
              Egyptian, Saudi and Emirates stock market. Making investing more accessible and
              simplified through removing entry barriers. In addition to a wide array of services
              from
              various educational and trading services.
            </p>
            <p>
              Knowing the fees and other charges that might apply to you is essential to making the
              most of your investment. Furthermore, following is a partition of services traditional
              brokerage firms make you pay for (Minimums, Withdrawal fees, Data, Advisory services).
              Basically, you pay for
              {' '}
              <strong>everything</strong>
, even the loss.
              <br />
              <strong>
You pay none of these with MerQuant
              </strong>
            </p>
            <a
              href="https://blog.merquant.com/en/who-we-are/"
              target="_blank"
              className="btn btn-primary mb-4 ts-scroll"
            >
Read More!
            </a>
          </div>

          <div
            className="col-md-7 col-xl-7 text-center"
            data-animate="ts-fadeInUp"
            data-delay="0.1s"
            data-offset="100"
          >
            <div className="px-3">
              <img
                src="/static/assets/img/what-is-merquant.jpg"
                className="mw-100 ts-shadow__lg ts-border-radius__md"
                alt=""
              />
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="features" className="ts-block">
      <div className="container">
        <div className="row">
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
                    src="/static/assets/img/Website.png"
                    className="mw-100 ts-shadow__lg ts-border-radius__md"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-5 col-xl-5" data-animate="ts-fadeInUp" data-offset="100">
            <div className="ts-title">
              <h2>Features</h2>
            </div>

            <p>
              MerQuant is the first commission-free online broker in the MENA region. Made for the
              new
              generation of young investors by making investment more accessible and simplified than
              ever.
              {' '}
              <br />
              {' '}
In other words, everything you’ve been paying for concerning any
              investment
              services will be free with MerQuant. Therefor, let’s break down things a little bit.
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
                  <h6 className="my-2">Commission Free Trading</h6>
                </a>
                <div className="collapse" id="feature-1">
                  <p>
                    All buy/sell orders are commission free using
                    {' '}
                    <strong>MerQuant</strong>
                    {' '}
in
                    local and global stock markets. Because of our vision to support information
                    technology, and encourage people to invest.
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
                  <h6 className="my-2">Safe & Secure</h6>
                </a>
                <div className="collapse" id="feature-2">
                  <p>
                    <strong>MerQuant</strong>
                    {' '}
is subjected to the highest standards for
                    information security.
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
                  <h6 className="my-2">Local and Global Stock Trading</h6>
                </a>
                <div className="collapse" id="feature-3">
                  <p>
                    MerQuant Offers the possibility for stock trading in the local and global
                    markets, without taking any commissions.
                  </p>
                </div>

              </li>
            </ul>

          </div>

        </div>

      </div>

    </section>

    <section id="organize" className="ts-block mt-5">
      <div className="container">
        <div className="ts-title text-center">
          <h2>All You Need In One App!</h2>
        </div>

        <div className="row align-items-center">
          <div className="col-md-4">
            <figure
              className="text-right ts-xs-text-center"
              data-animate="ts-fadeInUp"
              data-delay=".1s"
            >
              <span style={{ fontSize: '3em' }}>
                <i className="fas fa-camera" />
              </span>
              <h4 className="mb-2">Smart</h4>
              <p>
                MerQuant application adjusts with your investment goals, offering you advisory and
                notifications services that matter to you. Using the latest Artificial Intelligence
                technologies.
              </p>
            </figure>
            <figure
              className="text-right ts-xs-text-center"
              data-animate="ts-fadeInUp"
              data-delay=".3s"
            >
              <span style={{ fontSize: '3em' }}>
                <i className="fas fa-camera" />
              </span>
              <h4 className="mb-2">Easy To Use</h4>
              <p>
                MerQuant is designed to be suitable for stock trading experts and amateurs too.
                Without sacrificing the mandatory tools needed by expert users.
              </p>
            </figure>
          </div>

          <div className="col-md-4 my-5 d-flex justify-content-center align-items-center">
            <div className="image position-relative">
              <img
                src="/static/assets/img/phone.png"
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
                <i className="fas fa-camera" />
              </span>
              <h4 className="mb-2">Market Analysis</h4>
              <p>
                MerQuant offers the right tools needed to analyise the stock market yourself, in
                addition to the experts advice, news and much more, all
                {' '}
                <strong>FREE</strong>
.
              </p>
            </figure>
            <figure className="ts-xs-text-center" data-animate="ts-fadeInUp" data-delay=".3s">
              <span style={{ fontSize: '3em' }}>
                <i className="fas fa-camera" />
              </span>
              <h4 className="mb-2">No Entry Barriers</h4>
              <p>
                Easy to get started, without minimum amount of money to open your account or any
                fees. In addition to the free tutorials and advisory services to help young
                investors learn and invest.
              </p>
            </figure>
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
                <h2 data-animate="ts-zoomIn">2000+</h2>
                <h3 className="mb-0 ts-opacity__50">Clients</h3>
                <span className="ts-promo-number-divider" />
              </div>

            </div>

            <div className="col-sm-4">
              <div className="ts-promo-number text-center">
                <h2 data-animate="ts-zoomIn" data-delay="0.2s">0</h2>
                <h3 className="mb-0 ts-opacity__50">Commission</h3>
                <span className="ts-promo-number-divider" />
              </div>

            </div>

            <div className="col-sm-4">
              <div className="ts-promo-number text-center">
                <h2 data-animate="ts-zoomIn" data-delay="0.2s">0</h2>
                <h3 className="mb-0 ts-opacity__50">Minimums</h3>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    <section
      id="contact"
      className="ts-separate-bg-element"
      data-bg-image="/static/assets/img/alex.jpeg"
      data-bg-image-opacity=".1"
      data-bg-color="#313131"
    >
      <div className="container">
        <div className="ts-box mb-0 p-5 ts-mt__n-10">
          <div className="row">
            <div className="col-md-4">
              <h3>Contact Us</h3>
              <address>
                <figure>
                  <div className="font-weight-bold">Email:</div>
                  <a href="mailto:support@merquant.com">support@merquant.com</a>
                </figure>
                <figure>
                  <div className="font-weight-bold">
                    <i className="fab fa-facebook" />
                    {' '}
Facebook:
                  </div>
                  <a href="https://www.facebook.com/merquant">facebook.com/MerQuant</a>
                </figure>
                <figure>
                  <div className="font-weight-bold">
                    <i className="fab fa-twitter" />
                    {' '}
Twitter:
                  </div>
                  <a href="https://twitter.com/merquant">twitter.com/MerQuant</a>
                </figure>
                <figure>
                  <div className="font-weight-bold">
                    <i className="fab fa-instagram" />
                    {' '}
Instagram:
                  </div>
                  <a href="https://www.instagram.com/merquant/">instagram.com/MerQuant</a>
                </figure>
              </address>
            </div>
            <div className="col-md-8">
              <h3>Contact Form</h3>
              <form
                id="form-contact"
                method="post"
                className="clearfix ts-form ts-form-email"
              >
                <div className="row">
                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="form-contact-name">Your Name *</label>
                      <input
                        type="text"
                        className="form-control padding-input"
                        id="form-contact-name"
                        name="name"
                        placeholder="Your Name"
                        required
                      />
                    </div>

                  </div>

                  <div className="col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="form-contact-email">Your Email *</label>
                      <input
                        type="email"
                        className="form-control padding-input"
                        id="form-contact-email"
                        name="email"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="form-contact-message">Your Message *</label>
                      <textarea
                        className="form-control padding-input"
                        id="form-contact-message"
                        rows="5"
                        name="message"
                        placeholder="Your Message"
                        required
                      />
                    </div>

                  </div>

                </div>

                <div className="form-group clearfix">
                  <button
                    type="submit"
                    className="btn btn-primary float-right"
                    id="form-contact-submit"
                  >
Send a Message
                  </button>
                </div>

                <div className="form-contact-status" />
              </form>
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
