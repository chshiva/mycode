exports.ids = [0,90];
exports.modules = {

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ForgotPasswordWidget = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _LoginActions = __webpack_require__(21);
	
	var _LoginWidget = {
		"googleDiv": "_34oDlzaEJx-oKzPFaI4fsX",
		"gIcong": "RwwgKVwW1CTs-ga0PjA9q",
		"gTextg": "Ls46FqhR8P-kzo1LcFho1",
		"inputGroupff": "_3yrxKD-CfDEDho3ck-beCR",
		"centerLoginSocial": "ow_FDSGusFcI19g2Y5kPG",
		"centerLoginSocial1": "_37RbjBlylfgSF-jwfn-Qej",
		"centerLoginSocial2": "_1AOT0mpVQ1hfmNUPy42hUX",
		"resetMainDiv": "_1NpbF_wgGgYKjoCZLiQlJE",
		"resetinnerDiv": "_3LVYFXEtS1locEPvMmp1R5",
		"resetPageBlock": "_1cbbxbMM60cxNsY1y8tMX_",
		"resetTextBtn": "_1ODF0m4DBefQcRVLOSP3IE",
		"resetHeadText": "_2-G3BI16BQqSEK8RM5b6dW",
		"resetMsgText": "_1muwpmCwDsMO0mH2IkTDpw",
		"reestBtnSign": "_3oSUl8VSQH_JXmcupQco-g",
		"loginPad": "_2kPb-Sin48OJURo3ASzDc9",
		"actionLinks": "IIwf2omHFNuBvDaTZ1Ble",
		"actionSeprate": "_2zJ_0_ojYDnaTMKoFnkOJV",
		"loginBox": "_313CrdybQ6MFWKKC_sZz4l",
		"loingLogoBlock": "_1Bfxxd6Mon1wyeVoYUOhV2",
		"formSignin": "i2jzCweTouZdjkA7hDhu6",
		"welcomeTxt": "R2eOKlLzRvHAocEHETrx8",
		"pleaseTxt": "Bx6s7ZCz_cwLSRuBzVR7L",
		"btnSignin": "_132qy4-9OcziQog4tVbvFI",
		"signupAction": "_3ZhtmFJYd5RFiy87Siqngc",
		"rememberMe": "_1wzbnlxvKClzchwZZ5ljKq",
		"txtRememberMe": "_2FBYWyBkPm-vXHXr3qVlLp",
		"loginSwitch": "V0c1SITbhBAg6FJD8wMIH",
		"loginSlider": "_1k0S8KTihs6IDqXoSBZ-qY",
		"gmailIcon": "_1o2rBC3Ew8Kfa0lAcXdg2e",
		"loginLine": "_2lHu37yWkVfxJLtYEDaODC",
		"guestBehindNetText": "_1QfFYTEuLZjIsTx7oBS8ow",
		"guestBehindNetBtn": "vhDNGF8hyyVPy6wvR8Qxd",
		"btnBlockJoinConference": "_-fbAJXxIgUuy-PSZ9KX9I",
		"guestBehindNetbtnColor": "_2-2x7j8pEuXtSYMVq-XlAI",
		"btnJoinConference": "_3qwGciizrPmkCRoGFTd99B",
		"facebookButton": "_1la4yaAvg3omQ6ZYO-n9mM",
		"fontSignin": "_2_lkwClwY3kguOwZ2UKgfT",
		"round": "eULEBYNu4tmLXVBZgiRw",
		"loggingWait": "_2by_7N9b91zD_eHbXYpUQP",
		"singBlockFoeget": "_1vUwvIcR8UYWp5yuLfSZ6_",
		"singInFoeget": "Ej0vV3iEMgp2jomOrhTAO"
	};
	
	var _LoginWidget2 = _interopRequireDefault(_LoginWidget);
	
	var _main = {
		"btnPrimaryDark": "_31E9BurxzSEZnZC6S2rB5i",
		"bgPrimaryDark": "_2U4iOoVT93HKc6TY3Yhpc8",
		"bgPrimaryDarkA": "_1kioQADujZQ6TylOsfwy3L",
		"bgPrimaryDarkB": "_1iXfj7aYHjrOoIILdN4Uw3",
		"bgPrimary": "_1eK_OqsdSKH6Ww14uPaJ-4",
		"bgPrimaryLight": "_2s26DqNxbSnMNHChD0fpY3",
		"foreColorLight100": "T_G37ZhGLHSGeORUFaMGE",
		"foreColorLight70": "_2s1NjQ5Os0T964m8FaqeAV",
		"foreColorLight50": "_1smo35s1EBd6PlFlaTmOVT",
		"foreColorDark100": "_2BQEmwS-UHhbhJLvwvdFtV",
		"foreColorDark87": "_2TaP0tSvqsm7R6gPLNyFBO",
		"foreColorDark54": "_3IMx-j5u7S6iNsiWtcAKjJ",
		"foreColorDark38": "_29qeAGFHlesOKs1n-FhSpY",
		"mgRight8": "_2hSetRh-Ja8K0N9ugkdfvT",
		"modDropDown": "_2R3XlZjoybwKUxENLMh2D-",
		"infoBlock": "_1n2gUV7cowzrB_Q3Yc8GMV",
		"showInfoBlock": "_1KPirtUqPRullNjnHLv7LC",
		"active": "_3T56peYWObpewAcj6MML28",
		"statusCircle": "_25sEi_zFmPv-fWxe-9MhLN",
		"bgAway": "_3v9ju8fA80XxQaqa1JzHoa",
		"bgDntDistrub": "i3G3SAQvPmTDyNd3mqXQl",
		"bgOffline": "f3sfBt6PB_loBH2cYTt09",
		"bgOnline": "_3K5QKZdjTbK5514T6P-Vx4",
		"modDropDownDrop": "_1wdzau3GcxE3Etdf3q-iEY",
		"selected": "_32LRSkR2VkBF3JW2X7mDtl",
		"modPad": "_3YowDb-oIWUYi2P_azLYfo",
		"inputGroup": "_2JGglWuzl2RwpWz98wQEKx",
		"inputField": "_28ySg1xadRN73pLPNyS0eY",
		"inputGroupAddon": "_29jkAz3K2WA1HpPt6oZbbX",
		"userNameCap": "_2ZB0G3KF0RvESXUb7c5rkn"
	};
	
	var _main2 = _interopRequireDefault(_main);
	
	var _Loading = __webpack_require__(142);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _lib = __webpack_require__(45);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//Import Custom Components
	// import FieldGroup from '../../../components/FieldGroup.js';
	
	
	// Import Style
	
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx('img', {
		src: '/images/logo/instavc-logo.png'
	});
	
	var _ref2 = _jsx(_Loading2.default, {
		loadType: 'white'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
		id: 'forgot_prompt'
	});
	
	var _ref4 = _jsx('label', {
		className: 'sr-only'
	});
	
	var _ref5 = _jsx(_reactFontawesome2.default, {
		name: 'fa-key'
	});
	
	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
		id: 'forgot_password'
	});
	
	var _ref7 = _jsx(_reactFontawesome2.default, {
		name: 'sign-in'
	});
	
	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
		id: 'sign_in'
	});
	
	var ForgotPasswordWidget = exports.ForgotPasswordWidget = function (_Component) {
		_inherits(ForgotPasswordWidget, _Component);
	
		function ForgotPasswordWidget() {
			_classCallCheck(this, ForgotPasswordWidget);
	
			var _this = _possibleConstructorReturn(this, (ForgotPasswordWidget.__proto__ || Object.getPrototypeOf(ForgotPasswordWidget)).call(this));
	
			_this.handleruserEnterKey = function (e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					_this.UserForgotPassword();
				}
			};
	
			_this.UserForgotPassword = function () {
				//alert(this.refs.username.value);
				if (_this.state.status == false) {
					_this.setState({ status: true });
					(0, _LoginActions.ForgotPassword)(_this.refs.username.value.toLowerCase()).then(function (res) {
						return _this.setPassworddata(res);
					});
				}
				// this.props.callback(this.refs.username.value.toLowerCase());
			};
	
			_this.setPassworddata = function (res) {
				// console.log(res)
				_this.setState({ status: false });
				if (res.status) {
					_this.refs.forgot_container.success(res.message + ' ', '');
					// this.setLoginState();
				} else {
					if (res.error && res.error.length > 0) {
						_this.refs.forgot_container.error(res.error + ' ', '');
						_this.refs.username.focus();
					}
				}
			};
	
			_this.state = {
				status: false
			};
			return _this;
		}
	
		_createClass(ForgotPasswordWidget, [{
			key: 'render',
			value: function render() {
				var cls = '' + _LoginWidget2.default.loginBox; // ${mainStyle.bgPrimaryDark}
				var btnPrimaryCls = '' + _main2.default.btnPrimaryDark;
				var clsForgot = _LoginWidget2.default.actionLinks + ' ' + _LoginWidget2.default.actionSeprate;
	
				var inputGroupCls = 'input-group ' + _main2.default.inputGroup;
				var inputFieldCls = 'form-control ' + _main2.default.inputField;
				var cls_rememberMe = _LoginWidget2.default.rememberMe + ' clearfix';
				var cls_txtRememberMe = _LoginWidget2.default.txtRememberMe + ' pull-left';
				var cls_signupAction = _LoginWidget2.default.signupAction + ' clearfix';
				var cls_loginSwitch = _LoginWidget2.default.loginSwitch + ' pull-right';
				var cls_loginSlider = _LoginWidget2.default.loginSlider + ' ' + _LoginWidget2.default.round;
	
				return _jsx('div', {
					className: cls
				}, void 0, _react2.default.createElement(_lib.ToastContainer, {
					toastMessageFactory: ToastMessageFactory,
					ref: 'forgot_container',
					className: 'toast-top-right'
				}), _jsx('div', {}, void 0, _jsx('div', {
					className: _LoginWidget2.default.loingLogoBlock
				}, void 0, _ref), this.state.status ? _ref2 : _jsx('div', {}, void 0, _jsx('div', {}, void 0, _jsx('form', {
					className: _LoginWidget2.default.formSignin
				}, void 0, _jsx('h2', {
					className: _LoginWidget2.default.welcomeTxt
				}, void 0, _jsx('span', {
					className: _LoginWidget2.default.pleaseTxt
				}, void 0, _ref3)), _ref4, _react2.default.createElement('input', { autoFocus: 'true', type: 'text', id: 'username', ref: 'username', className: 'form-control', placeholder: this.props.intl.messages.email_address, onKeyPress: this.handleruserEnterKey, tabIndex: '1', maxLength: 50 }), _jsx('button', {
					type: 'button',
					className: _LoginWidget2.default.btnSignin,
					id: 'forgotPassword',
					onClick: this.UserForgotPassword,
					tabIndex: '2'
				}, void 0, _ref5, ' ', _ref6))), _jsx('div', {
					className: _LoginWidget2.default.singBlockFoeget
				}, void 0, _jsx('span', {
					className: _LoginWidget2.default.singInFoeget
				}, void 0, _jsx('a', {
					id: 'signinLink',
					onClick: this.props.signInClick
				}, void 0, _ref7, '  ', _ref8))))));
			}
		}]);
	
		return ForgotPasswordWidget;
	}(_react.Component);
	
	exports.default = (0, _reactIntl.injectIntl)(ForgotPasswordWidget);
	
	/*<h2><FormattedMessage id="loginTitle" /></h2>
						<p>You already have an account? Great! Login here.</p>*/

/***/ },

/***/ 400:
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var oAuthClientIds = {
	    googleClientId: "8765172091-08v1487umfg8lnig6kje0romqto9r7al.apps.googleusercontent.com",
	    facebookClientId: "824588034311119"
	};
	
	exports.default = oAuthClientIds;

/***/ },

/***/ 520:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LoginWidget = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactGoogleLogin = __webpack_require__(420);
	
	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);
	
	var _reactFacebookLogin = __webpack_require__(419);
	
	var _reactFacebookLogin2 = _interopRequireDefault(_reactFacebookLogin);
	
	var _jsCookie = __webpack_require__(68);
	
	var _jsCookie2 = _interopRequireDefault(_jsCookie);
	
	var _lib = __webpack_require__(45);
	
	var _config = __webpack_require__(18);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _LoginWidget = {
		"googleDiv": "_34oDlzaEJx-oKzPFaI4fsX",
		"gIcong": "RwwgKVwW1CTs-ga0PjA9q",
		"gTextg": "Ls46FqhR8P-kzo1LcFho1",
		"inputGroupff": "_3yrxKD-CfDEDho3ck-beCR",
		"centerLoginSocial": "ow_FDSGusFcI19g2Y5kPG",
		"centerLoginSocial1": "_37RbjBlylfgSF-jwfn-Qej",
		"centerLoginSocial2": "_1AOT0mpVQ1hfmNUPy42hUX",
		"resetMainDiv": "_1NpbF_wgGgYKjoCZLiQlJE",
		"resetinnerDiv": "_3LVYFXEtS1locEPvMmp1R5",
		"resetPageBlock": "_1cbbxbMM60cxNsY1y8tMX_",
		"resetTextBtn": "_1ODF0m4DBefQcRVLOSP3IE",
		"resetHeadText": "_2-G3BI16BQqSEK8RM5b6dW",
		"resetMsgText": "_1muwpmCwDsMO0mH2IkTDpw",
		"reestBtnSign": "_3oSUl8VSQH_JXmcupQco-g",
		"loginPad": "_2kPb-Sin48OJURo3ASzDc9",
		"actionLinks": "IIwf2omHFNuBvDaTZ1Ble",
		"actionSeprate": "_2zJ_0_ojYDnaTMKoFnkOJV",
		"loginBox": "_313CrdybQ6MFWKKC_sZz4l",
		"loingLogoBlock": "_1Bfxxd6Mon1wyeVoYUOhV2",
		"formSignin": "i2jzCweTouZdjkA7hDhu6",
		"welcomeTxt": "R2eOKlLzRvHAocEHETrx8",
		"pleaseTxt": "Bx6s7ZCz_cwLSRuBzVR7L",
		"btnSignin": "_132qy4-9OcziQog4tVbvFI",
		"signupAction": "_3ZhtmFJYd5RFiy87Siqngc",
		"rememberMe": "_1wzbnlxvKClzchwZZ5ljKq",
		"txtRememberMe": "_2FBYWyBkPm-vXHXr3qVlLp",
		"loginSwitch": "V0c1SITbhBAg6FJD8wMIH",
		"loginSlider": "_1k0S8KTihs6IDqXoSBZ-qY",
		"gmailIcon": "_1o2rBC3Ew8Kfa0lAcXdg2e",
		"loginLine": "_2lHu37yWkVfxJLtYEDaODC",
		"guestBehindNetText": "_1QfFYTEuLZjIsTx7oBS8ow",
		"guestBehindNetBtn": "vhDNGF8hyyVPy6wvR8Qxd",
		"btnBlockJoinConference": "_-fbAJXxIgUuy-PSZ9KX9I",
		"guestBehindNetbtnColor": "_2-2x7j8pEuXtSYMVq-XlAI",
		"btnJoinConference": "_3qwGciizrPmkCRoGFTd99B",
		"facebookButton": "_1la4yaAvg3omQ6ZYO-n9mM",
		"fontSignin": "_2_lkwClwY3kguOwZ2UKgfT",
		"round": "eULEBYNu4tmLXVBZgiRw",
		"loggingWait": "_2by_7N9b91zD_eHbXYpUQP",
		"singBlockFoeget": "_1vUwvIcR8UYWp5yuLfSZ6_",
		"singInFoeget": "Ej0vV3iEMgp2jomOrhTAO"
	};
	
	var _LoginWidget2 = _interopRequireDefault(_LoginWidget);
	
	var _main = {
		"btnPrimaryDark": "_31E9BurxzSEZnZC6S2rB5i",
		"bgPrimaryDark": "_2U4iOoVT93HKc6TY3Yhpc8",
		"bgPrimaryDarkA": "_1kioQADujZQ6TylOsfwy3L",
		"bgPrimaryDarkB": "_1iXfj7aYHjrOoIILdN4Uw3",
		"bgPrimary": "_1eK_OqsdSKH6Ww14uPaJ-4",
		"bgPrimaryLight": "_2s26DqNxbSnMNHChD0fpY3",
		"foreColorLight100": "T_G37ZhGLHSGeORUFaMGE",
		"foreColorLight70": "_2s1NjQ5Os0T964m8FaqeAV",
		"foreColorLight50": "_1smo35s1EBd6PlFlaTmOVT",
		"foreColorDark100": "_2BQEmwS-UHhbhJLvwvdFtV",
		"foreColorDark87": "_2TaP0tSvqsm7R6gPLNyFBO",
		"foreColorDark54": "_3IMx-j5u7S6iNsiWtcAKjJ",
		"foreColorDark38": "_29qeAGFHlesOKs1n-FhSpY",
		"mgRight8": "_2hSetRh-Ja8K0N9ugkdfvT",
		"modDropDown": "_2R3XlZjoybwKUxENLMh2D-",
		"infoBlock": "_1n2gUV7cowzrB_Q3Yc8GMV",
		"showInfoBlock": "_1KPirtUqPRullNjnHLv7LC",
		"active": "_3T56peYWObpewAcj6MML28",
		"statusCircle": "_25sEi_zFmPv-fWxe-9MhLN",
		"bgAway": "_3v9ju8fA80XxQaqa1JzHoa",
		"bgDntDistrub": "i3G3SAQvPmTDyNd3mqXQl",
		"bgOffline": "f3sfBt6PB_loBH2cYTt09",
		"bgOnline": "_3K5QKZdjTbK5514T6P-Vx4",
		"modDropDownDrop": "_1wdzau3GcxE3Etdf3q-iEY",
		"selected": "_32LRSkR2VkBF3JW2X7mDtl",
		"modPad": "_3YowDb-oIWUYi2P_azLYfo",
		"inputGroup": "_2JGglWuzl2RwpWz98wQEKx",
		"inputField": "_28ySg1xadRN73pLPNyS0eY",
		"inputGroupAddon": "_29jkAz3K2WA1HpPt6oZbbX",
		"userNameCap": "_2ZB0G3KF0RvESXUb7c5rkn"
	};
	
	var _main2 = _interopRequireDefault(_main);
	
	var _settings = __webpack_require__(400);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	//Import Custom Components
	// import FieldGroup from '../../../components/FieldGroup.js';
	
	
	// Import Style
	
	var Recaptcha = __webpack_require__(529);
	
	var _ref = _jsx('img', {
		src: '/images/logo/instavc-logo.png'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
		id: 'login_prompt'
	});
	
	var _ref3 = _jsx('label', {
		className: 'sr-only'
	});
	
	var _ref4 = _jsx('label', {
		className: 'sr-only'
	});
	
	var _ref5 = _jsx(_reactFontawesome2.default, {
		name: 'sign-in'
	});
	
	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
		id: 'sign_in'
	});
	
	var _ref7 = _jsx(_reactIntl.FormattedMessage, {
		id: 'forgotten_password'
	});
	
	var _ref8 = _jsx('span', {
		className: 'pull-right'
	}, void 0, _jsx(_reactRouter.Link, {
		id: 'signUp',
		to: '/registration'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
		id: 'sign_up'
	})));
	
	var _ref9 = _jsx('h2', {}, void 0, 'Logging in...');
	
	var _ref10 = _jsx('p', {}, void 0, 'Please wait.....!');
	
	var _ref11 = _jsx('p', {}, void 0, _jsx(_reactFontawesome2.default, {
		name: 'spinner',
		spin: true,
		size: '5x'
	}));
	
	var LoginWidget = exports.LoginWidget = function (_Component) {
		_inherits(LoginWidget, _Component);
	
		function LoginWidget() {
			_classCallCheck(this, LoginWidget);
	
			var _this = _possibleConstructorReturn(this, (LoginWidget.__proto__ || Object.getPrototypeOf(LoginWidget)).call(this));
	
			_this.loginUser = function () {
				var userName = _this.state.username.toLowerCase();
				var password = _this.state.password;
				if (_this.state.notarobot) {
					_this.props.loginUser(userName, password, _this.state.isGoogle);
				} else {
					_this.refs.regis_container.error("Please select the captcha");
					console.log("please verify the captcha");
				}
			};
	
			_this.handlerPasswordEnterKey = function (e) {
				if (e.key === 'Enter') {
					_this.loginUser();
				}
			};
	
			_this.handlePasswordChange = function (e) {
				_this.setState({ password: e.target.value });
			};
	
			_this.handlerNameEnterKey = function (e) {
				if (e.key === 'Enter') {
					{/* this.refs.password.focus(); */}
					_this.loginUser();
				}
			};
	
			_this.handleNameChange = function (e) {
				_this.setState({ username: e.target.value });
			};
	
			_this.responseGoogle = function (response) {
				var profile = response.getBasicProfile();
				// let username = profile.getEmail();
				// let googleId = profile.getId();
				var userName = profile.getEmail();
				var googleId = profile.getId();
				_this.setState({ isGoogle: true });
				_this.props.loginUser(userName, googleId, _this.state.isGoogle);
			};
	
			_this.responseFacebook = function (response) {
				if (response.status == "unknown" || response.error) {
					console.log(response.error);
					_this.refs.regis_container.error('Sign in cancelled ', '');
				} else if (!response.email) {
					_this.refs.regis_container.error('Please Login with facebook email Id', '');
				} else {
					var userName = response.email;
					var facebookId = response.userID;
					_this.props.loginUser(userName, facebookId, _this.state.isGoogle);
				}
			};
	
			_this.responseFailureGoogle = function (response) {
				_this.showResponse(response);
			};
	
			_this.callback = function () {
				console.log('Done!!!!');
				_this.setState({ notarobot: false });
			};
	
			_this.verifyCallback = function (response) {
				console.log(response);
				_this.setState({ notarobot: true });
			};
	
			_this.state = {
				username: '',
				password: '',
				forgotPwdTemplate: false,
				isGoogle: false,
				notarobot: true
			};
			return _this;
		}
	
		_createClass(LoginWidget, [{
			key: 'showResponse',
			value: function showResponse(response) {
				// console.log("Show Response", response);
				if (response.status) {
					this.refs.regis_container.success(response.message + ' ', '');
					browserHistory.push('/');
				} else {
					if (response.error == 'popup_closed_by_user') {
						this.refs.regis_container.error("Sign in cancelled");
					} else {
						this.refs.regis_container.error(response.error + ' ', '');
					}
				}
			}
			/*handleForgotClick=(e)=>{
	  	this.state.forgotPwdTemplate = true;
	  	this.props.forgetClick(this.state.forgotPwdTemplate)
	  }*/
	
		}, {
			key: 'renderForm',
			value: function renderForm() {
	
				var btnPrimaryCls = '' + _main2.default.btnPrimaryDark;
				var clsForgot = _LoginWidget2.default.actionLinks + ' ' + _LoginWidget2.default.actionSeprate;
	
				var inputGroupCls = 'input-group ' + _main2.default.inputGroup;
				var inputGroupClshhh = 'fa-facebook ' + _LoginWidget2.default.inputGroupff;
	
				var inputFieldCls = 'form-control ' + _main2.default.inputField;
				var cls_rememberMe = _LoginWidget2.default.rememberMe + ' clearfix';
				var cls_txtRememberMe = _LoginWidget2.default.txtRememberMe + ' pull-left';
				var cls_signupAction = _LoginWidget2.default.signupAction + ' clearfix';
				var cls_loginSwitch = _LoginWidget2.default.loginSwitch + ' pull-right';
				var cls_loginSlider = _LoginWidget2.default.loginSlider + ' ' + _LoginWidget2.default.round;
				var failcount = 0;
				if (typeof Storage !== "undefined") {
					failcount = _jsCookie2.default.get("failcount");
				}
				return _jsx('div', {}, void 0, _jsx('div', {
					className: _LoginWidget2.default.loingLogoBlock
				}, void 0, _ref), _jsx('form', {
					className: _LoginWidget2.default.formSignin
				}, void 0, _jsx('div', {
					className: 'form-group'
				}, void 0, _jsx(_reactBootstrap.Row, {
					className: _LoginWidget2.default.centerLoginSocial
				}, void 0, _config2.default.googleEnable ? _jsx(_reactBootstrap.Col, {
					className: _LoginWidget2.default.centerLoginSocial1
				}, void 0, _jsx('div', {
					className: _LoginWidget2.default.googleDiv
				}, void 0, _jsx(_reactGoogleLogin2.default, {
					clientId: _settings2.default.googleClientId,
					onSuccess: this.responseGoogle,
					onFailure: this.responseFailureGoogle,
					style: {
						width: "100%", display: "inlineBlock", "backgroundColor": "#dd4b39",
						border: "1px solid transparent", "fontSize": "16px",
						"fontFamily": "inherit", "paddingTop": "10px",
						"paddingBottom": "10px", "borderRadius": "2px", color: "rgba(255,255, 255, .7)"
					}
				}, void 0, _jsx('span', {
					className: _LoginWidget2.default.gIcong
				}, void 0, _jsx(_reactFontawesome2.default, {
					className: _LoginWidget2.default.gmailIcon,
					name: 'google'
				})), _jsx('span', {
					className: _LoginWidget2.default.gTextg
				}, void 0, '  Sign in ')))) : null, _config2.default.facebookEnable ? _jsx(_reactBootstrap.Col, {
					className: _LoginWidget2.default.centerLoginSocial2
				}, void 0, _jsx('div', {
					className: _LoginWidget2.default.googleDiv
				}, void 0, _jsx('span', {}, void 0, _jsx(_reactFacebookLogin2.default, {
					appId: _settings2.default.facebookClientId,
					autoLoad: false,
					scope: 'public_profile, email, user_birthday',
					fields: 'name,email,picture,first_name,last_name,birthday',
					textButton: ' Sign in ',
					callback: this.responseFacebook,
					cssClass: _LoginWidget2.default.facebookButton,
					icon: inputGroupClshhh
				})))) : null)), _config2.default.googleEnable || _config2.default.facebookEnable ? _jsx('div', {
					className: _LoginWidget2.default.loginLine
				}) : null, _jsx('h2', {
					className: _LoginWidget2.default.welcomeTxt
				}, void 0, _jsx('span', {
					className: _LoginWidget2.default.pleaseTxt
				}, void 0, _ref2)), _ref3, _react2.default.createElement('input', { type: 'text', id: 'username', ref: 'username', className: 'form-control', placeholder: this.props.intl.messages.email_address, onKeyPress: this.handlerNameEnterKey, onChange: this.handleNameChange, value: this.state.username, tabIndex: '1', autoFocus: 'true' }), _ref4, _react2.default.createElement('input', { type: 'password', id: 'password', ref: 'password', className: 'form-control', placeholder: this.props.intl.messages.password, onKeyPress: this.handlerPasswordEnterKey, onChange: this.handlePasswordChange, value: this.state.password, tabIndex: '2' }), _config2.default.isCaptcha && failcount >= Math.floor(_config2.default.failLimit / 2) ? _jsx(Recaptcha, {
					sitekey: _config2.default.captcha_sitekey,
					render: 'explicit',
					onloadCallback: this.callback,
					verifyCallback: this.verifyCallback
				}) : null, _jsx('button', {
					type: 'button',
					className: _LoginWidget2.default.btnSignin,
					id: 'signIn',
					onClick: this.loginUser,
					tabIndex: '3'
				}, void 0, _ref5, '  ', _ref6), _jsx('div', {
					className: cls_signupAction
				}, void 0, _jsx('span', {
					className: 'pull-left'
				}, void 0, _jsx('a', {
					id: 'forgottenPassword',
					onClick: this.props.forgetClick
				}, void 0, _ref7)), this.props.signUp ? _ref8 : null)));
			}
		}, {
			key: 'render',
			value: function render() {
				var cls = '' + _LoginWidget2.default.loginBox; // ${mainStyle.bgPrimaryDark}
				return _jsx('div', {
					className: cls
				}, void 0, _react2.default.createElement(_lib.ToastContainer, {
					toastMessageFactory: ToastMessageFactory,
					ref: 'regis_container',
					className: 'toast-top-right'
				}), this.props.data.isLoggingIn ? _jsx('div', {
					className: _LoginWidget2.default.loggingWait
				}, void 0, _ref9, _ref10, _ref11) : this.renderForm());
			}
		}]);
	
		return LoginWidget;
	}(_react.Component);
	
	exports.default = (0, _reactIntl.injectIntl)(LoginWidget);
	
	/*<h2><FormattedMessage id="loginTitle" /></h2>
						<p>You already have an account? Great! Login here.</p>*/
	// <Link to="/forgotpassword"><FormattedMessage id = "forgotten_password"/>.</Link>

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _AuthController = __webpack_require__(9);
	
	var _AuthController2 = _interopRequireDefault(_AuthController);
	
	var _reactRouter = __webpack_require__(3);
	
	var _jsCookie = __webpack_require__(68);
	
	var _jsCookie2 = _interopRequireDefault(_jsCookie);
	
	var _LoginActions = __webpack_require__(21);
	
	var _reactIntl = __webpack_require__(11);
	
	var _LoginWidget = __webpack_require__(520);
	
	var _LoginWidget2 = _interopRequireDefault(_LoginWidget);
	
	var _ForgotPasswordWidget = __webpack_require__(267);
	
	var _ForgotPasswordWidget2 = _interopRequireDefault(_ForgotPasswordWidget);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _lib = __webpack_require__(45);
	
	var _Loading = __webpack_require__(142);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _IntlActions = __webpack_require__(37);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx(_Loading2.default, {});
	
	var LoginPage = function (_Component) {
	  _inherits(LoginPage, _Component);
	
	  function LoginPage(props) {
	    _classCallCheck(this, LoginPage);
	
	    var _this = _possibleConstructorReturn(this, (LoginPage.__proto__ || Object.getPrototypeOf(LoginPage)).call(this, props));
	
	    _this.setdata = function (res) {
	      if (res.status) {
	        /*Pradeep + Android push notification*/
	        if (_this.props.params.devId) _this.props.dispatch((0, _LoginActions.setAndroidId)(_this.props.params.devId));
	        /*Pradeep - Android push notification*/
	
	        var loginType = res && res.profile && res.profile.companyid && res.profile.companyid.businessType ? res.profile.companyid.businessType : null;
	        var lang = res && res.locale && res.locale.preferedlanguage ? res.locale.preferedlanguage : 'en';
	        _this.props.dispatch((0, _IntlActions.switchLanguage)(lang, loginType, null));
	        /*prudhvi - showing captcha, after success case removeing from cookie*/
	        if (typeof Storage !== "undefined") {
	          _jsCookie2.default.remove("failcount");
	        }
	        // this.props.dispatch(loginLanguage(res.data));
	        //call api to store android device id in the DB - DSS
	        _reactRouter.browserHistory.push('/dashboard');
	      } else {
	        console.log("res....login page", res);
	        if (res.error && res.error.length > 0) {
	          /*prudhvi - showing captcha, setting cookie value*/
	          if (typeof Storage !== "undefined") {
	            if (_jsCookie2.default.get("failcount")) {
	              var count = Number(_jsCookie2.default.get("failcount")) + 1;
	              _jsCookie2.default.set("failcount", count, { expires: 7 });
	            } else {
	              _jsCookie2.default.set("failcount", 1, { expires: 7 });
	            }
	          }
	          _this.refs.login_container.error(res.error + ' ', '');
	        }
	      }
	    };
	
	    _this.handleLoginUser = function (username, password, isGoogle) {
	      _this.props.dispatch((0, _LoginActions.userLoggingIn)());
	      _this.props.dispatch((0, _LoginActions.loginUserRequest)({ username: username, password: password, isGoogle: isGoogle })).then(function (res) {
	        return _this.setdata(res);
	      });
	    };
	
	    _this.setLoginState = function () {
	      _this.setState({ forgotTemp: false });
	    };
	
	    _this.setForgotState = function () {
	      _this.setState({ forgotTemp: true });
	    };
	
	    _this.renderForm = function () {
	      if (_this.state.forgotTemp == true) return _jsx(_ForgotPasswordWidget2.default, {
	        signInClick: _this.setLoginState
	      });else return _jsx(_LoginWidget2.default, {
	        data: _this.props.loggedInData,
	        loginUser: _this.handleLoginUser,
	        forgetClick: _this.setForgotState,
	        signUp: _this.state.signUp,
	        signIn: _this.state.signIn
	      });
	    };
	
	    _this.state = {
	      forgotTemp: false,
	      signUp: false,
	      signIn: false
	    };
	    return _this;
	  }
	
	  _createClass(LoginPage, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      /*this.props.dispatch(*/(0, _LoginActions.isSignUp)().then(function (res) {
	        return _this2.setState({ signUp: res.signUp, signIn: res.signIn });
	      });
	      if (this.props.loggedInData && this.props.loggedInData.success && this.props.loggedInData.success != "") {
	        this.refs.login_container.success(this.props.loggedInData.success + ' ', '');
	        this.props.dispatch((0, _LoginActions.ClearLogin)());
	      }
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this3 = this;
	
	      // console.log("Comp Mount", AuthClient.getSession());
	      //Should call API only if token is present
	      if (_AuthController2.default.getSession() != undefined && _AuthController2.default.getSession() != '') {
	        this.props.dispatch((0, _LoginActions.isLoggedIn)(_AuthController2.default.getSession())).then(function (res) {
	          return _this3.setdata(res);
	        });
	      } else {
	        this.props.dispatch((0, _LoginActions.ClearLoginData)());
	      }
	    }
	
	    /*DSS + Android push notification*/
	    // componentDidMount() {
	    // var devId = this.props.params.devId;
	    // console.log(devId);
	    // alert("Device ID: ", devId);
	    // }
	    /*DSS - Android push notification*/
	
	    /*setPassworddata = (res) => {
	     // console.log(res)
	      if(res.status){
	        this.refs.login_container.success(`${res.message} `, ``);
	        // this.setLoginState();
	      }else{
	        if(res.error && res.error.length > 0){
	          this.refs.login_container.error(`${res.error} `, ``);
	        }
	      }
	    }*/
	
	    /*handleForgotPassword = (username) =>{
	      //console.log(username);
	      this.props.dispatch(ForgotPassword(username)).then(res => this.setPassworddata(res));
	     }*/
	
	    /*callback = (username) => {
	      ForgotPassword(username).then(res => this.setPassworddata(res));
	    }*/
	
	  }, {
	    key: 'render',
	    value: function render() {
	      // console.log("this.props.loggedInData.isLoggingIn", this.props.loggedInData.isLoggingIn);
	      //console.log('render',this.state.forgotPwdTemplate)
	
	      if (this.props.loggedInData.isLoggingIn) {
	        return _jsx('div', {}, void 0, _react2.default.createElement(_lib.ToastContainer, {
	          toastMessageFactory: ToastMessageFactory,
	          ref: 'login_container',
	          className: 'toast-top-right'
	        }), _ref);
	      } else {
	        return _jsx(_reactBootstrap.Col, {
	          md: 12
	        }, void 0, _react2.default.createElement(_lib.ToastContainer, {
	          toastMessageFactory: ToastMessageFactory,
	          ref: 'login_container',
	          className: 'toast-top-right'
	        }), this.renderForm());
	      }
	    }
	  }]);
	
	  return LoginPage;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    intl: state.intl,
	    loggedInData: (0, _LoginReducer.loggedInData)(state)
	  };
	}
	
	LoginPage.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(LoginPage);
	
	// <LoginWidget data={this.props.loggedInData} loginUser={this.handleLoginUser} forgetClick = {this.passwordState}/>
	
	/*<div>
	                  <button onClick={this.handlePortal}>from Portal</button>
	                </div>
	                handlePortal = () => {
	    let data = {
	      email: "prudhvi123@peoplelinkvc.com"
	    }
	    return callPortalApi('saveportaluser', 'post', {data : data});
	  }            
	                
	                */

/***/ }

};;