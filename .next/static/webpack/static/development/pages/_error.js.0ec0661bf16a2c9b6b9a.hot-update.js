webpackHotUpdate("static\\development\\pages\\_error.js",{

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=C%3A%5CUsers%5CMahmoud%5Cmerquant_prelunch%5Cpages%5C_error.jsx!./":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=C%3A%5CUsers%5CMahmoud%5Cmerquant_prelunch%5Cpages%5C_error.jsx ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


    (window.__NEXT_P=window.__NEXT_P||[]).push(["/_error", function() {
      var mod = __webpack_require__(/*! ./pages/_error.jsx */ "./pages/_error.jsx")
      if(true) {
        module.hot.accept(/*! ./pages/_error.jsx */ "./pages/_error.jsx", function() {
          if(!next.router.components["/_error"]) return
          var updatedPage = __webpack_require__(/*! ./pages/_error.jsx */ "./pages/_error.jsx")
          next.router.update("/_error", updatedPage)
        })
      }
      return mod
    }]);
  

/***/ }),

/***/ "./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=next%2Fdist%2Fpages%2F_error!./":
false,

/***/ "./node_modules/next/dist/pages/_error.js":
false,

/***/ "./pages/_error.jsx":
/*!**************************!*\
  !*** ./pages/_error.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../i18n */ "./i18n.js");
/* harmony import */ var _i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_pageWrapper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/pageWrapper */ "./components/pageWrapper.jsx");


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;





var Error = function Error(_ref) {
  var statusCode = _ref.statusCode,
      t = _ref.t,
      lang = _ref.lang;
  return __jsx(_components_pageWrapper__WEBPACK_IMPORTED_MODULE_5__["default"], {
    t: t,
    lang: lang
  }, __jsx("div", {
    className: "container"
  }, __jsx("div", {
    className: "row align-items-center"
  }, __jsx("div", {
    className: "col-12 col-md-6 col-lg-5",
    style: {
      zIndex: 10000
    }
  }, __jsx("h1", null, t('ops')), __jsx("p", {
    className: "lead"
  }, statusCode ? t('error-with-status', {
    statusCode: statusCode
  }) : t('error-without-status'))), __jsx("div", {
    className: "col-12 col-md-6 ml-md-auto mt-4 mt-md-0",
    style: {
      zIndex: 10000
    }
  }, __jsx("p", null, __jsx("img", {
    alt: "Shape",
    className: "img-fluid",
    src: "https://cdn.jsdelivr.net/gh/froala/design-blocks@2.0.1/dist/imgs//shapes/2.svg"
  }))))));
};

Error.getInitialProps =
/*#__PURE__*/
function () {
  var _ref3 = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
  /*#__PURE__*/
  _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref2) {
    var req, res, err, statusCode, lang;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            req = _ref2.req, res = _ref2.res, err = _ref2.err;
            statusCode = null;

            if (res) {
              statusCode = res.statusCode;
            } else if (err) {
              statusCode = err.statusCode;
            }

            lang = (req ? req.language : _i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"].language) || 'ar';
            return _context.abrupt("return", {
              namespacesRequired: ['common', 'error'],
              statusCode: statusCode,
              lang: lang
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref3.apply(this, arguments);
  };
}();

Error.defaultProps = {
  statusCode: null
};
Error.propTypes = {
  statusCode: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
  t: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func.isRequired,
  lang: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Object(_i18n__WEBPACK_IMPORTED_MODULE_4__["withTranslation"])('error')(Error));

/***/ }),

/***/ 0:
/*!**************************************************************************************************************************************!*\
  !*** multi next-client-pages-loader?page=%2F_error&absolutePagePath=C%3A%5CUsers%5CMahmoud%5Cmerquant_prelunch%5Cpages%5C_error.jsx ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! next-client-pages-loader?page=%2F_error&absolutePagePath=C%3A%5CUsers%5CMahmoud%5Cmerquant_prelunch%5Cpages%5C_error.jsx! */"./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?page=%2F_error&absolutePagePath=C%3A%5CUsers%5CMahmoud%5Cmerquant_prelunch%5Cpages%5C_error.jsx!./");


/***/ })

})
//# sourceMappingURL=_error.js.0ec0661bf16a2c9b6b9a.hot-update.js.map