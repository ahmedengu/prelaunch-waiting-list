import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';

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
    });
  }

  render() {
    const { t } = this.props;
    const { loading, message } = this.state;
    return (
      <section className="bg-dark">
        <div className="container">
          <div className="row text-center">
            <div className="col-12 text-white">
              <h4>
                {t('check-mail')}
                {' - '}
                <button
                  disabled={loading}
                  type="button"
                  className="btn btn-success pt-0 pb-0"
                  onClick={() => {
                    this.resend();
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
