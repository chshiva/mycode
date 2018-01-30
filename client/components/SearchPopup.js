import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import callApi from '../util/apiCaller';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { isLoggedIn } from '../modules/Login/LoginActions';
import { loggedInData } from '../modules/Login/LoginReducer';
import AuthClient from './AuthController';
import styles from '../modules/Admin/Admin.css';
import { ListItem } from './ListItem';
// import { packageData } from '../PackageReducer';
var _ = require('lodash');
var dataObject = {};

class SearchPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myUsersData: null,
        uid: null
    };
  }

  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '')).then(res => this.setuid(res));
  // }

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
    let moduleName = window.location.pathname.split( '/' );
    // console.log(moduleName[2]);
    if(e.target.value.trim() != ""){
      callApi('searchusers', 'post', {
        searchData: {
          input: e.target.value,
          uid: this.state.uid,
          moduleName : moduleName
        }
      }).then(res => this.myUsers(res));
    }else {
      this.setState({myUsersData: null});
    }
  }

  myUsers(res) {
    if (res.status) {
      this.setState({myUsersData: res.data});
    } else {
      this.setState({myUsersData: null});
    }
    
  }

  sendUserId(userId, userName) {
    if (userId && userId != 'undefined') {
      this.props.getUserId(userId, userName);
      for(var i = 0; i < this.state.myUsersData.length; i++) {
        if(this.state.myUsersData[i]._id == userId) {
          var data = this.state.myUsersData[i]
          var obj = this.state.myUsersData
          // var myUsersData = obj.data
          var index = _.findIndex(obj, ['_id', data._id]);
          _.pullAt(obj, [index]);
           this.setState({
            myUsersData : obj
          })
        }
      }
    }
  }

  closeModel = () => {
    this.setState({ myUsersData : null });
    this.props.hidecallback();
  }

  render() {
    let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
    let listUsers = this.state.myUsersData != null && this.state.myUsersData.length <= 0 ?
          <FormattedMessage id='no_users_found' />
        : null; 
            
    if(this.props){
      dataObject = this.props;
      // console.log(dataObject);
    }
    if(this.state.myUsersData && this.state.myUsersData.length > 0){
      let usersData = this.state.myUsersData;
      // console.log("---", this.props.packageData.users);
      listUsers = usersData.map((userData) =>
        <ListItem key={userData._id}
                value={userData} getUserId={this.sendUserId.bind(this)} loggedInData={this.props.loggedInData} classname='plus' classTitle={this.props.intl.messages.add_user} intl={this.props.intl}/>
      );
    }
    
    return (
        <Modal show={dataObject.showModal} onHide={this.closeModel}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} ><FormattedMessage id = 'add_contacts'/></Title>
          </Header>
          <Body>
            <p><FormattedMessage id = "search_assigned_to_contacts"/></p>
            <div className={styles.searchBox}>
              <form>
              <input type="search" name="search" placeholder={this.context.intl.messages.search_contacts} onChange={this.searchUsers.bind(this)} className={styles.whiteSearch} maxLength={50} autoFocus="true" />
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
    intl: state.intl,
  };
}

SearchPopup.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

SearchPopup.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

SearchPopup.defaultProps = { showModal: false };

export default connect(mapStateToProps)(injectIntl(SearchPopup));
