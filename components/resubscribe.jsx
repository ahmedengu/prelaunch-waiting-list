import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import { connect } from 'react-redux';
import { logEvent } from '../utils/analytics';
import { setUser } from '../store';

class Resubscribe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: 'resubscribe',
    };
  }

  resend() {
    const { user, t, setUserHandler } = this.props;
    this.setState({ loading: true });

    Parse.Cloud.run('manageSub', { username: user.username, token: user.token, sendEmails: true })
      .then(async (reponse) => {
        this.setState({ message: reponse });
        toast(t(reponse));
        const userJson = Parse.User.current() && (await Parse.User.current().fetch()).toJSON();
        setUserHandler(userJson);
        cookie.set('user', userJson);
      }).catch((reason) => {
        this.setState({ message: reason.message });
        logEvent('manageSub', reason.message);
      });
  }

  render() {
    const { t } = this.props;
    const { loading, message } = this.state;
    return (
      <div className="checkMail_section text-center">
              <h4 className="m-2" style={{ fontSize: '.9375rem' }}>
                {t('you-are-not-subscribed')}
                {' - '}
                <button
                  disabled={loading}
                  type="button"
                  className="btn checkMail_section-btn pt-0 pb-0"
                  onClick={() => {
                    this.resend();
                    logEvent('user', 'resub');
                  }}
                >
                  {t(message)}
                </button>
              </h4>
            </div>
    );
  }
}

Resubscribe.propTypes = {
  t: PropTypes.func.isRequired,
  setUserHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setUserHandler: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Resubscribe);
