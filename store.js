import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const exampleInitialState = {
  user: {},
  country: 'egypt',
};

export const actionTypes = {
  USER: 'USER', COUNTRY: 'COUNTRY', T: 'T', LANG: 'LANG',
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
    default:
      return state;
  }
};

// ACTIONS
export const setCountry = (country) => ({ type: actionTypes.COUNTRY, country });
export const setUser = (user) => ({ type: actionTypes.USER, user });

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware()),
  );
}
