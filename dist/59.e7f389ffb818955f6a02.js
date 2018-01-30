webpackJsonp([59],{1263:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{loggedInData:(0,C.loggedInData)(e),intlData:(0,R.intlData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,i,o){var a=t&&t.defaultProps,r=arguments.length-3;if(n||0===r||(n={}),n&&a)for(var s in a)void 0===n[s]&&(n[s]=a[s]);else n||(n=a||{});if(1===r)n.children=o;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];n.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),d=n(0),c=i(d),f=n(26),p=n(12),v=n(20),m=n(21),y=n(22),g=i(y),h=n(56),_=i(h),b=n(148),M=i(b),x=n(1407),w=i(x),T=n(520),F=i(T),I=n(1308),N=i(I),k=n(1282),S=i(k),P=n(1277),E=i(P),A=n(1278),O=i(A),D=n(1398),C=n(33),L=n(528),U=n(73),R=n(519),j=l(v.FormattedMessage,{id:"manage_user"}),B=l(v.FormattedMessage,{id:"user_details"}),H=l("li",{},void 0,"/"),$=l("li",{},void 0,l(v.FormattedMessage,{id:"work_edu_details"})),z=l(O["default"],{data:D.userProfileMenu}),V=l(v.FormattedMessage,{id:"work_title"}),Z=l("span",{},void 0,"| "),q=l("span",{},void 0,"| "),W=l("h2",{},void 0,l(g["default"],{name:"frown-o"})),Q=l("p",{},void 0,l(v.FormattedMessage,{id:"no_data_yet"})),K=l(v.FormattedMessage,{id:"professionalSkills_title"}),X=l("h2",{},void 0,l(g["default"],{name:"frown-o"})),G=l("p",{},void 0,l(v.FormattedMessage,{id:"no_data_yet"})),Y=l(v.FormattedMessage,{id:"college_title"}),J=l("span",{},void 0,"| "),ee=l("h2",{},void 0,l(g["default"],{name:"frown-o"})),te=l("p",{},void 0,l(v.FormattedMessage,{id:"no_data_yet"})),ne=l(v.FormattedMessage,{id:"highSchool_title"}),ie=l("img",{src:"/images/icons/school.png"}),oe=l("span",{},void 0,"| "),ae=l("h2",{},void 0,l(g["default"],{name:"frown-o"})),re=l("p",{},void 0,l(v.FormattedMessage,{id:"no_data_yet"})),se=l("img",{src:"/images/icons/company.png"}),le=l("img",{src:"/images/icons/college.png"}),ue=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.navigate=function(e){var t=e+n.userId;p.browserHistory.push(t)},n.setdata=function(e){e&&e.data&&e.data._id&&(n.props.dispatch((0,U.loginLanguage)(e.data,n.props.intlData.setlocale)),(0,L.getUserProfile)(n.userId).then(function(e){return n.setresponse(e)}))},n.setresponse=function(e){e.status&&n.setState({data:e.data&&e.data.profile?e.data.profile:null,name:e.data.firstname})},n.viewuser=function(){p.browserHistory.push("/admin/users/view/"+n.userId)},n.state={data:null,name:""},n.mainmenu=D.userProfileMenu,n.mainmenu.menus[0].action=n.navigate.bind(n,"/admin/users/view/"),n.submenu=D.userProfileSubMenu,n.submenu.menus[0].action=n.navigate.bind(n,"/admin/users/profile/"),n.submenu.menus[2].action=n.navigate.bind(n,"/admin/users/contacts/"),n.submenu.menus[3].action=n.navigate.bind(n,"/admin/users/locale/"),n.userId=n.props.params.pid,n}return r(t,e),u(t,[{key:"componentDidMount",value:function(){this.setdata(this.props.loggedInData)}},{key:"render",value:function(){var e=M["default"].iContainer+" "+M["default"].oContainer+" pull-right",t=M["default"].iTopMenu+" "+M["default"].oTopMenu,n=M["default"].iSubMenu+" {compstyles.oSubMenu}",i=w["default"].displayInfoBlock+" clearfix",o=w["default"].iconBox+" pull-left",a=w["default"].informationBox+" pull-left",r=w["default"].singleInfoBox+" pull-left",s=""+F["default"].vR,u=F["default"].vN+" "+F["default"].bfK+" "+F["default"].a3q,d=""+F["default"].vT,c=(""+F["default"].vM,S["default"].activeSubMenu(D.userProfileSubMenu,"lnkProfileWorkEdu")),f=this.state.data,v=f&&f.experience&&f.experience.workplace&&f.experience.workplace.length>0?f.experience.workplace:null,y=f&&f.experience&&f.experience.professionalSkills&&f.experience.professionalSkills.length>0?f.experience.professionalSkills:null,g=f&&f.education&&f.education.college&&f.education.college.length>0?f.education.college:null,h=f&&f.education&&f.education.highSchool?f.education.highSchool:null,b=l("div",{className:o},void 0,se),x=l("div",{className:o},void 0,le);return l("div",{className:e},void 0,l("div",{className:t},void 0,l("h3",{className:M["default"].capitalize},void 0,j," :: ",this.state.name),l("div",{className:M["default"].dynamicBreadCrumb},void 0,l("ul",{},void 0,l("li",{},void 0,l(p.Link,{onClick:this.viewuser},void 0,B)),H,$)),z),l("div",{className:n},void 0,l(E["default"],{data:c})),l("div",{className:_["default"].midContainer},void 0,l("div",{className:_["default"].whiteCard},void 0,l(m.Grid,{fluid:!0},void 0,l("div",{className:w["default"].userCategoryInfo},void 0,l("h2",{className:w["default"].categoryHeading},void 0,V),l("ul",{},void 0,null!=v?v.map(function(e){return l("li",{},e._id,l("div",{className:i},void 0,b,l("div",{className:a},void 0,l("h2",{className:w["default"].displayHeadingTxt},void 0,e.company),l("span",{},void 0,e.position," "),Z,l("span",{},void 0,e.yearFrom," to ",null==e.yearTo&&1==e.present?"present":e.yearTo," "),q,l("span",{},void 0,e.city,", "),l("span",{},void 0,e.country),l("p",{className:w["default"].descriptionTxt},void 0,e.description))))}):l("li",{},void 0,l(m.Row,{},void 0,l("div",{className:M["default"].whiteCard},void 0,l("div",{className:N["default"].noDataBox},void 0,W,Q)))))),l("div",{className:w["default"].userCategoryInfo},void 0,l("h2",{className:w["default"].categoryHeading},void 0,K),l("ul",{},void 0,null!=y?l("li",{},void 0,l("div",{className:i},void 0,l("div",{className:r},void 0,l("h2",{className:w["default"].displayHeadingTxt},void 0,y.map(function(e,t){return l("div",{className:s},t,l("span",{className:u},void 0,l("div",{className:d},void 0,e)))}))))):l("li",{},void 0,l(m.Row,{},void 0,l("div",{className:M["default"].whiteCard},void 0,l("div",{className:N["default"].noDataBox},void 0,X,G)))))),l("div",{className:w["default"].userCategoryInfo},void 0,l("h2",{className:w["default"].categoryHeading},void 0,Y),l("ul",{},void 0,null!=g?g.map(function(e){return l("li",{},e._id,l("div",{className:i},void 0,x,l("div",{className:a},void 0,l("h2",{className:w["default"].displayHeadingTxt},void 0,e.university),l("span",{},void 0,e.yearFrom," to ",e.yearTo," "),J,l("span",{},void 0,e.city,", "),l("span",{},void 0,e.country),l("p",{className:w["default"].descriptionTxt},void 0,e.description))))}):l("li",{},void 0,l(m.Row,{},void 0,l("div",{className:M["default"].whiteCard},void 0,l("div",{className:N["default"].noDataBox},void 0,ee,te)))))),l("div",{className:w["default"].userCategoryInfo},void 0,l("h2",{className:w["default"].categoryHeading},void 0,ne),l("ul",{},void 0,null!=h?l("li",{},void 0,l("div",{className:i},void 0,l("div",{className:o},void 0,ie),l("div",{className:a},void 0,l("h2",{className:w["default"].displayHeadingTxt},void 0,h.school),l("span",{},void 0,h.yearFrom," to ",h.yearTo," "),oe,l("span",{},void 0,h.city,", "),l("span",{},void 0,h.country),l("p",{className:w["default"].descriptionTxt},void 0,h.description)))):l("li",{},void 0,l(m.Row,{},void 0,l("div",{className:M["default"].whiteCard},void 0,l("div",{className:N["default"].noDataBox},void 0,ae,re))))))))))}}]),t}(d.Component);ue.contextTypes={router:c["default"].PropTypes.object},t["default"]=(0,f.connect)(s)(ue)},1277:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{intl:e.intl,loggedInData:(0,p.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,i,o){var a=t&&t.defaultProps,r=arguments.length-3;if(n||0===r||(n={}),n&&a)for(var s in a)void 0===n[s]&&(n[s]=a[s]);else n||(n=a||{});if(1===r)n.children=o;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];n.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),d=n(0),c=(i(d),n(12)),f=n(26),p=n(33),v=(n(35),n(18)),m=(i(v),n(73)),y=n(148),g=i(y),h=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return r(t,e),u(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){this.props.dispatch((0,m.loginLanguage)(this.props.loggedInData.data,this.props.intl.setlocale))}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t=this.getSchema().map(function(t){if(!t.role||t.role&&t.role.length<=0||t.role&&_.indexOf(t.role,e)!=-1)return"URL"==t.actionType?l("li",{},t._id,l(c.Link,{id:t._id,activeClassName:"active"==t.active?g["default"].active:"",to:t.action},void 0,t.text)):"Function"==t.actionType?l("li",{},t._id,l("a",{id:t._id,onClick:t.action,className:"active"==t.active?g["default"].active:""},void 0,l("i",{className:t.icon}),l("span",{},void 0,t.text))):void 0}.bind(this));return t}},{key:"render",value:function(){return l("div",{className:g["default"].iSubMenuContainer},void 0,l("ul",{},void 0,this.renderMenus()))}}]),t}(d.Component);t["default"]=(0,f.connect)(s)(h)},1278:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{loggedInData:(0,p.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,i,o){var a=t&&t.defaultProps,r=arguments.length-3;if(n||0===r||(n={}),n&&a)for(var s in a)void 0===n[s]&&(n[s]=a[s]);else n||(n=a||{});if(1===r)n.children=o;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];n.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),u=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),d=n(0),c=(i(d),n(12)),f=n(26),p=n(33),v=n(148),m=i(v),y=n(22),g=i(y),h=n(62),_=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return r(t,e),u(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t={padding:"0 0 8px 0",margin:"0"},n={marginTop:"8px"},i=l(g["default"],{name:"download",style:n}),o=this.getSchema().map(function(n){if(!n.role||n.role&&n.role.length<=0||n.role&&h.indexOf(n.role,e)!=-1){if("Function"==n.actionType){var o=n._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:o},n._id,l("a",{id:n._id,onClick:n.action},void 0,l("i",{className:n.icon}),l("span",{},void 0,n.text)))}if("URL"==n.actionType){var a=n._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:a},n._id,l(c.Link,{to:n.action,id:n._id},void 0,l("i",{className:n.icon}),l("span",{},void 0,n.text)))}if("Upload"==n.actionType){var r=n._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:r,id:n._id},n._id,l("div",{className:m["default"].importBtnBlock},void 0,l("div",{className:m["default"].importBtnInput},void 0,l("span",{className:m["default"].icon},void 0,i),l("input",{className:m["default"].importFileOnclick,id:"fileUploadIcon",type:"file",accept:".xlsx,.xls,.xml,.ods",onChange:n.action,value:""})),l("p",{style:t},void 0,n.text)))}if("Download"==n.actionType){var s=n._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:s},n._id,l("a",{href:n.action,id:n._id,download:!0},void 0,l("i",{className:n.icon}),l("span",{},void 0,n.text)))}}}.bind(this));return o}},{key:"render",value:function(){var e=""+m["default"].iMenuContainer;return l("div",{className:e},void 0,l("ul",{},void 0,this.renderMenus()))}}]),t}(d.Component);t["default"]=(0,f.connect)(s)(_)},1282:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(0),s=(i(r),n(1283)),l=n(521),u=(i(l),n(20),n(62)),d=function(){function e(){o(this,e)}return a(e,null,[{key:"activeSubMenu",value:function(e,t){return u.forIn(e.menus,function(e,n){e._id==t?e.active="active":e.active=""}),e}},{key:"freeError",value:function(e){return u.forIn(e.schemas,function(e,t){u.forIn(e,function(e,t){u.forIn(e,function(e,t){"hidden"==e.type&&"title"==e.type||(e.error="")})})}),e}},{key:"freeValue",value:function(e){return u.forIn(e.schemas,function(e,t){u.forIn(e,function(e,t){u.forIn(e,function(e,t){if("hidden"==e.type&&"title"==e.type||(e.error=""),"text"==e.type||"textarea"==e.type||"password"==e.type||"search"==e.type||"date"==e.type||"email"==e.type)e.value="";else if("phone"==e.type||"checkbox"==e.type)e.value=[];else if("dropdown"==e.type){var n=e.data[0][0];e.value=n}})})}),e}},{key:"validate",value:function(e,t,n,i){var o=[];return u.forIn(t.schemas,function(t,a){u.forIn(t,function(t,a){u.forIn(t,function(t,a){if((!t.role||t.role&&t.role.length<=0||t.role&&u.indexOf(t.role,n)!=-1)&&("hidden"!=t.type||"title"!=t.type||"view"!=t.type)){var r=u.result(e,t.datafield);if(t.required)if(""==r||void 0==r)if("dropdown"==t.type||"dynamicdropdown"==t.type){var l="";l=i.messages[t.text.props.id].match(/select/i)?i.messages[t.text.props.id]:i.messages.select_dropdown+" "+i.messages[t.text.props.id],t.error=i.messages.requiedField+" "+l,o.push(t.error)}else"date"==t.type?(t.error=i.messages.requiedFieldDate+" "+i.messages[t.text.props.id],o.push(t.error)):(t.error=i.messages.requiedFieldText+" "+i.messages[t.text.props.id],o.push(t.error));else t.error="";if(""==r||void 0==r?"phone"==t.type?t.value=[]:t.value="":t.value=r,void 0!=t.exp&&""!=t.exp){if(r.length>0){var d=RegExp(s.Expressions.get(t.exp));"/(?:)/"!=String(d)&&(d.test(r)?t.error="":t.errormsg?(t.error=t.errormsg,o.push(t.errormsg)):(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],o.push(t.error)))}}else if("phone"==t.type){if(r.length>0){var c=r[1],f=(r[0],r[2]),p=!0;if(c&&f)if(c.length==f.length)for(var v=0;v<f.length-1;v++)f[v]!=c[v]&&"."!=f[v]&&/^[0-9]$/.test(+c[v])&&(p=!1);else p=!1;p||"+91"==c?t.error="":(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],o.push(t.error))}}else"date"==t.type&&"false"==r&&(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],o.push(t.error))}})})}),{schema:t,error:o}}}]),e}();t["default"]=d},1283:function(e,t){"use strict";var n=new Map;n.set("EMAIL","(^(([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|([.]))){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}) )"),n.set("ALPHA","^[A-Za-z]+$"),n.set("ALPHAwithLIMIT","^[A-Za-z]{1,15}$"),n.set("ALPHAwithSPACE","^[A-Za-z\\s]+$"),n.set("ALPHANUMERICwithSPACE","^[A-Za-z0-9\\s]+$"),n.set("ALPHANUMERIC","^[A-Za-z0-9]+$"),n.set("SPACE","[^\\s+$]"),n.set("URL","^(http|https|ftp)://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"),n.set("PHONENO","^[0-9]{10}$"),n.set("NUMBER","^[0-9]+$"),n.set("LIMIT","^([0-9])|([-]1)+$"),n.set("DATE","^(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"),n.set("FULLTIME","^(?:[0,1][0-9]|2[0-3]):(?:[0-5][0-9])$"),n.set("HALFTIME","^(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM))$"),n.set("TIME","^(?:(?:0[1-9]|1[0,1]):(?:[0-5][0-9]))$|^(?:12:00)$|^(?:00:(?:0[1-9]|[1-5][0-9]))$"),n.set("PINCODE","^[0-9]{6}$"),n.set("DATETIME","^(?:(?:(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2}))|(?:(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))))|(?:(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})))(?:\\s(?:(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM)))|(?:(?:12:00)\\s((AM)|(PM))))$"),n.set("USERNAME","^[A-Za-z]{5,20}$"),n.set("PASSWORD","^[A-Za-z0-9]{6,}$"),t.Expressions=n},1308:function(e,t){e.exports={pagination:"TYVzvPvnVhHwh2cU0hA4A",current:"g_uiyu9x1FtjxSP7SG8ZE",table:"MT1wq7GO1NFQY49F82EQ7",headerRow:"_25DfSs-Nwm51luhPR-2j-T",col:"_2AskW4twyvDT4DurTsqR8L",row:"_2WqrTHsuiMmLB0IEBY1vgS",responsivetable:"_31nKaPaXXLrfOOGeGa9GTs",whiteCard:"ryCbWg89OoNEh8LdzqXon",noDataBox:"XRJX9QsZKouxzWnXKoUUp",infoTxt:"_1NZmMey1sQV0aCxxqVtPDu",mainSpinBlock:"_3BEgVxQ9PDQKlEjIHevKr5",innerSpinBlock:"_2Ot9A0ys89IJntrdA5WyyE"}},1398:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.userViewSubMenu=t.userListSubMenu=t.userViewToEditMainMenu=t.userViewToEditSubMenu=t.userEditSubMenu=t.loggedInUsersMainMenu=t.userListMainMenu=t.userProfileSubMenu=t.userProfileMenu=t.guestUserViewMainMenu=t.inActiveUserViewMainMenu=t.userViewMainMenu=t.userEditMainMenu=void 0;var o=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,i,o){var a=t&&t.defaultProps,r=arguments.length-3;if(n||0===r||(n={}),n&&a)for(var s in a)void 0===n[s]&&(n[s]=a[s]);else n||(n=a||{});if(1===r)n.children=o;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];n.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),a=n(0),r=(i(a),n(20)),s=n(94);t.userEditMainMenu={menus:[{_id:"btnCancel",text:o(r.FormattedMessage,{id:"cancel"}),actionType:"URL",action:"/admin/users/list",icon:"fa fa-ban"},{_id:"btnSave",text:o(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.userViewMainMenu={menus:[{_id:"btnNew",text:o(r.FormattedMessage,{id:"new_user"}),actionType:"Function",action:null,icon:"fa fa-user"},{_id:"btnViewProfile",text:o(r.FormattedMessage,{id:"viewprofile"}),actionType:"Function",action:null,icon:"fa fa-user"},{_id:"btnList",text:o(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/users/list",icon:"fa fa-list"},{_id:"btnEdit",text:o(r.FormattedMessage,{id:"edit"}),actionType:"Function",action:null,icon:"fa fa-pencil"},{_id:"btnDelete",text:o(r.FormattedMessage,{id:"delete"}),actionType:"Function",action:null,icon:"fa fa-trash"}]},t.inActiveUserViewMainMenu={menus:[{_id:"btnNew",text:o(r.FormattedMessage,{id:"new_user"}),actionType:"URL",action:"/admin/users/new",icon:"fa fa-user"},{_id:"btnViewProfile",text:o(r.FormattedMessage,{id:"viewprofile"}),actionType:"Function",action:null,icon:"fa fa-user"},{_id:"btnList",text:o(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/users/list",icon:"fa fa-list"},{_id:"btnActive",text:o(r.FormattedMessage,{id:"activate_user"}),actionType:"Function",action:null,icon:"fa fa-unlock-alt"}]},t.guestUserViewMainMenu={menus:[{_id:"btnNew",text:o(r.FormattedMessage,{id:"new_user"}),actionType:"URL",action:"/admin/users/new",icon:"fa fa-user"},{_id:"btnList",text:o(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/users/list",icon:"fa fa-list"}]},t.userProfileMenu={menus:[{_id:"btnback",text:o(r.FormattedMessage,{id:"back"}),actionType:"Function",action:null,icon:"fa fa-long-arrow-left"},{_id:"btnList",text:o(r.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/users/list",icon:"fa fa-list"}]},t.userProfileSubMenu={menus:[{_id:"lnkProfile",text:o(r.FormattedMessage,{id:"profile"}),actionType:"Function",action:null,active:"active"},{_id:"lnkProfileWorkEdu",text:o(r.FormattedMessage,{id:"work_education"}),actionType:"Function",action:null},{_id:"lnkProfileContacts",text:o(r.FormattedMessage,{id:"contacts"}),actionType:"Function",action:null},{_id:"lnkProfileLocale",text:o(r.FormattedMessage,{id:"locale"}),actionType:"Function",action:null}]},t.userListMainMenu={menus:[{_id:"btnNew",text:o(r.FormattedMessage,{id:"new_user"}),actionType:"Function",action:null,icon:"fa fa-user"},{_id:"btnExport",text:o(r.FormattedMessage,{id:"export_users"}),actionType:"Function",action:null,icon:"fa fa-upload"},{_id:"btnImport",text:o(r.FormattedMessage,{id:"import_users"}),actionType:"Upload",action:null,icon:"fa fa-download",role:[s.Roles.Admin,s.Roles.Lmsadmin,s.Roles.Presenteradmin]},{_id:"btnFormat",text:o(r.FormattedMessage,{id:"import_format"}),actionType:"Download",action:"/ImportFormat.xlsx",icon:"fa fa-file-excel-o",role:[s.Roles.Lmsadmin,s.Roles.Presenteradmin]},{_id:"btnSample",text:o(r.FormattedMessage,{id:"import_format"}),actionType:"Download",action:"/SampleSheet.xlsx",icon:"fa fa-file-excel-o",role:[s.Roles.Admin]}]},t.loggedInUsersMainMenu={menus:[{_id:"btnNew",text:o(r.FormattedMessage,{id:"new_user"}),actionType:"Function",action:null,icon:"fa fa-user"}]},t.userEditSubMenu={menus:[{_id:"lnkNewUsers",text:o(r.FormattedMessage,{id:"new_user"}),actionType:"URL",action:"/admin/users/new",active:"active"}]},t.userViewToEditSubMenu={menus:[{_id:"editNewUser",text:o(r.FormattedMessage,{id:"edit_user"}),actionType:"Function",action:null,active:"active"}]},t.userViewToEditMainMenu={menus:[{_id:"btnCancel",text:o(r.FormattedMessage,{id:"cancel"}),actionType:"Function",action:null,icon:"fa fa-ban"},{_id:"btnSave",text:o(r.FormattedMessage,{id:"save"}),actionType:"Function",action:null,icon:"fa fa-floppy-o"}]},t.userListSubMenu={menus:[{_id:"lnkUsers",text:o(r.FormattedMessage,{id:"all_users"}),actionType:"URL",action:"/admin/users/list",active:"active"},{_id:"lnkUsersActivity",text:o(r.FormattedMessage,{id:"users_activity"}),actionType:"URL",action:"/admin/active/users",active:"active"}]},t.userViewSubMenu={menus:[{_id:"lnkUsers",text:o(r.FormattedMessage,{id:"user_info"}),actionType:"Function",action:null,active:"active"}]}},1407:function(e,t){e.exports={whiteCard:"_11-qF5Dy6fUPhbE5ASyoAb",userCategoryInfo:"WOj4H0Pd5qdiBIeJ_jSzE",categoryHeading:"_2zYR0mKkt9-5gSCAQBHIqN",addInfoBlock:"RpKI-lmcojWvRv7d0EmU3",iconBox:"_23UFQuMvnrO2WTNv8mv3Hd",displayInfoBlock:"YL8VitlGQhQL4kgydhPmS",addCategoryTxtBox:"_3mfUz6t38pJfrnx8Pekrl",addCategoryTxt:"_1KVx5GdGaZUUlQarK7_XXH",informationBox:"_2nfYfBEbFQ98_DkGRMH3CA",singleInfoBox:"_1TVVy7kd0T3gg0a6St9WAE",displayHeadingTxt:"_3fORW7ufhi5CzMfxu7OnIy",descriptionTxt:"thUHVsbnlq3bjnAr5gFxa",moreInfoBlock:"_1zQI_QycbDdd0V-_zZjLgO",moreIconBox:"zUHbE4gH7C5DZXUycsqVs",moreDropDown:"_1geEcCXfBiHBlPFi-a4VSJ",slideDown:"_3LyXdcxBnMVGdP1Ulqdwwp",leftInfoTxt:"LcpRx9eL6HpI-YWoYWTL",rightDetailInfo:"_2z682dcAExIIbbDJJiJMaj",profileEditBlock:"_2yIasUg8IoV4o-NkePYm4Z",error:"xUI_AU88CH0CEtS9jUz3Y",mandatory:"_1OigGLgQAInkh5FSWbFEgD",btnSpace:"vNIneqYLKzw0_3yZq42xe",genderBlock:"_2asz8c5cheNagu9Hg-xqS-",genderInput:"_3JfcXKAi8aCKEP1gF3mKmf",genderText:"_3XD-OXiUfkNDbmNOtlIwlW"}},9:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,n,i,o){var a=t&&t.defaultProps,r=arguments.length-3;if(n||0===r||(n={}),n&&a)for(var s in a)void 0===n[s]&&(n[s]=a[s]);else n||(n=a||{});if(1===r)n.children=o;else if(r>1){for(var l=Array(r),u=0;u<r;u++)l[u]=arguments[u+3];n.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:n,_owner:null}}}(),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),u=n(0),d=(i(u),n(12)),c=s("div",{}),f=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),l(t,[{key:"componentWillMount",value:function(){d.browserHistory.push("/access-denied")}},{key:"render",value:function(){return c}}]),t}(u.Component);t["default"]=f}});