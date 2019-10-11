import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const exampleInitialState = {
  user: {},
  country: 'egypt',
  referral: '',
  lang: 'ar',
};

export const actionTypes = {
  USER: 'USER', COUNTRY: 'COUNTRY', T: 'T', LANG: 'LANG', REFERRAL: 'REFERRAL',
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
    case actionTypes.REFERRAL:
      return { ...state, referral: action.referral };
    case actionTypes.LANG:
      return { ...state, lang: action.lang };
    default:
      return state;
  }
};

// ACTIONS
export const setCountry = (country) => ({ type: actionTypes.COUNTRY, country });
export const setUser = (user) => ({ type: actionTypes.USER, user });
export const setReferral = (referral) => ({ type: actionTypes.REFERRAL, referral });
export const setLang = (lang) => ({ type: actionTypes.LANG, lang });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware()),
  );
}
