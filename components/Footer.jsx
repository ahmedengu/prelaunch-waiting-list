import React from 'react';
import PropTypes from 'prop-types';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';

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

    <script src="/static/assets/js/jquery-3.3.1.min.js" />
    <script src="/static/assets/js/popper.min.js" />
    <script src="/static/assets/bootstrap/js/bootstrap.min.js" />
    <script src="/static/assets/js/imagesloaded.pkgd.min.js" />
    <script src="/static/assets/js/isInViewport.jquery.js" />
    <script src="/static/assets/js/jquery.particleground.min.js" />
    <script src="/static/assets/js/owl.carousel.min.js" />
    <script src="/static/assets/js/scrolla.jquery.min.js" />
    <script src="/static/assets/js/jquery.validate.min.js" />
    <script src="/static/assets/js/jquery-validate.bootstrap-tooltip.min.js" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.4/TweenMax.min.js" />
    <script src="/static/assets/js/jquery.wavify.js" />
    <script src="/static/assets/js/custom.js" />
    <script src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d8fc633026ccc05" />
  </footer>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Footer;
