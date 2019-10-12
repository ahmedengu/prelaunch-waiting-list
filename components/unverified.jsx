import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { logEvent } from '../utils/analytics';

class Unverified extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: 'resend-email',
    };
  }

  resend() {
    const { email } = this.props;
    this.setState({ loading: true });

    Parse.Cloud.run('resendVerification', { email }).then((reponse) => {
      this.setState({ message: reponse });
    }).catch((reason) => {
      this.setState({ message: reason.message });
      logEvent('resendVerification', reason.message);
    });
  }

  render() {
    const { t } = this.props;
    const { loading, message } = this.state;
    return (
      <section className="checkMail_section">
        <div className="container">
          <div className="row text-center">
            <div className="col-12 text-white">
              <h4 className="spacing font-weight-lighter" style={{ fontSize: 'medium' }}>
                {t('check-mail')}
                {' - '}
                <button
                  disabled={loading}
                  type="button"
                  className="btn checkMail_section-btn pt-0 pb-0 spacing"
                  onClick={() => {
                    this.resend();
                    logEvent('user', 'mail-resend');
                  }}
                >
                  { t(message)}
                </button>
              </h4>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Unverified.propTypes = {
  t: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default Unverified;
