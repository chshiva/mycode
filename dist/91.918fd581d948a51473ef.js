webpackJsonp([91],{1254:function(e,o,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,o){if(!(e instanceof o))throw new TypeError("Cannot call a class as a function")}function r(e,o){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!o||"object"!=typeof o&&"function"!=typeof o?e:o}function l(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function, not "+typeof o);e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o&&(Object.setPrototypeOf?Object.setPrototypeOf(e,o):e.__proto__=o)}Object.defineProperty(o,"__esModule",{value:!0}),o.AccessDenied=void 0;var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(o,t,n,i){var r=o&&o.defaultProps,l=arguments.length-3;if(t||0===l||(t={}),t&&r)for(var s in r)void 0===t[s]&&(t[s]=r[s]);else t||(t=r||{});if(1===l)t.children=i;else if(l>1){for(var u=Array(l),a=0;a<l;a++)u[a]=arguments[a+3];t.children=u}return{$$typeof:e,type:o,key:void 0===n?null:""+n,ref:null,props:t,_owner:null}}}(),u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,o){for(var t=0;t<o.length;t++){var n=o[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(o,t,n){return t&&e(o.prototype,t),n&&e(o,n),o}}(),c=t(0),f=(n(c),t(12)),d=(t(26),t(20),t(22)),p=n(d),g=t(21),b=t(520),y=n(b),_=t(1403),v=n(_),m=t(522),w=(n(m),t(18)),h=n(w),S=t(17),B=n(S),k=s("div",{},void 0,s(p["default"],{name:"ban"})),D=s("div",{},void 0,s("h2",{},void 0,"Access Denied"),s("p",{},void 0,"Access to the requested page has been Denied")),x=o.AccessDenied=function(e){function o(){return i(this,o),r(this,(o.__proto__||Object.getPrototypeOf(o)).apply(this,arguments))}return l(o,e),a(o,[{key:"goBack",value:function(){console.log("AuthClient.getSession()",h["default"].getSession()),0!=h["default"].getSession()&&""!=h["default"].getSession()&&void 0!=h["default"].getSession()&&("undefined"==typeof window?"undefined":u(window))?(0,B["default"])("is-loggedin","post",{userdata:{session:h["default"].getSession()}}).then(function(e){e.status===!1?(h["default"].deleteSession(),f.browserHistory.push("/")):e&&e.status&&e.data&&e.data.guest?((0,B["default"])("delete-guest/loginPage","delete"),f.browserHistory.push("/")):f.browserHistory.push("/dashboard")}):f.browserHistory.push("/")}},{key:"render",value:function(){var e=(y["default"].iContainer+" "+y["default"].oContainer+" pull-right",y["default"].iTopMenu+" "+y["default"].oTopMenu,y["default"].backButtonBlock+" "+y["default"].backAccessBlock,y["default"].profileInfoBlock+" "+y["default"].textAccessBlock);return s(g.Grid,{fluid:!0},void 0,s("div",{className:y["default"].accessWrapper},void 0,s("div",{className:v["default"].resetinnerDiv},void 0,s("div",{className:v["default"].resetPageBlock},void 0,s(g.Row,{},void 0,s(g.Col,{md:12},void 0,s("div",{className:e},void 0,k,D,s("div",{className:y["default"].accessBtnBlock},void 0,s("button",{className:y["default"].btnApplyAll,onClick:this.goBack.bind(this)},void 0,"Home")))))))))}}]),o}(c.Component);o["default"]=x},1403:function(e,o){e.exports={googleDiv:"_34oDlzaEJx-oKzPFaI4fsX",gIcong:"RwwgKVwW1CTs-ga0PjA9q",inputGroupff:"_3yrxKD-CfDEDho3ck-beCR",centerLoginSocial:"ow_FDSGusFcI19g2Y5kPG",centerLoginSocial1:"_37RbjBlylfgSF-jwfn-Qej",centerLoginSocial2:"_1AOT0mpVQ1hfmNUPy42hUX",resetinnerDiv:"_3LVYFXEtS1locEPvMmp1R5",resetMainDiv:"_1NpbF_wgGgYKjoCZLiQlJE",resetPageBlock:"_1cbbxbMM60cxNsY1y8tMX_",resetTextBtn:"_1ODF0m4DBefQcRVLOSP3IE",resetHeadText:"_2-G3BI16BQqSEK8RM5b6dW",resetMsgText:"_1muwpmCwDsMO0mH2IkTDpw",reestBtnSign:"_3oSUl8VSQH_JXmcupQco-g",loginPad:"_2kPb-Sin48OJURo3ASzDc9",actionLinks:"IIwf2omHFNuBvDaTZ1Ble",actionSeprate:"_2zJ_0_ojYDnaTMKoFnkOJV",loginBox:"_313CrdybQ6MFWKKC_sZz4l",loingLogoBlock:"_1Bfxxd6Mon1wyeVoYUOhV2",formSignin:"i2jzCweTouZdjkA7hDhu6",welcomeTxt:"R2eOKlLzRvHAocEHETrx8",pleaseTxt:"Bx6s7ZCz_cwLSRuBzVR7L",btnSignin:"_132qy4-9OcziQog4tVbvFI",signupAction:"_3ZhtmFJYd5RFiy87Siqngc",rememberMe:"_1wzbnlxvKClzchwZZ5ljKq",txtRememberMe:"_2FBYWyBkPm-vXHXr3qVlLp",loginSwitch:"V0c1SITbhBAg6FJD8wMIH",loginSlider:"_1k0S8KTihs6IDqXoSBZ-qY",gmailIcon:"_1o2rBC3Ew8Kfa0lAcXdg2e",loginLine:"_2lHu37yWkVfxJLtYEDaODC",guestBehindNetText:"_1QfFYTEuLZjIsTx7oBS8ow",guestBehindNetBtn:"vhDNGF8hyyVPy6wvR8Qxd",btnBlockJoinConference:"_-fbAJXxIgUuy-PSZ9KX9I",guestBehindNetbtnColor:"_2-2x7j8pEuXtSYMVq-XlAI",btnJoinConference:"_3qwGciizrPmkCRoGFTd99B",facebookButton:"_1la4yaAvg3omQ6ZYO-n9mM",fontSignin:"_2_lkwClwY3kguOwZ2UKgfT",round:"eULEBYNu4tmLXVBZgiRw",loggingWait:"_2by_7N9b91zD_eHbXYpUQP",singBlockFoeget:"_1vUwvIcR8UYWp5yuLfSZ6_",singInFoeget:"Ej0vV3iEMgp2jomOrhTAO"}}});