exports.ids = [84];
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

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UserProfile = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(64);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactRouter = __webpack_require__(3);
	
	var _LoginReducer = __webpack_require__(20);
	
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
	
	var _ProfessionalProfileActions = __webpack_require__(171);
	
	var _ProfessionalProfileReducer = __webpack_require__(172);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactIntl = __webpack_require__(11);
	
	var _PersonalData = __webpack_require__(443);
	
	var _PersonalData2 = _interopRequireDefault(_PersonalData);
	
	var _ProfessionalData = __webpack_require__(444);
	
	var _ProfessionalData2 = _interopRequireDefault(_ProfessionalData);
	
	var _AllConnections = __webpack_require__(442);
	
	var _AllConnections2 = _interopRequireDefault(_AllConnections);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UserProfile = exports.UserProfile = function (_Component) {
	  _inherits(UserProfile, _Component);
	
	  function UserProfile(props) {
	    _classCallCheck(this, UserProfile);
	
	    var _this = _possibleConstructorReturn(this, (UserProfile.__proto__ || Object.getPrototypeOf(UserProfile)).call(this, props));
	
	    _this.state = {
	      allConnections: false,
	      id: ''
	    };
	    return _this;
	  }
	
	  _createClass(UserProfile, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.setState({
	        id: this.props.params.uid
	      });
	      this.props.dispatch((0, _ProfessionalProfileActions.getUserDataRequest)(this.props.params.uid));
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (prevProps == undefined) {
	        return false;
	      }
	      if (this.state.id != this.props.params.uid) {
	        this.props.dispatch((0, _ProfessionalProfileActions.getUserDataRequest)(this.props.params.uid));
	        this.setState({
	          id: this.props.params.uid,
	          allConnections: false
	        });
	      }
	    }
	  }, {
	    key: 'handleAllConnections',
	    value: function handleAllConnections() {
	      this.setState({
	        allConnections: !this.state.allConnections //Flip boolean value
	      });
	    }
	  }, {
	    key: 'viewConnections',
	    value: function viewConnections() {
	      var _this2 = this;
	
	      var contactData = this.props.professionalProfileData.data.contacts;
	      var viewConnectionsArray = [];
	      contactData.map(function (contactData, i) {
	        if (contactData.status === 1) {
	          var imgSrc = void 0;
	          var randomNumber = Math.floor(Math.random(0 - 9) * 1000 * 2);
	          var currentCompanyObject = _.find(contactData._id.profile.experience.workplace, ['present', true]);
	          var currentRole;
	          if (currentCompanyObject != undefined) {
	            currentRole = currentCompanyObject.position;
	          } else {
	            currentRole = contactData._id.profile.position;
	          }
	          var image = contactData._id.profile.profileImage;
	          if (image == '' || image == undefined || image == null) {
	            imgSrc = '/images/profile-pics/defaultStudent.jpg';
	          } else {
	            imgSrc = "/uploads/" + contactData._id.profile.profileImage;
	          }
	          viewConnectionsArray.push(_jsx('ul', {}, randomNumber, _jsx('li', {}, void 0, _jsx('a', {
	            className: 'clearfix'
	          }, void 0, _jsx('div', {
	            className: _Dashboard2.default.avatarCircle32
	          }, void 0, _jsx('img', {
	            id: 'viewprofile',
	            src: imgSrc,
	            onClick: _this2.viewUser.bind(_this2, contactData._id._id),
	            title: _this2.props.intl.messages.viewprofile
	          })), _jsx('div', {
	            className: _Dashboard2.default.connectionListDetails
	          }, void 0, _jsx('h2', {}, void 0, contactData._id.firstname || "", ' ', contactData._id.lastname || ""), _jsx('p', {
	            className: currentRole ? "" : _Dashboard2.default.emptyString
	          }, void 0, currentRole || " "))))));
	        }
	      });
	      if (viewConnectionsArray.length > 0) {
	        return viewConnectionsArray;
	      } else {
	        return ["No Connections"];
	      }
	    }
	  }, {
	    key: 'viewUser',
	    value: function viewUser(id) {
	      _reactRouter.browserHistory.push('/profile/' + id);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var cls_profileAvatarBlock = _Dashboard2.default.profileAvatarBlock + ' clearfix';
	      // console.log("props", this.props.professionalProfileData);
	
	      return _jsx('div', {}, void 0, this.props.professionalProfileData && this.props.professionalProfileData.data && this.props.professionalProfileData.data.profile ? _jsx(_reactBootstrap.Grid, {
	        fluid: true
	      }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.fixedProfileContainer
	      }, void 0, _jsx(_PersonalData2.default, {
	        data: this.props.professionalProfileData.data
	      }), _jsx(_ProfessionalData2.default, {
	        viewAllConnectionsCallback: this.handleAllConnections.bind(this),
	        userData: this.props.professionalProfileData.data,
	        viewAllConnectionsStatus: this.state.allConnections,
	        viewAllConnectionsData: this.viewConnections.bind(this)
	      }), this.state.allConnections ? _jsx(_AllConnections2.default, {
	        hideAllConnectionsCallback: this.handleAllConnections.bind(this),
	        userData: this.props.professionalProfileData.data,
	        viewAllConnectionsData: this.viewConnections.bind(this)
	      }) : null)))) : null);
	    }
	  }]);
	
	  return UserProfile;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    professionalProfileData: (0, _ProfessionalProfileReducer.professionalProfileData)(state)
	  };
	}
	
	UserProfile.contextTypes = {
	  router: _react2.default.PropTypes.object,
	  intl: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(UserProfile));

/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	/*  */
	
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactDom = __webpack_require__(64);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _Modal = __webpack_require__(52);
	
	var _reactRedux = __webpack_require__(16);
	
	var _detectNode = __webpack_require__(87);
	
	var _detectNode2 = _interopRequireDefault(_detectNode);
	
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
	
	var _reactRouter = __webpack_require__(3);
	
	var _LoginActions = __webpack_require__(21);
	
	var _ProfileActions = __webpack_require__(145);
	
	var _ProfileReducer = __webpack_require__(146);
	
	var _AuthController = __webpack_require__(9);
	
	var _AuthController2 = _interopRequireDefault(_AuthController);
	
	var _lib = __webpack_require__(45);
	
	var _reactIntl = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var FileAPI = !_detectNode2.default ? __webpack_require__(89) : null;
	
	//var AvatarCropper = require("react-avatar-cropper");
	
	var isClient = typeof window !== "undefined";
	var AvatarCropper = isClient ? __webpack_require__(429) : function () {};
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'profile_picture'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'remove'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'upload_new'
	});
	
	var _ref4 = _jsx('i', {
	  className: 'fa fa-camera'
	});
	
	var ViewImage = _react2.default.createClass({
	  displayName: 'ViewImage',
	
	  getInitialState: function getInitialState() {
	    return {
	      showImageModal: false,
	      url: "",
	      cropperOpen: false,
	      img: null,
	      croppedImg: "",
	      file: "",
	      userId: "",
	      sourceImage: "/images/profile-pics/defaultStudent.jpg"
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    if (this.props.srcUrl) {
	      this.setState({
	        sourceImage: '/uploads/' + this.props.srcUrl,
	        userId: this.props.userData
	      });
	    } else if (this.props.srcUrl == '') {
	      this.setState({
	        sourceImage: "/images/profile-pics/defaultStudent.jpg"
	      });
	    }
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    // console.log("nextProps === ",nextProps.srcUrl);
	    if (nextProps.srcUrl) {
	      this.setState({
	        sourceImage: '/uploads/' + nextProps.srcUrl,
	        userId: this.props.userData
	      });
	    } else if (nextProps.srcUrl == '' || nextProps.srcUrl == undefined || nextProps.srcUrl == null) {
	      this.setState({
	        sourceImage: "/images/profile-pics/defaultStudent.jpg",
	        userId: this.props.userData
	      });
	    }
	  },
	  /*componentWillMount : function() {
	    console.log("in ViewImage-------",this.props.srcUrl);
	    this.setState({
	      userId:this.props.userData,
	    });
	  },*/
	  handleViewImage: function handleViewImage() {
	    if (this.props.isUser) {
	      var image = this.props.srcUrl;
	      if (image == '' || image == undefined || image == null) {
	        this.setState({
	          showImageModal: false
	        });
	      } else {
	        this.setState({
	          showImageModal: true,
	          img: '/uploads/' + this.props.srcUrl,
	          cropperOpen: false
	          // sourceImage:'/uploads/'+this.props.loggedInData.data.profile.profileImage,
	        });
	      }
	    }
	  },
	  hideImageModal: function hideImageModal() {
	    this.setState({
	      showImageModal: false,
	      img: '/uploads/' + this.props.srcUrl
	    });
	  },
	
	
	  handleFileChange: function handleFileChange(dataURI, file) {
	    this.setState({
	      img: dataURI,
	      croppedImg: this.state.croppedImg,
	      cropperOpen: true,
	      showImageModal: false,
	      file: file,
	      sourceImage: this.state.sourceImage
	    });
	  },
	  handleCrop: function handleCrop(dataURI) {
	    var props = this.props;
	    var self = this;
	    var newImage = dataURI.replace(/^data:image\/(png|jpg|image|jpeg);base64,/, '');
	    var url = "/api/profileupload";
	    var data = { img: newImage, name: this.state.file.name, type: this.state.file.type, size: this.state.file.size, uid: this.props.userData };
	    FileAPI.upload({
	      data: data,
	      url: url,
	      complete: function complete(err, res) {
	        if (err) {
	          console.log("err---", err);
	          self.setState({ sourceImage: self.props.srcUrl ? '/uploads/' + self.props.srcUrl : "/images/profile-pics/defaultStudent.jpg" });
	          self.refs.container.error(err);
	        } else {
	          // console.log("file uploaded:", res);
	          if (res.status) {
	            self.refs.container.success("Uploaded successfully.");
	            props.dispatch((0, _LoginActions.isLoggedIn)(_AuthController2.default.getSession())).then(function (res) {
	              var resimage = res.data && res.data.profile && res.data.profile.profileImage ? res.data.profile.profileImage : self.state.sourceImage;
	              var image = '/uploads/' + resimage;
	              self.setState({ sourceImage: image });
	              props.dispatch((0, _LoginActions.getProfileImage)({ uid: res.data._id }));
	            });
	          } else {
	            console.log("Upload Fail");
	            self.setState({ sourceImage: '/uploads/' + self.props.srcUrl });
	            self.refs.container.error(err.error);
	          }
	        }
	      }
	    });
	
	    this.setState({
	      cropperOpen: false,
	      img: null,
	      croppedImg: dataURI,
	      sourceImage: dataURI
	    });
	  },
	  handleRequestHide: function handleRequestHide() {
	    this.setState({
	      cropperOpen: false
	    });
	  },
	  handleRemoveImage: function handleRemoveImage() {
	    var self = this;
	    var props = this.props;
	    alertify.confirm(this.props.intl.messages.warning, this.props.intl.messages.delete_Profile_image_alert, function (result) {
	      if (result) {
	        props.dispatch((0, _ProfileActions.removeProfileImage)({})).then(function (res) {
	          return self.clearimage(res);
	        });
	      }
	    }, function () {}).setting('labels', { 'ok': this.props.intl.messages.ok, 'cancel': this.props.intl.messages.cancel });
	  },
	  clearimage: function clearimage() {
	    this.props.dispatch((0, _LoginActions.ClearImage)());
	    this.setState({
	      showImageModal: false,
	      sourceImage: '/images/profile-pics/defaultStudent.jpg'
	    });
	    this.refs.container.success("Removed Successfully.");
	  },
	
	
	  handleFile: function handleFile(e) {
	    var reader = new FileReader();
	    var file = e.target.files[0];
	    // console.log("file------");
	    // console.log(file);
	    if (!file || file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
	      return this.refs.container.error("Invalid File Format:Only jpeg, jpg, png file formats supported");
	    } else if (file.size > 5242880) {
	      return this.refs.container.error("File Size should be less than 5MB!..");
	    }
	
	    reader.onload = function (img) {
	      _reactDom2.default.findDOMNode(this.refs.in).value = '';
	      this.handleFileChange(img.target.result, file);
	    }.bind(this);
	    reader.readAsDataURL(file);
	  },
	
	  render: function render() {
	    var img = '/uploads/' + this.props.srcUrl;
	    var showImageModal = this.state.showImageModal ? _jsx('div', {}, void 0, _jsx(_reactBootstrap.Modal, {
	      show: this.state.showImageModal,
	      onHide: this.hideImageModal
	    }, void 0, _jsx(_Modal.Header, {
	      closeButton: true
	    }, void 0, _jsx(_Modal.Title, {
	      className: _Admin2.default.proPicEdit
	    }, void 0, _ref)), _jsx(_Modal.Body, {}, void 0, _jsx('div', {
	      className: _Admin2.default.avatarImgView
	    }, void 0, _jsx('img', {
	      src: img
	    }))), this.props.changeImage == true ? _jsx(_Modal.Footer, {
	      className: 'clearfix'
	    }, void 0, _jsx('button', {
	      className: _Admin2.default.btnAllCancel,
	      onClick: this.handleRemoveImage
	    }, void 0, _ref2), _jsx('div', {
	      className: _Admin2.default.viewImgFtrAction
	    }, void 0, _jsx('label', {
	      className: _Admin2.default.btnApplyAll
	    }, void 0, _react2.default.createElement('input', { id: 'uploadProfile', ref: 'in', type: 'file', accept: '.png,.jpeg,.jpg', className: _Admin2.default.avatarImgupload, onChange: this.handleFile }), _ref3))) : null)) : null;
	    var cls_avatar = this.props.from == "PERSONAL" ? '' + _Admin2.default.profileAvatarPhoto : '' + _Admin2.default.avatarPhoto;
	    return _jsx('div', {}, void 0, _react2.default.createElement(_lib.ToastContainer, {
	      toastMessageFactory: ToastMessageFactory,
	      ref: 'container',
	      className: 'toast-top-right'
	    }), _jsx('div', {
	      className: cls_avatar
	    }, void 0, this.props.changeImage == true ? _jsx('div', {
	      className: _Admin2.default.avatarEdit,
	      title: 'Change profile image'
	    }, void 0, _jsx(ImageCropComponent, {
	      handleFileChange: this.handleFileChange
	    }), _ref4) : null, _jsx('img', {
	      id: 'targetImg',
	      src: this.state.sourceImage,
	      className: _Admin2.default.imgCrop,
	      onClick: this.handleViewImage
	    })), showImageModal, this.state.cropperOpen && _jsx(AvatarCropper, {
	      onRequestHide: this.handleRequestHide,
	      cropperOpen: this.state.cropperOpen,
	      onCrop: this.handleCrop,
	      image: this.state.img,
	      width: 268,
	      height: 268,
	      modalSize: 'sm'
	    }));
	  }
	});
	
	var ImageCropComponent = _react2.default.createClass({
	  displayName: 'ImageCropComponent',
	
	
	  handleFile: function handleFile(e) {
	    var reader = new FileReader();
	    var file = e.target.files[0];
	    // console.log("file------");
	    // console.log(file);
	    if (!file || file.type != 'image/png' && file.type != 'image/jpeg' && file.type != 'image/jpg') {
	      return this.refs.container.error("Invalid File Format:Only jpeg, jpg, png file formats supported");
	    } else if (file.size > 5242880) {
	      return this.refs.container.error("File Size should be less than 5MB!..");
	    }
	
	    reader.onload = function (img) {
	      _reactDom2.default.findDOMNode(this.refs.in).value = '';
	      this.props.handleFileChange(img.target.result, file);
	    }.bind(this);
	    reader.readAsDataURL(file);
	  },
	
	  render: function render() {
	    return _jsx('div', {}, void 0, _react2.default.createElement(_lib.ToastContainer, {
	      toastMessageFactory: ToastMessageFactory,
	      ref: 'container',
	      className: 'toast-top-right'
	    }), _react2.default.createElement('input', { id: 'uploadProfile', ref: 'in', type: 'file', accept: '.png,.jpeg,.jpg', onChange: this.handleFile }));
	  }
	});
	
	function mapStateToProps(state) {
	  return {
	    intl: state.intl,
	    profileData: (0, _ProfileReducer.profileData)(state)
	  };
	}
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(ViewImage);

/***/ },

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AllConnections = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(64);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactRouter = __webpack_require__(3);
	
	var _LoginActions = __webpack_require__(21);
	
	var _LoginReducer = __webpack_require__(20);
	
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
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactIntl = __webpack_require__(11);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx('img', {
	  src: '/images/black-icons/delete-black.png'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'All Connections'
	});
	
	var AllConnections = exports.AllConnections = function (_Component) {
	  _inherits(AllConnections, _Component);
	
	  function AllConnections(props) {
	    _classCallCheck(this, AllConnections);
	
	    return _possibleConstructorReturn(this, (AllConnections.__proto__ || Object.getPrototypeOf(AllConnections)).call(this, props));
	  }
	
	  _createClass(AllConnections, [{
	    key: 'hideAllConnections',
	    value: function hideAllConnections() {
	      this.props.hideAllConnectionsCallback();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var userData = this.props.userData.profile;
	      var userCount = 0;
	      var contactData = this.props.userData.contacts;
	
	      for (var i = 0; i < contactData.length; i++) {
	        if (contactData[i].status === 1) {
	          userCount = userCount + 1;
	        }
	      }
	
	      return _jsx('div', {
	        className: _Dashboard2.default.viewAllList
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.viewAllHeader
	      }, void 0, _jsx('div', {
	        id: 'close',
	        className: _Dashboard2.default.hideViewList,
	        title: this.props.intl.messages.hide,
	        onClick: this.hideAllConnections.bind(this)
	      }, void 0, _ref), _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _jsx('h2', {}, void 0, _ref2, ': ', _jsx('span', {}, void 0, '(', userCount, ')')))), _jsx('div', {
	        className: _Dashboard2.default.viewAllBody
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.connectionList
	      }, void 0, this.props.viewAllConnectionsData())));
	    }
	  }]);
	
	  return AllConnections;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    loggedInData: (0, _LoginReducer.loggedInData)(state)
	
	  };
	}
	
	AllConnections.contextTypes = {
	  router: _react2.default.PropTypes.object,
	  intl: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(AllConnections));

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PersonalData = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _AuthController = __webpack_require__(9);
	
	var _AuthController2 = _interopRequireDefault(_AuthController);
	
	var _reactDom = __webpack_require__(64);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactRouter = __webpack_require__(3);
	
	var _LoginActions = __webpack_require__(21);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _ConferenceReducer = __webpack_require__(47);
	
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
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactIntl = __webpack_require__(11);
	
	var _SocketHandler = __webpack_require__(32);
	
	var _SocketHandler2 = _interopRequireDefault(_SocketHandler);
	
	var _UserDashboardActions = __webpack_require__(24);
	
	var _RightBarActions = __webpack_require__(67);
	
	var _ChatActions = __webpack_require__(30);
	
	var _lib = __webpack_require__(45);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _ViewImage = __webpack_require__(404);
	
	var _ViewImage2 = _interopRequireDefault(_ViewImage);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ = __webpack_require__(7);
	
	var _ref = _jsx('br', {});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'accept'
	});
	
	var _ref3 = _jsx(_reactFontawesome2.default, {
	  name: 'check-square'
	});
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'reject'
	});
	
	var _ref5 = _jsx(_reactFontawesome2.default, {
	  name: 'times'
	});
	
	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'message'
	});
	
	var _ref7 = _jsx(_reactFontawesome2.default, {
	  name: 'comment'
	});
	
	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'request_pending'
	});
	
	var _ref9 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Connection_Request'
	});
	
	var _ref10 = _jsx(_reactFontawesome2.default, {
	  name: 'paper-plane'
	});
	
	var _ref11 = _jsx('h2', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'about_me'
	}), ':');
	
	var _ref12 = _jsx('h2', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'Personal_Information'
	}), ':');
	
	var _ref13 = _jsx('p', {}, void 0, _jsx('span', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'envelope-o'
	})), ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'email'
	}), ' :');
	
	var _ref14 = _jsx('p', {}, void 0, _jsx('span', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'mobile'
	})), '  ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'phne'
	}), ' :');
	
	var _ref15 = _jsx('h2', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'Current'
	}), ':');
	
	var _ref16 = _jsx('p', {}, void 0, _jsx('span', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'building-o'
	})), ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'work_education_company'
	}), ' :');
	
	var _ref17 = _jsx('p', {}, void 0, _jsx('span', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'user'
	})), ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'role'
	}), ' :');
	
	var _ref18 = _jsx('p', {}, void 0, _jsx('span', {}, void 0, _jsx(_reactFontawesome2.default, {
	  name: 'user'
	})), ' ', _jsx(_reactIntl.FormattedMessage, {
	  id: 'department'
	}), ' :');
	
	var PersonalData = exports.PersonalData = function (_Component) {
	  _inherits(PersonalData, _Component);
	
	  function PersonalData(props) {
	    _classCallCheck(this, PersonalData);
	
	    var _this = _possibleConstructorReturn(this, (PersonalData.__proto__ || Object.getPrototypeOf(PersonalData)).call(this, props));
	
	    _this.handleConnection = function () {
	      var obj = {
	        userId: _this.current_uid,
	        from: "PERSONAL"
	      };
	      _this.props.dispatch((0, _LoginActions.AddUsertoContact)(obj)).then(function (res) {
	        return _this.showresponse(res);
	      });
	    };
	
	    _this.handleAccept = function () {
	      var obj = {
	        userId: _this.current_uid,
	        response: _UserDashboardActions.contactRequest.Accept,
	        from: "PERSONAL"
	      };
	      _this.props.dispatch((0, _LoginActions.requestResponse)(obj)).then(function (res) {
	        return _this.setresponse(res);
	      });
	    };
	
	    _this.handleReject = function () {
	      var obj = {
	        userId: _this.current_uid,
	        response: _UserDashboardActions.contactRequest.Reject,
	        from: "PERSONAL"
	      };
	      _this.props.dispatch((0, _LoginActions.requestResponse)(obj)).then(function (res) {
	        return _this.setresponse(res);
	      });
	    };
	
	    _this.handleMessage = function () {
	      var lastname = _this.props.data.lastname ? _this.props.data.lastname : '';
	      var obj = {
	        id: _this.current_uid,
	        activeData: {
	          _id: _this.current_uid,
	          firstname: _this.props.data.firstname,
	          lastname: lastname,
	          email: _this.props.data.email
	        },
	        chatType: "Indi"
	      };
	      _this.props.dispatch((0, _RightBarActions.setRightBar)({ current: 'chats' }));
	      _this.props.dispatch((0, _ChatActions.clearChatNotification)(obj));
	      _reactRouter.browserHistory.push("/dashboard");
	    };
	
	    _this.current_uid = null;
	    return _this;
	  }
	
	  _createClass(PersonalData, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.props.dispatch((0, _LoginActions.isLoggedIn)(_AuthController2.default.getSession()));
	    }
	  }, {
	    key: 'goBack',
	    value: function goBack() {
	      history.back(1);
	    }
	  }, {
	    key: 'showresponse',
	    value: function showresponse(response) {
	      var socketObj = {
	        command: "ADD-CONT",
	        obj: {
	          uid: this.props.loggedInData.data._id,
	          userId: this.current_uid
	        }
	      };
	      _SocketHandler2.default.sendInstaMessage(socketObj, this.current_uid);
	      if (response.status) {
	        this.refs.personal_container.success(response.message, '');
	      } else if (response.error) {
	        this.refs.personal_container.error(response.error, '');
	      }
	    }
	  }, {
	    key: 'setresponse',
	    value: function setresponse(response) {
	      if (response.status) {
	        this.refs.personal_container.success(response.message, '');
	      } else if (response.error) {
	        this.refs.personal_container.error(response.error, '');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var cls_profileAvatarBlock = _Dashboard2.default.profileAvatarBlock + ' clearfix';
	      var cls_connectionRequest = {
	        marginTop: '16px'
	      };
	
	      var profileImagePath;
	      var image = this.props.data.profile.profileImage;
	      if (image == '' || image == undefined || image == null) {
	        profileImagePath = '/images/profile-pics/defaultStudent.jpg';
	      } else {
	        profileImagePath = '/uploads/' + image;
	      }
	
	      var currentCompanyObject = _.find(this.props.data.profile.experience.workplace, ['present', true]);
	      var currentRole;
	      if (currentCompanyObject != undefined) {
	        var currentCompany = currentCompanyObject.company;
	        currentRole = currentCompanyObject.position;
	      } else {
	        currentRole = this.props.data.profile.position;
	      }
	
	      var time;
	      if (this.props.data.profile.experience.workplace.length > 0) {
	        var totalExp = 0;
	        for (var i = 0; i < this.props.data.profile.experience.workplace.length; i++) {
	          var data = this.props.data.profile.experience.workplace[i];
	          if (this.props.data.profile.experience.workplace[i].yearTo != null) {
	            var yearFrom = (0, _moment2.default)(data.yearFrom);
	            var yearTo = (0, _moment2.default)(data.yearTo);
	            //totalExp += yearTo.diff(yearFrom)
	            var years = yearTo.diff(yearFrom, 'year');
	            yearFrom.add(years, 'years');
	            var months = yearTo.diff(yearFrom, 'months');
	            time = years + ' ' + 'years' + ' ' + months + ' ' + 'months';
	          } else {
	            var now = (0, _moment2.default)();
	            var yearFrom = (0, _moment2.default)(data.yearFrom);
	            //totalExp += now.diff(yearFrom)
	            var years = now.diff(yearFrom, 'year');
	            yearFrom.add(years, 'years');
	            var months = now.diff(yearFrom, 'months');
	            time = years + ' ' + 'years' + ' ' + months + ' ' + 'months';
	          }
	        }
	
	        //var minutes =  Math.floor(totalExp/60000);
	
	        // if (minutes < 1) {
	        //   time =  "just now";
	        // } else if (minutes < 60) {
	        //     if (minutes == 1) {
	        //       time =  '( ' + timeDif + " Minute Exp )";
	        //     }
	        //   time =  minutes + " Minutes Exp"; 
	        // } else if ( (minutes < 1440 ) && (minutes >= 60) ) {
	        //     if (minutes/60 == 1) {
	        //       time =  '( ' + Math.floor(minutes/60) + " Hour Exp )";   
	        //     }
	        //   time =  '( ' + Math.floor(minutes/60) + " Hours " + 
	        //    (minutes - Math.floor(minutes/60)*60) + " Minutes Exp )";
	        // } else if ( minutes >= 1440) {
	        //     if (minutes/1440 == 1) {
	        //       time =  '( ' + Math.floor(minutes/1440) + " Day Exp )";   
	        //     }
	        //   time =  '( ' + Math.floor(minutes/1440) + " Days Exp )"; 
	        // } else if ( minutes >= 43200) {
	        //     if (minutes/43200 == 1) {
	        //       time =  '( ' + Math.floor(minutes/43200) + " Month Exp )";   
	        //     }
	        //   time =  '( ' + Math.floor(minutes/43200) + " Months " + 
	        //     (Math.floor(minutes - 43200)/1440) + " Days Exp )";
	        // } else if ( minutes >= 518400) {
	        //     if (minutes/518400 == 1) {
	        //       time =  '( ' + Math.floor(minutes/518400) + " Year Exp )";   
	        //     }
	        //   time =  '( ' + Math.floor(minutes/518400) + " Years " + 
	        //     (Math.floor(minutes - 518400)/43200) + " Months Exp )";
	        // }
	      } else {
	        time = '';
	      }
	      var conferenceOnlineStatus = this.props.conferenceDetails.onlineStatus;
	      var userDataId = this.props.data._id;
	      var userDataContacts = this.props.data.contacts;
	      var contactStatus = void 0;
	      var loggedInUserId = this.props.loggedInData.data._id;
	
	      for (var i = 0; i < userDataContacts.length; i++) {
	        if (_.isEqual(userDataContacts[i]._id._id, loggedInUserId) && userDataContacts[i].status === 1 && conferenceOnlineStatus.includes(userDataId) == true) {
	          contactStatus = true;
	          break;
	        } else if (_.isEqual(userDataContacts[i]._id._id, loggedInUserId) && userDataContacts[i].status === 1 && conferenceOnlineStatus.includes(userDataId) == false) {
	          contactStatus = false;
	          break;
	        }
	      }
	
	      this.current_uid = this.props.data._id;
	      var that = this;
	      var connection_status = -1;
	      if (this.props.data._id == this.props.loggedInData.data._id) {
	        connection_status = null;
	      } else {
	        var index = _.findIndex(this.props.loggedInData.data.contacts, function (o) {
	          return o._id == that.current_uid;
	        });
	        if (index > -1) {
	          var obj = this.props.loggedInData.data.contacts[index];
	          connection_status = obj.status;
	        }
	      }
	      console.log(" ", connection_status);
	      return _jsx('div', {
	        className: _Dashboard2.default.viewIndiProfileBlock
	      }, void 0, _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'personal_container',
	        className: 'toast-top-right'
	      }), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 12
	      }, void 0, _jsx('div', {
	        id: 'goBack',
	        className: _Dashboard2.default.backButtonBlock,
	        onClick: this.goBack.bind(this)
	      }, void 0, _jsx('img', {
	        src: '/images/black-icons/1-44.png',
	        alt: 'back arrow',
	        title: this.props.intl.messages.go_back
	      })))), _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 7
	      }, void 0, _jsx('div', {
	        className: cls_profileAvatarBlock
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.avatarCircle80
	      }, void 0, contactStatus == true ? _jsx('div', {
	        className: _Dashboard2.default.activeCircle
	      }) : contactStatus == false ? _jsx('div', {
	        className: _Dashboard2.default.inactiveCircle
	      }) : null, _jsx(_ViewImage2.default, {
	        srcUrl: this.props.data.profile.profileImage,
	        userData: this.props.data._id,
	        changeImage: false,
	        isUser: true,
	        from: 'PERSONAL'
	      })), _jsx('div', {
	        className: _Dashboard2.default.avatarDetails
	      }, void 0, _jsx('h2', {}, void 0, this.props.data.firstname, ' ', this.props.data.lastname), _jsx('p', {}, void 0, _jsx('span', {}, void 0, this.props.data.profile.gender || '')), _jsx('p', {}, void 0, _jsx('span', {}, void 0, time ? time + ' ' + 'Exp' : ''), time ? _ref : null, _jsx('span', {}, void 0, currentRole || '')), this.props.data.userStatus == "Active" && this.props.data.guest == false ? connection_status == _UserDashboardActions.contactRequest.Requested ? _jsx('div', {
	        className: 'row'
	      }, void 0, _jsx('div', {
	        className: 'col-sm-2'
	      }, void 0, _jsx('button', {
	        id: 'accept',
	        className: _Dashboard2.default.btnApplyAll,
	        onClick: this.handleAccept
	      }, void 0, _ref2, ' ', _ref3)), _jsx('div', {
	        className: 'col-sm-2'
	      }, void 0, _jsx('button', {
	        id: 'reject',
	        className: _Dashboard2.default.btnApplyAll,
	        onClick: this.handleReject
	      }, void 0, _ref4, ' ', _ref5))) : connection_status == _UserDashboardActions.contactRequest.Accept ? _jsx('button', {
	        id: 'message',
	        className: _Dashboard2.default.btnApplyAll,
	        style: cls_connectionRequest,
	        onClick: this.handleMessage
	      }, void 0, _ref6, ' ', _ref7) : connection_status == _UserDashboardActions.contactRequest.Request ? _jsx('p', {}, void 0, _jsx('span', {
	        className: _Dashboard2.default.requestTxtAll
	      }, void 0, _ref8)) : connection_status == -1 ? _jsx('button', {
	        id: 'connectionRequest',
	        className: _Dashboard2.default.btnApplyAll,
	        style: cls_connectionRequest,
	        onClick: this.handleConnection
	      }, void 0, _ref9, '  ', _ref10) : null : null)), _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _ref11, _jsx('p', {}, void 0, this.props.data.profile.aboutme || '--'))), _jsx(_reactBootstrap.Col, {
	        md: 5
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _ref12, _jsx('div', {
	        className: _Dashboard2.default.detailsFlexBlock
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.detailsLabel
	      }, void 0, _ref13), _jsx('div', {
	        className: _Dashboard2.default.detailsValue
	      }, void 0, _jsx('p', {
	        className: _Dashboard2.default.emailPersonalId
	      }, void 0, this.props.data.email || '--'))), _jsx('div', {
	        className: _Dashboard2.default.detailsFlexBlock
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.detailsLabel
	      }, void 0, _ref14), _jsx('div', {
	        className: _Dashboard2.default.detailsValue
	      }, void 0, _jsx('p', {}, void 0, this.props.data.profile.phone[1] || '--')))), _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _ref15, _jsx('div', {
	        className: _Dashboard2.default.detailsFlexBlock
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.detailsLabel
	      }, void 0, _ref16), _jsx('div', {
	        className: _Dashboard2.default.detailsValueCompany
	      }, void 0, _jsx('p', {}, void 0, currentCompany || '--'))), _jsx('div', {
	        className: _Dashboard2.default.detailsFlexBlock
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.detailsLabel
	      }, void 0, _ref17), _jsx('div', {
	        className: _Dashboard2.default.detailsValue
	      }, void 0, _jsx('p', {}, void 0, currentRole || '--'))), _jsx('div', {
	        className: _Dashboard2.default.detailsFlexBlock
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.detailsLabel
	      }, void 0, _ref18), _jsx('div', {
	        className: _Dashboard2.default.detailsValue
	      }, void 0, _jsx('p', {}, void 0, this.props.data.profile.dept || '--')))))));
	    }
	  }]);
	
	  return PersonalData;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    conferenceDetails: (0, _ConferenceReducer.conferenceDetails)(state)
	  };
	}
	
	PersonalData.contextTypes = {
	  router: _react2.default.PropTypes.object,
	  intl: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(PersonalData));

/***/ },

/***/ 444:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ProfessionalData = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(64);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactRouter = __webpack_require__(3);
	
	var _LoginActions = __webpack_require__(21);
	
	var _LoginReducer = __webpack_require__(20);
	
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
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactIntl = __webpack_require__(11);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'View_all'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Hide_all'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'View_all'
	});
	
	var _ref4 = _jsx('h2', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'work_education'
	}), ':');
	
	var _ref5 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'Work_Places'
	}), ':');
	
	var _ref6 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'professionalSkills_title'
	}), ':');
	
	var _ref7 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'college_title'
	}), ':');
	
	var _ref8 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'work_education_school'
	}), ':');
	
	var _ref9 = _jsx('h2', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'contact_information'
	}), ':');
	
	var _ref10 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'address'
	}), ':');
	
	var _ref11 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'website'
	}), ':');
	
	var _ref12 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'Social_Links'
	}), ':');
	
	var _ref13 = _jsx('h3', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'basic_information'
	}), ':');
	
	var _ref14 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'dob'
	});
	
	var _ref15 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Connections'
	});
	
	var ProfessionalData = exports.ProfessionalData = function (_Component) {
	  _inherits(ProfessionalData, _Component);
	
	  function ProfessionalData(props) {
	    _classCallCheck(this, ProfessionalData);
	
	    var _this = _possibleConstructorReturn(this, (ProfessionalData.__proto__ || Object.getPrototypeOf(ProfessionalData)).call(this, props));
	
	    _this.state = {
	      viewAllConnectionsLabel: _ref
	    };
	    return _this;
	  }
	
	  _createClass(ProfessionalData, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.viewAllConnectionsStatus) {
	        this.setState({
	          viewAllConnectionsLabel: _ref2
	        });
	      } else {
	        this.setState({
	          viewAllConnectionsLabel: _ref3
	        });
	      }
	    }
	  }, {
	    key: 'viewAllConnections',
	    value: function viewAllConnections() {
	      this.props.viewAllConnectionsCallback();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var userData = this.props.userData.profile;
	      var userCount = 0;
	      var contactData = this.props.userData.contacts;
	      var firstFourConnections = this.props.viewAllConnectionsData().splice(0, 4);
	
	      for (var i = 0; i < contactData.length; i++) {
	        if (contactData[i].status === 1) {
	          userCount = userCount + 1;
	        }
	      }
	
	      return _jsx('div', {
	        className: _Dashboard2.default.infoIndiProfileBlodk
	      }, void 0, _jsx(_reactBootstrap.Row, {}, void 0, _jsx(_reactBootstrap.Col, {
	        md: 4
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _ref4, _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref5, userData.experience.workplace.length > 0 ? userData.experience.workplace.map(function (workData, i) {
	        var key = i + "workplace";
	        return _jsx('li', {}, key, workData.company);
	      }) : "--")), _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref6, userData.experience.professionalSkills.length > 0 ? userData.experience.professionalSkills.map(function (skillsData, i) {
	        var key = i + "professionalSkills";
	        return _jsx('li', {}, key, skillsData);
	      }) : "--")), _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref7, userData.education.college.length > 0 ? userData.education.college.map(function (collegeData, i) {
	        var key = i + "college";
	        return _jsx('li', {}, key, collegeData.university);
	      }) : "--")), _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref8, _jsx('li', {}, void 0, userData.education.highSchool != undefined ? userData.education.highSchool.school || '--' : "--"))))), _jsx(_reactBootstrap.Col, {
	        md: 4
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _ref9, _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref10, _jsx('li', {
	        className: _Dashboard2.default.capitalize
	      }, void 0, userData.contact != undefined && userData.contact.address ? userData.contact.address + ',' + userData.contact.city + ',' + userData.contact.landMark + ',' + userData.contact.zip + '.' : "--"))), _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref11, _jsx('li', {}, void 0, _jsx('a', {
	        id: 'website',
	        href: userData.website,
	        target: '_blank'
	      }, void 0, userData.website || "--")))), _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref12, _jsx('li', {}, void 0, _jsx('a', {
	        id: 'socialLink',
	        href: userData.socialLink,
	        target: '_blank'
	      }, void 0, userData.socialLink || "--")))), _jsx('div', {
	        className: _Dashboard2.default.otherDetails
	      }, void 0, _jsx('ul', {}, void 0, _ref13, _jsx('li', {}, void 0, _ref14, ':', userData.dateofbirth != null ? (0, _moment2.default)(userData.dateofbirth).format('DD-MM-YYYY') : "--"))))), _jsx(_reactBootstrap.Col, {
	        md: 4
	      }, void 0, _jsx('div', {
	        className: _Dashboard2.default.profileInfoBlock
	      }, void 0, _jsx('h2', {}, void 0, _ref15, ': ', _jsx('span', {}, void 0, '(', userCount, ')'), _jsx('span', {
	        className: _Dashboard2.default.viewAll
	      }, void 0, _jsx('button', {
	        id: 'viewAllConnections',
	        className: 'btn btn-xs',
	        onClick: this.viewAllConnections.bind(this)
	      }, void 0, this.state.viewAllConnectionsLabel))), _jsx('div', {
	        className: _Dashboard2.default.connectionList
	      }, void 0, firstFourConnections)))));
	    }
	  }]);
	
	  return ProfessionalData;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    intl: state.intl
	  };
	}
	
	ProfessionalData.contextTypes = {
	  router: _react2.default.PropTypes.object,
	  intl: _react2.default.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)((0, _reactIntl.injectIntl)(ProfessionalData));

/***/ }

};;