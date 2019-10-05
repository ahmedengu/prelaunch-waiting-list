/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  ignoreRoutes: ['api', 'dashboard'],
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  otherLanguages: ['ar'],
  defaultLanguage: 'en',
  localeSubpaths: {
    ar: 'ar',
    en: 'en',
  },
});
