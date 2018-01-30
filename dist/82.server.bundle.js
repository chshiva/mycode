exports.ids = [82];
exports.modules = {

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.hasWhiteSpace = hasWhiteSpace;
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactIntl = __webpack_require__(11);
	
	var _AuthController = __webpack_require__(9);
	
	var _AuthController2 = _interopRequireDefault(_AuthController);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _ProfileActions = __webpack_require__(145);
	
	var _SubMenu = __webpack_require__(354);
	
	var _SubMenu2 = _interopRequireDefault(_SubMenu);
	
	var _TopMenu = __webpack_require__(355);
	
	var _TopMenu2 = _interopRequireDefault(_TopMenu);
	
	var _lib = __webpack_require__(45);
	
	var _Validator = __webpack_require__(356);
	
	var _Validator2 = _interopRequireDefault(_Validator);
	
	var _ProfileEditMenu = __webpack_require__(382);
	
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
	
	var _IntlActions = __webpack_require__(37);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _IntlReducer = __webpack_require__(141);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	// Import Style
	
	// import { Expressions } from '../../../../lib/expressions';
	
	//Changes made by prateek for bug#3000
	function hasWhiteSpace(s) {
	  return (/\s/g.test(s)
	  );
	}
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Please_enter_Current_Password'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Please_enter_New_Password'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Please_enter_Confirm_password'
	});
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'New_Password_and_Confirm_password_should_be_same'
	});
	
	var _ref5 = _jsx('h3', {
	  className: ''
	}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'my_account'
	}));
	
	var _ref6 = _jsx('ul', {}, void 0, _jsx('li', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'you_are_in_my_profile_panel'
	})));
	
	var _ref7 = _jsx(_TopMenu2.default, {
	  data: _ProfileEditMenu.profileEditMainMenu
	});
	
	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'change_password'
	});
	
	var _ref9 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'current_password'
	});
	
	var _ref10 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'new_password'
	});
	
	var _ref11 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'retype_new_password'
	});
	
	var ChangePassword = function (_Component) {
	  _inherits(ChangePassword, _Component);
	
	  function ChangePassword(props) {
	    _classCallCheck(this, ChangePassword);
	
	    var _this = _possibleConstructorReturn(this, (ChangePassword.__proto__ || Object.getPrototypeOf(ChangePassword)).call(this, props));
	
	    _this.save = function () {
	      var oldPassword = _this.state.oldPassword;
	      var newPassword = _this.state.newPassword;
	      var reNewPassword = _this.state.reNewPassword;
	      var errors = {};
	      if (!oldPassword || oldPassword == '') errors['oldPassword'] = _ref;
	      if (!newPassword || newPassword == '') errors['newPassword'] = _ref2;
	      if (!reNewPassword || reNewPassword == '') errors['reNewPassword'] = _ref3;else if (newPassword != reNewPassword) errors['reNewPassword'] = _ref4;
	      if (!_.isEmpty(errors)) {
	        _this.setState({
	          validationError: errors
	        });
	      } else {
	        _this.setState({
	          validationError: {}
	        });
	        var obj = {
	          oldPassword: _this.state.oldPassword,
	          newPassword: _this.state.newPassword,
	          reNewPassword: _this.state.reNewPassword,
	          uid: _this.props.loggedInData.data._id,
	          token: _this.props.loggedInData.token
	        };
	        _this.props.dispatch((0, _ProfileActions.ChangeUserPassword)(obj)).then(function (res) {
	          return _this.setdata(res);
	        });
	      }
	    };
	
	    _this.handleInput = function (label, e) {
	      var val = e.target.value;
	      if (!hasWhiteSpace(val)) {
	        _this.setState(_defineProperty({}, label, val));
	      } else {
	        var errorObj = _this.state.validationError;
	        errorObj[label] = "Password can't have spaces";
	        _this.setState({ validationError: errorObj });
	        // this.refs.container.error("Password can't have spaces");
	      }
	    };
	
	    _this.submenu = _ProfileEditMenu.profileViewSubMenu;
	    _this.mainmenu = _ProfileEditMenu.profileEditMainMenu;
	    _this.mainmenu.menus[1].action = _this.save.bind(_this);
	    _this.state = {
	      validationError: {},
	      oldPassword: '',
	      newPassword: '',
	      reNewPassword: ''
	    };
	    return _this;
	  }
	
	  _createClass(ChangePassword, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.setState({
	        validationError: {}
	      });
	      if (this.props.loggedInData && this.props.loggedInData.data) this.props.dispatch((0, _IntlActions.loginLanguage)(this.props.loggedInData.data, this.props.intlData.setlocale));
	    }
	  }, {
	    key: 'setdata',
	    value: function setdata(res) {
	      if (res.status) {
	        this.setState({ oldPassword: '', newPassword: '', reNewPassword: '' });
	        this.refs.container.success(res.message + ' ', '');
	      } else {
	        if (res.error && res.error.length > 0) {
	          var errors = this.state.validationError;
	          errors['reNewPassword'] = res.error;
	          this.setState({ validationError: errors });
	          // this.refs.container.error(`${res.error} `, ``);
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      //let clsContainerRight = `${styles.containerRight} pull-right`;
	      var cls_container = _component2.default.iContainer + ' ' + _component2.default.oContainer + ' pull-right';
	      var cls_topmenu = _component2.default.iTopMenu + ' ' + _component2.default.oTopMenu;
	      var cls_isubmenu = _component2.default.iSubMenu + ' ' + _component2.default.oSubMenu;
	      var submenu = _Validator2.default.activeSubMenu(_ProfileEditMenu.profileViewSubMenu, "lnkChangePassword");
	      var clsForm = _component2.default.iForm + ' ' + _component2.default.oForm;
	      var cls_localHeadBlock = ' ' + _Admin2.default.infoTxt + ' ' + _Admin2.default.localHeadBlock + ' ';
	      var cls = _component2.default.iFormGroup + ' ' + _component2.default.oFormGroup + ' ' + _Admin2.default.changePassInner + ' ';
	      var cls_fg = _component2.default.iSubFormGroup + ' ' + _component2.default.oSubFormGroup;
	      var clslabel = _component2.default.iLabel + ' ' + _component2.default.oLabel;
	      var clstext = _component2.default.iElement + ' ' + _component2.default.oElement;
	      var clsformfield = _component2.default.iFormField + ' ' + _component2.default.oFormField;
	      /*if(this.props.data.error && this.props.data.error != ""){
	        clstext = `${styles.iElement} ${styles.oElement} ${styles.errorclass}`;
	      }*/
	      return _jsx('div', {
	        className: cls_container
	      }, void 0, _jsx('div', {
	        className: cls_topmenu
	      }, void 0, _ref5, _jsx('div', {
	        className: _component2.default.dynamicBreadCrumb
	      }, void 0, _ref6), _ref7), _jsx('div', {
	        className: cls_isubmenu
	      }, void 0, _jsx(_SubMenu2.default, {
	        data: submenu
	      })), _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'container',
	        className: 'toast-top-right'
	      }), _jsx('div', {
	        className: clsForm
	      }, void 0, _jsx('div', {
	        className: _component2.default.whiteCard
	      }, void 0, _jsx(_reactBootstrap.Grid, {
	        fluid: true
	      }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx('div', {
	        className: cls_localHeadBlock
	      }, void 0, _jsx('h2', {
	        className: _Admin2.default.localHeadMain
	      }, void 0, _ref8)))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx('form', {
	        id: 'changePassword'
	      }, void 0, _jsx('div', {
	        className: 'col-md-6'
	      }, void 0, _jsx('div', {
	        className: cls
	      }, void 0, _jsx('div', {
	        className: cls_fg
	      }, void 0, _jsx('div', {
	        className: clsformfield
	      }, void 0, _jsx('formfield', {}, void 0, _jsx('label', {
	        className: clslabel,
	        htmlFor: 'current_pwd'
	      }, void 0, _ref9, _jsx('span', {
	        className: _component2.default.mandatory
	      }, void 0, '*'), ': '), _react2.default.createElement('input', { type: 'password', id: 'current_pwd', ref: 'old_pwd', className: clstext, placeholder: this.props.intlData.messages.current_password, maxLength: 30, autoFocus: 'true', value: this.state.oldPassword, onChange: this.handleInput.bind(this, 'oldPassword') }), _jsx('label', {
	        className: _component2.default.errorPre
	      }, void 0, this.state.validationError && this.state.validationError.oldPassword ? this.state.validationError.oldPassword : ''))), _jsx('div', {
	        className: clsformfield
	      }, void 0, _jsx('formfield', {}, void 0, _jsx('label', {
	        className: clslabel,
	        htmlFor: 'new_pwd'
	      }, void 0, _ref10, _jsx('span', {
	        className: _component2.default.mandatory
	      }, void 0, '*'), ': '), _react2.default.createElement('input', { type: 'password', id: 'new_pwd', ref: 'new_pwd', className: clstext, placeholder: this.props.intlData.messages.new_password, maxLength: 30, value: this.state.newPassword, onChange: this.handleInput.bind(this, 'newPassword') }), _jsx('label', {
	        className: _component2.default.errorPre
	      }, void 0, this.state.validationError && this.state.validationError.newPassword ? this.state.validationError.newPassword : ''))), _jsx('div', {
	        className: clsformfield
	      }, void 0, _jsx('formfield', {}, void 0, _jsx('label', {
	        className: clslabel,
	        htmlFor: 're_new_pwd'
	      }, void 0, _ref11, _jsx('span', {
	        className: _component2.default.mandatory
	      }, void 0, '*'), ': '), _react2.default.createElement('input', { type: 'password', id: 're_new_pwd', ref: 're_new_pwd', className: clstext, placeholder: this.props.intlData.messages.retype_new_password, maxLength: 30, value: this.state.reNewPassword, onChange: this.handleInput.bind(this, 'reNewPassword') }), _jsx('label', {
	        className: _component2.default.errorPre
	      }, void 0, this.state.validationError && this.state.validationError.reNewPassword ? this.state.validationError.reNewPassword : ''))))))))))));
	    }
	  }]);
	
	  return ChangePassword;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    dashboardData: null,
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    intlData: (0, _IntlReducer.intlData)(state)
	  };
	}
	
	ChangePassword.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(ChangePassword);

/***/ },

/***/ 352:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ResetPassword = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactRouter = __webpack_require__(3);
	
	var _LoginActions = __webpack_require__(21);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _ChangePassword = __webpack_require__(266);
	
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
	
	var _lib = __webpack_require__(45);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Style
	
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx('span', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
		id: 'reset_prompt'
	}));
	
	var _ref2 = _jsx(_reactFontawesome2.default, {
		name: 'fa-key'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
		id: 'reset_prompt'
	});
	
	var _ref4 = _jsx('span', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
		id: 'link_is_either_expired_or_broken'
	}));
	
	var _ref5 = _jsx('span', {}, void 0, 'Kindly apply again to reset your password ');
	
	var _ref6 = _jsx('img', {
		src: '/images/logo/instavc-logo.png'
	});
	
	var _ref7 = _jsx('label', {
		className: 'sr-only'
	});
	
	var ResetPassword = exports.ResetPassword = function (_Component) {
		_inherits(ResetPassword, _Component);
	
		function ResetPassword() {
			_classCallCheck(this, ResetPassword);
	
			var _this = _possibleConstructorReturn(this, (ResetPassword.__proto__ || Object.getPrototypeOf(ResetPassword)).call(this));
	
			_this.setLinkdata = function (res) {
				//console.log(res)		
				if (res.status) {
					_this.valid = true;
					//alert(res.message)
					//this.refs.login_container.success(`${res.message} `, ``);
					_this.props.dispatch((0, _LoginActions.ClearLoginData)());
					_reactRouter.browserHistory.push('/resetPassword/' + _this.props.params.token);
				} else {
					_this.props.dispatch((0, _LoginActions.ClearLoginData)());
					if (res.error && res.error.length > 0) {
						_this.valid = false;
						if (res.error != 'Password reset token invalid or expired') {
							_this.refs.login_container.error(res.error + ' ', '');
						}
					}
				}
			};
	
			_this.setPassword = function () {
				//console.log(this)
				var token = _this.props.params.token;
				// console.log(token);
				// console.log(this.refs.password.value)
				var passwordValue = _this.state.password;
				var confPasswordValue = _this.state.confpassword;
				if (passwordValue == '') {
					_this.refs.login_container.error('Please enter the password');
				} else if (passwordValue != confPasswordValue) {
					_this.refs.login_container.error('Password and confirm password do not match');
				} else {
					var obj = {
						password: passwordValue,
						passwordtoken: token
					};
					(0, _LoginActions.resetPassword)(obj).then(function (res) {
						return _this.setdata(res);
					});
				}
			};
	
			_this.handleInput = function (label, e) {
				var val = e.target.value;
				if (!(0, _ChangePassword.hasWhiteSpace)(val)) {
					_this.setState(_defineProperty({}, label, val));
				} else {
					_this.refs.login_container.error("Password can't have spaces");
				}
			};
	
			_this.valid = false;
			_this.state = {
				password: '',
				confpassword: ''
			};
			return _this;
		}
	
		_createClass(ResetPassword, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this2 = this;
	
				var token = this.props.params.token;
				(0, _LoginActions.isRestPasswordTokenExpired)({ token: token }).then(function (res) {
					return _this2.setLinkdata(res);
				});
			}
		}, {
			key: 'setdata',
			value: function setdata(res) {
				//console.log(res)
				if (res.status) {
					this.refs.login_container.success(res.message + ' ', '');
					setTimeout(function () {
						_reactRouter.browserHistory.push('/');
					}, 1000);
				} else {
					if (res.error && res.error.length > 0) {
						this.refs.login_container.error(res.error + ' ', '');
					}
				}
			}
	
			//Changes made by prateek for bug#3000
	
		}, {
			key: 'renderForm',
			value: function renderForm() {
	
				var btnPrimaryCls = '' + _main2.default.btnPrimaryDark;
				var clsForgot = _LoginWidget2.default.actionLinks + ' ' + _LoginWidget2.default.actionSeprate;
				var clsResetinnerDiv = '' + _LoginWidget2.default.resetinnerDiv;
	
				var inputGroupCls = 'input-group ' + _main2.default.inputGroup;
				var inputFieldCls = 'form-control ' + _main2.default.inputField;
				var cls_rememberMe = _LoginWidget2.default.rememberMe + ' clearfix';
				var cls_txtRememberMe = _LoginWidget2.default.txtRememberMe + ' pull-left';
				var cls_signupAction = _LoginWidget2.default.signupAction + ' clearfix';
				var cls_loginSwitch = _LoginWidget2.default.loginSwitch + ' pull-right';
				var cls_loginSlider = _LoginWidget2.default.loginSlider + ' ' + _LoginWidget2.default.round;
				var formLoad = '';
				if (this.valid) {
					formLoad = _jsx('div', {}, void 0, _jsx('span', {
						className: _LoginWidget2.default.resetHeadText
					}, void 0, _jsx('h2', {
						className: _LoginWidget2.default.welcomeTxt
					}, void 0, _ref)), _react2.default.createElement('input', { type: 'password', id: 'password', ref: 'password', className: 'form-control',
						placeholder: this.props.intl.messages.password, tabIndex: '1', maxLength: 30, value: this.state.password, onChange: this.handleInput.bind(this, 'password') }), _react2.default.createElement('input', { type: 'password', id: 'password', ref: 'confpassword', className: 'form-control', value: this.state.confpassword,
						placeholder: this.props.intl.messages.confirm_password, tabIndex: '2', maxLength: 30, onChange: this.handleInput.bind(this, 'confpassword') }), _jsx('button', {
						type: 'button',
						className: _LoginWidget2.default.btnSignin,
						onClick: this.setPassword,
						tabIndex: '3'
					}, void 0, _ref2, ' ', _ref3));
				} else {
					formLoad = _jsx('div', {}, void 0, _jsx('label', {
						className: _LoginWidget2.default.welcomeTxt
					}, void 0, _jsx('span', {
						className: _LoginWidget2.default.resetHeadText
					}, void 0, _jsx('h2', {
						className: _LoginWidget2.default.welcomeTxt
					}, void 0, _ref4)), _jsx('span', {
						className: _LoginWidget2.default.resetMsgText
					}, void 0, _ref5), ' '));
				}
				return _jsx('div', {
					className: clsResetinnerDiv
				}, void 0, _jsx('div', {
					className: _LoginWidget2.default.loingLogoBlock
				}, void 0, _ref6), _jsx('div', {
					className: _LoginWidget2.default.resetPageBlock
				}, void 0, _jsx('div', {
					className: _LoginWidget2.default.formSignin
				}, void 0, _ref7, formLoad)));
			}
		}, {
			key: 'render',
			value: function render() {
				var cls = _LoginWidget2.default.loginBox + ' ' + _LoginWidget2.default.resetMainDiv; // ${mainStyle.bgPrimaryDark}
				var objRenderForm = this.renderForm();
	
				return _jsx('div', {
					className: cls
				}, void 0, _react2.default.createElement(_lib.ToastContainer, {
					toastMessageFactory: ToastMessageFactory,
					ref: 'login_container',
					className: 'toast-top-right'
				}), objRenderForm);
			}
		}]);
	
		return ResetPassword;
	}(_react.Component);
	
	function mapStateToProps(state) {
		return {
			intl: state.intl,
			loggedInData: (0, _LoginReducer.loggedInData)(state)
		};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(ResetPassword));

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

/***/ 382:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	exports.profileViewSubMenu = exports.localeEditSubMenu = exports.profileEditSubMenu = exports.localeEditMainMenu = exports.localeNewMainMenu = exports.profileViewMainMenu = exports.profileEditMainMenu = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//Main Menu
	var profileEditMainMenu = exports.profileEditMainMenu = {
			menus: [{ _id: "btnCancel", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'cancel'
					}), actionType: "URL", action: "/admin/profile", icon: "fa fa-ban" }, { _id: "btnSave", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'save'
					}), actionType: "Function", action: null, icon: "fa fa-floppy-o" }]
	};
	
	var profileViewMainMenu = exports.profileViewMainMenu = {
			menus: [{ _id: "btnEdit", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'edit'
					}), actionType: "URL", action: "/admin/profile/edit", icon: "fa fa-pencil" }]
	};
	
	var localeNewMainMenu = exports.localeNewMainMenu = {
			menus: [
			// {_id: "btnDelete", text: <FormattedMessage id='delete' />, actionType: "Function", action: null, icon: "fa fa-trash"},
			{ _id: "btnEdit", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'edit'
					}), actionType: "URL", action: "/admin/profile/locale", icon: "fa fa-pencil" }]
	};
	var localeEditMainMenu = exports.localeEditMainMenu = {
			menus: [{ _id: "btnCancel", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'cancel'
					}), actionType: "URL", action: "/admin/locale/view", icon: "fa fa-ban" }, { _id: "btnSave", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'save'
					}), actionType: "Function", action: null, icon: "fa fa-floppy-o" }]
	
			//SubMenu
	};var profileEditSubMenu = exports.profileEditSubMenu = {
			menus: [{ _id: "lnkGenaralInfo", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'general_info'
					}), actionType: "Function", action: null, active: "active" }]
	};
	var localeEditSubMenu = exports.localeEditSubMenu = {
			menus: [{ _id: "lnkEditLocale", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'locale_directory'
					}), actionType: "Function", action: null, active: "active" }]
	};
	var profileViewSubMenu = exports.profileViewSubMenu = {
			menus: [{ _id: "lnkMyProfile", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'my_profile'
					}), actionType: "URL", action: "/admin/profile", active: "active" }, { _id: "lnkWorkEdu", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'work_education'
					}), actionType: "URL", action: "/admin/profile/workedu" }, { _id: "lnkContacts", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'contacts'
					}), actionType: "URL", action: "/admin/profile/contacts" }, { _id: "lnkChangePassword", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'change_password'
					}), actionType: "URL", action: "/admin/changePassword" }, { _id: "lnkLocale", text: _jsx(_reactIntl.FormattedMessage, {
							id: 'locale'
					}), actionType: "URL", action: "/admin/locale/view" }]
	};

/***/ }

};;