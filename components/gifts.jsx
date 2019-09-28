import React from 'react';
import PropTypes from 'prop-types';

const Gifts = ({ t }) => (
  <section className="fdb-block" data-block-type="features" data-id="8">
    <div className="container">
      <div className="row text-center">
        <div className="col-12" style={{ zIndex: 10000 }}><h1>Features</h1></div>
      </div>
      <div className="row text-center justify-content-center mt-5">
        <div className="col-12 col-sm-6 col-lg-3" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="monitor"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/monitor.svg"
            />
          </p>
          <h3><strong>Feature One</strong></h3>
          <p>
            Far far away, behind the word mountains, far
            from the countries
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-sm-0" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="map-pin"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/map-pin.svg"
            />
          </p>
          <h3><strong>Feature Two</strong></h3>
          <p>
            Separated they live in Bookmarksgrove right at
            the coast
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-lg-0" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="life-buoy"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/life-buoy.svg"
            />
          </p>
          <h3><strong>Feature Three</strong></h3>
          <p>
            A small river named Duden flows by their place
            and supplies it
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-3 pt-4 pt-lg-0" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="package"
              className="fdb-icon"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/package.svg"
            />
          </p>
          <h3><strong>Feature Four</strong></h3>
          <p>
            Duden flows by their place far far away, behind
            the word mountains.
          </p>
        </div>
      </div>
    </div>
  </section>
);

Gifts.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Gifts;
