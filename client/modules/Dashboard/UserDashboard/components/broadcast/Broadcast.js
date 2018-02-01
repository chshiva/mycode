import React, { PropTypes, Component } from 'react';
import {Col, Row, Grid, Carousel} from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styles from '../../../Dashboard.css';
import compstyles from '../../../../../components/component.css';
import dataStyle from '../../../../../components/DataTable/DataTable.css';
import { saveBroadcastRequest, getBroadcastData, updateUserId } from './BroadcastActions';
import ViewBroadcast from './ViewBroadcast';
import { loggedInData } from '../../../../Login/LoginReducer';
import { Roles } from '../../../../../roles.js';
var _ = require('lodash');
import Draggable from 'react-draggable';
import WoogeenManager from '../../../../Communication/WoogeenManager';
import { setRightBar } from '../../../../Layouts/DashLayout/RightBarActions';
import { broadcastData } from './BroadcastReducer';

class Broadcast extends Component{
	constructor(props) {
		super(props);
		this.confObject = new WoogeenManager();
		this.state = {
			broadcastValue:'',
			errorMsg:'',
			commentsCount: '',
			data : null,
			uid : '',
			limit : 5,
			total : 0,
      activeDrags: 0,
      mixStream: false,
		}
		this.skip = 5;
		this.handleInputData = this.handleInputData.bind(this);
		this.handleBroadcast = this.handleBroadcast.bind(this);		
	}


	componentDidMount() {
    this.setdata(this.props.loggedInData);  
    //Check till conference is going on not!
    this.props.dispatch(updateUserId());
    if(this.confObject.getConnectionStatus()){
      var that = this;
      //Subscribe Mix Stream
      this.confObject.trySubscribeMixStream(function(stream){
        // console.log("Mix Stream Got", stream);
        that.setState({mixStream: true});
        that.showVideo(stream);
      })
    }  
  }

  showVideo(stream){
    let _video = document.getElementById("objMixVideo");
    if(_video){
      //Create URL
      let _streamURL = (window.URL || webkitURL).createObjectURL(stream.mediaStream);
      _video.src = _streamURL;
      // _video.volume = 0;
    }
  }
  
  componentWillUnmount() {    
    this.props.dispatch(setRightBar({current : null}));
  }

	setdata(result) {
		if (result && result.data && result.data._id) {
			this.setState({uid : result.data._id});
		}
		var obj = { limit : this.state.limit }
		getBroadcastData(obj).then(res=>this.setresponse(res));
	}

	
  onStart() {
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
    this.setState({activeDrags: --this.state.activeDrags});
  }
	
	handleInputData = (e) => {
		this.setState({broadcastValue : e.target.value,
			errorMsg:''
		})
	}

	handleBroadcast = (e)=> {
		e.preventDefault();
		let value = this.state.broadcastValue.trim();
		if(value != '') {
			this.setState({ broadcastValue : ''});
			var obj = {
				broadcast: value,
			}
			saveBroadcastRequest(obj).then(res => this.createresponse(res, value, true));
		} else {
			this.setState({errorMsg:this.props.intl.messages.please_enter_the_broadcast});
		}		
	}

	clickmore = () => {
		let count = this.state.limit + this.skip;
		this.setState({ limit : count });
		let obj = {						
			limit : count
		}
		getBroadcastData(obj).then(res => this.setresponse(res));
	}

	setresponse = (response) => {
		if(response.status){
			//console.log("response.data", response.data);
			this.setState({ data : response.data, total : response.count, error : '' });
		}else{
			this.setState({ error : response.error });
		}
	}

	createresponse = (response, value, status) => {
		
		if(response.status){
			this.setState({ broadcast : '' });
			var obj = {
				limit : this.state.limit
			}
			getBroadcastData(obj).then(res=>this.setresponse(res));

		} else {
			this.setState({ error : response.error, broadcast : value });
		}
	}

	
	renderBroadcast = (data) => {
		if(data != null && data.length > 0){
			let self = this;
			let broadcast = data.map( function(doc){
				return(<ViewBroadcast data={doc} key={doc._id}  
					uid={self.state.uid} editQuestionCb = {self.createresponse} broadcastLimit= {self.state.limit}/>);
			});
			return(
				<div>
					{broadcast}
					{this.state.total > this.state.limit ?<div className={styles.loadmore}> <a onClick={this.clickmore}>load more..</a> </div> : null}
				</div>
			);
		}else{
			return (
						<div className={dataStyle.noDataBox}>
							<h2>
								<FontAwesome name="frown-o" />
							</h2>
							<p><FormattedMessage id ="no_broadcast"/></p>
						</div>
			);
		}
	}

  navigateBack(){
    browserHistory.push("/conf/"+this.confObject.getRoomKey());
  }

	render(){
		console.log("this.props.broadcastData", this.props.broadcastData.individualCount);
		console.log("this.props.loggedInData", this.props.loggedInData);
		
		let roleObj = _.invert(Roles);
    let role = this.props.loggedInData.data.role;      
    this.role = roleObj[role];

    let cls_mixStream = `${styles.mixStream} ${styles.hideObject}`;
    let cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
    if(this.state.mixStream){
      cls_mixStream = `${styles.mixStream}`;
    }
    const dragHandlers = {onStart: this.onStart.bind(this), onStop: this.onStop.bind(this)};

		//console.log("this.state.uid", this.state.uid)
		let cls_boradCHeader = `${styles.boradCHeader} clearfix`;
		let cls_broadcastNews = `${styles.broadcastNewsBlock} clearfix`;
		let cls_postBtn = ` ${styles.btnPost} ${styles.btnPostNews} pull-right `;
		let cls_arrowBlock = `${styles.arrowBlock} pull-right`;
		return(
		<Row>
			<Col className="col-md-12">	
				<div className={styles.broadcastContent}>
				{ role == Roles.Lmsadmin || role == Roles.Instructor || role == Roles.Presenteradmin || role == Roles.Presenter || role == Roles.Admin || role == Roles.Moderator ?
					<div className={styles.cardBroadcast}>
						<div className={cls_boradCHeader}>
							<div className={styles.bcIconInline}>
								<img src="/images/black-icons/black-help.png" />
							</div>
							<div className={styles.bcHeadingBloack}>
								<h2 className={styles.bcHeadingTxt}><FormattedMessage id = 'broadcast'/></h2>
							</div>
						</div>
						<div className={cls_broadcastNews}>
							<textarea id="broadcastNews" className={styles.bcTextArea} value = {this.state.broadcastValue} placeholder={this.context.intl.messages.broadcast} onChange = {this.handleInputData} autoFocus='true' />
			      	<button id="postBroadcast" className={cls_postBtn} onClick={this.handleBroadcast}><FormattedMessage id = 'post'/></button>
						</div>
						<label id="error" className={compstyles.errorPre} >{this.state.errorMsg?this.state.errorMsg:''}</label>
					</div>
				:null}
					<div className={role == Roles.Lmsadmin || role == Roles.Instructor || role == Roles.Presenteradmin || role == Roles.Presenter ? styles.cardBroadcastCon : styles.cardBroadcastNotAdmin}>
						<div className={styles.cardBroadcast}>
							<div className={cls_boradCHeader}>
									<h2 className={styles.bcHeadingTxt}><FormattedMessage id = 'broadcast_news_list'/></h2>
							</div>
							{this.renderBroadcast(this.state.data)}
						</div>
					</div>
				</div>
        { this.props.loggedInData.data.role != Roles.Student
        	?
	        <Draggable handle=".handle" {...dragHandlers}>
	          <div className={cls_mixStream} title={this.props.intl.messages.drag}>
	            <video className="handle" id="objMixVideo" autoPlay></video>
	            <span id="backBtn" className={styles.videoBackButton} onClick={this.navigateBack.bind(this)} title={this.props.intl.messages.back}>
	              <img src="/images/white-icons/white-expand.png" />
	            </span>
	          </div>
	        </Draggable>
	      	:
	      	null
	    	}
			</Col>
		</Row>	
			);
	}

}

function mapStateToProps(state) {
  return {
  	loggedInData: loggedInData(state),
    intl: state.intl,
    broadcastData : broadcastData(state)
  };
}

Broadcast.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

Broadcast.propTypes = {
	intl: PropTypes.object,
  confObject: PropTypes.object,
};

export default connect(mapStateToProps)(Broadcast);

