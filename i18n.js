/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  otherLanguages: ['en'],
  defaultLanguage: 'ar',
  localeSubpaths: {
    ar: 'ar',
    en: 'en',
  },
});
