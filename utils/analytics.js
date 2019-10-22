import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { hotjar } from 'react-hotjar';

let initialized = false;
export const initGA = () => {
  initialized = true;
  ReactGA.initialize('UA-149722393-1');
  ReactPixel.init('2280759418716987');
  hotjar.initialize(1535519, 6);
};
export const logPageView = () => {
  if (initialized) {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
    ReactPixel.pageView();
  }
};
export const logUserId = (id) => {
  if (initialized) {
    ReactGA.set({ userId: id });
    ReactGA.fbq('init', '2280759418716987', { uid: id });
  }
};
export const logEvent = (category = '', action = '') => {
  if (category && action && initialized) {
    ReactGA.event({ category, action });
    ReactPixel.trackCustom(category, action);
  }
};
export const logException = (description = '', fatal = false) => {
  if (description && initialized) {
    ReactGA.exception({ description, fatal });
    ReactPixel.trackCustom(description, fatal);
  }
};
