import React ,{PropTypes,Component} from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController';
import DataObject from '../../../../components/DataObject';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Validator from '../../../../components/Validator';

import { userData } from '../UsersReducer';
import ContainerComponent from '../../../../components/ContainerComponent';
import { SaveUser, editUser, UserStore, getUserData, UpdateUserSchema, ClearUser, GetUpdateRoles } from '../UsersActions';
import {userViewToEditSubMenu, userViewToEditMainMenu} from '../schema/UserMenu';
import styles from '../../Admin.css';
import compstyles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { viewUserSchema } from '../schema/UserSchema';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { loginLanguage } from '../../../Intl/IntlActions';
import { intlData } from '../../../Intl/IntlReducer';
import { Roles } from '../../../../roles';

class EditUser extends Component {
	constructor(props) {
		super(props);
		this.form = null;
		this.datareceive = this.datareceive.bind(this);
		this.schema = viewUserSchema;
		this.res = {};
    this.submenu = Validator.activeSubMenu(userViewToEditSubMenu, "editNewUser"); 
		this.mainmenu = userViewToEditMainMenu;

		this.mainmenu.menus[1].action = this.save.bind(this);
		this.mainmenu.menus[0].action = this.view.bind(this);
    this.studentId = '';
    this.state = {
      headerData : '',
      activeIcon : null
    }
	}
	// componentWillMount() {
 //    var editUserId = this.props.params.viewUserId;
 //    this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
 //                        '/admin/users/edit/'+editUserId)).then(res => {
 //                    this.setuserdata(res);
 //                //this.props.dispatch(editUser(editUserId,'/admin/users/edit/'+editUserId))                                 
 //              });

 //  }

  componentDidMount() {
    this.setuserdata(this.props.loggedInData);        
  }

  setuserdata(result) {
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      var editUserId = this.props.params.viewUserId;
      this.props.dispatch(UserStore({ uid: result.data._id }));
      let id = editUserId;
      let uid = result.data._id;
      this.props.dispatch( getUserData(id, '/admin/users/edit/'+editUserId) ).then(res => this.setdata(res, uid));
    }
  }

  setdata(result, uid){
    /*console.log("result");
    console.log(result);*/
    let newData = new DataObject(result.data);
    this.studentId = newData.studentId ? newData.studentId : "";
    let msg = this.props.intlData.messages.company_code+":"+newData["profile.companyid.businessId"];
    this.setState({headerData : msg});
    this.form["profile.companyid"] = newData["profile.companyid._id"];
    this.props.dispatch(UserStore(newData));
    this.props.dispatch(GetUpdateRoles(newData._id )).then(res => this.setupdateroles(res));
    
  }

  setupdateroles(response){ 
    let newschema = this.updateschema(response.data, 'role');
    // console.log("newschema", newschema);
    // this.schema = newschema;
    this.props.dispatch(UpdateUserSchema(newschema));   
  }

  updateschema = (options, id) => {
    let dataObj = this.form;
    let schema = this.schema;
    let data = this.props.userData.data;
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
            fieldObj['value'] = data[id];
          }
        });
      });
    });
    return schema;
  }

  clear() {
    this.props.dispatch( ClearUser());
  }

  
  save = (event) => {
    var response = Validator.validate(this.form, this.schema,null,this.context.intl);
    if(response.error.length > 0){
      this.schema = response.schema;
      this.props.dispatch( UpdateUserSchema(this.schema) );
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

  view = () => {
    browserHistory.push('/admin/users/view/'+this.props.params.viewUserId);
  }

  datareceive(data) {
    this.form = data;
    if(data.role == Roles.Student && this.schema.schemas.other_details.company_info[1]._id !== "studentId") {
      this.form["studentId"] = this.studentId;
      this.schema.schemas.other_details.company_info.splice(1,0,
      { type : "text", _id : "studentId", text : <FormattedMessage id='studentId' />, datafield : "studentId", exp : "ALPHANUMERIC", error : ""});
      let newschema = this.updateschema(null, null);
      // if( data.studentId != undefined) {
        this.props.dispatch(UpdateUserSchema(this.schema));    
      // } 
      
    } else if((data.role != '' && data.role != Roles.Student && this.schema.schemas.other_details.company_info[1]._id == "studentId") || (data.role
      == "" && this.schema.schemas.other_details.company_info[1]._id == "studentId")) {
      this.schema.schemas.other_details.company_info.splice(1,1);
      delete this.form["studentId"];

      let newschema = this.updateschema(null, null);
      this.props.dispatch(UpdateUserSchema(newschema));
    }
  }
  render() {
    
    let clsContainerRight = `${styles.containerRight} pull-right`;

    if(this.props.userData.data){
      var bredcrumb = (
      <div className={compstyles.dynamicBreadCrumb}>
        <ul>
          <li> 
            <Link to="admin/users/list"><FormattedMessage id = 'all_users'/></Link>
          </li>
          <li>/</li>
           <li><FormattedMessage id = 'edit_user'/></li>
        </ul>
      </div>)
      //console.log("this.props.corporateData.data === ",this.props.corporateData.data);
        return (
          <div>
            <ToastContainer
              toastMessageFactory={ToastMessageFactory}
              ref="user_container"
              className="toast-top-right"
            />
            <ContainerComponent data={this.schema}
              submenu={this.submenu}
              topmenu={this.mainmenu}
              bredCrumb={bredcrumb}
              dataFun = {this.datareceive}
              dataobject = {this.props.userData.data}
              header = {this.state.headerData}
              activeIcon = {this.state.activeIcon}
           />
          </div>
        );
    }else{
      return (
        <div>Loading...</div>
      );
    }

  }
}
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    userData: userData(state),
    intlData: intlData(state)
  };
}
EditUser.propTypes = {
  loggedInData: PropTypes.object,
  userData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};
EditUser.contextTypes = {
  intl: React.PropTypes.object.isRequired
};
export default connect(mapStateToProps)(EditUser);
