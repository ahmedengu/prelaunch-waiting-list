import React, { Component } from 'react';

class BackToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScrollTopButton: false,
      scrollTopAltStyle: false,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    const { showScrollTopButton, scrollTopAltStyle } = this.state;

    const newState = {};
    if (window.pageYOffset > 300) {
      if (!showScrollTopButton) {
        newState.showScrollTopButton = true;
      }
      if (window.pageYOffset > 1500) {
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
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
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

export default BackToTop;
