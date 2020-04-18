import React from 'react';
import PropTypes from 'prop-types';

const BlogSection = ({ t }) => (
  <section id="learn" className="ts-block text-center">
    <div className="container">
      <div className="ts-title">
        <h2>{t('posts-h2')}</h2>
      </div>

      <div className="row">
        {
          (t('posts', { returnObjects: true }) || []).map(({ img, title, url }, key) => (
            <a target="_blank" rel="dofollow" href={url} className="col-sm-6 col-md-4 col-xl-4" key={key}>
              <figure data-animate="ts-fadeInUp" style={{ visibility: 'visible' }} className="ts-fadeInUp animated">
                <figure className="icon">
                  {process.browser && (<img className="img-fluid" src={img} alt={title} />)}
                </figure>
                <h4 className="text-dark">{title}</h4>
              </figure>
            </a>
          ))
        }
      </div>
    </div>
  </section>
);

BlogSection.propTypes = {
  t: PropTypes.func.isRequired,
};

export default BlogSection;
