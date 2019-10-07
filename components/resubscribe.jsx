import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';

class Resubscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: 'resubscribe',
    };
  }

  resend() {
    const { user } = this.props;
    this.setState({ loading: true });

    Parse.Cloud.run('manageSub', { username: user.username, token: user.token, sendEmails: true })
      .then((reponse) => {
        this.setState({ message: reponse });
      }).catch((reason) => {
        this.setState({ message: reason.message });
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
              <h4 className="spacing font-weight-lighter">
                {t('you-are-not-subscribed')}
                {' - '}
                <button
                  disabled={loading}
                  type="button"
                  className="btn checkMail_section-btn pt-0 pb-0 spacing"
                  onClick={() => {
                    this.resend();
                  }}
                >
                  {t(message)}
                </button>
              </h4>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Resubscribe.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default Resubscribe;
