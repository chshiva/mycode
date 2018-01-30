import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';

import componentStyles from '../../../components/component.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import adminStyles from '../../Admin/Admin.css';
import { getMachedUsers } from '../UserDashboard/UserDashboardActions';
import { ShowUser } from './ShowUser';
var validator = require('validator');

export class AddContacts extends Component {
  constructor(props) {
    super(props);

    this.cls_block50_l     = `${styles.block50} pull-left`;
    this.cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
    this.cls_formControlOverwrite = `${styles.formControlOverwrite} form-control `;
    this.cls_calendarInlineBlock = `${styles.calendarInlineBlock} clearfix`;
    this.cls_inputGroupAddonOverwrite = `${styles.inputGroupAddonOverwrite} input-group-addon`;
    this.cls_confDatePicker = `${styles.setDueDateOverwrite} set-due-date form-control confDatepicker`;
    this.cls_confTimePicker = `${styles.setDueDateOverwrite} set-due-date form-control confTimeTpicker`;    
    this.cls_errcls = `${componentStyles.error}`;
    this.state = {
      value : '',
      error : '',
      users : []
    }
  }

  handleKeyPress = (event) => {
    if (event.which == 13 || event.keyCode == 13) {
       // this.setState({ value : event.target.value });
       this.findUser();
    } 
  }

  handleChange = (e) => {
    //console.log("value == ",e.target.value);
    if(e.target.value.trim() != '')
      this.setState({ value : e.target.value });
    else
      this.setState({ value : e.target.value, users : [] });
  }

  findUser = () => {
    var lowerCaseValue = this.state.value.toLowerCase();
    if(this.state.value != '' && validator.isEmail(this.state.value)){
      let obj = {
        uid : this.props.uid,
        input : lowerCaseValue
      }
      getMachedUsers(obj).then(res => {
        // console.log("res === ",res);
        if(res){
          if(res.status){
            this.setState({ users : res.data, error : '' });
          }else{
            this.setState({ users : [], error : res.error });
          }
        }
      });
    }else{
      this.setState({ error : <FormattedMessage id = 'please_enter'/>});
    }
  }

  sendUserId(userId) {
    if (userId && userId != 'undefined'){
      this.props.getUserId(userId);
      this.setState({ value : '', users : [] });
    }
  }

  freeData = () => {
    //Changes made by prateek for bug#2999
    this.setState({ value : '', users : [], error : ''});
    this.props.hidecallback();
  }


//for schedule
render() {
  let listUsers;

  if(this.state.users){
    let docs = this.state.users;
      if(docs.length > 0){
        listUsers = docs.map((userData) =>
                <ShowUser key={userData._id} contactsData={this.props.contactsData} requestResponse={this.props.requestResponse}
                    value={userData} getUserId={this.sendUserId.bind(this)} classTitle={this.props.intl.messages.add_user} />
        );
      }
  }
  return (
      <Modal show={this.props.showModal} onHide={this.freeData}>
        <Header closeButton>
          <Title className={adminStyles.popHeadingAll} ><FormattedMessage id='add_contacts'/></Title>
        </Header>
        <Body>
          <p><FormattedMessage id='search_contacts_add'/></p>
          <div className={adminStyles.searchBox}>
          <input id="search" type="text" name="search" placeholder={this.props.intl.messages.search_contacts} className={adminStyles.whiteSearch} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} value={this.state.value} maxLength={50} autoFocus="true" />
              <span id="searchBtn" className={adminStyles.whiteIconSearch} onClick={this.findUser.bind(this)}>
                <FontAwesome name="search" />
              </span>
            <label id="noUserError" className={this.cls_errcls}>{this.state.error ? <FormattedMessage id='no_users_found'/>:null}</label>
          </div>
          <div className={adminStyles.searchUsersListBlock}>
            <div className={adminStyles.searchUsersListGroup}>
              <Row>
                <Col md={12}>
                  <div className={adminStyles.userListGroup}>
                    <ul>                      
                      {listUsers}
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Body>
      </Modal>
  );
}


}

AddContacts.contextTypes = {
  router: React.PropTypes.object,
};

AddContacts.propTypes = {
  intl: intlShape.isRequired,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
};

AddContacts.defaultProps = { showModal: false };

export default injectIntl(AddContacts);


/*<input type="submit" className={adminStyles.whiteSearchSubmit}/>*/

/*<li>
                        <Link to="" className="clearfix">
                          <img src="/images/profile-pics/beautiful.jpg" className="pull-left" />
                          <h4 className="pull-left">
                          User Name
                            <p>email@gmail.com</p>
                          </h4>
                          <div className={adminStyles.userAction} title="Add to contacts">
                            <FontAwesome name ="plus" />
                          </div>
                        </Link>
                      </li>*/