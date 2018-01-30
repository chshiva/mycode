import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import moment from 'moment';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { UserList, UserStore, UpdateUserSchema, ClearUser, exportUsersRequest, importUsersRequest } from '../UsersActions';
import { userData } from '../UsersReducer';
import DataTable from '../../../../components/DataTable/DataTable';
import {userSchema} from '../schema/UserSchema';
import {userListSubMenu, userListMainMenu} from '../schema/UserMenu';

// Import Style
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles.js';
import { loginLanguage } from '../../../Intl/IntlActions';
var _ = require('lodash');
import { intlData } from '../../../Intl/IntlReducer';
import serverConfig from '../../../../../server/config';

{/*Changes made by prateek for bug#2732(chnaged this.userstatus and took it in state so as to get reactivity
Date : 15/09/2017)*/}

class ListUser extends Component {
  constructor(props){
    super(props);
    this.state  = {
      searchValue : '',
      fileName : '',
      download : false,
      loading : true,
      userStatus : 'Active'    
    }
    
    // this.userStatus = '';
    this.delStatus = '';
    this.form = null;

    this.schema = userSchema;
    this.imageData = {};
    this.res = {};

    this.submenu = Validator.activeSubMenu(userListSubMenu, "lnkUsers");    
    this.mainmenu = userListMainMenu;
    this.getData = this.getData.bind(this);

    this.currentPage= 1;
    this.itemsPerPage= 5;
  
    this.userView = this.userView.bind(this);
    this.mainmenu.menus[0].action = this.clearError.bind(this);
    this.mainmenu.menus[1].action = this.exportUsers.bind(this);
    this.mainmenu.menus[2].action = this.importUsers.bind(this);
    this.searchFilter = this.searchFilter.bind(this);
  }

  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/users/list')).then(res => this.setdata(res));
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
  }

  /*componentWillReceiveProps(nextProps) {
    console.log("enter will receive");
    let msg = nextProps.success;
    let err = nextProps.error;
    console.log("this---");
    console.log(this);
    console.log(this.refs);
    console.log(msg, err);
    if(msg && msg != "") {
      this.refs.container.success({msg}, '');
    }
    if(err && err.length > 0) {
      this.refs.container.error({err}, '');
    }
  }*/

  componentWillReceiveProps(nextProps) {
    if(nextProps.userData.deleteSuccess != ''){
      this.refs.user_container.success(`${nextProps.userData.deleteSuccess} `, ``);
      this.props.dispatch(ClearUser());
    }
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      //this.props.dispatch(UserStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage,
        uid : result.data._id,
      });
    }
  }

  getData(pageParam, sort = null){
    //pageParam["uid"] = this.props.loggedInData.data._id;
    
    pageParam['userStatus'] = this.state.userStatus;
    // this.state.userStatus?this.state.userStatus:'Active'
    if (sort != null)
    pageParam['sortObj'] = sort;
    pageParam["searchKeyword"] = this.state.searchValue;
    
    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.userData.dataList)) {
      this.setState({loading : true}); 
    } else {      
      this.setState({loading : false});
    }
    this.props.dispatch(UserList(pageParam, pageParam.currentPage)).then(res => this.pageData(res));
  }

  fileFilter = (e) => {
    e.preventDefault();
    this.setState({userStatus : e.target.value}, function(){
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      })
    }.bind(this))    
  }

  pageData(response){
    if(response.status == false){
      this.refs.user_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }
  

  userView(row){
    let rowId = row._id;
    let viewlink = "/admin/users/view/"+rowId;
    return (
      <Link id="viewUser" to={viewlink}><i className="fa fa-eye"></i></Link>
    );
  }
  
  combineName(row){
    let rowId = row._id;
    let viewlink = "/admin/users/view/"+rowId;
    return(
        <Link className = {styles.removeStyle} to={viewlink}><div>{row.firstname} {row.lastname}</div></Link>
      );
  }

  showRole(row){    
    let roleObj = _.invert(Roles);
    let role = row.role;
    this.role = roleObj[role];
    if(role == Roles.Lmsadmin || role == Roles.CRMadmin || role == Roles.Presenteradmin) {
      this.role = roleObj[Roles.Admin];
    } else if (role == Roles.CRMuser) {
      this.role = roleObj[Roles.User];
    }
    return(
        <div >{this.role}</div>
      );
  }

  showCompanyId =(row) => {
    //let roles = _.invert(Roles);
    if(row.profile.companyid == null) {
      return (
        <div>-</div>
        )
    } else {
      if(Roles.Superadmin == this.props.loggedInData.data.role) {
      let rowId = row.profile.companyid._id;
      let viewlink = "/admin/corporate/view/"+rowId;
        return (
          <Link className = {styles.removeStyle} to={viewlink}><div>{row.profile.companyid.businessId}</div></Link>
        );
      } else {
        return (
        <div>{row.profile.companyid.businessId}</div>
        );
      }
    }
  }

  showFormattedDate(row){
    return(
      <div>{moment(row.dateAdded).format('DD-MM-YYYY')}</div>
    );
  }

  showEmail(row) {
    if (row.guest && row.email.split("guest_")[1]) {
      return row.email.split("guest_")[1];
    } else {
      return row.email;
    }
  }
  clearError(){
    var response = Validator.freeValue(this.schema);
    if(response){
      this.props.dispatch(UpdateUserSchema(response));
      browserHistory.push('/admin/users/new');
    }
  }

  searchFilter(e){
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    //this.setState({ userStatus : 'registered'});
    if(!pattern.test(expVal) ){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage,
        userStatus : this.state.userStatus
      });
    }    
  }

  exportUsers() {
    //changeBy : pranathi, disc: exporting users based on userStatus
    if(this.state.searchValue != undefined && this.state.searchKeyword != '') {
      let obj = {
          searchKeyword : this.state.searchValue,
          userStatus : this.state.userStatus?this.state.userStatus:'Active',
      }

      this.props.dispatch(exportUsersRequest(obj)).then(res => this.exportData(res));
    } else {
      let obj = {
          userStatus : this.state.userStatus?this.state.userStatus:'Active',
      }
      this.props.dispatch(exportUsersRequest(obj)).then(res => this.exportData(res));
    }
  }

  exportData(response){
    if(response.status == true){
      this.setState({
        download: true,
        fileName: "/"+response.fileName
      })
      document.getElementById("export").click();
      this.refs.user_container.success('Exported Successfully');
    } else {
      this.refs.user_container.error(`${response.error} `, ``);
    }
  }

  //Async flow issue need to be resolved in import users
  importUsers = (e) => {
    //console.log(e.target)
    var reader = new FileReader();
    var file = e.target.files[0];
    if (!file){
      return;
    //change file size limit
    } else if (file.size > 20971520) {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.topic_file_alert,
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
      return;
    } 
    //console.log(file)
    reader.onload = function(img) {
      //console.log(img)
      let dataURI = img.target.result;
      //console.log('dataURI')
      this.imageData["file"] = dataURI.split(',')[1];
      this.imageData["fileName"] = file.name;
      // console.log(file.type)
      if(file.type == 'application/zip'){
        this.imageData["fileType"] = 'zip'
      }else{
        this.imageData["fileType"] = file.type.substring(0, file.type.indexOf("/"))
      }
      let data = this.imageData;
      this.saveFile(data);
    }.bind(this);
    reader.readAsDataURL(file);
  }

  saveFile(obj){
    //console.log(obj)
    obj['uid'] = this.props.loggedInData.data._id;
    obj['role'] = this.props.loggedInData.data.role;
    obj['companyId'] = this.props.loggedInData.data.profile.companyid._id
    let data = obj;
    let url = "/api/import-users-file";
    let self =  this;
    FileAPI.upload({
      data,
      url,
      complete:function(err,res) {
        //console.log(err)
        if(err) {
          console.log("err---",err);
          self.refs.user_container.error(err);
        } else {
          let data = JSON.parse(res.response);
          //Added a condition for if data is there or not 
          if(data.status == false) {
            self.refs.user_container.error(data.error);
          } else if (data.data.length <=0){
            self.refs.user_container.error("Please import valid data");            
          } else {
            let importData = data.data
            let userData = {}
            userData['uid'] = self.props.loggedInData.data._id
            userData['currentPage'] = self.currentPage,
            userData['totalItems'] = 0,
            userData['itemsPerPage'] = self.itemsPerPage,
            userData['searchKeyword'] = self.state.searchValue
            self.props.dispatch(importUsersRequest({importData, userData}, self.currentPage)).then(res => self.importData(res));
              
            // importData.map((doc) => {
            //   if(doc == null) {
            //     self.refs.user_container.error("Row shouldn't be empty");
            //   } else {
            //     doc['uid'] = self.props.loggedInData.data._id
            //     doc['currentPage'] = self.currentPage,
            //     doc['totalItems'] = 0,
            //     doc['itemsPerPage'] = self.itemsPerPage,
            //     doc['filterType'] = self.state.searchValue
            //     self.props.dispatch(importUsersRequest(doc, self.currentPage)).then(res => self.importData(res));
            //   }
            // })
          }
        }
      }
    });
  }

  importData(response){
    if (response.status == false || (response.status == true && response.error.length > 0)) {
      this.setState({userStatus : 'Active'});
      this.refs.user_container.error(`${response.error} `, ``)            
    } else {
      this.setState({userStatus : 'Active'})
      this.refs.user_container.success(response.message)          
    } 
    this.setdata(this.props.loggedInData);
  }  

  render() {
    var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li> 
           <FormattedMessage id = 'you_are_in_mange_users_panel'/>
          </li>
        </ul>
      </div>)
    // console.log("this.state.userStatus", this.state.userStatus);
    // console.log("this.state.userData", this.state.userData);
        var objDisp = [
          {title: <FormattedMessage id='name' />, type: "function", callback: this.combineName, sort : true, dbName : "firstname"}, 
          {fieldName: "email", title: <FormattedMessage id='email' />, type: "function", sort : true, callback: this.showEmail, dbName : "email"},
          {title: <FormattedMessage id='role' />, type: "function", callback: this.showRole, sort : true, dbName : "role"},
          {title: <FormattedMessage id='company_code' />, type: "function", callback: this.showCompanyId},
          {title: <FormattedMessage id='date' />, type: "function", callback: this.showFormattedDate, sort : true, dbName : "modifiedAt"},
          {title: <FormattedMessage id='view' />,type: "function", callback: this.userView},
        ];

        var filter = [
          {type : 'search', id:"userSearch", selectedfilter : this.searchFilter },
          {type : 'dropdown',id:"userType", data:[['Active','active'], ['Registered','registered'], ['Deleted','deleted'], ['Blocked', 'blocked'], ['Guest', 'guest']], selectedfilter : this.fileFilter, value:this.state.userStatus}
        ] 

        // if(this.props.loggedInData.data && this.props.loggedInData.data.profile && this.props.loggedInData.data.profile.companyid && this.props.loggedInData.data.profile.companyid.businessType == "Conference") {

        //Changes made by prateek as per discussion with pradeep on bug#2732 date:41/09/2017
        if(!serverConfig.isSignUp) {
          filter[1] = {type : 'dropdown',id:"userType", data:[['Active','active'], ['Deleted','deleted'], ['Blocked', 'blocked'], ['Guest', 'guest']], selectedfilter : this.fileFilter, value:this.state.userStatus}
        }


        //console.log(objDisp)

          /*[
            ["email", "Email"],
            ["firstname", "First Name"], 
            ["lastname", "Last Name"],
            ["dateAdded", "Date of Join"],
            ["view", "View"]
          ];*/
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="user_container"
          className="toast-top-right"
         />
        <DataTable data={this.props.userData.dataList}
            count={this.props.userData.count}
            currentPage = {this.props.userData.currentPage}
            submenu={this.submenu}
            bredCrumb={bredcrumb}
            topmenu={this.mainmenu}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
           /* pageTitle={this.state.userStatus=='Deleted'?this.props.intlData.messages.deleted_list:this.state.userStatus=='Registered'?this.props.intlData.messages.registered_user_list:this.props.intlData.messages.active_user_list} */
            pageTitle={this.props.intlData.messages.manage_user}
            listDescreption={this.props.intlData.messages.users}
            filter={filter}
            loading={this.state.loading}
        />
        {
          this.state.download
          ?
          <a href={this.state.fileName} id="export" download > </a>
          : null
        }
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,
    loggedInData: loggedInData(state),
    userData: userData(state),
    intlData: intlData(state)
  };
}

ListUser.propTypes = {
  loggedInData: PropTypes.object,
  userData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ListUser.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ListUser);
