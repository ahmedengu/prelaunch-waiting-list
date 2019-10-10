import React from 'react';
import PropTypes from 'prop-types';

import { i18n, withTranslation } from '../i18n';
import PageWrapper from '../components/pageWrapper';

const Error = ({ statusCode, t, lang }) => (
  <PageWrapper t={t} lang={lang}>
    <div className="fdb-block">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 col-lg-5">
            <h1>{t('ops')}</h1>
            <p className="lead">
              {statusCode
                ? t('error-with-status', { statusCode })
                : t('error-without-status')}
            </p>
          </div>
          <div className="col-12 col-md-6 ml-md-auto mt-4 mt-md-0">
            <p>
              <img
                alt="Shape"
                className="img-fluid"
                src="https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//shapes/2.svg"
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
);

Error.getInitialProps = async ({ req, res, err }) => {
  let statusCode = null;
  if (res) {
    ({ statusCode } = res);
  } else if (err) {
    ({ statusCode } = err);
  }

  const lang = (req ? req.language : i18n.language) || 'en';

  return {
    namespacesRequired: ['error'],
    statusCode,
    lang,
  };
};

Error.defaultProps = {
  statusCode: null,
};

Error.propTypes = {
  statusCode: PropTypes.number,
  t: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default withTranslation('error')(Error);
