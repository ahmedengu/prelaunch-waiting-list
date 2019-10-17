import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

export const initGA = () => {
  ReactGA.initialize('UA-149722393-1');
  ReactPixel.init('2280759418716987');
};
export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  ReactPixel.pageView();
};
export const logUserId = (id) => {
  ReactGA.set({ userId: id });
};
export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
    ReactPixel.trackCustom(category, action);
  }
};
export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
    ReactPixel.trackCustom(description, fatal);
  }
};
