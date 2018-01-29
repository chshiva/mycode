exports.ids = [87];
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

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ViewCalendar = {
	  "calendarRender": "_2zJrTUoN-1Vq9VyUyZ2egi",
	  "calendar_schedule_options": "_244v1InSeH4n6KEbQTSKkE"
	};
	
	var _ViewCalendar2 = _interopRequireDefault(_ViewCalendar);
	
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
	
	var _ConfSettings = {
	  "contactListFixed": "_3YyeeAlwH39lu4k1AcsVzz",
	  "attendeesListFixed": "_2K0WCxOutftWQWUC97yMC7",
	  "groupChatFixed": "_3_JIhKB0tI9DD5OYYcFFhO",
	  "indiChatFixed": "_121x6wkYY9bMxq2znilpes",
	  "settingOptionsFixed": "_3paKcIA8hOSOXOYxlVoxNm",
	  "openSettingOptions": "Luc2pUw4qPvGeP6xwmHcG",
	  "openMyContacts": "_1C6XGrkAGrUazLBzl1a02S",
	  "openIndiChat": "UQfb0iYQl4dhQKuOnsjni",
	  "onCalPadding1": "_3gqfldlZ-Z_Sekdsf_JmV8",
	  "onCalPadding2": "TpdjC_Scf0J7ibmshcsHB",
	  "tableBlock": "_2Pi4V-gyA8hujIg37JdcPF",
	  "tableBlockRow": "_1KxRi3MxZO0VArI7RlCPxV",
	  "tableBlockCell": "_3w6tOWgPscVGXLLUlIP7GM",
	  "modAsideHeader": "_3-QQh-Lc7fsJw9YCfe35cM",
	  "modAsideHeaderWhite": "_1DkMVq5OjZv2giJ2lz8Xbx",
	  "modHeaderList": "_1VcV32VYR_IteNriuqUrZx",
	  "block50": "_3KEUbD9sh-5efPnOe48KQu",
	  "nohover": "m7jTOV3afDX3KYXfpJDuW",
	  "fileUpload": "_1Ta80WwlyVY6khGgoelZff",
	  "modHeaderWhiteList": "QSATVkaBXWZG4ZflFM5PB",
	  "active": "_3wgRcJQgpFwV1Tze6eaYAL",
	  "modNoContacts": "_2dScJey0ocmQJ61rLItP-A",
	  "noContactsCircle": "_3fppM4qH32McKUY31Jd-6v",
	  "modSearchBlock": "_2ixaFhqvPC_d1LihI6OOiz",
	  "navbarFormCustom": "yKPBmk6p-C2xFA-2Ows1k",
	  "backSearch": "w7BGjmEiChPoMYjET5k8R",
	  "subNavBars": "AH4Om8A-_X-udTyFQ7ZaF",
	  "topLeftLogo": "_1-GqCHAZRcGKZa8ZI-O_X3",
	  "modContactList": "_1zmiGIPb92yNtOu845RHyM",
	  "chatBox": "_2taDr3sNLvZl64o7TkBTEg",
	  "callBox": "_3Gp0sm-V9Sto6Pc6w2dIJk",
	  "midTitle": "_1CjowBdVtt6x8kMj4GrzgR",
	  "modAsideListBody": "_2DV2QAFRMgCwwweXaahjbD",
	  "contactContainer": "BX4gsvYQEJ_UxHYXquiM_",
	  "avatarBox": "_3bvAwAP34cIm79JtYGBa_9",
	  "contactInfoBox": "_3cjt3RdW6fRpFCY2cWtvKD",
	  "listStatusCircle": "P_Vqoj0CkeWDRXFsu5ehX",
	  "onlineColor": "_1wBno7dwEzhNENm5FFYuNf",
	  "busyColor": "_1n4n0IG8nR8VNBkhdiq1hk",
	  "bgOffline": "jL-R5aQBwO_2EmgAsiay1",
	  "bgOnline": "_3TEYblB_gY5codKEtLqX7q",
	  "adjustForModal": "_1u3ETV1bbhpgq63k3OJztN",
	  "addOn": "_1Q2E4mFH1Nbr5A47e3lt7L",
	  "formControlCustom": "BFcJiZMNYiw9nyvHzU7Rx",
	  "inputGroupBtn": "_2nCnROACf_M8pzec6EM7E6",
	  "btn": "_27VXnOss6C0tcmiXDJyEQY",
	  "btnSearch": "ZfOcSiAJS-yXPDPQgHF4e",
	  "topMrgZero": "_2o-JH37Bqi-l9CT81GRGjn",
	  "modProfileCard": "_2JPfY65up63hkI3vhK4ptW",
	  "addNowBlock": "_1W6-RmWzqJiQLK1pcBavDu",
	  "btnAddContact": "_3aNMiTsg3DLcR-4J2Y_5MR",
	  "btnAddedContact": "_1bX98ziw9A1ojzalhVjdIn",
	  "contactInfoBlock": "_1Wo1W59FlAtVXV30dsfoPD",
	  "asideBodySecondary": "_10yt3T9QoXDhC8rqK-kAA2",
	  "modSelectChoice": "_33_xmT9lclkFPIqAT9rNlC",
	  "headerText": "_2POMQ33JzpZXRKNQwhKTpK",
	  "optionsBlock": "_2Hljs23RSy64iPvRKW8UVf",
	  "settingsOptionInput": "Avxs4QLLmPyHnmuu6zFH6",
	  "click-wave": "_1B9ixe0Xk37c7IQaSeA-9F",
	  "radio": "_1YNHku8cDP1FxyBn3XkUJY",
	  "modChatBody": "_9MKv9eaGfnPfSvgrjOIeK",
	  "modChatContainer": "_21msPTbxn87ey3RWsSt_35",
	  "selfChatBox": "_2YE5OVKMMJqey9Zvc5_Dk-",
	  "avatarCircle": "_3t6DqYa8W4OjIj_EF90-T1",
	  "messageBox": "_2T5QmUyalQ5yF2jPtvDJDr",
	  "downloadFile": "_33q4w5biPTOCecW_SwRklY",
	  "downloadMedia": "LiHJPdfKZT7yHz2F8sr0U",
	  "textField": "_3zRLRN3HHrTZ_xaEcFhS9C",
	  "otherChatBox": "_1qZ7OG5sw3T_39aOzvAyCc",
	  "chatMediaBox": "VS8lEUQuRxq9jwuxa4f0-",
	  "modChatFooter": "_3Kb0OVypvH6v1meOExS2Oq",
	  "chatWrite": "_2jwPxajNYm5H_vrK7q_9tM",
	  "formControlChatOverwrite": "F6fdFHvEw_Mpy1wlxe2Bg",
	  "sendMessage": "_2OxgF4p4Jtp0wysNk_Dy5_",
	  "avatarCircleGuest": "_2xlj1cSx9qua6H5Rjhy3wC",
	  "setConfPassword": "_2m3UxvMEUMBkXP7gGLc3ox",
	  "iconBlock": "_1llySoPNa1j3k655fl2PNS",
	  "passWordBlock": "_2z5dmQWuPHtQL2grl4Rd92",
	  "meetingDetails": "_1sj35kVEBVp66LoUjk7Pvl",
	  "meetingInfoBlock": "_1T7YyYvtu5N7JuDsWHAgPR",
	  "inputError": "_30zq1PCjl9v2jnkrDEFjSK",
	  "formControlOverwrite": "_2yPlkP5pH38hsoOHEV9Yrb",
	  "calendarInlineBlock": "_3-PsrheDdsPKEdUSGIir2n",
	  "endsOnBlock": "gkiQ3RaZAclcm5W2_yi1v",
	  "schedlDate": "_1R340GeG3VFBlX-dP9P0Ub",
	  "schedlTime": "_3CKgTfQeRBoFX_uCGzKeNG",
	  "schedlDuration": "P1l9_DlNKhzuxO45SRUzq",
	  "onSpan": "_1rAiAWHfT1m-kgPikHlRXs",
	  "repeatsList1": "_RT_TjG0GSJVgzkhOcoGM",
	  "repeatsList2": "_3jQ7JwdBE8oJGy-gjbHtwh",
	  "schedlHour": "_1ArS5dXvY1zt9tn0Sc_z_f",
	  "schedlMins": "_2dwV_Lh-ernG9imoJU1hpw",
	  "inputGroupAddonOverwrite": "_3fLlY1-oVeGeMJUk7JZxW8",
	  "setDueDateOverwrite": "_23XZMgNyAur3QMU5c-hiT",
	  "dateTimePickerBlock": "_7EHobKKJefSu_2XmHE49F",
	  "actionBlock": "_2ETKg3XUqJOstPZcN_kqEu",
	  "actionButtonBox": "_2xe2-CWYD_0PEak4DXOGv9",
	  "indChatNotification": "_14IhbO1qkUW6uAP7NxZsbH",
	  "alignMidBlock": "_3hun2u2tqVy7KR7JqmMf6P",
	  "centerBlock": "HLVHVZhqp-7yopt3Ah073",
	  "btnCodec": "pDa1Eh41y3LmhqUTgK-UT",
	  "transBlock": "_1qfpk41qZbXSP1Lma_yvNe",
	  "btnTransport": "szHYW92cM7tgGZoXatQyg",
	  "helpdesk": "_3_EJ-vjbaDbucjQz2CYAjT",
	  "sliderA": "_2wwiNxtBAlrjRa7R2Jz_iO",
	  "scheduFullBlock": "_1gzSrAarjNRvFeiRj044Pu",
	  "scheduImgBlock": "_3J0gQCTcBOKDfB0jlMAtrt",
	  "sliderB": "_3IdDVUuL8XEJZcsFNi5DNT",
	  "sliderText": "_3aTkGPXbvwzEcm-3mn-d8p",
	  "sideDrop": "_3OKv2xPQewcH8b_Ei7HU6K",
	  "popHeadingAll": "_2p3SY545DrLPd7fl4Izqbd",
	  "btnApplyAll": "_2fyYhx6LAR6RJEHKRk9QXt",
	  "emailInChatText": "_29xq-DgQlxvSeE_5T3jrT3",
	  "formGroup": "_3KjN0y7pluCsc5z7xi6g2j",
	  "formGroupLabel": "_3FTezjO4FR-bN9QI0TPU6g",
	  "colForinput1": "_2M0ngeCbsTsOe_UXDZGYfW",
	  "colForinput2": "_1y0IYYKA3YAxi9BkFZt9tl",
	  "endOnPara": "_1pcv1il3aX3hB0V2sNJjfn",
	  "toastTop": "_1kFxA5k985kes0bDJBKYjM"
	};
	
	var _ConfSettings2 = _interopRequireDefault(_ConfSettings);
	
	var _reactIntl = __webpack_require__(11);
	
	var _IntlReducer = __webpack_require__(141);
	
	var _reactBootstrap = __webpack_require__(14);
	
	var _Modal = __webpack_require__(52);
	
	var _reactRedux = __webpack_require__(16);
	
	var _reactRouter = __webpack_require__(3);
	
	var _FullCalendarActions = __webpack_require__(167);
	
	var _FullCalendarReducer = __webpack_require__(168);
	
	var _UserDashboardActions = __webpack_require__(24);
	
	var _reactDraggable = __webpack_require__(166);
	
	var _reactDraggable2 = _interopRequireDefault(_reactDraggable);
	
	var _WoogeenManager = __webpack_require__(29);
	
	var _WoogeenManager2 = _interopRequireDefault(_WoogeenManager);
	
	var _Scheduler = __webpack_require__(418);
	
	var _Scheduler2 = _interopRequireDefault(_Scheduler);
	
	var _LoginReducer = __webpack_require__(20);
	
	var _lib = __webpack_require__(45);
	
	var _roles = __webpack_require__(46);
	
	var _reactBootstrapDatetimepicker = __webpack_require__(86);
	
	var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);
	
	var _RightBarActions = __webpack_require__(67);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx('img', {
	  src: '/images/white-icons/white-join-conference.png'
	});
	
	var _ref2 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'start'
	}));
	
	var _ref3 = _jsx('img', {
	  src: '/images/white-icons/white-edit.png'
	});
	
	var _ref4 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'edit'
	}));
	
	var _ref5 = _jsx('img', {
	  src: '/images/white-icons/white-delete.png'
	});
	
	var _ref6 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'delete'
	}));
	
	var _ref7 = _jsx('img', {
	  src: '/images/white-icons/white-add-contacts.png'
	});
	
	var _ref8 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'invite'
	}));
	
	var _ref9 = _jsx('img', {
	  src: '/images/white-icons/white-edit.png'
	});
	
	var _ref10 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'edit'
	}));
	
	var _ref11 = _jsx('img', {
	  src: '/images/white-icons/white-delete.png'
	});
	
	var _ref12 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'delete'
	}));
	
	var _ref13 = _jsx('img', {
	  src: '/images/white-icons/white-add-contacts.png'
	});
	
	var _ref14 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'invite'
	}));
	
	var _ref15 = _jsx('img', {
	  src: '/images/white-icons/white-delete.png'
	});
	
	var _ref16 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'delete'
	}));
	
	var _ref17 = _jsx('img', {
	  src: '/images/white-icons/white-join-conference.png'
	});
	
	var _ref18 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'start'
	}));
	
	var _ref19 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_start_time'
	}));
	
	var _ref20 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_hours'
	}));
	
	var _ref21 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_minutes'
	}));
	
	var _ref22 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'save'
	});
	
	var _ref23 = _jsx(_reactBootstrap.Modal.Body, {}, void 0, 'Do you want to Edit Current day (or) recurring schedule?');
	
	var _ref24 = _jsx(_reactBootstrap.Modal.Body, {}, void 0, 'Do you want to delete Current day (or) recurring schedule?');
	
	var _ref25 = _jsx('video', {
	  className: 'handle',
	  id: 'objMixVideo',
	  autoPlay: true
	});
	
	var _ref26 = _jsx('img', {
	  src: '/images/white-icons/white-expand.png'
	});
	
	var FullCalendar = function (_React$Component) {
	  _inherits(FullCalendar, _React$Component);
	
	  function FullCalendar(props) {
	    _classCallCheck(this, FullCalendar);
	
	    var _this = _possibleConstructorReturn(this, (FullCalendar.__proto__ || Object.getPrototypeOf(FullCalendar)).call(this, props));
	
	    _this.handleday = function (date) {
	      var d = moment(date, 'DD/MM/YYYY').startOf('day').format('x');
	      var now = moment().startOf('day').format('x');
	      if (Number(d) >= Number(now)) {
	        _this.setState({ selectedDate: moment(date, 'DD/MM/YYYY').utc().toDate(), showScheduler: true });
	      } else {
	        _this.setState({ selectedDate: moment().endOf('day').utc().toDate(), showScheduler: true });
	      }
	    };
	
	    _this.showOrHideEvent = function (data) {
	      if (_this.state.showEvent) {
	        _this.setState({ showEvent: false, data: null });
	      } else {
	        _this.setState({ showEvent: true, data: data });
	      }
	    };
	
	    _this.updateEvents = function (eventsList) {
	      var self = _this;
	      $('#calendar').fullCalendar('destroy');
	      $('#calendar').fullCalendar({
	        events: self.props.FullCalendarEventsData.data,
	        header: {
	          left: 'prev,next today',
	          center: 'title',
	          right: 'month,agendaWeek,agendaDay'
	        },
	        navLinks: false,
	
	        // editable: true,      // Edit events 
	        // droppable: true,     // drop events from one day to other
	        // drop: function() {   // drop events from other div
	        //   if ($('#drop-remove').is(':checked')) {
	        //     $(this).remove();
	        //   }
	        // },
	
	        eventClick: function eventClick(calEvent, jsEvent, view) {// click on any event
	          /*console.log("calEvent === ", calEvent);
	          self.showOrHideEvent(calEvent.data);*/
	        },
	        dayClick: function dayClick(date, jsEvent, view) {
	          // self.handleday(date.format('DD/MM/YYYY'));
	        }
	      });
	    };
	
	    _this.handleStart = function () {
	      console.log("start");
	    };
	
	    _this.closeEdit = function () {
	      _this.setState({ editshow: false, slotId: null, recordId: null });
	    };
	
	    _this.editCurrentDay = function () {
	      var dates = _this.state.data.dates;
	      var startTime = moment(dates.startTime, 'x');
	      var endTime = moment(dates.endTime, 'x');
	      var duration = moment.duration(endTime.diff(startTime));
	      var min = duration.asMinutes();
	      var h = Math.floor(min / 60);
	      var m = min - h * 60;
	      _this.setState({ startTime: startTime.format('x'), hours: h, minutes: m });
	      _this.showOrHideEditScheduler();
	    };
	
	    _this.editRecurring = function () {
	      _this.showOrHideScheduler();
	    };
	
	    _this.showOrHideEditScheduler = function () {
	      if (_this.state.showEditSlot) {
	        _this.setState({ showEditSlot: false, editshow: false, startTime: Number(moment().format('x')), hours: 0, minutes: 0 });
	      } else {
	        _this.setState({ showEditSlot: true, editshow: false });
	      }
	    };
	
	    _this.closeDelete = function () {
	      _this.setState({ deleteshow: false, slotId: null, recordId: null });
	    };
	
	    _this.deleteCurrentDay = function () {
	      _this.props.dispatch((0, _UserDashboardActions.deleteMySchedule)(_this.state.recordId, _this.state.slotId)).then(function (res) {
	        return _this.setResponse(res);
	      });
	      _this.setState({ deleteshow: false, slotId: null, recordId: null });
	    };
	
	    _this.deleteRecurring = function () {
	      var obj = {
	        recordId: _this.state.recordId,
	        currentDate: moment(_this.state.selectedDate).startOf('day').utc().format('x')
	      };
	      _this.props.dispatch((0, _UserDashboardActions.deleteMyReucrringSchedule)(obj)).then(function (res) {
	        return _this.setResponse(res);
	      });
	    };
	
	    _this.scheduleOptions = function () {
	
	      var cls_imgcontrol = _Dashboard2.default.iconCircle + ' ' + _Dashboard2.default.bgStart;
	      var cls_ul = 'clearfix ' + _ViewCalendar2.default.calendar_schedule_options;
	      var data = _this.state.data;
	      if (data != null) {
	        var userId = _this.props.loggedInData.data._id;
	        var role = _this.props.loggedInData.data.role;
	        var now = Number(moment().utc().format('x'));
	        var start = data.dates.startTime;
	        var date = data.dates.endTime;
	        var recurring = data.pattern ? true : false;
	        if (userId == data.createdBy._id && start <= now && now <= date) {
	          return _jsx('ul', {
	            className: cls_ul
	          }, void 0, _jsx('li', {}, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-success',
	            onClick: _this.handleStart,
	            id: data.roomId && data.roomId.roomKey ? data.roomId.roomKey : "#",
	            title: role == _roles.Roles.Student ? _this.props.intlData.messages.join_class : role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.start_class : _this.props.intlData.messages.start_conference
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref), _ref2)), _jsx('li', {
	            className: _Dashboard2.default.editSchedule
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-warning',
	            title: role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.edit_class : _this.props.intlData.messages.edit_schedule,
	            id: data._id,
	            onClick: _this.editEvent.bind(_this, data.dates._id, recurring)
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref3), _ref4)), _jsx('li', {
	            className: _Dashboard2.default.deleteSchedule
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-danger',
	            title: role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.delete_class : _this.props.intlData.messages.delete_schedule,
	            id: data._id,
	            onClick: _this.deleteEvent.bind(_this, data.dates._id, recurring)
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref5), _ref6)), _jsx('li', {
	            className: _Dashboard2.default.inviteContacts
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-primary',
	            onClick: _this.inviteEvent.bind(_this),
	            id: data._id,
	            name: data.roomId._id,
	            title: _this.props.intlData.messages.invite_contacts
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref7), _ref8)));
	        }
	        if (userId == data.createdBy._id && now < start) {
	          return _jsx('ul', {
	            className: cls_ul
	          }, void 0, _jsx('li', {
	            className: _Dashboard2.default.editSchedule
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-warning',
	            title: role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.edit_class : _this.props.intlData.messages.edit_schedule,
	            id: data._id,
	            onClick: _this.editEvent.bind(_this, data.dates._id, recurring)
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref9), _ref10)), _jsx('li', {
	            className: _Dashboard2.default.deleteSchedule
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-danger',
	            title: role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.delete_class : _this.props.intlData.messages.delete_schedule,
	            id: data._id,
	            onClick: _this.deleteEvent.bind(_this, data.dates._id, recurring)
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref11), _ref12)), _jsx('li', {
	            className: _Dashboard2.default.inviteContacts
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-primary',
	            onClick: _this.inviteEvent.bind(_this),
	            id: data._id,
	            name: data.roomId._id,
	            title: _this.props.intlData.messages.invite_contacts
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref13), _ref14)));
	        } else if (userId == data.createdBy._id) {
	          return _jsx('ul', {
	            className: cls_ul
	          }, void 0, _jsx('li', {
	            className: _Dashboard2.default.deleteSchedule
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-danger',
	            title: role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.delete_class : _this.props.intlData.messages.delete_schedule,
	            id: data._id,
	            onClick: _this.deleteEvent.bind(_this, data.dates._id, recurring)
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref15), _ref16)));
	        } else if (start <= now && now <= date) {
	          return _jsx('ul', {
	            className: cls_ul
	          }, void 0, _jsx('li', {
	            style: role == _roles.Roles.Student ? { width: "100%" } : {}
	          }, void 0, _jsx('button', {
	            type: 'button',
	            className: 'btn btn-success',
	            onClick: _this.handleStart,
	            id: data.roomId && data.roomId.roomKey ? data.roomId.roomKey : "#",
	            title: role == _roles.Roles.Student ? _this.props.intlData.messages.join_class : role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _this.props.intlData.messages.start_class : _this.props.intlData.messages.start_conference
	          }, void 0, _jsx('div', {
	            className: cls_imgcontrol
	          }, void 0, _ref17), _ref18)));
	        } else {
	          return;
	        }
	      } else {
	        return;
	      }
	    };
	
	    _this.handleStartTimeChange = function (newTime) {
	      moment(newTime, "x").isValid() ? _this.setState({ startTime: moment(newTime, "x").format('x') }) : _this.setState({ startTime: false });
	    };
	
	    _this.handleHours = function (event) {
	      _this.setState({ hours: event.target.value });
	    };
	
	    _this.handleMinutes = function (event) {
	      _this.setState({ minutes: event.target.value });
	    };
	
	    _this.state = {
	      currentYear: moment().year(),
	      activeDrags: 0,
	      mixStream: false,
	      showScheduler: false,
	      selectedDate: moment().endOf('day').utc().toDate(),
	      errorStatus: false,
	      data: null,
	      showEvent: false,
	      editshow: false,
	      deleteshow: false,
	      recordId: null,
	      slotId: null,
	      showEditSlot: false,
	      startTime: Number(moment().format('x')),
	      hours: 0,
	      minutes: 0
	    };
	    _this.confObject = new _WoogeenManager2.default();
	    return _this;
	  }
	
	  _createClass(FullCalendar, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.getData({ year: this.state.currentYear });
	      $('.fc-next-button').click(function () {
	        var dateAttribute = $('.fc-day,.fc-future').not('.fc-other-month')[0].getAttribute('data-date');
	        var month = Number(dateAttribute.split("-")[1]);
	        var year = Number(dateAttribute.split("-")[0]);
	
	        if (year !== self.state.currentYear) {
	          self.setState({ currentYear: year });
	          self.getData({ year: self.state.currentYear });
	        };
	        // console.log("dateAttribute ", dateAttribute);
	      });
	
	      $('.fc-prev-button').click(function (prevData) {
	        var dateAttribute = $('.fc-day,.fc-future').not('.fc-other-month')[0].getAttribute('data-date');
	
	        var month = Number(dateAttribute.split("-")[1]);
	        var year = Number(dateAttribute.split("-")[0]);
	        if (year !== self.state.currentYear) {
	          self.setState({ currentYear: year });
	          self.getData({ year: self.state.currentYear });
	        };
	      });
	
	      //Check till conference is going on not!
	      if (this.confObject.getConnectionStatus()) {
	        var that = this;
	        //Subscribe Mix Stream
	        this.confObject.trySubscribeMixStream(function (stream) {
	          // console.log("Mix Stream Got", stream);
	          that.setState({ mixStream: true });
	          that.showVideo(stream);
	        });
	      }
	      this.updateEvents();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      this.updateEvents();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.props.dispatch((0, _RightBarActions.setRightBar)({ current: null }));
	    }
	  }, {
	    key: 'showVideo',
	    value: function showVideo(stream) {
	      var _video = document.getElementById("objMixVideo");
	      if (_video) {
	        //Create URL
	        var _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
	        _video.src = _streamURL;
	        // _video.volume = 0;
	      }
	    }
	  }, {
	    key: 'getData',
	    value: function getData(data) {
	      this.props.dispatch((0, _FullCalendarActions.CalendarEventsList)(data['year']));
	    }
	  }, {
	    key: 'onStart',
	    value: function onStart() {
	      this.setState({ activeDrags: ++this.state.activeDrags });
	    }
	  }, {
	    key: 'onStop',
	    value: function onStop() {
	      this.setState({ activeDrags: --this.state.activeDrags });
	    }
	  }, {
	    key: 'navigateBack',
	    value: function navigateBack() {
	      _reactRouter.browserHistory.push("/conf/" + this.confObject.getRoomKey());
	    }
	  }, {
	    key: 'showOrHideScheduler',
	    value: function showOrHideScheduler() {
	      if (this.state.showScheduler) {
	        this.setState({ showScheduler: false, editshow: false });
	      } else {
	        this.setState({ showScheduler: true, editshow: false });
	      }
	    }
	  }, {
	    key: 'createSchedule',
	    value: function createSchedule(obj, id) {
	      var _this2 = this;
	
	      //console.log("obj == ",obj);
	      if (id == null) {
	        this.props.dispatch((0, _UserDashboardActions.setSchedule)(obj)).then(function (res) {
	          _this2.setResponse(res);
	        });
	      } else {
	        this.props.dispatch((0, _UserDashboardActions.updateSchedule)(obj, id)).then(function (res) {
	          _this2.setResponse(res);
	        });
	      }
	    }
	  }, {
	    key: 'setResponse',
	    value: function setResponse(res) {
	      if (res.status) {
	        this.refs.calendar_container.success(res.message + ' ', '');
	        // this.showOrHideScheduler();
	        this.setState({ showScheduler: false, editshow: false, deleteshow: false, slotId: null, recordId: null });
	        this.getData({ year: this.state.currentYear });
	      } else if (res.error) {
	        this.setState({ errorStatus: true });
	        console.log("err ========= ", res.error);
	        if (res.error.errors) {
	          var err = [];
	          _.forIn(res.error.errors, function (obj, key) {
	            err.push(obj.message);
	          });
	          this.refs.calendar_container.error(err + ' ', '');
	        } else {
	          console.log("error === ", res.error);
	          this.refs.calendar_container.error(res.error + ' ', '');
	        }
	      }
	    }
	  }, {
	    key: 'editEvent',
	    value: function editEvent(schid, recurring, e) {
	      var id = e.currentTarget.id;
	      var props = this.props;
	      var self = this;
	      alertify.confirm(props.intlData.messages.warning, props.role == _roles.Roles.Instructor || props.role == _roles.Roles.Lmsadmin ? props.intlData.messages.edit_class_alert : props.intlData.messages.edit_schedule_alert, function (result) {
	        if (result) {
	          if (recurring) {
	            self.setState({ editshow: true, recordId: id, slotId: schid });
	          } else {
	            self.showOrHideScheduler();
	          }
	        }
	      }, function () {}).setting('labels', { 'ok': this.props.intlData.messages.ok, 'cancel': this.props.intlData.messages.cancel });
	    }
	  }, {
	    key: 'deleteEvent',
	    value: function deleteEvent(schid, recurring, e) {
	      var id = e.currentTarget.id;
	      var props = this.props;
	      var self = this;
	      alertify.confirm(this.props.intlData.messages.warning, props.role == _roles.Roles.Instructor || props.role == _roles.Roles.Lmsadmin ? props.intlData.messages.delete_class_alert : props.intlData.messages.delete_schedule_alert, function (result) {
	        if (result) {
	          if (recurring) {
	            self.setState({ deleteshow: true, recordId: id, slotId: schid });
	          } else {
	            if (schid != null) {
	              props.dispatch((0, _UserDashboardActions.deleteMySchedule)(id, schid)).then(function (res) {
	                return self.setResponse(res);
	              });
	            } else {
	              var obj = {
	                recordId: id,
	                currentDate: moment(self.state.selectedDate).startOf('day').utc().format('x')
	              };
	              props.dispatch((0, _UserDashboardActions.deleteMyReucrringSchedule)(obj)).then(function (res) {
	                return self.setResponse(res);
	              });
	            }
	          }
	        }
	      }, function () {}).setting('labels', { 'ok': this.props.intlData.messages.ok, 'cancel': this.props.intlData.messages.cancel });
	    }
	  }, {
	    key: 'inviteEvent',
	    value: function inviteEvent() {
	      console.log("invite");
	    }
	  }, {
	    key: 'handleUpdate',
	    value: function handleUpdate() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var self = this;
	      // console.log("data in render === ", this.props.FullCalendarEventsData.data);
	      var dragHandlers = { onStart: this.onStart.bind(this), onStop: this.onStop.bind(this) };
	      var cls_mixStream = _Dashboard2.default.mixStream + ' ' + _Dashboard2.default.hideObject;
	      if (this.state.mixStream) {
	        cls_mixStream = '' + _Dashboard2.default.mixStream;
	      }
	      var data = this.state.data;
	      var mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
	      var hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	      var cls_calendarInlineBlock = _ConfSettings2.default.calendarInlineBlock + ' clearfix';
	
	      return _jsx('div', {}, void 0, _jsx('div', {
	        id: 'calendar',
	        className: _ViewCalendar2.default.calendarRender
	      }, void 0, ' '), _react2.default.createElement(_lib.ToastContainer, {
	        toastMessageFactory: ToastMessageFactory,
	        ref: 'calendar_container',
	        className: 'toast-top-right'
	      }), _jsx(_reactBootstrap.Modal, {
	        show: this.state.showEditSlot,
	        onHide: this.showOrHideEditScheduler
	      }, void 0, _jsx(_Modal.Header, {
	        closeButton: true
	      }, void 0, _jsx(_Modal.Title, {
	        className: _ViewCalendar2.default.popHeadingAll
	      }, void 0, this.props.intlData.create_edit_class)), _jsx(_Modal.Body, {}, void 0, _jsx('div', {
	        className: _ConfSettings2.default.meetingDetails
	      }, void 0, _jsx('div', {
	        className: _ConfSettings2.default.meetingInfoBlock
	      }, void 0, _jsx('form', {}, void 0, _jsx('div', {
	        className: cls_calendarInlineBlock
	      }, void 0, _jsx('ul', {
	        className: 'clearfix'
	      }, void 0, _jsx('li', {
	        style: { width: "40%" }
	      }, void 0, _ref19, _jsx('div', {
	        className: _ConfSettings2.default.dateTimePickerBlock,
	        id: 'startTime'
	      }, void 0, _jsx(_reactBootstrapDatetimepicker2.default, {
	        mode: 'time',
	        onChange: this.handleStartTimeChange,
	        dateTime: this.state.startTime
	      }))), _jsx('li', {
	        style: { width: "30%" }
	      }, void 0, _ref20, _jsx('div', {
	        className: _ConfSettings2.default.dateTimePickerBlock
	      }, void 0, _jsx('select', {
	        className: 'form-control',
	        onChange: this.handleHours,
	        defaultValue: this.state.hours
	      }, void 0, hrs.map(function (value) {
	        return _jsx('option', {
	          value: value
	        }, value, value, ' hrs');
	      })))), _jsx('li', {
	        style: { width: "30%" }
	      }, void 0, _ref21, _jsx('div', {
	        className: _ConfSettings2.default.dateTimePickerBlock
	      }, void 0, _jsx('select', {
	        className: 'form-control',
	        onChange: this.handleMinutes,
	        defaultValue: this.state.minutes
	      }, void 0, mins.map(function (value) {
	        return _jsx('option', {
	          value: value
	        }, value, value, ' mins');
	      })))))))))), _jsx(_Modal.Footer, {}, void 0, _jsx('label', {}, void 0, this.state.error), _jsx('button', {
	        className: 'btn btn-success btn-icon btn-sm',
	        onClick: this.handleUpdate.bind(this)
	      }, void 0, _ref22))), _jsx(_reactBootstrap.Modal, {
	        show: this.state.editshow,
	        onHide: this.closeEdit,
	        container: this,
	        'aria-labelledby': 'contained-modal-title'
	      }, void 0, _jsx(_reactBootstrap.Modal.Header, {
	        closeButton: true
	      }, void 0, _jsx(_reactBootstrap.Modal.Title, {
	        id: 'contained-modal-title',
	        className: _ViewCalendar2.default.popHeadingAll
	      }, void 0, 'Edit Current Day / Recurring')), _ref23, _jsx(_reactBootstrap.Modal.Footer, {}, void 0, _jsx(_reactBootstrap.Button, {
	        onClick: this.editCurrentDay
	      }, void 0, 'Current'), _jsx(_reactBootstrap.Button, {
	        onClick: this.editRecurring
	      }, void 0, 'Recurring'))), _jsx(_reactBootstrap.Modal, {
	        show: this.state.deleteshow,
	        onHide: this.closeDelete,
	        container: this,
	        'aria-labelledby': 'contained-modal-title'
	      }, void 0, _jsx(_reactBootstrap.Modal.Header, {
	        closeButton: true
	      }, void 0, _jsx(_reactBootstrap.Modal.Title, {
	        id: 'contained-modal-title',
	        className: _ViewCalendar2.default.popHeadingAll
	      }, void 0, 'Delete Current Day / Recurring')), _ref24, _jsx(_reactBootstrap.Modal.Footer, {}, void 0, _jsx(_reactBootstrap.Button, {
	        onClick: this.deleteCurrentDay
	      }, void 0, 'Current'), _jsx(_reactBootstrap.Button, {
	        onClick: this.deleteRecurring
	      }, void 0, 'Recurring'))), _jsx(_reactBootstrap.Modal, {
	        show: this.state.showEvent,
	        onHide: this.showOrHideEvent
	      }, void 0, _jsx(_Modal.Header, {
	        closeButton: true
	      }, void 0, _jsx(_Modal.Title, {
	        className: _ViewCalendar2.default.popHeadingAll
	      }, void 0, this.props.intlData.room)), _jsx(_Modal.Body, {}, void 0, _jsx('div', {}, void 0, _jsx('p', {}, void 0, 'Meeting Name :: ', data && data.meetingName ? data.meetingName : ''), _jsx('p', {}, void 0, 'Room Name :: ', data && data.roomId ? data.roomId.roomName : ''), _jsx('p', {}, void 0, 'Date :: ', data && data.dates ? moment(data.dates.startTime, 'x').format('DD/MM/YYYY') : ''), _jsx('p', {}, void 0, 'Start Time :: ', data && data.dates ? moment(data.dates.startTime, 'x').format('hh:mm A') : ''), _jsx('p', {}, void 0, 'End Time :: ', data && data.dates ? moment(data.dates.endTime, 'x').format('hh:mm A') : ''), _jsx('p', {}, void 0, 'Organizer :: ', data && data.createdBy ? data.createdBy.firstname : ''))), _jsx(_Modal.Footer, {}, void 0, this.scheduleOptions())), this.props.loggedInData.data.role != _roles.Roles.Student ? _react2.default.createElement(
	        _reactDraggable2.default,
	        _extends({ handle: '.handle' }, dragHandlers),
	        _jsx('div', {
	          className: cls_mixStream,
	          title: this.props.intlData.messages.drag
	        }, void 0, _ref25, _jsx('span', {
	          className: _Dashboard2.default.videoBackButton,
	          onClick: this.navigateBack.bind(this),
	          title: this.props.intlData.messages.back
	        }, void 0, _ref26))
	      ) : null, _jsx(_Scheduler2.default, {
	        showModal: this.state.showScheduler,
	        calenderDate: this.state.selectedDate,
	        hidecallback: this.showOrHideScheduler.bind(this),
	        saveSchedule: this.createSchedule.bind(this),
	        scheduleData: this.state.data,
	        errorStatus: this.state.errorStatus,
	        role: this.props.loggedInData.data.role
	      }));
	    }
	  }]);
	
	  return FullCalendar;
	}(_react2.default.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
	  return {
	    FullCalendarEventsData: (0, _FullCalendarReducer.FullCalendarEventsData)(state),
	    loggedInData: (0, _LoginReducer.loggedInData)(state),
	    intlData: (0, _IntlReducer.intlData)(state)
	  };
	}
	
	FullCalendar.contextTypes = {
	  router: _react2.default.PropTypes.object
	  // intl: React.PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(FullCalendar);
	
	// https://stackoverflow.com/questions/41981994/force-update-jquery-fullcalendar-after-prop-change-in-react-js
	
	
	// import React, { PropTypes, Component } from 'react';
	// // import $ from 'jquery';
	// import moment from 'moment';
	
	// class Calendar extends React.Component {
	
	//   componentDidMount() {
	//     $('#calendar').fullCalendar({
	//       header: {
	//         left: 'prev,next today',
	//         center: 'title',
	//         right: 'month,agendaWeek,agendaDay'
	//       },
	//       editable: true,
	//       droppable: true,
	//       drop: function() {
	//         if ($('#drop-remove').is(':checked')) {
	//           $(this).remove();
	//         }
	//       }
	//     })
	//   }
	
	//   render() {
	//     return (<div id="calendar"></div>);
	//   }  
	// }
	
	// export default Calendar;

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Scheduler = undefined;
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(3);
	
	var _reactIntl = __webpack_require__(11);
	
	var _reactFontawesome = __webpack_require__(15);
	
	var _reactFontawesome2 = _interopRequireDefault(_reactFontawesome);
	
	var _reactBootstrapDatetimepicker = __webpack_require__(86);
	
	var _reactBootstrapDatetimepicker2 = _interopRequireDefault(_reactBootstrapDatetimepicker);
	
	var _moment = __webpack_require__(1);
	
	var _moment2 = _interopRequireDefault(_moment);
	
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
	
	var _Modal = __webpack_require__(52);
	
	var _UserDashboardActions = __webpack_require__(24);
	
	var _ConfSettings = {
	  "contactListFixed": "_3YyeeAlwH39lu4k1AcsVzz",
	  "attendeesListFixed": "_2K0WCxOutftWQWUC97yMC7",
	  "groupChatFixed": "_3_JIhKB0tI9DD5OYYcFFhO",
	  "indiChatFixed": "_121x6wkYY9bMxq2znilpes",
	  "settingOptionsFixed": "_3paKcIA8hOSOXOYxlVoxNm",
	  "openSettingOptions": "Luc2pUw4qPvGeP6xwmHcG",
	  "openMyContacts": "_1C6XGrkAGrUazLBzl1a02S",
	  "openIndiChat": "UQfb0iYQl4dhQKuOnsjni",
	  "onCalPadding1": "_3gqfldlZ-Z_Sekdsf_JmV8",
	  "onCalPadding2": "TpdjC_Scf0J7ibmshcsHB",
	  "tableBlock": "_2Pi4V-gyA8hujIg37JdcPF",
	  "tableBlockRow": "_1KxRi3MxZO0VArI7RlCPxV",
	  "tableBlockCell": "_3w6tOWgPscVGXLLUlIP7GM",
	  "modAsideHeader": "_3-QQh-Lc7fsJw9YCfe35cM",
	  "modAsideHeaderWhite": "_1DkMVq5OjZv2giJ2lz8Xbx",
	  "modHeaderList": "_1VcV32VYR_IteNriuqUrZx",
	  "block50": "_3KEUbD9sh-5efPnOe48KQu",
	  "nohover": "m7jTOV3afDX3KYXfpJDuW",
	  "fileUpload": "_1Ta80WwlyVY6khGgoelZff",
	  "modHeaderWhiteList": "QSATVkaBXWZG4ZflFM5PB",
	  "active": "_3wgRcJQgpFwV1Tze6eaYAL",
	  "modNoContacts": "_2dScJey0ocmQJ61rLItP-A",
	  "noContactsCircle": "_3fppM4qH32McKUY31Jd-6v",
	  "modSearchBlock": "_2ixaFhqvPC_d1LihI6OOiz",
	  "navbarFormCustom": "yKPBmk6p-C2xFA-2Ows1k",
	  "backSearch": "w7BGjmEiChPoMYjET5k8R",
	  "subNavBars": "AH4Om8A-_X-udTyFQ7ZaF",
	  "topLeftLogo": "_1-GqCHAZRcGKZa8ZI-O_X3",
	  "modContactList": "_1zmiGIPb92yNtOu845RHyM",
	  "chatBox": "_2taDr3sNLvZl64o7TkBTEg",
	  "callBox": "_3Gp0sm-V9Sto6Pc6w2dIJk",
	  "midTitle": "_1CjowBdVtt6x8kMj4GrzgR",
	  "modAsideListBody": "_2DV2QAFRMgCwwweXaahjbD",
	  "contactContainer": "BX4gsvYQEJ_UxHYXquiM_",
	  "avatarBox": "_3bvAwAP34cIm79JtYGBa_9",
	  "contactInfoBox": "_3cjt3RdW6fRpFCY2cWtvKD",
	  "listStatusCircle": "P_Vqoj0CkeWDRXFsu5ehX",
	  "onlineColor": "_1wBno7dwEzhNENm5FFYuNf",
	  "busyColor": "_1n4n0IG8nR8VNBkhdiq1hk",
	  "bgOffline": "jL-R5aQBwO_2EmgAsiay1",
	  "bgOnline": "_3TEYblB_gY5codKEtLqX7q",
	  "adjustForModal": "_1u3ETV1bbhpgq63k3OJztN",
	  "addOn": "_1Q2E4mFH1Nbr5A47e3lt7L",
	  "formControlCustom": "BFcJiZMNYiw9nyvHzU7Rx",
	  "inputGroupBtn": "_2nCnROACf_M8pzec6EM7E6",
	  "btn": "_27VXnOss6C0tcmiXDJyEQY",
	  "btnSearch": "ZfOcSiAJS-yXPDPQgHF4e",
	  "topMrgZero": "_2o-JH37Bqi-l9CT81GRGjn",
	  "modProfileCard": "_2JPfY65up63hkI3vhK4ptW",
	  "addNowBlock": "_1W6-RmWzqJiQLK1pcBavDu",
	  "btnAddContact": "_3aNMiTsg3DLcR-4J2Y_5MR",
	  "btnAddedContact": "_1bX98ziw9A1ojzalhVjdIn",
	  "contactInfoBlock": "_1Wo1W59FlAtVXV30dsfoPD",
	  "asideBodySecondary": "_10yt3T9QoXDhC8rqK-kAA2",
	  "modSelectChoice": "_33_xmT9lclkFPIqAT9rNlC",
	  "headerText": "_2POMQ33JzpZXRKNQwhKTpK",
	  "optionsBlock": "_2Hljs23RSy64iPvRKW8UVf",
	  "settingsOptionInput": "Avxs4QLLmPyHnmuu6zFH6",
	  "click-wave": "_1B9ixe0Xk37c7IQaSeA-9F",
	  "radio": "_1YNHku8cDP1FxyBn3XkUJY",
	  "modChatBody": "_9MKv9eaGfnPfSvgrjOIeK",
	  "modChatContainer": "_21msPTbxn87ey3RWsSt_35",
	  "selfChatBox": "_2YE5OVKMMJqey9Zvc5_Dk-",
	  "avatarCircle": "_3t6DqYa8W4OjIj_EF90-T1",
	  "messageBox": "_2T5QmUyalQ5yF2jPtvDJDr",
	  "downloadFile": "_33q4w5biPTOCecW_SwRklY",
	  "downloadMedia": "LiHJPdfKZT7yHz2F8sr0U",
	  "textField": "_3zRLRN3HHrTZ_xaEcFhS9C",
	  "otherChatBox": "_1qZ7OG5sw3T_39aOzvAyCc",
	  "chatMediaBox": "VS8lEUQuRxq9jwuxa4f0-",
	  "modChatFooter": "_3Kb0OVypvH6v1meOExS2Oq",
	  "chatWrite": "_2jwPxajNYm5H_vrK7q_9tM",
	  "formControlChatOverwrite": "F6fdFHvEw_Mpy1wlxe2Bg",
	  "sendMessage": "_2OxgF4p4Jtp0wysNk_Dy5_",
	  "avatarCircleGuest": "_2xlj1cSx9qua6H5Rjhy3wC",
	  "setConfPassword": "_2m3UxvMEUMBkXP7gGLc3ox",
	  "iconBlock": "_1llySoPNa1j3k655fl2PNS",
	  "passWordBlock": "_2z5dmQWuPHtQL2grl4Rd92",
	  "meetingDetails": "_1sj35kVEBVp66LoUjk7Pvl",
	  "meetingInfoBlock": "_1T7YyYvtu5N7JuDsWHAgPR",
	  "inputError": "_30zq1PCjl9v2jnkrDEFjSK",
	  "formControlOverwrite": "_2yPlkP5pH38hsoOHEV9Yrb",
	  "calendarInlineBlock": "_3-PsrheDdsPKEdUSGIir2n",
	  "endsOnBlock": "gkiQ3RaZAclcm5W2_yi1v",
	  "schedlDate": "_1R340GeG3VFBlX-dP9P0Ub",
	  "schedlTime": "_3CKgTfQeRBoFX_uCGzKeNG",
	  "schedlDuration": "P1l9_DlNKhzuxO45SRUzq",
	  "onSpan": "_1rAiAWHfT1m-kgPikHlRXs",
	  "repeatsList1": "_RT_TjG0GSJVgzkhOcoGM",
	  "repeatsList2": "_3jQ7JwdBE8oJGy-gjbHtwh",
	  "schedlHour": "_1ArS5dXvY1zt9tn0Sc_z_f",
	  "schedlMins": "_2dwV_Lh-ernG9imoJU1hpw",
	  "inputGroupAddonOverwrite": "_3fLlY1-oVeGeMJUk7JZxW8",
	  "setDueDateOverwrite": "_23XZMgNyAur3QMU5c-hiT",
	  "dateTimePickerBlock": "_7EHobKKJefSu_2XmHE49F",
	  "actionBlock": "_2ETKg3XUqJOstPZcN_kqEu",
	  "actionButtonBox": "_2xe2-CWYD_0PEak4DXOGv9",
	  "indChatNotification": "_14IhbO1qkUW6uAP7NxZsbH",
	  "alignMidBlock": "_3hun2u2tqVy7KR7JqmMf6P",
	  "centerBlock": "HLVHVZhqp-7yopt3Ah073",
	  "btnCodec": "pDa1Eh41y3LmhqUTgK-UT",
	  "transBlock": "_1qfpk41qZbXSP1Lma_yvNe",
	  "btnTransport": "szHYW92cM7tgGZoXatQyg",
	  "helpdesk": "_3_EJ-vjbaDbucjQz2CYAjT",
	  "sliderA": "_2wwiNxtBAlrjRa7R2Jz_iO",
	  "scheduFullBlock": "_1gzSrAarjNRvFeiRj044Pu",
	  "scheduImgBlock": "_3J0gQCTcBOKDfB0jlMAtrt",
	  "sliderB": "_3IdDVUuL8XEJZcsFNi5DNT",
	  "sliderText": "_3aTkGPXbvwzEcm-3mn-d8p",
	  "sideDrop": "_3OKv2xPQewcH8b_Ei7HU6K",
	  "popHeadingAll": "_2p3SY545DrLPd7fl4Izqbd",
	  "btnApplyAll": "_2fyYhx6LAR6RJEHKRk9QXt",
	  "emailInChatText": "_29xq-DgQlxvSeE_5T3jrT3",
	  "formGroup": "_3KjN0y7pluCsc5z7xi6g2j",
	  "formGroupLabel": "_3FTezjO4FR-bN9QI0TPU6g",
	  "colForinput1": "_2M0ngeCbsTsOe_UXDZGYfW",
	  "colForinput2": "_1y0IYYKA3YAxi9BkFZt9tl",
	  "endOnPara": "_1pcv1il3aX3hB0V2sNJjfn",
	  "toastTop": "_1kFxA5k985kes0bDJBKYjM"
	};
	
	var _ConfSettings2 = _interopRequireDefault(_ConfSettings);
	
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
	
	var _roles = __webpack_require__(46);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'invalid_date'
	});
	
	var _ref2 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'invalid_start_time'
	});
	
	var _ref3 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'minimum_date'
	});
	
	var _ref4 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'start_time_greater'
	});
	
	var _ref5 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'select_duration'
	});
	
	var _ref6 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'enter_occurence'
	});
	
	var _ref7 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'select_the_days'
	});
	
	var _ref8 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'invalid_enddate'
	});
	
	var _ref9 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'select_the_days'
	});
	
	var _ref10 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'select_the_endson'
	});
	
	var _ref11 = _jsx('option', {
	  value: ''
	}, void 0, 'No room');
	
	var _ref12 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'selectroom'
	});
	
	var _ref13 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'create_edit_class'
	});
	
	var _ref14 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'create_edit_conference'
	});
	
	var _ref15 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'enter_meeting_name'
	});
	
	var _ref16 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'select_room'
	});
	
	var _ref17 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'choose_anavailable_date'
	}));
	
	var _ref18 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_start_time'
	}));
	
	var _ref19 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_duration'
	}));
	
	var _ref20 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'repeats'
	}));
	
	var _ref21 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'repeat_every'
	}));
	
	var _ref22 = _jsx('p', {}, void 0, _jsx(_reactIntl.FormattedMessage, {
	  id: 'repeat_on'
	}));
	
	var _ref23 = _jsx('p', {}, void 0, 'Repeat By');
	
	var _ref24 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'ends_on'
	});
	
	var _ref25 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'after'
	});
	
	var _ref26 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'occurences'
	});
	
	var _ref27 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'On'
	});
	
	var _ref28 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_class_password'
	});
	
	var _ref29 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'set_conference_password'
	});
	
	var _ref30 = _jsx('img', {
	  src: '/images/black-icons/black-lock.png'
	});
	
	var _ref31 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'cancel'
	});
	
	var _ref32 = _jsx(_reactIntl.FormattedMessage, {
	  id: 'save'
	});
	
	var Scheduler = exports.Scheduler = function (_Component) {
	  _inherits(Scheduler, _Component);
	
	  function Scheduler(props) {
	    _classCallCheck(this, Scheduler);
	
	    var _this = _possibleConstructorReturn(this, (Scheduler.__proto__ || Object.getPrototypeOf(Scheduler)).call(this, props));
	
	    _this.handleNameChange = function (e) {
	      _this.setState({ meetingName: e.target.value });
	    };
	
	    _this.handlePasswordChange = function (e) {
	      _this.setState({ password: e.target.value });
	    };
	
	    _this.handleTopicChange = function (e) {
	      _this.setState({ topicId: e.target.value });
	    };
	
	    _this.handleRoomChange = function (e) {
	      if (e.target.value != '') {
	        var topics = _this.state.topicsList[e.target.value];
	        if (topics != false) {
	          var values = [['', 'Select Topic']];
	          _.each(topics, function (doc) {
	            values.push([doc._id, doc.topicName]);
	          });
	          var topicOptions = values.map(function (doc) {
	            return _jsx('option', {
	              value: doc[0]
	            }, doc[0], doc[1]);
	          });
	          _this.setState({ topic: true, topicOptions: topicOptions, topicId: '', roomId: e.target.value });
	        } else {
	          _this.setState({ topic: false, topicOptions: null, topicId: '', roomId: e.target.value });
	        }
	      } else {
	        _this.setState({ topic: false, topicOptions: null, topicId: '', roomId: '' });
	      }
	    };
	
	    _this.handleDateChange = function (newDate) {
	      if ((0, _moment2.default)(newDate, "DD/MM/YYYY").isValid()) {
	        var d = (0, _moment2.default)(newDate, "DD/MM/YYYY").format('x');
	        if (_this.state.type == 'W') {
	          var day = (0, _moment2.default)(newDate, "DD/MM/YYYY").day();
	          _this.setState({ inputDate: d, days: [day] });
	        } else {
	          _this.setState({ inputDate: d });
	        }
	        if (_this.state.type == 'M') {
	          _this.findWeekDay(d, _this.state.repeatBy);
	        }
	      } else {
	        _this.setState({ inputDate: false });
	      }
	    };
	
	    _this.handleStartTimeChange = function (newTime) {
	      (0, _moment2.default)(newTime, "x").isValid() ? _this.setState({ startTime: (0, _moment2.default)(newTime, "x").format('x') }) : _this.setState({ startTime: false });
	    };
	
	    _this.handleEndTimeChange = function (newTime) {
	      (0, _moment2.default)(newTime, "x").isValid() ? _this.setState({ endTime: (0, _moment2.default)(newTime, "x").utc().toDate() }) : _this.setState({ endTime: false });
	    };
	
	    _this.handleRepeats = function (event) {
	      if (event.target.value == 'W') {
	        var day = (0, _moment2.default)(_this.state.inputDate, 'x').day();
	        _this.setState({ days: [day] });
	      } else if (event.target.value == 'M') {
	        _this.setState({ repeatBy: 0 });
	      }
	      if (event.target.value != 'W') {
	        _this.setState({ days: [], type: event.target.value });
	      } else if (event.target.value != 'M') {
	        _this.setState({ repeatBy: null, type: event.target.value });
	        _this.findWeekDay(_this.state.inputDate, 0);
	      } else {
	        _this.setState({ type: event.target.value });
	      }
	    };
	
	    _this.handleRepeatEvery = function (event) {
	      _this.setState({ repeatDuration: Number(event.target.value) });
	    };
	
	    _this.handleRecurring = function (event) {
	      _this.setState({ recurring: !_this.state.recurring });
	    };
	
	    _this.handleDays = function (event) {
	      var val = _this.state.days;
	      var value = Number(event.target.value);
	      var index = _.indexOf(val, value);
	      if (index > -1) {
	        val.splice(index, 1);
	      } else {
	        val.push(value);
	      }
	      _this.setState({ days: val });
	    };
	
	    _this.handleEndson = function (event) {
	      var val = Number(event.target.value);
	      if (val == 1) {
	        _this.setState({ endsOn: val });
	      } else if (val == 2) {
	        _this.setState({ endsOn: val });
	      }
	    };
	
	    _this.handleEndDate = function (newDate) {
	      (0, _moment2.default)(newDate, "DD/MM/YYYY").isValid() ? _this.setState({ endDate: newDate }) : _this.setState({ endDate: (0, _moment2.default)().format("DD/MM/YYYY") });
	    };
	
	    _this.handleOccurence = function (event) {
	      _this.setState({ no_of_occurence: event.target.value });
	    };
	
	    _this.findWeekDay = function (input, val) {
	      if (val == 0) {
	        var d = (0, _moment2.default)(input, 'x').date();
	      } else if (val == 1) {
	        var _d = (0, _moment2.default)(input, 'x');
	        var t = (0, _moment2.default)();
	        t.date(1).month(_d.month()).year(_d.year());
	        t = t.subtract(t.day(), 'days');
	        var st = 0;
	        for (var i = t; i.isSame((0, _moment2.default)().year(_d.get('year')).month(_d.get('month')).date(_d.get('date'))) || i.isBefore((0, _moment2.default)().year(_d.get('year')).month(_d.get('month')).date(_d.get('date'))); i.add(1, 'days')) {
	          if (i.get('month') == _d.get('month') && i.day() == _d.day()) {
	            st++;
	          }
	        }
	        _this.setState({ repeatByDay: _d.day(), repeatByCount: st });
	      }
	    };
	
	    _this.handleRepeatBy = function (event) {
	      var val = Number(event.target.value);
	      _this.findWeekDay(_this.state.inputDate, val);
	      _this.setState({ repeatBy: val });
	    };
	
	    _this.handleHours = function (event) {
	      _this.setState({ hours: event.target.value });
	    };
	
	    _this.handleMinutes = function (event) {
	      _this.setState({ minutes: event.target.value });
	    };
	
	    _this.state = {
	      date: (0, _moment2.default)().format('DD/MM/YYYY'),
	      error: '',
	      inputDate: (0, _moment2.default)().format('x'),
	      startTime: (0, _moment2.default)().format('x'),
	      endDate: (0, _moment2.default)().format('DD/MM/YYYY'),
	      no_of_occurence: '',
	      type: 'D',
	      repeatDuration: 1,
	      days: [],
	      meetingName: '',
	      password: '',
	      topic: false,
	      roomId: '',
	      topicId: '',
	      waiting: false,
	      recurring: false,
	      endsOn: 0,
	      repeatBy: 0,
	      repeatByDay: null,
	      repeatByCount: null,
	      hours: '',
	      minutes: '',
	      topicsList: {},
	      rooms: null
	    };
	    _this.form = {};
	    _this.id = null;
	    _this.cls_block50_l = _ConfSettings2.default.block50 + ' pull-left';
	    _this.cls_btnSaveEdit = ' ' + _Admin2.default.btnSaveAssign + ' ';
	    _this.cls_formControlOverwrite = _ConfSettings2.default.formControlOverwrite + ' form-control ';
	    // this.cls_formControlOverwrite = `${styles.formControlOverwrite} ${adminStyles.inputAllCap} form-control `;
	    _this.cls_calendarInlineBlock = _ConfSettings2.default.calendarInlineBlock + ' clearfix';
	    _this.cls_endsOnBlock = _ConfSettings2.default.endsOnBlock + ' clearfix';
	    _this.cls_inputGroupAddonOverwrite = _ConfSettings2.default.inputGroupAddonOverwrite + ' input-group-addon';
	    _this.cls_confDatePicker = _ConfSettings2.default.setDueDateOverwrite + ' set-due-date form-control confDatepicker';
	    _this.cls_confTimePicker = _ConfSettings2.default.setDueDateOverwrite + ' set-due-date form-control confTimeTpicker';
	    _this.cls_errcls = '' + _component2.default.scheduleerror;
	    _this.topicField = null;
	
	    return _this;
	  }
	
	  _createClass(Scheduler, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;
	
	      (0, _UserDashboardActions.getMyScheduleRooms)().then(function (res) {
	        _this2.setState({ rooms: res.data, topicsList: res.topics });
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this3 = this;
	
	      if (nextProps.showModal) {
	        (0, _UserDashboardActions.getMyScheduleRooms)().then(function (res) {
	          _this3.setState({ rooms: res.data, topicsList: res.topics });
	        });
	      }
	      if (nextProps.scheduleData && nextProps.scheduleData != null && nextProps.errorStatus == false && this.state.waiting == false) {
	        var topicOptions = null;
	        var topics = this.state.topicsList[nextProps.scheduleData.roomId];
	        if (topics != false) {
	          var values = [['', 'Select Topic']];
	          _.each(topics, function (doc) {
	            values.push([doc._id, doc.topicName]);
	          });
	          topicOptions = values.map(function (doc) {
	            return _jsx('option', {
	              value: doc[0]
	            }, doc[0], doc[1]);
	          });
	        }
	        if (nextProps.scheduleData.pattern && nextProps.scheduleData.pattern != '' && nextProps.scheduleData.pattern != 'undefined') {
	          var pattern = nextProps.scheduleData.pattern;
	          var recurring = pattern.split('#')[0].split('-')[5];
	          var res = pattern.substring(8).split("-")[0];
	          var d = [];
	          for (var j = 0; j < res.length; j++) {
	            if (res[j] != ",") {
	              d.push(parseInt(res[j]));
	            }
	          }
	          var obj = {
	            recurring: true,
	            type: pattern[0],
	            repeatDuration: Number(pattern[2]),
	            repeatBy: 0,
	            days: d
	          };
	          if (recurring != '_') {
	            obj["no_of_occurence"] = recurring;
	            obj["endsOn"] = 1;
	            this.form["endsOn"] = 1;
	            this.form["no_of_occurence"] = recurring;
	            this.form["endDateType"] = 'C';
	          } else {
	            delete this.form['endDateType'];
	            obj["no_of_occurence"] = '';
	            obj["endsOn"] = 2;
	            this.form["endsOn"] = 2;
	            this.form["no_of_occurence"] = '';
	          }
	          this.setState(obj);
	          this.form["repeatBy"] = 0;
	          this.form["repeatDuration"] = Number(pattern[2]);
	          this.form["type"] = pattern[0];
	        }
	
	        var h = Math.floor(Number(nextProps.scheduleData.duration) / 60);
	        var m = Number(nextProps.scheduleData.duration) - h * 60;
	
	        this.setState({
	          date: (0, _moment2.default)(nextProps.scheduleData.startDate, 'x').format('DD/MM/YYYY'),
	          inputDate: (0, _moment2.default)(nextProps.scheduleData.startDate, 'x'),
	          startTime: (0, _moment2.default)(nextProps.scheduleData.startDate, 'x').format('x'),
	          hours: h,
	          minutes: m,
	          meetingName: nextProps.scheduleData.meetingName,
	          password: nextProps.scheduleData.password && nextProps.scheduleData.password != 'undefined' ? nextProps.scheduleData.password : '',
	          topicId: nextProps.scheduleData.topicId,
	          roomId: nextProps.scheduleData.roomId,
	          topic: topicOptions != null ? true : false,
	          topicOptions: topicOptions,
	          endDate: (0, _moment2.default)(nextProps.scheduleData.endDate, 'x').format('DD/MM/YYYY'),
	          error: ''
	        });
	
	        this.form["endDate"] = nextProps.scheduleData.endDate;
	        // this.form["_id"] = nextProps.scheduleData._id;
	        this.id = nextProps.scheduleData._id;
	        this.form["roomId"] = nextProps.scheduleData.roomId;
	        this.form["topicId"] = nextProps.scheduleData.topicId;
	        this.form["duration"] = nextProps.scheduleData.duration;
	      } else if (nextProps.errorStatus != true && this.state.waiting != true) {
	        // delete this.form["_id"];
	        delete this.form["roomId"];
	        delete this.form["topicId"];
	        var newState = {};
	        if (nextProps.calenderDate) {
	          var now = (0, _moment2.default)().startOf('day');
	          var date = (0, _moment2.default)(nextProps.calenderDate).endOf('day');
	
	          if (+now < +date) {
	            newState["date"] = (0, _moment2.default)(nextProps.calenderDate).format('DD/MM/YYYY');
	            newState["inputDate"] = nextProps.calenderDate;
	            newState["startTime"] = (0, _moment2.default)().format('x');
	          } else {
	            newState["date"] = (0, _moment2.default)().format('DD/MM/YYYY');
	            newState["inputDate"] = nextProps.calenderDate;
	            newState["startTime"] = (0, _moment2.default)(nextProps.calenderDate).format('x');
	          }
	          newState["hours"] = '';
	          newState["minutes"] = '';
	          newState["roomId"] = '';
	          newState["days"] = [];
	          newState["repeatDuration"] = 1;
	          newState["recurring"] = false;
	          newState["no_of_occurence"] = '';
	          newState["type"] = 'D';
	          // newState["duration"] = 10;
	          newState["endsOn"] = 0;
	          newState["repeatBy"] = 0;
	          newState["repeatByDay"] = null;
	          newState["repeatByCount"] = null;
	          newState["meetingName"] = '';
	          newState["password"] = '';
	          newState["error"] = '';
	          newState["topicId"] = '';
	          newState["topic"] = false;
	          newState["endDate"] = (0, _moment2.default)().format('DD/MM/YYYY');
	        }
	        this.id = null;
	        this.setState(newState);
	      } else {
	        this.setState({ waiting: false });
	      }
	    }
	
	    /*handleDuration = (event) => {
	      this.setState({ duration : event.target.value });
	    }*/
	
	  }, {
	    key: 'handleSave',
	    value: function handleSave() {
	      var now = Number((0, _moment2.default)().seconds(0).format('x'));
	      if (this.state.inputDate == false) this.setState({ error: _ref });else if (this.state.startTime == false) this.setState({ error: _ref2 });else {
	        var inputDate = (0, _moment2.default)(this.state.inputDate, 'x').endOf('day');
	        var sTime = (0, _moment2.default)(this.state.startTime, 'x');
	        var startTime = inputDate.clone();
	        startTime.hour(sTime.hour()).minute(sTime.minute()).second(0).format('x');
	        inputDate.format('x');
	        var h = this.state.hours != '' ? this.state.hours * 60 : 0;
	        var m = this.state.minutes != '' ? this.state.minutes : 0;
	        this.form = {
	          meetingName: this.state.meetingName,
	          roomId: this.state.roomId,
	          topicId: this.state.topicId,
	          duration: Number(h) + Number(m),
	          recurring: this.state.recurring,
	          password: this.state.password,
	          todayStart: Number((0, _moment2.default)(this.state.date, 'DD/MM/YYYY').startOf('day').utc().format('x')),
	          todayEnd: Number((0, _moment2.default)(this.state.date, 'DD/MM/YYYY').endOf('day').utc().format('x'))
	        };
	
	        if (this.id != null) {
	          var edit_start_date = (0, _moment2.default)(this.props.selectedDate).startOf('day');
	          edit_start_date.hour(sTime.hour()).minute(sTime.minute()).second(0).utc().format('x');
	          this.form['edit_start_date'] = Number(edit_start_date);
	          this.form['todayStart'] = Number((0, _moment2.default)(this.props.selectedDate).startOf('day').utc().format('x'));
	          this.form['todayEnd'] = Number((0, _moment2.default)(this.props.selectedDate).endOf('day').utc().format('x'));
	        } else {
	          delete this.form['edit_start_date'];
	        }
	
	        //changed by jyothi for mandatory fields to enter meeting name & select room name.
	        if (this.state.meetingName == '' && this.state.roomId == '') {
	          this.setState({ error: null });
	        } else if (!this.form.meetingName || this.form.meetingName == "") {
	          this.refs.meetingName.focus();
	          this.setState({ error: 'meetingName' });
	        } else if (!this.form.roomId || this.form.roomId == "") {
	          this.refs.roomId.focus();
	          this.setState({ error: 'roomId' });
	        } else if ( /*(this.id != null && this.state.recurring == false && Number(inputDate) < now) ||*/this.id != null && Number(inputDate) < now || this.id == null && Number(inputDate) < now) {
	          this.setState({ error: _ref3 });
	        } else if ( /*(this.id != null && this.state.recurring == false && Number(startTime) < now) || */this.id == null && Number(startTime) < now) {
	          this.setState({ error: _ref4 });
	        } else if (this.form.duration == 0) {
	          this.setState({ error: _ref5 });
	        } else {
	          var startDate = (0, _moment2.default)(startTime, 'x');
	          this.form['startDate'] = Number((0, _moment2.default)(startTime, 'x').utc().format('x'));
	          this.setState({ error: '' });
	          if (this.state.recurring == false) {
	            var endDate = startDate.clone();
	            endDate.add(this.form.duration, 'minutes').utc().format('x');
	            this.form['endDate'] = Number(endDate);
	            this.setState({ waiting: true });
	            this.props.saveSchedule(this.form, this.id);
	          } else {
	            this.form['type'] = this.state.type;
	            this.form['repeatDuration'] = this.state.repeatDuration;
	            if (this.state.endsOn == 1) {
	              delete this.form['endDate'];
	              if (this.state.no_of_occurence == '') {
	                this.setState({ error: _ref6 });
	              } else {
	                this.form['endDateType'] = 'C';
	                this.form['no_of_occurence'] = Number(this.state.no_of_occurence);
	                if (this.state.type == 'W' && this.state.days.length <= 0) {
	                  this.setState({ error: _ref7 });
	                } else if (this.state.type == 'W') {
	                  this.form['repeatOn'] = this.state.days;
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                } else if (this.state.type == 'M' && this.state.repeatBy == 0) {
	                  this.form['repeatBy'] = this.state.repeatBy;
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                } else if (this.state.type == 'M' && this.state.repeatBy == 1) {
	                  this.form['repeatBy'] = this.state.repeatBy;
	                  this.form['repeatByDay'] = this.state.repeatByDay;
	                  this.form['repeatByCount'] = this.state.repeatByCount;
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                } else {
	                  delete this.form['repeatOn'];
	                  // console.log("form ==== ", this.form);
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                }
	              }
	            } else if (this.state.endsOn == 2) {
	              delete this.form['endDateType'];
	              delete this.form['no_of_occurence'];
	              delete this.form['repeatOn'];
	              /*delete this.form['repeatByDay'];
	              delete this.form['repeatByCount'];*/
	              delete this.form['repeatBy'];
	
	              if (this.state.endDate == false) {
	                this.setState({ error: _ref8 });
	              } else {
	                var _endDate = (0, _moment2.default)(this.state.endDate, 'DD/MM/YYYY');
	                _endDate.hour(startDate.hour()).minute(startDate.minute()).second(0);
	                _endDate.add(this.form.duration, 'minutes');
	                this.form['endDate'] = Number(_endDate.utc().format('x'));
	                if (this.state.type == 'W' && this.state.days.length <= 0) {
	                  this.setState({ error: _ref9 });
	                } else if (this.state.type == 'W') {
	                  this.form['repeatOn'] = this.state.days;
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                } else if (this.state.type == 'M' && this.state.repeatBy == 0) {
	                  this.form['repeatBy'] = this.state.repeatBy;
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                } else if (this.state.type == 'M' && this.state.repeatBy == 1) {
	                  this.form['repeatBy'] = this.state.repeatBy;
	                  this.form['repeatByDay'] = this.state.repeatByDay;
	                  this.form['repeatByCount'] = this.state.repeatByCount;
	                  this.setState({ waiting: true });
	                  this.props.saveSchedule(this.form, this.id);
	                } else {
	                  this.setState({ waiting: true });
	                  // console.log("id ==== ", this.id);
	                  this.props.saveSchedule(this.form, this.id);
	                }
	              }
	            } else {
	              this.setState({ error: _ref10 });
	            }
	          }
	        }
	      }
	    }
	
	    //for schedule
	
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;
	
	      if (this.props.role) {
	        var role = this.props.role;
	      }
	      var cls_callpadding1 = _ConfSettings2.default.onCalPadding1 + ' col-sm-3 ';
	      var cls_callpadding2 = _ConfSettings2.default.onCalPadding2 + ' col-sm-9 ';
	      var cls_colForinput1 = _ConfSettings2.default.colForinput1 + ' col-sm-5 ';
	      var cls_colForinput2 = _ConfSettings2.default.colForinput2 + ' col-sm-7 ';
	
	      var cls_schedlHour = _ConfSettings2.default.schedlHour + ' col-sm-6 ';
	      var cls_schedlMins = _ConfSettings2.default.schedlMins + ' col-sm-6 ';
	
	      var date = this.state.date;
	
	      var mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
	      var hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	
	      var repeats = [{ key: 'D', value: 'Daily' }, { key: 'W', value: 'Weekly' }, { key: 'M', value: 'Monthly' }, { key: 'Y', value: 'Yearly' }];
	      var days = [{ key: 0, value: 'S', keyvalue: '0Sun' }, { key: 1, value: 'M', keyvalue: '1Mon' }, { key: 2, value: 'T', keyvalue: '2Tue' }, { key: 3, value: 'W', keyvalue: '3Wed' }, { key: 4, value: 'T', keyvalue: '4Thu' }, { key: 5, value: 'F', keyvalue: '5Fri' }, { key: 6, value: 'S', keyvalue: '6Sat' }];
	      var repeat_every = [];
	      for (var i = 1; i <= 30; i++) {
	        repeat_every.push(i);
	      }
	      var summary = '';
	      var d = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	      var n = ['first', 'second', 'third', 'fourth', 'fifth'];
	      if (this.state.type == 'D') {
	        summary = 'Summary : ';
	        summary += this.state.repeatDuration == 1 ? 'Daily' : 'Every ' + this.state.repeatDuration + ' days';
	      } else if (this.state.type == 'W') {
	        summary = 'Summary : ';
	        summary += this.state.repeatDuration == 1 ? 'Weekly' : 'Every ' + this.state.repeatDuration + ' weeks';
	        summary += ' on';
	        for (var _i = 0; _i < this.state.days.length; _i++) {
	          summary += ' ' + d[this.state.days[_i]];
	        }
	      } else if (this.state.type == 'M') {
	        summary = 'Summary : ';
	        summary += this.state.repeatDuration == 1 ? 'Monthly' : 'Every ' + this.state.repeatDuration + ' months';
	        summary += this.state.repeatBy == 0 ? ' on day ' + (0, _moment2.default)(this.state.inputDate, 'x').date() : this.state.repeatBy == 1 ? ' on ' + n[this.state.repeatByCount - 1] + ' ' + d[this.state.repeatByDay] : '';
	      } else if (this.state.type == 'Y') {
	        summary = 'Summary : ';
	        summary += this.state.repeatDuration == 1 ? 'Yearly' : 'Every ' + this.state.repeatDuration + ' years';
	      }
	      summary += this.state.endsOn == 1 && this.state.no_of_occurence != '' ? ', ' + this.state.no_of_occurence + ' times' : this.state.endsOn == 1 ? ', 0 times' : this.state.endsOn == 2 ? ', until ' + (0, _moment2.default)(this.state.endDate, 'DD/MM/YYYY').format('MMM Do YYYY') : '';
	
	      var roomsList = _ref11;
	      if (this.state.rooms) {
	        var docs = this.state.rooms;
	        var myRooms = [{ _id: '', name: _ref12 }];
	        if (docs.length > 0) {
	          var index = 0;
	          docs.map(function (doc) {
	            myRooms.push({ _id: doc._id, name: doc.roomName });
	          });
	        }
	        roomsList = myRooms.map(function (doc) {
	          return _jsx('option', {
	            value: doc._id
	          }, doc._id, doc.name);
	        });
	      }
	      var now = (0, _moment2.default)();
	      var currentdate = this.state.date;
	
	      var inpStyle = {
	        "float": "left",
	        "marginTop": "2px"
	      };
	      var spanRecurring = {
	        "marginLeft": "8px"
	      };
	      var onRadioo = {
	        "float": "left",
	        "marginTop": "2px"
	      };
	
	      return _jsx(_reactBootstrap.Modal, {
	        show: this.props.showModal,
	        onHide: this.props.hidecallback
	      }, void 0, _jsx(_Modal.Header, {
	        closeButton: true
	      }, void 0, _jsx(_Modal.Title, {
	        className: _Admin2.default.popHeadingAll
	      }, void 0, role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _ref13 : _ref14)), _jsx(_Modal.Body, {}, void 0, _jsx('div', {
	        className: _ConfSettings2.default.meetingDetails
	      }, void 0, _jsx('div', {
	        className: _ConfSettings2.default.meetingInfoBlock
	      }, void 0, _jsx('form', {}, void 0, _jsx('div', {
	        className: 'form-group'
	      }, void 0, _react2.default.createElement('input', { id: 'meetingName', type: 'text', name: 'meetingName', ref: 'meetingName', className: this.cls_formControlOverwrite, placeholder: role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? this.props.intl.messages.please_enter_class_name : this.props.intl.messages.please_enter_meeting_name, value: this.state.meetingName, onChange: this.handleNameChange, maxLength: 30, autoFocus: 'true' }), _jsx('small', {
	        id: 'meetingError',
	        className: _ConfSettings2.default.inputError
	      }, void 0, this.state.error == 'meetingName' || this.state.error == null ? _ref15 : null), _react2.default.createElement(
	        'select',
	        { id: 'roomId', name: 'roomId', ref: 'roomId', className: this.cls_formControlOverwrite, defaultValue: this.state.roomId, onChange: this.handleRoomChange.bind(this) },
	        roomsList
	      ), _jsx('small', {
	        id: 'roomIdError',
	        className: _ConfSettings2.default.inputError
	      }, void 0, this.state.error == 'roomId' || this.state.error == null ? _ref16 : null), this.state.topic == true ? _react2.default.createElement(
	        'select',
	        { id: 'topic', key: 'topic', ref: 'topic', className: this.cls_formControlOverwrite, value: this.state.topicId, onChange: this.handleTopicChange.bind(this) },
	        this.state.topicOptions
	      ) : null, this.state.topicField), _jsx('div', {
	        className: this.cls_calendarInlineBlock
	      }, void 0, _jsx('ul', {
	        className: 'clearfix'
	      }, void 0, _jsx('li', {
	        className: _ConfSettings2.default.schedlDate
	      }, void 0, _ref17, _jsx('div', {
	        id: 'currentDate',
	        className: _ConfSettings2.default.dateTimePickerBlock
	      }, void 0, _jsx(_reactBootstrapDatetimepicker2.default, {
	        dateTime: (0, _moment2.default)().format('DD/MM/YYYY'),
	        format: 'DD/MM/YYYY',
	        viewMode: 'date',
	        mode: 'date',
	        inputFormat: 'DD/MM/YYYY',
	        onChange: this.handleDateChange,
	        minDate: now,
	        defaultText: currentdate
	      }))), _jsx('li', {
	        className: _ConfSettings2.default.schedlTime
	      }, void 0, _ref18, _jsx('div', {
	        id: 'startTime',
	        className: _ConfSettings2.default.dateTimePickerBlock
	      }, void 0, _jsx(_reactBootstrapDatetimepicker2.default, {
	        mode: 'time',
	        onChange: this.handleStartTimeChange,
	        dateTime: this.state.startTime
	      }))), _jsx('li', {
	        className: _ConfSettings2.default.schedlDuration
	      }, void 0, _ref19, _jsx('div', {
	        className: _ConfSettings2.default.dateTimePickerBlock
	      }, void 0, _jsx('div', {
	        className: 'form-group'
	      }, void 0, _jsx('div', {
	        className: 'row'
	      }, void 0, _jsx('div', {
	        className: cls_schedlHour
	      }, void 0, _jsx('select', {
	        id: 'schedlHour',
	        className: 'form-control',
	        onChange: this.handleHours,
	        defaultValue: this.state.hours
	      }, void 0, hrs.map(function (value) {
	        return _jsx('option', {
	          value: value
	        }, value, value, ' hrs');
	      }))), _jsx('div', {
	        className: cls_schedlMins
	      }, void 0, _jsx('select', {
	        id: 'schedMinits',
	        className: 'form-control',
	        onChange: this.handleMinutes,
	        defaultValue: this.state.minutes
	      }, void 0, mins.map(function (value) {
	        return _jsx('option', {
	          value: value
	        }, value, value, ' mins');
	      }))))))))), _jsx('div', {
	        className: 'form-group'
	      }, void 0, _react2.default.createElement('input', { id: 'recuringCheckbox', style: inpStyle, type: 'checkbox', ref: 'recurring', onChange: this.handleRecurring, value: 'true', checked: this.state.recurring }), ' ', _jsx('span', {
	        style: spanRecurring
	      }, void 0, ' ', this.props.intl.messages.recurring_schedule, ' ')), this.state.recurring == true ? _jsx('div', {
	        style: { clear: "both" }
	      }, void 0, _jsx('div', {
	        className: this.cls_calendarInlineBlock
	      }, void 0, _jsx('ul', {
	        className: 'clearfix'
	      }, void 0, _jsx('li', {
	        className: _ConfSettings2.default.repeatsList1
	      }, void 0, _ref20, _jsx('div', {
	        className: _ConfSettings2.default.dateTimePickerBlock
	      }, void 0, _jsx('select', {
	        id: 'repeat',
	        className: 'form-control',
	        onChange: this.handleRepeats,
	        defaultValue: this.state.type
	      }, void 0, repeats.map(function (option) {
	        return _jsx('option', {
	          value: option.key
	        }, option.key, option.value);
	      })))), _jsx('li', {
	        className: _ConfSettings2.default.repeatsList2
	      }, void 0, _ref21, _jsx('div', {
	        id: 'repeatEvery',
	        className: _ConfSettings2.default.dateTimePickerBlock,
	        onChange: this.handleRepeatEvery
	      }, void 0, _jsx('select', {
	        id: 'repeatDuration',
	        className: 'form-control',
	        defaultValue: this.state.repeatDuration
	      }, void 0, repeat_every.map(function (value) {
	        return _jsx('option', {
	          value: value
	        }, value, value, ' ', _this4.state.type == "D" ? "days" : _this4.state.type == "W" ? "weeks" : _this4.state.type == "M" ? "months" : _this4.state.type == "Y" ? "years" : "");
	      })))))), this.state.type == 'W' ? _jsx('div', {
	        className: this.cls_endsOnBlock
	      }, void 0, _ref22, _jsx('ul', {
	        className: 'clearfix'
	      }, void 0, days.map(function (day) {
	        return _jsx('li', {}, day.keyvalue, _jsx('div', {
	          className: 'form-group'
	        }, void 0, _jsx('div', {
	          className: 'col-sm-12'
	        }, void 0, _jsx('input', {
	          id: 'daysCheckbox',
	          type: 'checkbox',
	          name: 'days',
	          value: day.key,
	          onChange: _this4.handleDays,
	          checked: _.indexOf(_this4.state.days, day.key) > -1 ? true : false
	        }), ' ', day.value)));
	      }))) : this.state.type == 'M' ? _jsx('div', {
	        className: this.cls_endsOnBlock
	      }, void 0, _ref23, _jsx('ul', {
	        className: 'clearfix'
	      }, void 0, _jsx('li', {}, void 0, _jsx('div', {
	        className: 'form-group'
	      }, void 0, _jsx('div', {
	        className: 'col-sm-12'
	      }, void 0, _jsx('input', {
	        id: 'monthType0',
	        type: 'radio',
	        name: 'monthtype',
	        value: '0',
	        onChange: this.handleRepeatBy,
	        checked: this.state.repeatBy == 0 ? true : false
	      }), ' day of the month'))), _jsx('li', {}, void 0, _jsx('div', {
	        className: 'form-group'
	      }, void 0, _jsx('div', {
	        className: 'col-sm-12'
	      }, void 0, _jsx('input', {
	        id: 'monthType1',
	        type: 'radio',
	        name: 'monthtype',
	        value: '1',
	        onChange: this.handleRepeatBy,
	        checked: this.state.repeatBy == 1 ? true : false
	      }), ' day of the week'))))) : null, _jsx('div', {
	        className: this.cls_endsOnBlock
	      }, void 0, _jsx('p', {
	        className: _ConfSettings2.default.endOnPara
	      }, void 0, _ref24), _jsx('ul', {
	        className: 'clearfix'
	      }, void 0, _jsx('li', {}, void 0, _jsx('div', {
	        className: 'form-group'
	      }, void 0, _jsx('div', {
	        className: cls_colForinput1
	      }, void 0, _jsx('input', {
	        id: 'endsOn1',
	        style: { float: "left" },
	        type: 'radio',
	        value: '1',
	        name: 'ends_on',
	        onChange: this.handleEndson,
	        checked: this.state.endsOn == 1 ? true : false
	      }), _jsx('span', {
	        style: { "marginLeft": "4px" }
	      }, void 0, _ref25), ' ', _jsx('span', {
	        style: { "marginLeft": "8px" }
	      }, void 0, _jsx('input', {
	        type: 'text',
	        style: { width: "30px" },
	        value: this.state.no_of_occurence,
	        onChange: this.handleOccurence,
	        disabled: this.state.endsOn == 1 ? false : true,
	        maxLength: 3
	      }), _jsx('span', {
	        style: { "marginLeft": "4px" }
	      }, void 0, _ref26))), _jsx('div', {
	        className: cls_colForinput2
	      }, void 0, _jsx('div', {
	        className: cls_callpadding1
	      }, void 0, _jsx('span', {
	        className: _ConfSettings2.default.onSpan
	      }, void 0, _jsx('input', {
	        id: 'endsOn2',
	        style: onRadioo,
	        type: 'radio',
	        value: '2',
	        name: 'ends_on',
	        onChange: this.handleEndson,
	        checked: this.state.endsOn == 2 ? true : false
	      }), _jsx('span', {
	        style: { "marginLeft": "4px" }
	      }, void 0, _ref27), ' ')), _jsx('div', {
	        id: 'endDate',
	        className: cls_callpadding2
	      }, void 0, _jsx(_reactBootstrapDatetimepicker2.default, {
	        dateTime: date,
	        format: 'DD/MM/YYYY',
	        viewMode: 'date',
	        mode: 'date',
	        inputFormat: 'DD/MM/YYYY',
	        onChange: this.handleEndDate,
	        minDate: now,
	        defaultText: this.state.endDate
	      }))))))), _jsx('div', {}, void 0, _jsx('p', {
	        style: { textAlign: "center", fontWeight: '600' }
	      }, void 0, summary))) : null))), _jsx('div', {
	        className: _ConfSettings2.default.setConfPassword
	      }, void 0, _jsx('h2', {}, void 0, role == _roles.Roles.Instructor || role == _roles.Roles.Lmsadmin ? _ref28 : _ref29), _jsx('div', {
	        className: _ConfSettings2.default.iconBlock
	      }, void 0, _ref30), _jsx('div', {
	        className: _ConfSettings2.default.passWordBlock
	      }, void 0, _jsx('div', {}, void 0, _react2.default.createElement('input', { id: 'password', type: 'password', name: 'password', ref: 'password', value: this.state.password, onChange: this.handlePasswordChange, maxLength: 30 }))))), _jsx(_Modal.Footer, {
	        className: _Admin2.default.mainSaveAssign
	      }, void 0, _jsx('div', {
	        className: _Admin2.default.errorSaveAssign
	      }, void 0, _jsx('label', {
	        id: 'error',
	        className: this.cls_errcls
	      }, void 0, this.state.error != '' && this.state.error != 'meetingName' && this.state.error != 'roomId' ? this.state.error : null)), _jsx('div', {
	        className: _Admin2.default.blockSaveAssign
	      }, void 0, _jsx('button', {
	        id: 'cancel',
	        onClick: this.props.hidecallback
	      }, void 0, _ref31), _jsx('button', {
	        id: 'saveBtn',
	        className: this.cls_btnSaveEdit,
	        onClick: this.handleSave.bind(this)
	      }, void 0, _ref32))));
	    }
	  }]);
	
	  return Scheduler;
	}(_react.Component);
	
	Scheduler.contextTypes = {
	  router: _react2.default.PropTypes.object,
	  intl: _react2.default.PropTypes.object.isRequired
	};
	
	Scheduler.defaultProps = { showModal: false };
	
	exports.default = (0, _reactIntl.injectIntl)(Scheduler);
	
	/*<select className="form-control" onChange={this.handleDuration} defaultValue={this.state.duration}>
	                          {duration.map( value => {
	                            return <option value={value} key={value}>{value} mins</option>
	                          })}
	                        </select>*/

/***/ }

};;