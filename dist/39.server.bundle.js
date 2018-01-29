exports.ids = [39];
exports.modules = {

/***/ 0:
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
	
	var _reactRouter = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //Code added by - Najib, Desc - All restricted users are redirected here. As "browserHistory" is not consistent in routes(Some time throwing error), users are redirecting from this page. 
	
	var _ref = _jsx('div', {});
	
	var RedirectPage = function (_Component) {
		_inherits(RedirectPage, _Component);
	
		function RedirectPage() {
			_classCallCheck(this, RedirectPage);
	
			return _possibleConstructorReturn(this, (RedirectPage.__proto__ || Object.getPrototypeOf(RedirectPage)).apply(this, arguments));
		}
	
		_createClass(RedirectPage, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				_reactRouter.browserHistory.push('/access-denied');
			}
		}, {
			key: 'render',
			value: function render() {
				return _ref;
			}
		}]);
	
		return RedirectPage;
	}(_react.Component);
	
	exports.default = RedirectPage;

/***/ },

/***/ 305:
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
	
	var _reactIntl = __webpack_require__(11);
	
	var _IntlReducer = __webpack_require__(141);
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _Validator = __webpack_require__(356);
	
	var _Validator2 = _interopRequireDefault(_Validator);
	
	var _SubMenu = __webpack_require__(354);
	
	var _SubMenu2 = _interopRequireDefault(_SubMenu);
	
	var _TopMenu = __webpack_require__(355);
	
	var _TopMenu2 = _interopRequireDefault(_TopMenu);
	
	var _Chart = __webpack_require__(384);
	
	var _Chart2 = _interopRequireDefault(_Chart);
	
	var _component = {
	  "form-control": "QmIrbtmLmFNpHdWMqFMWS",
	  "innerWhiteTopic": "_32MPoieZt8YkhQqGNafOkY",
	  "colonBlack": "_3WjF6qk6LGz-u5ks49gdcB",
	  "error": "_3jAfmA6J7YmNDyB2VfsCxP",
	  "mandatory": "_1cwTV0Re5ORIhqzxJLXMH1",
	  "dynamicBreadCrumb": "_3QcYRL_UPZtqWKDFd5rcZB",
	  "iElement": "_2crZNiFs8z8oNhzPDC1qOE",
	  "oElement": "_1jUn1j1KBWo8dmqJ_0hdBD",
	  "iLabel": "_3Pyvct_srCoSvJCgGG41jw",
	  "oLabel": "NsxWZpxBqBX8wky_O477_",
	  "iForm": "_3IlToa7pigrSS8KWut_dJ8",
	  "oForm": "_3N0YNUcfI5U02VSmBEbYot",
	  "iFormField": "_12yKSn29WLZIE6fvGQfcrN",
	  "oFormField": "_5FMFIwRlrpPkQn-lkZ65Z",
	  "iFormGroup": "_1LZRfACwm57iOGUxKozUVE",
	  "oFormGroup": "_386CxczA49XX2-ejr3Qe55",
	  "formNext": "ccTxjcG6_GZO9OgzW33HT",
	  "iSubFormGroup": "u1jVXJqFT0vqGYzzRAhFY",
	  "oSubFormGroup": "DDmyOnrHoBdsklkH9petO",
	  "iContainer": "_2wz-gNWcGQfLXBCiToDWjI",
	  "oContainer": "_2tEAAtqgoutuOUU96rNvv1",
	  "iSubMenu": "XCOXe3mm5CZP0qxtnZPyC",
	  "oSubMenu": "_1Rx5COiw9Ae92TeE3LnwRm",
	  "iTopMenu": "_34RmLz4U_lA3sL18SjVR2-",
	  "iMenuContainer": "N8LzghkGxja2Hkx0A-vzE",
	  "whiteTopMenu": "YQfoPq5fhhEoPFvP-VF1W",
	  "iSubMenuContainer": "_357Fb5CZ0VyABwYB9VmmIE",
	  "active": "_2fF1Q9nO2O_1B8Ldb4RM52",
	  "scheduleerror": "_34M0UOwV0tW7xV7AV2Cz7P",
	  "errorPre": "_1ft-as7ic7_8EXp1iz5sfW",
	  "errorclass": "_3jvk8bfxyC_tWLn1pBOytU",
	  "whiteCard": "L2E7_Tzcp2MrkuuUlBf3t",
	  "greyCard": "_34l9W17Mt1koxHLd1yUqgk",
	  "reactTelInput": "_2OA1bLJ7mQFTEL9gP1dDif",
	  "countryList": "_2ARbPU2OQ7JLphJ2g0U0F-",
	  "react-tel-input": "_2PMN3xMEp7kCR8iQoBjSrd",
	  "ad": "N3bKXyhfwvWT3eAEC9Nno",
	  "ae": "taXUT8yfjgRMeSH3rMNxy",
	  "af": "_2vH4qShCgBPBO4GR8BdNvd",
	  "ag": "n8QfWtvpZLMpatCUqX2Td",
	  "ai": "_3fPX_RcpesOPxFsmsaygCE",
	  "al": "_1T12tbcC6990b-fIMG5LYW",
	  "am": "_31HdarMDfXvAgjizVUoeHk",
	  "ao": "_1Zb9qi0G-pe7OWK-cu6BoS",
	  "ar": "_2qJleMgRbIErIrx3kQF57O",
	  "as": "_2ZPVYL8Vjn-vdWZToCEhjN",
	  "at": "_1hWilvnrVbANEHRyLGlF-m",
	  "au": "_2zJE4K6o-ftWqhb3exXZgk",
	  "aw": "_1UroMxX5JHt9bjGdHwa1OY",
	  "az": "_-Y2xueZ_1mEtB9YDOqEGB",
	  "ba": "_2FSEeZiYqoYo0pJ5J2uXJC",
	  "bb": "_34600Kl8Wac9Hx7S3-3U6b",
	  "bd": "_3WBX90V5VJXA7-vSUfEWCh",
	  "be": "BcK33edOPcbYdkxxvOApy",
	  "bf": "ShN64-J7UZdswoQjkf7L_",
	  "bg": "_2A9PgkQEF5_KbvHvDf6_lY",
	  "bh": "_10p3rxNRYOhv8-BtZuq1w8",
	  "bi": "_6MzP1qXXDFAZVL7nBmRiH",
	  "bj": "_2U8H1sji9LfDEW706KyKvF",
	  "bm": "_3AOdFLNLEBMwpaIygqQ4Zo",
	  "bn": "PgMDvF79WHl3kaklOmhw3",
	  "bo": "_7MheGVInaTi-QLxw5PiUi",
	  "br": "_1BDNUyT0cHDlbCBFgrrLkJ",
	  "bs": "_3vcASZB5bu7mJAzTzaRkWe",
	  "bt": "esu4pvyd9ZFWrf-etnrva",
	  "bw": "_2Hbv1I361RJFK3Ph2xPlu_",
	  "by": "_2tbYam6Og8RAicMhX9SXvI",
	  "bz": "_3xB704PIgqFnU2zTG-JZFN",
	  "ca": "_36FyK29nkNl9Ez7yWh04AS",
	  "cd": "_9PnHTqK1pSn_GIAbBtPT2",
	  "cf": "_2LgMF7o1A3a2cgw5jkpvZV",
	  "cg": "_3hYc9Y3UdCphltZKe2vJWk",
	  "ch": "_3BLJ9WmZAyoQNVnGDTm0hl",
	  "ci": "FoSGkvvMDFAVcvsZBWX-Z",
	  "ck": "_1742IgEaHW3SZU7h_-nkwr",
	  "cl": "_36IaMt7ntEwUsH4lwN4tW-",
	  "cm": "_1N8krqbPtlsEVsh6SaCetm",
	  "cn": "IfkD3fwbUSx9FZflX6iIU",
	  "co": "_3Y7u7ONzxyZVjZYzS1OHTr",
	  "cr": "Gw5Qz4qBNZjPDmpQmi-d2",
	  "cu": "ZuHtEp_knwZcbwTTJkRgI",
	  "cv": "o6BzJCyjRH1pOsf_HpbQ6",
	  "cw": "hRElJCQXyNIITDZ6UQVut",
	  "cy": "_2cHKWrINPNO6L8BEOdtJCG",
	  "cz": "nS617LE8Qcckdv9HJTWpt",
	  "de": "fqJD93WBywDPs0lrLEXLT",
	  "dj": "_1Rb2ZC6bLR2kLQHrXt3fi1",
	  "dk": "_3fpBLMtuUi0kowy3ziMRYd",
	  "dm": "_3gMwGkQW-OGFx1U7vd7VMD",
	  "do": "G9EZGjpXLJUyQuREesyGO",
	  "dz": "_3Nka0vwv6nZpeugyuqYQIJ",
	  "ec": "_18t83SdIOs8EY6iF0zV0CZ",
	  "ee": "_1miCbYr55XmBKvcUu6XetR",
	  "eg": "_1T55wMh1svM7M5QGxFM2ex",
	  "er": "c0Ab9spCQ4VnXr_6xijnD",
	  "es": "_1lutiEL9tJpdNgKmnTT6Ld",
	  "et": "_2GGXIPO2kOV6CUsu65V4Z3",
	  "fi": "_1I-g5oWpQznT5QZuBfQ8A",
	  "fj": "_3oeTP_GhC_XzsjzHW86oDc",
	  "fk": "_3-_BjK4NArHS0nyf0DLc4F",
	  "fm": "_1WQYGDC-zTatxog3SIwE80",
	  "fo": "_2Xp5yMjRKQGGiCb4PPbdrr",
	  "fr": "_3-mqatBXfaTfex8LWjnIDA",
	  "bl": "_3QJ0ZMybaJjeqWZHvkXeIl",
	  "mf": "_34f4ya9mcbpIcQPgHJ4I6c",
	  "ga": "_15_iO4CJaXbX7PySxoldPF",
	  "gb": "_1vZuFSSey59_ixozre-0L_",
	  "gd": "_26Ub0jcjDpVD4nwM7m5n4e",
	  "ge": "_27ctDR0Hf6HO15MgHS8wyh",
	  "gf": "_2S6C39D4wNBuVSqzYM5Ldy",
	  "gh": "_3vjGi6-umA-RzwxRFaTfNN",
	  "gi": "_1VP2WL3_4ou1de2Ng8Wmd_",
	  "gl": "_1OTvyS4D4UOkymKuDLxUdx",
	  "gm": "_3-0gezNOVCHKzaLYGUySo2",
	  "gn": "_8f6uadrEfnS9IX8DEIpKO",
	  "gp": "_36yEj9UcEbZcI0WJvgmk0B",
	  "gq": "xHX18x9xk7PhDBlgsvnad",
	  "gr": "HTk_eFej1VrCiBuKBIfLT",
	  "gt": "hgmUbzxaHNZNL6frPhPeb",
	  "gu": "_3qeSb_MjyQ-VPPpwNWgXpl",
	  "gw": "_36JwaXqhh4gBrIvAy4c1KO",
	  "gy": "_3ZZcZTZlIH4DUUQ2BIamaK",
	  "hk": "_1mT74O5OVtonPLmYnVVOu7",
	  "hn": "_1ze0KI-TYxTrDcXlMOu24s",
	  "hr": "ZIDUSRfcbDCZTyhqWGPob",
	  "ht": "Y65Ad5pf3z7ufcknP0vhk",
	  "hu": "_3EHKICvcensXt5hEu8Nkfs",
	  "id": "_3oZE8uvxIFK7M9DCEtsSCD",
	  "ie": "_2RNmpg94YYioQp2fWyz_xn",
	  "il": "_2Mq_no7KYxPp2NSLGS1Tcs",
	  "in": "_1UlEZ269GihRa58c5mCEBN",
	  "io": "_3ovelrc7S_DdmXxL-8uuwk",
	  "iq": "_3VSlK6DYHrBgKbkE2Rng2N",
	  "ir": "NRX2sFBmuPSJ9EOigyuEP",
	  "is": "_25HaTNE7x74CJO9S1mnm4I",
	  "it": "_1-LmlhbrcpKN-xjESmR_sO",
	  "jm": "VsvDBply-4FtMoJhi8Cvu",
	  "jo": "yEE3hbkzWK8CSCrCJibCo",
	  "jp": "_3oxjjz1uD2cX2QsoSToLgz",
	  "ke": "_1ksOT6KMPd99EWuWCXPga_",
	  "kg": "_2CMnR3yv5DGwDc8p3uoOjp",
	  "kh": "_927b1QnaSWnN35i3bVewJ",
	  "ki": "_2CuDp55lqYTpFp68D4IWep",
	  "km": "_3tvMTeZYZMzBB9bGn9lV9E",
	  "kn": "_6kbCvwc22pJX0tNv3HToQ",
	  "kp": "_3tIPOe5PNrHH-bgCGaZTJj",
	  "kr": "_2653rpVUuy3ETaw1mogdnF",
	  "kw": "_1SKg_lTe0ShbPSOl44eKjp",
	  "ky": "tgj8SOv7bYoF7qfbbQWNG",
	  "kz": "bchn50J152EdQa0zf3k5u",
	  "la": "mu9oycLgpKX8_yLLkR5b9",
	  "lb": "_2TcAFbagIrNyc6mgzRVNW0",
	  "lc": "_2IFItnUNT-albvpN-ksxd2",
	  "li": "_3_E6nQspv6zJQLQI24puaS",
	  "lk": "_2M2wq3qQhGeUegbBTs7ilH",
	  "lr": "L4o4xOg0s6QbasyIRPgyF",
	  "ls": "LhBB6SRin61WSFtUwaEfe",
	  "lt": "ITDUphrnMkKItKGMVHZf8",
	  "lu": "_1mVW30sc4i-1M8tDPCQlL",
	  "lv": "_3rq6vE2IagAsGI6iESAcJq",
	  "ly": "_3se_Nzm1WQrEN3VZYiJJrv",
	  "ma": "_fSDiNxp_jjfqkQcWffDM",
	  "mc": "_2hRTRZeBtDGN4mNeWBZVgB",
	  "md": "_26jDl0skadEwmUYDGmEzST",
	  "me": "_388lJj_7sQdyd9HL7pMrar",
	  "mg": "_3aFoqVWcvG3p47Vwa6UuoE",
	  "mh": "_1YHi6OtXmKfP15ZNbwYGgy",
	  "mk": "_9QVyhHcp8yH762J8fWXhC",
	  "ml": "yYD99PoyhgFI4912_qoyJ",
	  "mm": "URzk8-j7LcySpGUMJf_Qk",
	  "mn": "_1J-lktQUTK0rydBz3foJGF",
	  "mo": "_1sbL0zhHof-KbfGWu2qjqF",
	  "mp": "_1tJjJlSjRw5AnqcXXmGwCI",
	  "mq": "fHob9sxaJrTuqSc0xL744",
	  "mr": "t-Bmj7a31aA-IwcRcL0ua",
	  "ms": "_2xyT54DQP62zWDySH7-Kdy",
	  "mt": "_1Ul_OlGODc8S0QplVq94PV",
	  "mu": "_1yIBERRJqnV33pTq2VpKRc",
	  "mv": "_3VqQ1QKRZyrVO6o8AvYgsR",
	  "mw": "_3i8n-5-htdGNJLgn96O21",
	  "mx": "_16-6zoyiVzSGB1O72cUTzV",
	  "my": "_3W2P0D9eTN4BQoOcThOsaM",
	  "mz": "wJ8icX7Asp3dSImkXOdTM",
	  "na": "_1qt_F94mybbX5kr0ArtN-Z",
	  "nc": "h82AMIuCGdKf69Hc_nM6D",
	  "ne": "_2mVa5nGsijzD93WRl8dk64",
	  "nf": "_3XQ9oUH_84SsdZLjpVRuqT",
	  "ng": "_1uyyH1GZjsEk3YpaUSmmG6",
	  "ni": "_22_3H6UeFo26o3fSavtQaX",
	  "nl": "_93asfBYgR8C7bEDucZO8l",
	  "bq": "_37A1nwIz7Z3obwUjmliw4s",
	  "no": "_2-sVmkWiLn_ogTikc0c0Eg",
	  "np": "_1PqZSwf5cuMNmbE7bpKe67",
	  "nr": "_9q5Rg9Xn0G2buivFSGySP",
	  "nu": "RLhVdyjL9Cex8ekaJqirU",
	  "nz": "_1LHfwPg-iXjSTdjVKJ2BYn",
	  "om": "_9mZYNhgBLiQg-j1FeVprJ",
	  "pa": "_3S7TrzxJIEYVghUMVHB6E7",
	  "pe": "_3V5sP7VvdGOFqApj7POYl2",
	  "pf": "_1YzdrkyHO-eCcEFF-hjZl7",
	  "pg": "ddWAanlQJPlB0QDWO6dAF",
	  "ph": "_2TGbmCcqHlJFCssz78MxOs",
	  "pk": "_2JerTABYGCUN8FLjpnDzKy",
	  "pl": "_3X1Zo6JhS7aPUTPWCBJyzX",
	  "pm": "_29Hoo7EsoSHtvRFvlVg2cD",
	  "pr": "_3_pkwz60KLoYcbKwaRvIsS",
	  "ps": "_3jenITZ_yUYS7kU1HwFEHj",
	  "pt": "_1vz8ABWy5Yd43_JhaTWq9u",
	  "pw": "_3Yr0RZMbOD2QJkTtMx_HIk",
	  "py": "_1_W41pJLcGMRhLdU997clv",
	  "qa": "Z0tjAakoNSOs14KuenmRi",
	  "re": "_3k5KF4jzE7HUitQw9MQKnp",
	  "ro": "_2b8XhT3-7NgjAC8gJJkpis",
	  "rs": "_2MUJr9MQbiKRTd_g0TaRQr",
	  "ru": "HjzPW2CxxNMSGZw1ugFW7",
	  "rw": "_23TGIOoPmB9QYqIPG6W3tA",
	  "sa": "_34WM8rSonfayW0vJ3koqJS",
	  "sb": "_3486rZNsCjvTmIoHbjK8mG",
	  "sc": "_3meAM_iQCU6MyfPQJTN3yl",
	  "sd": "_2x6XeHNF__4s9VVfFXCJhO",
	  "se": "_66VDclGQXxpdUR8uE3ZFa",
	  "sg": "tv3I_hfLcUJ_8i9ewVcUz",
	  "sh": "_1syDbbhbumwMwwD7Dwkb1V",
	  "si": "_3jsffwJjGr2sMEofSTTGkG",
	  "sk": "_1EpYAUcQLCqbYB48Auixqb",
	  "sl": "_3STJQv9nY5mol4cW82D2ci",
	  "sm": "_9aTR-AZMTaYHRmDVAyFTM",
	  "sn": "_3mTatYTWeJQQACfV7xzRhi",
	  "so": "_1LnWon2slwLMqAHzhkRT4c",
	  "sr": "_1GSedFwSsf5isgOi3p0x6U",
	  "ss": "_1sq99LOjKKgery3luOXOFn",
	  "st": "_1O6vYx_NaXFBAs1qYxgwaB",
	  "sv": "_10D9RGnRzUv14bYWQaC23c",
	  "sx": "KonDEEzH2JzIWsVUBzFdY",
	  "sy": "_1ZAnqGYeixOJVFwwt6hNIo",
	  "sz": "_3FeOFkec3sXYbvQhWDdIM7",
	  "tc": "_1FZvldKEV-vz12TyyNfEf",
	  "td": "_31fysfDRtTWVKcX_UjX0ty",
	  "tg": "H60Kyr6MsF6nvRz5l7EfN",
	  "th": "SHZkbUz1c_H_zDOfxLc4",
	  "tj": "_2MRI0fA4OLgepXVooYMu9H",
	  "tk": "_1W959S9LHLCKhz3xi4MpHe",
	  "tl": "_1lMF_0nwQXTyBRRzRj7hBF",
	  "tm": "_2ZB_Dy2eRo6J0ylRkqC62I",
	  "tn": "_2MeGi_bqLVuCaRtJzs3QqA",
	  "to": "_3egwC_50WENVPaap_uwXr8",
	  "tr": "_2KiPy3o6m7JCKQWPY2fI1d",
	  "tt": "_3Hbn6Wi0dSnyrjdgeMmYmf",
	  "tv": "_2D9VWSmHkhgNemAaIKF_cp",
	  "tw": "_2J7nVAh1zEa7kV5Ba51CLV",
	  "tz": "_2acF96LLqMjlbfMX1oiAjT",
	  "ua": "_2rr3Tyr8dP6vDvE0khEDKT",
	  "ug": "D7gjzKmlr78rNWXXw90np",
	  "us": "_1l5RtWI_acgLVeCd5fjgHG",
	  "uy": "_1zX6hTsIa2TtL6dgR47eQ9",
	  "uz": "_29NUL3VtwK1_RWUyPsY2ei",
	  "va": "_39kTgRBkhqqGVLUTJvK_67",
	  "vc": "_2EwnB8Pe5TZDGdNIXOvzzg",
	  "ve": "_3Lk2Svkm2NTAVpUfiY_No5",
	  "vg": "_3SiYuGrNzW9DNkXwTZugyj",
	  "vi": "_2BiiERObu5xcE6P1SZxLdj",
	  "vn": "_3kSg6iW0KLoUpJ0g70fckK",
	  "vu": "_1UdrzjuDjSDu6-DJ5yV9cQ",
	  "wf": "Arz0xEqJcbKbLmPz_tXTS",
	  "ws": "_3oTaxcmbTriEd90-cXNqD8",
	  "ye": "gxtmCiQO2ao4JTQXuRUIJ",
	  "za": "_25HyrYKmQQAteF_LwADnIt",
	  "zm": "Kui2u7hZHcNBqlzbqR-vQ",
	  "zw": "_3VPnIcPuwZ3cFvNOHPN8ar",
	  "hide": "_2kO_U0LXcg71jJA6RSia2e",
	  "v-hide": "_2HBc009zwTsSlkh8P8tH10",
	  "invalid-number": "_17iYQoyXCPAB8XfsRqDdDH",
	  "flag-dropdown": "_1JTLnRuUJ50FBWDCCCWc4b",
	  "open-dropdown": "jG7mLbpUfq5nh2TzhXfBa",
	  "selected-flag": "_10c169vRt8V92_nQ_S0KtR",
	  "flag": "_2AEEM5AZQcsUPJUQZSd8Rr",
	  "arrow": "_3GOH36qvhOwAJd2ppQ3AOB",
	  "up": "_2ykRnfq4f2nlmZGfvzrn92",
	  "country-list": "UlTusogWL2urjgGgLNpcD",
	  "divider": "_2zMaTbM3nSdE07wOs7YYRt",
	  "country": "uL848pHFWhb_G94Ak-KX5",
	  "dial-code": "FxUYLz6b2tBEUXdb9DRqQ",
	  "highlight": "BLa_2aA2PkYD2PsO2fvNC",
	  "country-name": "_3ih_ovRiGmAkpjxuz63nhk",
	  "uploadFile": "_3CUi48rtxy1m3Wz0o2aHk_",
	  "fileUpload": "_2WENukerx3mNXkTyu0UXQf",
	  "uploadLabel": "_1VYdz-DRIuPqCKWlu5Rd5W",
	  "upload": "_2DUvBpBYzPWlV-6Yx2Pjas",
	  "blackTxt": "Z1W_HNjnSJTqNclgOwR-3",
	  "feedbackTextArea": "_14APtzGfaR_yoeAQJMJT5z",
	  "errorModal": "_2PEnO-md-8qd3dF2cZGhMD",
	  "gradeColor": "_16sNzVDnEzucQAxknLYKQQ",
	  "red": "_3wj0AXV9gqX9YG1nk-2u9J",
	  "green": "_3KPVxc3su8ewtuKZgu8TGv",
	  "orange": "_3cLlE5QI9XJwY6e7jO5bLg",
	  "capitalize": "_2yqvFrqWq4uakYy_s3eeMY",
	  "importBtnBlock": "OwSu91np9HnUW1VdSX5hA",
	  "importBtnUpload": "_2eJ0cgHJ9Qj4GAz9x1jChE",
	  "importBtnInput": "_3ZCvqG4C-pjYzfgVNN8eze",
	  "icon": "_12rnwIUewKT2PdtWMnNyD5",
	  "importFileOnclick": "_2qsz43E0kYpZO89nXXV13S",
	  "broadcastWhiteCard": "_2Vf8tRdA-IkCpzrPwrxoLi",
	  "broadcastNews": "eK8W5URbLbE8ER1zsFc6V",
	  "btnPost": "_30ipfhZp6Vv-ikKnFNtEI7",
	  "textArea": "_3uPzOKXSyhgfRUhfmeVwfC",
	  "spinnerCss": "_1ouaIjiJ2MFv5PI5UqZ1ev",
	  "pdfView": "_2DquMFdC6rEzAaWJ2U-ahy",
	  "lineHight32": "_3RF4CWuoSHP3JddZnzrhZh",
	  "removePdng": "_3XuIzA6t9BoFiZfEFhOn3f",
	  "inputAllCap": "_6YEeMYUnLHaS691RRjq7L",
	  "popHeadingAll": "_2suWB3cd5kOd2yUCJCr640",
	  "dateControls": "_1BrlYTxzEBCsm_zJ9PPGkp",
	  "dateRange": "_1JBu7w3GlOnQBH8oh1-EXg",
	  "applyBtn": "_2Rz8lBsFU8i7B9Ia-G-cv3",
	  "filterTxt": "_1Wdy1Hr8CUuuK8O9Liz3yi",
	  "btnApplyAll": "_1Y_QiGh-mkiUfuuiix0Yeb",
	  "assCanvas": "_2Ue4kVYDy-eQJrbNCKv0yC",
	  "pdfBlock": "_3UAEHpi6NrNz6ZDh2Lfk0E",
	  "assTab": "y4LW63OuadI0JWTQBnbJ1",
	  "heightForScroll": "_1s76YPnhEAnqK63LsEzIZh",
	  "radioNewProfile": "_1RD_hASO-4hwDMMDABPgkH",
	  "wrapper": "IVU-3tPtgRn_cBMA2jD_Y",
	  "leftBox": "_2c_UkbRVkIhCuEx7sFrhEz",
	  "rightBox": "DP21PoKxwKk_vJyOuQTcr",
	  "gradeBlock": "_1KaDEKb6KgB6xx-gEx-KTu",
	  "actionBoxTop": "_10AdTDYinFiKZ9H30uacSD",
	  "gradeBody": "_2pAeBQb2ZLvpxG09x5oJnS",
	  "actionBoxBottom": "_1UHK6epVvw6XZJ1KLDuQuI",
	  "gradeGroup": "_3VI0hvgPHy6r31t8WOJVDq",
	  "morePref": "JBm94eKPIFI8vfiroATJ6",
	  "tile": "_1Ssp2zTovh7AwJWuRkgnge",
	  "tileItems": "_3cDqgy8AedDYzhy8Euosis",
	  "tileHeader": "_1LhZQenbqV0FNu-ykdOEI3",
	  "tileHeaderLeft": "_2MwtFA5OodvfH7RxQPCPQ_",
	  "category": "_2Ow56TBY2Y24yY5SjVRU4l",
	  "innerScoreBoth": "ndEN_RpJfrJ_tKG_RA68v",
	  "maxScore": "_3uL97t2vemfuAs83cAFhjE",
	  "maxScoreInput": "TKf_xWbkl0UNSxyusGMn8",
	  "scored": "_12gGWK_s69JBGzOAX7ClkT",
	  "scoreInput": "_2Mk4HrrcAyqwuFRTOgl3lh",
	  "remTile": "_3vgBsvWRGVVRwIEDn1TquO",
	  "tileBody": "dF1WC_PeNjG87K2XGMIcS",
	  "tileRatings": "_2CCbhFQsjWGMpVC9Wui7Vr",
	  "gradeBox": "_1yi9i3Jl0hqMYPn1Tgv_cF",
	  "gradeDisabledBox": "_14nvGiDb0wY_EIfoptsCdF",
	  "assignmentResultActive": "_2tWSBiPrHoK1xrmZ6QsC-W",
	  "blue": "K7acjAQMroOGGtUqqojYy",
	  "yellow": "G7N-PGOIbGO_ZkaqBu2mx",
	  "txtGreen": "_3ozvzoCtqRqS2AzlUELKKF",
	  "txtBlue": "_4IOpBzUT2qYXMYt5UKiJP",
	  "txtYellow": "_27BE3ODkiyosiM3HqlgtFT",
	  "txtOrange": "_3uTqWL645yWk5qXsaxxH_M",
	  "txtRed": "_3WDBRR7fo7Gn2KKo7rrE_Q",
	  "txtppl": "_3nfbHs21ZfqnZ9n2wICEDb",
	  "addTile": "lCw_kxhsAPcuM3yFAqvpF",
	  "addContral": "_1aQuHhQkJrKTdNBYcoAQFh",
	  "addIconCircle": "_2lFLErjrZAe1ZXjCbykAVD",
	  "commentBox": "_2h0b9sj0Y_QpQzSh6njVoO",
	  "totalScore": "FDG4LAia-7JDDtxb7R4Kb",
	  "totalScoreInput": "_23XbNFEiJgqq0S35rhnpj6",
	  "textBox": "_13VdIFmMegxz_eR8VIXN_M",
	  "totalScoreSpan": "_2Pj4PN_f9FgyLDc9JE4vu9",
	  "totalScoreText": "_1YbsVQIx_uSOAygZtwoTNK",
	  "resultBox": "_3XB8yAFjZjZubswP7rs3Lt",
	  "resultBlock": "FmvbKk1ChtYs7Lm76nRaX",
	  "resultHeader": "_1AWxMTonqDqoWhnz1g9d-d",
	  "headingTxt": "_1GSvGEp7hTrEpIa-UkynQZ",
	  "scoreBox": "_3HTg1VUMSPfLvdZUBsj2N_",
	  "resultBody": "N6kKlySaRGbRcB4bBmpZ0",
	  "resGroup": "_2byM-_1N3yjHb2dpmlikdf",
	  "resTile": "DZeuj4DKkdAPKCgYd76RK",
	  "resCriteria": "_22AwZF3M7Ffw8GTgoz2DSi",
	  "resRating": "R7j9mxFZmdmLgC7bPXpyN",
	  "txtSize": "_977ldMQMMiHQ0YG_61T3g",
	  "txtplBlue": "_27vNfTLrgUcEIvntpfFS_N",
	  "resScored": "_1T5pr7r7hw9rq_NyVSB0lM",
	  "resInput": "_14gsxA36f-uYOfxGDvr_gi",
	  "activeTxt": "_3mkD5eqWDun2pAM_mx16kZ",
	  "feedbackBox": "_1ae7KB7aTT79QKO6O85GzI",
	  "fbHeader": "idU-Kkkc7R8cdYS_Ayh47",
	  "feedbackGroup": "AKd59EZ_Qjl6GE1amJRlx",
	  "profileBox": "_1JFzTlQEl2bDxwqAx77fbj",
	  "profileImg": "_3k-2OFHHSzyQUB7Zkcc21l",
	  "profileDetails": "_2wxDQDzYCXmmG6lQaOlEj7",
	  "name": "_25-6SxUiv8zhOMEVTRrg8w",
	  "commentTxt": "_2tLMve1A4CHR8jTUu5J1jI",
	  "addpdng": "_6rQH8tivz8ELIWszpbahs",
	  "good": "_3lOxcxDfxhPcuhLBJHo4Ur",
	  "vGood": "l_IAfocpDxfvpU316U0EI",
	  "fair": "_3I3YapUnBVxgs-ZsGf3Poh",
	  "poor": "_1uSJT6ULTWAvr1S_77KhIZ"
	};
	
	var _component2 = _interopRequireDefault(_component);
	
	var _Admin = {
	  "form-control": "_3f5Ek_BxZWp4TgAvO9iMgx",
	  "progressLabel": "_3-0689LiR7tz_vbtEfR1IJ",
	  "progress": "_32kzRKjl47M7AcFAivyyho",
	  "progressBar": "_2tVD6KALTWwOtUWFBlQDYS",
	  "progressBox": "_2Qr6h8u0j6wWBgfM9ImZaH",
	  "backButton": "_1mSyVAqBsfEZTzTQCfa3-K",
	  "containerRight": "_3tnvGMV_GO0AC00W0gw2hh",
	  "googleContainer": "_1G8DyX--1Xskim3uSHbxil",
	  "googleContainer1": "_1ZjsrGjPe95kiwJYTjPkf3",
	  "googleContainer2": "_1Mz0pDpSBEwdM2zIV6C6fv",
	  "header": "_2xHja59x-eRkfv95koY1ce",
	  "hdingTxt": "_2vmmaaBm31MpdA6XdlLb-a",
	  "body": "_1wybmROxdPMB2DSkLyTGGx",
	  "navRight": "_2fWAne55trxpJYagJCezpL",
	  "navHorizontal": "_1A7tvkxk7I_j5nNLuqefTL",
	  "active": "_1mqL1x9MCLjw6_Ok5T24oF",
	  "midContainer": "_1oKiSeTflL6v2wZC13o7oC",
	  "formField": "P8wcycRRhQUOqnf0qytj0",
	  "profilePic": "_3aRF_0HyetnxrqWGcm1aLi",
	  "fullname": "m8-V01m5JYGd00wGYRCbo",
	  "position": "aCZ3mMjMPWmB1Xr4poVi_",
	  "txtContainer": "_3ClFeWgw-L5WuuBj8HkrvF",
	  "plagiarism": "_1AZ5VzYP5cYxVevuaI0oMO",
	  "inlineEditGroup": "_2N66DG2rQQKSPETQ6mawRj",
	  "inlineEdit": "_3DdeSJlCLh_AOUeDMiLm78",
	  "inlineEditEnable": "_3Zaq8ayjsOGjyHa2auG-U5",
	  "inlineEditGroupFlex": "BXy72cn-LPpnSIiPDnhAb",
	  "labelResultFlex": "rAVOuVWP50uwFnw-Oe-bE",
	  "viewImgFtrAction": "_2_Bz03CKxQfK-0BvdyYC8s",
	  "avatarImgupload": "nUprwkNIeC7RawCr8CXF4",
	  "avatarImgView": "jkHB80N7bfBf9N_0v88Dn",
	  "imgCrop": "_1yk06rwIipstCWo7DqY-Ws",
	  "avatarPhoto": "_1IASy4Ccwsc1Hlx8k4RQe2",
	  "profileAvatarPhoto": "_1udreMpjAE8aoD8Mr1WDPX",
	  "avatar-edit": "_9jMINRNIvMojA4-7ToTgA",
	  "avatarEdit": "_1P3t9fZCx_BDEh54G9VMgl",
	  "whiteCard": "_3nWLSHJLAYRQXSGi-S7-vX",
	  "whiteTile": "KCFNekbG6kNm7QCCmxcOC",
	  "customCanvas": "w29HZnYIY9DcdSxgGf9Fb",
	  "mobHr": "_2Uz1BxUe1xQyjJolIb8Mb7",
	  "infoTxt": "_2wQRugv9iTG-hhDdVuitIF",
	  "headerActionBlock": "_51GdvsLiRoxKfOP3MoGkM",
	  "headerTxt": "_1W4z8e13TJHcZmz5Ehbd-4",
	  "headerAction": "_1zobKkXfrcR7sMxBy5FmWe",
	  "actionBtnGroup": "X1rvYjQ0-Eqdn5OzP4KYI",
	  "headingBlock": "Hq2BSnJ5sBVw7PFqVs_NC",
	  "headingTxt": "IA7VynD7jO_xLZWz7aACg",
	  "userListGroup": "_2Ph1IkZvWiWem8t4CFkNm3",
	  "userAction": "_3WwIl6WKXGAOaK4TyzOKBf",
	  "userAction1": "_3s7onQjF7EP4cHRisLd3Mg",
	  "userAction2": "_3bGxsnSHuTWpNqSqi5jTtw",
	  "searchUsersListBlock": "_3H7ves2vQHYlcaRZjP6_lz",
	  "searchUsersListGroup": "_3lhIsnjhJIPWnX1NLu1FHR",
	  "searchBox": "_79ROL_K6mHBW5o2LSPYyD",
	  "whiteSearch": "_4QtoweRYn8fpMnZENdnnf",
	  "whiteIconSearch": "_8753oABxDX3rcNGmogytj",
	  "chartBlockCust": "_3OFhY2qrOgAV6bnfH5xA89",
	  "chartBlock": "_1N5hAom0NINnkAkgO0pUTQ",
	  "whiteSearchIcon": "_26bBhlXLANk52ms5a6VjEK",
	  "whiteIconText": "_2PMNPb1XU5-9DfgCXv6Rvz",
	  "whiteSearchSubmit": "X0b5oWXuK3cmvic_4QADO",
	  "userChecked": "_2Ri43PGbT_X9Hbhtxok5Ul",
	  "modInvitation": "_3XnYK47C6zCKGiEimfJNgq",
	  "invitationInfoBlock": "_3tRIQM3GobtsNmRdSzJiL8",
	  "brdrBtm": "_3LAMx5QbZVHureehjLL4Uo",
	  "imgBox": "_1XfnRYUr9pBKPOkxUFFX9f",
	  "fadeOutBlock": "BqKSWhdDuwTWAv1DHA7BU",
	  "checkCircle": "QSuL4Yo2KoUnXG-jx-Sa8",
	  "fadeOutBlockVisible": "_13D0mm_Hk7KYLaykKBevZz",
	  "inviteBlockTxt": "_1MRUsIlHELLDg4HUqftFKz",
	  "accessCode": "_2A1xO-c_Nzf9HroP_rOatO",
	  "accessCodeBox": "Qdmv4DR-xmH2sAv32gXXC",
	  "roomLink": "_3GAUEPkkabqWlcSfevhUau",
	  "multipleValInput": "_22Sz8_7dvrmB4KCI7kdRjM",
	  "inputHidden": "_3nKfZeEqzQufGuxDQsbVY-",
	  "gropListInfoBlock": "_NvEQdPKcGY20g4fSMurk",
	  "gropListInfoHeader": "_3x4LSw28PrhROipsZFRSLx",
	  "gropListInfoBody": "_1mcNp9TzwryfTaq6sSYfJ_",
	  "gropListInfoHeadingTxt": "_30GxtoXa1jkUjd1hz6xFdo",
	  "gropListName": "_2Eg6V7gwwk_gtkw6vvfNhx",
	  "groupListActionBlock": "_3NgOcbt39p_JI7nWKOUj9v",
	  "groupUsersList": "_3BNBtwGgubE1dGc3EPNM1I",
	  "avatarBox": "_7FV9BuwcMLtNbsCjWfZJw",
	  "avatarNameBlock": "_2cP80vK5OntyL4CAozp8QS",
	  "removeGroupUser": "_3Ar4MBI4-jdPw-yj6GUSs-",
	  "locationBlock": "_3mytHS_Ee_AtswYlQfMNJg",
	  "locationContainer": "GqFlk81qWkoM8pg8rM9mT",
	  "locationHeader": "mgZJ5PYIcU3xilagy40bF",
	  "deleteLocation": "_2y7ZZz5HDKl47nPZW5uv3D",
	  "locationBody": "_9tu9wEbJADVdffughhYgF",
	  "remove": "_2qTNEmDNBxEEHjfsZx6jUU",
	  "viewUserCurser": "CZheuAXrjNPRHRcbOQzSP",
	  "studentListBlock": "_1F103jVt16fCcfwQJuE2A8",
	  "addStudentsBlock": "s_BF417lLX83dLjUOk9Qj",
	  "removeIcon": "_39I8WxiFCBLNvr-skjcvJ9",
	  "studentblock": "_1npAxnK_u_EjOeG19x_gPa",
	  "studentListGroup": "_34y4x8qUqmoZtAAds5qqkz",
	  "participantsGroup": "_1WE6rhw-vc9NjeF5qmA-Mm",
	  "tablestyle": "NFm0ne64_mxmk9G4Rk6SG",
	  "tdStyle": "_3Anaxi4FYG9zJvL03elgEQ",
	  "thStyle": "_253KYsN6UeeVvx_kTT0FTG",
	  "hidetext": "_2Qz2riUa6vlhNSOMLl6wKv",
	  "removeStyle": "XmJHLhTym-EGI-3dZGbWc",
	  "attendenceBlockControl": "_2fYKK_Pr-_FnpTp0vDy7ws",
	  "highcharts-container": "g_tYqwkdBltv3zyfc0fjB",
	  "highcharts-3d-chart": "_3bXmxuc9uwXkpYG1sI7Wy4",
	  "lineHight32": "_39uMY54CvPnF20Hpq0ebgE",
	  "lineHight31": "_2Cr1PrXQc0tqvsLRtwEVFc",
	  "removePdng": "j5wasHyxigllgK3-KBNZp",
	  "endDateWidth": "K1BBDRJALUo1UDGm0zfBJ",
	  "dateControls": "_2oEC52PpxbN1YKwQLMvvZM",
	  "dateRange": "_1nsQZIi6oLo2RRnHcRUDH0",
	  "applyBtn": "IVfAmjUj2J2xaGMBT-9QG",
	  "filterTxt": "bSDHN9CU6ghjIR5JT1vS9",
	  "gPlusBtn": "_1fkNizbuffPOMlUBeF0C8K",
	  "facebookBtn": "_33LFFuv2b50fQxMUzgYLBM",
	  "btnBothfg1": "_2S2xLvR5Z4mId-yZY1j4Ka",
	  "btnBothfg2": "YF5WdJw31ZN1ZFt_oVbps",
	  "fbConnectProfile": "a4olE1Yr7WBxvPlCBP0n8",
	  "fbDisonnectProfile": "_3GeLpMYgDKHgEN2rHWC_1g",
	  "googleDisonnect": "_2-uwB5pqA-eF07BCD1_PqM",
	  "inLine": "_3SKSHSNT9quu0AEumeGTQT",
	  "inputGrade": "_2Q0ilim6NermuOEyggbVkC",
	  "flexContainer": "_3ELNW3V19Qpndrzsv3951F",
	  "actionRightAbs": "_1uuENocETyaOc2rRiwior5",
	  "closebtn": "_2GrTt3NBt2HkOlxHF614-3",
	  "editClosebtn": "wpV9V72-_ceslWX8JrnXB",
	  "first": "_35E4iHqMVJmbMgmzKL6Tv5",
	  "headerAdustPd": "_1nESRK-sNAUHFBu6EMERMb",
	  "flexItem": "_1Etv1bivyDOzFLsR_AlRIQ",
	  "formH5": "_23XBDJVodLOklMKND6BFwz",
	  "qgHeader": "_1Ej_TSxD1VVsqaZ5rYaG5h",
	  "editableFormControl": "_3nZKmtH-W0zw2UmsaMTJxW",
	  "formControl": "_1Zgt_J9y7nqfvWRWytzMeh",
	  "blockSaveAssign": "_1sRncd5eVV30oP77Pn6fxy",
	  "blockSaveAssign2": "_2POtXxR94UQpnt45GkLCfg",
	  "btnSaveAssign": "_3sgMh3C_xwBY-m57xQa2f9",
	  "btnSaveAssign2": "jpgtw2yKEH9RfINfX88pH",
	  "blockSaveGrade": "GGQLK2P_KDJIBUiwtLjaw",
	  "btnCancelGrade": "W4YNgM2XN5hkyETaGhUR2",
	  "btnSaveGrade": "_2eyI7soEd7DxGFD3-4GQku",
	  "btnAddGrade": "_1K2WOpGhk_Q4IoS2ZUf8hf",
	  "blockAddGrade": "_1O-zGuXiXgnw-U1l38HqxQ",
	  "btnAllCancel": "_23SiDDtLT1pT26oIsV4Tfd",
	  "btnApplyAll": "_17I5QbiC31ZqoS-j8ioPIc",
	  "inputGroupManage": "keJXfy3O3ZSv-n0JMFAfx",
	  "diconnectFbIcon": "_2Us20v8WA8mrpggJ6QnkKk",
	  "gIcong": "_104bXiLSEBaJt6qZ1uVqlO",
	  "gTextg": "_1SEMPATJm2_wne7kQlcG10",
	  "gmailIconConnect": "_3YCjXf4NX2ZJi8O1tUA7Ub",
	  "errorSaveAssign": "_1Cs3UFa1oi8pL2tQ-yOM-m",
	  "mainSaveAssign": "_2fP5quvRifvwxDNbx7L6X9",
	  "rowBottom": "_1kntlbOJwAJUcePEvL_kF8",
	  "seprator": "_2UGm2z7pTnp444hmFIFOIp",
	  "checkAssignQues": "_2iZMx3rWcQHdK7gzZAk6W1",
	  "inputAllCap": "_3b5YN89TYavUWP0IUCpP4J",
	  "localHeadMain": "_3RG8HTuYYDkFftvW6DqXY0",
	  "localHeadBlock": "_30XFANlOzaJYlY3_t5ho8U",
	  "nameheadProfile": "pt9XSChA3KBzQoKyGuVhU",
	  "allLabelInApp": "GpVwJxC7AGu9zLNGFoW87",
	  "proPicEdit": "_2TyVz7TK4Od13iZrubrZla",
	  "popHeadingAll": "_26LFoD0SOoue-56tKApy1J",
	  "textCapAll": "dmP3hNbZiWb10oxof-KKb",
	  "stuReportsOne": "_3AhyOrylvMZicPK7bHodXL",
	  "stuReportsTwo": "_3T0910-J2oReRdy8ZxNZiB",
	  "topicNameReport": "_1XpYjQcqHsjOXXvgjsWdX5",
	  "emailTransCap": "_1jX1RtADJ5IvrJd3Wtpyh_",
	  "txtDetailContent": "_1j9Ns7mzyM42Nmll1uh1He",
	  "addStudPop1": "_1QsP-l51F-3uG7QXomAW0P",
	  "addStudPop2": "pJUMNDAuP9bGHel-6ESf",
	  "addStudInput": "_1d7y3JxPS4_K3b3aRquCU2",
	  "addStudText": "bfDwzSKIRHVbJQpazT_Il",
	  "changePassInner": "_1jDrP6USHJgwHuHx84G6vW",
	  "fdInfoBlock": "_2gANItlTdO-wHoINbI1-T",
	  "fdInfo": "jkgczk2IOaooUA2sdYQcY",
	  "fdName": "_1GOg26hVpb9pUXFN9I9y75",
	  "fdListBlock": "Dyl11NUfA-U4x7uR32_nE",
	  "fdQues": "_2YaCGTu2m7P2XdqDPQiRwz",
	  "fdAns": "_25xB1C18_oF2MVuf5cn3zq",
	  "errorJoinConf": "_2FeZW5vDq4l2uCwYqTPhHN",
	  "qleditor": "_17N2ULf7_DBC-wvog56baS",
	  "txtCenter": "_--WLGzdyVj5fD3vNr-Zkv",
	  "addpdng": "_3c2v0Duo7UJRMD8C9viMiX",
	  "progress-bar": "A2ftBZ69PzksWTqo3GY0k",
	  "formInputBox": "_2iVSgkRQ2H-sx7DVceswIC",
	  "mainSpinBlock": "_3CZ3lYofgnCvue7BeOTlIz",
	  "innerSpinBlock": "_3m-KZNJLa-KBy4_GVdiO01",
	  "loginContainerBoth": "_2cFyrrDIIB0AnjCLMjCEcB"
	};
	
	var _Admin2 = _interopRequireDefault(_Admin);
	
	var _DataTable = {
	  "pagination": "TYVzvPvnVhHwh2cU0hA4A",
	  "current": "g_uiyu9x1FtjxSP7SG8ZE",
	  "table": "MT1wq7GO1NFQY49F82EQ7",
	  "headerRow": "_25DfSs-Nwm51luhPR-2j-T",
	  "col": "_2AskW4twyvDT4DurTsqR8L",
	  "row": "_2WqrTHsuiMmLB0IEBY1vgS",
	  "responsivetable": "_31nKaPaXXLrfOOGeGa9GTs",
	  "whiteCard": "ryCbWg89OoNEh8LdzqXon",
	  "noDataBox": "XRJX9QsZKouxzWnXKoUUp",
	  "infoTxt": "_1NZmMey1sQV0aCxxqVtPDu",
	  "mainSpinBlock": "_3BEgVxQ9PDQKlEjIHevKr5",
	  "innerSpinBlock": "_2Ot9A0ys89IJntrdA5WyyE"
	};
	
	var _DataTable2 = _interopRequireDefault(_DataTable);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _ReportsMenu = __webpack_require__(389);
	
	var _ReportsActions = __webpack_require__(150);
	
	var _ReportsReducer = __webpack_require__(151);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _ListStudentAttendance = __webpack_require__(453);
	
	var _ListStudentAttendance2 = _interopRequireDefault(_ListStudentAttendance);
	
	var _ListTotalSchedules = __webpack_require__(455);
	
	var _ListTotalSchedules2 = _interopRequireDefault(_ListTotalSchedules);
	
	var _DateRangePicker = __webpack_require__(403);
	
	var _DateRangePicker2 = _interopRequireDefault(_DateRangePicker);
	
	var _Loading = __webpack_require__(142);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var _ref = _jsx('h3', {
	  className: ''
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'reports'
	}));
	
	var _ref2 = _jsx('ul', {}, void 0, _jsx('li', {}, void 0, _jsx(_reactRouter.Link, {
	  to: '/course/reports'
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'room_list'
	}))), _jsx('li', {}, void 0, '/'), _jsx('li', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'attendance_reports'
	})));
	
	var _ref3 = _jsx(_TopMenu2.default, {
	  data: _ReportsMenu.reportsListMainMenu
	});
	
	var _ref4 = _jsx(_SubMenu2.default, {
	  data: _ReportsMenu.courseReportsSubMenu
	});
	
	var _ref5 = _jsx('h2', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'frown-o'
	}));
	
	var _ref6 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'no_data_yet'
	}));
	
	var studentCourseAttendance = function (_Component) {
	  _inherits(studentCourseAttendance, _Component);
	
	  function studentCourseAttendance(props) {
	    _classCallCheck(this, studentCourseAttendance);
	
	    var _this = _possibleConstructorReturn(this, (studentCourseAttendance.__proto__ || Object.getPrototypeOf(studentCourseAttendance)).call(this, props));
	
	    _this.attendanceReport = function () {
	      _reactRouter.browserHistory.push('/course/attendance/' + _this.props.params.rid);
	    };
	
	    _this.topicsReport = function () {
	      _reactRouter.browserHistory.push('/course/topics/report/' + _this.props.params.rid);
	    };
	
	    _this.assignmentReportList = function () {
	      _reactRouter.browserHistory.push('/course/assignment-report-list/' + _this.props.params.rid);
	    };
	
	    _this.getDates = function (obj) {
	      _this.setState({ chartData: '' });
	      obj['courseId'] = _this.props.params.rid;
	      obj['userId'] = _this.props.loggedInData.data._id;
	
	      // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
	      _this.setState({ loading: true });
	      _this.props.dispatch((0, _ReportsActions.getStudentAttendanceRequest)(obj)).then(function (res) {
	        return _this.setData(res);
	      });
	    };
	
	    _this.backToReports = function (e) {
	      _this.setState({
	        showStudentAttendanceList: false
	      });
	    };
	
	    _this.backToReport = function (e) {
	      _this.setState({
	        showTotalSchedulesList: false
	      });
	    };
	
	    _this.state = {
	      chartData: '',
	      showStudentAttendanceList: false,
	      listIds: [],
	      showTotalSchedulesList: false,
	      loading: true
	    };
	
	    _this.startDate = (0, _moment2.default)().startOf('day').utc().toDate();
	    _this.endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	
	    _this.submenu = _ReportsMenu.courseReportsSubMenu;
	
	    _this.submenu = _Validator2.default.activeSubMenu(_ReportsMenu.courseReportsSubMenu, "linkAttendance");
	    _this.submenu.menus[0].action = _this.attendanceReport.bind(_this);
	    _this.submenu.menus[1].action = _this.topicsReport.bind(_this);
	    _this.submenu.menus[2].action = _this.assignmentReportList.bind(_this);
	    return _this;
	  }
	
	  _createClass(studentCourseAttendance, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var obj = {
	        fromDate: this.startDate,
	        toDate: this.endDate
	      };
	      this.getDates(obj);
	    }
	  }, {
	    key: 'setData',
	    value: function setData(res) {
	      if (this.state.loading) {
	        this.setState({ loading: false });
	      }
	      if (res.status == true && res.data != null) {
	        var tasksData = [];
	
	        // tasksData used for displaying data in the charts 
	        if (res.data.offlineVisitsCount >= 1) {
	          var x = {
	            name: this.props.intlData.messages.offline_visits,
	            color: "#FFFF00",
	            data: [{
	              y: res.data.offlineVisitsCount,
	              name: this.props.intlData.messages.offline_visits,
	              color: "#FFFF00",
	              listIds: res.data.offlineVisitsIds,
	              reqType: "Offline"
	            }]
	          };
	          tasksData.push(x);
	        } else {
	          var x = {
	            name: this.props.intlData.messages.offline_visits,
	            color: "#FFFF00",
	            data: [{
	              y: 0,
	              name: this.props.intlData.messages.offline_visits,
	              color: "#FFFF00"
	            }]
	          };
	          tasksData.push(x);
	        }
	
	        if (res.data.onlineVisitsCount >= 1) {
	          var y = {
	            name: this.props.intlData.messages.online_visits,
	            color: "#009900",
	            data: [{
	              y: res.data.onlineVisitsCount,
	              name: this.props.intlData.messages.online_visits,
	              color: "#009900",
	              listIds: res.data.onlineVisitsIds,
	              reqType: "Online"
	            }]
	          };
	          tasksData.push(y);
	        } else {
	          var y = {
	            name: this.props.intlData.messages.online_visits,
	            color: "#009900",
	            data: [{
	              y: 0,
	              name: this.props.intlData.messages.online_visits,
	              color: "#009900"
	            }]
	          };
	          tasksData.push(y);
	        }
	
	        if (res.data.absentSchedulesCount >= 1) {
	          var z = {
	            name: this.props.intlData.messages.absent_schedules,
	            color: "#FF0000",
	            data: [{
	              y: res.data.absentSchedulesCount,
	              name: this.props.intlData.messages.absent_schedules,
	              color: "#FF0000",
	              listIds: res.data.absentSchedulesIds,
	              reqType: "Absent"
	            }]
	          };
	          tasksData.push(z);
	        } else {
	          var z = {
	            name: this.props.intlData.messages.absent_schedules,
	            color: "#FF0000",
	            data: [{
	              y: 0,
	              name: this.props.intlData.messages.absent_schedules,
	              color: "#FF0000"
	            }]
	          };
	          tasksData.push(z);
	        }
	
	        if (res.data.totalVisitsCount >= 1) {
	          var a = {
	            name: this.props.intlData.messages.total_schedules,
	            color: "#0000CC",
	            data: [{
	              y: res.data.totalVisitsCount,
	              name: this.props.intlData.messages.total_schedules,
	              color: "#0000CC",
	              listIds: res.data.totalVisitsIds,
	              reqType: "TS"
	            }]
	          };
	          tasksData.push(a);
	        } else {
	          var a = {
	            name: this.props.intlData.messages.total_schedules,
	            color: "#0000CC",
	            data: [{
	              y: 0,
	              name: this.props.intlData.messages.total_schedules,
	              color: "#0000CC"
	            }]
	          };
	          tasksData.push(a);
	        }
	
	        this.setState({
	          chartData: tasksData
	        });
	      } else {
	        console.log('err in Course Attendance response', res.error);
	      }
	    }
	  }, {
	    key: 'handleIndividualAttendanceList',
	    value: function handleIndividualAttendanceList(event) {
	      if (event.point.reqType == "Online" || event.point.reqType == "Offline") {
	        if (event.point.listIds && event.point.listIds.length > 0) {
	          this.setState({
	            showStudentAttendanceList: true,
	            listIds: event.point.listIds,
	            showTotalSchedulesList: false
	          });
	        }
	      } else if (event.point.reqType == "TS" || event.point.reqType == "Absent") {
	        this.setState({
	          showTotalSchedulesList: true,
	          showStudentAttendanceList: false,
	          listIds: event.point.listIds
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var cls_container = _component2.default.iContainer + ' ' + _component2.default.oContainer + ' pull-right';
	      var cls_topmenu = _component2.default.iTopMenu + ' ' + _component2.default.oTopMenu;
	      var cls_isubmenu = _component2.default.iSubMenu + ' {styles.oSubMenu}';
	      var loadType = 'list';
	
	      if (this.state.chartData != '') {
	        var self = this;
	        var options = {
	          chart: {
	            type: 'column'
	          },
	
	          title: {
	            text: this.props.intlData.messages.attendance,
	            style: {
	              "color": "#96281B",
	              "fontSize": "26px"
	            }
	          },
	
	          xAxis: {
	            type: 'category',
	            tickInterval: 1
	          },
	
	          yAxis: {
	            title: {
	              text: this.props.intlData.messages.total_attendance
	            }
	          },
	
	          credits: {
	            enabled: false
	          },
	
	          tooltip: {
	            pointFormat: this.props.intlData.messages.count + ' : <b>{point.y}</b>'
	          },
	
	          plotOptions: {
	            series: {
	              borderWidth: 0,
	              pointWidth: 50,
	              animation: {
	                duration: 1000
	              },
	              cursor: 'pointer',
	              events: {
	                click: function click(event) {
	                  self.handleIndividualAttendanceList(event);
	                },
	                //changeBy : pranathi ,disc: removing the legend click event
	                legendItemClick: function legendItemClick() {
	                  return false;
	                }
	              }
	            },
	            showInLegend: true
	          },
	          series: this.state.chartData
	        };
	      }
	
	      return _jsx('div', {
	        className: cls_container
	      }, void 0, _jsx('div', {
	        className: cls_topmenu
	      }, void 0, _ref, _jsx('div', {
	        className: _component2.default.dynamicBreadCrumb
	      }, void 0, _ref2), _ref3), _jsx('div', {
	        className: cls_isubmenu
	      }, void 0, _ref4), _jsx('div', {
	        className: _Admin2.default.midContainer,
	        style: !this.state.showStudentAttendanceList && !this.state.showTotalSchedulesList ? { 'display': 'block' } : { 'display': 'none' }
	      }, void 0, _jsx(_DateRangePicker2.default, {
	        getDates: this.getDates
	      }), _jsx('div', {
	        className: _Admin2.default.midContainer
	      }, void 0, this.state.loading ? _jsx('div', {
	        className: _Admin2.default.whiteCard
	      }, void 0, _jsx('div', {
	        className: _Admin2.default.mainSpinBlock
	      }, void 0, _jsx('div', {
	        className: _Admin2.default.innerSpinBlock
	      }, void 0, _jsx(_Loading2.default, {
	        loadType: loadType
	      })))) : _jsx('div', {}, void 0, this.state.chartData != '' ? _jsx('div', {
	        className: _Admin2.default.chartBlock
	      }, void 0, _jsx(_Chart2.default, {
	        container: 'chart',
	        options: options
	      })) : _jsx('div', {
	        className: _Admin2.default.whiteCard
	      }, void 0, _jsx('div', {
	        className: _DataTable2.default.noDataBox
	      }, void 0, _ref5, _ref6))))), this.state.showStudentAttendanceList ? _jsx('div', {
	        className: _Admin2.default.midContainer
	      }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx(_ListStudentAttendance2.default, {
	        listIds: this.state.listIds,
	        backToReports: this.backToReports
	      })))) : this.state.showTotalSchedulesList ? _jsx('div', {
	        className: _Admin2.default.midContainer
	      }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx(_ListTotalSchedules2.default, {
	        listIds: this.state.listIds,
	        backToReport: this.backToReport
	      })))) : null);
	    }
	  }]);
	
	  return studentCourseAttendance;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    reportsData: (0, _ReportsReducer.reportsData)(state),
	    intlData: (0, _IntlReducer.intlData)(state)
	  };
	}
	
	studentCourseAttendance.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(studentCourseAttendance);

/***/ },

/***/ 354:
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
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactRedux = __webpack_require__(16);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _LoginActions = __webpack_require__(21);
	
	var _AuthController = __webpack_require__(9);
	
	var _AuthController2 = _interopRequireDefault(_AuthController);
	
	var _IntlActions = __webpack_require__(37);
	
	var _component = {
		"form-control": "QmIrbtmLmFNpHdWMqFMWS",
		"innerWhiteTopic": "_32MPoieZt8YkhQqGNafOkY",
		"colonBlack": "_3WjF6qk6LGz-u5ks49gdcB",
		"error": "_3jAfmA6J7YmNDyB2VfsCxP",
		"mandatory": "_1cwTV0Re5ORIhqzxJLXMH1",
		"dynamicBreadCrumb": "_3QcYRL_UPZtqWKDFd5rcZB",
		"iElement": "_2crZNiFs8z8oNhzPDC1qOE",
		"oElement": "_1jUn1j1KBWo8dmqJ_0hdBD",
		"iLabel": "_3Pyvct_srCoSvJCgGG41jw",
		"oLabel": "NsxWZpxBqBX8wky_O477_",
		"iForm": "_3IlToa7pigrSS8KWut_dJ8",
		"oForm": "_3N0YNUcfI5U02VSmBEbYot",
		"iFormField": "_12yKSn29WLZIE6fvGQfcrN",
		"oFormField": "_5FMFIwRlrpPkQn-lkZ65Z",
		"iFormGroup": "_1LZRfACwm57iOGUxKozUVE",
		"oFormGroup": "_386CxczA49XX2-ejr3Qe55",
		"formNext": "ccTxjcG6_GZO9OgzW33HT",
		"iSubFormGroup": "u1jVXJqFT0vqGYzzRAhFY",
		"oSubFormGroup": "DDmyOnrHoBdsklkH9petO",
		"iContainer": "_2wz-gNWcGQfLXBCiToDWjI",
		"oContainer": "_2tEAAtqgoutuOUU96rNvv1",
		"iSubMenu": "XCOXe3mm5CZP0qxtnZPyC",
		"oSubMenu": "_1Rx5COiw9Ae92TeE3LnwRm",
		"iTopMenu": "_34RmLz4U_lA3sL18SjVR2-",
		"iMenuContainer": "N8LzghkGxja2Hkx0A-vzE",
		"whiteTopMenu": "YQfoPq5fhhEoPFvP-VF1W",
		"iSubMenuContainer": "_357Fb5CZ0VyABwYB9VmmIE",
		"active": "_2fF1Q9nO2O_1B8Ldb4RM52",
		"scheduleerror": "_34M0UOwV0tW7xV7AV2Cz7P",
		"errorPre": "_1ft-as7ic7_8EXp1iz5sfW",
		"errorclass": "_3jvk8bfxyC_tWLn1pBOytU",
		"whiteCard": "L2E7_Tzcp2MrkuuUlBf3t",
		"greyCard": "_34l9W17Mt1koxHLd1yUqgk",
		"reactTelInput": "_2OA1bLJ7mQFTEL9gP1dDif",
		"countryList": "_2ARbPU2OQ7JLphJ2g0U0F-",
		"react-tel-input": "_2PMN3xMEp7kCR8iQoBjSrd",
		"ad": "N3bKXyhfwvWT3eAEC9Nno",
		"ae": "taXUT8yfjgRMeSH3rMNxy",
		"af": "_2vH4qShCgBPBO4GR8BdNvd",
		"ag": "n8QfWtvpZLMpatCUqX2Td",
		"ai": "_3fPX_RcpesOPxFsmsaygCE",
		"al": "_1T12tbcC6990b-fIMG5LYW",
		"am": "_31HdarMDfXvAgjizVUoeHk",
		"ao": "_1Zb9qi0G-pe7OWK-cu6BoS",
		"ar": "_2qJleMgRbIErIrx3kQF57O",
		"as": "_2ZPVYL8Vjn-vdWZToCEhjN",
		"at": "_1hWilvnrVbANEHRyLGlF-m",
		"au": "_2zJE4K6o-ftWqhb3exXZgk",
		"aw": "_1UroMxX5JHt9bjGdHwa1OY",
		"az": "_-Y2xueZ_1mEtB9YDOqEGB",
		"ba": "_2FSEeZiYqoYo0pJ5J2uXJC",
		"bb": "_34600Kl8Wac9Hx7S3-3U6b",
		"bd": "_3WBX90V5VJXA7-vSUfEWCh",
		"be": "BcK33edOPcbYdkxxvOApy",
		"bf": "ShN64-J7UZdswoQjkf7L_",
		"bg": "_2A9PgkQEF5_KbvHvDf6_lY",
		"bh": "_10p3rxNRYOhv8-BtZuq1w8",
		"bi": "_6MzP1qXXDFAZVL7nBmRiH",
		"bj": "_2U8H1sji9LfDEW706KyKvF",
		"bm": "_3AOdFLNLEBMwpaIygqQ4Zo",
		"bn": "PgMDvF79WHl3kaklOmhw3",
		"bo": "_7MheGVInaTi-QLxw5PiUi",
		"br": "_1BDNUyT0cHDlbCBFgrrLkJ",
		"bs": "_3vcASZB5bu7mJAzTzaRkWe",
		"bt": "esu4pvyd9ZFWrf-etnrva",
		"bw": "_2Hbv1I361RJFK3Ph2xPlu_",
		"by": "_2tbYam6Og8RAicMhX9SXvI",
		"bz": "_3xB704PIgqFnU2zTG-JZFN",
		"ca": "_36FyK29nkNl9Ez7yWh04AS",
		"cd": "_9PnHTqK1pSn_GIAbBtPT2",
		"cf": "_2LgMF7o1A3a2cgw5jkpvZV",
		"cg": "_3hYc9Y3UdCphltZKe2vJWk",
		"ch": "_3BLJ9WmZAyoQNVnGDTm0hl",
		"ci": "FoSGkvvMDFAVcvsZBWX-Z",
		"ck": "_1742IgEaHW3SZU7h_-nkwr",
		"cl": "_36IaMt7ntEwUsH4lwN4tW-",
		"cm": "_1N8krqbPtlsEVsh6SaCetm",
		"cn": "IfkD3fwbUSx9FZflX6iIU",
		"co": "_3Y7u7ONzxyZVjZYzS1OHTr",
		"cr": "Gw5Qz4qBNZjPDmpQmi-d2",
		"cu": "ZuHtEp_knwZcbwTTJkRgI",
		"cv": "o6BzJCyjRH1pOsf_HpbQ6",
		"cw": "hRElJCQXyNIITDZ6UQVut",
		"cy": "_2cHKWrINPNO6L8BEOdtJCG",
		"cz": "nS617LE8Qcckdv9HJTWpt",
		"de": "fqJD93WBywDPs0lrLEXLT",
		"dj": "_1Rb2ZC6bLR2kLQHrXt3fi1",
		"dk": "_3fpBLMtuUi0kowy3ziMRYd",
		"dm": "_3gMwGkQW-OGFx1U7vd7VMD",
		"do": "G9EZGjpXLJUyQuREesyGO",
		"dz": "_3Nka0vwv6nZpeugyuqYQIJ",
		"ec": "_18t83SdIOs8EY6iF0zV0CZ",
		"ee": "_1miCbYr55XmBKvcUu6XetR",
		"eg": "_1T55wMh1svM7M5QGxFM2ex",
		"er": "c0Ab9spCQ4VnXr_6xijnD",
		"es": "_1lutiEL9tJpdNgKmnTT6Ld",
		"et": "_2GGXIPO2kOV6CUsu65V4Z3",
		"fi": "_1I-g5oWpQznT5QZuBfQ8A",
		"fj": "_3oeTP_GhC_XzsjzHW86oDc",
		"fk": "_3-_BjK4NArHS0nyf0DLc4F",
		"fm": "_1WQYGDC-zTatxog3SIwE80",
		"fo": "_2Xp5yMjRKQGGiCb4PPbdrr",
		"fr": "_3-mqatBXfaTfex8LWjnIDA",
		"bl": "_3QJ0ZMybaJjeqWZHvkXeIl",
		"mf": "_34f4ya9mcbpIcQPgHJ4I6c",
		"ga": "_15_iO4CJaXbX7PySxoldPF",
		"gb": "_1vZuFSSey59_ixozre-0L_",
		"gd": "_26Ub0jcjDpVD4nwM7m5n4e",
		"ge": "_27ctDR0Hf6HO15MgHS8wyh",
		"gf": "_2S6C39D4wNBuVSqzYM5Ldy",
		"gh": "_3vjGi6-umA-RzwxRFaTfNN",
		"gi": "_1VP2WL3_4ou1de2Ng8Wmd_",
		"gl": "_1OTvyS4D4UOkymKuDLxUdx",
		"gm": "_3-0gezNOVCHKzaLYGUySo2",
		"gn": "_8f6uadrEfnS9IX8DEIpKO",
		"gp": "_36yEj9UcEbZcI0WJvgmk0B",
		"gq": "xHX18x9xk7PhDBlgsvnad",
		"gr": "HTk_eFej1VrCiBuKBIfLT",
		"gt": "hgmUbzxaHNZNL6frPhPeb",
		"gu": "_3qeSb_MjyQ-VPPpwNWgXpl",
		"gw": "_36JwaXqhh4gBrIvAy4c1KO",
		"gy": "_3ZZcZTZlIH4DUUQ2BIamaK",
		"hk": "_1mT74O5OVtonPLmYnVVOu7",
		"hn": "_1ze0KI-TYxTrDcXlMOu24s",
		"hr": "ZIDUSRfcbDCZTyhqWGPob",
		"ht": "Y65Ad5pf3z7ufcknP0vhk",
		"hu": "_3EHKICvcensXt5hEu8Nkfs",
		"id": "_3oZE8uvxIFK7M9DCEtsSCD",
		"ie": "_2RNmpg94YYioQp2fWyz_xn",
		"il": "_2Mq_no7KYxPp2NSLGS1Tcs",
		"in": "_1UlEZ269GihRa58c5mCEBN",
		"io": "_3ovelrc7S_DdmXxL-8uuwk",
		"iq": "_3VSlK6DYHrBgKbkE2Rng2N",
		"ir": "NRX2sFBmuPSJ9EOigyuEP",
		"is": "_25HaTNE7x74CJO9S1mnm4I",
		"it": "_1-LmlhbrcpKN-xjESmR_sO",
		"jm": "VsvDBply-4FtMoJhi8Cvu",
		"jo": "yEE3hbkzWK8CSCrCJibCo",
		"jp": "_3oxjjz1uD2cX2QsoSToLgz",
		"ke": "_1ksOT6KMPd99EWuWCXPga_",
		"kg": "_2CMnR3yv5DGwDc8p3uoOjp",
		"kh": "_927b1QnaSWnN35i3bVewJ",
		"ki": "_2CuDp55lqYTpFp68D4IWep",
		"km": "_3tvMTeZYZMzBB9bGn9lV9E",
		"kn": "_6kbCvwc22pJX0tNv3HToQ",
		"kp": "_3tIPOe5PNrHH-bgCGaZTJj",
		"kr": "_2653rpVUuy3ETaw1mogdnF",
		"kw": "_1SKg_lTe0ShbPSOl44eKjp",
		"ky": "tgj8SOv7bYoF7qfbbQWNG",
		"kz": "bchn50J152EdQa0zf3k5u",
		"la": "mu9oycLgpKX8_yLLkR5b9",
		"lb": "_2TcAFbagIrNyc6mgzRVNW0",
		"lc": "_2IFItnUNT-albvpN-ksxd2",
		"li": "_3_E6nQspv6zJQLQI24puaS",
		"lk": "_2M2wq3qQhGeUegbBTs7ilH",
		"lr": "L4o4xOg0s6QbasyIRPgyF",
		"ls": "LhBB6SRin61WSFtUwaEfe",
		"lt": "ITDUphrnMkKItKGMVHZf8",
		"lu": "_1mVW30sc4i-1M8tDPCQlL",
		"lv": "_3rq6vE2IagAsGI6iESAcJq",
		"ly": "_3se_Nzm1WQrEN3VZYiJJrv",
		"ma": "_fSDiNxp_jjfqkQcWffDM",
		"mc": "_2hRTRZeBtDGN4mNeWBZVgB",
		"md": "_26jDl0skadEwmUYDGmEzST",
		"me": "_388lJj_7sQdyd9HL7pMrar",
		"mg": "_3aFoqVWcvG3p47Vwa6UuoE",
		"mh": "_1YHi6OtXmKfP15ZNbwYGgy",
		"mk": "_9QVyhHcp8yH762J8fWXhC",
		"ml": "yYD99PoyhgFI4912_qoyJ",
		"mm": "URzk8-j7LcySpGUMJf_Qk",
		"mn": "_1J-lktQUTK0rydBz3foJGF",
		"mo": "_1sbL0zhHof-KbfGWu2qjqF",
		"mp": "_1tJjJlSjRw5AnqcXXmGwCI",
		"mq": "fHob9sxaJrTuqSc0xL744",
		"mr": "t-Bmj7a31aA-IwcRcL0ua",
		"ms": "_2xyT54DQP62zWDySH7-Kdy",
		"mt": "_1Ul_OlGODc8S0QplVq94PV",
		"mu": "_1yIBERRJqnV33pTq2VpKRc",
		"mv": "_3VqQ1QKRZyrVO6o8AvYgsR",
		"mw": "_3i8n-5-htdGNJLgn96O21",
		"mx": "_16-6zoyiVzSGB1O72cUTzV",
		"my": "_3W2P0D9eTN4BQoOcThOsaM",
		"mz": "wJ8icX7Asp3dSImkXOdTM",
		"na": "_1qt_F94mybbX5kr0ArtN-Z",
		"nc": "h82AMIuCGdKf69Hc_nM6D",
		"ne": "_2mVa5nGsijzD93WRl8dk64",
		"nf": "_3XQ9oUH_84SsdZLjpVRuqT",
		"ng": "_1uyyH1GZjsEk3YpaUSmmG6",
		"ni": "_22_3H6UeFo26o3fSavtQaX",
		"nl": "_93asfBYgR8C7bEDucZO8l",
		"bq": "_37A1nwIz7Z3obwUjmliw4s",
		"no": "_2-sVmkWiLn_ogTikc0c0Eg",
		"np": "_1PqZSwf5cuMNmbE7bpKe67",
		"nr": "_9q5Rg9Xn0G2buivFSGySP",
		"nu": "RLhVdyjL9Cex8ekaJqirU",
		"nz": "_1LHfwPg-iXjSTdjVKJ2BYn",
		"om": "_9mZYNhgBLiQg-j1FeVprJ",
		"pa": "_3S7TrzxJIEYVghUMVHB6E7",
		"pe": "_3V5sP7VvdGOFqApj7POYl2",
		"pf": "_1YzdrkyHO-eCcEFF-hjZl7",
		"pg": "ddWAanlQJPlB0QDWO6dAF",
		"ph": "_2TGbmCcqHlJFCssz78MxOs",
		"pk": "_2JerTABYGCUN8FLjpnDzKy",
		"pl": "_3X1Zo6JhS7aPUTPWCBJyzX",
		"pm": "_29Hoo7EsoSHtvRFvlVg2cD",
		"pr": "_3_pkwz60KLoYcbKwaRvIsS",
		"ps": "_3jenITZ_yUYS7kU1HwFEHj",
		"pt": "_1vz8ABWy5Yd43_JhaTWq9u",
		"pw": "_3Yr0RZMbOD2QJkTtMx_HIk",
		"py": "_1_W41pJLcGMRhLdU997clv",
		"qa": "Z0tjAakoNSOs14KuenmRi",
		"re": "_3k5KF4jzE7HUitQw9MQKnp",
		"ro": "_2b8XhT3-7NgjAC8gJJkpis",
		"rs": "_2MUJr9MQbiKRTd_g0TaRQr",
		"ru": "HjzPW2CxxNMSGZw1ugFW7",
		"rw": "_23TGIOoPmB9QYqIPG6W3tA",
		"sa": "_34WM8rSonfayW0vJ3koqJS",
		"sb": "_3486rZNsCjvTmIoHbjK8mG",
		"sc": "_3meAM_iQCU6MyfPQJTN3yl",
		"sd": "_2x6XeHNF__4s9VVfFXCJhO",
		"se": "_66VDclGQXxpdUR8uE3ZFa",
		"sg": "tv3I_hfLcUJ_8i9ewVcUz",
		"sh": "_1syDbbhbumwMwwD7Dwkb1V",
		"si": "_3jsffwJjGr2sMEofSTTGkG",
		"sk": "_1EpYAUcQLCqbYB48Auixqb",
		"sl": "_3STJQv9nY5mol4cW82D2ci",
		"sm": "_9aTR-AZMTaYHRmDVAyFTM",
		"sn": "_3mTatYTWeJQQACfV7xzRhi",
		"so": "_1LnWon2slwLMqAHzhkRT4c",
		"sr": "_1GSedFwSsf5isgOi3p0x6U",
		"ss": "_1sq99LOjKKgery3luOXOFn",
		"st": "_1O6vYx_NaXFBAs1qYxgwaB",
		"sv": "_10D9RGnRzUv14bYWQaC23c",
		"sx": "KonDEEzH2JzIWsVUBzFdY",
		"sy": "_1ZAnqGYeixOJVFwwt6hNIo",
		"sz": "_3FeOFkec3sXYbvQhWDdIM7",
		"tc": "_1FZvldKEV-vz12TyyNfEf",
		"td": "_31fysfDRtTWVKcX_UjX0ty",
		"tg": "H60Kyr6MsF6nvRz5l7EfN",
		"th": "SHZkbUz1c_H_zDOfxLc4",
		"tj": "_2MRI0fA4OLgepXVooYMu9H",
		"tk": "_1W959S9LHLCKhz3xi4MpHe",
		"tl": "_1lMF_0nwQXTyBRRzRj7hBF",
		"tm": "_2ZB_Dy2eRo6J0ylRkqC62I",
		"tn": "_2MeGi_bqLVuCaRtJzs3QqA",
		"to": "_3egwC_50WENVPaap_uwXr8",
		"tr": "_2KiPy3o6m7JCKQWPY2fI1d",
		"tt": "_3Hbn6Wi0dSnyrjdgeMmYmf",
		"tv": "_2D9VWSmHkhgNemAaIKF_cp",
		"tw": "_2J7nVAh1zEa7kV5Ba51CLV",
		"tz": "_2acF96LLqMjlbfMX1oiAjT",
		"ua": "_2rr3Tyr8dP6vDvE0khEDKT",
		"ug": "D7gjzKmlr78rNWXXw90np",
		"us": "_1l5RtWI_acgLVeCd5fjgHG",
		"uy": "_1zX6hTsIa2TtL6dgR47eQ9",
		"uz": "_29NUL3VtwK1_RWUyPsY2ei",
		"va": "_39kTgRBkhqqGVLUTJvK_67",
		"vc": "_2EwnB8Pe5TZDGdNIXOvzzg",
		"ve": "_3Lk2Svkm2NTAVpUfiY_No5",
		"vg": "_3SiYuGrNzW9DNkXwTZugyj",
		"vi": "_2BiiERObu5xcE6P1SZxLdj",
		"vn": "_3kSg6iW0KLoUpJ0g70fckK",
		"vu": "_1UdrzjuDjSDu6-DJ5yV9cQ",
		"wf": "Arz0xEqJcbKbLmPz_tXTS",
		"ws": "_3oTaxcmbTriEd90-cXNqD8",
		"ye": "gxtmCiQO2ao4JTQXuRUIJ",
		"za": "_25HyrYKmQQAteF_LwADnIt",
		"zm": "Kui2u7hZHcNBqlzbqR-vQ",
		"zw": "_3VPnIcPuwZ3cFvNOHPN8ar",
		"hide": "_2kO_U0LXcg71jJA6RSia2e",
		"v-hide": "_2HBc009zwTsSlkh8P8tH10",
		"invalid-number": "_17iYQoyXCPAB8XfsRqDdDH",
		"flag-dropdown": "_1JTLnRuUJ50FBWDCCCWc4b",
		"open-dropdown": "jG7mLbpUfq5nh2TzhXfBa",
		"selected-flag": "_10c169vRt8V92_nQ_S0KtR",
		"flag": "_2AEEM5AZQcsUPJUQZSd8Rr",
		"arrow": "_3GOH36qvhOwAJd2ppQ3AOB",
		"up": "_2ykRnfq4f2nlmZGfvzrn92",
		"country-list": "UlTusogWL2urjgGgLNpcD",
		"divider": "_2zMaTbM3nSdE07wOs7YYRt",
		"country": "uL848pHFWhb_G94Ak-KX5",
		"dial-code": "FxUYLz6b2tBEUXdb9DRqQ",
		"highlight": "BLa_2aA2PkYD2PsO2fvNC",
		"country-name": "_3ih_ovRiGmAkpjxuz63nhk",
		"uploadFile": "_3CUi48rtxy1m3Wz0o2aHk_",
		"fileUpload": "_2WENukerx3mNXkTyu0UXQf",
		"uploadLabel": "_1VYdz-DRIuPqCKWlu5Rd5W",
		"upload": "_2DUvBpBYzPWlV-6Yx2Pjas",
		"blackTxt": "Z1W_HNjnSJTqNclgOwR-3",
		"feedbackTextArea": "_14APtzGfaR_yoeAQJMJT5z",
		"errorModal": "_2PEnO-md-8qd3dF2cZGhMD",
		"gradeColor": "_16sNzVDnEzucQAxknLYKQQ",
		"red": "_3wj0AXV9gqX9YG1nk-2u9J",
		"green": "_3KPVxc3su8ewtuKZgu8TGv",
		"orange": "_3cLlE5QI9XJwY6e7jO5bLg",
		"capitalize": "_2yqvFrqWq4uakYy_s3eeMY",
		"importBtnBlock": "OwSu91np9HnUW1VdSX5hA",
		"importBtnUpload": "_2eJ0cgHJ9Qj4GAz9x1jChE",
		"importBtnInput": "_3ZCvqG4C-pjYzfgVNN8eze",
		"icon": "_12rnwIUewKT2PdtWMnNyD5",
		"importFileOnclick": "_2qsz43E0kYpZO89nXXV13S",
		"broadcastWhiteCard": "_2Vf8tRdA-IkCpzrPwrxoLi",
		"broadcastNews": "eK8W5URbLbE8ER1zsFc6V",
		"btnPost": "_30ipfhZp6Vv-ikKnFNtEI7",
		"textArea": "_3uPzOKXSyhgfRUhfmeVwfC",
		"spinnerCss": "_1ouaIjiJ2MFv5PI5UqZ1ev",
		"pdfView": "_2DquMFdC6rEzAaWJ2U-ahy",
		"lineHight32": "_3RF4CWuoSHP3JddZnzrhZh",
		"removePdng": "_3XuIzA6t9BoFiZfEFhOn3f",
		"inputAllCap": "_6YEeMYUnLHaS691RRjq7L",
		"popHeadingAll": "_2suWB3cd5kOd2yUCJCr640",
		"dateControls": "_1BrlYTxzEBCsm_zJ9PPGkp",
		"dateRange": "_1JBu7w3GlOnQBH8oh1-EXg",
		"applyBtn": "_2Rz8lBsFU8i7B9Ia-G-cv3",
		"filterTxt": "_1Wdy1Hr8CUuuK8O9Liz3yi",
		"btnApplyAll": "_1Y_QiGh-mkiUfuuiix0Yeb",
		"assCanvas": "_2Ue4kVYDy-eQJrbNCKv0yC",
		"pdfBlock": "_3UAEHpi6NrNz6ZDh2Lfk0E",
		"assTab": "y4LW63OuadI0JWTQBnbJ1",
		"heightForScroll": "_1s76YPnhEAnqK63LsEzIZh",
		"radioNewProfile": "_1RD_hASO-4hwDMMDABPgkH",
		"wrapper": "IVU-3tPtgRn_cBMA2jD_Y",
		"leftBox": "_2c_UkbRVkIhCuEx7sFrhEz",
		"rightBox": "DP21PoKxwKk_vJyOuQTcr",
		"gradeBlock": "_1KaDEKb6KgB6xx-gEx-KTu",
		"actionBoxTop": "_10AdTDYinFiKZ9H30uacSD",
		"gradeBody": "_2pAeBQb2ZLvpxG09x5oJnS",
		"actionBoxBottom": "_1UHK6epVvw6XZJ1KLDuQuI",
		"gradeGroup": "_3VI0hvgPHy6r31t8WOJVDq",
		"morePref": "JBm94eKPIFI8vfiroATJ6",
		"tile": "_1Ssp2zTovh7AwJWuRkgnge",
		"tileItems": "_3cDqgy8AedDYzhy8Euosis",
		"tileHeader": "_1LhZQenbqV0FNu-ykdOEI3",
		"tileHeaderLeft": "_2MwtFA5OodvfH7RxQPCPQ_",
		"category": "_2Ow56TBY2Y24yY5SjVRU4l",
		"innerScoreBoth": "ndEN_RpJfrJ_tKG_RA68v",
		"maxScore": "_3uL97t2vemfuAs83cAFhjE",
		"maxScoreInput": "TKf_xWbkl0UNSxyusGMn8",
		"scored": "_12gGWK_s69JBGzOAX7ClkT",
		"scoreInput": "_2Mk4HrrcAyqwuFRTOgl3lh",
		"remTile": "_3vgBsvWRGVVRwIEDn1TquO",
		"tileBody": "dF1WC_PeNjG87K2XGMIcS",
		"tileRatings": "_2CCbhFQsjWGMpVC9Wui7Vr",
		"gradeBox": "_1yi9i3Jl0hqMYPn1Tgv_cF",
		"gradeDisabledBox": "_14nvGiDb0wY_EIfoptsCdF",
		"assignmentResultActive": "_2tWSBiPrHoK1xrmZ6QsC-W",
		"blue": "K7acjAQMroOGGtUqqojYy",
		"yellow": "G7N-PGOIbGO_ZkaqBu2mx",
		"txtGreen": "_3ozvzoCtqRqS2AzlUELKKF",
		"txtBlue": "_4IOpBzUT2qYXMYt5UKiJP",
		"txtYellow": "_27BE3ODkiyosiM3HqlgtFT",
		"txtOrange": "_3uTqWL645yWk5qXsaxxH_M",
		"txtRed": "_3WDBRR7fo7Gn2KKo7rrE_Q",
		"txtppl": "_3nfbHs21ZfqnZ9n2wICEDb",
		"addTile": "lCw_kxhsAPcuM3yFAqvpF",
		"addContral": "_1aQuHhQkJrKTdNBYcoAQFh",
		"addIconCircle": "_2lFLErjrZAe1ZXjCbykAVD",
		"commentBox": "_2h0b9sj0Y_QpQzSh6njVoO",
		"totalScore": "FDG4LAia-7JDDtxb7R4Kb",
		"totalScoreInput": "_23XbNFEiJgqq0S35rhnpj6",
		"textBox": "_13VdIFmMegxz_eR8VIXN_M",
		"totalScoreSpan": "_2Pj4PN_f9FgyLDc9JE4vu9",
		"totalScoreText": "_1YbsVQIx_uSOAygZtwoTNK",
		"resultBox": "_3XB8yAFjZjZubswP7rs3Lt",
		"resultBlock": "FmvbKk1ChtYs7Lm76nRaX",
		"resultHeader": "_1AWxMTonqDqoWhnz1g9d-d",
		"headingTxt": "_1GSvGEp7hTrEpIa-UkynQZ",
		"scoreBox": "_3HTg1VUMSPfLvdZUBsj2N_",
		"resultBody": "N6kKlySaRGbRcB4bBmpZ0",
		"resGroup": "_2byM-_1N3yjHb2dpmlikdf",
		"resTile": "DZeuj4DKkdAPKCgYd76RK",
		"resCriteria": "_22AwZF3M7Ffw8GTgoz2DSi",
		"resRating": "R7j9mxFZmdmLgC7bPXpyN",
		"txtSize": "_977ldMQMMiHQ0YG_61T3g",
		"txtplBlue": "_27vNfTLrgUcEIvntpfFS_N",
		"resScored": "_1T5pr7r7hw9rq_NyVSB0lM",
		"resInput": "_14gsxA36f-uYOfxGDvr_gi",
		"activeTxt": "_3mkD5eqWDun2pAM_mx16kZ",
		"feedbackBox": "_1ae7KB7aTT79QKO6O85GzI",
		"fbHeader": "idU-Kkkc7R8cdYS_Ayh47",
		"feedbackGroup": "AKd59EZ_Qjl6GE1amJRlx",
		"profileBox": "_1JFzTlQEl2bDxwqAx77fbj",
		"profileImg": "_3k-2OFHHSzyQUB7Zkcc21l",
		"profileDetails": "_2wxDQDzYCXmmG6lQaOlEj7",
		"name": "_25-6SxUiv8zhOMEVTRrg8w",
		"commentTxt": "_2tLMve1A4CHR8jTUu5J1jI",
		"addpdng": "_6rQH8tivz8ELIWszpbahs",
		"good": "_3lOxcxDfxhPcuhLBJHo4Ur",
		"vGood": "l_IAfocpDxfvpU316U0EI",
		"fair": "_3I3YapUnBVxgs-ZsGf3Poh",
		"poor": "_1uSJT6ULTWAvr1S_77KhIZ"
	};
	
	var _component2 = _interopRequireDefault(_component);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SubMenu = function (_Component) {
		_inherits(SubMenu, _Component);
	
		function SubMenu() {
			_classCallCheck(this, SubMenu);
	
			return _possibleConstructorReturn(this, (SubMenu.__proto__ || Object.getPrototypeOf(SubMenu)).call(this));
		}
	
		_createClass(SubMenu, [{
			key: 'getSchema',
			value: function getSchema() {
				return this.props.data.menus;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.props.dispatch((0, _IntlActions.loginLanguage)(this.props.loggedInData.data, this.props.intl.setlocale));
			}
		}, {
			key: 'renderMenus',
			value: function renderMenus() {
				var role = this.props.loggedInData && this.props.loggedInData.data ? this.props.loggedInData.data.role : -1;
	
				// let active = this.props.active;
				var objMenus = this.getSchema().map(function (menu) {
					// console.log(menu);
					if (!menu.role || menu.role && menu.role.length <= 0 || menu.role && _.indexOf(menu.role, role) != -1) {
						if (menu.actionType == 'URL') {
							return _jsx('li', {}, menu._id, _jsx(_reactRouter.Link, {
								id: menu._id,
								activeClassName: menu.active == 'active' ? _component2.default.active : '',
								to: menu.action
							}, void 0, menu.text));
						} else if (menu.actionType == "Function") {
							return _jsx('li', {}, menu._id, _jsx('a', {
								id: menu._id,
								onClick: menu.action,
								className: menu.active == 'active' ? _component2.default.active : ''
							}, void 0, _jsx('i', {
								className: menu.icon
							}), _jsx('span', {}, void 0, menu.text)));
						} else {
							return;
						}
					} else {}
				}.bind(this));
	
				return objMenus;
			}
		}, {
			key: 'render',
			value: function render() {
				return _jsx('div', {
					className: _component2.default.iSubMenuContainer
				}, void 0, _jsx('ul', {}, void 0, this.renderMenus()));
			}
		}]);
	
		return SubMenu;
	}(_react.Component);
	
	function mapStateToProps(state) {
		return {
			intl: state.intl,
			loggedInData: (0, _LoginReducer.loggedInData)(state)
		};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(SubMenu);

/***/ },

/***/ 355:
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
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactRedux = __webpack_require__(16);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _component = {
		"form-control": "QmIrbtmLmFNpHdWMqFMWS",
		"innerWhiteTopic": "_32MPoieZt8YkhQqGNafOkY",
		"colonBlack": "_3WjF6qk6LGz-u5ks49gdcB",
		"error": "_3jAfmA6J7YmNDyB2VfsCxP",
		"mandatory": "_1cwTV0Re5ORIhqzxJLXMH1",
		"dynamicBreadCrumb": "_3QcYRL_UPZtqWKDFd5rcZB",
		"iElement": "_2crZNiFs8z8oNhzPDC1qOE",
		"oElement": "_1jUn1j1KBWo8dmqJ_0hdBD",
		"iLabel": "_3Pyvct_srCoSvJCgGG41jw",
		"oLabel": "NsxWZpxBqBX8wky_O477_",
		"iForm": "_3IlToa7pigrSS8KWut_dJ8",
		"oForm": "_3N0YNUcfI5U02VSmBEbYot",
		"iFormField": "_12yKSn29WLZIE6fvGQfcrN",
		"oFormField": "_5FMFIwRlrpPkQn-lkZ65Z",
		"iFormGroup": "_1LZRfACwm57iOGUxKozUVE",
		"oFormGroup": "_386CxczA49XX2-ejr3Qe55",
		"formNext": "ccTxjcG6_GZO9OgzW33HT",
		"iSubFormGroup": "u1jVXJqFT0vqGYzzRAhFY",
		"oSubFormGroup": "DDmyOnrHoBdsklkH9petO",
		"iContainer": "_2wz-gNWcGQfLXBCiToDWjI",
		"oContainer": "_2tEAAtqgoutuOUU96rNvv1",
		"iSubMenu": "XCOXe3mm5CZP0qxtnZPyC",
		"oSubMenu": "_1Rx5COiw9Ae92TeE3LnwRm",
		"iTopMenu": "_34RmLz4U_lA3sL18SjVR2-",
		"iMenuContainer": "N8LzghkGxja2Hkx0A-vzE",
		"whiteTopMenu": "YQfoPq5fhhEoPFvP-VF1W",
		"iSubMenuContainer": "_357Fb5CZ0VyABwYB9VmmIE",
		"active": "_2fF1Q9nO2O_1B8Ldb4RM52",
		"scheduleerror": "_34M0UOwV0tW7xV7AV2Cz7P",
		"errorPre": "_1ft-as7ic7_8EXp1iz5sfW",
		"errorclass": "_3jvk8bfxyC_tWLn1pBOytU",
		"whiteCard": "L2E7_Tzcp2MrkuuUlBf3t",
		"greyCard": "_34l9W17Mt1koxHLd1yUqgk",
		"reactTelInput": "_2OA1bLJ7mQFTEL9gP1dDif",
		"countryList": "_2ARbPU2OQ7JLphJ2g0U0F-",
		"react-tel-input": "_2PMN3xMEp7kCR8iQoBjSrd",
		"ad": "N3bKXyhfwvWT3eAEC9Nno",
		"ae": "taXUT8yfjgRMeSH3rMNxy",
		"af": "_2vH4qShCgBPBO4GR8BdNvd",
		"ag": "n8QfWtvpZLMpatCUqX2Td",
		"ai": "_3fPX_RcpesOPxFsmsaygCE",
		"al": "_1T12tbcC6990b-fIMG5LYW",
		"am": "_31HdarMDfXvAgjizVUoeHk",
		"ao": "_1Zb9qi0G-pe7OWK-cu6BoS",
		"ar": "_2qJleMgRbIErIrx3kQF57O",
		"as": "_2ZPVYL8Vjn-vdWZToCEhjN",
		"at": "_1hWilvnrVbANEHRyLGlF-m",
		"au": "_2zJE4K6o-ftWqhb3exXZgk",
		"aw": "_1UroMxX5JHt9bjGdHwa1OY",
		"az": "_-Y2xueZ_1mEtB9YDOqEGB",
		"ba": "_2FSEeZiYqoYo0pJ5J2uXJC",
		"bb": "_34600Kl8Wac9Hx7S3-3U6b",
		"bd": "_3WBX90V5VJXA7-vSUfEWCh",
		"be": "BcK33edOPcbYdkxxvOApy",
		"bf": "ShN64-J7UZdswoQjkf7L_",
		"bg": "_2A9PgkQEF5_KbvHvDf6_lY",
		"bh": "_10p3rxNRYOhv8-BtZuq1w8",
		"bi": "_6MzP1qXXDFAZVL7nBmRiH",
		"bj": "_2U8H1sji9LfDEW706KyKvF",
		"bm": "_3AOdFLNLEBMwpaIygqQ4Zo",
		"bn": "PgMDvF79WHl3kaklOmhw3",
		"bo": "_7MheGVInaTi-QLxw5PiUi",
		"br": "_1BDNUyT0cHDlbCBFgrrLkJ",
		"bs": "_3vcASZB5bu7mJAzTzaRkWe",
		"bt": "esu4pvyd9ZFWrf-etnrva",
		"bw": "_2Hbv1I361RJFK3Ph2xPlu_",
		"by": "_2tbYam6Og8RAicMhX9SXvI",
		"bz": "_3xB704PIgqFnU2zTG-JZFN",
		"ca": "_36FyK29nkNl9Ez7yWh04AS",
		"cd": "_9PnHTqK1pSn_GIAbBtPT2",
		"cf": "_2LgMF7o1A3a2cgw5jkpvZV",
		"cg": "_3hYc9Y3UdCphltZKe2vJWk",
		"ch": "_3BLJ9WmZAyoQNVnGDTm0hl",
		"ci": "FoSGkvvMDFAVcvsZBWX-Z",
		"ck": "_1742IgEaHW3SZU7h_-nkwr",
		"cl": "_36IaMt7ntEwUsH4lwN4tW-",
		"cm": "_1N8krqbPtlsEVsh6SaCetm",
		"cn": "IfkD3fwbUSx9FZflX6iIU",
		"co": "_3Y7u7ONzxyZVjZYzS1OHTr",
		"cr": "Gw5Qz4qBNZjPDmpQmi-d2",
		"cu": "ZuHtEp_knwZcbwTTJkRgI",
		"cv": "o6BzJCyjRH1pOsf_HpbQ6",
		"cw": "hRElJCQXyNIITDZ6UQVut",
		"cy": "_2cHKWrINPNO6L8BEOdtJCG",
		"cz": "nS617LE8Qcckdv9HJTWpt",
		"de": "fqJD93WBywDPs0lrLEXLT",
		"dj": "_1Rb2ZC6bLR2kLQHrXt3fi1",
		"dk": "_3fpBLMtuUi0kowy3ziMRYd",
		"dm": "_3gMwGkQW-OGFx1U7vd7VMD",
		"do": "G9EZGjpXLJUyQuREesyGO",
		"dz": "_3Nka0vwv6nZpeugyuqYQIJ",
		"ec": "_18t83SdIOs8EY6iF0zV0CZ",
		"ee": "_1miCbYr55XmBKvcUu6XetR",
		"eg": "_1T55wMh1svM7M5QGxFM2ex",
		"er": "c0Ab9spCQ4VnXr_6xijnD",
		"es": "_1lutiEL9tJpdNgKmnTT6Ld",
		"et": "_2GGXIPO2kOV6CUsu65V4Z3",
		"fi": "_1I-g5oWpQznT5QZuBfQ8A",
		"fj": "_3oeTP_GhC_XzsjzHW86oDc",
		"fk": "_3-_BjK4NArHS0nyf0DLc4F",
		"fm": "_1WQYGDC-zTatxog3SIwE80",
		"fo": "_2Xp5yMjRKQGGiCb4PPbdrr",
		"fr": "_3-mqatBXfaTfex8LWjnIDA",
		"bl": "_3QJ0ZMybaJjeqWZHvkXeIl",
		"mf": "_34f4ya9mcbpIcQPgHJ4I6c",
		"ga": "_15_iO4CJaXbX7PySxoldPF",
		"gb": "_1vZuFSSey59_ixozre-0L_",
		"gd": "_26Ub0jcjDpVD4nwM7m5n4e",
		"ge": "_27ctDR0Hf6HO15MgHS8wyh",
		"gf": "_2S6C39D4wNBuVSqzYM5Ldy",
		"gh": "_3vjGi6-umA-RzwxRFaTfNN",
		"gi": "_1VP2WL3_4ou1de2Ng8Wmd_",
		"gl": "_1OTvyS4D4UOkymKuDLxUdx",
		"gm": "_3-0gezNOVCHKzaLYGUySo2",
		"gn": "_8f6uadrEfnS9IX8DEIpKO",
		"gp": "_36yEj9UcEbZcI0WJvgmk0B",
		"gq": "xHX18x9xk7PhDBlgsvnad",
		"gr": "HTk_eFej1VrCiBuKBIfLT",
		"gt": "hgmUbzxaHNZNL6frPhPeb",
		"gu": "_3qeSb_MjyQ-VPPpwNWgXpl",
		"gw": "_36JwaXqhh4gBrIvAy4c1KO",
		"gy": "_3ZZcZTZlIH4DUUQ2BIamaK",
		"hk": "_1mT74O5OVtonPLmYnVVOu7",
		"hn": "_1ze0KI-TYxTrDcXlMOu24s",
		"hr": "ZIDUSRfcbDCZTyhqWGPob",
		"ht": "Y65Ad5pf3z7ufcknP0vhk",
		"hu": "_3EHKICvcensXt5hEu8Nkfs",
		"id": "_3oZE8uvxIFK7M9DCEtsSCD",
		"ie": "_2RNmpg94YYioQp2fWyz_xn",
		"il": "_2Mq_no7KYxPp2NSLGS1Tcs",
		"in": "_1UlEZ269GihRa58c5mCEBN",
		"io": "_3ovelrc7S_DdmXxL-8uuwk",
		"iq": "_3VSlK6DYHrBgKbkE2Rng2N",
		"ir": "NRX2sFBmuPSJ9EOigyuEP",
		"is": "_25HaTNE7x74CJO9S1mnm4I",
		"it": "_1-LmlhbrcpKN-xjESmR_sO",
		"jm": "VsvDBply-4FtMoJhi8Cvu",
		"jo": "yEE3hbkzWK8CSCrCJibCo",
		"jp": "_3oxjjz1uD2cX2QsoSToLgz",
		"ke": "_1ksOT6KMPd99EWuWCXPga_",
		"kg": "_2CMnR3yv5DGwDc8p3uoOjp",
		"kh": "_927b1QnaSWnN35i3bVewJ",
		"ki": "_2CuDp55lqYTpFp68D4IWep",
		"km": "_3tvMTeZYZMzBB9bGn9lV9E",
		"kn": "_6kbCvwc22pJX0tNv3HToQ",
		"kp": "_3tIPOe5PNrHH-bgCGaZTJj",
		"kr": "_2653rpVUuy3ETaw1mogdnF",
		"kw": "_1SKg_lTe0ShbPSOl44eKjp",
		"ky": "tgj8SOv7bYoF7qfbbQWNG",
		"kz": "bchn50J152EdQa0zf3k5u",
		"la": "mu9oycLgpKX8_yLLkR5b9",
		"lb": "_2TcAFbagIrNyc6mgzRVNW0",
		"lc": "_2IFItnUNT-albvpN-ksxd2",
		"li": "_3_E6nQspv6zJQLQI24puaS",
		"lk": "_2M2wq3qQhGeUegbBTs7ilH",
		"lr": "L4o4xOg0s6QbasyIRPgyF",
		"ls": "LhBB6SRin61WSFtUwaEfe",
		"lt": "ITDUphrnMkKItKGMVHZf8",
		"lu": "_1mVW30sc4i-1M8tDPCQlL",
		"lv": "_3rq6vE2IagAsGI6iESAcJq",
		"ly": "_3se_Nzm1WQrEN3VZYiJJrv",
		"ma": "_fSDiNxp_jjfqkQcWffDM",
		"mc": "_2hRTRZeBtDGN4mNeWBZVgB",
		"md": "_26jDl0skadEwmUYDGmEzST",
		"me": "_388lJj_7sQdyd9HL7pMrar",
		"mg": "_3aFoqVWcvG3p47Vwa6UuoE",
		"mh": "_1YHi6OtXmKfP15ZNbwYGgy",
		"mk": "_9QVyhHcp8yH762J8fWXhC",
		"ml": "yYD99PoyhgFI4912_qoyJ",
		"mm": "URzk8-j7LcySpGUMJf_Qk",
		"mn": "_1J-lktQUTK0rydBz3foJGF",
		"mo": "_1sbL0zhHof-KbfGWu2qjqF",
		"mp": "_1tJjJlSjRw5AnqcXXmGwCI",
		"mq": "fHob9sxaJrTuqSc0xL744",
		"mr": "t-Bmj7a31aA-IwcRcL0ua",
		"ms": "_2xyT54DQP62zWDySH7-Kdy",
		"mt": "_1Ul_OlGODc8S0QplVq94PV",
		"mu": "_1yIBERRJqnV33pTq2VpKRc",
		"mv": "_3VqQ1QKRZyrVO6o8AvYgsR",
		"mw": "_3i8n-5-htdGNJLgn96O21",
		"mx": "_16-6zoyiVzSGB1O72cUTzV",
		"my": "_3W2P0D9eTN4BQoOcThOsaM",
		"mz": "wJ8icX7Asp3dSImkXOdTM",
		"na": "_1qt_F94mybbX5kr0ArtN-Z",
		"nc": "h82AMIuCGdKf69Hc_nM6D",
		"ne": "_2mVa5nGsijzD93WRl8dk64",
		"nf": "_3XQ9oUH_84SsdZLjpVRuqT",
		"ng": "_1uyyH1GZjsEk3YpaUSmmG6",
		"ni": "_22_3H6UeFo26o3fSavtQaX",
		"nl": "_93asfBYgR8C7bEDucZO8l",
		"bq": "_37A1nwIz7Z3obwUjmliw4s",
		"no": "_2-sVmkWiLn_ogTikc0c0Eg",
		"np": "_1PqZSwf5cuMNmbE7bpKe67",
		"nr": "_9q5Rg9Xn0G2buivFSGySP",
		"nu": "RLhVdyjL9Cex8ekaJqirU",
		"nz": "_1LHfwPg-iXjSTdjVKJ2BYn",
		"om": "_9mZYNhgBLiQg-j1FeVprJ",
		"pa": "_3S7TrzxJIEYVghUMVHB6E7",
		"pe": "_3V5sP7VvdGOFqApj7POYl2",
		"pf": "_1YzdrkyHO-eCcEFF-hjZl7",
		"pg": "ddWAanlQJPlB0QDWO6dAF",
		"ph": "_2TGbmCcqHlJFCssz78MxOs",
		"pk": "_2JerTABYGCUN8FLjpnDzKy",
		"pl": "_3X1Zo6JhS7aPUTPWCBJyzX",
		"pm": "_29Hoo7EsoSHtvRFvlVg2cD",
		"pr": "_3_pkwz60KLoYcbKwaRvIsS",
		"ps": "_3jenITZ_yUYS7kU1HwFEHj",
		"pt": "_1vz8ABWy5Yd43_JhaTWq9u",
		"pw": "_3Yr0RZMbOD2QJkTtMx_HIk",
		"py": "_1_W41pJLcGMRhLdU997clv",
		"qa": "Z0tjAakoNSOs14KuenmRi",
		"re": "_3k5KF4jzE7HUitQw9MQKnp",
		"ro": "_2b8XhT3-7NgjAC8gJJkpis",
		"rs": "_2MUJr9MQbiKRTd_g0TaRQr",
		"ru": "HjzPW2CxxNMSGZw1ugFW7",
		"rw": "_23TGIOoPmB9QYqIPG6W3tA",
		"sa": "_34WM8rSonfayW0vJ3koqJS",
		"sb": "_3486rZNsCjvTmIoHbjK8mG",
		"sc": "_3meAM_iQCU6MyfPQJTN3yl",
		"sd": "_2x6XeHNF__4s9VVfFXCJhO",
		"se": "_66VDclGQXxpdUR8uE3ZFa",
		"sg": "tv3I_hfLcUJ_8i9ewVcUz",
		"sh": "_1syDbbhbumwMwwD7Dwkb1V",
		"si": "_3jsffwJjGr2sMEofSTTGkG",
		"sk": "_1EpYAUcQLCqbYB48Auixqb",
		"sl": "_3STJQv9nY5mol4cW82D2ci",
		"sm": "_9aTR-AZMTaYHRmDVAyFTM",
		"sn": "_3mTatYTWeJQQACfV7xzRhi",
		"so": "_1LnWon2slwLMqAHzhkRT4c",
		"sr": "_1GSedFwSsf5isgOi3p0x6U",
		"ss": "_1sq99LOjKKgery3luOXOFn",
		"st": "_1O6vYx_NaXFBAs1qYxgwaB",
		"sv": "_10D9RGnRzUv14bYWQaC23c",
		"sx": "KonDEEzH2JzIWsVUBzFdY",
		"sy": "_1ZAnqGYeixOJVFwwt6hNIo",
		"sz": "_3FeOFkec3sXYbvQhWDdIM7",
		"tc": "_1FZvldKEV-vz12TyyNfEf",
		"td": "_31fysfDRtTWVKcX_UjX0ty",
		"tg": "H60Kyr6MsF6nvRz5l7EfN",
		"th": "SHZkbUz1c_H_zDOfxLc4",
		"tj": "_2MRI0fA4OLgepXVooYMu9H",
		"tk": "_1W959S9LHLCKhz3xi4MpHe",
		"tl": "_1lMF_0nwQXTyBRRzRj7hBF",
		"tm": "_2ZB_Dy2eRo6J0ylRkqC62I",
		"tn": "_2MeGi_bqLVuCaRtJzs3QqA",
		"to": "_3egwC_50WENVPaap_uwXr8",
		"tr": "_2KiPy3o6m7JCKQWPY2fI1d",
		"tt": "_3Hbn6Wi0dSnyrjdgeMmYmf",
		"tv": "_2D9VWSmHkhgNemAaIKF_cp",
		"tw": "_2J7nVAh1zEa7kV5Ba51CLV",
		"tz": "_2acF96LLqMjlbfMX1oiAjT",
		"ua": "_2rr3Tyr8dP6vDvE0khEDKT",
		"ug": "D7gjzKmlr78rNWXXw90np",
		"us": "_1l5RtWI_acgLVeCd5fjgHG",
		"uy": "_1zX6hTsIa2TtL6dgR47eQ9",
		"uz": "_29NUL3VtwK1_RWUyPsY2ei",
		"va": "_39kTgRBkhqqGVLUTJvK_67",
		"vc": "_2EwnB8Pe5TZDGdNIXOvzzg",
		"ve": "_3Lk2Svkm2NTAVpUfiY_No5",
		"vg": "_3SiYuGrNzW9DNkXwTZugyj",
		"vi": "_2BiiERObu5xcE6P1SZxLdj",
		"vn": "_3kSg6iW0KLoUpJ0g70fckK",
		"vu": "_1UdrzjuDjSDu6-DJ5yV9cQ",
		"wf": "Arz0xEqJcbKbLmPz_tXTS",
		"ws": "_3oTaxcmbTriEd90-cXNqD8",
		"ye": "gxtmCiQO2ao4JTQXuRUIJ",
		"za": "_25HyrYKmQQAteF_LwADnIt",
		"zm": "Kui2u7hZHcNBqlzbqR-vQ",
		"zw": "_3VPnIcPuwZ3cFvNOHPN8ar",
		"hide": "_2kO_U0LXcg71jJA6RSia2e",
		"v-hide": "_2HBc009zwTsSlkh8P8tH10",
		"invalid-number": "_17iYQoyXCPAB8XfsRqDdDH",
		"flag-dropdown": "_1JTLnRuUJ50FBWDCCCWc4b",
		"open-dropdown": "jG7mLbpUfq5nh2TzhXfBa",
		"selected-flag": "_10c169vRt8V92_nQ_S0KtR",
		"flag": "_2AEEM5AZQcsUPJUQZSd8Rr",
		"arrow": "_3GOH36qvhOwAJd2ppQ3AOB",
		"up": "_2ykRnfq4f2nlmZGfvzrn92",
		"country-list": "UlTusogWL2urjgGgLNpcD",
		"divider": "_2zMaTbM3nSdE07wOs7YYRt",
		"country": "uL848pHFWhb_G94Ak-KX5",
		"dial-code": "FxUYLz6b2tBEUXdb9DRqQ",
		"highlight": "BLa_2aA2PkYD2PsO2fvNC",
		"country-name": "_3ih_ovRiGmAkpjxuz63nhk",
		"uploadFile": "_3CUi48rtxy1m3Wz0o2aHk_",
		"fileUpload": "_2WENukerx3mNXkTyu0UXQf",
		"uploadLabel": "_1VYdz-DRIuPqCKWlu5Rd5W",
		"upload": "_2DUvBpBYzPWlV-6Yx2Pjas",
		"blackTxt": "Z1W_HNjnSJTqNclgOwR-3",
		"feedbackTextArea": "_14APtzGfaR_yoeAQJMJT5z",
		"errorModal": "_2PEnO-md-8qd3dF2cZGhMD",
		"gradeColor": "_16sNzVDnEzucQAxknLYKQQ",
		"red": "_3wj0AXV9gqX9YG1nk-2u9J",
		"green": "_3KPVxc3su8ewtuKZgu8TGv",
		"orange": "_3cLlE5QI9XJwY6e7jO5bLg",
		"capitalize": "_2yqvFrqWq4uakYy_s3eeMY",
		"importBtnBlock": "OwSu91np9HnUW1VdSX5hA",
		"importBtnUpload": "_2eJ0cgHJ9Qj4GAz9x1jChE",
		"importBtnInput": "_3ZCvqG4C-pjYzfgVNN8eze",
		"icon": "_12rnwIUewKT2PdtWMnNyD5",
		"importFileOnclick": "_2qsz43E0kYpZO89nXXV13S",
		"broadcastWhiteCard": "_2Vf8tRdA-IkCpzrPwrxoLi",
		"broadcastNews": "eK8W5URbLbE8ER1zsFc6V",
		"btnPost": "_30ipfhZp6Vv-ikKnFNtEI7",
		"textArea": "_3uPzOKXSyhgfRUhfmeVwfC",
		"spinnerCss": "_1ouaIjiJ2MFv5PI5UqZ1ev",
		"pdfView": "_2DquMFdC6rEzAaWJ2U-ahy",
		"lineHight32": "_3RF4CWuoSHP3JddZnzrhZh",
		"removePdng": "_3XuIzA6t9BoFiZfEFhOn3f",
		"inputAllCap": "_6YEeMYUnLHaS691RRjq7L",
		"popHeadingAll": "_2suWB3cd5kOd2yUCJCr640",
		"dateControls": "_1BrlYTxzEBCsm_zJ9PPGkp",
		"dateRange": "_1JBu7w3GlOnQBH8oh1-EXg",
		"applyBtn": "_2Rz8lBsFU8i7B9Ia-G-cv3",
		"filterTxt": "_1Wdy1Hr8CUuuK8O9Liz3yi",
		"btnApplyAll": "_1Y_QiGh-mkiUfuuiix0Yeb",
		"assCanvas": "_2Ue4kVYDy-eQJrbNCKv0yC",
		"pdfBlock": "_3UAEHpi6NrNz6ZDh2Lfk0E",
		"assTab": "y4LW63OuadI0JWTQBnbJ1",
		"heightForScroll": "_1s76YPnhEAnqK63LsEzIZh",
		"radioNewProfile": "_1RD_hASO-4hwDMMDABPgkH",
		"wrapper": "IVU-3tPtgRn_cBMA2jD_Y",
		"leftBox": "_2c_UkbRVkIhCuEx7sFrhEz",
		"rightBox": "DP21PoKxwKk_vJyOuQTcr",
		"gradeBlock": "_1KaDEKb6KgB6xx-gEx-KTu",
		"actionBoxTop": "_10AdTDYinFiKZ9H30uacSD",
		"gradeBody": "_2pAeBQb2ZLvpxG09x5oJnS",
		"actionBoxBottom": "_1UHK6epVvw6XZJ1KLDuQuI",
		"gradeGroup": "_3VI0hvgPHy6r31t8WOJVDq",
		"morePref": "JBm94eKPIFI8vfiroATJ6",
		"tile": "_1Ssp2zTovh7AwJWuRkgnge",
		"tileItems": "_3cDqgy8AedDYzhy8Euosis",
		"tileHeader": "_1LhZQenbqV0FNu-ykdOEI3",
		"tileHeaderLeft": "_2MwtFA5OodvfH7RxQPCPQ_",
		"category": "_2Ow56TBY2Y24yY5SjVRU4l",
		"innerScoreBoth": "ndEN_RpJfrJ_tKG_RA68v",
		"maxScore": "_3uL97t2vemfuAs83cAFhjE",
		"maxScoreInput": "TKf_xWbkl0UNSxyusGMn8",
		"scored": "_12gGWK_s69JBGzOAX7ClkT",
		"scoreInput": "_2Mk4HrrcAyqwuFRTOgl3lh",
		"remTile": "_3vgBsvWRGVVRwIEDn1TquO",
		"tileBody": "dF1WC_PeNjG87K2XGMIcS",
		"tileRatings": "_2CCbhFQsjWGMpVC9Wui7Vr",
		"gradeBox": "_1yi9i3Jl0hqMYPn1Tgv_cF",
		"gradeDisabledBox": "_14nvGiDb0wY_EIfoptsCdF",
		"assignmentResultActive": "_2tWSBiPrHoK1xrmZ6QsC-W",
		"blue": "K7acjAQMroOGGtUqqojYy",
		"yellow": "G7N-PGOIbGO_ZkaqBu2mx",
		"txtGreen": "_3ozvzoCtqRqS2AzlUELKKF",
		"txtBlue": "_4IOpBzUT2qYXMYt5UKiJP",
		"txtYellow": "_27BE3ODkiyosiM3HqlgtFT",
		"txtOrange": "_3uTqWL645yWk5qXsaxxH_M",
		"txtRed": "_3WDBRR7fo7Gn2KKo7rrE_Q",
		"txtppl": "_3nfbHs21ZfqnZ9n2wICEDb",
		"addTile": "lCw_kxhsAPcuM3yFAqvpF",
		"addContral": "_1aQuHhQkJrKTdNBYcoAQFh",
		"addIconCircle": "_2lFLErjrZAe1ZXjCbykAVD",
		"commentBox": "_2h0b9sj0Y_QpQzSh6njVoO",
		"totalScore": "FDG4LAia-7JDDtxb7R4Kb",
		"totalScoreInput": "_23XbNFEiJgqq0S35rhnpj6",
		"textBox": "_13VdIFmMegxz_eR8VIXN_M",
		"totalScoreSpan": "_2Pj4PN_f9FgyLDc9JE4vu9",
		"totalScoreText": "_1YbsVQIx_uSOAygZtwoTNK",
		"resultBox": "_3XB8yAFjZjZubswP7rs3Lt",
		"resultBlock": "FmvbKk1ChtYs7Lm76nRaX",
		"resultHeader": "_1AWxMTonqDqoWhnz1g9d-d",
		"headingTxt": "_1GSvGEp7hTrEpIa-UkynQZ",
		"scoreBox": "_3HTg1VUMSPfLvdZUBsj2N_",
		"resultBody": "N6kKlySaRGbRcB4bBmpZ0",
		"resGroup": "_2byM-_1N3yjHb2dpmlikdf",
		"resTile": "DZeuj4DKkdAPKCgYd76RK",
		"resCriteria": "_22AwZF3M7Ffw8GTgoz2DSi",
		"resRating": "R7j9mxFZmdmLgC7bPXpyN",
		"txtSize": "_977ldMQMMiHQ0YG_61T3g",
		"txtplBlue": "_27vNfTLrgUcEIvntpfFS_N",
		"resScored": "_1T5pr7r7hw9rq_NyVSB0lM",
		"resInput": "_14gsxA36f-uYOfxGDvr_gi",
		"activeTxt": "_3mkD5eqWDun2pAM_mx16kZ",
		"feedbackBox": "_1ae7KB7aTT79QKO6O85GzI",
		"fbHeader": "idU-Kkkc7R8cdYS_Ayh47",
		"feedbackGroup": "AKd59EZ_Qjl6GE1amJRlx",
		"profileBox": "_1JFzTlQEl2bDxwqAx77fbj",
		"profileImg": "_3k-2OFHHSzyQUB7Zkcc21l",
		"profileDetails": "_2wxDQDzYCXmmG6lQaOlEj7",
		"name": "_25-6SxUiv8zhOMEVTRrg8w",
		"commentTxt": "_2tLMve1A4CHR8jTUu5J1jI",
		"addpdng": "_6rQH8tivz8ELIWszpbahs",
		"good": "_3lOxcxDfxhPcuhLBJHo4Ur",
		"vGood": "l_IAfocpDxfvpU316U0EI",
		"fair": "_3I3YapUnBVxgs-ZsGf3Poh",
		"poor": "_1uSJT6ULTWAvr1S_77KhIZ"
	};
	
	var _component2 = _interopRequireDefault(_component);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ = __webpack_require__(7);
	
	var TopMenu = function (_Component) {
		_inherits(TopMenu, _Component);
	
		function TopMenu() {
			_classCallCheck(this, TopMenu);
	
			return _possibleConstructorReturn(this, (TopMenu.__proto__ || Object.getPrototypeOf(TopMenu)).call(this));
			// this.state.userRole = 0;
		}
	
		_createClass(TopMenu, [{
			key: 'getSchema',
			value: function getSchema() {
				// console.log(this.props.data);
				// console.log(typeof this.props.data.menus[1].action);
				return this.props.data.menus;
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {}
			// console.log(this.props);
			// this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
			//               )).then(res => this.setdata(res));  
	
	
			// setdata(result){
			//   if (result && result.data && result.data.role)
			//   	this.setstate({ userRole : result.data.role });
			// }
	
		}, {
			key: 'renderMenus',
			value: function renderMenus() {
				var role = this.props.loggedInData && this.props.loggedInData.data ? this.props.loggedInData.data.role : -1;
				// console.log("role === ",role);
				var importText = {
					padding: '0 0 8px 0',
					margin: '0'
				};
				var importIcon = {
					marginTop: '8px'
				};
	
				var _ref = _jsx(_reactFontawesome2.default, {
					name: 'download',
					style: importIcon
				});
	
				var objMenus = this.getSchema().map(function (menu) {
					// console.log(menu); /*href={menu.action}*/
					if (!menu.role || menu.role && menu.role.length <= 0 || menu.role && _.indexOf(menu.role, role) != -1) {
						// if(this)
						// console.log("Allowed==", menu.role);
						if (menu.actionType == "Function") {
							var li_css = menu._id == this.props.activeIcon ? { "pointerEvents": "none", "opacity": "0.6" } : {};
							return _jsx('li', {
								style: li_css
							}, menu._id, _jsx('a', {
								id: menu._id,
								onClick: menu.action
							}, void 0, _jsx('i', {
								className: menu.icon
							}), _jsx('span', {}, void 0, menu.text)));
						} else if (menu.actionType == "URL") {
							var _li_css = menu._id == this.props.activeIcon ? { "pointerEvents": "none", "opacity": "0.6" } : {};
							return _jsx('li', {
								style: _li_css
							}, menu._id, _jsx(_reactRouter.Link, {
								to: menu.action,
								id: menu._id
							}, void 0, _jsx('i', {
								className: menu.icon
							}), _jsx('span', {}, void 0, menu.text)));
						} else if (menu.actionType == "Upload") {
							var _li_css2 = menu._id == this.props.activeIcon ? { "pointerEvents": "none", "opacity": "0.6" } : {};
							return _jsx('li', {
								style: _li_css2,
								id: menu._id
							}, menu._id, _jsx('div', {
								className: _component2.default.importBtnBlock
							}, void 0, _jsx('div', {
								className: _component2.default.importBtnInput
							}, void 0, _jsx('span', {
								className: _component2.default.icon
							}, void 0, _ref), _jsx('input', {
								className: _component2.default.importFileOnclick,
								id: 'fileUploadIcon',
								type: 'file',
								accept: '.xlsx,.xls,.xml,.ods',
								onChange: menu.action,
								value: ''
							})), _jsx('p', {
								style: importText
							}, void 0, menu.text)));
						} else if (menu.actionType == "Download") {
							var _li_css3 = menu._id == this.props.activeIcon ? { "pointerEvents": "none", "opacity": "0.6" } : {};
							return _jsx('li', {
								style: _li_css3
							}, menu._id, _jsx('a', {
								href: menu.action,
								id: menu._id,
								download: true
							}, void 0, _jsx('i', {
								className: menu.icon
							}), _jsx('span', {}, void 0, menu.text)));
						}
						// console.log("Not Allowed==", menu.role)
					} else {}
				}.bind(this));
	
				return objMenus;
			}
		}, {
			key: 'render',
			value: function render() {
				var cls = '' + _component2.default.iMenuContainer;
				return _jsx('div', {
					className: cls
				}, void 0, _jsx('ul', {}, void 0, this.renderMenus()));
			}
		}]);
	
		return TopMenu;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
		return {
			loggedInData: (0, _LoginReducer.loggedInData)(state)
		};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(TopMenu);

/***/ },

/***/ 356:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _expressions = __webpack_require__(357);
	
	var _validator = __webpack_require__(12);
	
	var _validator2 = _interopRequireDefault(_validator);
	
	var _reactIntl = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _ = __webpack_require__(7);
	
	var Validator = function () {
		function Validator() {
			_classCallCheck(this, Validator);
		}
	
		_createClass(Validator, null, [{
			key: 'activeSubMenu',
			value: function activeSubMenu(menu, key) {
				_.forIn(menu.menus, function (obj, index) {
					if (obj._id == key) obj.active = 'active';else obj.active = '';
				});
				return menu;
			}
		}, {
			key: 'freeError',
			value: function freeError(schema) {
				_.forIn(schema.schemas, function (schemaObj, schemakey) {
					_.forIn(schemaObj, function (colObj, colVal) {
						_.forIn(colObj, function (fieldObj, fieldVal) {
							if (fieldObj.type != "hidden" || fieldObj.type != "title") {
								fieldObj.error = "";
							}
						});
					});
				});
				return schema;
			}
		}, {
			key: 'freeValue',
			value: function freeValue(schema) {
				_.forIn(schema.schemas, function (schemaObj, schemakey) {
					_.forIn(schemaObj, function (colObj, colVal) {
						_.forIn(colObj, function (fieldObj, fieldVal) {
							if (fieldObj.type != "hidden" || fieldObj.type != "title") {
								fieldObj.error = "";
							}
							if (fieldObj.type == "text" || fieldObj.type == "textarea" || fieldObj.type == "password" || fieldObj.type == "search" || fieldObj.type == "date" || fieldObj.type == "email") {
								fieldObj.value = "";
							} else if (fieldObj.type == "phone" || fieldObj.type == "checkbox") {
								fieldObj.value = [];
							} else if (fieldObj.type == "dropdown") {
								//console.log("text === ",fieldObj.text);
								//console.log("data === ",fieldObj.data);
								/*let val;
	       if(fieldObj.value)
	       	val = fieldObj.value;
	       else*/
								var val = fieldObj.data[0][0];
								fieldObj.value = val;
							}
						});
					});
				});
				return schema;
			}
		}, {
			key: 'validate',
			value: function validate(dataObj, schema, role, intl) {
	
				/*_.forIn(dataObj, function(value, key) {
	     console.log("key === ",key);
	     console.log("value === ",value);
	   	});*/
				//console.log(intl);
	
				var errmsg = [];
	
				_.forIn(schema.schemas, function (schemaObj, schemakey) {
					_.forIn(schemaObj, function (colObj, colVal) {
						_.forIn(colObj, function (fieldObj, fieldVal) {
							if (!fieldObj.role || fieldObj.role && fieldObj.role.length <= 0 || fieldObj.role && _.indexOf(fieldObj.role, role) != -1) {
								if (fieldObj.type != "hidden" || fieldObj.type != "title" || fieldObj.type != "view") {
									var val = _.result(dataObj, fieldObj.datafield);
									// console.log(fieldObj.text+" ======   "+val);
	
									//Code changed by - Najib Hasnain, Desc - Required error messages are shown based on input field type  
									if (fieldObj.required) {
										if (val == "" || val == undefined) {
											if (fieldObj.type == 'dropdown' || fieldObj.type == 'dynamicdropdown') {
												var newMsg = '';
												if (!intl.messages[fieldObj.text.props.id].match(/select/i)) {
													newMsg = intl.messages['select_dropdown'] + ' ' + intl.messages[fieldObj.text.props.id];
												} else {
													newMsg = intl.messages[fieldObj.text.props.id];
												}
												fieldObj.error = intl.messages['requiedField'] + ' ' + newMsg;
												errmsg.push(fieldObj.error);
											} else if (fieldObj.type == 'date') {
												fieldObj.error = intl.messages['requiedFieldDate'] + ' ' + intl.messages[fieldObj.text.props.id];
												errmsg.push(fieldObj.error);
											} else {
												fieldObj.error = intl.messages['requiedFieldText'] + ' ' + intl.messages[fieldObj.text.props.id];
												errmsg.push(fieldObj.error);
											}
										} else {
											fieldObj.error = "";
										}
									}
									if (val == "" || val == undefined) {
										if (fieldObj.type == "phone") fieldObj.value = [];else fieldObj.value = "";
									} else {
										fieldObj.value = val;
									}
									//console.log("fieldObj === ",fieldObj);
									//console.log(fieldObj.text+" ======   "+fieldObj.value);
									if (fieldObj.exp != undefined && fieldObj.exp != "") {
										if (val.length > 0) {
											var strRegExp = RegExp(_expressions.Expressions.get(fieldObj.exp));
											if (String(strRegExp) != "/(?:)/") {
												if (!strRegExp.test(val)) {
													if (fieldObj.errormsg) {
														fieldObj.error = fieldObj.errormsg;
														errmsg.push(fieldObj.errormsg);
													} else {
														fieldObj.error = intl.messages['validInputData'] + ' ' + intl.messages[fieldObj.text.props.id];
														errmsg.push(fieldObj.error);
														// fieldObj.error = "Invalid Format.";
														// errmsg.push("Invalid Format.");
													}
												} else {
													fieldObj.error = "";
												}
											}
										}
									} else if (fieldObj.type == "phone") {
										if (val.length > 0) {
											var number = val[1];
											var code = val[0];
											var format = val[2];
											var check = true;
											if (number && format) {
												if (number.length == format.length) {
													for (var i = 0; i < format.length - 1; i++) {
														if (format[i] != number[i] && format[i] != '.' && /^[0-9]$/.test(+number[i])) {
															check = false;
														}
													}
												} else {
													check = false;
												}
											}
											if (!check && number != '+91') {
												fieldObj.error = intl.messages['validInputData'] + ' ' + intl.messages[fieldObj.text.props.id];
												errmsg.push(fieldObj.error);
											} else fieldObj.error = '';
										}
									} else if (fieldObj.type == "date" && val == "false") {
										fieldObj.error = intl.messages['validInputData'] + ' ' + intl.messages[fieldObj.text.props.id];
										errmsg.push(fieldObj.error);
									}
								}
							}
						});
					});
				});
	
				// console.log("schema === ",schema.schemas);
	
				return { schema: schema, error: errmsg };
			}
		}]);
	
		return Validator;
	}();
	
	exports.default = Validator;

/***/ },

/***/ 357:
/***/ function(module, exports) {

	"use strict";
	"use strict";
	
	var expressions = new Map();
	expressions.set("EMAIL", "(^(([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|([.]))){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}) )");
	expressions.set("ALPHA", "^[A-Za-z]+$");
	expressions.set("ALPHAwithLIMIT", "^[A-Za-z]{1,15}$");
	expressions.set("ALPHAwithSPACE", "^[A-Za-z\\s]+$");
	expressions.set("ALPHANUMERICwithSPACE", "^[A-Za-z0-9\\s]+$");
	expressions.set("ALPHANUMERIC", "^[A-Za-z0-9]+$");
	expressions.set("SPACE", "[^\\s+$]");
	
	expressions.set("URL", "^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");
	expressions.set("PHONENO", "^[0-9]{10}$");
	expressions.set("NUMBER", "^[0-9]+$");
	expressions.set("LIMIT", "^([0-9])|([-]1)+$");
	expressions.set("DATE", "^(?:(?:31\/(?:0?[13578]|1[02]))\/|(?:(?:29|30)\/(?:0?[1,3-9]|1[0-2])\/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])\/(?:(?:0?[1-9])|(?:1[0-2]))\/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$");
	expressions.set("FULLTIME", "^(?:[0,1][0-9]|2[0-3]):(?:[0-5][0-9])$");
	
	expressions.set("HALFTIME", "^(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM))$");
	
	expressions.set("TIME", "^(?:(?:0[1-9]|1[0,1]):(?:[0-5][0-9]))$|^(?:12:00)$|^(?:00:(?:0[1-9]|[1-5][0-9]))$");
	
	expressions.set("PINCODE", "^[0-9]{6}$");
	
	expressions.set("DATETIME", "^(?:(?:(?:(?:31\/(?:0?[13578]|1[02]))\/|(?:(?:29|30)\/(?:0?[1,3-9]|1[0-2])\/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2}))|(?:(?:29\/0?2\/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))))|(?:(?:0?[1-9]|1\\d|2[0-8])\/(?:(?:0?[1-9])|(?:1[0-2]))\/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})))(?:\\s(?:(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM)))|(?:(?:12:00)\\s((AM)|(PM))))$");
	
	expressions.set("USERNAME", "^[A-Za-z]{5,20}$");
	expressions.set("PASSWORD", "^[A-Za-z0-9]{6,}$");
	
	exports.Expressions = expressions;

/***/ },

/***/ 377:
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
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactRouter = __webpack_require__(3);
	
	var _apiCaller = __webpack_require__(8);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _component = {
	  "form-control": "QmIrbtmLmFNpHdWMqFMWS",
	  "innerWhiteTopic": "_32MPoieZt8YkhQqGNafOkY",
	  "colonBlack": "_3WjF6qk6LGz-u5ks49gdcB",
	  "error": "_3jAfmA6J7YmNDyB2VfsCxP",
	  "mandatory": "_1cwTV0Re5ORIhqzxJLXMH1",
	  "dynamicBreadCrumb": "_3QcYRL_UPZtqWKDFd5rcZB",
	  "iElement": "_2crZNiFs8z8oNhzPDC1qOE",
	  "oElement": "_1jUn1j1KBWo8dmqJ_0hdBD",
	  "iLabel": "_3Pyvct_srCoSvJCgGG41jw",
	  "oLabel": "NsxWZpxBqBX8wky_O477_",
	  "iForm": "_3IlToa7pigrSS8KWut_dJ8",
	  "oForm": "_3N0YNUcfI5U02VSmBEbYot",
	  "iFormField": "_12yKSn29WLZIE6fvGQfcrN",
	  "oFormField": "_5FMFIwRlrpPkQn-lkZ65Z",
	  "iFormGroup": "_1LZRfACwm57iOGUxKozUVE",
	  "oFormGroup": "_386CxczA49XX2-ejr3Qe55",
	  "formNext": "ccTxjcG6_GZO9OgzW33HT",
	  "iSubFormGroup": "u1jVXJqFT0vqGYzzRAhFY",
	  "oSubFormGroup": "DDmyOnrHoBdsklkH9petO",
	  "iContainer": "_2wz-gNWcGQfLXBCiToDWjI",
	  "oContainer": "_2tEAAtqgoutuOUU96rNvv1",
	  "iSubMenu": "XCOXe3mm5CZP0qxtnZPyC",
	  "oSubMenu": "_1Rx5COiw9Ae92TeE3LnwRm",
	  "iTopMenu": "_34RmLz4U_lA3sL18SjVR2-",
	  "iMenuContainer": "N8LzghkGxja2Hkx0A-vzE",
	  "whiteTopMenu": "YQfoPq5fhhEoPFvP-VF1W",
	  "iSubMenuContainer": "_357Fb5CZ0VyABwYB9VmmIE",
	  "active": "_2fF1Q9nO2O_1B8Ldb4RM52",
	  "scheduleerror": "_34M0UOwV0tW7xV7AV2Cz7P",
	  "errorPre": "_1ft-as7ic7_8EXp1iz5sfW",
	  "errorclass": "_3jvk8bfxyC_tWLn1pBOytU",
	  "whiteCard": "L2E7_Tzcp2MrkuuUlBf3t",
	  "greyCard": "_34l9W17Mt1koxHLd1yUqgk",
	  "reactTelInput": "_2OA1bLJ7mQFTEL9gP1dDif",
	  "countryList": "_2ARbPU2OQ7JLphJ2g0U0F-",
	  "react-tel-input": "_2PMN3xMEp7kCR8iQoBjSrd",
	  "ad": "N3bKXyhfwvWT3eAEC9Nno",
	  "ae": "taXUT8yfjgRMeSH3rMNxy",
	  "af": "_2vH4qShCgBPBO4GR8BdNvd",
	  "ag": "n8QfWtvpZLMpatCUqX2Td",
	  "ai": "_3fPX_RcpesOPxFsmsaygCE",
	  "al": "_1T12tbcC6990b-fIMG5LYW",
	  "am": "_31HdarMDfXvAgjizVUoeHk",
	  "ao": "_1Zb9qi0G-pe7OWK-cu6BoS",
	  "ar": "_2qJleMgRbIErIrx3kQF57O",
	  "as": "_2ZPVYL8Vjn-vdWZToCEhjN",
	  "at": "_1hWilvnrVbANEHRyLGlF-m",
	  "au": "_2zJE4K6o-ftWqhb3exXZgk",
	  "aw": "_1UroMxX5JHt9bjGdHwa1OY",
	  "az": "_-Y2xueZ_1mEtB9YDOqEGB",
	  "ba": "_2FSEeZiYqoYo0pJ5J2uXJC",
	  "bb": "_34600Kl8Wac9Hx7S3-3U6b",
	  "bd": "_3WBX90V5VJXA7-vSUfEWCh",
	  "be": "BcK33edOPcbYdkxxvOApy",
	  "bf": "ShN64-J7UZdswoQjkf7L_",
	  "bg": "_2A9PgkQEF5_KbvHvDf6_lY",
	  "bh": "_10p3rxNRYOhv8-BtZuq1w8",
	  "bi": "_6MzP1qXXDFAZVL7nBmRiH",
	  "bj": "_2U8H1sji9LfDEW706KyKvF",
	  "bm": "_3AOdFLNLEBMwpaIygqQ4Zo",
	  "bn": "PgMDvF79WHl3kaklOmhw3",
	  "bo": "_7MheGVInaTi-QLxw5PiUi",
	  "br": "_1BDNUyT0cHDlbCBFgrrLkJ",
	  "bs": "_3vcASZB5bu7mJAzTzaRkWe",
	  "bt": "esu4pvyd9ZFWrf-etnrva",
	  "bw": "_2Hbv1I361RJFK3Ph2xPlu_",
	  "by": "_2tbYam6Og8RAicMhX9SXvI",
	  "bz": "_3xB704PIgqFnU2zTG-JZFN",
	  "ca": "_36FyK29nkNl9Ez7yWh04AS",
	  "cd": "_9PnHTqK1pSn_GIAbBtPT2",
	  "cf": "_2LgMF7o1A3a2cgw5jkpvZV",
	  "cg": "_3hYc9Y3UdCphltZKe2vJWk",
	  "ch": "_3BLJ9WmZAyoQNVnGDTm0hl",
	  "ci": "FoSGkvvMDFAVcvsZBWX-Z",
	  "ck": "_1742IgEaHW3SZU7h_-nkwr",
	  "cl": "_36IaMt7ntEwUsH4lwN4tW-",
	  "cm": "_1N8krqbPtlsEVsh6SaCetm",
	  "cn": "IfkD3fwbUSx9FZflX6iIU",
	  "co": "_3Y7u7ONzxyZVjZYzS1OHTr",
	  "cr": "Gw5Qz4qBNZjPDmpQmi-d2",
	  "cu": "ZuHtEp_knwZcbwTTJkRgI",
	  "cv": "o6BzJCyjRH1pOsf_HpbQ6",
	  "cw": "hRElJCQXyNIITDZ6UQVut",
	  "cy": "_2cHKWrINPNO6L8BEOdtJCG",
	  "cz": "nS617LE8Qcckdv9HJTWpt",
	  "de": "fqJD93WBywDPs0lrLEXLT",
	  "dj": "_1Rb2ZC6bLR2kLQHrXt3fi1",
	  "dk": "_3fpBLMtuUi0kowy3ziMRYd",
	  "dm": "_3gMwGkQW-OGFx1U7vd7VMD",
	  "do": "G9EZGjpXLJUyQuREesyGO",
	  "dz": "_3Nka0vwv6nZpeugyuqYQIJ",
	  "ec": "_18t83SdIOs8EY6iF0zV0CZ",
	  "ee": "_1miCbYr55XmBKvcUu6XetR",
	  "eg": "_1T55wMh1svM7M5QGxFM2ex",
	  "er": "c0Ab9spCQ4VnXr_6xijnD",
	  "es": "_1lutiEL9tJpdNgKmnTT6Ld",
	  "et": "_2GGXIPO2kOV6CUsu65V4Z3",
	  "fi": "_1I-g5oWpQznT5QZuBfQ8A",
	  "fj": "_3oeTP_GhC_XzsjzHW86oDc",
	  "fk": "_3-_BjK4NArHS0nyf0DLc4F",
	  "fm": "_1WQYGDC-zTatxog3SIwE80",
	  "fo": "_2Xp5yMjRKQGGiCb4PPbdrr",
	  "fr": "_3-mqatBXfaTfex8LWjnIDA",
	  "bl": "_3QJ0ZMybaJjeqWZHvkXeIl",
	  "mf": "_34f4ya9mcbpIcQPgHJ4I6c",
	  "ga": "_15_iO4CJaXbX7PySxoldPF",
	  "gb": "_1vZuFSSey59_ixozre-0L_",
	  "gd": "_26Ub0jcjDpVD4nwM7m5n4e",
	  "ge": "_27ctDR0Hf6HO15MgHS8wyh",
	  "gf": "_2S6C39D4wNBuVSqzYM5Ldy",
	  "gh": "_3vjGi6-umA-RzwxRFaTfNN",
	  "gi": "_1VP2WL3_4ou1de2Ng8Wmd_",
	  "gl": "_1OTvyS4D4UOkymKuDLxUdx",
	  "gm": "_3-0gezNOVCHKzaLYGUySo2",
	  "gn": "_8f6uadrEfnS9IX8DEIpKO",
	  "gp": "_36yEj9UcEbZcI0WJvgmk0B",
	  "gq": "xHX18x9xk7PhDBlgsvnad",
	  "gr": "HTk_eFej1VrCiBuKBIfLT",
	  "gt": "hgmUbzxaHNZNL6frPhPeb",
	  "gu": "_3qeSb_MjyQ-VPPpwNWgXpl",
	  "gw": "_36JwaXqhh4gBrIvAy4c1KO",
	  "gy": "_3ZZcZTZlIH4DUUQ2BIamaK",
	  "hk": "_1mT74O5OVtonPLmYnVVOu7",
	  "hn": "_1ze0KI-TYxTrDcXlMOu24s",
	  "hr": "ZIDUSRfcbDCZTyhqWGPob",
	  "ht": "Y65Ad5pf3z7ufcknP0vhk",
	  "hu": "_3EHKICvcensXt5hEu8Nkfs",
	  "id": "_3oZE8uvxIFK7M9DCEtsSCD",
	  "ie": "_2RNmpg94YYioQp2fWyz_xn",
	  "il": "_2Mq_no7KYxPp2NSLGS1Tcs",
	  "in": "_1UlEZ269GihRa58c5mCEBN",
	  "io": "_3ovelrc7S_DdmXxL-8uuwk",
	  "iq": "_3VSlK6DYHrBgKbkE2Rng2N",
	  "ir": "NRX2sFBmuPSJ9EOigyuEP",
	  "is": "_25HaTNE7x74CJO9S1mnm4I",
	  "it": "_1-LmlhbrcpKN-xjESmR_sO",
	  "jm": "VsvDBply-4FtMoJhi8Cvu",
	  "jo": "yEE3hbkzWK8CSCrCJibCo",
	  "jp": "_3oxjjz1uD2cX2QsoSToLgz",
	  "ke": "_1ksOT6KMPd99EWuWCXPga_",
	  "kg": "_2CMnR3yv5DGwDc8p3uoOjp",
	  "kh": "_927b1QnaSWnN35i3bVewJ",
	  "ki": "_2CuDp55lqYTpFp68D4IWep",
	  "km": "_3tvMTeZYZMzBB9bGn9lV9E",
	  "kn": "_6kbCvwc22pJX0tNv3HToQ",
	  "kp": "_3tIPOe5PNrHH-bgCGaZTJj",
	  "kr": "_2653rpVUuy3ETaw1mogdnF",
	  "kw": "_1SKg_lTe0ShbPSOl44eKjp",
	  "ky": "tgj8SOv7bYoF7qfbbQWNG",
	  "kz": "bchn50J152EdQa0zf3k5u",
	  "la": "mu9oycLgpKX8_yLLkR5b9",
	  "lb": "_2TcAFbagIrNyc6mgzRVNW0",
	  "lc": "_2IFItnUNT-albvpN-ksxd2",
	  "li": "_3_E6nQspv6zJQLQI24puaS",
	  "lk": "_2M2wq3qQhGeUegbBTs7ilH",
	  "lr": "L4o4xOg0s6QbasyIRPgyF",
	  "ls": "LhBB6SRin61WSFtUwaEfe",
	  "lt": "ITDUphrnMkKItKGMVHZf8",
	  "lu": "_1mVW30sc4i-1M8tDPCQlL",
	  "lv": "_3rq6vE2IagAsGI6iESAcJq",
	  "ly": "_3se_Nzm1WQrEN3VZYiJJrv",
	  "ma": "_fSDiNxp_jjfqkQcWffDM",
	  "mc": "_2hRTRZeBtDGN4mNeWBZVgB",
	  "md": "_26jDl0skadEwmUYDGmEzST",
	  "me": "_388lJj_7sQdyd9HL7pMrar",
	  "mg": "_3aFoqVWcvG3p47Vwa6UuoE",
	  "mh": "_1YHi6OtXmKfP15ZNbwYGgy",
	  "mk": "_9QVyhHcp8yH762J8fWXhC",
	  "ml": "yYD99PoyhgFI4912_qoyJ",
	  "mm": "URzk8-j7LcySpGUMJf_Qk",
	  "mn": "_1J-lktQUTK0rydBz3foJGF",
	  "mo": "_1sbL0zhHof-KbfGWu2qjqF",
	  "mp": "_1tJjJlSjRw5AnqcXXmGwCI",
	  "mq": "fHob9sxaJrTuqSc0xL744",
	  "mr": "t-Bmj7a31aA-IwcRcL0ua",
	  "ms": "_2xyT54DQP62zWDySH7-Kdy",
	  "mt": "_1Ul_OlGODc8S0QplVq94PV",
	  "mu": "_1yIBERRJqnV33pTq2VpKRc",
	  "mv": "_3VqQ1QKRZyrVO6o8AvYgsR",
	  "mw": "_3i8n-5-htdGNJLgn96O21",
	  "mx": "_16-6zoyiVzSGB1O72cUTzV",
	  "my": "_3W2P0D9eTN4BQoOcThOsaM",
	  "mz": "wJ8icX7Asp3dSImkXOdTM",
	  "na": "_1qt_F94mybbX5kr0ArtN-Z",
	  "nc": "h82AMIuCGdKf69Hc_nM6D",
	  "ne": "_2mVa5nGsijzD93WRl8dk64",
	  "nf": "_3XQ9oUH_84SsdZLjpVRuqT",
	  "ng": "_1uyyH1GZjsEk3YpaUSmmG6",
	  "ni": "_22_3H6UeFo26o3fSavtQaX",
	  "nl": "_93asfBYgR8C7bEDucZO8l",
	  "bq": "_37A1nwIz7Z3obwUjmliw4s",
	  "no": "_2-sVmkWiLn_ogTikc0c0Eg",
	  "np": "_1PqZSwf5cuMNmbE7bpKe67",
	  "nr": "_9q5Rg9Xn0G2buivFSGySP",
	  "nu": "RLhVdyjL9Cex8ekaJqirU",
	  "nz": "_1LHfwPg-iXjSTdjVKJ2BYn",
	  "om": "_9mZYNhgBLiQg-j1FeVprJ",
	  "pa": "_3S7TrzxJIEYVghUMVHB6E7",
	  "pe": "_3V5sP7VvdGOFqApj7POYl2",
	  "pf": "_1YzdrkyHO-eCcEFF-hjZl7",
	  "pg": "ddWAanlQJPlB0QDWO6dAF",
	  "ph": "_2TGbmCcqHlJFCssz78MxOs",
	  "pk": "_2JerTABYGCUN8FLjpnDzKy",
	  "pl": "_3X1Zo6JhS7aPUTPWCBJyzX",
	  "pm": "_29Hoo7EsoSHtvRFvlVg2cD",
	  "pr": "_3_pkwz60KLoYcbKwaRvIsS",
	  "ps": "_3jenITZ_yUYS7kU1HwFEHj",
	  "pt": "_1vz8ABWy5Yd43_JhaTWq9u",
	  "pw": "_3Yr0RZMbOD2QJkTtMx_HIk",
	  "py": "_1_W41pJLcGMRhLdU997clv",
	  "qa": "Z0tjAakoNSOs14KuenmRi",
	  "re": "_3k5KF4jzE7HUitQw9MQKnp",
	  "ro": "_2b8XhT3-7NgjAC8gJJkpis",
	  "rs": "_2MUJr9MQbiKRTd_g0TaRQr",
	  "ru": "HjzPW2CxxNMSGZw1ugFW7",
	  "rw": "_23TGIOoPmB9QYqIPG6W3tA",
	  "sa": "_34WM8rSonfayW0vJ3koqJS",
	  "sb": "_3486rZNsCjvTmIoHbjK8mG",
	  "sc": "_3meAM_iQCU6MyfPQJTN3yl",
	  "sd": "_2x6XeHNF__4s9VVfFXCJhO",
	  "se": "_66VDclGQXxpdUR8uE3ZFa",
	  "sg": "tv3I_hfLcUJ_8i9ewVcUz",
	  "sh": "_1syDbbhbumwMwwD7Dwkb1V",
	  "si": "_3jsffwJjGr2sMEofSTTGkG",
	  "sk": "_1EpYAUcQLCqbYB48Auixqb",
	  "sl": "_3STJQv9nY5mol4cW82D2ci",
	  "sm": "_9aTR-AZMTaYHRmDVAyFTM",
	  "sn": "_3mTatYTWeJQQACfV7xzRhi",
	  "so": "_1LnWon2slwLMqAHzhkRT4c",
	  "sr": "_1GSedFwSsf5isgOi3p0x6U",
	  "ss": "_1sq99LOjKKgery3luOXOFn",
	  "st": "_1O6vYx_NaXFBAs1qYxgwaB",
	  "sv": "_10D9RGnRzUv14bYWQaC23c",
	  "sx": "KonDEEzH2JzIWsVUBzFdY",
	  "sy": "_1ZAnqGYeixOJVFwwt6hNIo",
	  "sz": "_3FeOFkec3sXYbvQhWDdIM7",
	  "tc": "_1FZvldKEV-vz12TyyNfEf",
	  "td": "_31fysfDRtTWVKcX_UjX0ty",
	  "tg": "H60Kyr6MsF6nvRz5l7EfN",
	  "th": "SHZkbUz1c_H_zDOfxLc4",
	  "tj": "_2MRI0fA4OLgepXVooYMu9H",
	  "tk": "_1W959S9LHLCKhz3xi4MpHe",
	  "tl": "_1lMF_0nwQXTyBRRzRj7hBF",
	  "tm": "_2ZB_Dy2eRo6J0ylRkqC62I",
	  "tn": "_2MeGi_bqLVuCaRtJzs3QqA",
	  "to": "_3egwC_50WENVPaap_uwXr8",
	  "tr": "_2KiPy3o6m7JCKQWPY2fI1d",
	  "tt": "_3Hbn6Wi0dSnyrjdgeMmYmf",
	  "tv": "_2D9VWSmHkhgNemAaIKF_cp",
	  "tw": "_2J7nVAh1zEa7kV5Ba51CLV",
	  "tz": "_2acF96LLqMjlbfMX1oiAjT",
	  "ua": "_2rr3Tyr8dP6vDvE0khEDKT",
	  "ug": "D7gjzKmlr78rNWXXw90np",
	  "us": "_1l5RtWI_acgLVeCd5fjgHG",
	  "uy": "_1zX6hTsIa2TtL6dgR47eQ9",
	  "uz": "_29NUL3VtwK1_RWUyPsY2ei",
	  "va": "_39kTgRBkhqqGVLUTJvK_67",
	  "vc": "_2EwnB8Pe5TZDGdNIXOvzzg",
	  "ve": "_3Lk2Svkm2NTAVpUfiY_No5",
	  "vg": "_3SiYuGrNzW9DNkXwTZugyj",
	  "vi": "_2BiiERObu5xcE6P1SZxLdj",
	  "vn": "_3kSg6iW0KLoUpJ0g70fckK",
	  "vu": "_1UdrzjuDjSDu6-DJ5yV9cQ",
	  "wf": "Arz0xEqJcbKbLmPz_tXTS",
	  "ws": "_3oTaxcmbTriEd90-cXNqD8",
	  "ye": "gxtmCiQO2ao4JTQXuRUIJ",
	  "za": "_25HyrYKmQQAteF_LwADnIt",
	  "zm": "Kui2u7hZHcNBqlzbqR-vQ",
	  "zw": "_3VPnIcPuwZ3cFvNOHPN8ar",
	  "hide": "_2kO_U0LXcg71jJA6RSia2e",
	  "v-hide": "_2HBc009zwTsSlkh8P8tH10",
	  "invalid-number": "_17iYQoyXCPAB8XfsRqDdDH",
	  "flag-dropdown": "_1JTLnRuUJ50FBWDCCCWc4b",
	  "open-dropdown": "jG7mLbpUfq5nh2TzhXfBa",
	  "selected-flag": "_10c169vRt8V92_nQ_S0KtR",
	  "flag": "_2AEEM5AZQcsUPJUQZSd8Rr",
	  "arrow": "_3GOH36qvhOwAJd2ppQ3AOB",
	  "up": "_2ykRnfq4f2nlmZGfvzrn92",
	  "country-list": "UlTusogWL2urjgGgLNpcD",
	  "divider": "_2zMaTbM3nSdE07wOs7YYRt",
	  "country": "uL848pHFWhb_G94Ak-KX5",
	  "dial-code": "FxUYLz6b2tBEUXdb9DRqQ",
	  "highlight": "BLa_2aA2PkYD2PsO2fvNC",
	  "country-name": "_3ih_ovRiGmAkpjxuz63nhk",
	  "uploadFile": "_3CUi48rtxy1m3Wz0o2aHk_",
	  "fileUpload": "_2WENukerx3mNXkTyu0UXQf",
	  "uploadLabel": "_1VYdz-DRIuPqCKWlu5Rd5W",
	  "upload": "_2DUvBpBYzPWlV-6Yx2Pjas",
	  "blackTxt": "Z1W_HNjnSJTqNclgOwR-3",
	  "feedbackTextArea": "_14APtzGfaR_yoeAQJMJT5z",
	  "errorModal": "_2PEnO-md-8qd3dF2cZGhMD",
	  "gradeColor": "_16sNzVDnEzucQAxknLYKQQ",
	  "red": "_3wj0AXV9gqX9YG1nk-2u9J",
	  "green": "_3KPVxc3su8ewtuKZgu8TGv",
	  "orange": "_3cLlE5QI9XJwY6e7jO5bLg",
	  "capitalize": "_2yqvFrqWq4uakYy_s3eeMY",
	  "importBtnBlock": "OwSu91np9HnUW1VdSX5hA",
	  "importBtnUpload": "_2eJ0cgHJ9Qj4GAz9x1jChE",
	  "importBtnInput": "_3ZCvqG4C-pjYzfgVNN8eze",
	  "icon": "_12rnwIUewKT2PdtWMnNyD5",
	  "importFileOnclick": "_2qsz43E0kYpZO89nXXV13S",
	  "broadcastWhiteCard": "_2Vf8tRdA-IkCpzrPwrxoLi",
	  "broadcastNews": "eK8W5URbLbE8ER1zsFc6V",
	  "btnPost": "_30ipfhZp6Vv-ikKnFNtEI7",
	  "textArea": "_3uPzOKXSyhgfRUhfmeVwfC",
	  "spinnerCss": "_1ouaIjiJ2MFv5PI5UqZ1ev",
	  "pdfView": "_2DquMFdC6rEzAaWJ2U-ahy",
	  "lineHight32": "_3RF4CWuoSHP3JddZnzrhZh",
	  "removePdng": "_3XuIzA6t9BoFiZfEFhOn3f",
	  "inputAllCap": "_6YEeMYUnLHaS691RRjq7L",
	  "popHeadingAll": "_2suWB3cd5kOd2yUCJCr640",
	  "dateControls": "_1BrlYTxzEBCsm_zJ9PPGkp",
	  "dateRange": "_1JBu7w3GlOnQBH8oh1-EXg",
	  "applyBtn": "_2Rz8lBsFU8i7B9Ia-G-cv3",
	  "filterTxt": "_1Wdy1Hr8CUuuK8O9Liz3yi",
	  "btnApplyAll": "_1Y_QiGh-mkiUfuuiix0Yeb",
	  "assCanvas": "_2Ue4kVYDy-eQJrbNCKv0yC",
	  "pdfBlock": "_3UAEHpi6NrNz6ZDh2Lfk0E",
	  "assTab": "y4LW63OuadI0JWTQBnbJ1",
	  "heightForScroll": "_1s76YPnhEAnqK63LsEzIZh",
	  "radioNewProfile": "_1RD_hASO-4hwDMMDABPgkH",
	  "wrapper": "IVU-3tPtgRn_cBMA2jD_Y",
	  "leftBox": "_2c_UkbRVkIhCuEx7sFrhEz",
	  "rightBox": "DP21PoKxwKk_vJyOuQTcr",
	  "gradeBlock": "_1KaDEKb6KgB6xx-gEx-KTu",
	  "actionBoxTop": "_10AdTDYinFiKZ9H30uacSD",
	  "gradeBody": "_2pAeBQb2ZLvpxG09x5oJnS",
	  "actionBoxBottom": "_1UHK6epVvw6XZJ1KLDuQuI",
	  "gradeGroup": "_3VI0hvgPHy6r31t8WOJVDq",
	  "morePref": "JBm94eKPIFI8vfiroATJ6",
	  "tile": "_1Ssp2zTovh7AwJWuRkgnge",
	  "tileItems": "_3cDqgy8AedDYzhy8Euosis",
	  "tileHeader": "_1LhZQenbqV0FNu-ykdOEI3",
	  "tileHeaderLeft": "_2MwtFA5OodvfH7RxQPCPQ_",
	  "category": "_2Ow56TBY2Y24yY5SjVRU4l",
	  "innerScoreBoth": "ndEN_RpJfrJ_tKG_RA68v",
	  "maxScore": "_3uL97t2vemfuAs83cAFhjE",
	  "maxScoreInput": "TKf_xWbkl0UNSxyusGMn8",
	  "scored": "_12gGWK_s69JBGzOAX7ClkT",
	  "scoreInput": "_2Mk4HrrcAyqwuFRTOgl3lh",
	  "remTile": "_3vgBsvWRGVVRwIEDn1TquO",
	  "tileBody": "dF1WC_PeNjG87K2XGMIcS",
	  "tileRatings": "_2CCbhFQsjWGMpVC9Wui7Vr",
	  "gradeBox": "_1yi9i3Jl0hqMYPn1Tgv_cF",
	  "gradeDisabledBox": "_14nvGiDb0wY_EIfoptsCdF",
	  "assignmentResultActive": "_2tWSBiPrHoK1xrmZ6QsC-W",
	  "blue": "K7acjAQMroOGGtUqqojYy",
	  "yellow": "G7N-PGOIbGO_ZkaqBu2mx",
	  "txtGreen": "_3ozvzoCtqRqS2AzlUELKKF",
	  "txtBlue": "_4IOpBzUT2qYXMYt5UKiJP",
	  "txtYellow": "_27BE3ODkiyosiM3HqlgtFT",
	  "txtOrange": "_3uTqWL645yWk5qXsaxxH_M",
	  "txtRed": "_3WDBRR7fo7Gn2KKo7rrE_Q",
	  "txtppl": "_3nfbHs21ZfqnZ9n2wICEDb",
	  "addTile": "lCw_kxhsAPcuM3yFAqvpF",
	  "addContral": "_1aQuHhQkJrKTdNBYcoAQFh",
	  "addIconCircle": "_2lFLErjrZAe1ZXjCbykAVD",
	  "commentBox": "_2h0b9sj0Y_QpQzSh6njVoO",
	  "totalScore": "FDG4LAia-7JDDtxb7R4Kb",
	  "totalScoreInput": "_23XbNFEiJgqq0S35rhnpj6",
	  "textBox": "_13VdIFmMegxz_eR8VIXN_M",
	  "totalScoreSpan": "_2Pj4PN_f9FgyLDc9JE4vu9",
	  "totalScoreText": "_1YbsVQIx_uSOAygZtwoTNK",
	  "resultBox": "_3XB8yAFjZjZubswP7rs3Lt",
	  "resultBlock": "FmvbKk1ChtYs7Lm76nRaX",
	  "resultHeader": "_1AWxMTonqDqoWhnz1g9d-d",
	  "headingTxt": "_1GSvGEp7hTrEpIa-UkynQZ",
	  "scoreBox": "_3HTg1VUMSPfLvdZUBsj2N_",
	  "resultBody": "N6kKlySaRGbRcB4bBmpZ0",
	  "resGroup": "_2byM-_1N3yjHb2dpmlikdf",
	  "resTile": "DZeuj4DKkdAPKCgYd76RK",
	  "resCriteria": "_22AwZF3M7Ffw8GTgoz2DSi",
	  "resRating": "R7j9mxFZmdmLgC7bPXpyN",
	  "txtSize": "_977ldMQMMiHQ0YG_61T3g",
	  "txtplBlue": "_27vNfTLrgUcEIvntpfFS_N",
	  "resScored": "_1T5pr7r7hw9rq_NyVSB0lM",
	  "resInput": "_14gsxA36f-uYOfxGDvr_gi",
	  "activeTxt": "_3mkD5eqWDun2pAM_mx16kZ",
	  "feedbackBox": "_1ae7KB7aTT79QKO6O85GzI",
	  "fbHeader": "idU-Kkkc7R8cdYS_Ayh47",
	  "feedbackGroup": "AKd59EZ_Qjl6GE1amJRlx",
	  "profileBox": "_1JFzTlQEl2bDxwqAx77fbj",
	  "profileImg": "_3k-2OFHHSzyQUB7Zkcc21l",
	  "profileDetails": "_2wxDQDzYCXmmG6lQaOlEj7",
	  "name": "_25-6SxUiv8zhOMEVTRrg8w",
	  "commentTxt": "_2tLMve1A4CHR8jTUu5J1jI",
	  "addpdng": "_6rQH8tivz8ELIWszpbahs",
	  "good": "_3lOxcxDfxhPcuhLBJHo4Ur",
	  "vGood": "l_IAfocpDxfvpU316U0EI",
	  "fair": "_3I3YapUnBVxgs-ZsGf3Poh",
	  "poor": "_1uSJT6ULTWAvr1S_77KhIZ"
	};
	
	var _component2 = _interopRequireDefault(_component);
	
	var _Dashboard = {
	  "form-control": "_3QTibw0rkcFfD_rm05fYpe",
	  "modMeetingDetails": "_1CwtOtjIl7BtR-ODYYWhKL",
	  "modTimeDisplay": "N4WWa8wLsLU6K-JdBjEyf",
	  "modScheduleListBlock": "_1CnQV2qsrA2o9rbL8uE3Wf",
	  "modCardNav": "_3loUQ1qct_oQ4wieMS1228",
	  "modRoomInfoBlock": "_2JFYfytDm0cvAHCf5L-xcy",
	  "workingCheck": "_592AUrRTUL8onhwqbxqac",
	  "mixVideo": "_2eK-0JEHV5noltLccwowgE",
	  "sliderWrapper": "_2tnn4cPZ5fD1lRAARa0HpH",
	  "slider": "_2cGkL2aNr4JZcI0kLJh9ls",
	  "myRoomListBlock": "_31HoMdhKh-IM9Y_Oc1NnDi",
	  "previousSlide": "_1YxWrktQzGdSFemi7BVLvX",
	  "nextSlide": "_2UlCmrfXJHjthn45B2-bmw",
	  "modDashboardLeftBlock": "_1VqwJetzVjHYMlnURE4Kjg",
	  "leftBlockContainer": "_-zQSWzKZxDa74I0VAkxLW",
	  "ctrlHeight": "_23yxFDv3YkctjCMkevogHM",
	  "btnOrangeAbsl": "_2JotX0yjVlFy8IGkaoQgbp",
	  "btnBlueAbsl": "_2eGWhq2e5CnGMHhY55jOSP",
	  "smH2": "_1O-rdnW6AGV6UiFdAwgKBM",
	  "bdr": "_3gD-pzKqxdUIPMPVlaNhQj",
	  "modDashboardCard": "_2PHQXcDk2k_ltm0pO1h8N-",
	  "blueCard": "_11TZYQavvX8COjECoUgPsF",
	  "modCardHeader": "EYf_WR2wkK-blqOtDcG9l",
	  "searchBox": "_3he4ui3qAj57b2OD0g_MrS",
	  "searchInput": "VagCUKtwyxZiLgTJt0kMV",
	  "closeSearchInput": "_2KGEDLYswXjUBuym7nslSW",
	  "showSearchBox": "_2rv4VTiOLNo3pb3INB9BV7",
	  "modCardBody": "_3Rd2HFBaxlylosGdDLTUE-",
	  "modCardChild": "_2DCytLWPd8KHc237Ppml1o",
	  "modCardCalendarBlock": "PVL_XnLeFz3zFQ6miOeL2",
	  "calendarBox": "_3a_CIRULoLNKiOzXy6OY2V",
	  "myRoomBlock": "_1RUvLzuPIdQYpPonjgZzlD",
	  "txtWhite": "_1nqx_BReMyFP5sNDt4WXGl",
	  "mySchedulesIcon": "_3MxWBL9WveOt-kBqs_G0EW",
	  "myRefreshIcon": "_2hw85F4M_gYjFA4GTUlScL",
	  "modCardHeaderFlex": "_18uk968hXtEQXJGEG-u4Ox",
	  "roomInfoDetaile": "_2KOEC9i7TEiW-nAAB6Ud83",
	  "linkColor": "_3kasMgaSOTifGjyZXjvxS1",
	  "lnkBox": "_1tHb0M_HuP3uSe4GiSjbj8",
	  "regenerate": "_3CwInHfgvgsAlez12CnEQz",
	  "inviteActions": "_19pDqSDmm_cUzVa0QuKvk3",
	  "copyLink": "_2y9M_YTWlleUMBeaU3RrKE",
	  "copyingLink": "_1mrfxFUtLzNtmoht7wr1cb",
	  "copiedLink": "_2x3vMGPt5j9prhmwGGAU-y",
	  "hide": "_2fFHqMt987ggp68qb7JdFy",
	  "animate": "_3SFp1mkccnXvRmsAIrzZxF",
	  "show": "FwOXzCB8nuuPUjOzsgDyv",
	  "modStartConference": "_1R4NfTmYO4jzEQq3pllFs6",
	  "startConferenceIcon": "_1eA9vgnIerMVm1dAf6xVUi",
	  "alignMidBlock": "_393F6fdwTi-gY58XmebPJ6",
	  "audioVideoBlock": "_2eXtpa4wfrDaOfVcZFVVc1",
	  "modTroubleshootBlock": "_4KlnAv4BCunWHCyqDAuKR",
	  "txt": "kFHV6maF3bI1k2N7_R_5q",
	  "checkRight": "_2sMaWl324_9RhY6dMbTikS",
	  "infoBox": "_5-R4SjNqMfmNDwZbvsefQ",
	  "checkBox": "KgBWCpsb2Et90D-gku9QZ",
	  "troubleshootFooter": "_1n0upOEEFhv73I2ig-cv37",
	  "showTroubleshootBlock": "_1no-FxscU7MuJxqk0zGjRy",
	  "modToggleMode": "tPMxdUNWsAMQKuFofMNqP",
	  "toggleBtn": "WBoxChEmSYUFbAdtrVSqD",
	  "toggleRound": "h3ckwWDCix86h_Lck1kn",
	  "iconbox": "_3Y3o_rE45E4feU4Sn6kwBV",
	  "icon-unchecked": "_2IFqdNxTU8Xd_iTZF1ArQx",
	  "icon-checked": "_3vRpztbzRqE7xv5eDapQZv",
	  "infoDisplayBox": "_3wBfO0GUocFZI5MRR6qxcR",
	  "optionInputCopy": "_2W1WYQxcVeZ2JTWIFufExE",
	  "click-wave-copy": "_3mT80RDeMj4wrP8KtxvRFk",
	  "checkbox": "_6-n25TO0Vln7Ca-Vy72Ch",
	  "scheduleBodyBlock": "_2fwc-AXiV1SrifKIFhohL6",
	  "scheduleLeftBlock": "pUpQVknCd4qnJu2T551G3",
	  "scheduleRightBlock": "_14belIp04YiXHz5KF9UXYy",
	  "current": "_372awUtOsPgtfGPPnKHhSa",
	  "dateDisplay": "_1_iZDARcFMOTbp_QeIIOI6",
	  "timeDisplay": "_3B0mT6Fk3SM223Px1HUH8q",
	  "meetingTitle": "_1uLvLrUsYcTwiGrKdq5eUX",
	  "organizerDetials": "_3SKfeUJZBN6SxSMD__ptF5",
	  "adjustTime": "_3oDuqi79Y7MgmQrGUEL1jU",
	  "modScheduleControls": "_3T43tGc9mqRFVTBPXPMw0K",
	  "placeRight": "_2Xnik9BNXqFS-jPl33deSR",
	  "iconCircle": "_3Y-t8bejHE9Fup7Ec4Pq4E",
	  "bgDelete": "_1GJNdjnKMlD4EmNPmz-4K_",
	  "bgEdit": "_2f8OUVb2BafjvLAbHdpqu7",
	  "bgStart": "_3IgunDq0eAu2vDHG8XppCD",
	  "modRoomControls": "F-uWXK-tE6BFtie7rpoxk",
	  "headerActionBtn": "_2plXnacMateNoHwCkqwEWQ",
	  "roomItem": "_3vHBrLrbe6sJAGbDPlt7Qf",
	  "confMain": "_3DqSw1WO99YIEPjLT7FLrl",
	  "videoTwoLayout": "_3xZVvS7VtYVHB1C52yfJ7O",
	  "videoWraperSixNine": "_2N7l28dVpZtRzo_4fuy4CF",
	  "imagePreviewFilename": "_1jLcpueFPZwkrcrxF-U9ac",
	  "imagePreviewInput": "_2t6FXh0BmCB06JtUVyoy0X",
	  "imagePreviewInputTitle": "_2JDThzyQXrTnrtd4cmet0B",
	  "roomLinkBlock": "_37M0_Gc_Z5AM9lz0cZOSW3",
	  "roomLinkBlockHide": "PeLMcCOiRD_An3rWzxmah",
	  "roomLinkTxtBlock": "NG4_A1nq83gEJ-HM8XE8k",
	  "actionBlock": "_2Rr5TiG1tzRNiDq_mF9ejw",
	  "rightActionBlock": "_3EytWjhfBIoUeu9MTDtMMZ",
	  "actionIcon": "_2BhbHObfvKj_tyOtnCXlvk",
	  "imgRefresh": "_13otDg3j3KkZ7Lk4FL4LT",
	  "imgRefreshMain": "_8N5c3xRz0bu2JeO4zX4Z1",
	  "blockInvit": "_1gBTW13j-eU0FdmnLCIBNR",
	  "roomListactionBlock": "iWAiRaW7Cor9n5Wlcx0Bv",
	  "roomListactionStart": "_2zLPuOdZcM54YCxM2km0Vy",
	  "roomListactionOptions": "krdltQkwUcpo0KkM7BuJf",
	  "createBlock": "_1rxZmkIwxOC9yaafXpBxoR",
	  "settingsOptionInput": "_3h8Dd-219Cc38uJcT4_l_K",
	  "click-wave": "_1AusaJ8rjI7Xfk8RllzgGB",
	  "radio": "qxUUOVMacCUJsb9wWAT-o",
	  "radioTopic": "_3fsmlsU4qITdB2vjnmzplM",
	  "checkboxText": "_3n8ibXrQlE0pId0LR3P9J2",
	  "checkboxDiv": "QUFPwjlrTJ0wlpPD3rTGU",
	  "topicCompleteDiv": "_3niKskbh0a3vrBWTheTuE_",
	  "cmnToggle": "CVBdEgFXXxnePrTgrbZVl",
	  "cmnToggleRound": "_1jJ7wCt7sv5qEOCb6DDMqc",
	  "smallTxt": "_3kU4p_OtCkXHW6JKxKn2IO",
	  "onOffSwitch": "_3nd3we3qsV7UU1qIfbkBIp",
	  "onOffSwitchCheckbox": "_2xJlS1TE2_yY6bDF78r8e0",
	  "onOffSwitchLabel": "_1XyyBxoKftSfYbx19hQ0sm",
	  "onOffSwitchInner": "_3FEhuqjn0CdbG-yYTgJlMy",
	  "onOffSwitchSwitch": "Ji6tIyDKYXg3yf4q7Bi--",
	  "GS": "gYv6Cki40O7MnS-2FaqAC",
	  "ok": "_1Lu0E7LDefbes51ctyJTSd",
	  "eV": "_2zR0VU1YVyla1NyOJsoNt",
	  "oj": "_1nf6cU1pEv5Z8F7hFdj8C7",
	  "wO": "_3_Q6v5QVQmu3FgDIGULq9H",
	  "wA": "_2sE0qIiO12OWPJMWwoaBje",
	  "vR": "SkmcAQ-pe5bh3hsSUQGkY",
	  "vN": "aQ6tWWFJ-VTFIfjmWdAhd",
	  "vT": "_1DfSysrHxZlzt5_lQKQ5KI",
	  "vM": "_2bUxn2HXClWnGtbUfff1kk",
	  "vO": "SRVhsCSJElL2N2bncZ66l",
	  "xi": "lmPSkKyMX9pnMT4fbsRhq",
	  "cancelMail": "_1eDK6WOXFAHqpoVg4HER_J",
	  "block480": "CQcSBF6UT-a90qhoUJPZA",
	  "blockLeftWArea": "_2Ra0QuoABT2hw0fdb7QADQ",
	  "makeFull": "_15po1tkQ6kCMy_PbUji69G",
	  "workArea": "_1NAQYgBgRL0sU85k42CFpA",
	  "workAreaHeader": "_3i9r4DymxkePSH6FVA1ejH",
	  "workAreaBody": "_1SREnE3-oM_CpLlyoQX4Ib",
	  "active": "_1ArF26g-C4U3LYU8KWRPCo",
	  "countCircle": "_2JR5DcJrnOIHHyRVfiJX_F",
	  "countCircle1": "w9r97x-TiZxNDWCuFVXX-",
	  "starNotification": "_1-6U_h3ED6F9OlSlfx59sy",
	  "blockSpan": "_25AWsl97g1QtnIlMpm3K_j",
	  "workRoomName": "_1sa6G3v0RMuN8rVGQksPuu",
	  "nametxt": "_3p_2O_fUHAbaZKVFlPaCsW",
	  "tableBox": "_20w-PnQsoQFJJOW3drkuod",
	  "tableRow": "_2IyLAOJQcVk92kSTfEG1Si",
	  "tableCell": "rzgi6k_bVCkPYcosAQq-S",
	  "video480": "vGx0JzLcpR4w3ZqSu6Nmp",
	  "videoFullHangout": "_32dlwY514UbriuXtN7Kdz-",
	  "videoSettings": "_3r2Q2qErK_JrBZupy-pU3D",
	  "videoController": "_1Ign37hAc56flxBG7iE-pz",
	  "vadController": "Mdp86yCq328fUgmiBmu4V",
	  "shareInviteConf": "_3Cjt1HotzzG0y-CxnkGixB",
	  "shareInviteHangout": "_2_9t2eh-6SNKpCSJqYDQ_x",
	  "controllerListBlock": "_2dSgvdbIanqyW8Ne0lL6TJ",
	  "openCBL": "_3THL2FyC3Tzz4jIXTQqiJh",
	  "hostController": "_2xrFY7BsSofHMEkTcGwWCL",
	  "video50": "_2IHlSfyoCPLnOpOXs8b2hX",
	  "selectedSpeaker": "_2DbZB-qdUdixJpfhf6wPtz",
	  "speakerSelf": "DRA-_qaqpq6CJA4Mb-4b9",
	  "speakerRemote": "_3Hap2aT2hqvdjaeCu5XM1R",
	  "videofix": "_3FaL1qNE_WulRajpajfURR",
	  "video160": "_2bulcQMuegySb8QvR4hhyA",
	  "videoPresenter": "_3kwg8CiHo3BWJagulUUCv1",
	  "conferenceLayout": "_2vCvZzAr0eY7Edu-YYwVrj",
	  "videoConf": "_2Sp9vfxQI9qT3rGP5JhUGg",
	  "fullScreen": "_2iE2SUPU6KAwW7hQAEurjS",
	  "mobNavCall": "_3GxLZTgHEl_Yha4Rt-OTL4",
	  "subscirbersVideo": "_2ohPRE8x7wFyxoOTUdffTG",
	  "attendeesListBlock": "jZyehi7HJvjpJMnXjXplm",
	  "scrollImageContainer": "_1dYvLHhKqviwsoT_F_wDjY",
	  "galleryWrap": "_3aeCJ8MDrOQ018R6-1Xz92",
	  "gallery": "WNmBQRphY9tp_5yj1LFNa",
	  "videoBox160x90": "_3meuZ6rf0vh4GWooITg4FX",
	  "video160x90": "_1byH3fApt-wi8zgcAMAJVv",
	  "searchAttendees": "_3xkER30ZEucYNqT0KwJSkj",
	  "navBar": "_3NRqy7EL7CgjfHrv7HTYW7",
	  "addon": "_2UweSIkLiYggOPFf0_GS1t",
	  "formControlCustom": "_29u1wAxpPpW0FzlqmesNru",
	  "btnSearch": "_3XPRZ2acWwy9VWtnlHN33a",
	  "notificationBlock": "_3x5_pIqdcDrCvgWR5NVdkV",
	  "notificationBody": "_3b2YAC1tmb2cJ5axySX1Lo",
	  "notificationList": "_26WZcpU2IM9wIbja_r2zM_",
	  "listStatusCircle": "_1Bd9V6UXKhF3VoOSKT3CUf",
	  "bgAway": "kgCnPze4tmnUJnBY0OB_a",
	  "bgDntDistrub": "_3tpT-4OlAfL5hakZQVux5r",
	  "bgOffline": "_3Fg060l40snk46xcJ1ofJP",
	  "bgOnline": "_3umWfif8Ug5jnBAR8R_oWa",
	  "actionBox": "_2oHyjHrSJNz9-eU9x7b8DX",
	  "notficationName": "_1m5CAvP-BlRxa_Eoa4NLiA",
	  "name": "_1MHehTYf0-emGYZtBQLmlF",
	  "new": "_8eRoDRyl4tE_u8pIOUwe1",
	  "notificationText": "_3zt-_GLmLbBzRmOr-I0LHs",
	  "hideObject": "_57kGZQ91Yjc7XHsu_wETC",
	  "hideObject1": "_1iWHKXKm2FUw0jpRuo-7xk",
	  "whiteCard": "_1gbfWpuPLdIXAGHiAHQDfB",
	  "breadCrum": "_1jOegZ8vPtKnc1jeQ9wwD",
	  "topicsListheader": "_3uxPBqtHfzw5PJYNFdTBpb",
	  "topicViewheader": "_1ivGPxBuiD5S3eSckvS1F0",
	  "headingTxt": "_3E9yestQl1n2YRJqne1wuI",
	  "mainHeadingTxt": "_2jaSy32Sa46PslN_yvliWN",
	  "pdfViewheader": "_1NtklnkdHeNLckVHS430iQ",
	  "flexHeader": "_2RNRAbze1OVPbh7Qq2HTDo",
	  "flexRightAction": "GZvKO2tQSYCC-rR35CM9q",
	  "flexActionList": "_1apa5Nl3KJ8ew2teXPGmGb",
	  "flexActionListSpan": "_2WjQOPRiFvm-f25lPt965F",
	  "topicsListBody": "_2E2VBM_64FqxcWtVu2KHaC",
	  "topicsListFooter": "qawuhsFKu-cjeGBEt4RYn",
	  "topicListBar": "_3HgGD4HtcWyFVvyvl2ZOtK",
	  "dropdownBar": "_1SZG2Sl_IjoMI2OjWbA5Id",
	  "dropdownList": "_2h__9ylGrN2-Qqw6JKRakU",
	  "selectStyle": "_1q59wKuN_hTo6ELOdxYMKo",
	  "pastTopic": "_3MIQello5WqJvKXgVxQq8x",
	  "nextTopic": "_2n6cLCfKS4CA_8LApGVxP5",
	  "select-style": "_396MZIiLZ-HHho-zgl1C4F",
	  "faIcons": "_3sPlnDs0WSPN4hWYxOQC5P",
	  "dropdwonaBar": "_3uvNOnFpDLhvjBK6LwPgvg",
	  "questionBlock": "_3j01LxubnPY8Zin6Xb4Sws",
	  "questionHeading": "_3d4zlzbrtXjqz96MrZC5T",
	  "questionIconCircle": "_2nNPIbnlo257g5iAvqD_Cn",
	  "chooseAnswerBlock": "_3bAkmxIYMlZec02RAUYxg7",
	  "submitBtnBlock": "_1Fi0FYBjo0B90OgOnm8YEa",
	  "rightAns": "_3EJQ9Bd__2JVFWsHHT3HBw",
	  "listTitle": "_1MEYJ804i4UDBRUufPe61T",
	  "topicAuthor": "_2AkPf3QWGyrbRwvy5LRsnu",
	  "authorInfo": "_11Y75XEQnR6SUD4RFky3pP",
	  "authorName": "_6ozdfbrPgEh9x2X44pTWM",
	  "authorDisg": "_2D1NfK9OldseGrg3AXIk17",
	  "shortDecBlock": "_3Je3YUnBMn3t55lcoovPzW",
	  "fullDottedBlock": "VnHDgOsqZoVUVg_yUB_Vk",
	  "fullTopic": "_3Pli_905bfPpb5cIfqdmak",
	  "authorsBox": "_2lGEvR4TtguQDmXWpo8S4y",
	  "hrzlList": "_2xG2_aPEpjELARQTB86ef8",
	  "mediaListBlock": "_i1VaAQ-sCNAen45Xbkmr",
	  "videoThubBox": "_1GumGOvJr99CdUQVnfPBDl",
	  "mediaView": "_2b3-ImLT9sWY9-gEjaN6zf",
	  "videoWrapper": "a4Eohj5CN9NtDBPk2Qpev",
	  "audioWrapper": "_30ub_6ZUP6byP2PFyRyKG6",
	  "audioWidth": "dK2oAupgsDxYmadGgHYQa",
	  "resourceList": "_2ZbyeZQoo-Nlq0zRPjU5C2",
	  "questionCircleSmall": "_2MFvDUZpsTjBizdA8Ovgus",
	  "dateTimeBlock": "_3OC306wGuvzKF7F6GfCx5E",
	  "dateTime": "_1Z9zb41XgUJGPIXahD9r3J",
	  "timeMrg": "_3RnkXq6ZcaynuwvzXVP12a",
	  "currentVideoControllers": "_3kashb5f4PB17jcHEVRT2e",
	  "popupCurrentVideo": "_3ssWuUXBGfwUidS1g6Kbkk",
	  "volumeControllerBlock": "_1xAJ-Q1GiiPqGheM3W2mH2",
	  "contolItems": "_3qpiuXUmKBpRZzNmbEdCwM",
	  "rangeBlock": "WipkYA-VcS3mEoI2nVIBJ",
	  "chooseInput": "_2pBHcAS3Od5jcyzTDJvjYI",
	  "clickWave": "LTcaWPNKuZ1DwZkpawqeK",
	  "inputMargin": "MF3QMxB5GBmImpYNYYOVC",
	  "removeThisUser": "_2hrM2JinvCUkn2QmbxeEak",
	  "removeUserBlock": "UxuxKn6Gg-6am_DYzswxQ",
	  "statsBlock": "_2g8ymjJkIDZ9gyEk0SXWqG",
	  "statsHeader": "_285bYsv_FztKZIUtNWy5fE",
	  "statsBody": "_2RsJrDcl9eMBRSnmXQhpVc",
	  "answerStatus": "_6WzqlC42ZMJxZsbeTPjic",
	  "formInline": "Z7FVY_mGYFLJ5PAkXt8l",
	  "resultsBlock": "_1dSxfqcGuRi10Zf-o8Sy2v",
	  "resultsHeader": "_1iuxKmmSqnDUJKqZcoE4Vt",
	  "resultsBody": "xzwLGWItp2MVp12qw8wVH",
	  "userInfoBlock": "_20F6JQ242qnK-l_-ydJlOH",
	  "resultsAvatar": "_1FFgHXbC-XNhIq07nGVmFb",
	  "resultUserDetails": "_3CBQUgePb7sAvJEAjFOfZE",
	  "resultsUserName": "SY4mqtkuPEtiJ2RquaO61",
	  "resCourseDtl": "tsZZ2UeIijlYCKkt-yrrz",
	  "spanNames": "OCZOSIYqN7iTyeN4lz8H4",
	  "gradeVal": "_39cTAKxCimT4cpFY2Q0Pc8",
	  "precentageVal": "_9F2X6CTxTmOMALnLEyjCw",
	  "resultBg": "_8jhcRCROQvFaxY85y_xIk",
	  "resultBgColor": "_3e2kjUvxB5dOmBN3dR5t52",
	  "resultTxt": "i_Tfk2LAPxzoyCXWs_N4z",
	  "broadcastContent": "oRGcF2vjQ1WswdRUw4wZo",
	  "cardBroadcastCon": "_2RRIWwX7GUt7bRmr5oEDkT",
	  "cardBroadcastNotAdmin": "_3E_-rHj34eHWhAU2L3CbGI",
	  "cardBroadcast": "_2_C2HaINv0VwkhzLOilnd_",
	  "boradCHeader": "_2DboIyd2ktgXfDXq5w4Bb7",
	  "bcIconInline": "_3bs4pFWhxfK0CgQYN4aKzW",
	  "bcHeadingBloack": "_1s-8LLKTvwj5xuYsMAxY2t",
	  "bcHeadingTxt": "_1TLsN9kK8omRUmyucob2Dn",
	  "broadcastNewsBlock": "YLgVAwgrlpXE6Rda-AvH0",
	  "bcTextArea": "_1zOxgCoMKR_LO5IJh5kyf_",
	  "handRiseContent": "_2pDxarc6ckdmi-EmeaztP2",
	  "cardHandRise": "_2-pstaHl-UL60lr6hbXpHI",
	  "cardHrHeader": "_2dnh8BOiBjOdK3UVcs1pT0",
	  "iconInline": "_8Df3H_wNvPcGZZRX-E5Zo",
	  "headingBloack": "TQ_yU80bbvRi_74JGoMU6",
	  "askQuestionBlock": "S4JQJXBqQwVJqdW52W6O3",
	  "textArea": "_3dN7ybahNCsckxhPiD07TT",
	  "textAreaRecom": "_2RQkeF_-wCDhnAwn5ZqXs4",
	  "replyBlock": "_7KIns7pK6Et2bJMFLAXxD",
	  "repliedInfo": "_1hCoa34OtstZ9c5pkJK7se",
	  "btnPost": "lE6aJc2ZVVBJEJO-lu4A5",
	  "btnPostNews": "_1GDPkD3Pqrm-WHN8AaYbRb",
	  "cardQuestionListBlock": "hZx_vqJe5Qu4y_5RsWtQh",
	  "btnPostQandA": "_2LeItkvBERArOvUPIdZutS",
	  "userQuestionPost": "_26yl64tliiZWMBaDFHinhy",
	  "avatarCircle": "_1_-knNt1dv799aKLtWYfaW",
	  "nameQuestion": "_2aMY5FEWYdY-DMt3hsQutH",
	  "avatarGuestCircle": "_33bb2Dv3EIksPAvcceQj58",
	  "guestNameQuestion": "_2yPUXePRVjSf7NqPrJwkV7",
	  "notificationListGuest": "_10woS_UrLKE46ZjTd797v",
	  "selfPostMsg": "UF5cH_Z5JLpQMTNbjchOv",
	  "avatarCircle40Guest": "_1WCtCo7nACeBQqOMhW3Ym2",
	  "guestStatus": "LXwjgTgsQbpxGP-LtS_ld",
	  "topicAuthorGuest": "pHG707x8j_hG4Puo8fEGU",
	  "questionActionsBlock": "_2Nor4nr8SU86tsF3ewwoP",
	  "bottomActions": "_39eBGH1T8fg9hpG0cFoY-A",
	  "avatarSmall": "_2Pgk7un86GExXKis1ZfsUY",
	  "postedQueBlock": "_18qce1Xm9vi8oFbDr23uAM",
	  "postedUserName": "_3Ja9ilqa2POZCyFbqpW8YA",
	  "postedAnsTxt": "_3hV-imqFSQSFxcU2_XHsk0",
	  "postedTime": "_3JbETbcjAgExmXiR-1hDMp",
	  "postedAnswersBlock": "x7HfMMKJvC3WhnFlWmRYz",
	  "listPostedAns": "_2ziyM0OrViZU_2gPkbzfds",
	  "postAnswerInList": "_3zQ6qchIZU3eG6o6sXPF-X",
	  "postAnsTextArea": "_3Z4qamqjNmjd9fu-bf4VjL",
	  "postBtnInside": "_5oyZ8fn65UA-xzIyIihvB",
	  "userQuestioninline": "_3-7-dWfUdHdcwWgYQc8ETE",
	  "expired": "_2lmG1quG5YqLe5KeEQHfuV",
	  "questionActionBtn": "_3i2E-AMYxuNPRhasvO-qfw",
	  "arrowBlock": "_33SA4BSSfD9AmHpvYBWtM5",
	  "whiteboard": "_1JrzAlUaaS4yvWvxIHlvXU",
	  "whiteBoardContainer": "_2KN2qEPzbJHYr6YZ6Isf6Z",
	  "whiteboardToolBar": "_1RW1If3ysSunn2C4GvQhtz",
	  "canvasContainer": "_3fXbkjZhJMpsxvYMR3_Y7P",
	  "thinScroll": "_3jwhB3qAIY7nqOZyPwQvOV",
	  "toolBarFlex": "_14Z1UloGleIvjFZuxUescQ",
	  "flexColumn": "_33OTV_R7Caz3GFRj1C5HKk",
	  "colorPallet": "gZqx-z3hQc6YEu1T43LR_",
	  "line": "_1B3Gt8Fi0K13ejNWSm_Olj",
	  "centerAlign": "_2xvjSnBwv8QfVdYsFCV4mL",
	  "screenShareBlock": "_39hrZZRAdy1FsKQ7QLNUz1",
	  "screenShareBtn": "_2fiRStJEIQ15ntKDykWz2W",
	  "screenShareDisableBtn": "_2CciW3BjaeE9SR17jjlzkH",
	  "msgBlock": "_1uV5e-yig-mEeYlZKwCwZ3",
	  "textHeading": "_2xEmNwNuxoELPwUxfNtpF-",
	  "screenShareBtn1": "_6CfVpKk7B-9Ua-SjV45Nc",
	  "documentShareBtn": "_2y8i1t26hOSahDgMnXCk3F",
	  "loadMsg": "_3BPPdyWBPd6ER5gPz0QvKR",
	  "listBox": "_3kQmECEo829bBDN_jgTS3v",
	  "iconType": "_3ECKM0uK-dbRZTp4_zIZfy",
	  "fileInfo": "_16c9TD81smzmc6Hx-N_6h9",
	  "actionButtons": "_3ZQTEK13Cg1oPa0TgAT-Jv",
	  "loadIconBox": "zwXx-7n4iYSSPVaTH9Jdj",
	  "loadingTxt": "_5HxTuABsdMJGfGDIZ7KTH",
	  "clickIcon": "_2vmcrrorNSoW2mxuO-YRmz",
	  "viewBtn": "_2t25cP1fcnEHX2p9Ob0vsB",
	  "GcenterAlign": "_1QgQHpu8rEGIsPevaPgHpb",
	  "GmsgBlock": "qpjYAHJoLY6LP3Es9T59B",
	  "GinputGroup": "_1hILNc6zjthnYjmx5qcfEr",
	  "inputTxt": "WOB0iD23T16A4qvjUGMbB",
	  "GbtnProceed": "_10kuqC5fmzifivzO8grcIj",
	  "GscHeading": "_9M_87CpYRjV7PxZSp2AM1",
	  "sharingImg": "_3QDdFbGwKj7LVM_Zdrvw6Q",
	  "sharing": "_2K4aaosBX43FwufpsvwsuD",
	  "roomChatContainer": "hdwAXX9Gv2IqvGfyrr7f0",
	  "roomChatMsnger": "fUTB-KDXqt9Q7dG6LyQF4",
	  "roomChatTypeMsg": "BJwgYrEoE2cCNIHuecHjV",
	  "roomChatList": "_3L3Qsg806KpJ0sFMKfYnzA",
	  "avatarCircle40": "_37c-pP8ZhsaCA_dBqlCvBk",
	  "listedMsgBlock": "_3lWB7hF5eHGv-LjYRRufr2",
	  "avatarNameBlock": "_2akL2SXeRHxZWX74HOxhw2",
	  "listedMsg": "fQLv4tzdilpf6Gh24l0pj",
	  "downloadFile": "_73W96Y7HjyT210KK5B8kr",
	  "downloadMedia": "_3F2asc8NSHSlZuBI8g89zB",
	  "textField": "_3UvnuZDEUYa6Mdzpad6Fzt",
	  "chatMediaBox": "_14KCLHjxCFLnGTXMVnyOwy",
	  "writeMsg": "_10ipn0dFaAOx_fHDbQbK4j",
	  "attachIcon": "z8_E7UhHKqb1GHxjCAL3b",
	  "msgInput": "_3J2q0dKOYN5RX2dIu7_1tt",
	  "msgInputTxt": "hS79giTgrE9N9VsNTzYUg",
	  "lineThrough": "_3GVN5aAbJeMP1oyZj4FHVl",
	  "grayCard": "_14C5MY3tlKUnhIplp-P9F9",
	  "grayCardHeader": "_1GWV9DYcf6silwfQUJX3Ww",
	  "grayCardBody": "_15QsWVRn4iwzlrga2Nh5SG",
	  "filesBtnBlock": "_1l0Tp7NY5564BipetBJjfU",
	  "uploadBtnBlock": "_2HkZeYwi6051Zz_4SLQw2_",
	  "btnUpload": "_2IOozhknYZae6TZnW7Qib",
	  "helpTip": "_3WvYpGaU3lAKE5SrxjrIWT",
	  "fadeIn": "EOuXjQRzjRFcfcb7xPbjf",
	  "heading": "_14qifIYGkwSGUJU-JdaVcA",
	  "uploadTxt": "Q7LfnwHlCzGc5Oj8psN7a",
	  "controlBar": "_-urTc0azZ3-vp1NVqeeYv",
	  "remoteMute": "_2HnEF_FDMRaXINcfuCLeha",
	  "bgBlueUpload": "spzydlKO3OYHAJE1PYY6H",
	  "bgGreenUpload": "_1f7dUC1CxVj9DjooAMEN5B",
	  "bgRedUpload": "_2hgIY_eCLmbpLmSMI753A-",
	  "urlConverterBlock": "M2ZaPnBvp708xyutzuPyR",
	  "inputGroup": "_1sprpdzsES8qlhbBtT4SD0",
	  "wrapperContainer": "_3xAWkYUThiBOAuoHjmJtlb",
	  "listDisplayBlock": "_19xoqFnfI0N1z3HcY-zwjy",
	  "ldHeader": "_1slAj86rbMftbX9t0AaHJq",
	  "ldBody": "_3npQjCmGu6RB3P0rOdvvzc",
	  "feebackText": "_2NDuRpEZ4Wmy4vO1IGxJjO",
	  "feedbackButton": "_3EIg6rUVMIzJ9R_ttW8Dgk",
	  "feedbackBlock": "_3-HNwS1ArAMVob97a158n3",
	  "feedbackRow": "_17v1n7G48x1Z05N3h_g2IF",
	  "feedbackContent": "_1DwS-A3nhHgjUkHDrbuhiX",
	  "circle104": "_3Aky67sZg-SMVFOPePCkQa",
	  "feebCustAll": "_3Hep3V7lMuF1Hc_vGj3iuy",
	  "ratingInfo": "_1XXOYmTN9oexXEBvs0098c",
	  "ratingOptions": "_3uPXsK5kXxzDBNzwPK23Cd",
	  "radioBlock": "_3w4E57d6-_evtHYRXhogp8",
	  "bgAvg": "_k4_b6GzZHVVgHaEMFqjp",
	  "bgGood": "_1rbJJs8YDeUSKDnXj5vUUT",
	  "bgPoor": "_3J3ZFU1yFf4XiMIAcw4T0e",
	  "fbInput": "_1uXdY8_zpei10SjAdrwf3T",
	  "clickBlast": "_22Wjm-xyJ34SC9hC61FXWV",
	  "ratingNumInput": "_3ZOY1VJoOBoWeAeoiUjc2z",
	  "ratingNum": "_6uaoQDlAKy-Xw0LvMgAef",
	  "fbTextarea": "vpDjfDPcccIx2BQVp9CF9",
	  "fbSubmitAction": "_3Kq2Vs5ZT0Eifzi5ETD6O8",
	  "customFeedback": "_2lkyUKZELnbhH7kRLu_DoP",
	  "header": "_1TwSIsxvkVmzR5FLt8xux5",
	  "fdText": "_337STHXS8TG9ykaH0OSQ-0",
	  "fdButton": "_1UXNdxJFLaBjcJLnOlo12x",
	  "fdBody": "_3b_1iZg1W8U6E6ewdTtwVx",
	  "midChoice": "tm2bJJNxFshKUU46rKv-k",
	  "fbQuestion": "_13PPoLG4gIZ7yEAsaAVC8S",
	  "fdBlock": "_1I60go8leztL3xpuoXJSHR",
	  "fbOptions": "_1piXq2yGvgalP9LFCEVIQ5",
	  "feedbackFooter": "zA0OOeTb-EVBCOLBRgiTp",
	  "blockSaveAssign": "_3xu8KRhYb_Gw0mKD95BtW",
	  "btnSaveAssign": "_23Cvf-4jZDkpkQF2jhebA5",
	  "custRadioBlock": "_3IE7ONc7URxqe3Yw4GUZig",
	  "custRatingOptions": "_2O4SJoxUEMGmPZF_FKEWIH",
	  "custFbInput": "DSZ2RL63kssI2K1aCGdCp",
	  "screenShare": "_1jdacozafgDzH4389wbZC1",
	  "loadmore": "_1tdkek3jBA8PX-GFoyRSu0",
	  "muteBtnPresenter": "_1deATnNKvo7VDEkSi3oFLc",
	  "muteBtnHangout": "_2VdXKHr-tiiInNLYDltho2",
	  "endBtnPresenter": "KYuRhoYLhOGQMIViYFgyu",
	  "endBtnHangout": "PefgFJehfFdAG6qgRskUA",
	  "selfCongfAction": "_2WTrSpCaDpf5ss99HVqIz0",
	  "early": "_3_xeMXpY5u3I9qrFVhxjJ4",
	  "selfVideo": "HyCIN_Szj18CUIFBvOVzr",
	  "selfVideoCard": "HMDJAYrYZyBIJeqMWlLqW",
	  "frontDisp": "_3HdbMGne4U1VbWHAAifP0v",
	  "backDisp": "_3sLCQkw2IXXwHMlzoWsyGo",
	  "flipped": "_39HG1m9XJCxv4xemiiOyiL",
	  "nameVideo": "_1T6cysBNdgM-VA7yvpjPjj",
	  "editBroadcast": "_1nlxgmNhjjB2HbbFVmn8Tu",
	  "accessWrapper": "_1njLy8ZgRetiKrbYePxEyU",
	  "accessBtnBlock": "_2M8h-rmMvjTnsWu-R0Xuir",
	  "textAccessBlock": "FUnbiYOoqChe9btjN-Gfm",
	  "fixedProfileContainer": "_1y0Y-PVPluOtV9T-f-CX4T",
	  "viewIndiProfileBlock": "_16fg7BjDM7Atq4bHN1yS3z",
	  "infoIndiProfileBlodk": "_2lhLdmQQQgLs0aQYjtO8Ln",
	  "profileAvatarBlock": "KNxiupbMBOddozf1HVVDI",
	  "profileInfoBlock": "_2RX1_7GABlRgscAgnuWJMp",
	  "avatarCircle80": "y2uu87JDWlb9waEP6MG8m",
	  "activeCircle": "_3e4XPMOjyToUbrXWu0ZkgG",
	  "inactiveCircle": "_3HUafiox2d58MZWSvcbdcg",
	  "avatarDetails": "_3NI1Bh97jPDj-2h8H4ZIq2",
	  "txtTitle": "M3hEuXhJvNXMg7Y5KLMMH",
	  "viewAll": "_1BRKGbPbj3Dfycx2DIAjpc",
	  "detailsFlexBlock": "_3akFxwMceJsdribRj80Vf-",
	  "detailsLabel": "gZrvCAQaemmpNG3SODIFp",
	  "detailsValue": "_2nLUsUodo2oh6tbb0I9PYd",
	  "detailsValueCompany": "_3Zz9yJQLm-C_o3WLBT3C51",
	  "emailPersonalId": "_3-2GdUgscFsrHoUfF4H9VP",
	  "connectionList": "_1IMwA2AXBA26rg9oKcAMKc",
	  "avatarCircle32": "_1cX2BxddsaIcsAchaN_0bR",
	  "connectionListDetails": "_2FFF1AgPcs9V52KBbrnqGq",
	  "emptyString": "_3cNTa9YM5AtVeASNM5KqhX",
	  "otherDetails": "_3Eu5FaQSVWpGHcrJkTvBP8",
	  "capitalize": "KppKGcFEDo_NZ826dTluU",
	  "viewAllList": "dqtBLxPfbwAnk_IyNPnpF",
	  "showViewAllList": "_3VRn2vds7oVl0eZbYp8deW",
	  "viewAllHeader": "aUdmf36uFKMNJ02h0Ng7a",
	  "hideViewList": "_2K0K3uL5lzpD8nFKv7Ek3e",
	  "viewAllBody": "LKpf7rzjhaCU9sKzKmZH-",
	  "datePicLegend": "_36xaVYWrArVCc3pP2GIxNu",
	  "selected": "_3ffpfHx2YPv6ZNoh7KV0w3",
	  "scheduled": "_2avyA2LOPpcSycWlMHPaUH",
	  "pastschedule": "x-xQy4E7A2__JqHtMNGHP",
	  "txtDisplay": "_37GrOE75rrUaBv7KKTPu0E",
	  "controllerBock": "_3akv9_RRBbNQwXvB7tlGII",
	  "tabContainer": "xcRXxsat6i1ayovZImHbk",
	  "tabContent": "_1U1PBlFztvJukf4hnZGW4T",
	  "contentCameraResolution": "UYdmyEIL8_WVmBDZt14jY",
	  "contentSource": "LpxHAZQVT8QjwDiMNPwa8",
	  "contentBandwidth": "_1wmenJvLyWxAE-HQLQluDI",
	  "contentReports": "_2eZub5PkqTuoN4O8UKMCt6",
	  "controllerForm": "_1cagy3dcEUn69N4Rx51UxX",
	  "reportBlock": "_3C6ty5LWWnJSjY-9wXkoeA",
	  "cameraSettingBlock": "_3oG4mEv7c2vdKW5HgLPs3w",
	  "fadeInScale": "_2asY4Ihuqh2etZxEUNY9c-",
	  "formGroup": "_1K2Unr1hIW-6cSpqAFb5xR",
	  "graphBox": "_1SnrpiNio41LCfQ9PZB62t",
	  "formGropBottom": "_21xk7cYpdspRbfO-zU4U71",
	  "formGroupLabel": "bGXt7ziC5ec-frylDOf-m",
	  "formControl": "wFCWdJ2O1uJLf5DZ0hCcZ",
	  "rangeSlider": "_3SGnp747YKXvbKZO6X5wry",
	  "emptyFill": "_2jogfsQjLH20deON2lOPwJ",
	  "lspanCgrl": "_2WrPwNXh5DjswV7j0r9PmX",
	  "reportItems": "_1O0FX0KhcVM-MW4mfdamIW",
	  "itemsKey": "_1qTsbm6D0TFwSwHOupXw2m",
	  "itemsValue": "T_-Rux7E9Mn_irEdP5PML",
	  "camResolutionBlock": "_2kefycfi5LHRpuhe7l60yK",
	  "cameraInfo": "mblzkQvrhcm5_8S324wPZ",
	  "selectRadioBlock": "_2-9LRZYzp7PZaQiIsM3e7T",
	  "uploadAssignmentblock": "_3MN_mbK5O4fYb2WEwXmH5Y",
	  "uploadAssignmentButton": "_1PoxxC4oxwriU86mJ7qhHj",
	  "deleteAssignmentButton": "_2YkzoSsbt7DSRwDJNfhXey",
	  "clickWaveCircle": "T5wUa_0RzAoVS3I6HihYr",
	  "yourPresenterInfo": "_29gZRxnU0RQOGIrijmQpFb",
	  "circle24": "CjrFI5HahIAdAOjPKZFo2",
	  "yourPresenterTxt": "_3z0OdWoxl7bX9qTLdisag3",
	  "hostYet": "_2cs7d7oLUVytfEHZUlGA2E",
	  "hostYetMsg": "_2Ys57tiYoVcvmd2leqTF-m",
	  "mixStream": "_1LUz2OrsSUeHU8vnr5BJ0Y",
	  "videoBackButton": "_1DzzbyNFYIMSoXIPvcZwC-",
	  "absoluteRightActionBlock": "_1R7HE-MlHi9o59f3uPQCJL",
	  "iconBox": "tiI0SDpOfPW0oEsJN8nqj",
	  "spinAnimation": "_2faDr9xWFNRebZW8IkffzI",
	  "spin": "_3PPOnKUpRgqVMMspqO9BoW",
	  "backButtonBlock": "_2KqS4BUTUcxlsidNmRfy8A",
	  "hangoutSettings": "_2F6Phx0wOsh0CNMdsObMZP",
	  "removeOption": "_3PVQHXou4BI73YFyurGNte",
	  "marksCss": "EgcJYbeHfheQ9gsE0MBNr",
	  "optainMarks": "rTUshkT8F5t28qovt97oz",
	  "studentHeaderMarksInfo": "_3_iS1Yl_iuR0ZcX1gX2ec8",
	  "pollResultTitle": "M1T7vRAoyi0rIl9XaqZbp",
	  "feedbackBlocker": "_6gjYic2V-simeXsjUuftd",
	  "btnSaveGrade": "_1THZJrITz878_5_fKYf74y",
	  "confActionButton": "_22tu-fogD6d4CRmJqrG6Bs",
	  "btnApplyAll": "_8EMs98NWa7qHJpi5U7cxu",
	  "requestTxtAll": "_1McRkoB5bQKwPj6HuuSOCl",
	  "popHeadingAll": "_2MIDDaI4stVeOaNEB92TuJ",
	  "popHeadingAllExtra": "a51na2wMDOfY1cVESKtjT",
	  "msgFileTypes": "_315ZK7yu6fP9c1WvrOYcRq",
	  "msgFileNote": "_354_FEG5sdCZmZfK77KFUP",
	  "mixFix": "Rm8qQtPGV9iknEmazrm95",
	  "mixFixCover": "_2pfiVdzP2VOSeIHngYKD2c",
	  "fileUploadBreakWord": "_17ZBN2fyz6Q3UKwH4BJMez",
	  "screen": "_3vKpk07E4_RokFS0iRQTKc",
	  "feedbackStatus": "_2KQ84_MjjF7fBpXFH8rvSB",
	  "closeDocShare": "_1XZ-Q8Rh2g3aysUbZ_iqmb",
	  "errorSetDuration": "_3-td4OAqHFJ-YufJB5kQtw",
	  "docBtnShare": "_3NvHS8c39ySZV7TIXeBJBN",
	  "loadScreenConf": "_3DswbXvH9aMXW-qoiD1xvM",
	  "AssignResult1": "i8gIWjkaQsnYIbR2E8MHy",
	  "AssignResult2": "_2nxdkYVzTkim-_f2y9aqe2",
	  "topicViewFlex": "_24pmumoAYskwBrJWqUoclQ",
	  "videoConfMobileSelf": "_3aak6rKjIyDrkQrIWvFxZG",
	  "videoConfMobileSelfThree": "_17w9ZGhmCKUMEcNX1dIrOI",
	  "mobConfSingle": "FLyDCJLWAs6Q3cH4NXAkF",
	  "videoConfMobileOther": "_2Bj0noEHqP0h56fuE2TphG",
	  "videoConfMobileSelfFourLayout": "GgKjt3BLg2JUm9cPsNYki",
	  "videoConfMobileOtherThreeLeft": "_21vVqdOKMRpjRlvYxnX78y",
	  "videoConfMobileOtherThreeRight": "_3caI7KfDJBdD5Ay-P-Iu6M",
	  "videoConfMobileOtherFourLeft": "_1hrvxkKhpa0qz8iOeYUEI",
	  "headerTop": "_1XniUG5B5tsBSDTrbqJI7b",
	  "footerFixed": "_3CER6mZw4OVF4ZbshrE158",
	  "modDashboarCard": "_2npR83py7q94WLj-1bwhVI",
	  "elasticWrapper": "_2V7iMxM_Ymm3vSG3aBdZdu",
	  "minimize": "OxDwL4sly8-c12oeVQP_W",
	  "iconChecked": "T4ZzBMChxZsczOvvckZRp",
	  "iconUnchecked": "_2_sUSKmoPEAlYtm7yTVaRA",
	  "slideBlockLA": "_1cD99lNu0AQKOMlCESVeR0",
	  "toMarginLabel": "_1b8DGF-CLLbxWUaH88KkE",
	  "checkAfter": "_3ujst9KhyfF5BdtgxtAoDR"
	};
	
	var _Dashboard2 = _interopRequireDefault(_Dashboard);
	
	var _DataTable = {
	  "pagination": "TYVzvPvnVhHwh2cU0hA4A",
	  "current": "g_uiyu9x1FtjxSP7SG8ZE",
	  "table": "MT1wq7GO1NFQY49F82EQ7",
	  "headerRow": "_25DfSs-Nwm51luhPR-2j-T",
	  "col": "_2AskW4twyvDT4DurTsqR8L",
	  "row": "_2WqrTHsuiMmLB0IEBY1vgS",
	  "responsivetable": "_31nKaPaXXLrfOOGeGa9GTs",
	  "whiteCard": "ryCbWg89OoNEh8LdzqXon",
	  "noDataBox": "XRJX9QsZKouxzWnXKoUUp",
	  "infoTxt": "_1NZmMey1sQV0aCxxqVtPDu",
	  "mainSpinBlock": "_3BEgVxQ9PDQKlEjIHevKr5",
	  "innerSpinBlock": "_2Ot9A0ys89IJntrdA5WyyE"
	};
	
	var _DataTable2 = _interopRequireDefault(_DataTable);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _SubMenu = __webpack_require__(354);
	
	var _SubMenu2 = _interopRequireDefault(_SubMenu);
	
	var _TopMenu = __webpack_require__(355);
	
	var _TopMenu2 = _interopRequireDefault(_TopMenu);
	
	var _Loading = __webpack_require__(142);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pagination = __webpack_require__(381);
	/*import  {ToastContainer, ToastMessage} from '../../lib';
	const ToastMessageFactory = React.createFactory(ToastMessage.animation);*/
	
	var _ref = _jsx(_reactFontawesome2.default, {
	  name: 'sort-amount-desc'
	});
	
	var _ref2 = _jsx(_reactFontawesome2.default, {
	  name: 'sort-amount-asc'
	});
	
	var _ref3 = _jsx('h2', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'frown-o'
	}));
	
	var _ref4 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'no_data_yet'
	}));
	
	var _ref5 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'title_list_details'
	});
	
	var _ref6 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'uploadtotopic_title'
	}));
	
	var _ref7 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'filetypes_title'
	});
	
	var _ref8 = _jsx('img', {
	  src: '/images/white-icons/file.png'
	});
	
	var _ref9 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'file_title'
	}));
	
	var _ref10 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'filetypes_title'
	});
	
	var _ref11 = _jsx('img', {
	  src: '/images/white-icons/media.png'
	});
	
	var _ref12 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'media_title'
	}));
	
	var _ref13 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'filetypes_title'
	});
	
	var _ref14 = _jsx('img', {
	  src: '/images/white-icons/zip.png'
	});
	
	var _ref15 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'sco_title'
	}));
	
	var _ref16 = _jsx('span', {
	  className: 'glyphicon glyphicon-remove'
	});
	
	var _ref17 = _jsx(_reactFontawesome2.default, {
	  name: 'upload'
	});
	
	var _ref18 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'upload_title'
	});
	
	var _ref19 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'title_list_details'
	});
	
	var DataTable = function (_Component) {
	  _inherits(DataTable, _Component);
	
	  function DataTable() {
	    _classCallCheck(this, DataTable);
	
	    var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this));
	
	    _this.getoptions = function (data) {
	      var self = _this;
	      //console.log('data....',self)
	      var options = data.map(function (option) {
	        return _jsx('option', {
	          value: option[0]
	        }, option[0], self.context.intl.messages[option[1]]);
	      });
	      return options;
	    };
	
	    _this.filterOptions = function () {
	      if (_this.props && _this.props.filter) {
	        var filter = _this.props.filter;
	        var key = 1001;
	        var that = _this;
	        var filterControls = filter.map(function (obj) {
	          if (obj.type == 'dropdown') {
	            {/*Chnages made by prateek for bug#2732 reactivity 
	              Date : 15/09/2017*/}
	            return _jsx('div', {
	              className: 'col-md-2 pull-right col-xs-12'
	            }, key++, _jsx('select', {
	              id: obj.id,
	              className: 'form-control',
	              onChange: obj.selectedfilter,
	              value: obj.value
	            }, void 0, that.getoptions(obj.data)));
	          } else if (obj.type == "search") {
	            return _jsx('div', {
	              className: 'col-md-2 pull-right col-xs-12'
	            }, key++, _jsx('input', {
	              type: 'text',
	              id: obj.id,
	              className: 'form-control',
	              style: { "marginBottom": "8px" },
	              placeholder: that.props.intl.messages.search,
	              onChange: obj.selectedfilter,
	              maxLength: 50
	            }));
	          }
	        });
	        return filterControls;
	      } else {
	        return;
	      }
	    };
	
	    _this.Handlesort = function (event) {
	      var id = event.currentTarget.id;
	      var obj = _this.state.sortObj;
	      if (obj[id] == 1) obj[id] = -1;else if (obj[id] == -1) obj[id] = 1;else {
	        obj = {};
	        obj[id] = 1;
	      }
	
	      _this.props.newDataCallback({
	        currentPage: _this.props.currentPage,
	        totalItems: _this.props.count,
	        itemsPerPage: _this.props.itemsPerPage
	      }, obj);
	      _this.setState({ sortObj: obj });
	    };
	
	    _this.state = {
	      value: '',
	      pagination: {},
	      sortObj: {}
	    };
	    _this.pageKey = 0;
	
	    return _this;
	  }
	
	  /*componentWillReceiveProps(nextProps) {
	    if(nextProps.success && nextProps.success != "") {
	      this.refs.container.success(`${nextProps.success} `, ``);
	    }
	    if(nextProps.error && nextProps.error.length > 0) {
	      this.refs.container.error(`${nextProps.error} `, ``);
	    }
	    //console.log("will receive props");
	    //this.props.clear;
	  }*/
	
	  _createClass(DataTable, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.count > 0) {
	        this.state.pagination = new Pagination({
	          currentPage: this.props.currentPage,
	          totalItems: this.props.count,
	          itemsPerPage: this.props.itemsPerPage
	        });
	
	        this.props.newDataCallback({
	          currentPage: this.props.currentPage,
	          totalItems: this.props.count,
	          itemsPerPage: this.props.itemsPerPage
	        });
	      }
	      // console.log(this.state.pagination);
	    }
	  }, {
	    key: 'changePage',
	    value: function changePage(page) {
	      if (this.props.count > 0) {
	        this.props.newDataCallback({
	          currentPage: page,
	          totalItems: this.props.count,
	          itemsPerPage: this.props.itemsPerPage
	        }, this.state.sortObj);
	      }
	    }
	  }, {
	    key: 'handleValue',
	    value: function handleValue(e) {}
	  }, {
	    key: 'renderRow',
	    value: function renderRow(data) {
	      var dispfield = this.props.dispField;
	      if (dispfield && data && data._id) {
	        var rowkey = data._id + Math.floor(Math.random(0 - 9) * 1000 * 2);
	        return _jsx('div', {
	          className: _DataTable2.default.row
	        }, rowkey, Object.keys(dispfield).map(function (key) {
	          var keyid = data._id + key;
	          var subkey = data._id + "dfsd";
	          return _jsx('div', {
	            className: _DataTable2.default.col
	          }, keyid, dispfield[key].type == "text" ? data[dispfield[key].fieldName] : dispfield[key].callback(data));
	        }));
	      }
	    }
	  }, {
	    key: 'handleUpload',
	    value: function handleUpload(e) {
	      this.props.handleUpload(e);
	    }
	  }, {
	    key: 'handleUrlUpload',
	    value: function handleUrlUpload() {
	      this.props.handleUrlUpload(this.refs.url.value);
	    }
	  }, {
	    key: 'handleUrlValue',
	    value: function handleUrlValue(e) {
	      this.props.handleUrlValue(e);
	    }
	  }, {
	    key: 'renderRange',
	    value: function renderRange(objRange) {
	      // console.log("obj", objRange);
	      this.pageKey += 1;
	      var _key = 'pageKey' + this.pageKey;
	      var _link = '?' + objRange.page;
	      var page = this.changePage;
	      if (objRange.isFirst) {
	        return _jsx('li', {
	          title: objRange.page,
	          onClick: this.changePage.bind(this, objRange.page),
	          'data-page': objRange.page
	        }, _key, objRange.label);
	      } else if (objRange.isNext) {
	        return _jsx('li', {
	          title: objRange.page,
	          onClick: this.changePage.bind(this, objRange.page),
	          'data-page': objRange.page
	        }, _key, objRange.label);
	      } else if (objRange.isPrevious) {
	        return _jsx('li', {
	          title: objRange.page,
	          onClick: this.changePage.bind(this, objRange.page),
	          'data-page': objRange.page
	        }, _key, objRange.label);
	      } else if (objRange.isLast) {
	        return _jsx('li', {
	          title: objRange.page,
	          onClick: this.changePage.bind(this, objRange.page),
	          'data-page': objRange.page
	        }, _key, objRange.label);
	      } else if (objRange.isCurrent) {
	        return _jsx('li', {
	          className: _DataTable2.default.current,
	          title: objRange.page,
	          onClick: this.changePage.bind(this, objRange.page),
	          'data-page': objRange.page
	        }, _key, objRange.page);
	      } else {
	        return _jsx('li', {
	          title: objRange.page,
	          onClick: this.changePage.bind(this, objRange.page),
	          'data-page': objRange.page
	        }, _key, objRange.page);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var cls_container = _component2.default.iContainer + ' ' + _component2.default.oContainer + ' pull-right';
	      var clsForm = _component2.default.iForm + ' ' + _component2.default.oForm;
	      var cls_topmenu = _component2.default.iTopMenu + ' ' + _component2.default.oTopMenu;
	      var cls_isubmenu = _component2.default.iSubMenu + ' {styles.oSubMenu}';
	      var cls_filesUpload = _Dashboard2.default.btnUpload + ' ' + _Dashboard2.default.bgBlueUpload;
	      var cls_mediaUpload = _Dashboard2.default.btnUpload + ' ' + _Dashboard2.default.bgGreenUpload;
	      var cls_socUpload = _Dashboard2.default.btnUpload + ' ' + _Dashboard2.default.bgRedUpload;
	      var cls_imagePrivew = '' + _Dashboard2.default.imagePreviewInput;
	      var cls_fileName = 'form-control ' + _Dashboard2.default.imagePreviewFilename;
	      var loadType = 'list';
	
	      if (this.props.count > 0) {
	
	        var objNewPage = new Pagination({
	          currentPage: this.props.currentPage,
	          totalItems: this.props.count,
	          itemsPerPage: this.props.itemsPerPage
	        });
	
	        // let pagination = this.state.pagination;
	        var range = objNewPage.range;
	        var self = this;
	
	        this.objContainer = _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	          md: 12
	        }, void 0, _jsx('div', {
	          className: _DataTable2.default.responsivetable
	        }, void 0, _jsx('div', {
	          className: _DataTable2.default.table
	        }, void 0, _jsx('div', {
	          className: _DataTable2.default.headerRow
	        }, void 0, Object.keys(this.props.dispField).map(function (key) {
	          var headingID = key + 'heading';
	          var dbName = this.props.dispField[key].dbName ? this.props.dispField[key].dbName : '';
	          return _jsx('div', {
	            id: dbName,
	            className: _DataTable2.default.col,
	            onClick: this.props.dispField[key].sort ? this.Handlesort : null
	          }, headingID, this.props.dispField[key].title, ' ', this.props.dispField[key].sort ? this.state.sortObj[dbName] && this.state.sortObj[dbName] == 1 ? _ref : _ref2 : null);
	        }, this)), Object.keys(this.props.data).map(function (key) {
	          return this.renderRow(this.props.data[key]);
	        }, this)), _jsx('div', {}, void 0, _jsx('ul', {
	          className: _DataTable2.default.pagination
	        }, void 0, objNewPage.range ? Object.keys(range).map(function (key) {
	          return self.renderRange(range[key]);
	        }) : '')))));
	      } else {
	        this.objContainer = _jsx(_reactBootstrap.Row, {}, void 0, _jsx('div', {
	          className: _DataTable2.default.noDataBox
	        }, void 0, _ref3, _ref4));
	      }
	
	      if (this.props.listType == 'Reports') {
	        return _jsx(_reactBootstrap.Grid, {
	          fluid: true
	        }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	          md: 12
	        }, void 0, _jsx('div', {
	          className: _DataTable2.default.infoTxt
	        }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx('div', {
	          className: 'col-md-6'
	        }, void 0, _jsx('p', {}, void 0, _ref5, '\xA0', this.props.listDescreption)), this.filterOptions())))), this.objContainer);
	      } else {
	
	        return _jsx('div', {
	          className: this.props.topmenu != null && this.props.submenu != null ? cls_container : ''
	        }, void 0, this.props.topmenu != null ? _jsx('div', {
	          className: cls_topmenu
	        }, void 0, _jsx('h3', {
	          className: ''
	        }, void 0, this.props.pageTitle), this.props.bredCrumb != null ? _jsx('div', {}, void 0, this.props.bredCrumb) : null, _jsx(_TopMenu2.default, {
	          data: this.props.topmenu
	        })) : null, this.props.submenu != null ? _jsx('div', {
	          className: cls_isubmenu
	        }, void 0, _jsx(_SubMenu2.default, {
	          data: this.props.submenu
	        })) : null, _jsx('div', {
	          className: clsForm
	        }, void 0, this.props.listType == 'Upload' ? _jsx('div', {
	          className: _Dashboard2.default.grayCard
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.grayCardHeader
	        }, void 0, _ref6), _jsx('div', {
	          className: _Dashboard2.default.grayCardBody
	        }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	          md: 6
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.filesBtnBlock
	        }, void 0, _jsx('ul', {}, void 0, _jsx('li', {}, void 0, _jsx('div', {
	          className: _Dashboard2.default.uploadBtnBlock
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.helpTip
	        }, void 0, _jsx('p', {}, void 0, _jsx('span', {
	          className: _Dashboard2.default.heading
	        }, void 0, _ref7), _jsx('span', {
	          className: _Dashboard2.default.uploadTxt
	        }, void 0, '.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .odp, .ods , etc...'))), _jsx('div', {
	          className: cls_filesUpload
	        }, void 0, _jsx('input', {
	          type: 'file',
	          id: 'uploadFiles',
	          accept: '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.odp,.odt,.ods',
	          onChange: this.handleUpload.bind(this),
	          value: ''
	        }), _ref8), _ref9)), _jsx('li', {}, void 0, _jsx('div', {
	          className: _Dashboard2.default.uploadBtnBlock
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.helpTip
	        }, void 0, _jsx('p', {}, void 0, _jsx('span', {
	          className: _Dashboard2.default.heading
	        }, void 0, _ref10), _jsx('span', {
	          className: _Dashboard2.default.uploadTxt
	        }, void 0, '.png, .jpeg, .jpg, .gif, .wav, .mp3,.mp4,.webm , .avi, .mkv, etc...'))), _jsx('div', {
	          className: cls_mediaUpload
	        }, void 0, _jsx('input', {
	          type: 'file',
	          id: 'mediaFiles',
	          accept: '.png,.jpeg,.jpg,.gif,.wav,.mp3,.mp4,.webm,.avi,.mkv,.vob',
	          onChange: this.handleUpload.bind(this),
	          value: ''
	        }), _ref11), _ref12)), _jsx('li', {}, void 0, _jsx('div', {
	          className: _Dashboard2.default.uploadBtnBlock
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.helpTip
	        }, void 0, _jsx('p', {}, void 0, _jsx('span', {
	          className: _Dashboard2.default.heading
	        }, void 0, _ref13), _jsx('span', {
	          className: _Dashboard2.default.uploadTxt
	        }, void 0, '.zip'))), _jsx('div', {
	          className: cls_socUpload
	        }, void 0, _jsx('input', {
	          type: 'file',
	          id: 'zipFiles',
	          accept: 'application/zip',
	          onChange: this.handleUpload.bind(this),
	          value: ''
	        }), _ref14), _ref15))))), _jsx(_reactBootstrap.Col, {
	          md: 6
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.urlConverterBlock
	        }, void 0, _jsx('div', {
	          className: _Dashboard2.default.inputGroup
	        }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	          md: 12
	        }, void 0, _jsx('div', {
	          className: 'input-group'
	        }, void 0, _react2.default.createElement('input', { type: 'text', id: 'url', className: cls_fileName, value: this.props.urlInputValue, placeholder: this.props.intl.messages.youtube_url_placeholder, ref: 'url', onChange: this.handleUrlValue.bind(this), autoFocus: 'true' }), _jsx('span', {
	          className: 'input-group-btn'
	        }, void 0, _jsx('button', {
	          id: 'upload',
	          type: 'button',
	          className: 'btn btn-default image-preview-clear',
	          style: { "display": "none" }
	        }, void 0, _ref16, ' Clear'), _jsx('div', {
	          className: cls_imagePrivew,
	          onClick: this.handleUrlUpload.bind(this)
	        }, void 0, _ref17, _jsx('span', {
	          className: _Dashboard2.default.imagePreviewInputTitle
	        }, void 0, ' ', _ref18)))))))))))) : null, _jsx('div', {
	          className: _DataTable2.default.whiteCard
	        }, void 0, _jsx(_reactBootstrap.Grid, {
	          fluid: true
	        }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	          md: 12
	        }, void 0, _jsx('div', {
	          className: _DataTable2.default.infoTxt
	        }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx('div', {
	          className: 'col-md-6'
	        }, void 0, _jsx('p', {}, void 0, _ref19, '\xA0', this.props.listDescreption)), this.filterOptions())))), this.props.loading ? _jsx('div', {
	          className: _DataTable2.default.mainSpinBlock
	        }, void 0, _jsx('div', {
	          className: _DataTable2.default.innerSpinBlock
	        }, void 0, _jsx(_Loading2.default, {
	          loadType: loadType
	        }))) : this.objContainer))));
	      }
	    }
	  }]);
	
	  return DataTable;
	}(_react.Component);
	
	DataTable.contextTypes = {
	  intl: _react2.default.PropTypes.object.isRequired
	};
	
	DataTable.defaultProps = { itemsPerPage: 10, currentPage: 1, count: 0 };
	
	exports.default = (0, _reactIntl.injectIntl)(DataTable);

/***/ },

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _highcharts = __webpack_require__(402);
	
	var _highcharts2 = _interopRequireDefault(_highcharts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// require('highcharts/modules/exporting')(Highcharts);
	// require('highcharts/modules/no-data-to-display')(Highcharts);
	// require('highcharts/highcharts-3d')(Highcharts);  
	
	var Chart = function (_React$Component) {
	  _inherits(Chart, _React$Component);
	
	  function Chart() {
	    _classCallCheck(this, Chart);
	
	    return _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).apply(this, arguments));
	  }
	
	  _createClass(Chart, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.chart = new _highcharts2.default[this.props.type || "Chart"](this.refs.chart, this.props.options);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.chart.destroy();
	      this.chart = new _highcharts2.default[nextProps.type || "Chart"](this.refs.chart, nextProps.options);
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.chart.destroy();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('div', { ref: 'chart' });
	    }
	  }]);
	
	  return Chart;
	}(_react2.default.Component);
	
	exports.default = Chart;

/***/ },

/***/ 389:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.courseReportsSubMenu = exports.reportsListMainMenu = exports.reportsMainMenu = exports.reportsSubMenu = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(11);
	
	var _roles = __webpack_require__(46);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var reportsSubMenu = exports.reportsSubMenu = {
		menus: [{ _id: "lnkReports", text: _jsx(_reactIntl.FormattedMessage, {
				id: 'room_list'
			}), actionType: "URL", action: "/course/reports", active: "active" }]
	};
	var reportsMainMenu = exports.reportsMainMenu = {
		menus: []
	};
	
	var reportsListMainMenu = exports.reportsListMainMenu = {
		menus: [{ _id: "btnList", text: _jsx(_reactIntl.FormattedMessage, {
				id: 'list'
			}), actionType: "URL", action: "/course/reports", icon: "fa fa-list" }]
	};
	
	var courseReportsSubMenu = exports.courseReportsSubMenu = {
		menus: [{ _id: "linkAttendance", text: _jsx(_reactIntl.FormattedMessage, {
				id: 'attendance'
			}), actionType: "Function", action: null }, { _id: "linkTopics", text: _jsx(_reactIntl.FormattedMessage, {
				id: 'topics'
			}), actionType: "Function", action: null }, { _id: "linkAssignment", text: _jsx(_reactIntl.FormattedMessage, {
				id: 'assignment'
			}), actionType: "Function", action: null }]
	};

/***/ },

/***/ 403:
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
	
	var _component = {
	  "form-control": "QmIrbtmLmFNpHdWMqFMWS",
	  "innerWhiteTopic": "_32MPoieZt8YkhQqGNafOkY",
	  "colonBlack": "_3WjF6qk6LGz-u5ks49gdcB",
	  "error": "_3jAfmA6J7YmNDyB2VfsCxP",
	  "mandatory": "_1cwTV0Re5ORIhqzxJLXMH1",
	  "dynamicBreadCrumb": "_3QcYRL_UPZtqWKDFd5rcZB",
	  "iElement": "_2crZNiFs8z8oNhzPDC1qOE",
	  "oElement": "_1jUn1j1KBWo8dmqJ_0hdBD",
	  "iLabel": "_3Pyvct_srCoSvJCgGG41jw",
	  "oLabel": "NsxWZpxBqBX8wky_O477_",
	  "iForm": "_3IlToa7pigrSS8KWut_dJ8",
	  "oForm": "_3N0YNUcfI5U02VSmBEbYot",
	  "iFormField": "_12yKSn29WLZIE6fvGQfcrN",
	  "oFormField": "_5FMFIwRlrpPkQn-lkZ65Z",
	  "iFormGroup": "_1LZRfACwm57iOGUxKozUVE",
	  "oFormGroup": "_386CxczA49XX2-ejr3Qe55",
	  "formNext": "ccTxjcG6_GZO9OgzW33HT",
	  "iSubFormGroup": "u1jVXJqFT0vqGYzzRAhFY",
	  "oSubFormGroup": "DDmyOnrHoBdsklkH9petO",
	  "iContainer": "_2wz-gNWcGQfLXBCiToDWjI",
	  "oContainer": "_2tEAAtqgoutuOUU96rNvv1",
	  "iSubMenu": "XCOXe3mm5CZP0qxtnZPyC",
	  "oSubMenu": "_1Rx5COiw9Ae92TeE3LnwRm",
	  "iTopMenu": "_34RmLz4U_lA3sL18SjVR2-",
	  "iMenuContainer": "N8LzghkGxja2Hkx0A-vzE",
	  "whiteTopMenu": "YQfoPq5fhhEoPFvP-VF1W",
	  "iSubMenuContainer": "_357Fb5CZ0VyABwYB9VmmIE",
	  "active": "_2fF1Q9nO2O_1B8Ldb4RM52",
	  "scheduleerror": "_34M0UOwV0tW7xV7AV2Cz7P",
	  "errorPre": "_1ft-as7ic7_8EXp1iz5sfW",
	  "errorclass": "_3jvk8bfxyC_tWLn1pBOytU",
	  "whiteCard": "L2E7_Tzcp2MrkuuUlBf3t",
	  "greyCard": "_34l9W17Mt1koxHLd1yUqgk",
	  "reactTelInput": "_2OA1bLJ7mQFTEL9gP1dDif",
	  "countryList": "_2ARbPU2OQ7JLphJ2g0U0F-",
	  "react-tel-input": "_2PMN3xMEp7kCR8iQoBjSrd",
	  "ad": "N3bKXyhfwvWT3eAEC9Nno",
	  "ae": "taXUT8yfjgRMeSH3rMNxy",
	  "af": "_2vH4qShCgBPBO4GR8BdNvd",
	  "ag": "n8QfWtvpZLMpatCUqX2Td",
	  "ai": "_3fPX_RcpesOPxFsmsaygCE",
	  "al": "_1T12tbcC6990b-fIMG5LYW",
	  "am": "_31HdarMDfXvAgjizVUoeHk",
	  "ao": "_1Zb9qi0G-pe7OWK-cu6BoS",
	  "ar": "_2qJleMgRbIErIrx3kQF57O",
	  "as": "_2ZPVYL8Vjn-vdWZToCEhjN",
	  "at": "_1hWilvnrVbANEHRyLGlF-m",
	  "au": "_2zJE4K6o-ftWqhb3exXZgk",
	  "aw": "_1UroMxX5JHt9bjGdHwa1OY",
	  "az": "_-Y2xueZ_1mEtB9YDOqEGB",
	  "ba": "_2FSEeZiYqoYo0pJ5J2uXJC",
	  "bb": "_34600Kl8Wac9Hx7S3-3U6b",
	  "bd": "_3WBX90V5VJXA7-vSUfEWCh",
	  "be": "BcK33edOPcbYdkxxvOApy",
	  "bf": "ShN64-J7UZdswoQjkf7L_",
	  "bg": "_2A9PgkQEF5_KbvHvDf6_lY",
	  "bh": "_10p3rxNRYOhv8-BtZuq1w8",
	  "bi": "_6MzP1qXXDFAZVL7nBmRiH",
	  "bj": "_2U8H1sji9LfDEW706KyKvF",
	  "bm": "_3AOdFLNLEBMwpaIygqQ4Zo",
	  "bn": "PgMDvF79WHl3kaklOmhw3",
	  "bo": "_7MheGVInaTi-QLxw5PiUi",
	  "br": "_1BDNUyT0cHDlbCBFgrrLkJ",
	  "bs": "_3vcASZB5bu7mJAzTzaRkWe",
	  "bt": "esu4pvyd9ZFWrf-etnrva",
	  "bw": "_2Hbv1I361RJFK3Ph2xPlu_",
	  "by": "_2tbYam6Og8RAicMhX9SXvI",
	  "bz": "_3xB704PIgqFnU2zTG-JZFN",
	  "ca": "_36FyK29nkNl9Ez7yWh04AS",
	  "cd": "_9PnHTqK1pSn_GIAbBtPT2",
	  "cf": "_2LgMF7o1A3a2cgw5jkpvZV",
	  "cg": "_3hYc9Y3UdCphltZKe2vJWk",
	  "ch": "_3BLJ9WmZAyoQNVnGDTm0hl",
	  "ci": "FoSGkvvMDFAVcvsZBWX-Z",
	  "ck": "_1742IgEaHW3SZU7h_-nkwr",
	  "cl": "_36IaMt7ntEwUsH4lwN4tW-",
	  "cm": "_1N8krqbPtlsEVsh6SaCetm",
	  "cn": "IfkD3fwbUSx9FZflX6iIU",
	  "co": "_3Y7u7ONzxyZVjZYzS1OHTr",
	  "cr": "Gw5Qz4qBNZjPDmpQmi-d2",
	  "cu": "ZuHtEp_knwZcbwTTJkRgI",
	  "cv": "o6BzJCyjRH1pOsf_HpbQ6",
	  "cw": "hRElJCQXyNIITDZ6UQVut",
	  "cy": "_2cHKWrINPNO6L8BEOdtJCG",
	  "cz": "nS617LE8Qcckdv9HJTWpt",
	  "de": "fqJD93WBywDPs0lrLEXLT",
	  "dj": "_1Rb2ZC6bLR2kLQHrXt3fi1",
	  "dk": "_3fpBLMtuUi0kowy3ziMRYd",
	  "dm": "_3gMwGkQW-OGFx1U7vd7VMD",
	  "do": "G9EZGjpXLJUyQuREesyGO",
	  "dz": "_3Nka0vwv6nZpeugyuqYQIJ",
	  "ec": "_18t83SdIOs8EY6iF0zV0CZ",
	  "ee": "_1miCbYr55XmBKvcUu6XetR",
	  "eg": "_1T55wMh1svM7M5QGxFM2ex",
	  "er": "c0Ab9spCQ4VnXr_6xijnD",
	  "es": "_1lutiEL9tJpdNgKmnTT6Ld",
	  "et": "_2GGXIPO2kOV6CUsu65V4Z3",
	  "fi": "_1I-g5oWpQznT5QZuBfQ8A",
	  "fj": "_3oeTP_GhC_XzsjzHW86oDc",
	  "fk": "_3-_BjK4NArHS0nyf0DLc4F",
	  "fm": "_1WQYGDC-zTatxog3SIwE80",
	  "fo": "_2Xp5yMjRKQGGiCb4PPbdrr",
	  "fr": "_3-mqatBXfaTfex8LWjnIDA",
	  "bl": "_3QJ0ZMybaJjeqWZHvkXeIl",
	  "mf": "_34f4ya9mcbpIcQPgHJ4I6c",
	  "ga": "_15_iO4CJaXbX7PySxoldPF",
	  "gb": "_1vZuFSSey59_ixozre-0L_",
	  "gd": "_26Ub0jcjDpVD4nwM7m5n4e",
	  "ge": "_27ctDR0Hf6HO15MgHS8wyh",
	  "gf": "_2S6C39D4wNBuVSqzYM5Ldy",
	  "gh": "_3vjGi6-umA-RzwxRFaTfNN",
	  "gi": "_1VP2WL3_4ou1de2Ng8Wmd_",
	  "gl": "_1OTvyS4D4UOkymKuDLxUdx",
	  "gm": "_3-0gezNOVCHKzaLYGUySo2",
	  "gn": "_8f6uadrEfnS9IX8DEIpKO",
	  "gp": "_36yEj9UcEbZcI0WJvgmk0B",
	  "gq": "xHX18x9xk7PhDBlgsvnad",
	  "gr": "HTk_eFej1VrCiBuKBIfLT",
	  "gt": "hgmUbzxaHNZNL6frPhPeb",
	  "gu": "_3qeSb_MjyQ-VPPpwNWgXpl",
	  "gw": "_36JwaXqhh4gBrIvAy4c1KO",
	  "gy": "_3ZZcZTZlIH4DUUQ2BIamaK",
	  "hk": "_1mT74O5OVtonPLmYnVVOu7",
	  "hn": "_1ze0KI-TYxTrDcXlMOu24s",
	  "hr": "ZIDUSRfcbDCZTyhqWGPob",
	  "ht": "Y65Ad5pf3z7ufcknP0vhk",
	  "hu": "_3EHKICvcensXt5hEu8Nkfs",
	  "id": "_3oZE8uvxIFK7M9DCEtsSCD",
	  "ie": "_2RNmpg94YYioQp2fWyz_xn",
	  "il": "_2Mq_no7KYxPp2NSLGS1Tcs",
	  "in": "_1UlEZ269GihRa58c5mCEBN",
	  "io": "_3ovelrc7S_DdmXxL-8uuwk",
	  "iq": "_3VSlK6DYHrBgKbkE2Rng2N",
	  "ir": "NRX2sFBmuPSJ9EOigyuEP",
	  "is": "_25HaTNE7x74CJO9S1mnm4I",
	  "it": "_1-LmlhbrcpKN-xjESmR_sO",
	  "jm": "VsvDBply-4FtMoJhi8Cvu",
	  "jo": "yEE3hbkzWK8CSCrCJibCo",
	  "jp": "_3oxjjz1uD2cX2QsoSToLgz",
	  "ke": "_1ksOT6KMPd99EWuWCXPga_",
	  "kg": "_2CMnR3yv5DGwDc8p3uoOjp",
	  "kh": "_927b1QnaSWnN35i3bVewJ",
	  "ki": "_2CuDp55lqYTpFp68D4IWep",
	  "km": "_3tvMTeZYZMzBB9bGn9lV9E",
	  "kn": "_6kbCvwc22pJX0tNv3HToQ",
	  "kp": "_3tIPOe5PNrHH-bgCGaZTJj",
	  "kr": "_2653rpVUuy3ETaw1mogdnF",
	  "kw": "_1SKg_lTe0ShbPSOl44eKjp",
	  "ky": "tgj8SOv7bYoF7qfbbQWNG",
	  "kz": "bchn50J152EdQa0zf3k5u",
	  "la": "mu9oycLgpKX8_yLLkR5b9",
	  "lb": "_2TcAFbagIrNyc6mgzRVNW0",
	  "lc": "_2IFItnUNT-albvpN-ksxd2",
	  "li": "_3_E6nQspv6zJQLQI24puaS",
	  "lk": "_2M2wq3qQhGeUegbBTs7ilH",
	  "lr": "L4o4xOg0s6QbasyIRPgyF",
	  "ls": "LhBB6SRin61WSFtUwaEfe",
	  "lt": "ITDUphrnMkKItKGMVHZf8",
	  "lu": "_1mVW30sc4i-1M8tDPCQlL",
	  "lv": "_3rq6vE2IagAsGI6iESAcJq",
	  "ly": "_3se_Nzm1WQrEN3VZYiJJrv",
	  "ma": "_fSDiNxp_jjfqkQcWffDM",
	  "mc": "_2hRTRZeBtDGN4mNeWBZVgB",
	  "md": "_26jDl0skadEwmUYDGmEzST",
	  "me": "_388lJj_7sQdyd9HL7pMrar",
	  "mg": "_3aFoqVWcvG3p47Vwa6UuoE",
	  "mh": "_1YHi6OtXmKfP15ZNbwYGgy",
	  "mk": "_9QVyhHcp8yH762J8fWXhC",
	  "ml": "yYD99PoyhgFI4912_qoyJ",
	  "mm": "URzk8-j7LcySpGUMJf_Qk",
	  "mn": "_1J-lktQUTK0rydBz3foJGF",
	  "mo": "_1sbL0zhHof-KbfGWu2qjqF",
	  "mp": "_1tJjJlSjRw5AnqcXXmGwCI",
	  "mq": "fHob9sxaJrTuqSc0xL744",
	  "mr": "t-Bmj7a31aA-IwcRcL0ua",
	  "ms": "_2xyT54DQP62zWDySH7-Kdy",
	  "mt": "_1Ul_OlGODc8S0QplVq94PV",
	  "mu": "_1yIBERRJqnV33pTq2VpKRc",
	  "mv": "_3VqQ1QKRZyrVO6o8AvYgsR",
	  "mw": "_3i8n-5-htdGNJLgn96O21",
	  "mx": "_16-6zoyiVzSGB1O72cUTzV",
	  "my": "_3W2P0D9eTN4BQoOcThOsaM",
	  "mz": "wJ8icX7Asp3dSImkXOdTM",
	  "na": "_1qt_F94mybbX5kr0ArtN-Z",
	  "nc": "h82AMIuCGdKf69Hc_nM6D",
	  "ne": "_2mVa5nGsijzD93WRl8dk64",
	  "nf": "_3XQ9oUH_84SsdZLjpVRuqT",
	  "ng": "_1uyyH1GZjsEk3YpaUSmmG6",
	  "ni": "_22_3H6UeFo26o3fSavtQaX",
	  "nl": "_93asfBYgR8C7bEDucZO8l",
	  "bq": "_37A1nwIz7Z3obwUjmliw4s",
	  "no": "_2-sVmkWiLn_ogTikc0c0Eg",
	  "np": "_1PqZSwf5cuMNmbE7bpKe67",
	  "nr": "_9q5Rg9Xn0G2buivFSGySP",
	  "nu": "RLhVdyjL9Cex8ekaJqirU",
	  "nz": "_1LHfwPg-iXjSTdjVKJ2BYn",
	  "om": "_9mZYNhgBLiQg-j1FeVprJ",
	  "pa": "_3S7TrzxJIEYVghUMVHB6E7",
	  "pe": "_3V5sP7VvdGOFqApj7POYl2",
	  "pf": "_1YzdrkyHO-eCcEFF-hjZl7",
	  "pg": "ddWAanlQJPlB0QDWO6dAF",
	  "ph": "_2TGbmCcqHlJFCssz78MxOs",
	  "pk": "_2JerTABYGCUN8FLjpnDzKy",
	  "pl": "_3X1Zo6JhS7aPUTPWCBJyzX",
	  "pm": "_29Hoo7EsoSHtvRFvlVg2cD",
	  "pr": "_3_pkwz60KLoYcbKwaRvIsS",
	  "ps": "_3jenITZ_yUYS7kU1HwFEHj",
	  "pt": "_1vz8ABWy5Yd43_JhaTWq9u",
	  "pw": "_3Yr0RZMbOD2QJkTtMx_HIk",
	  "py": "_1_W41pJLcGMRhLdU997clv",
	  "qa": "Z0tjAakoNSOs14KuenmRi",
	  "re": "_3k5KF4jzE7HUitQw9MQKnp",
	  "ro": "_2b8XhT3-7NgjAC8gJJkpis",
	  "rs": "_2MUJr9MQbiKRTd_g0TaRQr",
	  "ru": "HjzPW2CxxNMSGZw1ugFW7",
	  "rw": "_23TGIOoPmB9QYqIPG6W3tA",
	  "sa": "_34WM8rSonfayW0vJ3koqJS",
	  "sb": "_3486rZNsCjvTmIoHbjK8mG",
	  "sc": "_3meAM_iQCU6MyfPQJTN3yl",
	  "sd": "_2x6XeHNF__4s9VVfFXCJhO",
	  "se": "_66VDclGQXxpdUR8uE3ZFa",
	  "sg": "tv3I_hfLcUJ_8i9ewVcUz",
	  "sh": "_1syDbbhbumwMwwD7Dwkb1V",
	  "si": "_3jsffwJjGr2sMEofSTTGkG",
	  "sk": "_1EpYAUcQLCqbYB48Auixqb",
	  "sl": "_3STJQv9nY5mol4cW82D2ci",
	  "sm": "_9aTR-AZMTaYHRmDVAyFTM",
	  "sn": "_3mTatYTWeJQQACfV7xzRhi",
	  "so": "_1LnWon2slwLMqAHzhkRT4c",
	  "sr": "_1GSedFwSsf5isgOi3p0x6U",
	  "ss": "_1sq99LOjKKgery3luOXOFn",
	  "st": "_1O6vYx_NaXFBAs1qYxgwaB",
	  "sv": "_10D9RGnRzUv14bYWQaC23c",
	  "sx": "KonDEEzH2JzIWsVUBzFdY",
	  "sy": "_1ZAnqGYeixOJVFwwt6hNIo",
	  "sz": "_3FeOFkec3sXYbvQhWDdIM7",
	  "tc": "_1FZvldKEV-vz12TyyNfEf",
	  "td": "_31fysfDRtTWVKcX_UjX0ty",
	  "tg": "H60Kyr6MsF6nvRz5l7EfN",
	  "th": "SHZkbUz1c_H_zDOfxLc4",
	  "tj": "_2MRI0fA4OLgepXVooYMu9H",
	  "tk": "_1W959S9LHLCKhz3xi4MpHe",
	  "tl": "_1lMF_0nwQXTyBRRzRj7hBF",
	  "tm": "_2ZB_Dy2eRo6J0ylRkqC62I",
	  "tn": "_2MeGi_bqLVuCaRtJzs3QqA",
	  "to": "_3egwC_50WENVPaap_uwXr8",
	  "tr": "_2KiPy3o6m7JCKQWPY2fI1d",
	  "tt": "_3Hbn6Wi0dSnyrjdgeMmYmf",
	  "tv": "_2D9VWSmHkhgNemAaIKF_cp",
	  "tw": "_2J7nVAh1zEa7kV5Ba51CLV",
	  "tz": "_2acF96LLqMjlbfMX1oiAjT",
	  "ua": "_2rr3Tyr8dP6vDvE0khEDKT",
	  "ug": "D7gjzKmlr78rNWXXw90np",
	  "us": "_1l5RtWI_acgLVeCd5fjgHG",
	  "uy": "_1zX6hTsIa2TtL6dgR47eQ9",
	  "uz": "_29NUL3VtwK1_RWUyPsY2ei",
	  "va": "_39kTgRBkhqqGVLUTJvK_67",
	  "vc": "_2EwnB8Pe5TZDGdNIXOvzzg",
	  "ve": "_3Lk2Svkm2NTAVpUfiY_No5",
	  "vg": "_3SiYuGrNzW9DNkXwTZugyj",
	  "vi": "_2BiiERObu5xcE6P1SZxLdj",
	  "vn": "_3kSg6iW0KLoUpJ0g70fckK",
	  "vu": "_1UdrzjuDjSDu6-DJ5yV9cQ",
	  "wf": "Arz0xEqJcbKbLmPz_tXTS",
	  "ws": "_3oTaxcmbTriEd90-cXNqD8",
	  "ye": "gxtmCiQO2ao4JTQXuRUIJ",
	  "za": "_25HyrYKmQQAteF_LwADnIt",
	  "zm": "Kui2u7hZHcNBqlzbqR-vQ",
	  "zw": "_3VPnIcPuwZ3cFvNOHPN8ar",
	  "hide": "_2kO_U0LXcg71jJA6RSia2e",
	  "v-hide": "_2HBc009zwTsSlkh8P8tH10",
	  "invalid-number": "_17iYQoyXCPAB8XfsRqDdDH",
	  "flag-dropdown": "_1JTLnRuUJ50FBWDCCCWc4b",
	  "open-dropdown": "jG7mLbpUfq5nh2TzhXfBa",
	  "selected-flag": "_10c169vRt8V92_nQ_S0KtR",
	  "flag": "_2AEEM5AZQcsUPJUQZSd8Rr",
	  "arrow": "_3GOH36qvhOwAJd2ppQ3AOB",
	  "up": "_2ykRnfq4f2nlmZGfvzrn92",
	  "country-list": "UlTusogWL2urjgGgLNpcD",
	  "divider": "_2zMaTbM3nSdE07wOs7YYRt",
	  "country": "uL848pHFWhb_G94Ak-KX5",
	  "dial-code": "FxUYLz6b2tBEUXdb9DRqQ",
	  "highlight": "BLa_2aA2PkYD2PsO2fvNC",
	  "country-name": "_3ih_ovRiGmAkpjxuz63nhk",
	  "uploadFile": "_3CUi48rtxy1m3Wz0o2aHk_",
	  "fileUpload": "_2WENukerx3mNXkTyu0UXQf",
	  "uploadLabel": "_1VYdz-DRIuPqCKWlu5Rd5W",
	  "upload": "_2DUvBpBYzPWlV-6Yx2Pjas",
	  "blackTxt": "Z1W_HNjnSJTqNclgOwR-3",
	  "feedbackTextArea": "_14APtzGfaR_yoeAQJMJT5z",
	  "errorModal": "_2PEnO-md-8qd3dF2cZGhMD",
	  "gradeColor": "_16sNzVDnEzucQAxknLYKQQ",
	  "red": "_3wj0AXV9gqX9YG1nk-2u9J",
	  "green": "_3KPVxc3su8ewtuKZgu8TGv",
	  "orange": "_3cLlE5QI9XJwY6e7jO5bLg",
	  "capitalize": "_2yqvFrqWq4uakYy_s3eeMY",
	  "importBtnBlock": "OwSu91np9HnUW1VdSX5hA",
	  "importBtnUpload": "_2eJ0cgHJ9Qj4GAz9x1jChE",
	  "importBtnInput": "_3ZCvqG4C-pjYzfgVNN8eze",
	  "icon": "_12rnwIUewKT2PdtWMnNyD5",
	  "importFileOnclick": "_2qsz43E0kYpZO89nXXV13S",
	  "broadcastWhiteCard": "_2Vf8tRdA-IkCpzrPwrxoLi",
	  "broadcastNews": "eK8W5URbLbE8ER1zsFc6V",
	  "btnPost": "_30ipfhZp6Vv-ikKnFNtEI7",
	  "textArea": "_3uPzOKXSyhgfRUhfmeVwfC",
	  "spinnerCss": "_1ouaIjiJ2MFv5PI5UqZ1ev",
	  "pdfView": "_2DquMFdC6rEzAaWJ2U-ahy",
	  "lineHight32": "_3RF4CWuoSHP3JddZnzrhZh",
	  "removePdng": "_3XuIzA6t9BoFiZfEFhOn3f",
	  "inputAllCap": "_6YEeMYUnLHaS691RRjq7L",
	  "popHeadingAll": "_2suWB3cd5kOd2yUCJCr640",
	  "dateControls": "_1BrlYTxzEBCsm_zJ9PPGkp",
	  "dateRange": "_1JBu7w3GlOnQBH8oh1-EXg",
	  "applyBtn": "_2Rz8lBsFU8i7B9Ia-G-cv3",
	  "filterTxt": "_1Wdy1Hr8CUuuK8O9Liz3yi",
	  "btnApplyAll": "_1Y_QiGh-mkiUfuuiix0Yeb",
	  "assCanvas": "_2Ue4kVYDy-eQJrbNCKv0yC",
	  "pdfBlock": "_3UAEHpi6NrNz6ZDh2Lfk0E",
	  "assTab": "y4LW63OuadI0JWTQBnbJ1",
	  "heightForScroll": "_1s76YPnhEAnqK63LsEzIZh",
	  "radioNewProfile": "_1RD_hASO-4hwDMMDABPgkH",
	  "wrapper": "IVU-3tPtgRn_cBMA2jD_Y",
	  "leftBox": "_2c_UkbRVkIhCuEx7sFrhEz",
	  "rightBox": "DP21PoKxwKk_vJyOuQTcr",
	  "gradeBlock": "_1KaDEKb6KgB6xx-gEx-KTu",
	  "actionBoxTop": "_10AdTDYinFiKZ9H30uacSD",
	  "gradeBody": "_2pAeBQb2ZLvpxG09x5oJnS",
	  "actionBoxBottom": "_1UHK6epVvw6XZJ1KLDuQuI",
	  "gradeGroup": "_3VI0hvgPHy6r31t8WOJVDq",
	  "morePref": "JBm94eKPIFI8vfiroATJ6",
	  "tile": "_1Ssp2zTovh7AwJWuRkgnge",
	  "tileItems": "_3cDqgy8AedDYzhy8Euosis",
	  "tileHeader": "_1LhZQenbqV0FNu-ykdOEI3",
	  "tileHeaderLeft": "_2MwtFA5OodvfH7RxQPCPQ_",
	  "category": "_2Ow56TBY2Y24yY5SjVRU4l",
	  "innerScoreBoth": "ndEN_RpJfrJ_tKG_RA68v",
	  "maxScore": "_3uL97t2vemfuAs83cAFhjE",
	  "maxScoreInput": "TKf_xWbkl0UNSxyusGMn8",
	  "scored": "_12gGWK_s69JBGzOAX7ClkT",
	  "scoreInput": "_2Mk4HrrcAyqwuFRTOgl3lh",
	  "remTile": "_3vgBsvWRGVVRwIEDn1TquO",
	  "tileBody": "dF1WC_PeNjG87K2XGMIcS",
	  "tileRatings": "_2CCbhFQsjWGMpVC9Wui7Vr",
	  "gradeBox": "_1yi9i3Jl0hqMYPn1Tgv_cF",
	  "gradeDisabledBox": "_14nvGiDb0wY_EIfoptsCdF",
	  "assignmentResultActive": "_2tWSBiPrHoK1xrmZ6QsC-W",
	  "blue": "K7acjAQMroOGGtUqqojYy",
	  "yellow": "G7N-PGOIbGO_ZkaqBu2mx",
	  "txtGreen": "_3ozvzoCtqRqS2AzlUELKKF",
	  "txtBlue": "_4IOpBzUT2qYXMYt5UKiJP",
	  "txtYellow": "_27BE3ODkiyosiM3HqlgtFT",
	  "txtOrange": "_3uTqWL645yWk5qXsaxxH_M",
	  "txtRed": "_3WDBRR7fo7Gn2KKo7rrE_Q",
	  "txtppl": "_3nfbHs21ZfqnZ9n2wICEDb",
	  "addTile": "lCw_kxhsAPcuM3yFAqvpF",
	  "addContral": "_1aQuHhQkJrKTdNBYcoAQFh",
	  "addIconCircle": "_2lFLErjrZAe1ZXjCbykAVD",
	  "commentBox": "_2h0b9sj0Y_QpQzSh6njVoO",
	  "totalScore": "FDG4LAia-7JDDtxb7R4Kb",
	  "totalScoreInput": "_23XbNFEiJgqq0S35rhnpj6",
	  "textBox": "_13VdIFmMegxz_eR8VIXN_M",
	  "totalScoreSpan": "_2Pj4PN_f9FgyLDc9JE4vu9",
	  "totalScoreText": "_1YbsVQIx_uSOAygZtwoTNK",
	  "resultBox": "_3XB8yAFjZjZubswP7rs3Lt",
	  "resultBlock": "FmvbKk1ChtYs7Lm76nRaX",
	  "resultHeader": "_1AWxMTonqDqoWhnz1g9d-d",
	  "headingTxt": "_1GSvGEp7hTrEpIa-UkynQZ",
	  "scoreBox": "_3HTg1VUMSPfLvdZUBsj2N_",
	  "resultBody": "N6kKlySaRGbRcB4bBmpZ0",
	  "resGroup": "_2byM-_1N3yjHb2dpmlikdf",
	  "resTile": "DZeuj4DKkdAPKCgYd76RK",
	  "resCriteria": "_22AwZF3M7Ffw8GTgoz2DSi",
	  "resRating": "R7j9mxFZmdmLgC7bPXpyN",
	  "txtSize": "_977ldMQMMiHQ0YG_61T3g",
	  "txtplBlue": "_27vNfTLrgUcEIvntpfFS_N",
	  "resScored": "_1T5pr7r7hw9rq_NyVSB0lM",
	  "resInput": "_14gsxA36f-uYOfxGDvr_gi",
	  "activeTxt": "_3mkD5eqWDun2pAM_mx16kZ",
	  "feedbackBox": "_1ae7KB7aTT79QKO6O85GzI",
	  "fbHeader": "idU-Kkkc7R8cdYS_Ayh47",
	  "feedbackGroup": "AKd59EZ_Qjl6GE1amJRlx",
	  "profileBox": "_1JFzTlQEl2bDxwqAx77fbj",
	  "profileImg": "_3k-2OFHHSzyQUB7Zkcc21l",
	  "profileDetails": "_2wxDQDzYCXmmG6lQaOlEj7",
	  "name": "_25-6SxUiv8zhOMEVTRrg8w",
	  "commentTxt": "_2tLMve1A4CHR8jTUu5J1jI",
	  "addpdng": "_6rQH8tivz8ELIWszpbahs",
	  "good": "_3lOxcxDfxhPcuhLBJHo4Ur",
	  "vGood": "l_IAfocpDxfvpU316U0EI",
	  "fair": "_3I3YapUnBVxgs-ZsGf3Poh",
	  "poor": "_1uSJT6ULTWAvr1S_77KhIZ"
	};
	
	var _component2 = _interopRequireDefault(_component);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _lib = __webpack_require__(45);
	
	var _reactBootstrapDatetimepicker = __webpack_require__(86);
	
	var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _reactIntl = __webpack_require__(11);
	
	var _IntlReducer = __webpack_require__(141);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var DateRangePicker = function (_React$Component) {
	  _inherits(DateRangePicker, _React$Component);
	
	  function DateRangePicker(props) {
	    _classCallCheck(this, DateRangePicker);
	
	    var _this = _possibleConstructorReturn(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props));
	
	    _this.handleChange = function (e) {
	
	      _this.setState({
	        filterWith: e.target.value
	      });
	
	      if (e.target.value == 'T') {
	        _this.startDate = (0, _moment2.default)().startOf('day').utc().toDate();
	        _this.endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	
	        _this.setState({
	          filterStr: _this.props.intl.messages.today + ' : ' + (0, _moment2.default)(_this.startDate).format('DD/MM/YYYY')
	        });
	
	        var obj = {
	          fromDate: _this.startDate,
	          toDate: _this.endDate
	        };
	
	        _this.props.getDates(obj);
	      } else if (e.target.value == 'Y') {
	        _this.startDate = (0, _moment2.default)().subtract(1, 'days').startOf('day').utc().toDate();
	        _this.endDate = (0, _moment2.default)().subtract(1, 'days').endOf('day').utc().toDate();;
	
	        _this.setState({
	          filterStr: _this.props.intl.messages.yesterday + ' : ' + (0, _moment2.default)(_this.startDate).format('DD/MM/YYYY')
	        });
	
	        var _obj = {
	          fromDate: _this.startDate,
	          toDate: _this.endDate
	        };
	
	        _this.props.getDates(_obj);
	      } else if (e.target.value == 'L7') {
	        _this.startDate = (0, _moment2.default)().subtract(6, 'days').startOf('day').utc().toDate();
	        _this.endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	
	        _this.setState({
	          filterStr: _this.props.intl.messages.start_date + ' : ' + (0, _moment2.default)(_this.startDate).format('DD/MM/YYYY') + ' - ' + _this.props.intl.messages.end_date + ' : ' + (0, _moment2.default)(_this.endDate).format('DD/MM/YYYY')
	        });
	
	        var _obj2 = {
	          fromDate: _this.startDate,
	          toDate: _this.endDate
	        };
	
	        _this.props.getDates(_obj2);
	      } else if (e.target.value == 'L30') {
	        _this.startDate = (0, _moment2.default)().subtract(29, 'days').startOf('day').utc().toDate();
	        _this.endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	
	        _this.setState({
	          filterStr: _this.props.intl.messages.start_date + ' : ' + (0, _moment2.default)(_this.startDate).format("DD/MM/YYYY") + ' - ' + _this.props.intl.messages.end_date + ' : ' + (0, _moment2.default)(_this.endDate).format('DD/MM/YYYY')
	        });
	
	        var _obj3 = {
	          fromDate: _this.startDate,
	          toDate: _this.endDate
	        };
	
	        _this.props.getDates(_obj3);
	      } else if (e.target.value == 'C') {
	        _this.startDate = (0, _moment2.default)().startOf('day').utc().toDate();
	        _this.endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	      }
	    };
	
	    _this.handleFromDateChange = function (fromDate) {
	      (0, _moment2.default)(fromDate, "x").isValid() ? _this.startDate = (0, _moment2.default)(fromDate, 'x').startOf('day').utc().toDate() : _this.startDate = false;
	    };
	
	    _this.handleToDateChange = function (toDate) {
	      (0, _moment2.default)(toDate, "x").isValid() ? _this.endDate = (0, _moment2.default)(toDate, 'x').endOf('day').utc().toDate() : _this.endDate = false;
	    };
	
	    _this.handleDateSubmit = function () {
	      var toDate = (0, _moment2.default)().startOf('day').utc().toDate();
	      var endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	
	      if (_this.startDate == false && _this.endDate == false || _this.startDate == false || _this.endDate == false) {
	        _this.refs.container.error(" Invalid Date");
	      } else if (_this.startDate > toDate && _this.endDate > endDate || _this.startDate > toDate || _this.endDate > endDate) {
	        _this.refs.container.error(" Future Dates are not Allowed");
	      } else if (_this.startDate > _this.endDate) {
	        _this.refs.container.error("Start Date should be less than End Date");
	      } else {
	        var obj = {
	          fromDate: _this.startDate,
	          toDate: _this.endDate
	        };
	        _this.props.getDates(obj);
	      }
	    };
	
	    _this.state = {
	      filterWith: 'T',
	      filterStr: _this.props.intl.messages.today + ' : ' + (0, _moment2.default)().format("DD/MM/YYYY")
	    };
	
	    _this.startDate = (0, _moment2.default)().startOf('day').utc().toDate();
	    _this.endDate = (0, _moment2.default)().endOf('day').utc().toDate();
	    return _this;
	  }
	
	  _createClass(DateRangePicker, [{
	    key: 'render',
	    value: function render() {
	
	      var removePdng = _component2.default.removePdng + ' control-label col-md-7';
	      var addpdng = _component2.default.addpdng + ' form-group clearfix';
	      var rangeLabel = _component2.default.lineHight32 + ' control-label ';
	      var applyBtn = _component2.default.applyBtn + ' ' + _component2.default.addpdng;
	      var cls_btnApplyAll = _component2.default.btnApplyAll + ' ';
	
	      var fileterOptions = [{ 'id': 'T', 'name': this.props.intl.messages.today }, { 'id': 'Y', 'name': this.props.intl.messages.yesterday }, { 'id': 'L7', 'name': this.props.intl.messages.last_seven_days },
	      // {'id':'LW','name':'Last Week'},
	      { 'id': 'L30', 'name': this.props.intl.messages.last_thirty_days }, { 'id': 'C', 'name': this.props.intl.messages.custom }];
	      return _jsx('div', {}, void 0, _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'container',
	        className: 'toast-top-right'
	      }), _jsx(_reactBootstrap.Grid, {
	        fluid: true
	      }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 4
	      }, void 0, _jsx('div', {
	        className: _component2.default.dateControls
	      }, void 0, _jsx('div', {
	        className: _component2.default.dateRange
	      }, void 0, _jsx('div', {
	        className: addpdng
	      }, void 0, _jsx('label', {
	        className: 'control-label'
	      }, void 0, ' ', this.props.intl.messages.date_range, ' : '), _jsx('select', {
	        id: 'dateDropdown',
	        className: 'form-control',
	        onChange: this.handleChange,
	        value: this.state.filterWith
	      }, void 0, fileterOptions.map(function (data, i) {
	        return _jsx('option', {
	          value: data.id
	        }, i, ' ', data.name, ' ');
	      })))))), _jsx(_reactBootstrap.Col, {
	        md: 8
	      }, void 0, this.state.filterWith == 'C' ? _jsx('div', {
	        className: _component2.default.dateControls
	      }, void 0, _jsx('div', {
	        className: _component2.default.dateRange
	      }, void 0, _jsx('div', {
	        className: addpdng
	      }, void 0, _jsx('label', {
	        className: 'control-label'
	      }, void 0, ' ', this.props.intl.messages.start_date, ' : '), _jsx(_reactBootstrapDatetimepicker2.default, {
	        mode: 'date',
	        className: 'form-control',
	        maxDate: (0, _moment2.default)(),
	        onChange: this.handleFromDateChange
	      }))), _jsx('div', {
	        className: _component2.default.dateRange
	      }, void 0, _jsx('div', {
	        className: addpdng
	      }, void 0, _jsx('label', {
	        className: 'control-label'
	      }, void 0, ' ', this.props.intl.messages.end_date, ' : '), _jsx(_reactBootstrapDatetimepicker2.default, {
	        mode: 'date',
	        className: 'form-control',
	        maxDate: (0, _moment2.default)(),
	        onChange: this.handleToDateChange
	      }))), _jsx('div', {
	        className: _component2.default.dateRange
	      }, void 0, _jsx('div', {
	        className: applyBtn
	      }, void 0, _jsx('input', {
	        id: 'submit',
	        type: 'submit',
	        value: this.props.intl.messages.apply,
	        className: cls_btnApplyAll,
	        onClick: this.handleDateSubmit
	      })))) : _jsx('div', {
	        className: _component2.default.filterTxt
	      }, void 0, _jsx('span', {}, void 0, this.state.filterStr))))));
	    }
	  }]);
	
	  return DateRangePicker;
	}(_react2.default.Component);
	
	//Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    intlData: (0, _IntlReducer.intlData)(state)
	  };
	}
	
	exports.default = (0, _reactIntl.injectIntl)(DateRangePicker);

/***/ },

/***/ 453:
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
	
	var _reactIntl = __webpack_require__(11);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _ReportsActions = __webpack_require__(150);
	
	var _ReportsReducer = __webpack_require__(151);
	
	var _IntlActions = __webpack_require__(37);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _IntlReducer = __webpack_require__(141);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _lib = __webpack_require__(45);
	
	var _DataTable = __webpack_require__(377);
	
	var _DataTable2 = _interopRequireDefault(_DataTable);
	
	var _Admin = {
	  "form-control": "_3f5Ek_BxZWp4TgAvO9iMgx",
	  "progressLabel": "_3-0689LiR7tz_vbtEfR1IJ",
	  "progress": "_32kzRKjl47M7AcFAivyyho",
	  "progressBar": "_2tVD6KALTWwOtUWFBlQDYS",
	  "progressBox": "_2Qr6h8u0j6wWBgfM9ImZaH",
	  "backButton": "_1mSyVAqBsfEZTzTQCfa3-K",
	  "containerRight": "_3tnvGMV_GO0AC00W0gw2hh",
	  "googleContainer": "_1G8DyX--1Xskim3uSHbxil",
	  "googleContainer1": "_1ZjsrGjPe95kiwJYTjPkf3",
	  "googleContainer2": "_1Mz0pDpSBEwdM2zIV6C6fv",
	  "header": "_2xHja59x-eRkfv95koY1ce",
	  "hdingTxt": "_2vmmaaBm31MpdA6XdlLb-a",
	  "body": "_1wybmROxdPMB2DSkLyTGGx",
	  "navRight": "_2fWAne55trxpJYagJCezpL",
	  "navHorizontal": "_1A7tvkxk7I_j5nNLuqefTL",
	  "active": "_1mqL1x9MCLjw6_Ok5T24oF",
	  "midContainer": "_1oKiSeTflL6v2wZC13o7oC",
	  "formField": "P8wcycRRhQUOqnf0qytj0",
	  "profilePic": "_3aRF_0HyetnxrqWGcm1aLi",
	  "fullname": "m8-V01m5JYGd00wGYRCbo",
	  "position": "aCZ3mMjMPWmB1Xr4poVi_",
	  "txtContainer": "_3ClFeWgw-L5WuuBj8HkrvF",
	  "plagiarism": "_1AZ5VzYP5cYxVevuaI0oMO",
	  "inlineEditGroup": "_2N66DG2rQQKSPETQ6mawRj",
	  "inlineEdit": "_3DdeSJlCLh_AOUeDMiLm78",
	  "inlineEditEnable": "_3Zaq8ayjsOGjyHa2auG-U5",
	  "inlineEditGroupFlex": "BXy72cn-LPpnSIiPDnhAb",
	  "labelResultFlex": "rAVOuVWP50uwFnw-Oe-bE",
	  "viewImgFtrAction": "_2_Bz03CKxQfK-0BvdyYC8s",
	  "avatarImgupload": "nUprwkNIeC7RawCr8CXF4",
	  "avatarImgView": "jkHB80N7bfBf9N_0v88Dn",
	  "imgCrop": "_1yk06rwIipstCWo7DqY-Ws",
	  "avatarPhoto": "_1IASy4Ccwsc1Hlx8k4RQe2",
	  "profileAvatarPhoto": "_1udreMpjAE8aoD8Mr1WDPX",
	  "avatar-edit": "_9jMINRNIvMojA4-7ToTgA",
	  "avatarEdit": "_1P3t9fZCx_BDEh54G9VMgl",
	  "whiteCard": "_3nWLSHJLAYRQXSGi-S7-vX",
	  "whiteTile": "KCFNekbG6kNm7QCCmxcOC",
	  "customCanvas": "w29HZnYIY9DcdSxgGf9Fb",
	  "mobHr": "_2Uz1BxUe1xQyjJolIb8Mb7",
	  "infoTxt": "_2wQRugv9iTG-hhDdVuitIF",
	  "headerActionBlock": "_51GdvsLiRoxKfOP3MoGkM",
	  "headerTxt": "_1W4z8e13TJHcZmz5Ehbd-4",
	  "headerAction": "_1zobKkXfrcR7sMxBy5FmWe",
	  "actionBtnGroup": "X1rvYjQ0-Eqdn5OzP4KYI",
	  "headingBlock": "Hq2BSnJ5sBVw7PFqVs_NC",
	  "headingTxt": "IA7VynD7jO_xLZWz7aACg",
	  "userListGroup": "_2Ph1IkZvWiWem8t4CFkNm3",
	  "userAction": "_3WwIl6WKXGAOaK4TyzOKBf",
	  "userAction1": "_3s7onQjF7EP4cHRisLd3Mg",
	  "userAction2": "_3bGxsnSHuTWpNqSqi5jTtw",
	  "searchUsersListBlock": "_3H7ves2vQHYlcaRZjP6_lz",
	  "searchUsersListGroup": "_3lhIsnjhJIPWnX1NLu1FHR",
	  "searchBox": "_79ROL_K6mHBW5o2LSPYyD",
	  "whiteSearch": "_4QtoweRYn8fpMnZENdnnf",
	  "whiteIconSearch": "_8753oABxDX3rcNGmogytj",
	  "chartBlockCust": "_3OFhY2qrOgAV6bnfH5xA89",
	  "chartBlock": "_1N5hAom0NINnkAkgO0pUTQ",
	  "whiteSearchIcon": "_26bBhlXLANk52ms5a6VjEK",
	  "whiteIconText": "_2PMNPb1XU5-9DfgCXv6Rvz",
	  "whiteSearchSubmit": "X0b5oWXuK3cmvic_4QADO",
	  "userChecked": "_2Ri43PGbT_X9Hbhtxok5Ul",
	  "modInvitation": "_3XnYK47C6zCKGiEimfJNgq",
	  "invitationInfoBlock": "_3tRIQM3GobtsNmRdSzJiL8",
	  "brdrBtm": "_3LAMx5QbZVHureehjLL4Uo",
	  "imgBox": "_1XfnRYUr9pBKPOkxUFFX9f",
	  "fadeOutBlock": "BqKSWhdDuwTWAv1DHA7BU",
	  "checkCircle": "QSuL4Yo2KoUnXG-jx-Sa8",
	  "fadeOutBlockVisible": "_13D0mm_Hk7KYLaykKBevZz",
	  "inviteBlockTxt": "_1MRUsIlHELLDg4HUqftFKz",
	  "accessCode": "_2A1xO-c_Nzf9HroP_rOatO",
	  "accessCodeBox": "Qdmv4DR-xmH2sAv32gXXC",
	  "roomLink": "_3GAUEPkkabqWlcSfevhUau",
	  "multipleValInput": "_22Sz8_7dvrmB4KCI7kdRjM",
	  "inputHidden": "_3nKfZeEqzQufGuxDQsbVY-",
	  "gropListInfoBlock": "_NvEQdPKcGY20g4fSMurk",
	  "gropListInfoHeader": "_3x4LSw28PrhROipsZFRSLx",
	  "gropListInfoBody": "_1mcNp9TzwryfTaq6sSYfJ_",
	  "gropListInfoHeadingTxt": "_30GxtoXa1jkUjd1hz6xFdo",
	  "gropListName": "_2Eg6V7gwwk_gtkw6vvfNhx",
	  "groupListActionBlock": "_3NgOcbt39p_JI7nWKOUj9v",
	  "groupUsersList": "_3BNBtwGgubE1dGc3EPNM1I",
	  "avatarBox": "_7FV9BuwcMLtNbsCjWfZJw",
	  "avatarNameBlock": "_2cP80vK5OntyL4CAozp8QS",
	  "removeGroupUser": "_3Ar4MBI4-jdPw-yj6GUSs-",
	  "locationBlock": "_3mytHS_Ee_AtswYlQfMNJg",
	  "locationContainer": "GqFlk81qWkoM8pg8rM9mT",
	  "locationHeader": "mgZJ5PYIcU3xilagy40bF",
	  "deleteLocation": "_2y7ZZz5HDKl47nPZW5uv3D",
	  "locationBody": "_9tu9wEbJADVdffughhYgF",
	  "remove": "_2qTNEmDNBxEEHjfsZx6jUU",
	  "viewUserCurser": "CZheuAXrjNPRHRcbOQzSP",
	  "studentListBlock": "_1F103jVt16fCcfwQJuE2A8",
	  "addStudentsBlock": "s_BF417lLX83dLjUOk9Qj",
	  "removeIcon": "_39I8WxiFCBLNvr-skjcvJ9",
	  "studentblock": "_1npAxnK_u_EjOeG19x_gPa",
	  "studentListGroup": "_34y4x8qUqmoZtAAds5qqkz",
	  "participantsGroup": "_1WE6rhw-vc9NjeF5qmA-Mm",
	  "tablestyle": "NFm0ne64_mxmk9G4Rk6SG",
	  "tdStyle": "_3Anaxi4FYG9zJvL03elgEQ",
	  "thStyle": "_253KYsN6UeeVvx_kTT0FTG",
	  "hidetext": "_2Qz2riUa6vlhNSOMLl6wKv",
	  "removeStyle": "XmJHLhTym-EGI-3dZGbWc",
	  "attendenceBlockControl": "_2fYKK_Pr-_FnpTp0vDy7ws",
	  "highcharts-container": "g_tYqwkdBltv3zyfc0fjB",
	  "highcharts-3d-chart": "_3bXmxuc9uwXkpYG1sI7Wy4",
	  "lineHight32": "_39uMY54CvPnF20Hpq0ebgE",
	  "lineHight31": "_2Cr1PrXQc0tqvsLRtwEVFc",
	  "removePdng": "j5wasHyxigllgK3-KBNZp",
	  "endDateWidth": "K1BBDRJALUo1UDGm0zfBJ",
	  "dateControls": "_2oEC52PpxbN1YKwQLMvvZM",
	  "dateRange": "_1nsQZIi6oLo2RRnHcRUDH0",
	  "applyBtn": "IVfAmjUj2J2xaGMBT-9QG",
	  "filterTxt": "bSDHN9CU6ghjIR5JT1vS9",
	  "gPlusBtn": "_1fkNizbuffPOMlUBeF0C8K",
	  "facebookBtn": "_33LFFuv2b50fQxMUzgYLBM",
	  "btnBothfg1": "_2S2xLvR5Z4mId-yZY1j4Ka",
	  "btnBothfg2": "YF5WdJw31ZN1ZFt_oVbps",
	  "fbConnectProfile": "a4olE1Yr7WBxvPlCBP0n8",
	  "fbDisonnectProfile": "_3GeLpMYgDKHgEN2rHWC_1g",
	  "googleDisonnect": "_2-uwB5pqA-eF07BCD1_PqM",
	  "inLine": "_3SKSHSNT9quu0AEumeGTQT",
	  "inputGrade": "_2Q0ilim6NermuOEyggbVkC",
	  "flexContainer": "_3ELNW3V19Qpndrzsv3951F",
	  "actionRightAbs": "_1uuENocETyaOc2rRiwior5",
	  "closebtn": "_2GrTt3NBt2HkOlxHF614-3",
	  "editClosebtn": "wpV9V72-_ceslWX8JrnXB",
	  "first": "_35E4iHqMVJmbMgmzKL6Tv5",
	  "headerAdustPd": "_1nESRK-sNAUHFBu6EMERMb",
	  "flexItem": "_1Etv1bivyDOzFLsR_AlRIQ",
	  "formH5": "_23XBDJVodLOklMKND6BFwz",
	  "qgHeader": "_1Ej_TSxD1VVsqaZ5rYaG5h",
	  "editableFormControl": "_3nZKmtH-W0zw2UmsaMTJxW",
	  "formControl": "_1Zgt_J9y7nqfvWRWytzMeh",
	  "blockSaveAssign": "_1sRncd5eVV30oP77Pn6fxy",
	  "blockSaveAssign2": "_2POtXxR94UQpnt45GkLCfg",
	  "btnSaveAssign": "_3sgMh3C_xwBY-m57xQa2f9",
	  "btnSaveAssign2": "jpgtw2yKEH9RfINfX88pH",
	  "blockSaveGrade": "GGQLK2P_KDJIBUiwtLjaw",
	  "btnCancelGrade": "W4YNgM2XN5hkyETaGhUR2",
	  "btnSaveGrade": "_2eyI7soEd7DxGFD3-4GQku",
	  "btnAddGrade": "_1K2WOpGhk_Q4IoS2ZUf8hf",
	  "blockAddGrade": "_1O-zGuXiXgnw-U1l38HqxQ",
	  "btnAllCancel": "_23SiDDtLT1pT26oIsV4Tfd",
	  "btnApplyAll": "_17I5QbiC31ZqoS-j8ioPIc",
	  "inputGroupManage": "keJXfy3O3ZSv-n0JMFAfx",
	  "diconnectFbIcon": "_2Us20v8WA8mrpggJ6QnkKk",
	  "gIcong": "_104bXiLSEBaJt6qZ1uVqlO",
	  "gTextg": "_1SEMPATJm2_wne7kQlcG10",
	  "gmailIconConnect": "_3YCjXf4NX2ZJi8O1tUA7Ub",
	  "errorSaveAssign": "_1Cs3UFa1oi8pL2tQ-yOM-m",
	  "mainSaveAssign": "_2fP5quvRifvwxDNbx7L6X9",
	  "rowBottom": "_1kntlbOJwAJUcePEvL_kF8",
	  "seprator": "_2UGm2z7pTnp444hmFIFOIp",
	  "checkAssignQues": "_2iZMx3rWcQHdK7gzZAk6W1",
	  "inputAllCap": "_3b5YN89TYavUWP0IUCpP4J",
	  "localHeadMain": "_3RG8HTuYYDkFftvW6DqXY0",
	  "localHeadBlock": "_30XFANlOzaJYlY3_t5ho8U",
	  "nameheadProfile": "pt9XSChA3KBzQoKyGuVhU",
	  "allLabelInApp": "GpVwJxC7AGu9zLNGFoW87",
	  "proPicEdit": "_2TyVz7TK4Od13iZrubrZla",
	  "popHeadingAll": "_26LFoD0SOoue-56tKApy1J",
	  "textCapAll": "dmP3hNbZiWb10oxof-KKb",
	  "stuReportsOne": "_3AhyOrylvMZicPK7bHodXL",
	  "stuReportsTwo": "_3T0910-J2oReRdy8ZxNZiB",
	  "topicNameReport": "_1XpYjQcqHsjOXXvgjsWdX5",
	  "emailTransCap": "_1jX1RtADJ5IvrJd3Wtpyh_",
	  "txtDetailContent": "_1j9Ns7mzyM42Nmll1uh1He",
	  "addStudPop1": "_1QsP-l51F-3uG7QXomAW0P",
	  "addStudPop2": "pJUMNDAuP9bGHel-6ESf",
	  "addStudInput": "_1d7y3JxPS4_K3b3aRquCU2",
	  "addStudText": "bfDwzSKIRHVbJQpazT_Il",
	  "changePassInner": "_1jDrP6USHJgwHuHx84G6vW",
	  "fdInfoBlock": "_2gANItlTdO-wHoINbI1-T",
	  "fdInfo": "jkgczk2IOaooUA2sdYQcY",
	  "fdName": "_1GOg26hVpb9pUXFN9I9y75",
	  "fdListBlock": "Dyl11NUfA-U4x7uR32_nE",
	  "fdQues": "_2YaCGTu2m7P2XdqDPQiRwz",
	  "fdAns": "_25xB1C18_oF2MVuf5cn3zq",
	  "errorJoinConf": "_2FeZW5vDq4l2uCwYqTPhHN",
	  "qleditor": "_17N2ULf7_DBC-wvog56baS",
	  "txtCenter": "_--WLGzdyVj5fD3vNr-Zkv",
	  "addpdng": "_3c2v0Duo7UJRMD8C9viMiX",
	  "progress-bar": "A2ftBZ69PzksWTqo3GY0k",
	  "formInputBox": "_2iVSgkRQ2H-sx7DVceswIC",
	  "mainSpinBlock": "_3CZ3lYofgnCvue7BeOTlIz",
	  "innerSpinBlock": "_3m-KZNJLa-KBy4_GVdiO01",
	  "loginContainerBoth": "_2cFyrrDIIB0AnjCLMjCEcB"
	};
	
	var _Admin2 = _interopRequireDefault(_Admin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// Import Style
	
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx('div', {}, void 0, ' -- ');
	
	var _ref2 = _jsx('div', {}, void 0, ' -- ');
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'checkin_time'
	});
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'checkout_time'
	});
	
	var ListAttendance = function (_React$Component) {
	  _inherits(ListAttendance, _React$Component);
	
	  function ListAttendance(props) {
	    _classCallCheck(this, ListAttendance);
	
	    var _this = _possibleConstructorReturn(this, (ListAttendance.__proto__ || Object.getPrototypeOf(ListAttendance)).call(this, props));
	
	    _this.state = { loading: true };
	    _this.currentPage = 1;
	    _this.itemsPerPage = 5;
	    return _this;
	  }
	
	  _createClass(ListAttendance, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setdata(this.props.loggedInData);
	    }
	  }, {
	    key: 'setdata',
	    value: function setdata(result) {
	      if (result && result.data && result.data._id) {
	        this.props.dispatch((0, _IntlActions.loginLanguage)(result.data, this.props.intlData.setlocale));
	
	        this.getData({
	          currentPage: this.currentPage,
	          totalItems: 0,
	          itemsPerPage: this.itemsPerPage
	        });
	      }
	    }
	  }, {
	    key: 'getData',
	    value: function getData(pageParam) {
	      var _this2 = this;
	
	      if (this.props.listIds && this.props.listIds != undefined) {
	        pageParam["listIds"] = this.props.listIds;
	
	        // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server    
	        if (_.isEmpty(this.props.reportsData.attendanceList)) {
	          this.setState({ loading: true });
	        } else {
	          this.setState({ loading: false });
	        }
	        this.props.dispatch((0, _ReportsActions.getStudentAttendanceList)(pageParam, pageParam.currentPage)).then(function (res) {
	          return _this2.pageData(res);
	        });
	      }
	    }
	  }, {
	    key: 'pageData',
	    value: function pageData(response) {
	      if (this.state.loading) {
	        this.setState({ loading: false });
	      }
	      if (response.status == false) {
	        this.refs.room_container.error(response.error + ' ', '');
	      }
	    }
	  }, {
	    key: 'checkInTime',
	    value: function checkInTime(row) {
	      var day = void 0,
	          date = void 0,
	          time = void 0;
	
	      if (row.dateAdded != null) {
	        this.day = (0, _moment2.default)(row.dateAdded).format('ddd');
	        this.date = (0, _moment2.default)(row.dateAdded).format('DD-MM-YYYY');
	        this.time = (0, _moment2.default)(row.dateAdded).format('h:mm:ss a');
	        return _jsx('div', {}, void 0, this.day, ', ', this.date, ', ', this.time);
	      } else {
	        return _ref;
	      }
	    }
	  }, {
	    key: 'checkOutTime',
	    value: function checkOutTime(row) {
	      var day = void 0,
	          date = void 0,
	          time = void 0;
	
	      if (row.value.checkOutTime != null && row.value.checkOutTime != "") {
	        this.day = (0, _moment2.default)(row.value.checkOutTime).format('ddd');
	        this.date = (0, _moment2.default)(row.value.checkOutTime).format('DD-MM-YYYY');
	        this.time = (0, _moment2.default)(row.value.checkOutTime).format('h:mm:ss a');
	        return _jsx('div', {}, void 0, this.day, ', ', this.date, ', ', this.time);
	      } else {
	        return _ref2;
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.props.dispatch((0, _ReportsActions.clearAttendanceList)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var objDisp = [{ title: _ref3, type: "function", callback: this.checkInTime }, { title: _ref4, type: "function", callback: this.checkOutTime }];
	
	      return _jsx('div', {}, void 0, _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'room_container',
	        className: 'toast-top-right'
	      }), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx('button', {
	        id: 'backToReports',
	        className: _Admin2.default.btnApplyAll,
	        onClick: this.props.backToReports,
	        style: { marginLeft: "16px" }
	      }, void 0, this.props.intlData.messages.back_to_reports))), _jsx(_DataTable2.default, {
	        data: this.props.reportsData.attendanceList,
	        count: this.props.reportsData.visitCount,
	        currentPage: this.props.reportsData.currentvisitPage,
	        submenu: null,
	        topmenu: null,
	        itemsPerPage: this.itemsPerPage,
	        newDataCallback: this.getData.bind(this),
	        dispField: objDisp,
	        pageTitle: null,
	        listDescreption: this.props.intl.messages.course_attendance,
	        loading: this.state.loading
	      }));
	    }
	  }]);
	
	  return ListAttendance;
	}(_react2.default.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    intl: state.intl,
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    reportsData: (0, _ReportsReducer.reportsData)(state),
	    intlData: (0, _IntlReducer.intlData)(state)
	  };
	}
	
	ListAttendance.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(ListAttendance);

/***/ },

/***/ 455:
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
	
	var _reactIntl = __webpack_require__(11);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _ReportsActions = __webpack_require__(150);
	
	var _ReportsReducer = __webpack_require__(151);
	
	var _IntlActions = __webpack_require__(37);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _IntlReducer = __webpack_require__(141);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _lib = __webpack_require__(45);
	
	var _DataTable = __webpack_require__(377);
	
	var _DataTable2 = _interopRequireDefault(_DataTable);
	
	var _Admin = {
	  "form-control": "_3f5Ek_BxZWp4TgAvO9iMgx",
	  "progressLabel": "_3-0689LiR7tz_vbtEfR1IJ",
	  "progress": "_32kzRKjl47M7AcFAivyyho",
	  "progressBar": "_2tVD6KALTWwOtUWFBlQDYS",
	  "progressBox": "_2Qr6h8u0j6wWBgfM9ImZaH",
	  "backButton": "_1mSyVAqBsfEZTzTQCfa3-K",
	  "containerRight": "_3tnvGMV_GO0AC00W0gw2hh",
	  "googleContainer": "_1G8DyX--1Xskim3uSHbxil",
	  "googleContainer1": "_1ZjsrGjPe95kiwJYTjPkf3",
	  "googleContainer2": "_1Mz0pDpSBEwdM2zIV6C6fv",
	  "header": "_2xHja59x-eRkfv95koY1ce",
	  "hdingTxt": "_2vmmaaBm31MpdA6XdlLb-a",
	  "body": "_1wybmROxdPMB2DSkLyTGGx",
	  "navRight": "_2fWAne55trxpJYagJCezpL",
	  "navHorizontal": "_1A7tvkxk7I_j5nNLuqefTL",
	  "active": "_1mqL1x9MCLjw6_Ok5T24oF",
	  "midContainer": "_1oKiSeTflL6v2wZC13o7oC",
	  "formField": "P8wcycRRhQUOqnf0qytj0",
	  "profilePic": "_3aRF_0HyetnxrqWGcm1aLi",
	  "fullname": "m8-V01m5JYGd00wGYRCbo",
	  "position": "aCZ3mMjMPWmB1Xr4poVi_",
	  "txtContainer": "_3ClFeWgw-L5WuuBj8HkrvF",
	  "plagiarism": "_1AZ5VzYP5cYxVevuaI0oMO",
	  "inlineEditGroup": "_2N66DG2rQQKSPETQ6mawRj",
	  "inlineEdit": "_3DdeSJlCLh_AOUeDMiLm78",
	  "inlineEditEnable": "_3Zaq8ayjsOGjyHa2auG-U5",
	  "inlineEditGroupFlex": "BXy72cn-LPpnSIiPDnhAb",
	  "labelResultFlex": "rAVOuVWP50uwFnw-Oe-bE",
	  "viewImgFtrAction": "_2_Bz03CKxQfK-0BvdyYC8s",
	  "avatarImgupload": "nUprwkNIeC7RawCr8CXF4",
	  "avatarImgView": "jkHB80N7bfBf9N_0v88Dn",
	  "imgCrop": "_1yk06rwIipstCWo7DqY-Ws",
	  "avatarPhoto": "_1IASy4Ccwsc1Hlx8k4RQe2",
	  "profileAvatarPhoto": "_1udreMpjAE8aoD8Mr1WDPX",
	  "avatar-edit": "_9jMINRNIvMojA4-7ToTgA",
	  "avatarEdit": "_1P3t9fZCx_BDEh54G9VMgl",
	  "whiteCard": "_3nWLSHJLAYRQXSGi-S7-vX",
	  "whiteTile": "KCFNekbG6kNm7QCCmxcOC",
	  "customCanvas": "w29HZnYIY9DcdSxgGf9Fb",
	  "mobHr": "_2Uz1BxUe1xQyjJolIb8Mb7",
	  "infoTxt": "_2wQRugv9iTG-hhDdVuitIF",
	  "headerActionBlock": "_51GdvsLiRoxKfOP3MoGkM",
	  "headerTxt": "_1W4z8e13TJHcZmz5Ehbd-4",
	  "headerAction": "_1zobKkXfrcR7sMxBy5FmWe",
	  "actionBtnGroup": "X1rvYjQ0-Eqdn5OzP4KYI",
	  "headingBlock": "Hq2BSnJ5sBVw7PFqVs_NC",
	  "headingTxt": "IA7VynD7jO_xLZWz7aACg",
	  "userListGroup": "_2Ph1IkZvWiWem8t4CFkNm3",
	  "userAction": "_3WwIl6WKXGAOaK4TyzOKBf",
	  "userAction1": "_3s7onQjF7EP4cHRisLd3Mg",
	  "userAction2": "_3bGxsnSHuTWpNqSqi5jTtw",
	  "searchUsersListBlock": "_3H7ves2vQHYlcaRZjP6_lz",
	  "searchUsersListGroup": "_3lhIsnjhJIPWnX1NLu1FHR",
	  "searchBox": "_79ROL_K6mHBW5o2LSPYyD",
	  "whiteSearch": "_4QtoweRYn8fpMnZENdnnf",
	  "whiteIconSearch": "_8753oABxDX3rcNGmogytj",
	  "chartBlockCust": "_3OFhY2qrOgAV6bnfH5xA89",
	  "chartBlock": "_1N5hAom0NINnkAkgO0pUTQ",
	  "whiteSearchIcon": "_26bBhlXLANk52ms5a6VjEK",
	  "whiteIconText": "_2PMNPb1XU5-9DfgCXv6Rvz",
	  "whiteSearchSubmit": "X0b5oWXuK3cmvic_4QADO",
	  "userChecked": "_2Ri43PGbT_X9Hbhtxok5Ul",
	  "modInvitation": "_3XnYK47C6zCKGiEimfJNgq",
	  "invitationInfoBlock": "_3tRIQM3GobtsNmRdSzJiL8",
	  "brdrBtm": "_3LAMx5QbZVHureehjLL4Uo",
	  "imgBox": "_1XfnRYUr9pBKPOkxUFFX9f",
	  "fadeOutBlock": "BqKSWhdDuwTWAv1DHA7BU",
	  "checkCircle": "QSuL4Yo2KoUnXG-jx-Sa8",
	  "fadeOutBlockVisible": "_13D0mm_Hk7KYLaykKBevZz",
	  "inviteBlockTxt": "_1MRUsIlHELLDg4HUqftFKz",
	  "accessCode": "_2A1xO-c_Nzf9HroP_rOatO",
	  "accessCodeBox": "Qdmv4DR-xmH2sAv32gXXC",
	  "roomLink": "_3GAUEPkkabqWlcSfevhUau",
	  "multipleValInput": "_22Sz8_7dvrmB4KCI7kdRjM",
	  "inputHidden": "_3nKfZeEqzQufGuxDQsbVY-",
	  "gropListInfoBlock": "_NvEQdPKcGY20g4fSMurk",
	  "gropListInfoHeader": "_3x4LSw28PrhROipsZFRSLx",
	  "gropListInfoBody": "_1mcNp9TzwryfTaq6sSYfJ_",
	  "gropListInfoHeadingTxt": "_30GxtoXa1jkUjd1hz6xFdo",
	  "gropListName": "_2Eg6V7gwwk_gtkw6vvfNhx",
	  "groupListActionBlock": "_3NgOcbt39p_JI7nWKOUj9v",
	  "groupUsersList": "_3BNBtwGgubE1dGc3EPNM1I",
	  "avatarBox": "_7FV9BuwcMLtNbsCjWfZJw",
	  "avatarNameBlock": "_2cP80vK5OntyL4CAozp8QS",
	  "removeGroupUser": "_3Ar4MBI4-jdPw-yj6GUSs-",
	  "locationBlock": "_3mytHS_Ee_AtswYlQfMNJg",
	  "locationContainer": "GqFlk81qWkoM8pg8rM9mT",
	  "locationHeader": "mgZJ5PYIcU3xilagy40bF",
	  "deleteLocation": "_2y7ZZz5HDKl47nPZW5uv3D",
	  "locationBody": "_9tu9wEbJADVdffughhYgF",
	  "remove": "_2qTNEmDNBxEEHjfsZx6jUU",
	  "viewUserCurser": "CZheuAXrjNPRHRcbOQzSP",
	  "studentListBlock": "_1F103jVt16fCcfwQJuE2A8",
	  "addStudentsBlock": "s_BF417lLX83dLjUOk9Qj",
	  "removeIcon": "_39I8WxiFCBLNvr-skjcvJ9",
	  "studentblock": "_1npAxnK_u_EjOeG19x_gPa",
	  "studentListGroup": "_34y4x8qUqmoZtAAds5qqkz",
	  "participantsGroup": "_1WE6rhw-vc9NjeF5qmA-Mm",
	  "tablestyle": "NFm0ne64_mxmk9G4Rk6SG",
	  "tdStyle": "_3Anaxi4FYG9zJvL03elgEQ",
	  "thStyle": "_253KYsN6UeeVvx_kTT0FTG",
	  "hidetext": "_2Qz2riUa6vlhNSOMLl6wKv",
	  "removeStyle": "XmJHLhTym-EGI-3dZGbWc",
	  "attendenceBlockControl": "_2fYKK_Pr-_FnpTp0vDy7ws",
	  "highcharts-container": "g_tYqwkdBltv3zyfc0fjB",
	  "highcharts-3d-chart": "_3bXmxuc9uwXkpYG1sI7Wy4",
	  "lineHight32": "_39uMY54CvPnF20Hpq0ebgE",
	  "lineHight31": "_2Cr1PrXQc0tqvsLRtwEVFc",
	  "removePdng": "j5wasHyxigllgK3-KBNZp",
	  "endDateWidth": "K1BBDRJALUo1UDGm0zfBJ",
	  "dateControls": "_2oEC52PpxbN1YKwQLMvvZM",
	  "dateRange": "_1nsQZIi6oLo2RRnHcRUDH0",
	  "applyBtn": "IVfAmjUj2J2xaGMBT-9QG",
	  "filterTxt": "bSDHN9CU6ghjIR5JT1vS9",
	  "gPlusBtn": "_1fkNizbuffPOMlUBeF0C8K",
	  "facebookBtn": "_33LFFuv2b50fQxMUzgYLBM",
	  "btnBothfg1": "_2S2xLvR5Z4mId-yZY1j4Ka",
	  "btnBothfg2": "YF5WdJw31ZN1ZFt_oVbps",
	  "fbConnectProfile": "a4olE1Yr7WBxvPlCBP0n8",
	  "fbDisonnectProfile": "_3GeLpMYgDKHgEN2rHWC_1g",
	  "googleDisonnect": "_2-uwB5pqA-eF07BCD1_PqM",
	  "inLine": "_3SKSHSNT9quu0AEumeGTQT",
	  "inputGrade": "_2Q0ilim6NermuOEyggbVkC",
	  "flexContainer": "_3ELNW3V19Qpndrzsv3951F",
	  "actionRightAbs": "_1uuENocETyaOc2rRiwior5",
	  "closebtn": "_2GrTt3NBt2HkOlxHF614-3",
	  "editClosebtn": "wpV9V72-_ceslWX8JrnXB",
	  "first": "_35E4iHqMVJmbMgmzKL6Tv5",
	  "headerAdustPd": "_1nESRK-sNAUHFBu6EMERMb",
	  "flexItem": "_1Etv1bivyDOzFLsR_AlRIQ",
	  "formH5": "_23XBDJVodLOklMKND6BFwz",
	  "qgHeader": "_1Ej_TSxD1VVsqaZ5rYaG5h",
	  "editableFormControl": "_3nZKmtH-W0zw2UmsaMTJxW",
	  "formControl": "_1Zgt_J9y7nqfvWRWytzMeh",
	  "blockSaveAssign": "_1sRncd5eVV30oP77Pn6fxy",
	  "blockSaveAssign2": "_2POtXxR94UQpnt45GkLCfg",
	  "btnSaveAssign": "_3sgMh3C_xwBY-m57xQa2f9",
	  "btnSaveAssign2": "jpgtw2yKEH9RfINfX88pH",
	  "blockSaveGrade": "GGQLK2P_KDJIBUiwtLjaw",
	  "btnCancelGrade": "W4YNgM2XN5hkyETaGhUR2",
	  "btnSaveGrade": "_2eyI7soEd7DxGFD3-4GQku",
	  "btnAddGrade": "_1K2WOpGhk_Q4IoS2ZUf8hf",
	  "blockAddGrade": "_1O-zGuXiXgnw-U1l38HqxQ",
	  "btnAllCancel": "_23SiDDtLT1pT26oIsV4Tfd",
	  "btnApplyAll": "_17I5QbiC31ZqoS-j8ioPIc",
	  "inputGroupManage": "keJXfy3O3ZSv-n0JMFAfx",
	  "diconnectFbIcon": "_2Us20v8WA8mrpggJ6QnkKk",
	  "gIcong": "_104bXiLSEBaJt6qZ1uVqlO",
	  "gTextg": "_1SEMPATJm2_wne7kQlcG10",
	  "gmailIconConnect": "_3YCjXf4NX2ZJi8O1tUA7Ub",
	  "errorSaveAssign": "_1Cs3UFa1oi8pL2tQ-yOM-m",
	  "mainSaveAssign": "_2fP5quvRifvwxDNbx7L6X9",
	  "rowBottom": "_1kntlbOJwAJUcePEvL_kF8",
	  "seprator": "_2UGm2z7pTnp444hmFIFOIp",
	  "checkAssignQues": "_2iZMx3rWcQHdK7gzZAk6W1",
	  "inputAllCap": "_3b5YN89TYavUWP0IUCpP4J",
	  "localHeadMain": "_3RG8HTuYYDkFftvW6DqXY0",
	  "localHeadBlock": "_30XFANlOzaJYlY3_t5ho8U",
	  "nameheadProfile": "pt9XSChA3KBzQoKyGuVhU",
	  "allLabelInApp": "GpVwJxC7AGu9zLNGFoW87",
	  "proPicEdit": "_2TyVz7TK4Od13iZrubrZla",
	  "popHeadingAll": "_26LFoD0SOoue-56tKApy1J",
	  "textCapAll": "dmP3hNbZiWb10oxof-KKb",
	  "stuReportsOne": "_3AhyOrylvMZicPK7bHodXL",
	  "stuReportsTwo": "_3T0910-J2oReRdy8ZxNZiB",
	  "topicNameReport": "_1XpYjQcqHsjOXXvgjsWdX5",
	  "emailTransCap": "_1jX1RtADJ5IvrJd3Wtpyh_",
	  "txtDetailContent": "_1j9Ns7mzyM42Nmll1uh1He",
	  "addStudPop1": "_1QsP-l51F-3uG7QXomAW0P",
	  "addStudPop2": "pJUMNDAuP9bGHel-6ESf",
	  "addStudInput": "_1d7y3JxPS4_K3b3aRquCU2",
	  "addStudText": "bfDwzSKIRHVbJQpazT_Il",
	  "changePassInner": "_1jDrP6USHJgwHuHx84G6vW",
	  "fdInfoBlock": "_2gANItlTdO-wHoINbI1-T",
	  "fdInfo": "jkgczk2IOaooUA2sdYQcY",
	  "fdName": "_1GOg26hVpb9pUXFN9I9y75",
	  "fdListBlock": "Dyl11NUfA-U4x7uR32_nE",
	  "fdQues": "_2YaCGTu2m7P2XdqDPQiRwz",
	  "fdAns": "_25xB1C18_oF2MVuf5cn3zq",
	  "errorJoinConf": "_2FeZW5vDq4l2uCwYqTPhHN",
	  "qleditor": "_17N2ULf7_DBC-wvog56baS",
	  "txtCenter": "_--WLGzdyVj5fD3vNr-Zkv",
	  "addpdng": "_3c2v0Duo7UJRMD8C9viMiX",
	  "progress-bar": "A2ftBZ69PzksWTqo3GY0k",
	  "formInputBox": "_2iVSgkRQ2H-sx7DVceswIC",
	  "mainSpinBlock": "_3CZ3lYofgnCvue7BeOTlIz",
	  "innerSpinBlock": "_3m-KZNJLa-KBy4_GVdiO01",
	  "loginContainerBoth": "_2cFyrrDIIB0AnjCLMjCEcB"
	};
	
	var _Admin2 = _interopRequireDefault(_Admin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// Import Style
	
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx('div', {}, void 0, ' -- ');
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'start_time'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'end_time'
	});
	
	var ListTotalSchedules = function (_React$Component) {
	  _inherits(ListTotalSchedules, _React$Component);
	
	  function ListTotalSchedules(props) {
	    _classCallCheck(this, ListTotalSchedules);
	
	    var _this = _possibleConstructorReturn(this, (ListTotalSchedules.__proto__ || Object.getPrototypeOf(ListTotalSchedules)).call(this, props));
	
	    _this.currentPage = 1;
	    _this.itemsPerPage = 5;
	    return _this;
	  }
	
	  _createClass(ListTotalSchedules, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setdata(this.props.loggedInData);
	    }
	  }, {
	    key: 'setdata',
	    value: function setdata(result) {
	      if (result && result.data && result.data._id) {
	        this.props.dispatch((0, _IntlActions.loginLanguage)(result.data, this.props.intlData.setlocale));
	        var obj = {
	          roomId: this.props.courseId
	        };
	        this.getData({
	          currentPage: this.currentPage,
	          totalItems: 0,
	          itemsPerPage: this.itemsPerPage
	        });
	      }
	    }
	  }, {
	    key: 'getData',
	    value: function getData(pageParam) {
	      var _this2 = this;
	
	      pageParam["listIds"] = this.props.listIds;
	
	      this.props.dispatch((0, _ReportsActions.getTotalSchedulesList)(pageParam, pageParam.currentPage)).then(function (res) {
	        return _this2.pageData(res);
	      });
	    }
	  }, {
	    key: 'pageData',
	    value: function pageData(response) {
	      if (response.status == false) {
	        this.refs.room_container.error(response.error + ' ', '');
	      }
	    }
	  }, {
	    key: 'startTime',
	    value: function startTime(row) {
	      var day = void 0,
	          date = void 0,
	          time = void 0;
	
	      if (row._id.startTime != null) {
	        this.day = (0, _moment2.default)(row._id.startTime).format('ddd');
	        this.date = (0, _moment2.default)(row._id.startTime).format('DD-MM-YYYY');
	        this.time = (0, _moment2.default)(row._id.startTime).format('h:mm:ss a');
	
	        return _jsx('div', {}, void 0, this.day, ', ', this.date, ', ', this.time);
	      } else {
	        return _ref;
	      }
	    }
	  }, {
	    key: 'endTime',
	    value: function endTime(row) {
	      var day = void 0,
	          date = void 0,
	          time = void 0;
	
	      if (row._id.endTime != null) {
	        this.day = (0, _moment2.default)(row._id.endTime).format('ddd');
	        this.date = (0, _moment2.default)(row._id.endTime).format('DD-MM-YYYY');
	        this.time = (0, _moment2.default)(row._id.endTime).format('h:mm:ss a');
	
	        return _jsx('div', {}, void 0, this.day, ', ', this.date, ', ', this.time);
	      } else {
	        return _jsx('div', {}, void 0, this.day, ', ', this.date, ', ', this.time);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.props.dispatch((0, _ReportsActions.clearTotalSchedulesList)());
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var objDisp = [{ title: _ref2, type: "function", callback: this.startTime }, { title: _ref3, type: "function", callback: this.endTime }];
	
	      return _jsx('div', {}, void 0, _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'room_container',
	        className: 'toast-top-right'
	      }), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx('button', {
	        id: 'backToReports',
	        className: _Admin2.default.btnApplyAll,
	        onClick: this.props.backToReport,
	        style: { marginLeft: "16px" }
	      }, void 0, this.props.intlData.messages.back_to_reports))), _jsx(_DataTable2.default, {
	        data: this.props.reportsData.schedulesList,
	        count: this.props.reportsData.schedulesCount,
	        currentPage: this.props.reportsData.currentSchedulePage,
	        submenu: null,
	        topmenu: null,
	        itemsPerPage: this.itemsPerPage,
	        newDataCallback: this.getData.bind(this),
	        dispField: objDisp,
	        pageTitle: null,
	        filter: null,
	        listDescreption: this.props.intl.messages.schedules
	      }));
	    }
	  }]);
	
	  return ListTotalSchedules;
	}(_react2.default.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    intl: state.intl,
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    reportsData: (0, _ReportsReducer.reportsData)(state),
	    intlData: (0, _IntlReducer.intlData)(state)
	  };
	}
	
	ListTotalSchedules.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(ListTotalSchedules);

/***/ }

};;