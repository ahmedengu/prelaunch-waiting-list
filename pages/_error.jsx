import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from '../i18n';
import PageWrapper from '../components/pageWrapper';
import Header from '../components/Header';

class Error extends Component {
  static async getInitialProps({ res, err }) {
    let statusCode = null;
    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    }

    return {
      namespacesRequired: ['error'],
      statusCode,
    };
  }

  componentDidMount() {
    $('body').addClass('loading-done');
  }

  render() {
    const { statusCode, t } = this.props;
    return (
      <PageWrapper t={t}>
        <header id="page-top" className="ts-full-screen" style={{ height: '100vh' }}>
          <Header t={t} isError />

          <div id="ts-dynamic-waves" className="ts-background" data-bg-color="rgb(255,171,3)">
            <svg
              className="ts-svg ts-parallax-element"
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs />
              <path
                className="ts-dynamic-wave"
                d=""
                data-wave-height=".6"
                data-wave-bones="4"
                data-wave-speed="0.15"
              />
            </svg>
            <svg
              className="ts-svg"
              width="100%"
              height="100%"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs />
              <path
                className="ts-dynamic-wave"
                d=""
                data-wave-color="#fff"
                data-wave-height=".2"
                data-wave-bones="6"
                data-wave-speed="0.2"
              />
            </svg>
          </div>
          <div className="container align-self-center">
            <div className="row align-items-center">
              <div className="col-12 text-center">
                <img
                  alt="Error"
                  className="img-fluid"
                  src="/static/assets/error.png"
                />
              </div>
            </div>
          </div>
        </header>
      </PageWrapper>
    );
  }
}

Error.defaultProps = {
  statusCode: null,
};

Error.propTypes = {
  statusCode: PropTypes.number,
  t: PropTypes.func.isRequired,
};

export default withTranslation('error')(Error);
