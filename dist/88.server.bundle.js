exports.ids = [88];
exports.modules = {

/***/ 351:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ActivateUser = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactRouter = __webpack_require__(3);
	
	var _UserActivateMessage = __webpack_require__(483);
	
	var _UserActivateMessage2 = _interopRequireDefault(_UserActivateMessage);
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var ActivateUser = exports.ActivateUser = function (_Component) {
		_inherits(ActivateUser, _Component);
	
		function ActivateUser(props) {
			_classCallCheck(this, ActivateUser);
	
			var _this = _possibleConstructorReturn(this, (ActivateUser.__proto__ || Object.getPrototypeOf(ActivateUser)).call(this, props));
	
			_this.setData = function (response) {
				if (response.status) {
					_this.setState({ message: response.message });
				} else {
					_this.setState({ message: response.error });
				}
			};
	
			_this.state = {
				message: ''
			};
			return _this;
		}
	
		_createClass(ActivateUser, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				var _this2 = this;
	
				var token = this.props.params.token;
				(0, _LoginActions.activateUser)(token).then(function (res) {
					return _this2.setData(res);
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return _jsx(_UserActivateMessage2.default, {
					message: this.state.message
				});
			}
		}]);
	
		return ActivateUser;
	}(_react.Component);
	
	exports.default = ActivateUser;

/***/ },

/***/ 483:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	exports.UserActiveMessage = UserActiveMessage;
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _App = {
		"container": "_4uEyKcd5WHob5qPzotT7",
		"goBackDash": "rVqW_eC3X5xdbAEEPWOTI",
		"goTextDash": "_3fNxAADkK9yWDbFAr6IeYF",
		"sectionMain": "COZIMIWpKavlm2062DfRs",
		"aligner": "FLVQcC2-9gssOnXND5deg",
		"centerAligner": "Es8zQdVtQLLTnTzA4bWD4",
		"errorIcon": "gR17NZJlxFmunqSl_VnUj",
		"paraVal": "_2v6sCMxw2Fiyrsc-9RaA4C"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactRouter = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx('p', {}, void 0, _jsx(_reactRouter.Link, {
		to: '/'
	}, void 0, 'Sign in'));
	
	function UserActiveMessage(props, context) {
		return _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
			md: 12
		}, void 0, _jsx('div', {
			className: _App2.default.aligner
		}, void 0, _jsx('div', {
			className: _App2.default.centerAligner
		}, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
			md: 12
		}, void 0, _jsx('h3', {}, void 0, props.message, '.'), _ref))))));
	}
	
	exports.default = (0, _reactIntl.injectIntl)(UserActiveMessage);

/***/ }

};;