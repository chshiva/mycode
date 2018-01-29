import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import callApi from '../util/apiCaller';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { isLoggedIn } from '../modules/Login/LoginActions';
import AuthClient from './AuthController';
import styles from '../modules/Admin/Admin.css';
import { ListItem } from './ListItem';
import Radio from './Radio';
import FeedbackComment from './FeedbackComment';

import  {ToastContainer, ToastMessage} from '../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
//import FeedbackComment from 'FeedbackComment';

//import RadioButtonWithString  from '../modules/Admin/Feedback/components/RadioButtonWithString';

// import { packageData } from '../PackageReducer';
var groupElementArray = [''];
var dataObject = {};

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
        myUsersData: {},
        uid: null,
        radioAnswer: '',        
    };
    this.dataObjectFeedback = {};
    

  } 
  callback = (obj) =>{
    //console.log("obj === ",obj);
      let newObj;
      newObj = Object.assign({}, this.dataObjectFeedback, obj);
      this.dataObjectFeedback = newObj;
      
      //console.log(this.dataObjectFeedback);
  }
  saveFeedback(e) {
   // console.log("object data after submit --->", this.dataObjectFeedback);
    //this.dataObjectFeedback['userId'] = this.props.userId;
    callApi('saveFeedbackRequest', 'post', {
      feedbackData: {
        data:this.dataObjectFeedback,
        userId:this.props.userId,        
        roomId: this.props.roomId  
      }
    }).then(res => this.myUsers(res));    
  }

  myUsers(res) {
    //console.log("myUsersData==", res);
    this.dataObjectFeedback = {};    
    if(res.status==true) {
      this.refs.feedback_container.success(`${res.message} `, ``);
      this.props.getRequest();
    }else if(res.status==false){
      this.refs.feedback_container.error(`${res.error} `, ``);
    }
    setTimeout(this.props.hidecallback(), 1000);      
  }

  renderRadio() {
    //console.log("render radio");
    //var cls = `${styles.iElement} ${styles.oElement}`;
    let labels = this.state.labelArray;
    //let numberValuesLabel = this.state.numberValuesLabel;
    //let textAreaData = this.state.data
    let self = this;
    let buttons = self.props.radioGroupLabels.map(function(obj){  
        return(      
        <div key={obj.id}>
          <label> {obj.label} </label>
          <Radio data={obj} values={self.props.radioButtonOptions} callback={self.callback}/>
        </div>     
        );      
    });

    let numberButtons = self.props.overAllRatingLabel.map(function(obj){
     
      return(
        <div key={obj.id}>
          <label> {obj.label} </label>
          <Radio data={obj} values={self.props.overAllRatingRadioOptions} callback={self.callback}/>                           
        </div>
        );
    });
     buttons.push(numberButtons);

     let feedbackText = self.props.feedbackCommentLabel.map(function(obj){
      
      return(
        <div key={obj.id}>
          <label> {obj.label} </label>
          <FeedbackComment data={obj} callback={self.callback}/>                           
        </div>
        );
    });

    buttons.push(feedbackText);


   
    return buttons;

  }

  render() {
    let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
    
    if(this.props){
      dataObject = this.props;
      // console.log(dataObject);



    }
    //console.log("State Array------->", this.state.groupElementValue);  
    return (
      <div className={styles.midContainer}>
      <ToastContainer
        toastMessageFactory={ToastMessageFactory}
        ref="feedback_container"
        className="toast-top-right"
       />
        <Modal show={dataObject.showModal} onHide={dataObject.hidecallback}>
          <Header closeButton>
            <Title className={styles.popHeadingAll} ><FormattedMessage id = 'user_feedback'/></Title>
          </Header>
          <Body>
            
            <div className={styles.searchBox}>
              <form>
              {this.renderRadio()}
              </form>
            </div>
            
          </Body>
          <Footer>
         
          <button className="btn btn-success btn-icon btn-sm" onClick={this.saveFeedback.bind(this)} >Save</button>
        </Footer>
        </Modal>
        </div>  
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // packageData : packageData(state),
  };
}

Feedback.propTypes = {
  intl: PropTypes.object,
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  // dispatch: PropTypes.func.isRequired,
};

Feedback.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};

Feedback.defaultProps = { showModal: false };

export default connect(mapStateToProps)(Feedback);
