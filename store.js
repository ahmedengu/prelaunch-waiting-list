import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18n } from './i18n';

const exampleInitialState = {
  user: {},
  country: 'egypt',
  title: 'MerQuant',
  meta: {
    desc: 'merquant',
    keywords: 'merquant',
  },
};

export const actionTypes = {
  USER: 'USER', COUNTRY: 'COUNTRY', TITLE: 'TITLE', META: 'META', T: 'T', LANG: 'LANG',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.USER:
      // eslint-disable-next-line no-case-declarations
      const user = action.user || {};
      if (user && user.lang && user.lang !== i18n.language) {
        i18n.changeLanguage(user.lang);
      }
      return {
        ...state,
        user,
      };
    case actionTypes.COUNTRY:
      return { ...state, country: action.country };
    case actionTypes.TITLE:
      return { ...state, title: action.title };
    case actionTypes.META:
      return { ...state, meta: action.meta };
    default:
      return state;
  }
};

// ACTIONS
export const setCountry = (country) => ({ type: actionTypes.COUNTRY, country });
export const setUser = (user) => ({ type: actionTypes.USER, user });
export const setTitle = (title) => ({ type: actionTypes.TITLE, title });
export const setMeta = (meta) => ({ type: actionTypes.META, meta });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware()),
  );
}
