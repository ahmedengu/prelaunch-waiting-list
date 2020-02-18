import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Parse from 'parse';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import Share from './share';
import { setUser } from '../store';
import Unverified from './unverified';
import Resubscribe from './resubscribe';
import HomeFeatures from './homeFeatures';
import { domain } from '../constants';
import { logEvent } from '../utils/analytics';

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
    const {
      t, user, setUserHandler, dir,
    } = this.props;

    let copyInput = null;
    const userLink = `${domain}/?ref=${user.ref}`;
    const shareLink = encodeURIComponent(userLink);

    const copy = () => {
      copyInput.select();
      document.execCommand('copy');
      logEvent('share', 'copy');
    };

    return (
      <div className="fill">
        <div className="main " />

        {user && !user.emailVerified && (
          <Unverified t={t} email={user.email || user.username} />
        )}
        {user && user.emailVerified && user.sendEmails === false && (
          <Resubscribe t={t} user={user} />
        )}
        {/* <Share t={t} /> */}
        {/* <HomeFeatures t={t} /> */}

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-7 text-center image">
              <a href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15%"
                  height="auto"
                  viewBox="0 0 818 387"
                >
                  <path
                    className="cls-1"
                    d="M64,83s2.748,11.09,9,13c0,0,2,21.1-14,29s-29,5-29,5S9.9,141.361,16,174s76,14,76,14S91.511,206.083,495,9l12-6s11.769-7.808,29,0,94.914,35.4,159,105c0,0,50.415,54.5,65,103,0,0,14.657,10.519,25,24,0,0,5.552,9.745,8,17s19.833,42.3,25,48c0,0-39.3-14.555-54-37,0,0-13.825.269-8,16,0,0,21.624,44.559,30,50,0,0-33.329-11.689-39-22,0,0-2.691-6.7-8,0l-2,5s-9.326,17.014-22,26-24,41-24,41v8H640s-8.823-13.49-10-47c0,0,15.411-2.106,2-14,0,0-12.579-17.13-17-37H598s-7.041-34.947-104-57c0,0,65.921-.315,99,14,0,0,12.634,14.857,16,9s13.752-27.888,30-37c0,0-38.627,45.246,20,108l4-1,3,7s-14.1-.963-15,18c0,0,.813,14.766,3,18h26s10.741-25.425,21-34,46.477-70.28,27-86c0,0-11.953-7.314-3-6s20.581,4.144,26,1,14.831,3.562,21,7l5,3s8.476,2.361,1-10c0,0-12.506-25.914-43-21l-3,2s-11.319-67.707-84-112c0,0-33.894-24.285-89-30,0,0-12.318-2.993-19,0,0,0,5.75-5.755,60-8,0,0,25.112-.584-14-19a69.608,69.608,0,0,0-31-7c-18.294.013-41.008-3.454-71,4S330.153,133.857,283,168l-27,18s25.95-24.06,26-41c0,0,1.941-10.72-6-4,0,0-27.8,15.277-57,24,0,0-58.66,14.092-82,53,0,0-64.732-.446-73-1-4.349-.292-32.424-3.415-50-18C1.716,188.807-5.343,172.429,4,150c2.706-6.5,7.243-10.131,13-18l5-5a3.425,3.425,0,0,0-1-3c-1.358-1.291,4.231-27.627,37-27h7A32.065,32.065,0,0,1,64,83Zm116,36"
                  />
                </svg>
              </a>

            </div>
          </div>
          <div className="row justify-content-center gift-section">
            <div className="col-sm-8 col-md-6 col-lg-6 col-xl-6">
              <div id="content">
                <div className="title">
                  <h2>{t('share-h1')}</h2>
                  <h4>{t('share-h4')}</h4>
                  <p>{t('share-p')}</p>
                </div>
                <form
                  action="#joined.html"
                  id="joined-form"
                  className="ts-form ts-form-email ts-labels-inside-input ref-link"
                >
                  <div className="row">
                    <div className="col-sm-12 col-md-11 col-lg-11 col-xl-11">
                      <div className="form-group mb-0">
                        <input
                          onChange={() => {}}
                          type="text"
                          aria-describedby="subscribe"
                          className="form-control"
                          ref={(input) => {
                            copyInput = input;
                          }}
                          value={userLink}
                          dir="ltr"
                        />
                      </div>
                    </div>
                    <div className="col-sm-4 col-md-1 col-lg-1 col-xl-1">
                      <button
                        className="btn"
                        type="button"
                        onClick={copy}
                      >
                        {t('copy')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="col-sm-8 col-md-6 col-lg-6 col-xl-6 align-items-center stocks-earned align-self-center text-center"
            >
              <h3>{t('your-points')}</h3>
              <h1>{(user.points || 0)}</h1>
              <p style={{ color: '#494745', textShadow: 'none' }} className={`card-text ${user.pendingPoints > 0 ? '' : 'd-none'}`}>{t('your-pending', { pendingPoints: (user.pendingPoints || 0) })}</p>
              <h4>{t('points-card-footer')}</h4>
              <p dir={dir}>
                {t('reservation-held', { email: user.email })}
                {t('is-this')}
                <button
                  className="btn btn-outline-light"
                  type="button"
                  onClick={() => {
                    Parse.User.logOut();
                    cookie.remove('user');
                    setUserHandler({});
                    Parse.LiveQuery.close();
                    toast(t('goodbye'));
                    logEvent('user', 'logOut');
                    window.scrollTo(0, 0);
                  }}
                >
                  {t('not-you')}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoggedIn.propTypes = {
  t: PropTypes.func.isRequired,
  setUserHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  dir: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  dir: state.dir,
});

const mapDispatchToProps = {
  setUserHandler: setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
