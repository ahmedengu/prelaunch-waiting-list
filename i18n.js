/*
  Do not copy/paste this file. It is used internally
  to manage end-to-end test suites.
*/

const NextI18Next = require('next-i18next').default;

module.exports = new NextI18Next({
  fallbackNS: 'common',
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  otherLanguages: ['en'],
  defaultLanguage: 'ar',
  detection: {
    lookupCookie: 'next-i18next',
    order: ['cookie', 'querystring', 'localStorage', 'path', 'subdomain'],
    caches: ['cookie'],
  },
  localeSubpaths: {
    ar: 'ar',
    en: 'en',
  },
});
