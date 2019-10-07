import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Parse from 'parse';
import cookie from 'js-cookie';
import Share from './share';
import { setUser } from '../store';
import Unverified from './unverified';
import Resubscribe from './resubscribe';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { subscription: undefined };
  }


  componentDidMount() {
    const { subscription } = this.state;
    const { setUserHandler, user } = this.props;

    if (!subscription && user && user.objectId) {
      const query = new Parse.Query(Parse.User);
      query.equalTo('objectId', user.objectId);
      query.subscribe()
        .then((sub) => {
          this.setState({ subscription: sub });

          sub.on('close', () => {
            this.setState({ subscription: undefined });
          });

          sub.on('update', (aUser) => {
            const userJson = (aUser).toJSON();
            setUserHandler(userJson);
            cookie.set('user', userJson);
          });
        });
    }
  }

  render() {
    const { t, user } = this.props;
    return (
      <>
        {user && !user.emailVerified && (
          <Unverified t={t} email={user.email || user.username} />
        )}
        {user && user.emailVerified && user.sendEmails === false && (
          <Resubscribe t={t} user={user} />
        )}
        <Share t={t} />
        {/* <Gifts t={t} /> */}
      </>
    );
  }
}

LoggedIn.propTypes = {
  t: PropTypes.func.isRequired,
  setUserHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  setUserHandler: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
