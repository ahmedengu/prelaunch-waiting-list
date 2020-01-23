import React from 'react';
import PropTypes from 'prop-types';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Parse from 'parse';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import { setUser } from '../store';
import { logEvent } from '../utils/analytics';

const Footer = ({ t, setUserHandler, user }) => (
  <footer
    className="fdb-block fp-active bg-dark"
    data-block-type="footers"
    data-id="2"
  >
    <section id="legal">
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <h3>MerQuant</h3>
          <p>
            Free shares are acquired after the validation of referred account and the official
            launch of
            MerQuant.
            The value of the stocks received can be up to 100EGP each, No one is allowed to have
            more
            than account.
            The regulations and registration of MerQuant are still in progress.
            Copyright © 2019 MerQuant, All rights reserved.
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
  user: PropTypes.object.isRequired,
  setUserHandler: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserHandler: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
