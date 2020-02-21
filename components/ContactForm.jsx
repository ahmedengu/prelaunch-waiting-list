import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';
import { logEvent } from '../utils/analytics';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      message: '',
      loading: false,
      error: '',
      sent: false,
    };
  }

  async sendMail() {
    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email)
        .toLowerCase());
    };

    const { email, name, message } = this.state;
    if (!email || !validateEmail(email)) {
      this.setState({ error: 'invalid-email' });
      return;
    }

    this.setState({
      loading: true,
      error: '',
    });

    try {
      console.log(await Parse.Cloud.run('contactForm', { email, name, message }));
      this.setState({
        loading: false,
        sent: true,
      });
      logEvent('contactForm', 'sendmail');
    } catch (e) {
      this.setState({
        error: e.message, loading: false,
      });
      logEvent('contactForm', 'error');
    }
  }

  render() {
    const { t } = this.props;
    const {
      email, name, message, loading, error, sent,
    } = this.state;
    return (
      <>
        <h3>{t('contact-form')}</h3>
        <form
          id="form-contact"
          method="post"
          className="clearfix ts-form ts-form-email"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            this.sendMail();
          }}
        >
          <div className="row">
            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label htmlFor="form-contact-name">
                  {t('your-name')}
                  {' '}
                  *
                </label>
                <input
                  type="text"
                  className="form-control padding-input"
                  id="form-contact-name"
                  name="name"
                  value={name}
                  onChange={(event) => {
                    this.setState({
                      name: event.target.value,
                    });
                  }}
                  placeholder={t('your-name')}
                  required
                />
              </div>

            </div>

            <div className="col-md-6 col-sm-6">
              <div className="form-group">
                <label htmlFor="form-contact-email">
                  {t('your-email')}
                  {' '}
                  *
                </label>
                <input
                  dir="ltr"
                  type="email"
                  className={`form-control padding-input ${error ? 'is-invalid' : ''}`}
                  id="form-contact-email"
                  name="email"
                  value={email}
                  onChange={(event) => {
                    this.setState({
                      email: event.target.value,
                      error: '',
                    });
                  }}
                  placeholder={t('your-email')}
                  required
                />
                {error && (<p className="text-danger" style={{ margin: 0 }}>{t(error)}</p>)}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="form-contact-message">
                  {t('your-message')}
                  {' '}
                  *
                </label>
                <textarea
                  className="form-control padding-input"
                  id="form-contact-message"
                  rows="5"
                  name="message"
                  value={message}
                  onChange={(event) => {
                    this.setState({
                      message: event.target.value,
                    });
                  }}
                  placeholder={t('your-message')}
                  required
                />
              </div>

            </div>

          </div>

          <div className="form-group clearfix">
            {sent && (<span className="text-success">{t('contact-sent')}</span>)}
            <button
              type="submit"
              className={`btn btn-primary float-right ${loading && 'processing'}`}
              id="form-contact-submit"
              disabled={loading || !(email && name && message) || sent}
            >
              {t('send-message')}
              <div className="status">
                <i
                  className="fas fa-circle-notch fa-spin spinner"
                />
              </div>
            </button>
          </div>
          <div className="form-contact-status" />
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  t: PropTypes.any,
};

export default ContactForm;
