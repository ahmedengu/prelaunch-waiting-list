import React from 'react';
import PropTypes from 'prop-types';

const Share = ({ t }) => (
  <section
    className="fdb-block"
    style={{ backgroundImage: 'url("https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//shapes/8.svg")' }}
    data-block-type="contents"
    data-id="6"
  >
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 col-lg-5" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="Github"
              className="fdb-icon fr-fic fr-dii"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//icons/github.svg"
            />
          </p>
          <h1>Design Blocks</h1>
          <p className="lead">
Far far away, behind the word mountains, far
          from the countries Vokalia and Consonantia, there live the blind texts.
          </p>
        </div>
        <div className="col-10 col-sm-6 m-auto col-md-4 pt-4 pt-md-0" style={{ zIndex: 10000 }}>
          <p>
            <img
              alt="Chat"
              className="img-fluid rounded-0 fr-fic fr-dii"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//draws/chat.svg"
            />
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
