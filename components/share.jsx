import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { domain } from '../constants';

const Share = ({ t, user }) => {
  let copyInput = null;
  const userLink = `${domain}?ref=${user.ref}`;
  const shareLink = encodeURIComponent(userLink);

  const copy = () => {
    copyInput.select();
    document.execCommand('copy');
  };

  return (
    <section className="fdb-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-10 col-sm-6 m-auto col-md-4 pb-4 pb-md-0">
            <img
              alt="chatting"
              className="img-fluid rounded-0"
              src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs/draws/email.svg"
            />
            <h2>
              {t('your-points')}
              {': '}
              <br />
              {user.points || 0}
            </h2>
          </div>
          <div className="col-12 ml-auto col-md-6 col-lg-5">
            <h1>{t('share-h1')}</h1>
            <p className="lead">
              {t('share-l2')}
            </p>
            <div className="input-group mb-3">
              <input
                onChange={() => {
                }}
                type="text"
                className="form-control"
                ref={(input) => {
                  copyInput = input;
                }}
                value={userLink}
                dir="ltr"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={copy}
                >
                  {t('copy')}
                </button>
              </div>
            </div>
            <div className="addthis_inline_share_toolbox" />
            <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d8fc633026ccc05" />
          </div>
        </div>
      </div>
    </section>
  );
};

Share.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Share);
