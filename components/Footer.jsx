import React from 'react';
import PropTypes from 'prop-types';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = ({ t }) => (
  <footer className="footer" data-block-type="footers" data-id="2">
    <div className="container-full">
      <div className="row text-center">
        <div className="col fr-box fr-inline" role="application" style={{ zIndex: 10000 }}>
          <div className="fr-wrapper" dir="auto">
            <div
              className="fr-element fr-view"
              dir="auto"
              aria-disabled="false"
              spellCheck="true"
            >
              <h3>{t('MerQuant')}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col text-center fr-box" role="application" style={{ zIndex: 10000 }}>
          <div className="fr-wrapper" dir="auto">
            <div
              className="fr-element fr-view white-icon"
              dir="auto"
              aria-disabled="false"
              spellCheck="true"
            >
              <p className="lead">
                <a
                  title="Facebook"
                  className="mx-2"
                  href="https://www.facebook.com/merquant"
                >
                  <FiFacebook className="white-icon"/>
                </a>
                <a
                  title="Twitter"
                  className="mx-2"
                  href="https://twitter.com/merquant"
                >
                  <FiTwitter className="white-icon"/>
                </a>
                <a
                  title="Linkedin"
                  className="mx-2"
                  href="https://www.linkedin.com/company/merquant"
                >
                  <FiLinkedin className="white-icon" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Footer;
