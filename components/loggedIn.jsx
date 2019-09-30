import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Parse from 'parse';
import cookie from 'js-cookie';
import Share from './share';
import Gifts from './gifts';
import { setUser } from '../store';

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
          <section className="bg-dark">
            <div className="container">
              <div className="row text-center">
                <div className="col-12 text-white">
                  <h4>{t('check-mail')}</h4>
                </div>
              </div>
            </div>
          </section>
        )}
        <Share t={t} />
        <Gifts t={t} />
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
