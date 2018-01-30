webpackJsonp([63],{1252:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{roomData:(0,g.roomData)(e),loggedInData:(0,b.loggedInData)(e),intlData:(0,S.intlData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var d=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),l=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),u=o(0),c=i(u),m=o(20),p=o(26),f=o(25),y=i(f),v=o(12),h=o(18),M=(i(h),o(35),o(149)),g=o(523),b=o(33),_=o(1412),F=(i(_),o(1282)),x=i(F),w=(o(1396),o(1277)),T=i(w),k=o(1278),R=i(k),S=o(519),P=o(1393),N=o(73),I=o(57),E=i(I),A=o(148),C=i(A),D=(o(21),d(m.FormattedMessage,{id:"room_management"})),O=d("li",{},void 0,d(v.Link,{to:"/admin/room/list"},void 0,d(m.FormattedMessage,{id:"all_rooms"}))),L=d("li",{},void 0,"/"),j=d("li",{},void 0,"/"),$=d(m.FormattedMessage,{id:"topic_list"}),U=d("li",{},void 0,"/"),H=d(R["default"],{data:P.roomEditTopicNewMainMenu}),q=d(T["default"],{data:P.roomEditSubMenu}),z=function(e){function t(e){n(this,t);var o=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.viewroom=function(){var e=o.props.params.rid;v.browserHistory.push("/admin/room/view/"+e)},o.adduser=function(){var e=o.props.params.rid;v.browserHistory.push("/admin/room/adduser/"+e)},o.listtopic=function(){var e=o.props.params.rid;v.browserHistory.push("/admin/room/listtopic/"+e)},o.feedbackList=function(){var e=o.props.params.rid;v.browserHistory.push("/admin/room/room-feedback-list/"+e)},o.roomConfiguration=function(){var e=o.props.params.rid;v.browserHistory.push("/admin/room/configuration/"+e)},o.courseReports=function(e){var t=o.props.params.rid;v.browserHistory.push("/admin/room/attendance/"+t)},o.listAssignments=function(){var e=o.props.params.rid;v.browserHistory.push("/admin/room/assignments/"+e)},o.quill=!1,o.currentuser="",o.submenu=x["default"].activeSubMenu(P.roomEditSubMenu,"lnkRoomTopic"),o.mainmenu=P.roomEditTopicNewMainMenu,o.mainmenu.menus[1].action=o.save.bind(o),o.mainmenu.menus[0].action=o.view.bind(o),o.submenu.menus[0].action=o.viewroom.bind(o),o.submenu.menus[1].action=o.adduser.bind(o),o.submenu.menus[2].action=o.listtopic.bind(o),o.submenu.menus[3].action=o.feedbackList.bind(o),o.submenu.menus[4].action=o.roomConfiguration.bind(o),o.submenu.menus[5].action=o.listAssignments.bind(o),o.submenu.menus[6].action=o.courseReports.bind(o),o.confObject=new E["default"],o}return r(t,e),l(t,[{key:"componentDidMount",value:function(){this.quill=new Quill(y["default"].findDOMNode(this.refs.editor),{modules:{toolbar:[[{header:[1,2,3,4,5,6,!1]}],["bold","italic","underline","link","videoURL"],["image","code-block"],["formula"],[{size:["small",!1,"large","huge"]}],[{list:"ordered"},{list:"bullet"}],[{script:"sub"},{script:"super"}],[{color:[]},{background:[]}],[{align:[]}]],formula:!0},bounds:document.body,placeholder:"Compose an epic...",theme:"snow"}),this.setdata(this.props.loggedInData)}},{key:"setdata",value:function(e){if(e&&e.data&&e.data._id){this.props.dispatch((0,N.loginLanguage)(e.data,this.props.intlData.setlocale));var t=this.props.params.tid,o=this.props.params.rid;this.currentuser=e.data._id;var i={topicId:t,roomId:o};this.props.dispatch((0,M.getRoomTopicData)(i,"/admin/room/viewtopic/"+t+"/"+o)),this.props.dispatch((0,M.getRoomData)(i,""))}}},{key:"componentWillReceiveProps",value:function(e){this.quill.setContents(e.roomData.topicdata.content)}},{key:"save",value:function(){var e=this,t=this.quill.getContents().ops,o=this.props.params.tid,i=this.props.params.rid,n={_id:o,roomId:i,content:t};this.props.dispatch((0,M.SaveEditorContent)(n)).then(function(t){return e.setResponse(t,o)})}},{key:"setResponse",value:function(e,t){console.log(" content res");var o={command:"RELOAD_TOPICS_CONTENT",content:{tid:t},type:"OBJECT"};this.confObject.sendMessage(o,0)}},{key:"view",value:function(){var e=this.props.params.rid;v.browserHistory.push("/admin/room/listtopic/"+e)}},{key:"clear",value:function(){this.props.dispatch((0,M.ClearRoom)())}},{key:"render",value:function(){var e=this.props.roomData&&this.props.roomData.topicdata&&this.props.roomData.topicdata.topicName?this.props.roomData.topicdata.topicName:"",t=C["default"].iContainer+" "+C["default"].oContainer+" pull-right",o=C["default"].iTopMenu+" "+C["default"].oTopMenu,i=C["default"].iSubMenu+" {styles.oSubMenu}",n=" "+C["default"].heightForScroll+" ",a=C["default"].iForm+" "+C["default"].oForm;return d("div",{className:t},void 0,d("div",{className:o},void 0,d("h3",{className:""},void 0,D,": ",e),d("div",{className:C["default"].dynamicBreadCrumb},void 0,d("ul",{},void 0,O,L,d("li",{},void 0,d(v.Link,{onClick:this.viewroom},void 0,this.props.roomData.data.roomName)),j,d("li",{},void 0,d(v.Link,{onClick:this.listtopic},void 0,$)),U,d("li",{},void 0,this.props.roomData.topicdata.topicName))),H),d("div",{className:i},void 0,q),d("div",{className:a},void 0,d("div",{className:C["default"].whiteCard},void 0,d("div",{className:C["default"].innerWhiteTopic},void 0,c["default"].createElement("div",{ref:"editor",className:n})))))}}]),t}(u.Component);z.contextTypes={router:c["default"].PropTypes.object},t["default"]=(0,p.connect)(s)(z)},1277:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{intl:e.intl,loggedInData:(0,p.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var d=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),l=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),u=o(0),c=(i(u),o(12)),m=o(26),p=o(33),f=(o(35),o(18)),y=(i(f),o(73)),v=o(148),h=i(v),M=function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return r(t,e),l(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){this.props.dispatch((0,y.loginLanguage)(this.props.loggedInData.data,this.props.intl.setlocale))}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t=this.getSchema().map(function(t){if(!t.role||t.role&&t.role.length<=0||t.role&&_.indexOf(t.role,e)!=-1)return"URL"==t.actionType?d("li",{},t._id,d(c.Link,{id:t._id,activeClassName:"active"==t.active?h["default"].active:"",to:t.action},void 0,t.text)):"Function"==t.actionType?d("li",{},t._id,d("a",{id:t._id,onClick:t.action,className:"active"==t.active?h["default"].active:""},void 0,d("i",{className:t.icon}),d("span",{},void 0,t.text))):void 0}.bind(this));return t}},{key:"render",value:function(){return d("div",{className:h["default"].iSubMenuContainer},void 0,d("ul",{},void 0,this.renderMenus()))}}]),t}(u.Component);t["default"]=(0,m.connect)(s)(M)},1278:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{loggedInData:(0,p.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var d=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),l=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),u=o(0),c=(i(u),o(12)),m=o(26),p=o(33),f=o(148),y=i(f),v=o(22),h=i(v),M=o(62),g=function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return r(t,e),l(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t={padding:"0 0 8px 0",margin:"0"},o={marginTop:"8px"},i=d(h["default"],{name:"download",style:o}),n=this.getSchema().map(function(o){if(!o.role||o.role&&o.role.length<=0||o.role&&M.indexOf(o.role,e)!=-1){if("Function"==o.actionType){var n=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return d("li",{style:n},o._id,d("a",{id:o._id,onClick:o.action},void 0,d("i",{className:o.icon}),d("span",{},void 0,o.text)))}if("URL"==o.actionType){var a=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return d("li",{style:a},o._id,d(c.Link,{to:o.action,id:o._id},void 0,d("i",{className:o.icon}),d("span",{},void 0,o.text)))}if("Upload"==o.actionType){var r=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return d("li",{style:r,id:o._id},o._id,d("div",{className:y["default"].importBtnBlock},void 0,d("div",{className:y["default"].importBtnInput},void 0,d("span",{className:y["default"].icon},void 0,i),d("input",{className:y["default"].importFileOnclick,id:"fileUploadIcon",type:"file",accept:".xlsx,.xls,.xml,.ods",onChange:o.action,value:""})),d("p",{style:t},void 0,o.text)))}if("Download"==o.actionType){var s=o._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return d("li",{style:s},o._id,d("a",{href:o.action,id:o._id,download:!0},void 0,d("i",{className:o.icon}),d("span",{},void 0,o.text)))}}}.bind(this));return n}},{key:"render",value:function(){var e=""+y["default"].iMenuContainer;return d("div",{className:e},void 0,d("ul",{},void 0,this.renderMenus()))}}]),t}(u.Component);t["default"]=(0,m.connect)(s)(g)},1282:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),r=o(0),s=(i(r),o(1283)),d=o(521),l=(i(d),o(20),o(62)),u=function(){function e(){n(this,e)}return a(e,null,[{key:"activeSubMenu",value:function(e,t){return l.forIn(e.menus,function(e,o){e._id==t?e.active="active":e.active=""}),e}},{key:"freeError",value:function(e){return l.forIn(e.schemas,function(e,t){l.forIn(e,function(e,t){l.forIn(e,function(e,t){"hidden"==e.type&&"title"==e.type||(e.error="")})})}),e}},{key:"freeValue",value:function(e){return l.forIn(e.schemas,function(e,t){l.forIn(e,function(e,t){l.forIn(e,function(e,t){if("hidden"==e.type&&"title"==e.type||(e.error=""),"text"==e.type||"textarea"==e.type||"password"==e.type||"search"==e.type||"date"==e.type||"email"==e.type)e.value="";else if("phone"==e.type||"checkbox"==e.type)e.value=[];else if("dropdown"==e.type){var o=e.data[0][0];e.value=o}})})}),e}},{key:"validate",value:function(e,t,o,i){var n=[];return l.forIn(t.schemas,function(t,a){l.forIn(t,function(t,a){l.forIn(t,function(t,a){if((!t.role||t.role&&t.role.length<=0||t.role&&l.indexOf(t.role,o)!=-1)&&("hidden"!=t.type||"title"!=t.type||"view"!=t.type)){var r=l.result(e,t.datafield);if(t.required)if(""==r||void 0==r)if("dropdown"==t.type||"dynamicdropdown"==t.type){var d="";d=i.messages[t.text.props.id].match(/select/i)?i.messages[t.text.props.id]:i.messages.select_dropdown+" "+i.messages[t.text.props.id],t.error=i.messages.requiedField+" "+d,n.push(t.error)}else"date"==t.type?(t.error=i.messages.requiedFieldDate+" "+i.messages[t.text.props.id],n.push(t.error)):(t.error=i.messages.requiedFieldText+" "+i.messages[t.text.props.id],n.push(t.error));else t.error="";if(""==r||void 0==r?"phone"==t.type?t.value=[]:t.value="":t.value=r,void 0!=t.exp&&""!=t.exp){if(r.length>0){var u=RegExp(s.Expressions.get(t.exp));"/(?:)/"!=String(u)&&(u.test(r)?t.error="":t.errormsg?(t.error=t.errormsg,n.push(t.errormsg)):(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],n.push(t.error)))}}else if("phone"==t.type){if(r.length>0){var c=r[1],m=(r[0],r[2]),p=!0;if(c&&m)if(c.length==m.length)for(var f=0;f<m.length-1;f++)m[f]!=c[f]&&"."!=m[f]&&/^[0-9]$/.test(+c[f])&&(p=!1);else p=!1;p||"+91"==c?t.error="":(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],n.push(t.error))}}else"date"==t.type&&"false"==r&&(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],n.push(t.error))}})})}),{schema:t,error:n}}}]),e}();t["default"]=u},1283:function(e,t){"use strict";var o=new Map;o.set("EMAIL","(^(([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|([.]))){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}) )"),o.set("ALPHA","^[A-Za-z]+$"),o.set("ALPHAwithLIMIT","^[A-Za-z]{1,15}$"),o.set("ALPHAwithSPACE","^[A-Za-z\\s]+$"),o.set("ALPHANUMERICwithSPACE","^[A-Za-z0-9\\s]+$"),o.set("ALPHANUMERIC","^[A-Za-z0-9]+$"),o.set("SPACE","[^\\s+$]"),o.set("URL","^(http|https|ftp)://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"),o.set("PHONENO","^[0-9]{10}$"),o.set("NUMBER","^[0-9]+$"),o.set("LIMIT","^([0-9])|([-]1)+$"),o.set("DATE","^(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"),o.set("FULLTIME","^(?:[0,1][0-9]|2[0-3]):(?:[0-5][0-9])$"),o.set("HALFTIME","^(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM))$"),o.set("TIME","^(?:(?:0[1-9]|1[0,1]):(?:[0-5][0-9]))$|^(?:12:00)$|^(?:00:(?:0[1-9]|[1-5][0-9]))$"),o.set("PINCODE","^[0-9]{6}$"),o.set("DATETIME","^(?:(?:(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2}))|(?:(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))))|(?:(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})))(?:\\s(?:(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM)))|(?:(?:12:00)\\s((AM)|(PM))))$"),o.set("USERNAME","^[A-Za-z]{5,20}$"),o.set("PASSWORD","^[A-Za-z0-9]{6,}$"),t.Expressions=o},1393:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.roomCertificatesMainMenu=t.roomReportsNoTopicsSubMenu=t.roomReportsSubMenu=t.submissionViewSubMenu=t.submissionListSubMenu=t.feedbackListMainMenu=t.feedbackMainMenu=t.viewResultSubMenu=t.listResultSubMenu=t.roomTopicMainMenuUpload=t.roomAddUserSubMenu=t.uploadListSubMenu=t.roomSubMenu=t.roomNewSubMenu=t.viewFeedbackMainMenu=t.viewFeedbackSubMenu=t.roomNoTopicSubMenu=t.roomEditSubMenu=t.roomReportsMainMenu=t.roomAssignmentAddMainMenu=t.roomAssignmentMainMenu=t.listSubmissionMainMenu=t.listResultMainMenu=t.assignQuestionnaireMainMenu=t.addUserEditMainMenu=t.addUserSubMenu=t.addStudentMainMenu=t.addUserViewMainMenu=t.roomMainMenu=t.roomLocationMainMenu=t.roomTopicMainMenu=t.roomViewMainMenu=t.roomEditTopicNewMainMenu=t.roomTopicNewMainMenu=t.roomNewMainMenu=t.roomEditMainMenu=void 0;var n=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),a=o(0),r=(i(a),o(20)),s=o(94);t.roomEditMainMenu={menus:[{_id:"btnCancel",text:n(r.FormattedMessage,{id:"cancel"}),actionType:"Function",action:null,icon:"fa fa-ban"},{_id:"btnSave",text:n(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.roomNewMainMenu={menus:[{_id:"btnCancel",text:n(r.FormattedMessage,{id:"cancel"}),actionType:"URL",action:"/admin/room/list",icon:"fa fa-ban"},{_id:"btnSave",text:n(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.roomTopicNewMainMenu={menus:[{_id:"btnCancel",text:n(r.FormattedMessage,{id:"cancel"}),actionType:"Function",action:null,icon:"fa fa-ban"},{_id:"btnSave",text:n(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.roomEditTopicNewMainMenu={menus:[{_id:"btnCancel",text:n(r.FormattedMessage,{id:"cancel"}),actionType:"Function",action:null,icon:"fa fa-ban"},{_id:"btnSave",text:n(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.roomViewMainMenu={menus:[{_id:"btnList",text:n(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/room/list",icon:"fa fa-list"},{_id:"btnDelete",text:n(r.FormattedMessage,{id:"delete"}),actionType:"Function",action:null,icon:"fa fa-trash",role:[s.Roles.Superadmin,s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin]},{_id:"btnEdit",text:n(r.FormattedMessage,{id:"edit"}),actionType:"Function",action:null,icon:"fa fa-pencil",role:[s.Roles.Superadmin,s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin]}]},t.roomTopicMainMenu={menus:[{_id:"btnAdd",text:n(r.FormattedMessage,{id:"add"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin,s.Roles.Instructor,s.Roles.Presenter,s.Roles.Moderator]}]},t.roomLocationMainMenu={menus:[{_id:"btnAdd",text:n(r.FormattedMessage,{id:"add"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin]}]},t.roomMainMenu={menus:[{_id:"btnNew",text:n(r.FormattedMessage,{id:"new"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Superadmin,s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin]}]},t.addUserViewMainMenu={menus:[{_id:"btnAdd",text:n(r.FormattedMessage,{id:"add"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Superadmin,s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin]}]},t.addStudentMainMenu={menus:[{_id:"btnAdd",text:n(r.FormattedMessage,{id:"add_student"}),actionType:"Function",action:null,icon:"fa fa-plus"}]},t.addUserSubMenu={menus:[{_id:"back",text:n(r.FormattedMessage,{id:"back_to_room"}),actionType:"Function",action:null}]},t.addUserEditMainMenu={menus:[{_id:"btnCancel",text:n(r.FormattedMessage,{id:"cancel"}),actionType:"Function",action:null,icon:"fa fa-ban"},{_id:"btnSave",text:n(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.assignQuestionnaireMainMenu={menus:[{_id:"btnback",text:n(r.FormattedMessage,{id:"back"}),actionType:"Function",action:null,icon:"fa fa-long-arrow-left"},{_id:"btnAdd",text:n(r.FormattedMessage,{id:"add"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin,s.Roles.Instructor,s.Roles.Presenter]}]},t.listResultMainMenu={menus:[]},t.listSubmissionMainMenu={menus:[]},t.roomAssignmentMainMenu={menus:[{_id:"btnAdd",text:n(r.FormattedMessage,{id:"add"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin,s.Roles.Instructor,s.Roles.Presenter]}]},t.roomAssignmentAddMainMenu={menus:[{_id:"btnCancel",text:n(r.FormattedMessage,{id:"cancel"}),actionType:"Function",action:null,icon:"fa fa-ban"},{_id:"btnSave",text:n(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.roomReportsMainMenu={menus:[]},t.roomEditSubMenu={menus:[{_id:"lnkMyRoom",text:n(r.FormattedMessage,{id:"room_info"}),actionType:"Function",action:null},{_id:"lnkRoomUser",text:n(r.FormattedMessage,{id:"room_users"}),actionType:"Function",action:null},{_id:"lnkRoomTopic",text:n(r.FormattedMessage,{id:"room_topic"}),actionType:"Function",action:null},{_id:"lnkFeedback",text:n(r.FormattedMessage,{id:"room_feedback"}),actionType:"Function",action:null},{_id:"lnkRoomConfiguration",text:n(r.FormattedMessage,{id:"room_configuration"}),actionType:"Function",action:null},{_id:"lnkAssignments",text:n(r.FormattedMessage,{id:"room_assignments"}),actionType:"Function",action:null,role:[s.Roles.Lmsadmin,s.Roles.Presenteradmin,s.Roles.Instructor,s.Roles.Presenter]},{_id:"lnkReports",text:n(r.FormattedMessage,{id:"reports"}),actionType:"Function",action:null,role:[s.Roles.Instructor,s.Roles.Lmsadmin]},{_id:"lnkCertificates",text:n(r.FormattedMessage,{id:"certificates"}),actionType:"Function",action:null,role:[s.Roles.Instructor,s.Roles.Lmsadmin]}]},t.roomNoTopicSubMenu={menus:[{_id:"lnkMyRoom",text:n(r.FormattedMessage,{id:"room_info"}),actionType:"Function",action:null},{_id:"lnkRoomUser",text:n(r.FormattedMessage,{id:"room_users"}),actionType:"Function",action:null},{_id:"lnkFeedback",text:n(r.FormattedMessage,{id:"room_feedback"}),actionType:"Function",action:null},{_id:"lnkRoomConfiguration",text:n(r.FormattedMessage,{id:"room_configuration"}),actionType:"Function",action:null},{_id:"lnkAssignments",text:n(r.FormattedMessage,{id:"room_assignments"}),actionType:"Function",action:null,role:[s.Roles.Lmsadmin,s.Roles.Presenteradmin,s.Roles.Instructor,s.Roles.Presenter]},{_id:"lnkReports",text:n(r.FormattedMessage,{id:"reports"}),actionType:"Function",action:null,role:[s.Roles.Instructor,s.Roles.Lmsadmin]},{_id:"lnkCertificates",text:n(r.FormattedMessage,{id:"certificates"}),actionType:"Function",action:null,role:[s.Roles.Instructor,s.Roles.Lmsadmin]}]},t.viewFeedbackSubMenu={menus:[{_id:"lnkFeedback",text:n(r.FormattedMessage,{id:"room_feedback"}),actionType:"Function",action:null}]},t.viewFeedbackMainMenu={menus:[{_id:"btnList",text:n(r.FormattedMessage,{id:"list"}),actionType:"Function",action:"null",icon:"fa fa-list"}]},t.roomNewSubMenu={menus:[{_id:"lnkNewRoom",text:n(r.FormattedMessage,{id:"new_room"}),actionType:"URL",action:"/admin/room/new",active:"active"}]},t.roomSubMenu={menus:[{_id:"lnkRoom",text:n(r.FormattedMessage,{id:"all_rooms"}),actionType:"URL",action:"/admin/room/list",active:"active"}]},t.uploadListSubMenu={menus:[{_id:"back",text:n(r.FormattedMessage,{id:"back"}),actionType:"Function",action:null},,]},t.roomAddUserSubMenu={menus:[{_id:"lnkNewRoom",text:n(r.FormattedMessage,{id:"add_user_to_room"}),actionType:"Function",action:null,active:"active"}]},t.roomTopicMainMenuUpload={menus:[{_id:"btnback",text:n(r.FormattedMessage,{id:"back"}),actionType:"Function",action:null,icon:"fa fa-long-arrow-left"},{_id:"btnMultipleDelete",text:n(r.FormattedMessage,{id:"multiple_delete"}),actionType:"Function",action:null,icon:"fa  fa-trash-o"}]},t.listResultSubMenu={menus:[{_id:"lnkQuestionnaire",text:n(r.FormattedMessage,{id:"questionnaire"}),actionType:"Function",action:null}]},t.viewResultSubMenu={menus:[{_id:"lnkListResult",text:n(r.FormattedMessage,{id:"result_list"}),actionType:"Function",action:null}]},t.feedbackMainMenu={menus:[{_id:"btnList",text:n(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/room/list",icon:"fa fa-list"}]},t.feedbackListMainMenu={menus:[{_id:"btnList",text:n(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/room/list",icon:"fa fa-list"}]},t.submissionListSubMenu={menus:[{_id:"back",text:n(r.FormattedMessage,{id:"back_to_assignments"}),actionType:"Function",action:null},{_id:"linkAssignmentList",text:n(r.FormattedMessage,{id:"submission_list"}),actionType:"Function",action:null}]},t.submissionViewSubMenu={menus:[{_id:"back",text:n(r.FormattedMessage,{id:"back_to_submissions"}),actionType:"Function",action:null},{_id:"evaluateAssignment",text:n(r.FormattedMessage,{id:"evaluate_assignment"}),actionType:"Function",action:null},{_id:"plagiarism",text:n(r.FormattedMessage,{id:"plagiarism"}),actionType:"Function",action:null}]},t.roomReportsSubMenu={menus:[{_id:"lnkAttendance",text:n(r.FormattedMessage,{id:"attendance"}),actionType:"Function",action:null},{_id:"lnkTopics",text:n(r.FormattedMessage,{id:"room_topic"}),actionType:"Function",action:null}]},t.roomReportsNoTopicsSubMenu={menus:[{_id:"lnkAttendance",text:n(r.FormattedMessage,{id:"attendance"}),actionType:"Function",action:null}]},t.roomCertificatesMainMenu={menus:[]}},1396:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.roomTopicSchema=t.editRoomSchema=t.roomSchema=void 0;var n=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),a=o(0),r=(i(a),o(20)),s=o(94);t.roomSchema={_id:"RoomManager",formIcon:"fa fa-key",formTitle:n(r.FormattedMessage,{id:"room_management"}),serverCollection:"Room",schemas:{about_me:{basic_fields:[{type:"hidden",_id:"cid",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"_id"},{type:"hidden",_id:"_id",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"uid"},{type:"title",text:n(r.FormattedMessage,{id:"basic_info"}),icon:"fa fa-caret-right"},{type:"dynamicdropdown",_id:"selPackage",text:n(r.FormattedMessage,{id:"select_package"}),idfield:"selPackage._id",datafield:"selPackage",apicall:"package-ids",value:" ",required:!0,error:"",errorId:"packageError"},{type:"text",_id:"roomName",text:n(r.FormattedMessage,{id:"room_name"}),datafield:"roomName",required:!0,error:"",exp:"ALPHANUMERICwithSPACE",errormsg:"",limit:30,errorId:"roomNameError"},{type:"dropdown",_id:"roomType",text:n(r.FormattedMessage,{id:"room_type"}),datafield:"roomType",data:[["Forward","forward"],["Mix","mix"],["Hybrid","hybrid"]],value:"Forward",required:!0,errorId:"roomTypeError"}]},other_info:{other_details:[{type:"title",text:n(r.FormattedMessage,{id:"other_details"}),icon:"fa fa-caret-right"},{type:"password",_id:"hostPassword",text:n(r.FormattedMessage,{id:"host_password"}),datafield:"hostPassword",required:!0,error:"",exp:"",errormsg:"",limit:15,errorId:"hostPasswordError"},{type:"date",_id:"expiryDate",text:n(r.FormattedMessage,{id:"expiry_Date"}),datafield:"expiryDate",required:!0,error:"",exp:"",errormsg:"",errorId:"expiryDateError"}]}}},t.editRoomSchema={_id:"RoomManager",formIcon:"fa fa-key",formTitle:n(r.FormattedMessage,{id:"room_management"}),serverCollection:"Room",schemas:{about_me:{basic_fields:[{type:"hidden",_id:"cid",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"_id"},{type:"hidden",_id:"_id",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"uid"},{type:"title",text:n(r.FormattedMessage,{id:"basic_info"}),icon:"fa fa-caret-right"},{type:"view",_id:"selPackage",text:n(r.FormattedMessage,{id:"select_package"}),field:"selPackage",idfield:"selPackage._id",datafield:"selPackage.packageName",value:"",role:[s.Roles.Superadmin,s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.CRMadmin,s.Roles.Presenteradmin]},{type:"text",_id:"roomName",text:n(r.FormattedMessage,{id:"room_name"}),datafield:"roomName",required:!0,error:"",exp:"ALPHANUMERICwithSPACE",errormsg:"",limit:30,errorId:"roomNameError"},{type:"dropdown",_id:"roomType",text:n(r.FormattedMessage,{id:"room_type"}),datafield:"roomType",data:[["Forward","forward"],["Mix","mix"],["Hybrid","hybrid"]],value:"Forward",required:!0,errorId:"roomTypeError"}]},other_info:{other_details:[{type:"title",text:n(r.FormattedMessage,{id:"other_details"}),icon:"fa fa-caret-right"},{type:"view",_id:"corporateId",text:n(r.FormattedMessage,{id:"corporate_name"}),field:"corporateId",idfield:"corporateId._id",datafield:"corporateId.businessName",role:[s.Roles.Superadmin]},{type:"password",_id:"hostPassword",text:n(r.FormattedMessage,{id:"host_password"}),datafield:"hostPassword",required:!0,error:"",exp:"",errormsg:"",limit:15,errorId:"hostPasswordError"},{type:"date",_id:"expiryDate",text:n(r.FormattedMessage,{id:"expiry_Date"}),datafield:"expiryDate",required:!0,error:"",exp:"",errormsg:"",errorId:"expiryDateError"}]}}},t.roomTopicSchema={_id:"RoomTopicManager",formIcon:"fa fa-key",formTitle:n(r.FormattedMessage,{id:"room_management"}),serverCollection:"Topic",schemas:{about_me:{basic_fields:[{type:"hidden",_id:"cid",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"_id"},{type:"hidden",_id:"_id",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"uid"},{type:"hidden",_id:"rid",text:n(r.FormattedMessage,{id:"hidden"}),datafield:"roomId"},{type:"title",text:n(r.FormattedMessage,{id:"topic_details"}),icon:"fa fa-caret-right"},{type:"text",_id:"topicName",text:n(r.FormattedMessage,{id:"topic_name"}),datafield:"topicName",required:!0,error:"",errormsg:"",limit:60,errorId:"topicNameError"}]},other_info:{other_details:[{type:"textarea",_id:"Description",text:n(r.FormattedMessage,{id:"description"}),datafield:"description",required:!0,error:"",limit:250,errorId:"descriptionError"}]}}}},1412:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.RoomView=void 0;var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),d=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),l=o(0),u=i(l),c=o(20),m=(o(12),o(22)),p=(i(m),o(21)),f=o(1),y=i(f),v=o(56),h=i(v),M=o(93),g=o(522),b=i(g),_=u["default"].createFactory(M.ToastMessage.animation),F=s("p",{},void 0,s(c.FormattedMessage,{id:"title_created_room_details"})),x=s("h2",{},void 0,s(c.FormattedMessage,{id:"basic_info"})),w=s("label",{htmlFor:"Select Package"},void 0,s(c.FormattedMessage,{id:"select_package"}),":"),T=s("label",{htmlFor:"Room Name"},void 0,s(c.FormattedMessage,{id:"room_name"}),":"),k=s("label",{htmlFor:"Room Type"},void 0,s(c.FormattedMessage,{id:"room_type"}),":"),R=s("h2",{},void 0,s(c.FormattedMessage,{id:"other_details"})),S=s("label",{htmlFor:"Corporate Name"},void 0,s(c.FormattedMessage,{id:"corporate_name"}),":"),P=s("label",{htmlFor:"Host Password"},void 0,s(c.FormattedMessage,{id:"host_password"}),":"),N=s("label",{htmlFor:"Expiry Date"},void 0,s(c.FormattedMessage,{id:"expiry_Date"}),":"),I=t.RoomView=function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),d(t,[{key:"componentWillReceiveProps",value:function(e){}},{key:"render",value:function(){this.clsContainerRight=h["default"].containerRight+" pull-right",this.props.roomData&&(this.selPackage=this.props.roomData.selPackage,this.roomName=this.props.roomData.roomName,this.roomType=this.props.roomData.roomType,this.roomPassword=this.props.roomData.roomPassword,this.corporateId=this.props.roomData.corporateId,this.hostPassword=this.props.roomData.hostPassword,this.categoryId=this.props.roomData.categoryId,this.expiryDate=this.props.roomData.expiryDate);var e=h["default"].inlineEditGroup+" clearfix",t=h["default"].inlineEdit+" "+h["default"].emailTransCap,o="list";return s("div",{className:h["default"].midContainer},void 0,u["default"].createElement(M.ToastContainer,{toastMessageFactory:_,ref:"container",className:"toast-top-right"}),s("div",{className:h["default"].whiteCard},void 0,this.props.loading?s("div",{className:h["default"].mainSpinBlock},void 0,s("div",{className:h["default"].innerSpinBlock},void 0,s(b["default"],{loadType:o}))):s(p.Grid,{fluid:!0},void 0,s(p.Row,{},void 0,s(p.Col,{md:12},void 0,s("div",{className:h["default"].infoTxt},void 0,F))),s(p.Row,{},void 0,s(p.Col,{md:6},void 0,s("div",{className:h["default"].formField},void 0,x,s("div",{className:h["default"].txtContainer},void 0,s("div",{className:e},void 0,w,s("div",{className:h["default"].inlineEdit},void 0,this.selPackage&&this.selPackage.packageName?this.selPackage.packageName:"-")),s("div",{className:e},void 0,T,s("div",{className:h["default"].inlineEdit},void 0,this.roomName?this.roomName:"-")),s("div",{className:e},void 0,k,s("div",{className:h["default"].inlineEdit},void 0,this.roomType?this.roomType:"-"))),s("hr",{className:h["default"].mobHr}))),s(p.Col,{md:6},void 0,s("div",{className:h["default"].formField},void 0,R,s("div",{className:h["default"].txtContainer},void 0,s("div",{className:e},void 0,S,s("div",{className:h["default"].inlineEdit},void 0,this.corporateId&&this.corporateId.businessName?this.corporateId.businessName:"-")),s("div",{className:e},void 0,P,s("div",{className:t},void 0,this.hostPassword?this.hostPassword:"-")),s("div",{className:e},void 0,N,s("div",{className:h["default"].inlineEdit},void 0,this.expiryDate?(0,y["default"])(this.expiryDate).format("DD/MM/YYYY"):"-")))))))))}}]),t}(l.Component);I.contextTypes={router:u["default"].PropTypes.object},t["default"]=I},9:function(e,t,o){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,o,i,n){var a=t&&t.defaultProps,r=arguments.length-3;if(o||0===r||(o={}),o&&a)for(var s in a)void 0===o[s]&&(o[s]=a[s]);else o||(o=a||{});if(1===r)o.children=n;else if(r>1){for(var d=Array(r),l=0;l<r;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:o,_owner:null}}}(),d=function(){function e(e,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,o,i){return o&&e(t.prototype,o),i&&e(t,i),t}}(),l=o(0),u=(i(l),o(12)),c=s("div",{}),m=function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),d(t,[{key:"componentWillMount",value:function(){u.browserHistory.push("/access-denied")}},{key:"render",value:function(){return c}}]),t}(l.Component);t["default"]=m}});