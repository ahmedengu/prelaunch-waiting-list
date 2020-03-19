import React from 'react';
import PropTypes from 'prop-types';
import {
  FiFacebook, FiLinkedin, FiTwitter, FiInstagram, FiYoutube,
} from 'react-icons/fi';
import {
  FaBlog,
} from 'react-icons/fa';

const Footer = ({ t }) => (
  <footer
    className="fdb-block fp-active bg-dark"
    data-block-type="footers"
    data-id="2"
  >
    <section id="legal" style={{ margin: 0 }}>
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h3>{t('merquant')}</h3>
          <p className="lead">
            <a
              title="Facebook"
              className="mx-2"
              href="https://www.facebook.com/merquant"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFacebook />
            </a>
            <a
              title="Twitter"
              className="mx-2"
              href="https://twitter.com/merquant"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter />
            </a>
            <a
              title="YouTube"
              className="mx-2"
              href="https://www.youtube.com/channel/UC5sXswGcRPseLizTDCltOJw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiYoutube />
            </a>
            <a
              title="Blog"
              className="mx-2"
              href="https://blog.merquant.com"
              target="_blank"
              rel="dofollow"
            >
              <FaBlog />
            </a>
            <a
              title="Instagram"
              className="mx-2"
              href="https://www.instagram.com/merquant"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram />
            </a>
            <a
              title="Linkedin"
              className="mx-2"
              href="https://www.linkedin.com/company/merquant"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin />
            </a>
          </p>
          <p className="typography-body">
            {t('line1')}
            <br />
            {t('line2')}
            <br />
            {t('line3')}
            <br />
            {t('line4')}
          </p>
        </div>
      </div>
    </section>

    <script src="/static/assets/js/bundle.js?v=1" />
  </footer>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Footer;
