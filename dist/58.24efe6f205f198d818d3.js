webpackJsonp([58],{1221:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{intl:e.intl,loggedInData:(0,b.loggedInData)(e),intlData:(0,D.intlData)(e),reportsData:(0,w.reportsData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,i,a,n){var o=t&&t.defaultProps,r=arguments.length-3;if(i||0===r||(i={}),i&&o)for(var s in o)void 0===i[s]&&(i[s]=o[s]);else i||(i=o||{});if(1===r)i.children=n;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];i.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:i,_owner:null}}}(),u=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),p=i(0),d=a(p),c=i(20),f=i(26),h=i(12),g=i(18),v=(a(g),i(1282)),m=a(v),y=i(524),b=(a(y),i(35),i(33)),P=i(530),w=i(531),M=i(1394),N=a(M),k=i(1411),x=i(56),O=a(x),C=i(148),T=a(C),I=i(73),j=(i(21),i(93)),D=i(519),S=d["default"].createFactory(j.ToastMessage.animation),E=i(1),F=l("i",{className:"fa fa-eye"}),L=l("div",{},void 0,"--"),A=l("ul",{},void 0,l("li",{},void 0,l(h.Link,{to:"/course/reports"},void 0,l(c.FormattedMessage,{id:"room_list"}))),l("li",{},void 0,"/"),l("li",{},void 0,l(c.FormattedMessage,{id:"assignment_list"}))),R=l(c.FormattedMessage,{id:"assignment_name"}),U=l(c.FormattedMessage,{id:"submitted_on"}),$=l(c.FormattedMessage,{id:"Marks"}),B=l(c.FormattedMessage,{id:"view"}),z=function(e){function t(e){n(this,t);var i=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return i.attendanceReport=function(){h.browserHistory.push("/course/attendance/"+i.props.params.rid)},i.topicsReport=function(){h.browserHistory.push("/course/topics/report/"+i.props.params.rid)},i.assignmentReportList=function(){h.browserHistory.push("/course/assignment-report-list/"+i.props.params.rid)},i.showAssignmentName=function(e){var t=i.props.params.rid,a=e._id,n="/course/assignment-report-view/"+t+"/"+a;return l(h.Link,{className:O["default"].removeStyle,to:n},void 0,e.assignmentName)},i.viewCourse=function(e){var t=i.props.params.rid,a=e._id,n="/course/assignment-report-view/"+t+"/"+a;return l(h.Link,{id:"assignmentView",to:n},void 0,F)},i.state={searchValue:"",loading:!0},i.res={},i.submenu=m["default"].activeSubMenu(k.courseReportsSubMenu,"linkAssignment"),i.submenu.menus[0].action=i.attendanceReport.bind(i),i.submenu.menus[1].action=i.topicsReport.bind(i),i.submenu.menus[2].action=i.assignmentReportList.bind(i),i.mainmenu=k.reportsMainMenu,i.getData=i.getData.bind(i),i.currentPage=1,i.itemsPerPage=5,i.searchFilter=i.searchFilter.bind(i),i}return r(t,e),u(t,[{key:"componentDidMount",value:function(){this.setdata(this.props.loggedInData)}},{key:"setdata",value:function(e){e&&e.data&&e.data._id&&(this.props.dispatch((0,I.loginLanguage)(e.data,this.props.intlData.setlocale)),this.props.dispatch((0,P.ReportsStore)({uid:e.data._id})),this.getData({currentPage:this.currentPage,totalItems:0,itemsPerPage:this.itemsPerPage}))}},{key:"getData",value:function(e){var t=this;e.searchKeyword=this.state.searchValue,e.roomId=this.props.params.rid,_.isEmpty(this.props.reportsData.assignmentListData)?this.setState({loading:!0}):this.setState({loading:!1}),this.props.dispatch((0,P.studentAssignmentList)(e,e.currentPage)).then(function(e){return t.pageData(e)})}},{key:"pageData",value:function(e){this.state.loading&&this.setState({loading:!1}),0==e.status&&this.refs.room_container.error(e.error+" ","")}},{key:"searchFilter",value:function(e){e.preventDefault();var t=e.target.value.trim(),i=new RegExp(/[+*()?\\]/);i.test(t)||(this.state.searchValue=e.target.value.trim(),this.getData({currentPage:this.currentPage,totalItems:0,itemsPerPage:this.itemsPerPage}))}},{key:"showMarks",value:function(e){var t=e.submissions[0].result;if(t.length>0){var i=0,a=0;return t.map(function(e){i+=e.score,a+=e.maximumMarks}),i+"/"+a}return"--"}},{key:"submittedOn",value:function(e){if(e&&e.submissions[0].submittedAt){var t=E(e.submissions[0].submittedAt).format("DD/MM/YYYY hh:mm A");return l("div",{},void 0,t)}return L}},{key:"render",value:function(){var e=l("div",{className:T["default"].dynamicBreadCrumb},void 0,A),t=[{title:R,type:"function",callback:this.showAssignmentName},{title:U,type:"function",callback:this.submittedOn},{title:$,type:"function",callback:this.showMarks},{title:B,type:"function",callback:this.viewCourse}],i=[{type:"search",id:"assignmentSearch",selectedfilter:this.searchFilter}];return l("div",{},void 0,d["default"].createElement(j.ToastContainer,{toastMessageFactory:S,ref:"room_container",className:"toast-top-right"}),l(N["default"],{data:this.props.reportsData.assignmentListData,count:this.props.reportsData.count,currentPage:this.props.reportsData.currentPage,submenu:this.submenu,bredCrumb:e,topmenu:this.mainmenu,itemsPerPage:this.itemsPerPage,newDataCallback:this.getData,dispField:t,pageTitle:this.props.intl.messages.reports,listDescreption:this.props.intl.messages.student_assignment_list_title,filter:i,loading:this.state.loading}))}}]),t}(p.Component);z.contextTypes={router:d["default"].PropTypes.object},t["default"]=(0,f.connect)(s)(z)},1277:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{intl:e.intl,loggedInData:(0,f.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,i,a,n){var o=t&&t.defaultProps,r=arguments.length-3;if(i||0===r||(i={}),i&&o)for(var s in o)void 0===i[s]&&(i[s]=o[s]);else i||(i=o||{});if(1===r)i.children=n;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];i.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:i,_owner:null}}}(),u=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),p=i(0),d=(a(p),i(12)),c=i(26),f=i(33),h=(i(35),i(18)),g=(a(h),i(73)),v=i(148),m=a(v),y=function(e){function t(){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return r(t,e),u(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){this.props.dispatch((0,g.loginLanguage)(this.props.loggedInData.data,this.props.intl.setlocale))}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t=this.getSchema().map(function(t){if(!t.role||t.role&&t.role.length<=0||t.role&&_.indexOf(t.role,e)!=-1)return"URL"==t.actionType?l("li",{},t._id,l(d.Link,{id:t._id,activeClassName:"active"==t.active?m["default"].active:"",to:t.action},void 0,t.text)):"Function"==t.actionType?l("li",{},t._id,l("a",{id:t._id,onClick:t.action,className:"active"==t.active?m["default"].active:""},void 0,l("i",{className:t.icon}),l("span",{},void 0,t.text))):void 0}.bind(this));return t}},{key:"render",value:function(){return l("div",{className:m["default"].iSubMenuContainer},void 0,l("ul",{},void 0,this.renderMenus()))}}]),t}(p.Component);t["default"]=(0,c.connect)(s)(y)},1278:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{loggedInData:(0,f.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,i,a,n){var o=t&&t.defaultProps,r=arguments.length-3;if(i||0===r||(i={}),i&&o)for(var s in o)void 0===i[s]&&(i[s]=o[s]);else i||(i=o||{});if(1===r)i.children=n;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];i.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:i,_owner:null}}}(),u=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),p=i(0),d=(a(p),i(12)),c=i(26),f=i(33),h=i(148),g=a(h),v=i(22),m=a(v),y=i(62),b=function(e){function t(){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return r(t,e),u(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t={padding:"0 0 8px 0",margin:"0"},i={marginTop:"8px"},a=l(m["default"],{name:"download",style:i}),n=this.getSchema().map(function(i){if(!i.role||i.role&&i.role.length<=0||i.role&&y.indexOf(i.role,e)!=-1){if("Function"==i.actionType){var n=i._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:n},i._id,l("a",{id:i._id,onClick:i.action},void 0,l("i",{className:i.icon}),l("span",{},void 0,i.text)))}if("URL"==i.actionType){var o=i._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:o},i._id,l(d.Link,{to:i.action,id:i._id},void 0,l("i",{className:i.icon}),l("span",{},void 0,i.text)))}if("Upload"==i.actionType){var r=i._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:r,id:i._id},i._id,l("div",{className:g["default"].importBtnBlock},void 0,l("div",{className:g["default"].importBtnInput},void 0,l("span",{className:g["default"].icon},void 0,a),l("input",{className:g["default"].importFileOnclick,id:"fileUploadIcon",type:"file",accept:".xlsx,.xls,.xml,.ods",onChange:i.action,value:""})),l("p",{style:t},void 0,i.text)))}if("Download"==i.actionType){var s=i._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:s},i._id,l("a",{href:i.action,id:i._id,download:!0},void 0,l("i",{className:i.icon}),l("span",{},void 0,i.text)))}}}.bind(this));return n}},{key:"render",value:function(){var e=""+g["default"].iMenuContainer;return l("div",{className:e},void 0,l("ul",{},void 0,this.renderMenus()))}}]),t}(p.Component);t["default"]=(0,c.connect)(s)(b)},1282:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),r=i(0),s=(a(r),i(1283)),l=i(521),u=(a(l),i(20),i(62)),p=function(){function e(){n(this,e)}return o(e,null,[{key:"activeSubMenu",value:function(e,t){return u.forIn(e.menus,function(e,i){e._id==t?e.active="active":e.active=""}),e}},{key:"freeError",value:function(e){return u.forIn(e.schemas,function(e,t){u.forIn(e,function(e,t){u.forIn(e,function(e,t){"hidden"==e.type&&"title"==e.type||(e.error="")})})}),e}},{key:"freeValue",value:function(e){return u.forIn(e.schemas,function(e,t){u.forIn(e,function(e,t){u.forIn(e,function(e,t){if("hidden"==e.type&&"title"==e.type||(e.error=""),"text"==e.type||"textarea"==e.type||"password"==e.type||"search"==e.type||"date"==e.type||"email"==e.type)e.value="";else if("phone"==e.type||"checkbox"==e.type)e.value=[];else if("dropdown"==e.type){var i=e.data[0][0];e.value=i}})})}),e}},{key:"validate",value:function(e,t,i,a){var n=[];return u.forIn(t.schemas,function(t,o){u.forIn(t,function(t,o){u.forIn(t,function(t,o){if((!t.role||t.role&&t.role.length<=0||t.role&&u.indexOf(t.role,i)!=-1)&&("hidden"!=t.type||"title"!=t.type||"view"!=t.type)){var r=u.result(e,t.datafield);if(t.required)if(""==r||void 0==r)if("dropdown"==t.type||"dynamicdropdown"==t.type){var l="";l=a.messages[t.text.props.id].match(/select/i)?a.messages[t.text.props.id]:a.messages.select_dropdown+" "+a.messages[t.text.props.id],t.error=a.messages.requiedField+" "+l,n.push(t.error)}else"date"==t.type?(t.error=a.messages.requiedFieldDate+" "+a.messages[t.text.props.id],n.push(t.error)):(t.error=a.messages.requiedFieldText+" "+a.messages[t.text.props.id],n.push(t.error));else t.error="";if(""==r||void 0==r?"phone"==t.type?t.value=[]:t.value="":t.value=r,void 0!=t.exp&&""!=t.exp){if(r.length>0){var p=RegExp(s.Expressions.get(t.exp));"/(?:)/"!=String(p)&&(p.test(r)?t.error="":t.errormsg?(t.error=t.errormsg,n.push(t.errormsg)):(t.error=a.messages.validInputData+" "+a.messages[t.text.props.id],n.push(t.error)))}}else if("phone"==t.type){if(r.length>0){var d=r[1],c=(r[0],r[2]),f=!0;if(d&&c)if(d.length==c.length)for(var h=0;h<c.length-1;h++)c[h]!=d[h]&&"."!=c[h]&&/^[0-9]$/.test(+d[h])&&(f=!1);else f=!1;f||"+91"==d?t.error="":(t.error=a.messages.validInputData+" "+a.messages[t.text.props.id],n.push(t.error))}}else"date"==t.type&&"false"==r&&(t.error=a.messages.validInputData+" "+a.messages[t.text.props.id],n.push(t.error))}})})}),{schema:t,error:n}}}]),e}();t["default"]=p},1283:function(e,t){"use strict";var i=new Map;i.set("EMAIL","(^(([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|([.]))){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}) )"),i.set("ALPHA","^[A-Za-z]+$"),i.set("ALPHAwithLIMIT","^[A-Za-z]{1,15}$"),i.set("ALPHAwithSPACE","^[A-Za-z\\s]+$"),i.set("ALPHANUMERICwithSPACE","^[A-Za-z0-9\\s]+$"),i.set("ALPHANUMERIC","^[A-Za-z0-9]+$"),i.set("SPACE","[^\\s+$]"),i.set("URL","^(http|https|ftp)://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"),i.set("PHONENO","^[0-9]{10}$"),i.set("NUMBER","^[0-9]+$"),i.set("LIMIT","^([0-9])|([-]1)+$"),i.set("DATE","^(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"),i.set("FULLTIME","^(?:[0,1][0-9]|2[0-3]):(?:[0-5][0-9])$"),i.set("HALFTIME","^(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM))$"),i.set("TIME","^(?:(?:0[1-9]|1[0,1]):(?:[0-5][0-9]))$|^(?:12:00)$|^(?:00:(?:0[1-9]|[1-5][0-9]))$"),i.set("PINCODE","^[0-9]{6}$"),i.set("DATETIME","^(?:(?:(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2}))|(?:(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))))|(?:(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})))(?:\\s(?:(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM)))|(?:(?:12:00)\\s((AM)|(PM))))$"),i.set("USERNAME","^[A-Za-z]{5,20}$"),i.set("PASSWORD","^[A-Za-z0-9]{6,}$"),t.Expressions=i},1308:function(e,t){e.exports={pagination:"TYVzvPvnVhHwh2cU0hA4A",current:"g_uiyu9x1FtjxSP7SG8ZE",table:"MT1wq7GO1NFQY49F82EQ7",headerRow:"_25DfSs-Nwm51luhPR-2j-T",col:"_2AskW4twyvDT4DurTsqR8L",row:"_2WqrTHsuiMmLB0IEBY1vgS",responsivetable:"_31nKaPaXXLrfOOGeGa9GTs",whiteCard:"ryCbWg89OoNEh8LdzqXon",noDataBox:"XRJX9QsZKouxzWnXKoUUp",infoTxt:"_1NZmMey1sQV0aCxxqVtPDu",mainSpinBlock:"_3BEgVxQ9PDQKlEjIHevKr5",innerSpinBlock:"_2Ot9A0ys89IJntrdA5WyyE"}},1394:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,i,a,n){var o=t&&t.defaultProps,r=arguments.length-3;if(i||0===r||(i={}),i&&o)for(var s in o)void 0===i[s]&&(i[s]=o[s]);else i||(i=o||{});if(1===r)i.children=n;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];i.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:i,_owner:null}}}(),l=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),u=i(0),p=a(u),d=i(20),c=(i(12),i(17)),f=(a(c),i(148)),h=a(f),g=i(520),v=a(g),m=i(1308),y=a(m),b=i(21),P=i(22),_=a(P),w=i(1277),M=a(w),N=i(1278),k=a(N),x=i(522),O=a(x),C=i(1395),T=s(_["default"],{name:"sort-amount-desc"}),I=s(_["default"],{name:"sort-amount-asc"}),j=s("h2",{},void 0,s(_["default"],{name:"frown-o"})),D=s("p",{},void 0,s(d.FormattedMessage,{id:"no_data_yet"})),S=s(d.FormattedMessage,{id:"title_list_details"}),E=s("p",{},void 0,s(d.FormattedMessage,{id:"uploadtotopic_title"})),F=s(d.FormattedMessage,{id:"filetypes_title"}),L=s("img",{src:"/images/white-icons/file.png"}),A=s("p",{},void 0,s(d.FormattedMessage,{id:"file_title"})),R=s(d.FormattedMessage,{id:"filetypes_title"}),U=s("img",{src:"/images/white-icons/media.png"}),$=s("p",{},void 0,s(d.FormattedMessage,{id:"media_title"})),B=s(d.FormattedMessage,{id:"filetypes_title"}),z=s("img",{src:"/images/white-icons/zip.png"}),H=s("p",{},void 0,s(d.FormattedMessage,{id:"sco_title"})),V=s("span",{className:"glyphicon glyphicon-remove"}),Z=s(_["default"],{name:"upload"}),q=s(d.FormattedMessage,{id:"upload_title"}),K=s(d.FormattedMessage,{id:"title_list_details"}),G=function(e){function t(){n(this,t);var e=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.getoptions=function(t){var i=e,a=t.map(function(e){return s("option",{value:e[0]},e[0],i.context.intl.messages[e[1]])});return a},e.filterOptions=function(){if(e.props&&e.props.filter){var t=e.props.filter,i=1001,a=e,n=t.map(function(e){return"dropdown"==e.type?s("div",{className:"col-md-2 pull-right col-xs-12"},i++,s("select",{id:e.id,className:"form-control",onChange:e.selectedfilter,value:e.value},void 0,a.getoptions(e.data))):"search"==e.type?s("div",{className:"col-md-2 pull-right col-xs-12"},i++,s("input",{type:"text",id:e.id,className:"form-control",style:{marginBottom:"8px"},placeholder:a.props.intl.messages.search,onChange:e.selectedfilter,maxLength:50})):void 0});return n}},e.Handlesort=function(t){var i=t.currentTarget.id,a=e.state.sortObj;1==a[i]?a[i]=-1:a[i]==-1?a[i]=1:(a={},a[i]=1),e.props.newDataCallback({currentPage:e.props.currentPage,totalItems:e.props.count,itemsPerPage:e.props.itemsPerPage},a),e.setState({sortObj:a})},e.state={value:"",pagination:{},sortObj:{}},e.pageKey=0,e}return r(t,e),l(t,[{key:"componentDidMount",value:function(){this.props.count>0&&(this.state.pagination=new C({currentPage:this.props.currentPage,totalItems:this.props.count,itemsPerPage:this.props.itemsPerPage}),this.props.newDataCallback({currentPage:this.props.currentPage,totalItems:this.props.count,itemsPerPage:this.props.itemsPerPage}))}},{key:"changePage",value:function(e){this.props.count>0&&this.props.newDataCallback({currentPage:e,totalItems:this.props.count,itemsPerPage:this.props.itemsPerPage},this.state.sortObj)}},{key:"handleValue",value:function(e){}},{key:"renderRow",value:function(e){var t=this.props.dispField;if(t&&e&&e._id){var i=e._id+Math.floor(1e3*Math.random(-9)*2);return s("div",{className:y["default"].row},i,Object.keys(t).map(function(i){var a=e._id+i;e._id+"dfsd";return s("div",{className:y["default"].col},a,"text"==t[i].type?e[t[i].fieldName]:t[i].callback(e))}))}}},{key:"handleUpload",value:function(e){this.props.handleUpload(e)}},{key:"handleUrlUpload",value:function(){this.props.handleUrlUpload(this.refs.url.value)}},{key:"handleUrlValue",value:function(e){this.props.handleUrlValue(e)}},{key:"renderRange",value:function(e){this.pageKey+=1;var t="pageKey"+this.pageKey;"?"+e.page,this.changePage;return e.isFirst?s("li",{title:e.page,onClick:this.changePage.bind(this,e.page),"data-page":e.page},t,e.label):e.isNext?s("li",{title:e.page,onClick:this.changePage.bind(this,e.page),"data-page":e.page},t,e.label):e.isPrevious?s("li",{title:e.page,onClick:this.changePage.bind(this,e.page),"data-page":e.page},t,e.label):e.isLast?s("li",{title:e.page,onClick:this.changePage.bind(this,e.page),"data-page":e.page},t,e.label):e.isCurrent?s("li",{className:y["default"].current,title:e.page,onClick:this.changePage.bind(this,e.page),"data-page":e.page},t,e.page):s("li",{title:e.page,onClick:this.changePage.bind(this,e.page),"data-page":e.page},t,e.page)}},{key:"render",value:function(){var e=h["default"].iContainer+" "+h["default"].oContainer+" pull-right",t=h["default"].iForm+" "+h["default"].oForm,i=h["default"].iTopMenu+" "+h["default"].oTopMenu,a=h["default"].iSubMenu+" {styles.oSubMenu}",n=v["default"].btnUpload+" "+v["default"].bgBlueUpload,o=v["default"].btnUpload+" "+v["default"].bgGreenUpload,r=v["default"].btnUpload+" "+v["default"].bgRedUpload,l=""+v["default"].imagePreviewInput,u="form-control "+v["default"].imagePreviewFilename,d="list";if(this.props.count>0){var c=new C({currentPage:this.props.currentPage,totalItems:this.props.count,itemsPerPage:this.props.itemsPerPage}),f=c.range,g=this;this.objContainer=s(b.Row,{},void 0,s(b.Col,{md:12},void 0,s("div",{className:y["default"].responsivetable},void 0,s("div",{className:y["default"].table},void 0,s("div",{className:y["default"].headerRow},void 0,Object.keys(this.props.dispField).map(function(e){var t=e+"heading",i=this.props.dispField[e].dbName?this.props.dispField[e].dbName:"";return s("div",{id:i,className:y["default"].col,onClick:this.props.dispField[e].sort?this.Handlesort:null},t,this.props.dispField[e].title," ",this.props.dispField[e].sort?this.state.sortObj[i]&&1==this.state.sortObj[i]?T:I:null)},this)),Object.keys(this.props.data).map(function(e){return this.renderRow(this.props.data[e])},this)),s("div",{},void 0,s("ul",{className:y["default"].pagination},void 0,c.range?Object.keys(f).map(function(e){return g.renderRange(f[e])}):"")))))}else this.objContainer=s(b.Row,{},void 0,s("div",{className:y["default"].noDataBox},void 0,j,D));return"Reports"==this.props.listType?s(b.Grid,{fluid:!0},void 0,s(b.Row,{},void 0,s(b.Col,{md:12},void 0,s("div",{className:y["default"].infoTxt},void 0,s(b.Row,{},void 0,s("div",{className:"col-md-6"},void 0,s("p",{},void 0,S," ",this.props.listDescreption)),this.filterOptions())))),this.objContainer):s("div",{className:null!=this.props.topmenu&&null!=this.props.submenu?e:""},void 0,null!=this.props.topmenu?s("div",{className:i},void 0,s("h3",{className:""},void 0,this.props.pageTitle),null!=this.props.bredCrumb?s("div",{},void 0,this.props.bredCrumb):null,s(k["default"],{data:this.props.topmenu})):null,null!=this.props.submenu?s("div",{className:a},void 0,s(M["default"],{data:this.props.submenu})):null,s("div",{className:t},void 0,"Upload"==this.props.listType?s("div",{className:v["default"].grayCard},void 0,s("div",{className:v["default"].grayCardHeader},void 0,E),s("div",{className:v["default"].grayCardBody},void 0,s(b.Row,{},void 0,s(b.Col,{md:6},void 0,s("div",{className:v["default"].filesBtnBlock},void 0,s("ul",{},void 0,s("li",{},void 0,s("div",{className:v["default"].uploadBtnBlock},void 0,s("div",{className:v["default"].helpTip},void 0,s("p",{},void 0,s("span",{className:v["default"].heading},void 0,F),s("span",{className:v["default"].uploadTxt},void 0,".xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .odp, .ods , etc..."))),s("div",{className:n},void 0,s("input",{type:"file",id:"uploadFiles",accept:".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf,.odp,.odt,.ods",onChange:this.handleUpload.bind(this),value:""}),L),A)),s("li",{},void 0,s("div",{className:v["default"].uploadBtnBlock},void 0,s("div",{className:v["default"].helpTip},void 0,s("p",{},void 0,s("span",{className:v["default"].heading},void 0,R),s("span",{className:v["default"].uploadTxt},void 0,".png, .jpeg, .jpg, .gif, .wav, .mp3,.mp4,.webm , .avi, .mkv, etc..."))),s("div",{className:o},void 0,s("input",{type:"file",id:"mediaFiles",accept:".png,.jpeg,.jpg,.gif,.wav,.mp3,.mp4,.webm,.avi,.mkv,.vob",onChange:this.handleUpload.bind(this),value:""}),U),$)),s("li",{},void 0,s("div",{className:v["default"].uploadBtnBlock},void 0,s("div",{className:v["default"].helpTip},void 0,s("p",{},void 0,s("span",{className:v["default"].heading},void 0,B),s("span",{className:v["default"].uploadTxt},void 0,".zip"))),s("div",{className:r},void 0,s("input",{type:"file",id:"zipFiles",accept:"application/zip",onChange:this.handleUpload.bind(this),value:""}),z),H))))),s(b.Col,{md:6},void 0,s("div",{className:v["default"].urlConverterBlock},void 0,s("div",{className:v["default"].inputGroup},void 0,s(b.Row,{},void 0,s(b.Col,{md:12},void 0,s("div",{className:"input-group"},void 0,p["default"].createElement("input",{type:"text",id:"url",className:u,value:this.props.urlInputValue,placeholder:this.props.intl.messages.youtube_url_placeholder,ref:"url",onChange:this.handleUrlValue.bind(this),autoFocus:"true"}),s("span",{className:"input-group-btn"},void 0,s("button",{id:"upload",type:"button",className:"btn btn-default image-preview-clear",style:{display:"none"}},void 0,V," Clear"),s("div",{className:l,onClick:this.handleUrlUpload.bind(this)},void 0,Z,s("span",{className:v["default"].imagePreviewInputTitle},void 0," ",q)))))))))))):null,s("div",{className:y["default"].whiteCard},void 0,s(b.Grid,{fluid:!0},void 0,s(b.Row,{},void 0,s(b.Col,{md:12},void 0,s("div",{className:y["default"].infoTxt},void 0,s(b.Row,{},void 0,s("div",{className:"col-md-6"},void 0,s("p",{},void 0,K," ",this.props.listDescreption)),this.filterOptions())))),this.props.loading?s("div",{className:y["default"].mainSpinBlock},void 0,s("div",{className:y["default"].innerSpinBlock},void 0,s(O["default"],{loadType:d}))):this.objContainer))))}}]),t}(u.Component);G.contextTypes={intl:p["default"].PropTypes.object.isRequired},G.defaultProps={itemsPerPage:10,currentPage:1,count:0},t["default"]=(0,d.injectIntl)(G)},1395:function(e,t){"use strict";function i(e){return void 0===e}function a(e){this.validateOptions(e),this.currentPage=e.currentPage,this.totalItems=e.totalItems,this.itemsPerPage=e.itemsPerPage,this.firstPage=i(e.firstPage)?1:e.firstPage,this.rangeLength=e.rangeLength||5,this.firstLabel=e.firstLabel||"«",this.previousLabel=e.previousLabel||"‹",this.nextLabel=e.nextLabel||"›",this.lastLabel=e.lastLabel||"»",this.offset=this.getOffset(),this.totalPages=this.getTotal(),this.lastPage=this.firstPage+this.totalPages-1,this.nextPage=this.getNext(),this.previousPage=this.getPrevious(),this.rangeStart=this.getRangeStart(),this.rangeEnd=this.getRangeEnd(),this.range=this.getRange()}a.prototype.validateOptions=function(e){if(!e)throw new Error("No `options` were passed, aborting.");if(i(e.currentPage)||!e.totalItems||!e.itemsPerPage)throw new Error("You must define your options object correctly, aborting.");if(isNaN(e.currentPage)||isNaN(e.totalItems)||isNaN(e.itemsPerPage))throw new Error("Your options object properties should be numbers, aborting.")},a.prototype.getOffset=function(){return Math.floor(this.rangeLength/2)},a.prototype.getTotal=function(){return Math.ceil(this.totalItems/this.itemsPerPage)},a.prototype.getNext=function(){var e=this.currentPage+1;return e>this.lastPage?null:e},a.prototype.getPrevious=function(){var e=this.currentPage-1;return e<this.firstPage?null:e},a.prototype.getRangeStart=function(){var e;return e=this.currentPage-this.offset,e=this.lastPage<e+this.rangeLength?this.lastPage-this.rangeLength+1:e,e=e<this.firstPage?this.firstPage:e},a.prototype.getRangeEnd=function(){var e;return e=this.currentPage+this.offset,e=e<this.rangeLength?this.rangeLength:e,e=e>this.lastPage?this.lastPage:e},a.prototype.getRange=function(){var e=[],t=this.rangeStart,i=this.rangeEnd;for(this.firstPage!==this.currentPage&&e.push({page:this.firstPage,isFirst:!0,label:this.firstLabel}),null!==this.previousPage&&e.push({page:this.previousPage,isPrevious:!0,label:this.previousLabel}),t;t<=i;t++){var a={page:t};t===this.currentPage&&(a.isCurrent=!0),e.push(a)}return this.nextPage&&e.push({page:this.nextPage,isNext:!0,label:this.nextLabel}),this.lastPage!==this.currentPage&&e.push({page:this.lastPage,isLast:!0,label:this.lastLabel}),e},e.exports=a},1411:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.courseReportsSubMenu=t.reportsListMainMenu=t.reportsMainMenu=t.reportsSubMenu=void 0;var n=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,i,a,n){var o=t&&t.defaultProps,r=arguments.length-3;if(i||0===r||(i={}),i&&o)for(var s in o)void 0===i[s]&&(i[s]=o[s]);else i||(i=o||{});if(1===r)i.children=n;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];i.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:i,_owner:null}}}(),o=i(0),r=(a(o),i(20));i(94),t.reportsSubMenu={menus:[{_id:"lnkReports",text:n(r.FormattedMessage,{id:"room_list"}),actionType:"URL",action:"/course/reports",active:"active"}]},t.reportsMainMenu={menus:[]},t.reportsListMainMenu={menus:[{_id:"btnList",text:n(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/course/reports",icon:"fa fa-list"}]},t.courseReportsSubMenu={menus:[{_id:"linkAttendance",text:n(r.FormattedMessage,{id:"attendance"}),actionType:"Function",action:null},{_id:"linkTopics",text:n(r.FormattedMessage,{id:"topics"}),actionType:"Function",action:null},{_id:"linkAssignment",text:n(r.FormattedMessage,{id:"assignment"}),actionType:"Function",action:null}]}},9:function(e,t,i){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,i,a,n){var o=t&&t.defaultProps,r=arguments.length-3;if(i||0===r||(i={}),i&&o)for(var s in o)void 0===i[s]&&(i[s]=o[s]);else i||(i=o||{});if(1===r)i.children=n;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];i.children=l}return{$$typeof:e,type:t,key:void 0===a?null:""+a,ref:null,props:i,_owner:null}}}(),l=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),u=i(0),p=(a(u),i(12)),d=s("div",{}),c=function(e){function t(){return n(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),l(t,[{key:"componentWillMount",value:function(){p.browserHistory.push("/access-denied")}},{key:"render",value:function(){return d}}]),t}(u.Component);t["default"]=c}});