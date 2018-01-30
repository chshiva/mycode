webpackJsonp([55],{1206:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{intl:e.intl,loggedInData:(0,g.loggedInData)(e),groupData:(0,w.groupData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),d=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),u=a(0),p=i(u),c=a(20),f=a(26),v=a(12),h=a(18),m=(i(h),a(524)),g=(i(m),a(35),a(33)),y=a(1282),b=i(y),_=a(534),w=a(545),S=a(22),N=i(S),k=a(56),M=i(k),I=a(1278),P=i(I),D=a(1277),E=i(D),A=a(148),x=i(A),O=a(1457),C=a(21),L=a(93),T=a(1541),j=i(T),F=a(1539),U=i(F),R=a(94),G=a(522),$=i(G),B=a(1308),H=i(B),z=p["default"].createFactory(L.ToastMessage.animation),V=a(62),Z=l("h3",{className:""},void 0,l(c.FormattedMessage,{id:"participants_group"})),q=l("li",{},void 0,l(v.Link,{id:"allParticipants",to:"/admin/participants-group/list"},void 0,l(c.FormattedMessage,{id:"all_participants_groups"}))),W=l("li",{},void 0,"/"),K=l("span",{},void 0,"Group Name "),Q=l(N["default"],{name:"trash-o"}),X=l(N["default"],{name:"pencil-square-o"}),J=l(N["default"],{name:"user-plus"}),Y=l("p",{},void 0,l(c.FormattedMessage,{id:"title_groupParticipants_details"}),"."),ee=l(N["default"],{name:"times"}),te=l("h2",{},void 0,l(N["default"],{name:"frown-o"})),ae=l("p",{},void 0,l(c.FormattedMessage,{id:"no_data_yet"})),ie=function(e){function t(e){o(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.ParticipantsGroupEdit=function(){v.browserHistory.push("/admin/participants-group/list")},a.searchFilter=function(e){e.preventDefault();var t=a.props.params.gid;a.setState({searchVal:e.target.value});var i={id:t,searchKeyword:e.target.value};a.props.dispatch((0,_.getGroupStudents)(i,"/admin/participants-group/view/"+t))},a.state={uid:"",showAddGroup:!1,showAddParticipants:!1,loading:!0,searchVal:""},a.role=!1,a.mainmenu=O.viewParticipantsMainMenu,a.submenu=b["default"].activeSubMenu(O.participantsSubMenu,"lnkparticipantsResult"),a}return n(t,e),d(t,[{key:"componentDidMount",value:function(){this.setdata(this.props.loggedInData)}},{key:"setdata",value:function(e){var t=this;if(e&&e.data&&e.data._id){var a=this.props.params.gid;this.setState({uid:e.data._id});var i={id:a};V.isEmpty(this.props.groupData.dataList.participants)||a!=this.props.groupData.dataList.participants._id?this.setState({loading:!0}):this.setState({loading:!1}),this.props.dispatch((0,_.getGroupStudents)(i,"/admin/participants-group/view/"+a)).then(function(e){return t.setLoading()})}}},{key:"setLoading",value:function(){this.state.loading&&this.setState({loading:!1})}},{key:"groupDelete",value:function(){var e=this,t=this.props,a=this.props.params.gid;alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_group_alert,function(i){if(i){var o={id:a};t.dispatch((0,_.deleteStudentGroup)(o)).then(function(t){return e.deleteGroupResponse(t)})}},function(){}).setting("labels",{ok:this.props.intl.messages.ok,cancel:this.props.intl.messages.cancel})}},{key:"deleteGroupResponse",value:function(e){e.status&&v.browserHistory.push("/admin/participants-group/list")}},{key:"deleteStudent",value:function(e){var t=this,a=this.props,i=this.props.params.gid;alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_participant_alert,function(o){if(o){var r={id:i,sid:e};a.dispatch((0,_.deleteStudentInGroup)(r)).then(function(e){return t.deleteResponse(e)})}},function(){}).setting("labels",{ok:this.props.intl.messages.ok,cancel:this.props.intl.messages.cancel})}},{key:"deleteResponse",value:function(e){this.setState({searchVal:""}),e.status?this.refs.room_container.success(e.message+" ",""):this.refs.room_container.success(e.error+" ","")}},{key:"handleEditModel",value:function(e){this.setState({showAddGroup:!this.state.showAddGroup})}},{key:"saveEditData",value:function(e){var t=this;e.id=this.props.params.gid,this.props.dispatch((0,_.saveGroupName)(e)).then(function(e){return t.resposeData(e)})}},{key:"resposeData",value:function(e){e.status?(this.setState({showAddGroup:!this.state.showAddGroup}),this.refs.room_container.success(e.message+" ","")):e.error&&this.refs.room_container.error(e.error+" ","")}},{key:"handleAddModel",value:function(e){this.setState({showAddParticipants:!this.state.showAddParticipants})}},{key:"responsecallback",value:function(e){e.status?(this.setState({showAddParticipants:!this.state.showAddParticipants}),this.refs.room_container.success(e.message+" ","")):"close"==e.status&&this.setState({showAddParticipants:!this.state.showAddParticipants})}},{key:"viewUser",value:function(e){v.browserHistory.push("/profile/"+e)}},{key:"render",value:function(){var e=this;if(this.props.loggedInData&&this.props.loggedInData.data&&this.props.loggedInData.data.role){var t=(V.invert(R.Roles),this.props.loggedInData.data.role);t==R.Roles.Lmsadmin||t==R.Roles.Instructor||t==R.Roles.Presenteradmin||t==R.Roles.Presenter?this.role=!0:this.role=!1}var a=null;this.props.groupData&&this.props.groupData.dataList&&this.props.groupData.dataList.groupName&&(a=this.props.groupData.dataList.groupName);var i=x["default"].iContainer+" "+x["default"].oContainer+" pull-right",o=x["default"].iTopMenu+" "+x["default"].oTopMenu,r=x["default"].iSubMenu+" {styles.oSubMenu}",n=M["default"].gropListInfoHeader+" clearfix",s="list";return l("div",{},void 0,l("div",{className:i},void 0,p["default"].createElement(L.ToastContainer,{toastMessageFactory:z,ref:"room_container",className:"toast-top-right"}),l("div",{className:o},void 0,Z,l("div",{className:x["default"].dynamicBreadCrumb},void 0,l("ul",{},void 0,q,W,l("li",{},void 0,a))),l(P["default"],{data:this.mainmenu})),l("div",{className:r},void 0,l(E["default"],{data:this.submenu})),l("div",{className:M["default"].midContainer},void 0,l("div",{className:n},void 0,l("div",{className:M["default"].gropListInfoHeadingTxt},void 0,l("h3",{},void 0,K," - ",l("b",{className:M["default"].gropListName},void 0,a))),this.role?l("div",{className:M["default"].groupListActionBlock},void 0,l("ul",{className:"clearfix"},void 0,l("li",{id:"deleteGroupBtn",onClick:this.groupDelete.bind(this),title:this.props.intl.messages.delete_this_group},void 0,Q),l("li",{id:"editGroupBtn",onClick:this.handleEditModel.bind(this),title:this.props.intl.messages.edit_group_name},void 0,X),l("li",{id:"addMemberBtn",onClick:this.handleAddModel.bind(this),title:this.props.intl.messages.add_participants_group},void 0,J))):null),l("div",{className:M["default"].whiteCard},void 0,this.state.loading?l("div",{className:M["default"].mainSpinBlock},void 0,l("div",{className:M["default"].innerSpinBlock},void 0,l($["default"],{loadType:s}))):l("div",{},void 0,l(C.Grid,{fluid:!0},void 0,l(C.Row,{},void 0,l(C.Col,{md:12},void 0,l("div",{className:"col-md-2 pull-right col-xs-12"},void 0,l("input",{id:"searchStudent",type:"text",value:this.state.searchVal,className:"form-control",placeholder:this.props.intl.messages.search,onChange:this.searchFilter.bind(this),maxLength:50})),l("div",{className:M["default"].infoTxt},void 0,Y))),l(C.Row,{},void 0,l(C.Col,{md:12},void 0,l("div",{className:M["default"].locationBlock},void 0,l("div",{className:M["default"].gropListInfoBlock},void 0,this.props.groupData&&this.props.groupData.dataList&&void 0!=this.props.groupData.dataList.participants?l("div",{className:M["default"].gropListInfoBody},void 0,l("div",{className:M["default"].groupUsersList},void 0,this.props.groupData.dataList.participants.length>0?l("div",{className:M["default"].groupUsersList},void 0,l("ul",{},void 0,this.props.groupData.dataList.participants.map(function(t){if(t.profile&&void 0!=t.profile.profileImage&&""!=t.profile.profileImage&&null!=t.profile.profileImage)a="/uploads/"+t.profile.profileImage;else var a="/images/profile-pics/defaultStudent.jpg";return l("li",{className:"clearfix"},t._id,l(v.Link,{id:"viewUser",className:M["default"].avatarBox},void 0,l("img",{src:a,onClick:e.viewUser.bind(e,t._id),title:e.props.intl.messages.viewprofile})),l("div",{className:M["default"].avatarNameBlock},void 0,l("h4",{id:"viewUser",className:M["default"].viewUserCurser,onClick:e.viewUser.bind(e,t._id),title:e.props.intl.messages.viewprofile},void 0,t.firstname," ",t.lastname),l("p",{},void 0,t.email)),e.role?l("div",{id:"removeGroupUser",className:M["default"].removeGroupUser,onClick:e.deleteStudent.bind(e,t._id),title:e.props.intl.messages.remove_participants_from_group},void 0,ee):null)}))):null)):l("div",{className:H["default"].noDataBox},void 0,te,ae)))))))))),l(j["default"],{hidecallback:this.handleEditModel.bind(this),showModal:this.state.showAddGroup,value:a,savecallback:this.saveEditData.bind(this)}),l(U["default"],{hidecallback:this.handleAddModel.bind(this),showModal:this.state.showAddParticipants,groupName:a,participantData:this.props.groupData,gid:this.props.params.gid,responsecallback:this.responsecallback.bind(this)}))}}]),t}(u.Component);ie.contextTypes={router:p["default"].PropTypes.object},t["default"]=(0,f.connect)(s)(ie)},1277:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{intl:e.intl,loggedInData:(0,f.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),d=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),u=a(0),p=(i(u),a(12)),c=a(26),f=a(33),v=(a(35),a(18)),h=(i(v),a(73)),m=a(148),g=i(m),y=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return n(t,e),d(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){this.props.dispatch((0,h.loginLanguage)(this.props.loggedInData.data,this.props.intl.setlocale))}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t=this.getSchema().map(function(t){if(!t.role||t.role&&t.role.length<=0||t.role&&_.indexOf(t.role,e)!=-1)return"URL"==t.actionType?l("li",{},t._id,l(p.Link,{id:t._id,activeClassName:"active"==t.active?g["default"].active:"",to:t.action},void 0,t.text)):"Function"==t.actionType?l("li",{},t._id,l("a",{id:t._id,onClick:t.action,className:"active"==t.active?g["default"].active:""},void 0,l("i",{className:t.icon}),l("span",{},void 0,t.text))):void 0}.bind(this));return t}},{key:"render",value:function(){return l("div",{className:g["default"].iSubMenuContainer},void 0,l("ul",{},void 0,this.renderMenus()))}}]),t}(u.Component);t["default"]=(0,c.connect)(s)(y)},1278:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{loggedInData:(0,f.loggedInData)(e)}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),d=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),u=a(0),p=(i(u),a(12)),c=a(26),f=a(33),v=a(148),h=i(v),m=a(22),g=i(m),y=a(62),b=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this))}return n(t,e),d(t,[{key:"getSchema",value:function(){return this.props.data.menus}},{key:"componentDidMount",value:function(){}},{key:"renderMenus",value:function(){var e=this.props.loggedInData&&this.props.loggedInData.data?this.props.loggedInData.data.role:-1,t={padding:"0 0 8px 0",margin:"0"},a={marginTop:"8px"},i=l(g["default"],{name:"download",style:a}),o=this.getSchema().map(function(a){if(!a.role||a.role&&a.role.length<=0||a.role&&y.indexOf(a.role,e)!=-1){if("Function"==a.actionType){var o=a._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:o},a._id,l("a",{id:a._id,onClick:a.action},void 0,l("i",{className:a.icon}),l("span",{},void 0,a.text)))}if("URL"==a.actionType){var r=a._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:r},a._id,l(p.Link,{to:a.action,id:a._id},void 0,l("i",{className:a.icon}),l("span",{},void 0,a.text)))}if("Upload"==a.actionType){var n=a._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:n,id:a._id},a._id,l("div",{className:h["default"].importBtnBlock},void 0,l("div",{className:h["default"].importBtnInput},void 0,l("span",{className:h["default"].icon},void 0,i),l("input",{className:h["default"].importFileOnclick,id:"fileUploadIcon",type:"file",accept:".xlsx,.xls,.xml,.ods",onChange:a.action,value:""})),l("p",{style:t},void 0,a.text)))}if("Download"==a.actionType){var s=a._id==this.props.activeIcon?{pointerEvents:"none",opacity:"0.6"}:{};return l("li",{style:s},a._id,l("a",{href:a.action,id:a._id,download:!0},void 0,l("i",{className:a.icon}),l("span",{},void 0,a.text)))}}}.bind(this));return o}},{key:"render",value:function(){var e=""+h["default"].iMenuContainer;return l("div",{className:e},void 0,l("ul",{},void 0,this.renderMenus()))}}]),t}(u.Component);t["default"]=(0,c.connect)(s)(b)},1282:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),n=a(0),s=(i(n),a(1283)),l=a(521),d=(i(l),a(20),a(62)),u=function(){function e(){o(this,e)}return r(e,null,[{key:"activeSubMenu",value:function(e,t){return d.forIn(e.menus,function(e,a){e._id==t?e.active="active":e.active=""}),e}},{key:"freeError",value:function(e){return d.forIn(e.schemas,function(e,t){d.forIn(e,function(e,t){d.forIn(e,function(e,t){"hidden"==e.type&&"title"==e.type||(e.error="")})})}),e}},{key:"freeValue",value:function(e){return d.forIn(e.schemas,function(e,t){d.forIn(e,function(e,t){d.forIn(e,function(e,t){if("hidden"==e.type&&"title"==e.type||(e.error=""),"text"==e.type||"textarea"==e.type||"password"==e.type||"search"==e.type||"date"==e.type||"email"==e.type)e.value="";else if("phone"==e.type||"checkbox"==e.type)e.value=[];else if("dropdown"==e.type){var a=e.data[0][0];e.value=a}})})}),e}},{key:"validate",value:function(e,t,a,i){var o=[];return d.forIn(t.schemas,function(t,r){d.forIn(t,function(t,r){d.forIn(t,function(t,r){if((!t.role||t.role&&t.role.length<=0||t.role&&d.indexOf(t.role,a)!=-1)&&("hidden"!=t.type||"title"!=t.type||"view"!=t.type)){var n=d.result(e,t.datafield);if(t.required)if(""==n||void 0==n)if("dropdown"==t.type||"dynamicdropdown"==t.type){var l="";l=i.messages[t.text.props.id].match(/select/i)?i.messages[t.text.props.id]:i.messages.select_dropdown+" "+i.messages[t.text.props.id],t.error=i.messages.requiedField+" "+l,o.push(t.error)}else"date"==t.type?(t.error=i.messages.requiedFieldDate+" "+i.messages[t.text.props.id],o.push(t.error)):(t.error=i.messages.requiedFieldText+" "+i.messages[t.text.props.id],o.push(t.error));else t.error="";if(""==n||void 0==n?"phone"==t.type?t.value=[]:t.value="":t.value=n,void 0!=t.exp&&""!=t.exp){if(n.length>0){var u=RegExp(s.Expressions.get(t.exp));"/(?:)/"!=String(u)&&(u.test(n)?t.error="":t.errormsg?(t.error=t.errormsg,o.push(t.errormsg)):(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],o.push(t.error)))}}else if("phone"==t.type){if(n.length>0){var p=n[1],c=(n[0],n[2]),f=!0;if(p&&c)if(p.length==c.length)for(var v=0;v<c.length-1;v++)c[v]!=p[v]&&"."!=c[v]&&/^[0-9]$/.test(+p[v])&&(f=!1);else f=!1;f||"+91"==p?t.error="":(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],o.push(t.error))}}else"date"==t.type&&"false"==n&&(t.error=i.messages.validInputData+" "+i.messages[t.text.props.id],o.push(t.error))}})})}),{schema:t,error:o}}}]),e}();t["default"]=u},1283:function(e,t){"use strict";var a=new Map;a.set("EMAIL","(^(([a-zA-Z]|[0-9])|([-]|[_]|[.])){2,})+[@](([a-zA-Z0-9])|([-]|([.]))){2,40}[.]((([a-zA-Z0-9]){2,4})|(([a-zA-Z0-9]){2,4}[.]([a-zA-Z0-9]){2,4}) )"),a.set("ALPHA","^[A-Za-z]+$"),a.set("ALPHAwithLIMIT","^[A-Za-z]{1,15}$"),a.set("ALPHAwithSPACE","^[A-Za-z\\s]+$"),a.set("ALPHANUMERICwithSPACE","^[A-Za-z0-9\\s]+$"),a.set("ALPHANUMERIC","^[A-Za-z0-9]+$"),a.set("SPACE","[^\\s+$]"),a.set("URL","^(http|https|ftp)://[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"),a.set("PHONENO","^[0-9]{10}$"),a.set("NUMBER","^[0-9]+$"),a.set("LIMIT","^([0-9])|([-]1)+$"),a.set("DATE","^(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$"),a.set("FULLTIME","^(?:[0,1][0-9]|2[0-3]):(?:[0-5][0-9])$"),a.set("HALFTIME","^(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM))$"),a.set("TIME","^(?:(?:0[1-9]|1[0,1]):(?:[0-5][0-9]))$|^(?:12:00)$|^(?:00:(?:0[1-9]|[1-5][0-9]))$"),a.set("PINCODE","^[0-9]{6}$"),a.set("DATETIME","^(?:(?:(?:(?:31/(?:0?[13578]|1[02]))/|(?:(?:29|30)/(?:0?[1,3-9]|1[0-2])/))(?:(?:1[6-9]|[2-9]\\d)?\\d{2}))|(?:(?:29/0?2/(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))))|(?:(?:0?[1-9]|1\\d|2[0-8])/(?:(?:0?[1-9])|(?:1[0-2]))/(?:(?:1[6-9]|[2-9]\\d)?\\d{2})))(?:\\s(?:(?:(?:0[1-9]|1[0,1,2]):(?:[0-5][0-9]))\\s((AM)|(PM)))|(?:(?:12:00)\\s((AM)|(PM))))$"),a.set("USERNAME","^[A-Za-z]{5,20}$"),a.set("PASSWORD","^[A-Za-z0-9]{6,}$"),t.Expressions=a},1308:function(e,t){e.exports={pagination:"TYVzvPvnVhHwh2cU0hA4A",current:"g_uiyu9x1FtjxSP7SG8ZE",table:"MT1wq7GO1NFQY49F82EQ7",headerRow:"_25DfSs-Nwm51luhPR-2j-T",col:"_2AskW4twyvDT4DurTsqR8L",row:"_2WqrTHsuiMmLB0IEBY1vgS",responsivetable:"_31nKaPaXXLrfOOGeGa9GTs",whiteCard:"ryCbWg89OoNEh8LdzqXon",noDataBox:"XRJX9QsZKouxzWnXKoUUp",infoTxt:"_1NZmMey1sQV0aCxxqVtPDu",mainSpinBlock:"_3BEgVxQ9PDQKlEjIHevKr5",innerSpinBlock:"_2Ot9A0ys89IJntrdA5WyyE"}},1457:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0}),t.viewParticipantsMainMenu=t.participantsMainMenu=t.participantsSubMenu=void 0;var o=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),r=a(0),n=(i(r),a(20)),s=a(94);t.participantsSubMenu={menus:[{_id:"lnkparticipantsResult",text:o(n.FormattedMessage,{id:"all_participants_groups"}),actionType:"Function",action:null}]},t.participantsMainMenu={menus:[{_id:"btnAdd",text:o(n.FormattedMessage,{id:"add"}),actionType:"Function",action:null,icon:"fa fa-plus",role:[s.Roles.Lmsadmin,s.Roles.Instructor,s.Roles.Presenteradmin,s.Roles.Presenter]}]},t.viewParticipantsMainMenu={menus:[{_id:"btnList",text:o(n.FormattedMessage,{id:"list"}),actionType:"URL",action:"/admin/participants-group/list",icon:"fa fa-list"}]}},1539:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){return{loggedInData:(0,_.loggedInData)(e),intl:e.intl}}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),d=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),u=a(0),p=i(u),c=a(20),f=a(26),v=a(12),h=a(22),m=i(h),g=a(17),y=(i(g),a(21)),b=a(95),_=(a(35),a(33)),w=a(18),S=(i(w),a(534)),N=a(56),k=i(N),M=a(148),I=i(M),P=a(93),D=a(62),E=p["default"].createFactory(P.ToastMessage.animation),D=a(62),A={},x=(l(c.FormattedMessage,{id:"no_users_found"}),l(c.FormattedMessage,{id:"add_participants_group"})),O=l("div",{className:"col-md-3"},void 0,l("label",{htmlFor:"inputGroupName",className:"control-label"},void 0,l(c.FormattedMessage,{id:"group_name"}))),C=l(c.FormattedMessage,{id:"please_enter_participant_name"}),L=l(m["default"],{name:"search"}),T=l(m["default"],{name:"times"}),j=l(m["default"],{name:"plus"}),F=l("div",{},void 0,l("div",{},void 0,l("h2",{},void 0,l(m["default"],{name:"frown-o"})),l("p",{},void 0,l(c.FormattedMessage,{id:"no_data_found"})))),U=l(c.FormattedMessage,{id:"cancel"}),R=l(c.FormattedMessage,{id:"save"}),G=function(e){function t(e){o(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={myUsersData:{},addedStudent:[],addedStudentsIds:[],groupName:"",participantsIds:[],groupParticipantError:!1,noDataFound:!1},a}return n(t,e),d(t,[{key:"componentWillReceiveProps",value:function(e){if(e.participantData&&e.participantData.dataList&&e.participantData.dataList.participants)for(var t=[],a=0;a<=e.participantData.dataList.participants.length;a++){this.state.addedStudentsIds;e.participantData.dataList.participants[a]&&e.participantData.dataList.participants[a]._id&&(t.push(e.participantData.dataList.participants[a]._id),this.setState({participantsIds:t}))}}},{key:"componentDidMount",value:function(){this.setuid(this.props.loggedInData)}},{key:"setuid",value:function(e){}},{key:"searchUsers",value:function(e){var t=this;if(e.target.value){this.setState({groupParticipantError:!1,noDataFound:!1,dropDownEnalbled:!0,searchValue:e.target.value});var a={input:e.target.value};this.props.dispatch((0,S.searchStudents)(a)).then(function(e){return t.myUsers(e)})}else this.setState({groupParticipantError:!1,noDataFound:!1,dropDownEnalbled:!1})}},{key:"myUsers",value:function(e){e.data&&0==e.data.length&&this.setState({noDataFound:!0}),this.setState({myUsersData:e})}},{key:"handleGroupName",value:function(e){e.preventDefault(),this.setState({groupName:e.target.value,noDataFound:!1})}},{key:"addedStudent",value:function(e){var t=this.state.addedStudent,a=this.state.addedStudentsIds;a.push(e._id),this.state.participantsIds=D.concat(this.state.participantsIds,a),t.push(e),this.setState({addedStudent:t,addedStudentsIds:a,groupParticipantError:!1})}},{key:"removeStudent",value:function a(e){var t=this.state.addedStudent,a=this.state.addedStudentsIds,i=D.uniq(this.state.participantsIds),o=D.findIndex(t,e);t.splice(o,1);var r=a.indexOf(e._id);a.splice(r,1);var n=i.indexOf(e._id);i.splice(n,1),this.setState({addedStudent:t,addedStudentsIds:a,participantsIds:i})}},{key:"saveGroup",value:function(e){var t=this;e.preventDefault();var a=(this.state.groupName,D.uniq(this.state.addedStudentsIds)),i=this.props.loggedInData.data._id,o=this.props.gid;a&&0!=a.length?this.props.dispatch((0,S.SaveGroupRequest)({uid:i,_id:o,studentIdArray:a})).then(function(e){return t.savedData(e)}):this.setState({groupParticipantError:!0})}},{key:"savedData",value:function(e){e.status&&(this.setState({myUsersData:{},studentIds:[],studentsArray:[],addedStudent:[],addedStudentsIds:[],noDataFound:!1}),this.props.responsecallback(e))}},{key:"closeModel",value:function(){this.setState({myUsersData:{},addedStudent:[],addedStudentsIds:[],groupName:"",participantsIds:[],groupParticipantError:!1,noDataFound:!1}),this.props.hidecallback()}},{key:"viewUser",value:function(e){v.browserHistory.push("/profile/"+e)}},{key:"render",value:function(){var e=this,t=" "+k["default"].btnSaveAssign+" ";k["default"].userAction+" "+k["default"].userChecked;return this.props&&(A=this.props),l("div",{},void 0,p["default"].createElement(P.ToastContainer,{toastMessageFactory:E,ref:"room_container",className:"toast-top-right"}),l(y.Modal,{show:A.showModal,onHide:this.closeModel.bind(this)},void 0,l(b.Header,{closeButton:!0},void 0,l(b.Title,{className:k["default"].popHeadingAll},void 0,x)),l(b.Body,{},void 0,l("form",{className:"form-horizontal"},void 0,l("div",{className:"form-group"},void 0,O,l("div",{className:"col-md-6"},void 0,l("p",{},void 0,A.groupName))),l("div",{className:"form-group"},void 0,l("div",{className:"col-md-12"},void 0,l("input",{id:"searchParticipants",type:"text",name:"search",placeholder:this.context.intl.messages.search_participants,onChange:this.searchUsers.bind(this),className:k["default"].whiteSearch,maxLength:50,autoFocus:"true"}),l("input",{id:"searchUserBtn",type:"",onClick:this.searchUsers.bind(this),className:k["default"].whiteSearchSubmit}),l("label",{id:"groupParticipantError",className:I["default"].errorPre},void 0,this.state.groupParticipantError?C:""),l("span",{className:k["default"].whiteSearchIcon},void 0,L)))),l("div",{className:k["default"].searchUsersListBlock},void 0,l("div",{className:k["default"].searchUsersListGroup},void 0,l(y.Row,{},void 0,l(y.Col,{md:12},void 0,l("div",{className:k["default"].studentListGroup},void 0,l("div",{className:k["default"].studentListBlock},void 0,this.state.addedStudent&&this.state.addedStudent.length>0?this.state.addedStudent.map(function(t){var a=Math.floor(1e4*Math.random(t._id)),i="/images/profile-pics/defaultStudent.jpg";return t&&t.profile&&void 0!=t.profile.profileImage&&""!=t.profile.profileImage&&null!=t.profile.profileImage&&(i="/uploads/"+t.profile.profileImage),l("div",{className:k["default"].addStudentsBlock},a,l("img",{id:"viewUser",src:i,className:"pull-left",onClick:e.viewUser.bind(e,t._id),title:e.props.intl.messages.viewprofile}),l("span",{id:"removeUser",className:k["default"].removeIcon,onClick:e.removeStudent.bind(e,t)},void 0,T),l("p",{},void 0,t.firstname))}):null),l("ul",{},void 0,this.state.myUsersData&&this.state.myUsersData.data&&this.state.myUsersData.data.length>0?this.state.myUsersData.data.map(function(t){var a="/images/profile-pics/defaultStudent.jpg";return t&&t.profile&&void 0!=t.profile.profileImage&&""!=t.profile.profileImage&&null!=t.profile.profileImage&&(a="/uploads/"+t.profile.profileImage),l("li",{},t._id,l("a",{className:"clearfix"},void 0,l("img",{id:"viewUser",src:a,className:"pull-left",onClick:e.viewUser.bind(e,t._id),title:e.props.intl.messages.viewprofile}),l("h4",{className:"pull-left"},void 0,t.firstname," ",t.lastname,l("p",{},void 0,t.email)),l("div",{className:k["default"].userAction},void 0,0==e.state.participantsIds.includes(t._id)?l("span",{id:"addedStudent",onClick:e.addedStudent.bind(e,t)},void 0,j):null)))}):null)),this.state.noDataFound?F:null))))),l(b.Footer,{className:k["default"].mainSaveAssign},void 0,l("div",{className:k["default"].blockSaveAssign},void 0,l("button",{id:"closeModel",onClick:this.closeModel.bind(this)},void 0,U),l("button",{id:"saveGroup",className:t,onClick:this.saveGroup.bind(this)},void 0,R)))))}}]),t}(u.Component);G.contextTypes={intl:p["default"].PropTypes.object.isRequired},G.defaultProps={showModal:!1},t["default"]=(0,f.connect)(s)(G)},1541:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;
return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),l=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),d=a(0),u=i(d),p=a(20),c=(a(35),a(33),a(534),a(545),a(21)),f=a(56),v=i(f),h=a(95),m=a(148),g=i(m),y=a(93),b=u["default"].createFactory(y.ToastMessage.animation),_=s(p.FormattedMessage,{id:"edit_group_name"}),w=s(p.FormattedMessage,{id:"group_name"}),S=s(p.FormattedMessage,{id:"please_enter_group_name"}),N=s(p.FormattedMessage,{id:"invalid_group_name"}),k=s(p.FormattedMessage,{id:"cancel"}),M=s(p.FormattedMessage,{id:"save"}),I=function(e){function t(e){o(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={editValue:"",groupNameError:!1,keyCodeValue:"",groupNotAlphaError:!1},a}return n(t,e),l(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({editValue:this.props.value})}},{key:"handleEditValue",value:function(e){this.setState({editValue:e.target.value,groupNameError:!1,groupNotAlphaError:!1})}},{key:"saveGroupName",value:function(e){e.preventDefault();var t=(this.state.editValue,this.state.editValue.trim()),a=new RegExp(/[^A-Za-z0-9\\s]+$/g),i=a.test(t);if(""==t||void 0==t||null==t)this.setState({groupNameError:!0});else if(i)this.setState({groupNotAlphaError:!0});else{var o={groupName:t};this.props.savecallback(o)}}},{key:"closeModel",value:function(e){e.preventDefault(),this.setState({groupNameError:!1,groupNotAlphaError:!1}),this.props.hidecallback()}},{key:"render",value:function(){var e=" "+v["default"].btnSaveAssign+" ",t=this.props;return s("div",{},void 0,u["default"].createElement(y.ToastContainer,{toastMessageFactory:b,ref:"room_container",className:"toast-top-right"}),s(c.Modal,{show:t.showModal,onHide:this.closeModel.bind(this)},void 0,s(h.Header,{closeButton:!0},void 0,s(h.Title,{className:v["default"].popHeadingAll},void 0,_)),s(h.Body,{},void 0,s("form",{className:"form-horizontal"},void 0,s("div",{className:"form-group"},void 0,s("label",{htmlFor:"inputGroupName",className:"control-label col-md-3"},void 0,w,s("span",{className:g["default"].mandatory},void 0,"*")),s("div",{className:"col-md-9"},void 0,s("input",{id:"groupName",type:"text",className:"form-control",name:"groupName",value:this.state.editValue,onChange:this.handleEditValue.bind(this),maxLength:50,autoFocus:"true"}),s("label",{id:"emptyGroupNameError",className:g["default"].errorPre},void 0,this.state.groupNameError?S:""),s("label",{id:"invalidGroupNameError",className:g["default"].errorPre},void 0,this.state.groupNotAlphaError?N:""))),s("div",{className:v["default"].blockSaveAssign},void 0,s("button",{id:"closeModelBtn",onClick:this.closeModel.bind(this)},void 0,k),s("button",{id:"saveGroupNameBtn",className:e,onClick:this.saveGroupName.bind(this)},void 0,M))))))}}]),t}(d.Component);I.contextTypes={intl:u["default"].PropTypes.object.isRequired},t["default"]=I},9:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e="function"==typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;return function(t,a,i,o){var r=t&&t.defaultProps,n=arguments.length-3;if(a||0===n||(a={}),a&&r)for(var s in r)void 0===a[s]&&(a[s]=r[s]);else a||(a=r||{});if(1===n)a.children=o;else if(n>1){for(var l=Array(n),d=0;d<n;d++)l[d]=arguments[d+3];a.children=l}return{$$typeof:e,type:t,key:void 0===i?null:""+i,ref:null,props:a,_owner:null}}}(),l=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),d=a(0),u=(i(d),a(12)),p=s("div",{}),c=function(e){function t(){return o(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return n(t,e),l(t,[{key:"componentWillMount",value:function(){u.browserHistory.push("/access-denied")}},{key:"render",value:function(){return p}}]),t}(d.Component);t["default"]=c}});