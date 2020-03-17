import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPlayVideo } from '../store';

class BackToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScrollTopButton: false,
      scrollTopAltStyle: false,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  onScroll = () => {
    const { showScrollTopButton, scrollTopAltStyle } = this.state;
    const { setPlay, playVideo } = this.props;

    const newState = {};
    if (window.pageYOffset > 300) {
      if (!showScrollTopButton) {
        newState.showScrollTopButton = true;
      }
      if (!playVideo && window.$('#merquant-video') && window.$('#merquant-video').offset() && window.pageYOffset > window.$('#merquant-video').offset().top - 150) {
        setPlay(true);
      }
      if (window.pageYOffset > 3600) {
        if (!scrollTopAltStyle) {
          newState.scrollTopAltStyle = true;
        }
      } else if (scrollTopAltStyle) {
        newState.scrollTopAltStyle = false;
      }
    } else if (showScrollTopButton) {
      newState.showScrollTopButton = false;
    }

    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    const { showScrollTopButton, scrollTopAltStyle } = this.state;
    if (showScrollTopButton) {
      const style = scrollTopAltStyle ? { backgroundColor: '#ffab04', color: '#1e1e1e' } : {};
      return (
        <button
          type="button"
          aria-label="Go to top"
          style={style}
          onClick={this.scrollToTop}
          id="scrollTopButton"
          title="Go to top"
        >
          <i className="backTopArrow fas fa-arrow-up" />
        </button>
      );
    }
    return null;
  }
}

BackToTop.propTypes = {
  setPlay: PropTypes.func.isRequired,
  playVideo: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  playVideo: state.playVideo,
});

const mapDispatchToProps = {
  setPlay: setPlayVideo,
};

export default connect(mapStateToProps, mapDispatchToProps)(BackToTop);
