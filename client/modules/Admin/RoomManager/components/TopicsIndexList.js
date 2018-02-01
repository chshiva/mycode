import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import FontAwesome from 'react-fontawesome';
import callApi from '../../../../util/apiCaller';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import AuthClient from '../../../../components/AuthController';
import styles from '../../Admin.css';
import { getCourseTopicsData, setTopicsIndex } from '../RoomActions';
import { roomData } from '../RoomReducer'; 
import TopicDragList from './TopicDragList.js';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import dataStyle from '../../../../components/DataTable/DataTable.css';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);



var dataObject = {};
class TopicsIndexList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			topicData: null
		}
	}

	componentDidMount() {

  	this.props.dispatch(getCourseTopicsData(this.props.roomId));
	}

	closeModel() {
	    var res = {
	      status : "close"
	    }
	    this.setState({
			topicData: null
		});

	  	this.props.hidecallback(res);
	}

	handleTopicsIndex = (dragedTopics) => {

		this.setState({
			topicData: dragedTopics
		});
	}

	saveTopicsIndex() {
		if(this.state.topicData != null) {
			console.log('this.state.topicData',this.state.topicData);
			this.props.dispatch(setTopicsIndex(this.state.topicData)).then(res => this.setResponse(res));
		}
	}
  setResponse= (res) => {
    if(res.status) {
      this.props.callback(res);
      this.setState({
			topicData: null
		});
    } else {
      this.refs.room_container.error(`${res.message} `, ``);
    }
  }

	render() {
		let cls_btnSaveAssign = ` ${styles.btnSaveAssign} `;
    	let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
    	let listUsers = <FormattedMessage id='no_users_found' />;
	    if(this.props){
	      dataObject = this.props;
	    }

    return (
		  <div>
          <ToastContainer
            toastMessageFactory={ToastMessageFactory}
            ref="room_container"
            className="toast-top-right"
          />
	        <Modal show={dataObject.showModal} onHide={this.closeModel.bind(this)}>
	          <Header closeButton>
	            <Title className={styles.popHeadingAll} ><FormattedMessage id = 'add_index_topics'/></Title>
	          </Header>
	          
			{ 
				this.props.roomData && this.props.roomData.topicdata && this.props.roomData.topicdata.length > 0  ?
				<div>
					<Body className={styles.modalBoxContent}>	
						<div className="form-group">
							<TopicDragList topicData={this.props.roomData.topicdata} setIndex={this.handleTopicsIndex}/>
						</div>
					</Body> 
					{
					this.props.roomData && this.props.roomData.topicdata && this.props.roomData.topicdata.length >1  ?
							
							<Footer className={styles.mainSaveAssign}>
				            	{/*<label className={weStyles.error}>{this.state.error}</label>*/}
					            <div className={styles.blockSaveAssign} >
					              	<button id="closeModel" onClick={this.closeModel.bind(this)} ><FormattedMessage id='cancel' /></button>
					              	<button id="saveGroupBtn"  onClick={this.saveTopicsIndex.bind(this)} className={cls_btnSaveAssign} ><FormattedMessage id='save' /></button>
					            </div>
			      			</Footer>
			      			
		      			: null
	      			}
      			</div>	
				:
				 <div className={styles.whiteCard}>
                    <div className={dataStyle.noDataBox}>
                      <h2>
                        <FontAwesome name="frown-o" />
                      </h2>
                      <p><FormattedMessage id ="no_topic_published"/></p>
                    </div>
          		</div>
			}    
	        </Modal>         
      </div>
	    );
	}
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // packageData : packageData(state),
    loggedInData: loggedInData(state),
    intl: state.intl,
    roomData: roomData(state),
  };
}

TopicsIndexList.propTypes = {
  loggedInData: PropTypes.object,
  roomData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(TopicsIndexList);