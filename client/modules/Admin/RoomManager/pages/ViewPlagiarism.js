import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AuthClient from '../../../../components/AuthController.js';
import { isLoggedIn } from '../../../Login/LoginActions';
import { roomData } from '../RoomReducer';
import { loggedInData } from '../../../Login/LoginReducer';
import PlagiarismView from '../components/PlagiarismView';
import Validator from '../../../../components/Validator';
import {RoomSchema} from '../schema/RoomSchema';

import SubMenu from '../../../../components/SubMenu';
import TopMenu from '../../../../components/TopMenu';

import {submissionViewSubMenu } from '../schema/RoomMenu';
import { getPlagiarismData, getPlagiarismCredits, ClearPlagiarism } from '../RoomActions';

import Uploading from '../../../../components/Uploading';
// Import Style
import styles from '../../../../components/component.css';
import {Col, Row, Grid} from 'react-bootstrap';
import { loginLanguage } from '../../../Intl/IntlActions';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { intlData } from '../../../Intl/IntlReducer';

class ViewPlagiarism extends Component {

  constructor(props) {
    super(props);
    Validator.activeSubMenu(submissionViewSubMenu, "plagiarism");
    submissionViewSubMenu.menus[0].action = this.back.bind(this);
    submissionViewSubMenu.menus[1].action = this.fileView.bind(this);
    submissionViewSubMenu.menus[2].action = this.plagiarism.bind(this);
    this.state = {
      credit : null
    } 
      
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      let obj = {
        roomId : this.props.params.rid,
        assignmentId : this.props.params.aid,
        studentId : this.props.params.sid
      };      
      this.props.dispatch(getPlagiarismCredits()).then(res => this.setPlagiarism(res));        
      this.props.dispatch(getPlagiarismData(obj));        
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.roomData && (nextProps.roomData.error && nextProps.roomData.error.length>0)) {
      this.refs.container.error(nextProps.roomData.error);
    }
  }

  componentWillUnmount() {
    this.props.dispatch( ClearPlagiarism());
  }

  setPlagiarism(res) {
    submissionViewSubMenu.menus[2].text = this.props.intlData.messages.plagiarism+'('+res.creditData+')';
    this.setState({credits : res.creditData})
  }

  back = () => {
    if(this.props.params.aid) {
      var rid = this.props.params.rid;
      var aid = this.props.params.aid;
      browserHistory.push('/admin/room/assignment/submissions/'+rid+'/'+aid);
    } else {
      var rid = this.props.params.rid;
      var tpid = this.props.params.tpid;
      browserHistory.push('/admin/room/uploadtotopic/'+tpid+'/'+rid);
    }
  }

  plagiarism = () => {
    var rid = this.props.params.rid;
    var aid = this.props.params.aid;
    var sid = this.props.params.sid;
    browserHistory.push('/admin/room/assignment/submission/plagiarism/'+rid+'/'+aid+'/'+sid);
  } 

  fileView = () => {
    var rid = this.props.params.rid;
    var aid = this.props.params.aid;
    var sid = this.props.params.sid;
    var filename = this.props.params.filename;
    browserHistory.push('/admin/room/assignment/submission/view/'+rid+'/'+aid+'/'+sid+'/'+filename);
  }

 render() {
    //let clsContainerRight = `${styles.containerRight} pull-right`;
    let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
    let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
    let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`;    
      
    
    return (
      <div> 
        {this.state.credits != '' && this.state.credits != null && this.state.credits != undefined?
          <div>       
            <ToastContainer
                  toastMessageFactory={ToastMessageFactory}
                  ref="container"
                  className="toast-top-right"
                 />
            <div className={cls_container}>
              <div className={cls_topmenu}>
                <h3 className=""><FormattedMessage id='room_management' /></h3>          
              </div>
              <div className={cls_isubmenu}>
                <SubMenu data={submissionViewSubMenu} />
              </div>
              {this.props && this.props.roomData && this.props.roomData.plagiarismData.length >=0?
              <PlagiarismView roomData={this.props.loggedInData.data} plagiarismData = {this.props.roomData.plagiarismData}/>
              :<div className={styles.spinnerCss}><Uploading type="loading"/></div>}
            </div> 
          </div>
        :<div className={styles.spinnerCss}><Uploading type="loading"/></div>
        }
      </div>      
    )
    
      
    
  }
}
// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    roomData : roomData(state),
    loggedInData : loggedInData(state),
    intlData: intlData(state)
  };
}

ViewPlagiarism.propTypes = {
  roomData : PropTypes.object,
  loggedInData : PropTypes.object,
  dispatch : PropTypes.func.isRequired
};

ViewPlagiarism.contextTypes = {
  router : React.PropTypes.object
};

export default connect(mapStateToProps)(ViewPlagiarism);
