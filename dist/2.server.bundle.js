exports.ids = [2];
exports.modules = {

/***/ 178:
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
	
	var _WoogeenManager = __webpack_require__(29);
	
	var _WoogeenManager2 = _interopRequireDefault(_WoogeenManager);
	
	var _reactRedux = __webpack_require__(16);
	
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
	
	var _ConferenceActions = __webpack_require__(38);
	
	var _LoginActions = __webpack_require__(21);
	
	var _reactRouter = __webpack_require__(3);
	
	var _expressions = __webpack_require__(357);
	
	var _lib = __webpack_require__(45);
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ToastMessageFactory = _react2.default.createFactory(_lib.ToastMessage.animation);
	
	var _ref = _jsx('img', {
		src: '/images/logo/instavc-logo.png'
	});
	
	var _ref2 = _jsx('span', {}, void 0, 'Enable Proxy');
	
	var GuestConference = function (_Component) {
		_inherits(GuestConference, _Component);
	
		function GuestConference(props) {
			_classCallCheck(this, GuestConference);
	
			var _this = _possibleConstructorReturn(this, (GuestConference.__proto__ || Object.getPrototypeOf(GuestConference)).call(this, props));
	
			_this.handleruserEnterKey = function (e) {
				if (e.key === 'Enter') {
					e.preventDefault();
					_this.CreateGuest();
				}
			};
	
			_this.CreateGuest = function () {
				// this.roomKey = this.props.params.rid;
				//changeBy: pranathi, disc:  added trim method to input values
				if (_this.refs.name.value != '' && _this.refs.name.value.trim() != '' && _this.refs.email.value != '' && _this.refs.email.value.trim() != '') {
					var nameRegExp = RegExp(_expressions.Expressions.get('ALPHAwithSPACE'));
					var emailRegExp = RegExp(_expressions.Expressions.get('EMAIL'));
					if (!nameRegExp.test(_this.refs.name.value)) _this.refs.container.error("Invalid name format.", '');else if (!emailRegExp.test(_this.refs.email.value)) _this.refs.container.error("Invalid email format.", '');else {
						var guestObject = {};
						if (_this.props.params.rid) {
							guestObject = {
								guestName: _this.refs.name.value,
								guestEmail: 'guest_' + _this.refs.email.value.toLowerCase(),
								roomKey: _this.props.params.rid
							};
						} else if (_this.props.params.sid) {
							guestObject = {
								guestName: _this.refs.name.value,
								guestEmail: 'guest_' + _this.refs.email.value.toLowerCase(),
								slotId: _this.props.params.sid
							};
						};
						// console.log(guestObject);
						_this.props.dispatch((0, _ConferenceActions.createGuestAccount)(guestObject)).then(function (res) {
							return _this.LoginGuest(res);
						});
					}
				} else {
					_this.refs.container.error("All fields are mandatory.", '');
					// console.log("All fields are mandatory.");
				};
			};
	
			_this.handleProxy = function () {
				var proxy = _this.state.proxy;
				if (proxy) {
					_this.props.dispatch((0, _ConferenceActions.setTransport)('all'));
					_this.setState({ proxy: false });
				} else {
					_this.props.dispatch((0, _ConferenceActions.setTransport)('relay'));
					_this.setState({ proxy: true });
				}
			};
	
			_this.state = {
				proxy: false
			};
			return _this;
		}
	
		_createClass(GuestConference, [{
			key: 'LoginGuest',
			value: function LoginGuest(res) {
				var _this2 = this;
	
				// console.log("Guest create response--- ", res);
				if (res.status) {
					var userdata = {
						username: 'guest_' + this.refs.email.value.toLowerCase(),
						password: 'Guest@123DefaultPwd',
						isGoogle: false
					};
					// console.log("Guest login object -- ", userdata);
					this.props.dispatch((0, _LoginActions.loginUserRequest)(userdata)).then(function (response) {
						return _this2.JoinConference(response, res.roomKey);
					});
				} else {
					this.refs.container.error('' + res.error, '');
					// console.log("Error --- ", res.error);
				};
			}
		}, {
			key: 'JoinConference',
			value: function JoinConference(response, roomKey) {
				// console.log("Guest login response -- ", response, roomKey);
				_reactRouter.browserHistory.push('/conf/' + roomKey);
			}
		}, {
			key: 'render',
			value: function render() {
	
				var cls_rememberMe = _LoginWidget2.default.rememberMe + ' ' + _LoginWidget2.default.guestBehindNetText + ' clearfix';
				var cls_loginSwitch = _LoginWidget2.default.guestBehindNetBtn + ' ' + _LoginWidget2.default.loginSwitch + ' ';
				var cls_loginSlider = _LoginWidget2.default.loginSlider + ' ' + _LoginWidget2.default.round + ' ' + _LoginWidget2.default.guestBehindNetbtnColor;
				var cls_btnJoinConference = _LoginWidget2.default.btnJoinConference + ' ' + _Dashboard2.default.GbtnProceed + ' ';
	
				return _jsx('div', {
					className: _Dashboard2.default.GcenterAlign
				}, void 0, _react2.default.createElement(_lib.ToastContainer, {
					toastMessageFactory: ToastMessageFactory,
					ref: 'container',
					className: 'toast-top-right'
				}), _jsx('div', {}, void 0, _jsx('div', {
					className: _LoginWidget2.default.loingLogoBlock
				}, void 0, _ref), _jsx('div', {
					className: _Dashboard2.default.GmsgBlock
				}, void 0, _jsx('div', {}, void 0, _jsx('h4', {
					className: _Dashboard2.default.GscHeading
				}, void 0, 'Please enter your Name'), _jsx('div', {
					className: _Dashboard2.default.GinputGroup
				}, void 0, _react2.default.createElement('input', { type: 'text', id: 'name', ref: 'name', placeholder: 'Enter full name..', className: _Dashboard2.default.inputTxt, tabIndex: '1' })), _jsx('h4', {
					className: _Dashboard2.default.GscHeading
				}, void 0, 'Please enter your Email'), _jsx('div', {
					className: _Dashboard2.default.GinputGroup
				}, void 0, _react2.default.createElement('input', { type: 'email', id: 'email', ref: 'email', placeholder: 'Enter emailId here..', className: _Dashboard2.default.inputTxt, onKeyPress: this.handleruserEnterKey, tabIndex: '2' })), _jsx('div', {
					className: _LoginWidget2.default.btnBlockJoinConference
				}, void 0, _jsx('button', {
					id: 'joinConference',
					className: cls_btnJoinConference,
					onClick: this.CreateGuest,
					tabIndex: '3'
				}, void 0, 'Join Conference'))), _jsx('div', {
					className: cls_rememberMe
				}, void 0, _ref2, _jsx('label', {
					className: cls_loginSwitch
				}, void 0, _jsx('input', {
					id: 'proxy',
					type: 'checkbox',
					onChange: this.handleProxy,
					checked: this.state.proxy
				}), _jsx('div', {
					className: cls_loginSlider
				}))))));
			}
		}]);
	
		return GuestConference;
	}(_react.Component);
	
	// Retrieve data from store as props
	
	
	function mapStateToProps(state) {
		return {};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(GuestConference);

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

/***/ }

};;