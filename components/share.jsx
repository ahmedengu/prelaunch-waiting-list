import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { domain } from '../constants';

class Share extends Component {
  componentDidMount() {
    setTimeout(() => {
      const addthisScript = document.createElement('script');
      addthisScript.setAttribute('src', 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5d8fc633026ccc05');
      if (document.body) document.body.appendChild(addthisScript);
    });
  }

  render() {
    const { t, user } = this.props;
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
                src={t('share-img')}
              />
              <h2>
                {t('your-points')}
                {': '}
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
              <div>
                <a
                  className="resp-sharing-button__link"
                  href={`https://facebook.com/sharer/sharer.php?u=${shareLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <div
                    className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium"
                  >
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"
                        />
                      </svg>
                    </div>
                    Facebook
                  </div>
                </a>

                <a
                  className="resp-sharing-button__link"
                  href={`https://twitter.com/intent/tweet/?text=${encodeURIComponent(t(
                    'addthis-title',
                  ))}&url=${shareLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <div
                    className="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium"
                  >
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"
                        />
                      </svg>
                    </div>
                    Twitter
                  </div>
                </a>

                <a
                  className="resp-sharing-button__link"
                  href={`mailto:?subject=${encodeURIComponent(t('addthis-title'))}&body=${encodeURIComponent(`${t('addthis-description')} `)}${shareLink}`}
                  target="_self"
                  rel="noopener noreferrer"
                  aria-label="E-Mail"
                >
                  <div
                    className="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium"
                  >
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z"
                        />
                      </svg>
                    </div>
                    E-Mail
                  </div>
                </a>

                <a
                  className="resp-sharing-button__link"
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareLink}&title=${encodeURIComponent(t('addthis-title'))}&summary=${encodeURIComponent(t('addthis-description'))}&source=${shareLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <div
                    className="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium"
                  >
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"
                        />
                      </svg>
                    </div>
                    LinkedIn
                  </div>
                </a>

                <a
                  className="resp-sharing-button__link"
                  href={`whatsapp://send?text=${encodeURIComponent(`${t('addthis-title')} `)}${shareLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <div
                    className="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium"
                  >
                    <div
                      aria-hidden="true"
                      className="resp-sharing-button__icon resp-sharing-button__icon--solid"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"
                        />
                      </svg>
                    </div>
                    WhatsApp
                  </div>
                </a>
                <div
                  className="addthis_inline_share_toolbox align-bottom d-inline-block pb-1"
                  data-url={userLink}
                  data-title={t('addthis-title')}
                  data-description={t('addthis-description')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Share.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Share);
