import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18n } from './i18n';

const exampleInitialState = {
  user: {},
  country: 'egypt',
  referral: '',
  lang: 'ar',
  dir: 'ltr',
  playVideo: false,
};

export const actionTypes = {
  USER: 'USER', COUNTRY: 'COUNTRY', T: 'T', LANG: 'LANG', REFERRAL: 'REFERRAL', PLAY_VIDEO: 'PLAY_VIDEO',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.USER:
      // eslint-disable-next-line no-case-declarations
      return {
        ...state,
        user: action.user || {},
      };
    case actionTypes.COUNTRY:
      return { ...state, country: action.country };
    case actionTypes.PLAY_VIDEO:
      return { ...state, playVideo: action.playVideo };
    case actionTypes.REFERRAL:
      return { ...state, referral: action.referral };
    case actionTypes.LANG:
      if (state.lang !== action.lang) {
        i18n.changeLanguage(action.lang);
      }

      return { ...state, lang: action.lang, dir: action.lang === 'ar' ? 'rtl' : 'ltr' };
    default:
      return state;
  }
};

// ACTIONS
export const setCountry = (country) => ({ type: actionTypes.COUNTRY, country });
export const setPlayVideo = (playVideo) => ({ type: actionTypes.PLAY_VIDEO, playVideo });
export const setUser = (user) => ({ type: actionTypes.USER, user });
export const setReferral = (referral) => ({ type: actionTypes.REFERRAL, referral });
export const setLang = (lang) => ({ type: actionTypes.LANG, lang });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools({ trace: true, traceLimit: 25 })(applyMiddleware()),
  );
}
