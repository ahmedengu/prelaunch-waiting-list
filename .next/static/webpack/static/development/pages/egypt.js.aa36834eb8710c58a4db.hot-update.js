webpackHotUpdate("static\\development\\pages\\egypt.js",{

/***/ "./components/unverified.jsx":
/*!***********************************!*\
  !*** ./components/unverified.jsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_7__);





var __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;




var Unverified =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Unverified, _Component);

  function Unverified(props) {
    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Unverified);

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Unverified).call(this, props));
    _this.state = {
      loading: false,
      message: 'resend-email'
    };
    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Unverified, [{
    key: "resend",
    value: function resend() {
      var _this2 = this;

      var email = this.props.email;
      this.setState({
        loading: true
      });
      parse__WEBPACK_IMPORTED_MODULE_7___default.a.Cloud.run('resendVerification', {
        email: email
      }).then(function (reponse) {
        _this2.setState({
          message: reponse
        });
      })["catch"](function (reason) {
        _this2.setState({
          message: reason.message
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var t = this.props.t;
      var _this$state = this.state,
          loading = _this$state.loading,
          message = _this$state.message;
      return __jsx("section", {
        className: "checkMail_section"
      }, __jsx("div", {
        className: "container"
      }, __jsx("div", {
        className: "row text-center"
      }, __jsx("div", {
        className: "col-12 text-white"
      }, __jsx("h4", {
        className: "spacing "
      }, t('Please check your email for verification'), ' - ', __jsx("button", {
        disabled: loading,
        type: "button",
        className: "btn checkMail_section-btn pt-0 pb-0 spacing",
        onClick: function onClick() {
          _this3.resend();
        }
      }, t(message)))))));
    }
  }]);

  return Unverified;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

Unverified.propTypes = {
  t: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.func.isRequired,
  email: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Unverified);

/***/ })

})
//# sourceMappingURL=egypt.js.aa36834eb8710c58a4db.hot-update.js.map