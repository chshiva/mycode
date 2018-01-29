exports.ids = [41];
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

/***/ 353:
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
	
	var _reactIntl = __webpack_require__(11);
	
	var _RegistrationForm = __webpack_require__(522);
	
	var _RegistrationForm2 = _interopRequireDefault(_RegistrationForm);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _LoginActions = __webpack_require__(21);
	
	var _lib = __webpack_require__(45);
	
	var _IntlActions = __webpack_require__(37);
	
	var _config = __webpack_require__(18);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	//import { loginUserRequest, userLoggingIn, loginUser, isLoggedIn, ForgotPassword, setAndroidId} from './LoginActions';
	
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var Registration = function (_Component) {
	  _inherits(Registration, _Component);
	
	  function Registration(props) {
	    _classCallCheck(this, Registration);
	
	    var _this = _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).call(this, props));
	
	    _this.responseCallback = function (message) {
	      console.log("message === ", message);
	      _this.props.dispatch((0, _LoginActions.setLoginResponse)(message));
	      _reactRouter.browserHistory.push('/');
	    };
	
	    _this.renderForm = function () {
	      return _jsx(_RegistrationForm2.default, {
	        responseCallback: _this.responseCallback
	      });
	    };
	
	    _this.state = {};
	    return _this;
	  }
	
	  _createClass(Registration, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      if (!_config2.default.isSignUp) {
	        _reactRouter.browserHistory.push('/');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      //console.log(this.props)
	      //console.log('render',this.state.forgotPwdTemplate)
	
	
	      return _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'login_container',
	        className: 'toast-top-right'
	      }), this.renderForm());
	    }
	  }]);
	
	  return Registration;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    intl: state.intl,
	    loggedInData: (0, _LoginReducer.loggedInData)(state)
	  };
	}
	
	Registration.contextTypes = {
	  router: _react2.default.PropTypes.object
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Registration);

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

/***/ 521:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.saveStudentReq = saveStudentReq;
	
	var _apiCaller = __webpack_require__(8);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _reactRouter = __webpack_require__(3);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function saveStudentReq(data) {
	  return (0, _apiCaller2.default)('save-regist-data', 'post', {
	    data: data
	  });
	}

/***/ },

/***/ 522:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RegistrationForm = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactRouter = __webpack_require__(3);
	
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
	
	var _apiCaller = __webpack_require__(8);
	
	var _apiCaller2 = _interopRequireDefault(_apiCaller);
	
	var _reactBootstrapDatetimepicker = __webpack_require__(86);
	
	var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _detectNode = __webpack_require__(87);
	
	var _detectNode2 = _interopRequireDefault(_detectNode);
	
	var _bluebird = __webpack_require__(40);
	
	var _bluebird2 = _interopRequireDefault(_bluebird);
	
	var _lib = __webpack_require__(45);
	
	var _reactGoogleLogin = __webpack_require__(420);
	
	var _reactGoogleLogin2 = _interopRequireDefault(_reactGoogleLogin);
	
	var _reactFacebookLogin = __webpack_require__(419);
	
	var _reactFacebookLogin2 = _interopRequireDefault(_reactFacebookLogin);
	
	var _settings = __webpack_require__(400);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _config = __webpack_require__(18);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _Loading = __webpack_require__(142);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _RegistrationActions = __webpack_require__(521);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _Modal = __webpack_require__(52);
	
	var _ChangePassword = __webpack_require__(266);
	
	var _Registration = {
		"signInButton": "bFGr8Y3biWffM8s2YsKK_",
		"RegBox": "_6gy2GjUtv8ZqM4TWX3tbk",
		"formDisplay": "_2lORvVXhFIOgmISZfnMeZT",
		"registerWrapper": "_258MTj5jUYmsXfrXrr49Tp",
		"registerBlock": "_1Nn1sYx5ARjblsJQp_hjYv",
		"customsearch": "_2vC9kVJcvU4WSyxOziOFrg",
		"starMandatory": "_1Vqk2DfPrauTGVzuxjruFf",
		"regBtn": "_2ytLTEo8jXhvMqk6CYL8_3",
		"bottomAction": "_1Xo-kFDLtho_HV-RDnmCIp",
		"linkTxt": "_3TbV1Doj-R0ct49DOBvuf7",
		"regHeader": "_7ElMrUG2moVb5b61Hm71M",
		"regPTxt": "_2Rz6mJygMbteJ9IbSA8_Ie",
		"backButton": "B-fPqU3BHJ9vws56q6OJa",
		"resFormLink": "_1A57AdS7l86WYrRXfWBuDb",
		"thirdParyBlock": "_1Ciw-bKwzYhGEHcIy5V0uw",
		"regSearch": "_17fUoZoa8UeqsUC0Yn1MCq",
		"regSearchBtn": "_1uv34mOEKnlE42KCu8gGd9",
		"gIconUp": "_2cOwB9fqY5MWfR8CYDfq6H",
		"gTextUp": "_4NPd9lj4HnuPcrgwHGbXH",
		"registerLine": "_3Vng_lhiy3yTbE6IOyXGOr",
		"singUpBothWidth": "od6RF2Sy5a83Rvqqmrn1t",
		"registerPara": "_35hbr2Fdq8fLnVMCQwPqhQ",
		"DisclaimerCheck": "_23IbB1jGoU6ozDjzI5eEpP",
		"DisclaimerText": "_1gG2Ev18uRd56W98L8qyIk",
		"inputGroupgg": "_1AZiLHp5yC9L9Kuw6bddMS",
		"searchUsersListBlock": "DeByFt6q6XHSOIJL1KX5M",
		"searchUsersListGroup": "_3NiaNElhIaf90W-lOEsLsp",
		"searchBox": "_1_kkBRuRGoL_MbLa9CZq7S",
		"addStudentsBlock": "_1_u1cmO7iBShkA7ivsKoaD",
		"corporateListGroup": "_3dZqqzoJLmaZ5ktiOWrZXJ",
		"userAction": "_2hdIV4FfhBlWJd8JOJov8m",
		"googleContainer": "_2evRHfGV35CxW08e-5-Gli",
		"noDataFound": "YPrWeYPi-IjysI16Jv90B",
		"regLogoBlock": "_2sWlgsRyU7lIq0KZ3zfRcK",
		"welcomeTxt": "qiFvmVxiiCw4HxU5-8SLf",
		"pleaseTxt": "_2rghdv7gnptueUkQES87Zt",
		"signText": "KXF4hjDautTVYPSHm3rIX",
		"modelContainer": "_1gaqTZov4NzqUlbBVb5V7g",
		"modelWrapper": "_37vP-ll-qok56r3M64SoKE",
		"inputGroup": "_2RXDzDP0mRt0ZtQjIleQm4",
		"popHeadingAll": "_1lbefJm1ifDqylEBLoIvsh",
		"genderBlock": "_3i6XaliX4Pf2blmmmqmCct",
		"genderInput": "_3Im4BI5FbzDWVg1_e0ADeD",
		"genderText": "_10rc52qzniWkVUgX3RUsE3",
		"fbSignUpButton": "_3195A_S1fzCIgxURVVd3g2",
		"btnApplyAll": "_3c2Go8Jik-Jfms0FbS9AH",
		"blockSaveAssign": "_2x5nAyeMv68JcS8TKAVB7I",
		"blockSaveAssign2": "_1aG54iN8yUaeIEUy2HRVXr",
		"btnSaveAssign": "_3IdWzuGQHGWYkdYm2ys5dI",
		"btnSaveAssign2": "_1td5RroNRXQEIgqolK1TvP",
		"inputSearchRegBar": "_2GyOHZQQDsR2DXWJubXpl7"
	};
	
	var _Registration2 = _interopRequireDefault(_Registration);
	
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
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Moment = !_detectNode2.default ? _bluebird2.default.promisifyAll(__webpack_require__(1)) : null;
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	//Import Custom Components
	// import FieldGroup from '../../../components/FieldGroup.js';
	
	
	// Import Style
	
	var _ = __webpack_require__(7);
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_a_valid_Name'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_valid_Email_id'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_Password'
	});
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_Confirm_password'
	});
	
	var _ref5 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Passwords_are_not_matching'
	});
	
	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_valid_City_Name'
	});
	
	var _ref7 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_valid_State_Name'
	});
	
	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_a_valid_Zip'
	});
	
	var _ref9 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_valid_Date_of_birth'
	});
	
	var _ref10 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_accept_Term_conditions'
	});
	
	var _ref11 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Please_enter_institute_name'
	});
	
	var _ref12 = _jsx(_reactIntl.FormattedMessage, {
		id: 'Enter_at_least_three_letters_to_search'
	});
	
	var _ref13 = _jsx(_reactIntl.FormattedMessage, {
		id: 'terms_conditions'
	});
	
	var _ref14 = _jsx('p', {}, void 0, 'By clicking on "I Agree", you promise not to share credentials and application with other without PeopleLink consent. Post approved licencing period, all services will be terminated with or without intimation. Application version may get updated without prior notification. ');
	
	var _ref15 = _jsx(_reactIntl.FormattedMessage, {
		id: 'cancel'
	});
	
	var _ref16 = _jsx(_reactIntl.FormattedMessage, {
		id: 'i_agree'
	});
	
	var _ref17 = _jsx('img', {
		src: '/images/logo/instavc-logo.png'
	});
	
	var _ref18 = _jsx(_reactIntl.FormattedMessage, {
		id: 'student_reg_form'
	});
	
	var _ref19 = _jsx(_reactIntl.FormattedMessage, {
		id: 'user_reg_form'
	});
	
	var _ref20 = _jsx(_reactIntl.FormattedMessage, {
		id: 'already_registered_user'
	});
	
	var _ref21 = _jsx(_reactIntl.FormattedMessage, {
		id: 'sign_in'
	});
	
	var _ref22 = _jsx('span', {
		className: 'glyphicon glyphicon-search'
	});
	
	var _ref23 = _jsx('span', {}, void 0, _jsx(_reactFontawesome2.default, {
		name: 'plus'
	}));
	
	var _ref24 = _jsx('h2', {}, void 0, _jsx(_reactFontawesome2.default, {
		name: 'frown-o'
	}));
	
	var _ref25 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
		id: 'no_data_found'
	}));
	
	var _ref26 = _jsx(_Loading2.default, {
		loadType: 'register'
	});
	
	var _ref27 = _jsx(_reactFontawesome2.default, {
		name: 'long-arrow-left'
	});
	
	var _ref28 = _jsx('label', {}, void 0, 'Last Name');
	
	var _ref29 = _jsx('label', {}, void 0, 'Street ');
	
	var _ref30 = _jsx('label', {}, void 0, 'Zip/Pin');
	
	var _ref31 = _jsx('label', {}, void 0, 'Country ');
	
	var _ref32 = _jsx('option', {
		value: ''
	}, void 0, 'Select Country');
	
	var _ref33 = _jsx('option', {
		value: 'Afghanistan'
	}, void 0, 'Afghanistan');
	
	var _ref34 = _jsx('option', {
		value: 'Albania'
	}, void 0, 'Albania');
	
	var _ref35 = _jsx('option', {
		value: 'Algeria'
	}, void 0, 'Algeria');
	
	var _ref36 = _jsx('option', {
		value: 'American Samoa'
	}, void 0, 'American Samoa');
	
	var _ref37 = _jsx('option', {
		value: 'Andorra'
	}, void 0, 'Andorra');
	
	var _ref38 = _jsx('option', {
		value: 'Angola'
	}, void 0, 'Angola');
	
	var _ref39 = _jsx('option', {
		value: 'Anguilla'
	}, void 0, 'Anguilla');
	
	var _ref40 = _jsx('option', {
		value: 'Antartica'
	}, void 0, 'Antarctica');
	
	var _ref41 = _jsx('option', {
		value: 'Antigua and Barbuda'
	}, void 0, 'Antigua and Barbuda');
	
	var _ref42 = _jsx('option', {
		value: 'Argentina'
	}, void 0, 'Argentina');
	
	var _ref43 = _jsx('option', {
		value: 'Armenia'
	}, void 0, 'Armenia');
	
	var _ref44 = _jsx('option', {
		value: 'Aruba'
	}, void 0, 'Aruba');
	
	var _ref45 = _jsx('option', {
		value: 'Australia'
	}, void 0, 'Australia');
	
	var _ref46 = _jsx('option', {
		value: 'Austria'
	}, void 0, 'Austria');
	
	var _ref47 = _jsx('option', {
		value: 'Azerbaijan'
	}, void 0, 'Azerbaijan');
	
	var _ref48 = _jsx('option', {
		value: 'Bahamas'
	}, void 0, 'Bahamas');
	
	var _ref49 = _jsx('option', {
		value: 'Bahrain'
	}, void 0, 'Bahrain');
	
	var _ref50 = _jsx('option', {
		value: 'Bangladesh'
	}, void 0, 'Bangladesh');
	
	var _ref51 = _jsx('option', {
		value: 'Barbados'
	}, void 0, 'Barbados');
	
	var _ref52 = _jsx('option', {
		value: 'Belarus'
	}, void 0, 'Belarus');
	
	var _ref53 = _jsx('option', {
		value: 'Belgium'
	}, void 0, 'Belgium');
	
	var _ref54 = _jsx('option', {
		value: 'Belize'
	}, void 0, 'Belize');
	
	var _ref55 = _jsx('option', {
		value: 'Benin'
	}, void 0, 'Benin');
	
	var _ref56 = _jsx('option', {
		value: 'Bermuda'
	}, void 0, 'Bermuda');
	
	var _ref57 = _jsx('option', {
		value: 'Bhutan'
	}, void 0, 'Bhutan');
	
	var _ref58 = _jsx('option', {
		value: 'Bolivia'
	}, void 0, 'Bolivia');
	
	var _ref59 = _jsx('option', {
		value: 'Bosnia and Herzegowina'
	}, void 0, 'Bosnia and Herzegowina');
	
	var _ref60 = _jsx('option', {
		value: 'Botswana'
	}, void 0, 'Botswana');
	
	var _ref61 = _jsx('option', {
		value: 'Bouvet Island'
	}, void 0, 'Bouvet Island');
	
	var _ref62 = _jsx('option', {
		value: 'Brazil'
	}, void 0, 'Brazil');
	
	var _ref63 = _jsx('option', {
		value: 'British Indian Ocean Territory'
	}, void 0, 'British Indian Ocean Territory');
	
	var _ref64 = _jsx('option', {
		value: 'Brunei Darussalam'
	}, void 0, 'Brunei Darussalam');
	
	var _ref65 = _jsx('option', {
		value: 'Bulgaria'
	}, void 0, 'Bulgaria');
	
	var _ref66 = _jsx('option', {
		value: 'Burkina Faso'
	}, void 0, 'Burkina Faso');
	
	var _ref67 = _jsx('option', {
		value: 'Burundi'
	}, void 0, 'Burundi');
	
	var _ref68 = _jsx('option', {
		value: 'Cambodia'
	}, void 0, 'Cambodia');
	
	var _ref69 = _jsx('option', {
		value: 'Cameroon'
	}, void 0, 'Cameroon');
	
	var _ref70 = _jsx('option', {
		value: 'Canada'
	}, void 0, 'Canada');
	
	var _ref71 = _jsx('option', {
		value: 'Cape Verde'
	}, void 0, 'Cape Verde');
	
	var _ref72 = _jsx('option', {
		value: 'Cayman Islands'
	}, void 0, 'Cayman Islands');
	
	var _ref73 = _jsx('option', {
		value: 'Central African Republic'
	}, void 0, 'Central African Republic');
	
	var _ref74 = _jsx('option', {
		value: 'Chad'
	}, void 0, 'Chad');
	
	var _ref75 = _jsx('option', {
		value: 'Chile'
	}, void 0, 'Chile');
	
	var _ref76 = _jsx('option', {
		value: 'China'
	}, void 0, 'China');
	
	var _ref77 = _jsx('option', {
		value: 'Christmas Island'
	}, void 0, 'Christmas Island');
	
	var _ref78 = _jsx('option', {
		value: 'Cocos Islands'
	}, void 0, 'Cocos (Keeling) Islands');
	
	var _ref79 = _jsx('option', {
		value: 'Colombia'
	}, void 0, 'Colombia');
	
	var _ref80 = _jsx('option', {
		value: 'Comoros'
	}, void 0, 'Comoros');
	
	var _ref81 = _jsx('option', {
		value: 'Congo'
	}, void 0, 'Congo');
	
	var _ref82 = _jsx('option', {
		value: 'Congo'
	}, void 0, 'Congo, the Democratic Republic of the');
	
	var _ref83 = _jsx('option', {
		value: 'Cook Islands'
	}, void 0, 'Cook Islands');
	
	var _ref84 = _jsx('option', {
		value: 'Costa Rica'
	}, void 0, 'Costa Rica');
	
	var _ref85 = _jsx('option', {
		value: 'Cota D\'Ivoire'
	}, void 0, 'Cote dIvoire');
	
	var _ref86 = _jsx('option', {
		value: 'Croatia'
	}, void 0, 'Croatia (Hrvatska)');
	
	var _ref87 = _jsx('option', {
		value: 'Cuba'
	}, void 0, 'Cuba');
	
	var _ref88 = _jsx('option', {
		value: 'Cyprus'
	}, void 0, 'Cyprus');
	
	var _ref89 = _jsx('option', {
		value: 'Czech Republic'
	}, void 0, 'Czech Republic');
	
	var _ref90 = _jsx('option', {
		value: 'Denmark'
	}, void 0, 'Denmark');
	
	var _ref91 = _jsx('option', {
		value: 'Djibouti'
	}, void 0, 'Djibouti');
	
	var _ref92 = _jsx('option', {
		value: 'Dominica'
	}, void 0, 'Dominica');
	
	var _ref93 = _jsx('option', {
		value: 'Dominican Republic'
	}, void 0, 'Dominican Republic');
	
	var _ref94 = _jsx('option', {
		value: 'East Timor'
	}, void 0, 'East Timor');
	
	var _ref95 = _jsx('option', {
		value: 'Ecuador'
	}, void 0, 'Ecuador');
	
	var _ref96 = _jsx('option', {
		value: 'Egypt'
	}, void 0, 'Egypt');
	
	var _ref97 = _jsx('option', {
		value: 'El Salvador'
	}, void 0, 'El Salvador');
	
	var _ref98 = _jsx('option', {
		value: 'Equatorial Guinea'
	}, void 0, 'Equatorial Guinea');
	
	var _ref99 = _jsx('option', {
		value: 'Eritrea'
	}, void 0, 'Eritrea');
	
	var _ref100 = _jsx('option', {
		value: 'Estonia'
	}, void 0, 'Estonia');
	
	var _ref101 = _jsx('option', {
		value: 'Ethiopia'
	}, void 0, 'Ethiopia');
	
	var _ref102 = _jsx('option', {
		value: 'Falkland Islands'
	}, void 0, 'Falkland Islands (Malvinas)');
	
	var _ref103 = _jsx('option', {
		value: 'Faroe Islands'
	}, void 0, 'Faroe Islands');
	
	var _ref104 = _jsx('option', {
		value: 'Fiji'
	}, void 0, 'Fiji');
	
	var _ref105 = _jsx('option', {
		value: 'Finland'
	}, void 0, 'Finland');
	
	var _ref106 = _jsx('option', {
		value: 'France'
	}, void 0, 'France');
	
	var _ref107 = _jsx('option', {
		value: 'France Metropolitan'
	}, void 0, 'France, Metropolitan');
	
	var _ref108 = _jsx('option', {
		value: 'French Guiana'
	}, void 0, 'French Guiana');
	
	var _ref109 = _jsx('option', {
		value: 'French Polynesia'
	}, void 0, 'French Polynesia');
	
	var _ref110 = _jsx('option', {
		value: 'French Southern Territories'
	}, void 0, 'French Southern Territories');
	
	var _ref111 = _jsx('option', {
		value: 'Gabon'
	}, void 0, 'Gabon');
	
	var _ref112 = _jsx('option', {
		value: 'Gambia'
	}, void 0, 'Gambia');
	
	var _ref113 = _jsx('option', {
		value: 'Georgia'
	}, void 0, 'Georgia');
	
	var _ref114 = _jsx('option', {
		value: 'Germany'
	}, void 0, 'Germany');
	
	var _ref115 = _jsx('option', {
		value: 'Ghana'
	}, void 0, 'Ghana');
	
	var _ref116 = _jsx('option', {
		value: 'Gibraltar'
	}, void 0, 'Gibraltar');
	
	var _ref117 = _jsx('option', {
		value: 'Greece'
	}, void 0, 'Greece');
	
	var _ref118 = _jsx('option', {
		value: 'Greenland'
	}, void 0, 'Greenland');
	
	var _ref119 = _jsx('option', {
		value: 'Grenada'
	}, void 0, 'Grenada');
	
	var _ref120 = _jsx('option', {
		value: 'Guadeloupe'
	}, void 0, 'Guadeloupe');
	
	var _ref121 = _jsx('option', {
		value: 'Guam'
	}, void 0, 'Guam');
	
	var _ref122 = _jsx('option', {
		value: 'Guatemala'
	}, void 0, 'Guatemala');
	
	var _ref123 = _jsx('option', {
		value: 'Guinea'
	}, void 0, 'Guinea');
	
	var _ref124 = _jsx('option', {
		value: 'Guinea-Bissau'
	}, void 0, 'Guinea-Bissau');
	
	var _ref125 = _jsx('option', {
		value: 'Guyana'
	}, void 0, 'Guyana');
	
	var _ref126 = _jsx('option', {
		value: 'Haiti'
	}, void 0, 'Haiti');
	
	var _ref127 = _jsx('option', {
		value: 'Heard and McDonald Islands'
	}, void 0, 'Heard and Mc Donald Islands');
	
	var _ref128 = _jsx('option', {
		value: 'Holy See'
	}, void 0, 'Holy See (Vatican City State)');
	
	var _ref129 = _jsx('option', {
		value: 'Honduras'
	}, void 0, 'Honduras');
	
	var _ref130 = _jsx('option', {
		value: 'Hong Kong'
	}, void 0, 'Hong Kong');
	
	var _ref131 = _jsx('option', {
		value: 'Hungary'
	}, void 0, 'Hungary');
	
	var _ref132 = _jsx('option', {
		value: 'Iceland'
	}, void 0, 'Iceland');
	
	var _ref133 = _jsx('option', {
		value: 'India'
	}, void 0, 'India');
	
	var _ref134 = _jsx('option', {
		value: 'Indonesia'
	}, void 0, 'Indonesia');
	
	var _ref135 = _jsx('option', {
		value: 'Iran'
	}, void 0, 'Iran (Islamic Republic of)');
	
	var _ref136 = _jsx('option', {
		value: 'Iraq'
	}, void 0, 'Iraq');
	
	var _ref137 = _jsx('option', {
		value: 'Ireland'
	}, void 0, 'Ireland');
	
	var _ref138 = _jsx('option', {
		value: 'Israel'
	}, void 0, 'Israel');
	
	var _ref139 = _jsx('option', {
		value: 'Italy'
	}, void 0, 'Italy');
	
	var _ref140 = _jsx('option', {
		value: 'Jamaica'
	}, void 0, 'Jamaica');
	
	var _ref141 = _jsx('option', {
		value: 'Japan'
	}, void 0, 'Japan');
	
	var _ref142 = _jsx('option', {
		value: 'Jordan'
	}, void 0, 'Jordan');
	
	var _ref143 = _jsx('option', {
		value: 'Kazakhstan'
	}, void 0, 'Kazakhstan');
	
	var _ref144 = _jsx('option', {
		value: 'Kenya'
	}, void 0, 'Kenya');
	
	var _ref145 = _jsx('option', {
		value: 'Kiribati'
	}, void 0, 'Kiribati');
	
	var _ref146 = _jsx('option', {
		value: 'Democratic People\'s Republic of Korea'
	}, void 0, 'Korea, Democratic Peoples Republic of');
	
	var _ref147 = _jsx('option', {
		value: 'Korea'
	}, void 0, 'Korea, Republic of');
	
	var _ref148 = _jsx('option', {
		value: 'Kuwait'
	}, void 0, 'Kuwait');
	
	var _ref149 = _jsx('option', {
		value: 'Kyrgyzstan'
	}, void 0, 'Kyrgyzstan');
	
	var _ref150 = _jsx('option', {
		value: 'Lao'
	}, void 0, 'Lao Peoples Democratic Republic');
	
	var _ref151 = _jsx('option', {
		value: 'Latvia'
	}, void 0, 'Latvia');
	
	var _ref152 = _jsx('option', {
		value: 'Lebanon'
	}, void 0, 'Lebanon');
	
	var _ref153 = _jsx('option', {
		value: 'Lesotho'
	}, void 0, 'Lesotho');
	
	var _ref154 = _jsx('option', {
		value: 'Liberia'
	}, void 0, 'Liberia');
	
	var _ref155 = _jsx('option', {
		value: 'Libyan Arab Jamahiriya'
	}, void 0, 'Libyan Arab Jamahiriya');
	
	var _ref156 = _jsx('option', {
		value: 'Liechtenstein'
	}, void 0, 'Liechtenstein');
	
	var _ref157 = _jsx('option', {
		value: 'Lithuania'
	}, void 0, 'Lithuania');
	
	var _ref158 = _jsx('option', {
		value: 'Luxembourg'
	}, void 0, 'Luxembourg');
	
	var _ref159 = _jsx('option', {
		value: 'Macau'
	}, void 0, 'Macau');
	
	var _ref160 = _jsx('option', {
		value: 'Macedonia'
	}, void 0, 'Macedonia, The Former Yugoslav Republic of');
	
	var _ref161 = _jsx('option', {
		value: 'Madagascar'
	}, void 0, 'Madagascar');
	
	var _ref162 = _jsx('option', {
		value: 'Malawi'
	}, void 0, 'Malawi');
	
	var _ref163 = _jsx('option', {
		value: 'Malaysia'
	}, void 0, 'Malaysia');
	
	var _ref164 = _jsx('option', {
		value: 'Maldives'
	}, void 0, 'Maldives');
	
	var _ref165 = _jsx('option', {
		value: 'Mali'
	}, void 0, 'Mali');
	
	var _ref166 = _jsx('option', {
		value: 'Malta'
	}, void 0, 'Malta');
	
	var _ref167 = _jsx('option', {
		value: 'Marshall Islands'
	}, void 0, 'Marshall Islands');
	
	var _ref168 = _jsx('option', {
		value: 'Martinique'
	}, void 0, 'Martinique');
	
	var _ref169 = _jsx('option', {
		value: 'Mauritania'
	}, void 0, 'Mauritania');
	
	var _ref170 = _jsx('option', {
		value: 'Mauritius'
	}, void 0, 'Mauritius');
	
	var _ref171 = _jsx('option', {
		value: 'Mayotte'
	}, void 0, 'Mayotte');
	
	var _ref172 = _jsx('option', {
		value: 'Mexico'
	}, void 0, 'Mexico');
	
	var _ref173 = _jsx('option', {
		value: 'Micronesia'
	}, void 0, 'Micronesia, Federated States of');
	
	var _ref174 = _jsx('option', {
		value: 'Moldova'
	}, void 0, 'Moldova, Republic of');
	
	var _ref175 = _jsx('option', {
		value: 'Monaco'
	}, void 0, 'Monaco');
	
	var _ref176 = _jsx('option', {
		value: 'Mongolia'
	}, void 0, 'Mongolia');
	
	var _ref177 = _jsx('option', {
		value: 'Montserrat'
	}, void 0, 'Montserrat');
	
	var _ref178 = _jsx('option', {
		value: 'Morocco'
	}, void 0, 'Morocco');
	
	var _ref179 = _jsx('option', {
		value: 'Mozambique'
	}, void 0, 'Mozambique');
	
	var _ref180 = _jsx('option', {
		value: 'Myanmar'
	}, void 0, 'Myanmar');
	
	var _ref181 = _jsx('option', {
		value: 'Namibia'
	}, void 0, 'Namibia');
	
	var _ref182 = _jsx('option', {
		value: 'Nauru'
	}, void 0, 'Nauru');
	
	var _ref183 = _jsx('option', {
		value: 'Nepal'
	}, void 0, 'Nepal');
	
	var _ref184 = _jsx('option', {
		value: 'Netherlands'
	}, void 0, 'Netherlands');
	
	var _ref185 = _jsx('option', {
		value: 'Netherlands Antilles'
	}, void 0, 'Netherlands Antilles');
	
	var _ref186 = _jsx('option', {
		value: 'New Caledonia'
	}, void 0, 'New Caledonia');
	
	var _ref187 = _jsx('option', {
		value: 'New Zealand'
	}, void 0, 'New Zealand');
	
	var _ref188 = _jsx('option', {
		value: 'Nicaragua'
	}, void 0, 'Nicaragua');
	
	var _ref189 = _jsx('option', {
		value: 'Niger'
	}, void 0, 'Niger');
	
	var _ref190 = _jsx('option', {
		value: 'Nigeria'
	}, void 0, 'Nigeria');
	
	var _ref191 = _jsx('option', {
		value: 'Niue'
	}, void 0, 'Niue');
	
	var _ref192 = _jsx('option', {
		value: 'Norfolk Island'
	}, void 0, 'Norfolk Island');
	
	var _ref193 = _jsx('option', {
		value: 'Northern Mariana Islands'
	}, void 0, 'Northern Mariana Islands');
	
	var _ref194 = _jsx('option', {
		value: 'Norway'
	}, void 0, 'Norway');
	
	var _ref195 = _jsx('option', {
		value: 'Oman'
	}, void 0, 'Oman');
	
	var _ref196 = _jsx('option', {
		value: 'Pakistan'
	}, void 0, 'Pakistan');
	
	var _ref197 = _jsx('option', {
		value: 'Palau'
	}, void 0, 'Palau');
	
	var _ref198 = _jsx('option', {
		value: 'Panama'
	}, void 0, 'Panama');
	
	var _ref199 = _jsx('option', {
		value: 'Papua New Guinea'
	}, void 0, 'Papua New Guinea');
	
	var _ref200 = _jsx('option', {
		value: 'Paraguay'
	}, void 0, 'Paraguay');
	
	var _ref201 = _jsx('option', {
		value: 'Peru'
	}, void 0, 'Peru');
	
	var _ref202 = _jsx('option', {
		value: 'Philippines'
	}, void 0, 'Philippines');
	
	var _ref203 = _jsx('option', {
		value: 'Pitcairn'
	}, void 0, 'Pitcairn');
	
	var _ref204 = _jsx('option', {
		value: 'Poland'
	}, void 0, 'Poland');
	
	var _ref205 = _jsx('option', {
		value: 'Portugal'
	}, void 0, 'Portugal');
	
	var _ref206 = _jsx('option', {
		value: 'Puerto Rico'
	}, void 0, 'Puerto Rico');
	
	var _ref207 = _jsx('option', {
		value: 'Qatar'
	}, void 0, 'Qatar');
	
	var _ref208 = _jsx('option', {
		value: 'Reunion'
	}, void 0, 'Reunion');
	
	var _ref209 = _jsx('option', {
		value: 'Romania'
	}, void 0, 'Romania');
	
	var _ref210 = _jsx('option', {
		value: 'Russia'
	}, void 0, 'Russian Federation');
	
	var _ref211 = _jsx('option', {
		value: 'Rwanda'
	}, void 0, 'Rwanda');
	
	var _ref212 = _jsx('option', {
		value: 'Saint Kitts and Nevis'
	}, void 0, 'Saint Kitts and Nevis');
	
	var _ref213 = _jsx('option', {
		value: 'Saint LUCIA'
	}, void 0, 'Saint LUCIA');
	
	var _ref214 = _jsx('option', {
		value: 'Saint Vincent'
	}, void 0, 'Saint Vincent and the Grenadines');
	
	var _ref215 = _jsx('option', {
		value: 'Samoa'
	}, void 0, 'Samoa');
	
	var _ref216 = _jsx('option', {
		value: 'San Marino'
	}, void 0, 'San Marino');
	
	var _ref217 = _jsx('option', {
		value: 'Sao Tome and Principe'
	}, void 0, 'Sao Tome and Principe');
	
	var _ref218 = _jsx('option', {
		value: 'Saudi Arabia'
	}, void 0, 'Saudi Arabia');
	
	var _ref219 = _jsx('option', {
		value: 'Senegal'
	}, void 0, 'Senegal');
	
	var _ref220 = _jsx('option', {
		value: 'Seychelles'
	}, void 0, 'Seychelles');
	
	var _ref221 = _jsx('option', {
		value: 'Sierra'
	}, void 0, 'Sierra Leone');
	
	var _ref222 = _jsx('option', {
		value: 'Singapore'
	}, void 0, 'Singapore');
	
	var _ref223 = _jsx('option', {
		value: 'Slovakia'
	}, void 0, 'Slovakia (Slovak Republic)');
	
	var _ref224 = _jsx('option', {
		value: 'Slovenia'
	}, void 0, 'Slovenia');
	
	var _ref225 = _jsx('option', {
		value: 'Solomon Islands'
	}, void 0, 'Solomon Islands');
	
	var _ref226 = _jsx('option', {
		value: 'Somalia'
	}, void 0, 'Somalia');
	
	var _ref227 = _jsx('option', {
		value: 'South Africa'
	}, void 0, 'South Africa');
	
	var _ref228 = _jsx('option', {
		value: 'South Georgia'
	}, void 0, 'South Georgia and the South Sandwich Islands');
	
	var _ref229 = _jsx('option', {
		value: 'Span'
	}, void 0, 'Spain');
	
	var _ref230 = _jsx('option', {
		value: 'SriLanka'
	}, void 0, 'Sri Lanka');
	
	var _ref231 = _jsx('option', {
		value: 'St. Helena'
	}, void 0, 'St. Helena');
	
	var _ref232 = _jsx('option', {
		value: 'St. Pierre and Miguelon'
	}, void 0, 'St. Pierre and Miquelon');
	
	var _ref233 = _jsx('option', {
		value: 'Sudan'
	}, void 0, 'Sudan');
	
	var _ref234 = _jsx('option', {
		value: 'Suriname'
	}, void 0, 'Suriname');
	
	var _ref235 = _jsx('option', {
		value: 'Svalbard'
	}, void 0, 'Svalbard and Jan Mayen Islands');
	
	var _ref236 = _jsx('option', {
		value: 'Swaziland'
	}, void 0, 'Swaziland');
	
	var _ref237 = _jsx('option', {
		value: 'Sweden'
	}, void 0, 'Sweden');
	
	var _ref238 = _jsx('option', {
		value: 'Switzerland'
	}, void 0, 'Switzerland');
	
	var _ref239 = _jsx('option', {
		value: 'Syria'
	}, void 0, 'Syrian Arab Republic');
	
	var _ref240 = _jsx('option', {
		value: 'Taiwan'
	}, void 0, 'Taiwan, Province of China');
	
	var _ref241 = _jsx('option', {
		value: 'Tajikistan'
	}, void 0, 'Tajikistan');
	
	var _ref242 = _jsx('option', {
		value: 'Tanzania'
	}, void 0, 'Tanzania, United Republic of');
	
	var _ref243 = _jsx('option', {
		value: 'Thailand'
	}, void 0, 'Thailand');
	
	var _ref244 = _jsx('option', {
		value: 'Togo'
	}, void 0, 'Togo');
	
	var _ref245 = _jsx('option', {
		value: 'Tokelau'
	}, void 0, 'Tokelau');
	
	var _ref246 = _jsx('option', {
		value: 'Tonga'
	}, void 0, 'Tonga');
	
	var _ref247 = _jsx('option', {
		value: 'Trinidad and Tobago'
	}, void 0, 'Trinidad and Tobago');
	
	var _ref248 = _jsx('option', {
		value: 'Tunisia'
	}, void 0, 'Tunisia');
	
	var _ref249 = _jsx('option', {
		value: 'Turkey'
	}, void 0, 'Turkey');
	
	var _ref250 = _jsx('option', {
		value: 'Turkmenistan'
	}, void 0, 'Turkmenistan');
	
	var _ref251 = _jsx('option', {
		value: 'Turks and Caicos'
	}, void 0, 'Turks and Caicos Islands');
	
	var _ref252 = _jsx('option', {
		value: 'Tuvalu'
	}, void 0, 'Tuvalu');
	
	var _ref253 = _jsx('option', {
		value: 'Uganda'
	}, void 0, 'Uganda');
	
	var _ref254 = _jsx('option', {
		value: 'Ukraine'
	}, void 0, 'Ukraine');
	
	var _ref255 = _jsx('option', {
		value: 'United Arab Emirates'
	}, void 0, 'United Arab Emirates');
	
	var _ref256 = _jsx('option', {
		value: 'United Kingdom'
	}, void 0, 'United Kingdom');
	
	var _ref257 = _jsx('option', {
		value: 'United States'
	}, void 0, 'United States');
	
	var _ref258 = _jsx('option', {
		value: 'United States Minor Outlying Islands'
	}, void 0, 'United States Minor Outlying Islands');
	
	var _ref259 = _jsx('option', {
		value: 'Uruguay'
	}, void 0, 'Uruguay');
	
	var _ref260 = _jsx('option', {
		value: 'Uzbekistan'
	}, void 0, 'Uzbekistan');
	
	var _ref261 = _jsx('option', {
		value: 'Vanuatu'
	}, void 0, 'Vanuatu');
	
	var _ref262 = _jsx('option', {
		value: 'Venezuela'
	}, void 0, 'Venezuela');
	
	var _ref263 = _jsx('option', {
		value: 'Vietnam'
	}, void 0, 'Viet Nam');
	
	var _ref264 = _jsx('option', {
		value: 'Virgin Islands (British)'
	}, void 0, 'Virgin Islands (British)');
	
	var _ref265 = _jsx('option', {
		value: 'Virgin Islands (U.S)'
	}, void 0, 'Virgin Islands (U.S.)');
	
	var _ref266 = _jsx('option', {
		value: 'Wallis and Futana Islands'
	}, void 0, 'Wallis and Futuna Islands');
	
	var _ref267 = _jsx('option', {
		value: 'Western Sahara'
	}, void 0, 'Western Sahara');
	
	var _ref268 = _jsx('option', {
		value: 'Yemen'
	}, void 0, 'Yemen');
	
	var _ref269 = _jsx('option', {
		value: 'Yugoslavia'
	}, void 0, 'Yugoslavia');
	
	var _ref270 = _jsx('option', {
		value: 'Zambia'
	}, void 0, 'Zambia');
	
	var _ref271 = _jsx('option', {
		value: 'Zimbabwe'
	}, void 0, 'Zimbabwe');
	
	var _ref272 = _jsx('label', {}, void 0, 'Gender : ');
	
	var _ref273 = _jsx('input', {
		id: 'genderMale',
		type: 'radio',
		name: 'gender',
		value: 'Male'
	});
	
	var _ref274 = _jsx(_reactIntl.FormattedMessage, {
		id: 'male'
	});
	
	var _ref275 = _jsx(_reactIntl.FormattedMessage, {
		id: 'female'
	});
	
	var _ref276 = _jsx('span', {}, void 0, 'Already have an account');
	
	var RegistrationForm = exports.RegistrationForm = function (_Component) {
		_inherits(RegistrationForm, _Component);
	
		function RegistrationForm() {
			_classCallCheck(this, RegistrationForm);
	
			var _this = _possibleConstructorReturn(this, (RegistrationForm.__proto__ || Object.getPrototypeOf(RegistrationForm)).call(this));
	
			_this.handleStreet = function (e) {
				var val = _.startCase(_.toLower(e.target.value));
				val = val.length != e.target.value.length ? e.target.value : val;
				_this.setState({ street: val });
			};
	
			_this.handleEnable = function (e) {
				var isEnable = e.currentTarget.value == "true" ? false : true;
				_this.setState({ checkBox: isEnable });
			};
	
			_this.handleCancel = function (e) {
				_reactRouter.browserHistory.push('/');
			};
	
			_this.responseGoogle = function (response) {
				var profile = response.getBasicProfile();
				var obj = {};
				obj['name'] = profile.getName();
				obj['firstname'] = profile.ofa;
				obj['lastname'] = profile.wea;
				obj['email'] = profile.getEmail();
				obj['profile'] = {};
				obj['profileImage'] = profile.getImageUrl();
				obj['loginType'] = 'Google';
				obj['profile.companyid'] = _this.state.corpId;
				obj['companyid'] = _this.state.corpId;
				obj['googleId'] = profile.getId();
				(0, _RegistrationActions.saveStudentReq)(obj).then(function (res) {
					return _this.showResponse(res);
				});
			};
	
			_this.responseFacebook = function (response) {
				if (response.status == "unknown" || response.error) {
					console.log(response.error);
					_this.refs.regis_container.error('Error while Registration ', '');
				} else if (!response.email) {
					_this.refs.regis_container.error('Please Register with facebook email Id', '');
				} else {
					var obj = {};
					obj['name'] = response.name;
					obj['firstname'] = response.first_name;
					obj['lastname'] = response.last_name;
					obj['email'] = response.email;
					obj['dateofbirth'] = response.birthday;
					obj['profileImage'] = response.picture.data.url;
					obj['loginType'] = 'Facebook';
					obj['facebookId'] = response.userID;
					obj['profile.companyid'] = _this.state.corpId;
					obj['companyid'] = _this.state.corpId;
					(0, _RegistrationActions.saveStudentReq)(obj).then(function (res) {
						return _this.showResponse(res);
					});
				}
			};
	
			_this.responseFailureGoogle = function (response) {
				_this.refs.regis_container.error('Cancelled Google Link', '');
			};
	
			_this.state = {
				myCorporateData: '',
				noDataFound: '',
				corpId: '',
				firstname: '',
				lastname: '',
				password: '',
				email: '',
				confPassword: '',
				street: '',
				city: '',
				zip: '',
				country: '',
				province: '',
				gender: '',
				DateOfBirth: (0, _moment2.default)().format('DD/MM/YYYY'),
				DateOfBirthFormat: "DD/MM/YYYY",
				DateOfBirthInputFormat: "DD/MM/YYYY",
				DateOfBirthMode: "date",
				checkBox: false,
				enabled: false,
				formEnabled: false,
				input: '',
				searchOption: true,
				showAgreementModal: false,
				validationError: {},
				loading: false
				//this.handleCheckbox = this.handleCheckbox.bind(this);
			};return _this;
		}
	
		_createClass(RegistrationForm, [{
			key: 'handleFName',
			value: function handleFName(e) {
				var val = _.startCase(_.toLower(e.target.value));
				val = val.length != e.target.value.length ? e.target.value : val;
				this.setState({ firstname: val });
			}
		}, {
			key: 'handleLName',
			value: function handleLName(e) {
				var val = _.startCase(_.toLower(e.target.value));
				val = val.length != e.target.value.length ? e.target.value : val;
				this.setState({ lastname: val });
			}
	
			//Changes made by prateek for bug#3000
	
		}, {
			key: 'handlePassword',
			value: function handlePassword(e) {
				var val = e.target.value;
				if (!(0, _ChangePassword.hasWhiteSpace)(val)) {
					this.setState({ password: e.target.value });
				} else {
					var errorObj = this.state.validationError;
					errorObj['passwordError'] = "Password can't have spaces";
					this.setState({ validationError: errorObj });
				}
			}
		}, {
			key: 'handleConfPassword',
			value: function handleConfPassword(e) {
				var val = e.target.value;
				if (!(0, _ChangePassword.hasWhiteSpace)(val)) {
					this.setState({ confPassword: e.target.value });
				} else {
					var errorObj = this.state.validationError;
					errorObj['confirmPasswordError'] = "Password can't have spaces";
					this.setState({ validationError: errorObj });
				}
			}
		}, {
			key: 'handleEmail',
			value: function handleEmail(e) {
				this.setState({ email: e.target.value });
			}
		}, {
			key: 'handleCity',
			value: function handleCity(e) {
				var val = _.startCase(_.toLower(e.target.value));
				val = val.length != e.target.value.length ? e.target.value : val;
				this.setState({ city: val });
			}
		}, {
			key: 'handleZip',
			value: function handleZip(e) {
				this.setState({ zip: e.target.value.trim() });
			}
		}, {
			key: 'handleCountry',
			value: function handleCountry(e) {
				this.setState({ country: this.refs.country.value });
			}
		}, {
			key: 'handleState',
			value: function handleState(e) {
				var val = _.startCase(_.toLower(e.target.value));
				val = val.length != e.target.value.length ? e.target.value : val;
				this.setState({ province: val });
			}
		}, {
			key: 'handleGender',
			value: function handleGender(e) {
				this.setState({ gender: this.refs.gender.value });
			}
		}, {
			key: 'validateZip',
			value: function validateZip(value) {
				var re = /^[0-9]{6}$/;
				return re.test(value);
			}
			// Changed by jyothi for date borth validations.
	
		}, {
			key: 'saveStudentData',
			value: function saveStudentData(e) {
				var _this2 = this;
	
				e.preventDefault();
				var obj = {};
				var errors = {};
				var currentDate = (0, _moment2.default)().format('DD/MM/YYYY');
	
				if (this.state.firstname.trim() == '' || this.validateAplhaWithSpace(this.state.firstname) == false || this.validateSpace(this.state.firstname) == true) {
					errors['nameError'] = _ref;
				}
				if (this.state.email == '' || this.validateEmail(this.state.email) == false) {
					errors['emailError'] = _ref2;
				}
				if (this.state.password.trim() == '') {
					errors['passwordError'] = _ref3;
				}
				if (this.state.confPassword.trim() == '') {
					errors['confirmPasswordError'] = _ref4;
				}
				if (this.state.password.trim() != this.state.confPassword.trim()) {
					errors['confirmPasswordError'] = _ref5;
				}
				if (this.state.city.trim() == '' || this.validateAplhaWithSpace(this.state.city) == false) {
					errors['cityError'] = _ref6;
				}
				if (this.state.province.trim() == '' || this.validateAplhaWithSpace(this.state.province) == false) {
					errors['stateError'] = _ref7;
				}
				if (this.state.zip != '' && this.validateZip(this.state.zip) == false) {
					errors['zipError'] = _ref8;
				}
				if (this.state.DateOfBirth != '' && this.state.DateOfBirth > currentDate) {
					errors['dateError'] = _ref9;
				}
	
				if (this.state.checkBox == false) {
					errors['checkboxError'] = _ref10;
				}
				if (!_.isEmpty(errors)) {
					this.setState({
						validationError: errors
					});
				} else {
					this.setState({
						validationError: {}
					});
					obj['profile.companyid'] = this.state.corpId;
					obj['firstname'] = this.state.firstname;
					obj['lastname'] = this.state.lastname;
					obj['email'] = this.state.email;
					obj['userPassword'] = this.state.password;
					obj['profile.contact.street'] = this.state.street;
					obj['profile.contact.city'] = this.state.city;
					obj['profile.contact.zip'] = this.state.zip;
					obj['profile.contact.country'] = this.state.country;
					obj['profile.contact.state'] = this.state.province;
					obj['profile.gender'] = this.state.gender;
					obj['dateofbirth'] = this.state.DateOfBirth;
					this.setState({ loading: true });
					(0, _RegistrationActions.saveStudentReq)(obj).then(function (res) {
						return _this2.showResponse(res);
					});
				}
			}
		}, {
			key: 'showResponse',
			value: function showResponse(response) {
				//console.log("Show Response", response);
				if (response.status) {
					this.refs.regis_container.success(response.message + ' ', '');
					this.setState({ loading: false, formEnabled: false, searchOption: true, input: '', myCorporateData: '', noDataFound: '', corpId: '', firstname: '', lastname: '', password: '', email: '', confPassword: '', street: '', city: '', zip: '', country: '', province: '', gender: '' });
					this.props.responseCallback(response.message);
					// setTimeout(function(){ browserHistory.push('/') }, 1000);			
				} else {
					this.refs.regis_container.error(response.error + ' ', '');
					this.setState({ loading: false });
				}
			}
		}, {
			key: 'validateSpace',
			value: function validateSpace(value) {
				var re = /^[ ]*$/;
				return re.test(value);
			}
		}, {
			key: 'validateAplhaWithSpace',
			value: function validateAplhaWithSpace(value) {
				var re = /^[a-zA-Z ]*$/;
				return re.test(value);
			}
		}, {
			key: 'validateZip',
			value: function validateZip(value) {
				var re = /^[0-9]{6}$/;
				return re.test(value);
			}
		}, {
			key: 'validateEmail',
			value: function validateEmail(email) {
				var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
				return re.test(email);
			}
		}, {
			key: 'searchCorporate',
			value: function searchCorporate(e) {
				var _this3 = this;
	
				this.setState({ input: e.target.value, formEnabled: false });
				//console.log("input==", this.state.input);
				// var str = new String(this.state.input);
				var value = e.target.value.trim();
				//console.log("input==", value.length);
				if (value && value.length >= 2) {
					this.setState({ enabled: true, noDataFound: false });
					var path = 'search-corporate/' + value;
					(0, _apiCaller2.default)(path, 'get').then(function (res) {
						return _this3.corpList(res);
					});
				} else {
					this.setState({ enabled: false });
				}
			}
		}, {
			key: 'corpList',
			value: function corpList(res) {
				//console.log("myCorporateData==", res);
				if (res.data && res.data.length == 0) {
					//console.log("myDatalength==", res.data.length);
					this.setState({
						noDataFound: true
					});
				}
				this.setState({ myCorporateData: res.data });
			}
		}, {
			key: 'handleSearchIcon',
			value: function handleSearchIcon(e) {
				var searchVal = this.state.input;
				var errors = {};
				if (searchVal == '') {
					errors['instituteError'] = _ref11;
					this.setState({ validationError: errors });
				} else if (searchVal.length < 3) {
					errors['instituteError'] = _ref12;
					this.setState({ validationError: errors });
				}
			}
		}, {
			key: 'addedCorporate',
			value: function addedCorporate(data) {
				//console.log("add corp", data);  	
				this.setState({ corpId: data._id, enabled: false, formEnabled: true, input: data.businessName, searchOption: false });
			}
		}, {
			key: 'handleDateOfBirth',
			value: function handleDateOfBirth(data) {
				//console.log("data ==== ", data);
				this.setState({ DateOfBirth: data });
			}
		}, {
			key: 'handleTermsnConditions',
			value: function handleTermsnConditions() {
				this.setState({ showAgreementModal: true });
			}
		}, {
			key: 'cancelIAgree',
			value: function cancelIAgree() {
				this.setState({ showAgreementModal: false });
			}
		}, {
			key: 'handleIAgree',
			value: function handleIAgree() {
				this.setState({ showAgreementModal: false, checkBox: true });
			}
		}, {
			key: 'hideAgreementModal',
			value: function hideAgreementModal() {
				this.setState({ showAgreementModal: false, validationError: {} });
			}
		}, {
			key: 'handleForm',
			value: function handleForm() {
				this.setState({ formEnabled: false, searchOption: true, input: '', validationError: {} });
			}
		}, {
			key: 'renderForm',
			value: function renderForm() {
				var _jsx2,
				    _this4 = this,
				    _React$createElement;
	
				//console.log("loading", this.state.loading);
				var inputGroupClsddd = 'fa-facebook ' + _Registration2.default.inputGroupgg;
				var btnPrimaryCls = '' + _main2.default.btnPrimaryDark;
				var clsForgot = _Registration2.default.actionLinks + ' ' + _Registration2.default.actionSeprate;
				var inputGroupCls = 'input-group ' + _main2.default.inputGroup;
				var inputFieldCls = 'form-control ' + _main2.default.inputField;
				var inputSearchCls = 'search-query form-control ' + _Registration2.default.regSearch;
				var inputIconCls = 'btn btn-primary ' + _Registration2.default.regSearchBtn;
				var cls_rememberMe = _Registration2.default.rememberMe + ' clearfix';
				var cls_txtRememberMe = _Registration2.default.txtRememberMe + ' pull-left';
				var cls_signupAction = _Registration2.default.signupAction + ' clearfix';
				var cls_loginSwitch = _Registration2.default.loginSwitch + ' pull-right';
				var cls_loginSlider = _Registration2.default.loginSlider + ' ' + _Registration2.default.round;
				var cls_singUpBothWidth = _Registration2.default.singUpBothWidth + ' ';
				var cls_inputSearchRegBar = ' ' + _Registration2.default.inputSearchRegBar + ' input-group col-md-12 ';
				var _state = this.state,
				    DateOfBirth = _state.DateOfBirth,
				    DateOfBirthFormat = _state.DateOfBirthFormat,
				    DateOfBirthInputFormat = _state.DateOfBirthInputFormat,
				    DateOfBirthMode = _state.DateOfBirthMode;
	
	
				var showAgreementModal = this.state.showAgreementModal ? _jsx(_reactBootstrap.Modal, {
					show: this.state.showAgreementModal,
					onHide: this.hideAgreementModal.bind(this)
				}, void 0, _jsx(_Modal.Header, {
					closeButton: true
				}, void 0, _jsx(_Modal.Title, {
					className: _component2.default.popHeadingAll
				}, void 0, _ref13)), _jsx(_Modal.Body, {}, void 0, _jsx('div', {
					className: _Registration2.default.modelContainer
				}, void 0, _jsx('div', {
					className: _Registration2.default.modelWrapper
				}, void 0, _ref14))), _jsx(_Modal.Footer, {}, void 0, _jsx('div', {
					className: _Registration2.default.blockSaveAssign
				}, void 0, _jsx('button', {
					id: 'cancel',
					onClick: this.cancelIAgree.bind(this)
				}, void 0, _ref15), _jsx('button', {
					id: 'iAgree',
					className: _Registration2.default.btnSaveAssign,
					onClick: this.handleIAgree.bind(this)
				}, void 0, _ref16)))) : null;
				return _jsx('div', {
					className: _Registration2.default.registerWrapper
				}, void 0, _react2.default.createElement(_lib.ToastContainer, {
					toastMessageFactory: ToastMessageFactory,
					ref: 'regis_container',
					className: 'toast-top-right'
				}), _jsx('div', {
					className: _Registration2.default.customsearch
				}, void 0, _jsx('div', {
					className: _Registration2.default.regLogoBlock
				}, void 0, _ref17), this.state.searchOption ? _jsx('h2', {
					className: _Registration2.default.welcomeTxt
				}, void 0, _jsx('span', {
					className: _Registration2.default.pleaseTxt
				}, void 0, _config2.default.bussinessType == 'LMS' ? _ref18 : _ref19), _jsx('span', {
					className: _Registration2.default.signText
				}, void 0, _ref20, _jsx('a', {
					id: 'signinLink',
					href: '#',
					onClick: this.handleCancel.bind(this),
					className: _Registration2.default.resFormLink
				}, void 0, _ref21))) : null, this.state.searchOption ? _jsx('div', {
					className: cls_inputSearchRegBar
				}, void 0, _jsx('input', (_jsx2 = {
					type: 'text',
					id: 'instituteName',
					className: inputSearchCls,
					placeholder: 'Search Institute',
					value: this.state.input
				}, _defineProperty(_jsx2, 'placeholder', this.context.intl.messages.institute_name), _defineProperty(_jsx2, 'style', this.state.validationError && this.state.validationError.instituteError ? { borderColor: "#ff0000" } : {}), _defineProperty(_jsx2, 'onChange', this.searchCorporate.bind(this)), _defineProperty(_jsx2, 'maxLength', 50), _defineProperty(_jsx2, 'autoFocus', 'true'), _jsx2)), _jsx('label', {
					id: 'instituteError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.instituteError ? this.state.validationError.instituteError : ''), _jsx('span', {
					className: 'input-group-btn'
				}, void 0, _jsx('button', {
					id: 'searchInstitute',
					className: inputIconCls,
					onClick: this.handleSearchIcon.bind(this),
					type: 'button'
				}, void 0, _ref22))) : null), this.state.enabled ? _jsx('div', {
					className: _Registration2.default.searchUsersListBlock
				}, void 0, _jsx('div', {
					className: _Registration2.default.searchUsersListGroup
				}, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
					md: 12
				}, void 0, _jsx('div', {
					className: _Registration2.default.corporateListGroup
				}, void 0, _jsx('ul', {}, void 0, this.state.myCorporateData && this.state.myCorporateData && this.state.myCorporateData.length > 0 ? this.state.myCorporateData.map(function (corporateData) {
					return _jsx('li', {}, corporateData._id, _jsx('a', {
						id: 'addCorporate',
						onClick: _this4.addedCorporate.bind(_this4, corporateData),
						className: 'clearfix'
					}, void 0, _jsx('h4', {
						className: 'pull-left'
					}, void 0, corporateData.businessName), _jsx('div', {
						className: _Registration2.default.userAction
					}, void 0, _ref23)));
				}) : null)), this.state.noDataFound ? _jsx('div', {}, void 0, _jsx('div', {
					className: _Registration2.default.noDataFound
				}, void 0, _ref24, _ref25)) : null)))) : null, this.state.formEnabled ? _jsx('div', {
					className: _Registration2.default.formDisplay
				}, void 0, this.state.loading ? _ref26 : _jsx('div', {}, void 0, _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-md-12'
				}, void 0, _jsx('h1', {
					className: _Registration2.default.regHeader
				}, void 0, 'Registration Form'), _jsx('a', {
					id: 'backButton',
					onClick: this.handleForm.bind(this),
					className: _Registration2.default.backButton
				}, void 0, _ref27), _jsx('div', {
					className: 'row'
				}, void 0, _config2.default.googleEnable || _config2.default.facebookEnable ? _jsx('div', {
					className: 'col-md-12'
				}, void 0, _jsx('div', {
					className: _Registration2.default.thirdParyBlock
				}, void 0, _jsx('div', {
					className: _Registration2.default.googleContainer
				}, void 0, _jsx('div', {
					className: _Registration2.default.googleWrapper
				}, void 0, _config2.default.googleEnable ? _jsx('div', {
					id: 'googleBtn',
					className: cls_singUpBothWidth
				}, void 0, _jsx(_reactGoogleLogin2.default, {
					clientId: '903647599859-u0mbhshajb3jetb6ef82ab60hdbe5h9h.apps.googleusercontent.com',
					onSuccess: this.responseGoogle,
					onFailure: this.responseFailureGoogle,
					style: {
						"display": "inlineBlock",
						"background": "rgb(209, 72, 54)",
						color: "rgb(255, 255, 255)",
						/* width: 190px; */
						"paddingTop": "10px",
						"paddingBottom": "10px",
						"borderRadius": "2px",
						"border": "1px",
						"fontSize": "calc(.27548vw + 12.71074px)",
						"fontWeight": "bold",
						"fontFamily": "Roboto",
						"padding": "calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)",
						"marginRight": "8px"
					}
				}, void 0, _jsx('span', {
					className: _Registration2.default.gIconUp
				}, void 0, _jsx(_reactFontawesome2.default, {
					className: _Registration2.default.gmailIcon,
					name: 'google'
				})), _jsx('span', {
					className: _Registration2.default.gTextUp
				}, void 0, ' Sign up '))) : null, _config2.default.facebookEnable ? _jsx('div', {
					id: 'facebookBtn',
					className: cls_singUpBothWidth
				}, void 0, _jsx(_reactFacebookLogin2.default, {
					appId: _settings2.default.facebookClientId,
					autoLoad: false,
					size: 'medium',
					scope: 'public_profile, email, user_birthday',
					fields: 'name,email,picture.width(100),first_name,last_name,birthday',
					icon: inputGroupClsddd,
					textButton: ' Sign up',
					cssClass: _Registration2.default.fbSignUpButton,
					callback: this.responseFacebook
				})) : null)))) : null, _config2.default.googleEnable || _config2.default.facebookEnable ? _jsx('div', {
					className: 'col-md-12'
				}, void 0, _jsx('div', {
					className: _Registration2.default.registerLine
				})) : null, _jsx('div', {
					className: 'col-md-12'
				}, void 0, _jsx('p', {
					className: _Registration2.default.registerPara
				}, void 0, 'Sign up with InstaVC'))))), _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-md-12'
				}, void 0, _jsx('div', {
					className: _Registration2.default.registerBlock
				}, void 0, _jsx('form', {}, void 0, _jsx('div', {
					className: 'col-sm-12'
				}, void 0, _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-sm-6 form-group'
				}, void 0, _jsx('label', {}, void 0, 'First Name ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _react2.default.createElement('input', { id: 'fName', type: 'text', placeholder: 'Enter First Name Here..', ref: 'fname', className: 'form-control', style: this.state.validationError && this.state.validationError.nameError ? { borderColor: "#ff0000" } : {},
					value: this.state.firstname, onChange: this.handleFName.bind(this), maxLength: 30, autoFocus: 'true' }), _jsx('label', {
					id: 'nameError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.nameError ? this.state.validationError.nameError : '')), _jsx('div', {
					className: 'col-sm-6 form-group'
				}, void 0, _ref28, _react2.default.createElement('input', { id: 'lName', type: 'text', ref: 'lname', placeholder: 'Enter Last Name Here..', className: 'form-control', value: this.state.lastname, onChange: this.handleLName.bind(this), maxLength: 30 }))), _jsx('div', {
					className: 'form-group'
				}, void 0, _jsx('label', {}, void 0, 'Email ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _react2.default.createElement('input', { id: 'email', type: 'text', ref: 'email', placeholder: 'Enter email', style: this.state.validationError && this.state.validationError.emailError ? { borderColor: "#ff0000" } : {},
					className: 'form-control', value: this.state.email, onChange: this.handleEmail.bind(this), maxLength: 50 }), _jsx('label', {
					id: 'emailError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.emailError ? this.state.validationError.emailError : '')), _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-sm-6 form-group'
				}, void 0, _jsx('label', {}, void 0, 'Password ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _react2.default.createElement('input', { id: 'password', type: 'password', ref: 'password', placeholder: 'Enter password..', style: this.state.validationError && this.state.validationError.passwordError ? { borderColor: "#ff0000" } : {},
					className: 'form-control', value: this.state.password, onChange: this.handlePassword.bind(this), maxLength: 30 }), _jsx('label', {
					id: 'passwordError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.passwordError ? this.state.validationError.passwordError : '')), _jsx('div', {
					className: 'col-sm-6 form-group'
				}, void 0, _jsx('label', {}, void 0, 'Confirm Password ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _react2.default.createElement('input', { id: 'confPassword', type: 'password', ref: 'confPassword', style: this.state.validationError && this.state.validationError.confirmPasswordError ? { borderColor: "#ff0000" } : {},
					placeholder: 'Confirm password', className: 'form-control', value: this.state.confPassword, onChange: this.handleConfPassword.bind(this), maxLength: 30 }), _jsx('label', {
					id: 'confirmPasswordError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.confirmPasswordError ? this.state.validationError.confirmPasswordError : ''))), _jsx('div', {
					className: 'form-group'
				}, void 0, _ref29, _react2.default.createElement('input', { id: 'address', type: 'text', placeholder: 'Enter Address Here..', className: 'form-control', ref: 'street', value: this.state.street, onChange: this.handleStreet.bind(this), maxLength: 20 })), _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-sm-4 form-group'
				}, void 0, _jsx('label', {}, void 0, 'City ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _react2.default.createElement('input', { id: 'city', type: 'text', placeholder: 'Enter City Name Here..', className: 'form-control', ref: 'city', value: this.state.city, style: this.state.validationError && this.state.validationError.cityError ? { borderColor: "#ff0000" } : {},
					onChange: this.handleCity.bind(this), maxLength: 20 }), _jsx('label', {
					id: 'cityError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.cityError ? this.state.validationError.cityError : '')), _jsx('div', {
					className: 'col-sm-4 form-group'
				}, void 0, _jsx('label', {}, void 0, 'State/Province ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _react2.default.createElement('input', { id: 'state', type: 'text', placeholder: 'Enter State Name Here..', className: 'form-control', style: this.state.validationError && this.state.validationError.stateError ? { borderColor: "#ff0000" } : {},
					ref: 'province', value: this.state.province, onChange: this.handleState.bind(this), maxLength: 20 }), _jsx('label', {
					id: 'stateError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.stateError ? this.state.validationError.stateError : '')), _jsx('div', {
					className: 'col-sm-4 form-group'
				}, void 0, _ref30, _react2.default.createElement('input', { id: 'zip', type: 'text', placeholder: 'Enter Zip or Pin Code Here..', className: 'form-control', ref: 'zip', value: this.state.zip, onChange: this.handleZip.bind(this), maxLength: 10 }), _jsx('label', {
					id: 'zipError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.zipError ? this.state.validationError.zipError : ''))), _jsx('div', {
					className: 'form-group'
				}, void 0, _ref31, _react2.default.createElement(
					'select',
					{ id: '', name: 'selectCountry', className: 'form-control', onChange: this.handleCountry.bind(this), ref: 'country' },
					_ref32,
					_ref33,
					_ref34,
					_ref35,
					_ref36,
					_ref37,
					_ref38,
					_ref39,
					_ref40,
					_ref41,
					_ref42,
					_ref43,
					_ref44,
					_ref45,
					_ref46,
					_ref47,
					_ref48,
					_ref49,
					_ref50,
					_ref51,
					_ref52,
					_ref53,
					_ref54,
					_ref55,
					_ref56,
					_ref57,
					_ref58,
					_ref59,
					_ref60,
					_ref61,
					_ref62,
					_ref63,
					_ref64,
					_ref65,
					_ref66,
					_ref67,
					_ref68,
					_ref69,
					_ref70,
					_ref71,
					_ref72,
					_ref73,
					_ref74,
					_ref75,
					_ref76,
					_ref77,
					_ref78,
					_ref79,
					_ref80,
					_ref81,
					_ref82,
					_ref83,
					_ref84,
					_ref85,
					_ref86,
					_ref87,
					_ref88,
					_ref89,
					_ref90,
					_ref91,
					_ref92,
					_ref93,
					_ref94,
					_ref95,
					_ref96,
					_ref97,
					_ref98,
					_ref99,
					_ref100,
					_ref101,
					_ref102,
					_ref103,
					_ref104,
					_ref105,
					_ref106,
					_ref107,
					_ref108,
					_ref109,
					_ref110,
					_ref111,
					_ref112,
					_ref113,
					_ref114,
					_ref115,
					_ref116,
					_ref117,
					_ref118,
					_ref119,
					_ref120,
					_ref121,
					_ref122,
					_ref123,
					_ref124,
					_ref125,
					_ref126,
					_ref127,
					_ref128,
					_ref129,
					_ref130,
					_ref131,
					_ref132,
					_ref133,
					_ref134,
					_ref135,
					_ref136,
					_ref137,
					_ref138,
					_ref139,
					_ref140,
					_ref141,
					_ref142,
					_ref143,
					_ref144,
					_ref145,
					_ref146,
					_ref147,
					_ref148,
					_ref149,
					_ref150,
					_ref151,
					_ref152,
					_ref153,
					_ref154,
					_ref155,
					_ref156,
					_ref157,
					_ref158,
					_ref159,
					_ref160,
					_ref161,
					_ref162,
					_ref163,
					_ref164,
					_ref165,
					_ref166,
					_ref167,
					_ref168,
					_ref169,
					_ref170,
					_ref171,
					_ref172,
					_ref173,
					_ref174,
					_ref175,
					_ref176,
					_ref177,
					_ref178,
					_ref179,
					_ref180,
					_ref181,
					_ref182,
					_ref183,
					_ref184,
					_ref185,
					_ref186,
					_ref187,
					_ref188,
					_ref189,
					_ref190,
					_ref191,
					_ref192,
					_ref193,
					_ref194,
					_ref195,
					_ref196,
					_ref197,
					_ref198,
					_ref199,
					_ref200,
					_ref201,
					_ref202,
					_ref203,
					_ref204,
					_ref205,
					_ref206,
					_ref207,
					_ref208,
					_ref209,
					_ref210,
					_ref211,
					_ref212,
					_ref213,
					_ref214,
					_ref215,
					_ref216,
					_ref217,
					_ref218,
					_ref219,
					_ref220,
					_ref221,
					_ref222,
					_ref223,
					_ref224,
					_ref225,
					_ref226,
					_ref227,
					_ref228,
					_ref229,
					_ref230,
					_ref231,
					_ref232,
					_ref233,
					_ref234,
					_ref235,
					_ref236,
					_ref237,
					_ref238,
					_ref239,
					_ref240,
					_ref241,
					_ref242,
					_ref243,
					_ref244,
					_ref245,
					_ref246,
					_ref247,
					_ref248,
					_ref249,
					_ref250,
					_ref251,
					_ref252,
					_ref253,
					_ref254,
					_ref255,
					_ref256,
					_ref257,
					_ref258,
					_ref259,
					_ref260,
					_ref261,
					_ref262,
					_ref263,
					_ref264,
					_ref265,
					_ref266,
					_ref267,
					_ref268,
					_ref269,
					_ref270,
					_ref271
				)), _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-sm-6 form-group'
				}, void 0, _ref272, _react2.default.createElement(
					'div',
					{ className: _Registration2.default.genderBlock, id: '', ref: 'gender', onChange: this.handleGender.bind(this) },
					_ref273,
					_jsx('span', {
						className: _Registration2.default.genderText
					}, void 0, _ref274),
					_jsx('input', {
						id: 'radioFemale',
						type: 'radio',
						className: _Registration2.default.genderInput,
						name: 'gender',
						value: 'Female'
					}),
					_jsx('span', {
						className: _Registration2.default.genderText
					}, void 0, _ref275)
				)), _jsx('div', {
					id: 'dob',
					className: 'col-sm-6 form-group'
				}, void 0, _jsx('label', {}, void 0, 'DOB ', _jsx('span', {
					className: _Registration2.default.starMandatory
				}, void 0, '*')), _jsx(_reactBootstrapDatetimepicker2.default, {
					dateTime: DateOfBirth,
					format: DateOfBirthFormat,
					inputFormat: DateOfBirthInputFormat,
					onChange: this.handleDateOfBirth.bind(this),
					mode: DateOfBirthMode,
					maxDate: (0, _moment2.default)().subtract(1, "days")
				}), _jsx('label', {
					id: 'dobError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.dateError ? this.state.validationError.dateError : ''))), _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-xs-12'
				}, void 0, _jsx('div', {
					className: _Registration2.default.checkbox
				}, void 0, _jsx('label', {}, void 0, _jsx('span', {
					className: _Registration2.default.DisclaimerCheck
				}, void 0, _react2.default.createElement('input', (_React$createElement = { id: 'checkbox', type: 'checkbox', ref: 'checkBox' }, _defineProperty(_React$createElement, 'id', ''), _defineProperty(_React$createElement, 'value', 'Disclaimer & Read Terms of User'), _defineProperty(_React$createElement, 'value', this.state.checkBox), _defineProperty(_React$createElement, 'style', this.state.validationError && this.state.validationError.checkboxError ? { borderColor: "#ff0000" } : {}), _defineProperty(_React$createElement, 'onChange', this.handleEnable), _defineProperty(_React$createElement, 'checked', this.state.checkBox), _React$createElement)), _jsx('label', {
					id: 'checkboxError',
					className: _component2.default.errorPre
				}, void 0, this.state.validationError && this.state.validationError.checkboxError ? this.state.validationError.checkboxError : '')), _jsx('span', {
					className: _Registration2.default.DisclaimerText
				}, void 0, ' I agree with the '), _jsx('span', {}, void 0, _jsx('a', {
					id: 'termsAndConditions',
					href: '#',
					onClick: this.handleTermsnConditions.bind(this),
					className: _Registration2.default.resFormLink
				}, void 0, 'Terms & Conditions')))), showAgreementModal)), _jsx('div', {
					className: 'row'
				}, void 0, _jsx('div', {
					className: 'col-sm-12'
				}, void 0, _jsx('div', {
					className: _Registration2.default.bottomAction
				}, void 0, _jsx('button', {
					id: 'saveSubmit',
					type: 'button',
					className: _Registration2.default.regBtn,
					onClick: this.saveStudentData.bind(this)
				}, void 0, 'Register'), _jsx('span', {
					className: _Registration2.default.signInButton
				}, void 0, _ref276, _jsx('a', {
					id: 'cancel',
					href: '#',
					className: _Registration2.default.linkTxt,
					onClick: this.handleCancel.bind(this)
				}, void 0, 'Sign in')))))))))))) : null);
			}
		}, {
			key: 'render',
			value: function render() {
				var cls = '' + _Registration2.default.RegBox; // ${mainStyle.bgPrimaryDark}
				var objRenderForm = this.renderForm();
	
				return _jsx('div', {
					className: cls
				}, void 0, objRenderForm);
			}
		}]);
	
		return RegistrationForm;
	}(_react.Component);
	
	RegistrationForm.contextTypes = {
		intl: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactIntl.injectIntl)(RegistrationForm);

/***/ }

};;