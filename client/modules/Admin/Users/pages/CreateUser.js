import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';
import { SaveUser, UserStore, UpdateUserSchema, ClearUser, getRoles, GetCompanyData, getRooms } from '../UsersActions';
import { userData } from '../UsersReducer';
import ContainerComponent from '../../../../components/ContainerComponent';
import {userSchema} from '../schema/UserSchema';
import {userEditSubMenu, userEditMainMenu} from '../schema/UserMenu';

// Import Style
import compstyles from '../../../../components/component.css';
import styles from '../../Admin.css';
import { Roles } from '../../../../roles';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loginLanguage } from '../../../Intl/IntlActions';
var _ = require('lodash');
var dataObject ={};
import { intlData } from '../../../Intl/IntlReducer';

class CreateUser extends Component {
  constructor(props){
    super(props);
    this.companyid = null;
    this.form = null;
    this.schema = userSchema;
    this.companydata = null;
    this.submenu = Validator.activeSubMenu(userEditSubMenu, "lnkNewUsers");    
    this.mainmenu = userEditMainMenu;

    this.mainmenu.menus[1].action = this.save.bind(this);//this.save.bind(this);
    /*this.state = {
      showModal : false      
    }
    this.roomUsers = null;*/
    this.state = {
      activeIcon : null
    }
  }

  // componentWillMount() {
  //   this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/users/new')).then(res => this.setdata(res));
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
    this.props.dispatch(GetCompanyData()).then(res => this.setrespdata(res));
  }

  componentWillUnmount() {
    this.props.dispatch(UpdateUserSchema(null));
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(UserStore({uid: result.data._id }));
    }
  }

  setrespdata(result){
    // this.companydata = result.data;
    /*let options = [['', 'Select Company']];
    _.forIn(result.data, function(value, key) {
      let name = value.businessId+"("+value.businessName+")";
      options.push([value._id, name]);
    });*/
    let newschema = this.updateschema(this.form, this.schema, result.data, 'companyid');
    this.props.dispatch(UpdateUserSchema(newschema));
  }

  updateschema(dataObj, schema, options, id){
    _.forIn(schema.schemas, function(schemaObj, schemakey){
      _.forIn(schemaObj, function(colObj, colVal){
        _.forIn(colObj, function(fieldObj, fieldVal){
          var val = _.result(dataObj, fieldObj.datafield);
          if(val == "" || val == undefined){
            if(fieldObj.type == "phone")
              fieldObj.value = [];
            else
              fieldObj.value = "";
          }else{
            fieldObj.value = val;
          }
          if(id != null && fieldObj._id == id){
            fieldObj['data'] = options;
            fieldObj['value'] = options[0][0];
          }
        });
      });
    });
    return schema;
  }

  save = (event) => {
    var response = Validator.validate(this.form, this.schema,null,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch(UpdateUserSchema(this.schema));
    }else{
      this.setState({ activeIcon : event.currentTarget.id});
      let phno = this.form['profile.phone'];
      phno.splice(2, 1);
      this.form['profile.phone'] = phno;
      this.props.dispatch(SaveUser(this.form)).then(res => this.setresponse(res));
    }
  }

  setresponse = (response) => {
    if(response.status){
       browserHistory.push('/admin/users/view/'+response.data._id);
    }else{
      this.setState({ activeIcon : null});
      this.refs.user_container.error(`${response.error} `, ``);
    }
  }

  datareceive = (data) => {
    if(data.role == Roles.Student && this.schema.schemas.other_details.company_info[3]._id !== "studentId" && this.companyid != '' && this.companyid != null && this.companyid == data['profile.companyid']) {
      let newschema = this.updateschema(data, this.schema, null, null);
      newschema.schemas.other_details.company_info.splice(3,0,
      { type : "text", _id : "studentId", text : <FormattedMessage id='studentId' />, datafield : "studentId", exp : "ALPHANUMERIC", error : "" });
      this.props.dispatch(UpdateUserSchema(newschema));
    } else if((data.role != '' && data.role != Roles.Student && this.schema.schemas.other_details.company_info[3]._id == "studentId" && this.companyid != '' && this.companyid != null && this.companyid == data['profile.companyid']) || (data.role == "" && this.schema.schemas.other_details.company_info[3]._id == "studentId" && this.companyid != '' && this.companyid != null && this.companyid == data['profile.companyid'])) {
      let newschema = this.updateschema(data, this.schema, null, null);
      newschema.schemas.other_details.company_info.splice(3,1);
      delete data["studentId"];
      this.props.dispatch(UpdateUserSchema(newschema));
    } else if(this.companyid != '' && this.companyid != null && this.companyid != data['profile.companyid']) {
      this.form['roomid'] = '';
      this.form['role'] = '';
      //wrote for cant set state error 
      let newschema = this.updateschema(this.form, this.schema, null, null);
      if(this.schema.schemas.other_details.company_info[3]._id == "studentId"){
        newschema.schemas.other_details.company_info.splice(3,1);
      }
      this.props.dispatch(UpdateUserSchema(newschema));      
    }

    if(this.companyid == null)
      this.companyid = data['profile.companyid'];
    if(this.companyid != null && (this.companyid != data['profile.companyid'])){ 
      this.changeRole(data['profile.companyid']);
      this.companyid = data['profile.companyid'];
    }

    /*if(data.roomid && data.roomid != '' && this.companyid != null && this.companyid == data['profile.companyid']) {
      if(data.role && data.role != '') {
        if(data.role == Roles.Student) {
          let roomUsersData = this.roomUsers['usersData'];
          let users = roomUsersData[data.roomid];
          let userCount = _.countBy(users, function(data) {
            return data.role
          });
          if(userCount[Roles.Instructor] == undefined && data.role == Roles.Student){
            this.refs.user_container.error('Please add instructor first')
          } else if(userCount[Roles.Instructor] == 1) {
            var instructorObj = _.find(users, {role : Roles.Instructor})
            data['instructorId'] = instructorObj._id;
          } else {
            this.setState({
              showModal : true
            })
          }          
        }
      } else {
        this.form['roomid'] = '';
        this.refs.user_container.error("Please select the role first");         
      }
    }*/
    this.form = data;
    
  }

  changeRole = (companyid) => {
    if(companyid != ''){  
      this.props.dispatch(getRoles(companyid)).then(res => this.setroleres(res));
      // this.props.dispatch(getRooms(companyid)).then(res => this.setRooms(res));
    }else{
      let options = [['', 'Select Role']];
      // let roomOptions = [['', 'select_room']];
      let newschema = this.updateschema(this.form, this.schema, options, 'role');
      // let schema = this.updateschema(this.form, newschema, roomOptions, 'room');
      this.props.dispatch(UpdateUserSchema(newschema));
    }
  }

  setroleres = (response) => {
    let newschema = this.updateschema(this.form, this.schema, response.data, 'role');
    this.props.dispatch(UpdateUserSchema(newschema));
  }

  /*setRooms = (response) => {
    this.roomUsers = response;
    let newschema = this.updateschema(this.form, this.schema, response.data, 'room');
    this.props.dispatch(UpdateUserSchema(newschema));
  }

  hideModal() {
    this.setState({
      showModal : false
    })
  }*/

  render() {
    var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="admin/users/list"><FormattedMessage id = 'all_users'/></Link>
          </li>
          <li>/</li>
          <li>Create User</li>
        </ul>
      </div>)

    if(this.props.userData && this.props.userData.data){
      dataObject = this.props.userData.data;
    }
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="user_container"
          className="toast-top-right"
        />
        <ContainerComponent data={ this.props.userData.schema }
          submenu={ this.submenu }
          topmenu={ this.mainmenu }
          bredCrumb={bredcrumb}
          dataFun = { this.datareceive }
          dataobject = { dataObject }
          activeIcon = {this.state.activeIcon}
       />
       {/*<Modal show={this.state.showModal} onHide={this.hideModal.bind(this)}>
          <Header closeButton>
            <Title><FormattedMessage id='add_member'/></Title>
          </Header>
          <Body>
            <div>Instructor</div>
          </Body>
        </Modal>*/}
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    userData: userData(state),
    intlData: intlData(state)
  };
}

CreateUser.propTypes = {
  loggedInData: PropTypes.object,
  userData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

CreateUser.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CreateUser);
