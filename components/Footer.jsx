import React from 'react';
import PropTypes from 'prop-types';
import { FiFacebook, FiLinkedin, FiTwitter } from 'react-icons/fi';
import Parse from 'parse';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../store';

const Footer = ({ t, setUserHandler, user }) => (
  <footer
    className="fdb-block fp-active bg-dark"
    data-block-type="footers"
    data-id="2"
  >
    <div className="container">
      <div className="row text-center">
        <div className="col fr-box fr-inline" role="application">
          <div className="fr-wrapper" dir="auto">
            <div
              className="fr-element fr-view"
              dir="auto"
              aria-disabled="false"
              spellCheck="true"
            >
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
              <p className="small">
                {t('line1')}
                <br />
                {t('line2')}
                <br />
                {t('line3')}
                <br />
                {t('line4')}
              </p>
              {
                user && user.objectId
                && (
                <button
                  type="button"
                  onClick={() => {
                    Parse.User.logOut();
                    setUserHandler({});
                    toast(t('goodbye'));
                  }}
                  className="btn btn-link font-weight-light text-white-50"
                >
                  {t('logout')}
                </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    <script
      src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
    />
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    />
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
