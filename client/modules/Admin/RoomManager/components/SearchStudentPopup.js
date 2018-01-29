import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import callApi from '../../../../util/apiCaller';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { loggedInData } from '../../../Login/LoginReducer';
import styles from '../../Admin.css';
import {ListItem} from '../../../../components/ListItem';
import ListGroupItems from './ListGroupItems'
// import { packageData } from '../PackageReducer';

var dataObject = {};

class SearchStudentPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myStudentsData: null,
      uid: null,
      selectedAddUserType : "INDIVIDUAL USER",
      inputValue : ""
    };
  }

  componentDidMount() {
    this.setuid(this.props.loggedInData);
  }

  setuid(res) {
    // console.log("uid---",res);
    this.setState({uid: res.data._id});
  }

  searchUsers(e) {
    // console.log("input==", e.target.value);
    // console.log("packageId", this.props.packageId);
    // let moduleName = window.location.pathname.split( '/' );
    // console.log(moduleName[2]);
    let dataObj = this.props.dataObj;
    // console.log("dataObj===",this.props.dataObj);
    let query = "roomId=" + dataObj.roomId + "&instId=" + dataObj.instId + "&input=" + e.target.value;
    this.setState({inputValue : e.target.value.trim()});
    if(this.state.selectedAddUserType == 'GROUP' && e.target.value.trim() != ""){
      callApi('searchgroups?' + query, 'get').then(res => this.myStudents(res));  
    } else if(this.state.selectedAddUserType == 'INDIVIDUAL USER' && e.target.value.trim()!= ""){
      callApi('searchstudents?' + query, 'get').then(res => this.myStudents(res));
    } else {
      this.setState({myStudentsData: null})
    }
  }

  myStudents(res) {
    if(res.status){
      this.setState({myStudentsData: res.data});
    }else {
      this.setState({myStudentsData: null});
    }
  }

  sendUserId(userId) {
    if (userId && userId != 'undefined') {
      if(this.state.selectedAddUserType == 'INDIVIDUAL USER'){
        this.props.getUserId(userId,'INDIVIDUAL USER');
      } else if(this.state.selectedAddUserType == 'GROUP'){
        this.props.getUserId(userId,'GROUP');
      }
      for(var i = 0; i < this.state.myStudentsData.length; i++) {
        if(this.state.myStudentsData[i]._id == userId) {
          var data = this.state.myStudentsData[i]
          var obj = this.state.myStudentsData
          //var myStudentsData = obj.data
          var index = _.findIndex(obj, ['_id', data._id]);
          _.pullAt(obj, [index]);
           this.setState({
            myStudentsData : obj
          })
        }
      }
    }
  }

  submittedAddUserType(e){
    let addUserTypeValue = e.target.value;
    this.setState({
      selectedAddUserType : addUserTypeValue,
      myStudentsData: null,
      inputValue : ""
    })
  }

  hideModal(){
    this.setState({
      myStudentsData: null,
      selectedAddUserType : "INDIVIDUAL USER",
      inputValue : ""
    });
    this.props.hidecallback();
  }

  render() {
    let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
    let listUsers = this.state.myStudentsData && this.state.myStudentsData.length <= 0 ?
        this.state.selectedAddUserType == 'INDIVIDUAL USER' ? <FormattedMessage id='no_users_found' /> : <FormattedMessage id='no_groups_found' />
        :null;
    if(this.props){
      dataObject = this.props;
      // console.log(dataObject);
    }
    if(this.state.myStudentsData && this.state.myStudentsData.length > 0){
      let usersData = this.state.myStudentsData;
      if(this.state.selectedAddUserType == 'INDIVIDUAL USER'){
        listUsers = usersData.map((userData) =>
          <ListItem key={userData._id}
                  value={userData} getUserId={this.sendUserId.bind(this)} loggedInData={this.props.loggedInData} classname='plus' classTitle= {this.props.intl.messages.add_student} intl={this.props.intl}/>
        );
      } else if(this.state.selectedAddUserType == 'GROUP'){
        listUsers = usersData.map((userData) =>
          <ListGroupItems key={userData._id}
            value={userData} getUserId={this.sendUserId.bind(this)} loggedInData={this.props.loggedInData} classname='plus' classTitle= {this.props.intl.messages.add_student} />
        );
      }
    }
    return (
        <Modal show={dataObject.showModal} onHide={this.hideModal.bind(this)}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} ><FormattedMessage id = 'add_students'/></Title>
          </Header>
          <Body>
            {/*<p><FormattedMessage id = "search_assigned_to_contacts"/></p>*/}
            <div className={styles.addStudPop1} ><p>Select add user type:</p></div>
            {/*<select ref="selectAddUserType" onClick={this.submittedAddUserType.bind(this)} className="form-control"> 
              <option value="">Select Add User Type</option>
              <option value="GROUP">Group</option>
              <option value="INDIVIDUAL USER">Individual User</option> 
            </select>*/}
            <div className={styles.addStudPop2} >
              <input type="radio" value="INDIVIDUAL USER" checked={this.state.selectedAddUserType == 'INDIVIDUAL USER'} onChange={this.submittedAddUserType.bind(this)}/><span className={styles.addStudText}> <FormattedMessage id = 'individual_user'/></span>
              <input className={styles.addStudInput} type="radio" value="GROUP" checked={this.state.selectedAddUserType == 'GROUP'} onChange={this.submittedAddUserType.bind(this)}/><span className={styles.addStudText}> <FormattedMessage id = 'group'/></span>
            </div>
            {this.state.selectedAddUserType != ""  
            ?
              <div>
                <div className={styles.searchBox}>
                  <form>
                  <input type="search" name="search" placeholder={this.state.selectedAddUserType == 'INDIVIDUAL USER' ? this.context.intl.messages.add_contacts : this.context.intl.messages.add_groups} value={this.state.inputValue} onChange={this.searchUsers.bind(this)} className={styles.whiteSearch} maxLength={50} autoFocus="true" />
                    <input type="" onClick={this.searchUsers.bind(this)} className={styles.whiteSearchSubmit} />
                    <span className={styles.whiteIconSearch}>
                      <FontAwesome name="search" />
                    </span>
                  </form>
                </div>
                <div className={styles.searchUsersListBlock}>
                  <div className={styles.searchUsersListGroup}>
                    <Row>
                      <Col md={12}>
                        <div className={styles.userListGroup}>
                          <ul>
                          {listUsers}
                          </ul>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            :null}
          </Body>
          
        </Modal>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // packageData : packageData(state),
    loggedInData: loggedInData(state),
    intl: state.intl
  };
}

SearchStudentPopup.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

SearchStudentPopup.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

SearchStudentPopup.defaultProps = { showModal: false };

export default connect(mapStateToProps)(injectIntl(SearchStudentPopup));
