import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import PageWrapper from './pageWrapper';
import Signup from './signup';
import LoggedIn from './loggedIn';

const HomePage = ({
  t, user, lang,
}) => (
  <PageWrapper t={t} lang={lang}>
    {user && user.objectId ? <LoggedIn t={t} /> : <Signup t={t} />}

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `
        {
          "@context": "http://schema.org",
          "@type": "Organization",
          "name": "${t('merquant')}",
          "url": "https://merquant.com",
          "logo": "${t('og-image')}",
          "address": "Alexandria, Egypt",
          "sameAs": [
            "https://www.facebook.com/merquant",
            "https://twitter.com/merquant",
            "https://www.instagram.com/merquant",
            "https://www.youtube.com/channel/UC5sXswGcRPseLizTDCltOJw",
            "https://www.linkedin.com/company/merquant"
          ],
          "image": [
            "https://merquant.com/${t('img-phone1')}",
            "https://merquant.com/${t('img-whatis')}",
            "https://merquant.com/${t('carousel-1')}",
            "https://merquant.com/${t('carousel-2')}",
            "https://merquant.com/${t('carousel-3')}"
          ]
        }
    `,
      }}
    />
  </PageWrapper>
);

HomePage.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  lang: state.lang,
});

export default connect(mapStateToProps)(HomePage);
