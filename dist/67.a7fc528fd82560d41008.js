webpackJsonp([67],{1212:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{profileData:(0,m.profileData)(e),loggedInData:(0,v.loggedInData)(e),intlData:(0,F.intlData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),d=o(0),c=n(d),f=o(20),p=o(26),y=(o(12),o(18)),m=(n(y),o(35),o(526)),v=o(33),h=o(1546),g=n(h),_=o(1282),b=n(_),M=(o(1434),o(1277)),w=n(M),x=o(1278),P=n(x),E=o(1397),S=o(525),O=o(148),k=n(O),T=(o(21),o(73),o(93)),F=o(519),I=(c["default"].createFactory(T.ToastMessage.animation),s("h3",{className:""},void 0,s(f.FormattedMessage,{id:"my_account"}))),A=s("ul",{},void 0,s("li",{},void 0,s(f.FormattedMessage,{id:"you_are_in_my_profile_panel"}))),D=s(P["default"],{data:E.localeNewMainMenu}),C=function(e){function t(e){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return a(t,e),u(t,[{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(e){e.profileData&&e.profileData.success&&""!=e.profileData.success&&this.props.dispatch((0,S.ClearProfileRes)())}},{key:"componentWillUnmount",value:function(){this.props.dispatch((0,S.ClearProfile)())}},{key:"render",value:function(){var e=k["default"].iContainer+" "+k["default"].oContainer+" pull-right",t=k["default"].iTopMenu+" "+k["default"].oTopMenu,o=k["default"].iSubMenu+" {styles.oSubMenu}",n=b["default"].activeSubMenu(E.profileViewSubMenu,"lnkLocale");return s("div",{className:e},void 0,s("div",{className:t},void 0,I,s("div",{className:k["default"].dynamicBreadCrumb},void 0,A),D),s("div",{className:o},void 0,s(w["default"],{data:n})),s(g["default"],{profileData:this.props.loggedInData.data}))}}]),t}(d.Component);C.contextTypes={router:c["default"].PropTypes.object},t["default"]=(0,p.connect)(l)(C)},1277:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{intl:e.intl,loggedInData:(0,p.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),d=o(0),c=(n(d),o(12)),f=o(26),p=o(33),y=(o(35),o(18)),m=(n(y),o(73)),v=o(148),h=n(v),g=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return a(t,e),u(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){this.props.dispatch((0,m.loginLanguage)(this.props.loggedInData.data,this.props.intl.setlocale))}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t=this.getSchema().map(function(t){if(!t.role||t.role&&t.role.length<=0||t.role&&_.indexOf(t.role,e)!=-1)return"URL"==t.actionType?s("li",{},t._id,s(c.Link,{id:t._id,activeClassName:"active"==t.active?h["default"].active:"",to:t.action},void 0,t.text)):"Function"==t.actionType?s("li",{},t._id,s("a",{id:t._id,onClick:t.action,className:"active"==t.active?h["default"].active:""},void 0,s("i",{className:t.icon}),s("span",{},void 0,t.text))):void 0}.bind(this));return t}},{key:"render",value:function(){return s("div",{className:h["default"].iSubMenuContainer},void 0,s("ul",{},void 0,this.renderMenus()))}}]),t}(d.Component);t["default"]=(0,f.connect)(l)(g)},1278:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function l(e){return{loggedInData:(0,p.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),u=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),d=o(0),c=(n(d),o(12)),f=o(26),p=o(33),y=o(148),m=n(y),v=o(22),h=n(v),g=o(62),_=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return a(t,e),u(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t={padding:"0 0 8px 0",margin:"0"},o={marginTop:"8px"},n=s(h["default"],{name:"download",style:o}),r=this.getSchema().map(function(o){if(!o.role||o.role&&o.role.length<=0||o.role&&g.indexOf(o.role,e)!=-1){if("Function"==o.actionType){var r=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return s("li",{style:r},o._id,s("a",{id:o._id,onClick:o.action},void 0,s("i",{className:o.icon}),s("span",{},void 0,o.text)))}if("URL"==o.actionType){var i=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return s("li",{style:i},o._id,s(c.Link,{to:o.action,id:o._id},void 0,s("i",{className:o.icon}),s("span",{},void 0,o.text)))}if("Upload"==o.actionType){var a=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return s("li",{style:a,id:o._id},o._id,s("div",{className:m["default"].importBtnBlock},void 0,s("div",{className:m["default"].importBtnInput},void 0,s("span",{className:m["default"].icon},void 0,n),s("input",{className:m["default"].importFileOnclick,id:"fileUploadIcon",type:"file",accept:".xlsx,.xls,.xml,.ods",onChange:o.action,value:""})),s("p",{style:t},void 0,o.text)))}if("Download"==o.actionType){var l=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return s("li",{style:l},o._id,s("a",{href:o.action,id:o._id,download:!0},void 0,s("i",{className:o.icon}),s("span",{},void 0,o.text)))}}}.bind(this));return r}},{key:"render",value:function(){var e=""+m["default"].iMenuContainer;return s("div",{className:e},void 0,s("ul",{},void 0,this.renderMenus()))}}]),t}(d.Component);t["default"]=(0,f.connect)(l)(_)},1282:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),a=o(0),l=(n(a),o(1283)),s=o(521),u=(n(s),o(20),o(62)),d=function(){function e(){r(this,e)}return i(e,null,[{key:"activeSubMenu",value:function(e,t){return u.forIn(e.menus,function(e,o){e._id==t?e.active="active":e.active=""}),e}},{key:"freeError",value:function(e){return u.forIn(e.schemas,function(e,t){u.forIn(e,function(e,t){u.forIn(e,function(e,t){"hidden"==e.type&&"title"==e.type||(e.error="")})})}),e}},{key:"freeValue",value:function(e){return u.forIn(e.schemas,function(e,t){u.forIn(e,function(e,t){u.forIn(e,function(e,t){if("hidden"==e.type&&"title"==e.type||(e.error=""),"text"==e.type||"textarea"==e.type||"password"==e.type||"search"==e.type||"date"==e.type||"email"==e.type)e.value="";else if("phone"==e.type||"checkbox"==e.type)e.value=[];else if("dropdown"==e.type){var o=e.data[0][0];e.value=o}})})}),e}},{key:"validate",value:function(e,t,o,n){var r=[];return u.forIn(t.schemas,function(t,i){u.forIn(t,function(t,i){u.forIn(t,function(t,i){if((!t.role||t.role&&t.role.length<=0||t.role&&u.indexOf(t.role,o)!=-1)&&("hidden"!=t.type||"title"!=t.type||"view"!=t.type)){var a=u.result(e,t.datafield);if(t.required)if(""==a||void 0==a)if("dropdown"==t.type||"dynamicdropdown"==t.type){var s="";s=n.messages[t.text.props.id].match(/select/i)?n.messages[t.text.props.id]:n.messages.select_dropdown+" "+n.messages[t.text.props.id],t.error=n.messages.requiedField+" "+s,r.push(t.error)}else"date"==t.type?(t.error=n.messages.requiedFieldDate+" "+n.messages[t.text.props.id],r.push(t.error)):(t.error=n.messages.requiedFieldText+" "+n.messages[t.text.props.id],r.push(t.error));else t.error="";if(""==a||void 0==a?"phone"==t.type?t.value=[]:t.value="":t.value=a,void 0!=t.exp&&""!=t.exp){if(a.length>0){var d=RegExp(l.Expressions.get(t.exp));"/(?:)/"!=String(d)&&(d.test(a)?t.error="":t.errormsg?(t.error=t.errormsg,r.push(t.errormsg)):(t.error=n.messages.validInputData+" "+n.messages[t.text.props.id],r.push(t.error)))}}else if("phone"==t.type){if(a.length>0){var c=a[1],f=(a[0],a[2]),p=!0;if(c&&f)if(c.length==f.length)for(var y=0;y<f.length-1;y++)f[y]!=c[y]&&"."!=f[y]&&/^[0-9]$/.test(+c[y])&&(p=!1);else p=!1;p||"+91"==c?t.error="":(t.error=n.messages.validInputData+" "+n.messages[t.text.props.id],r.push(t.error))}}else"date"==t.type&&"false"==a&&(t.error=n.messages.validInputData+" "+n.messages[t.text.props.id],r.push(t.error))}})})}),{schema:t,error:r}}}]),e}();t["default"]=d},1283:function(e,t){"use strict";var o=new Map;o.set("EMAIL","(^(([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|([.]))){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}) )"),o.set("ALPHA","^[A-Za-z]+$"),o.set("ALPHAwithLIMIT","^[A-Za-z]{1,15}$"),o.set("ALPHAwithSPACE","^[A-Za-z\\s]+$"),o.set("ALPHANUMERICwithSPACE","^[A-Za-z0-9\\s]+$"),o.set("ALPHANUMERIC","^[A-Za-z0-9]+$"),o.set("SPACE","[^\\s+$]"),o.set("URL","^(http|https|ftp)://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"),o.set("PHONENO","^[0-9]{10}$"),o.set("NUMBER","^[0-9]+$"),o.set("LIMIT","^([0-9])|([-]1)+$"),o.set("DATE","^(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"),o.set("FULLTIME","^(?:[0,1][0-9]|2[0-3]):(?:[0-5][0-9])$"),o.set("HALFTIME","^(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM))$"),o.set("TIME","^(?:(?:0[1-9]|1[0,1]):(?:[0-5][0-9]))$|^(?:12:00)$|^(?:00:(?:0[1-9]|[1-5][0-9]))$"),o.set("PINCODE","^[0-9]{6}$"),o.set("DATETIME","^(?:(?:(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2}))|(?:(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))))|(?:(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})))(?:\\s(?:(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM)))|(?:(?:12:00)\\s((AM)|(PM))))$"),o.set("USERNAME","^[A-Za-z]{5,20}$"),o.set("PASSWORD","^[A-Za-z0-9]{6,}$"),t.Expressions=o},1397:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.profileViewSubMenu=t.localeEditSubMenu=t.profileEditSubMenu=t.localeEditMainMenu=t.localeNewMainMenu=t.profileViewMainMenu=t.profileEditMainMenu=void 0;var r=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),i=o(0),a=(n(i),o(20));t.profileEditMainMenu={menus:[{_id:"btnCancel",text:r(a.FormattedMessage,{id:"cancel"}),actionType:"URL",action:"/admin/profile",icon:"fa fa-ban"},{_id:"btnSave",text:r(a.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.profileViewMainMenu={menus:[{_id:"btnEdit",text:r(a.FormattedMessage,{id:"edit"}),actionType:"URL",action:"/admin/profile/edit",icon:"fa fa-pencil"}]},t.localeNewMainMenu={menus:[{_id:"btnEdit",text:r(a.FormattedMessage,{id:"edit"}),actionType:"URL",action:"/admin/profile/locale",icon:"fa fa-pencil"}]},t.localeEditMainMenu={menus:[{_id:"btnCancel",text:r(a.FormattedMessage,{id:"cancel"}),actionType:"URL",action:"/admin/locale/view",icon:"fa fa-ban"},{_id:"btnSave",text:r(a.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.profileEditSubMenu={menus:[{_id:"lnkGenaralInfo",text:r(a.FormattedMessage,{id:"general_info"}),actionType:"Function",action:null,active:"active"}]},t.localeEditSubMenu={menus:[{_id:"lnkEditLocale",text:r(a.FormattedMessage,{id:"locale_directory"}),actionType:"Function",action:null,active:"active"}]},t.profileViewSubMenu={menus:[{_id:"lnkMyProfile",text:r(a.FormattedMessage,{id:"my_profile"}),actionType:"URL",action:"/admin/profile",active:"active"},{_id:"lnkWorkEdu",text:r(a.FormattedMessage,{id:"work_education"}),actionType:"URL",action:"/admin/profile/workedu"},{_id:"lnkContacts",text:r(a.FormattedMessage,{id:"contacts"}),actionType:"URL",action:"/admin/profile/contacts"},{_id:"lnkChangePassword",text:r(a.FormattedMessage,{id:"change_password"}),actionType:"URL",action:"/admin/changePassword"},{_id:"lnkLocale",text:r(a.FormattedMessage,{id:"locale"}),actionType:"URL",action:"/admin/locale/view"}]}},1434:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.LocaleSchema=t.profileSchema=void 0;var r=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),i=o(0),a=(n(i),o(20));t.profileSchema={_id:"MyProfile",formIcon:"fa fa-key",formTitle:r(a.FormattedMessage,{id:"my_account"}),serverCollection:"Corporate",schemas:{about_me:{about_fields:[{type:"hidden",_id:"uid",text:r(a.FormattedMessage,{id:"hidden"}),datafield:"_id"},{type:"title",text:r(a.FormattedMessage,{id:"about_me"}),icon:"fa fa-caret-right"},{type:"textarea",_id:"aboutMe",text:r(a.FormattedMessage,{id:"summary"}),datafield:"profile.aboutme",required:!1,limit:150}],personal_fields:[{type:"title",text:r(a.FormattedMessage,{id:"personal_info"}),icon:"fa fa-caret-right"},{type:"text",_id:"firstName",text:r(a.FormattedMessage,{id:"first_name"}),datafield:"firstname",error:"",exp:"ALPHAwithSPACE",required:!0,limit:30,caps:!0},{type:"text",_id:"lastName",text:r(a.FormattedMessage,{id:"last_name"}),datafield:"lastname",error:"",exp:"ALPHAwithSPACE",limit:30,caps:!0}]},personal_info:{contact_details:[{type:"title",text:r(a.FormattedMessage,{id:"contact_details"}),icon:"fa fa-caret-right"},{type:"email",_id:"emailId",text:r(a.FormattedMessage,{id:"email"}),datafield:"email",error:"",exp:"EMAIL",errormsg:"",required:!0,limit:50},{type:"phone",_id:"phone",text:r(a.FormattedMessage,{id:"phone"}),datafield:"profile.phone",error:"",errormsg:"",exp:""},{type:"dropdown",_id:"gender",text:r(a.FormattedMessage,{id:"gender"}),datafield:"profile.gender",data:[["Male","male"],["Female","female"]],value:"Male"}],company_details:[{type:"title",text:r(a.FormattedMessage,{id:"company_details"}),icon:"fa fa-caret-right"},{type:"text",_id:"position",text:r(a.FormattedMessage,{id:"position"}),datafield:"profile.position",error:"",exp:"",errormsg:"",limit:30,caps:!0},{type:"text",_id:"department",text:r(a.FormattedMessage,{id:"department"}),datafield:"profile.dept",error:"",exp:"ALPHAwithSPACE",errormsg:"",limit:30,caps:!0}]}}},t.LocaleSchema={_id:"Locale",formTitle:r(a.FormattedMessage,{id:"my_account"}),serverCollection:r(a.FormattedMessage,{id:"local_settings"}),schemas:{LocaleSettings:{LocaleSettings:[{type:"title",text:r(a.FormattedMessage,{id:"local_settings"}),icon:"fa fa-caret-right"},{type:"hidden",_id:"uid",text:r(a.FormattedMessage,{id:"hidden"}),datafield:"_id"},{type:"dropdown",text:r(a.FormattedMessage,{id:"prefered_language"}),_id:"preferedlanguageId",datafield:"preferedlanguage",data:[["","select_language"],["en","english"],["hi","hindi"]],value:"en"}]},col_2:{}}}},1546:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.LocaleView=void 0;var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),u=o(0),d=n(u),c=(o(12),o(20)),f=o(22),p=(n(f),o(1)),y=(n(p),o(21)),m=o(56),v=n(m),h=l(c.FormattedMessage,{id:"local_settings"}),g=l("label",{htmlFor:"Prefered Language"},void 0,l(c.FormattedMessage,{id:"prefered_language"}),":"),_=t.LocaleView=function(e){function t(e){r(this,t);var o=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.strTimezone="",o.strDateformat="",o.strTimeformat="",o.strCurrencyformat="",o.strPreferedlanguage="",o}return a(t,e),s(t,[{key:"componentDidMount",value:function(){this.setdata(this.props.loggedInData)}},{key:"setdata",value:function(e){e&&e.data&&e.data._id&&(this.userID=e.data._id)}},{key:"render",value:function(){this.clsContainerRight=v["default"].containerRight+" pull-right",this.props&&this.props.profileData&&this.props.profileData.locale&&(this.strTimezone=this.props.profileData.locale.timezone,this.strDateformat=this.props.profileData.locale.dateformat,this.strTimeformat=this.props.profileData.locale.timeformat,this.strCurrencyformat=this.props.profileData.locale.currencyformat,this.strPreferedlanguage="en"==this.props.profileData.locale.preferedlanguage?"English":"hi"==this.props.profileData.locale.preferedlanguage?"Hindi":this.props.profileData.locale.preferedlanguage);var e=v["default"].inlineEditGroup+" clearfix",t=" "+v["default"].infoTxt+" "+v["default"].localHeadBlock+" ";return l("div",{className:v["default"].midContainer},void 0,l("div",{className:v["default"].whiteCard},void 0,l(y.Grid,{fluid:!0},void 0,l(y.Row,{},void 0,l(y.Col,{md:12},void 0,l("div",{className:t},void 0,l("h2",{className:v["default"].localHeadMain},void 0,h)))),l(y.Row,{},void 0,l(y.Col,{md:12},void 0,l("div",{className:v["default"].formField},void 0,l("div",{className:v["default"].txtContainer},void 0,l("div",{className:e},void 0,g,l("div",{className:v["default"].inlineEdit},void 0,this.strPreferedlanguage?this.strPreferedlanguage:"-")))))))))}}]),t}(u.Component);_.contextTypes={router:d["default"].PropTypes.object},t["default"]=_},9:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,n,r){var i=t&&t.defaultProps,a=arguments.length-3;if(o||0===a||(o={}),o&&i)for(var l in i)void 0===o[l]&&(o[l]=i[l]);else o||(o=i||{});if(1===a)o.children=r;else if(a>1){for(var s=Array(a),u=0;u<a;u++)s[u]=arguments[u+3];o.children=s}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),u=o(0),d=(n(u),o(12)),c=l("div",{}),f=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),s(t,[{key:"componentWillMount",value:function(){d.browserHistory.push("/access-denied")}},{key:"render",value:function(){return c}}]),t}(u.Component);t["default"]=f}});