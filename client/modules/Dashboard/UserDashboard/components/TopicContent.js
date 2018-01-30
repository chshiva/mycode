import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel, Modal} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import { connect } from 'react-redux';
import { dashboardData } from '../UserDashboardReducer';
import TopicList from './TopicList';
import ConductQuestion from './ConductQuestion';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import moment from 'moment';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, getConferenceTopicContentData, getfiles} from './WorkDashboardActions';
import { Roles } from '../../../../roles';
import Analytics from '../../../Communication/Analytics';
import { getTopicStatus } from '../../../Communication/AnalyticsAction';
import { workDashboardReload } from './WorkDashboardReloadReducer';
import Loading from '../../../App/components/Loading';
import { loggedInData } from '../../../Login/LoginReducer';
import { reloadTopicContent } from './WorkDashboardReloadActions';


class TopicContent extends Component{

	constructor(props) {
		super(props)

		this.quill = false;
		this.state = {
			showImageModal : false,
			showAudioModal : false,
			fileName : null,
			fileType : null,
			displayName: '',
			complete:false, 
			topicContentData: [],
			loading : false,
			disablePrevBtn: false,
			disableNextBtn: false
		}
		this.topiclistData = [],
		this.handleSelection = this.handleSelection.bind(this);
		this.props.confObject.TopicContentSelectListener(this.handleSelection);
	}

	componentDidMount() {
		//changeBy: pranathi, fetching questionnaire data
		let obj = {
      roomId:this.props.roomId,
      topicId: this.props.workDashboardData.tid
    }
    	this.props.dispatch(getfiles(obj))
		this.props.dispatch(getConferenceTopicContentData(obj)).then(res => this.setResponse(res));
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.workDashboardReload.topicContent != nextProps.workDashboardReload.topicContent) {
			let obj = {
	      		roomId:this.props.roomId,
	      		topicId: this.props.workDashboardData.tid
    		}
	   		this.props.dispatch(getfiles(obj))
			this.props.dispatch(getConferenceTopicContentData(obj)).then(res => this.setResponse(res));
		}

		if(this.props.workDashboardData.tid != nextProps.workDashboardData.tid) {
			this.props.dispatch(reloadTopicContent());
		}

		if(this.props.workDashboardData && this.props.workDashboardData.topiclistData && this.props.workDashboardData.topiclistData.length > 0 ) {
			let currentIndex = this.topiclistData.indexOf(this.props.workDashboardData.tid);
			if( currentIndex == 0 && this.topiclistData.length != 1) {
				this.setState({
					disablePrevBtn: true,
					disableNextBtn: false
				});
			} else if((currentIndex+1) >= this.topiclistData.length && this.topiclistData.length != 1) {
				this.setState({
					disablePrevBtn: false,
					disableNextBtn: true
				});
			} else if(currentIndex == 0 && this.topiclistData.length == 1){ 
				this.setState({
					disablePrevBtn: true,
					disableNextBtn: true
				});
			} else {
				this.setState({
					disablePrevBtn: false,
					disableNextBtn: false
				});
			}
		}
	}

	setResponse=(data)=> {
		this.setState({
			loading : true
		});
		this.quill = new Quill(ReactDOM.findDOMNode(this.refs.editor), {
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'link', 'video'],
          ['image', 'code-block'],['formula'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],

        ],
        formula:true,
      },
      placeholder : this.props.intl.messages.no_data_yet,
      readOnly: true,
	  	theme: 'bubble'
	  
		});
		if (!_.isEmpty(this.props.workDashboardData.topicContentDataDetails)) {
			let topicObj = {
				topicId: this.props.workDashboardData.tid,
				roomId:this.props.roomId
			}	
			getTopicStatus(topicObj).then(res => { 
				if (res.status && res.data && res.data.value) {
					res.data.value.status == 2 ? this.setState({ complete: true }) : this.setState({ complete: false })
				} 
			});
		}
    this.quill.setContents(this.props.workDashboardData.topicContentDataDetails.content); 
	}

	componentWillUnmount() {
		var _objAnalytics = new Analytics();
		let topicId = this.props.workDashboardData.tid;
		let marked = false;
		let unmount = true;
		_objAnalytics.UpdateTopicComplete(topicId, marked, this.props.roomId,unmount );		
	}

  handleTopicList() {
		this.props.topicListCallback();
		let obj = {current : 'topicList', topicContent: false, topicList : true, conductQuestion : false, conductQuestion : false, pdfView : false, topicPdfFileData : null, tid:''};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    		this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
	}

	handleQuestionnaire(data) {
		let obj = {current : 'topicList', topicContent: false, topicList : false, conductQuestion : true, questionnaireId: data.questionnaireId._id, questionnaireName: data.questionnaireId.questionnaireName,  pdfView : false, topicPdfFileData : null };
		if((data.openFrom == undefined && data.closeFrom == undefined) || (data.openFrom == null && data.closeFrom == null)) {
			this.handleWorkDashboard(obj);
		} else {
			let openFrom = moment(data.openFrom);
			let now = moment()
		    if (+openFrom > +now) {
		    	alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.questionnaire_alert, function() {
		                }).setting({'label': this.props.intl.messages.ok});
		    } else {
		    	this.handleWorkDashboard(obj);
		    }
		}
	}

	handleImage(imageData, fileType){
		this.setState({
			showImageModal : true,
			fileName : imageData.fileName,
			fileType : fileType.fileType,
			displayName : imageData.displayName
		})		
	}
	handleAudioImage (imageData, fileType){
		this.setState({
			showAudioModal : true,
			fileName : imageData.fileName,
			fileType : fileType.fileType,
			displayName : imageData.displayName
		})	
	}
	hideImageModal() {
		this.setState({
			showImageModal : false,
			showAudioModal : false,
			fileName : null,
			fileType : null,
			displayName : ''
		})
	}
	setSelector(){
		if(this.quill != null){
			let obj = null;
			if(this.props.workDashboardData.sync == true && this.props.imHost == true){
				if (window.getSelection) {
						let range = window.getSelection().getRangeAt(0);
		        let preSelectionRange = range.cloneRange();
		        preSelectionRange.selectNodeContents(this.refs.editor);
		        preSelectionRange.setEnd(range.startContainer, range.startOffset);
		        let start = preSelectionRange.toString().length;

		        obj = {
		            start: start,
		            end: start + range.toString().length,
		            uid : this.props.workDashboardData.uid
		        }
		    }
		    else if (document.selection && document.selection.type != "Control") {
		    		let selectedTextRange = document.selection.createRange();
		        let preSelectionTextRange = document.body.createTextRange();
		        preSelectionTextRange.moveToElementText(this.refs.editor);
		        preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
		        let start = preSelectionTextRange.text.length;

		        obj = {
		            start: start,
		            end: start + selectedTextRange.text.length,
		            uid : this.props.workDashboardData.uid
		        }
		    }
		    this.handleTopicContSelSync(obj);
		  }
		}
	}

	selectHandler() {
		this.setSelector();		
	}

	handlePdfView(data){
		let obj = { current : 'topicList', topicContent: false, topicList : false, conductQuestion : false, pdfView : true, fileId: data.fileId };
		this.handleWorkDashboard(obj);
	}

	//Code changed by - Najib, Desc - routing is called only for non-guest users
	viewUser() {
		if(!this.props.isGuest) {
    	browserHistory.push('/profile/'+this.props.workDashboardData.topicContentData.createdBy._id);
		}
	}
	
	handleMarkComplete(e) {
		var _objAnalytics = new Analytics();
		let topicId = this.props.workDashboardData.tid;
		let marked = e.currentTarget.value == "true" ? false : true;
		let unmount=false
		this.setState({
			complete:marked
		})
		_objAnalytics.UpdateTopicComplete(topicId, marked, this.props.roomId,unmount);		
	}


	handleTopicChange (e) {
		let obj = { tid:e.target.value};
		this.handleWorkDashboard(obj);

		let currentIndex = this.topiclistData.indexOf(e.target.value);

		if(currentIndex == 0) {

			this.setState({
				disablePrevBtn : true,
				disableNextBtn : false
			});
		} else if(this.topiclistData.length == (currentIndex+1)) {
			this.setState({
				disablePrevBtn : false,
				disableNextBtn : true
			});
		} else {
			this.setState({
				disablePrevBtn : false,
				disableNextBtn : false
			});
		}
	}

	handlePreviousTopic(e) {
		let currentIndex = this.topiclistData.indexOf(this.props.workDashboardData.tid);
		let previousIndex = currentIndex - 1;

		// console.log('previousIndex',previousIndex);
		// if(previousIndex < 0 &&  this.topiclistData.length == 1) {
		// 	this.setState({
		// 		disablePrevBtn : true,
		// 		disableNextBtn : true
		// 	});
		// }


		if(previousIndex < 0 ) {
			this.setState({
				disablePrevBtn : true,
				disableNextBtn : false,
			});
		} else {
			this.setState({
				disablePrevBtn : false,
				disableNextBtn : false
			});
			let obj = { tid:this.topiclistData[previousIndex] };
			this.handleWorkDashboard(obj);
		}
	}

	handleNextTopic(e) {
		let currentIndex = this.topiclistData.indexOf(this.props.workDashboardData.tid);
		let nextIndex = currentIndex + 1;


		// console.log('handleNextTopic',nextIndex);
		// if(nextIndex < 0 &&  this.topiclistData.length == 1) {
		// 	this.setState({
		// 		disablePrevBtn : true,
		// 		disableNextBtn : true
		// 	});
		// }

		if( nextIndex >=  this.topiclistData.length) {
			this.setState({
				disableNextBtn : true,
				disablePrevBtn : false
			});
		} else {
			this.setState({
				disableNextBtn : false,
				disablePrevBtn : false
			});
			let obj = { tid:this.topiclistData[nextIndex]};
			this.handleWorkDashboard(obj);
		}
	}

	render() {

    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_topicAuthorGuest = `clearfix ${styles.topicAuthorGuest}`;
		let cls_authorsBox = `clearfix ${styles.authorsBox}`;
		let cmnToggle = `${styles.cmnToggle} ${styles.cmnToggleRound}`;

    let topicId = this.props.workDashboardData && this.props.workDashboardData.tid ? this.props.workDashboardData.tid : null;
    let topicLink = '/admin/room/viewtopic/' + topicId + '/' + this.props.roomId
    let assignmentLink = '/admin/room/assignments/' + this.props.roomId;
    let questionnaireLink = '/admin/room/questionnaire/' + topicId + '/' + this.props.roomId
	let cls_optionBlock = `${styles.radioTopic}`;
	let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;

    var video = {
    	"verticalAlign" : "middle" 
    }

    let topiclistData = [];

	this.props.workDashboardData.topiclistData.forEach(function(data){ 
		topiclistData.push(data._id);
	});

	this.topiclistData = topiclistData;

    const fileURL = "/uploads/"+this.state.fileName;
   	const link = "https://www.youtube.com/embed/"+this.state.fileName;
    const showImageModal = this.state.showImageModal
    ?
    	<div>
	    	<Modal show={this.state.showImageModal} onHide={this.hideImageModal.bind(this)}>
					<Header closeButton>
						<Title className={styles.popHeadingAll} >{this.state.fileType == "link" ? "https://www.youtube.com/watch?v="+this.state.fileName : this.state.displayName}</Title>
					</Header>
					<Body>
						{this.state.fileType == "video"	?	
							<div className={styles.videoWrapper}>		
								<video src={fileURL} controls/> 
							</div>
							: ( this.state.fileType == "link" ? 
								<div className={styles.videoWrapper}>
									<iframe src={link}></iframe>
								</div>
								: <div className={styles.mediaView}>
										<img src={fileURL}/>
									</div>
							)
						}
					</Body>
					<Footer>
		      </Footer>
				</Modal>
			</div>
			:null

    const showAudioModal = this.state.showAudioModal
    ?
    	<div>
	    	<Modal show={this.state.showAudioModal} onHide={this.hideImageModal.bind(this)}>
					<Header closeButton>
						<Title className={styles.popHeadingAll} >{this.state.displayName}</Title>
					</Header>
					<Body>
						{this.state.fileType == "audio"	?	
							<div className={styles.audioWrapper}>
								<audio src={fileURL} type = "audio/mpeg" controls  className={styles.audioWidth}></audio>
							</div>
							:null
						}
					</Body>
					<Footer>
		      </Footer>
				</Modal>
			</div>
		:null

		let data = this.props.workDashboardData.topicContentDataDetails
    let profileImage = data ? data.createdBy ? data.createdBy.profile ? data.createdBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }

    let name = this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails.createdBy && this.props.workDashboardData.topicContentDataDetails.createdBy.firstname ? this.props.workDashboardData.topicContentDataDetails.createdBy.firstname : '';
    name += this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails.createdBy && this.props.workDashboardData.topicContentDataDetails.createdBy.lastname ? (' '+this.props.workDashboardData.topicContentDataDetails.createdBy.lastname) : '';

    if (this.state.loading) {
			return (
				<div>
					<div className={styles.whiteCard}>
						<div className={styles.breadCrum}>
							<ul>
								<li>
									<Link><span>{this.props.roomName}</span></Link>
								</li>
								<li><span>/</span></li>
								<li>
									<Link id="topicList" onClick={this.handleTopicList.bind(this)}><span><FormattedMessage id ="topics_list"/></span></Link>
								</li>
								<li><span>/</span></li>
								<li><span title={this.props.workDashboardData.topicContentDataDetails.topicName}>{this.props.workDashboardData.topicContentDataDetails.topicName.length > 20 ? (this.props.workDashboardData.topicContentDataDetails.topicName.substring(0, 20) + '...') : this.props.workDashboardData.topicContentDataDetails.topicName}</span></li>
							</ul>
				      {
				      	this.props.role == Roles.Lmsadmin || this.props.role == Roles.Instructor
				      	?
					      <div className={styles.absoluteRightActionBlock}>
				          <ul>
				            <li>
					            <Link id="manageTopic" to={topicLink} title={this.props.intl.messages.add_topics} >
					              <div className={styles.iconBox}>
					                <img src="/images/black-icons/black-topics.png"  alt="manage-topics-icon"/>
					              </div>
					            </Link>
				          	</li>
				          	<li>
				              <Link id="manageQuestionnaire" to={questionnaireLink} title={this.props.intl.messages.manage_questionnaire}>
				                <div className={styles.iconBox}>
				                  <img src="/images/black-icons/black-questionnaire.png"  alt="manage-questionnaire-icon"/>
				                </div>
				              </Link>
				            </li>
				          	<li>
				              <Link id="manageAssignments" to={assignmentLink} title={this.props.intl.messages.manage_assignments}>
				                <div className={styles.iconBox}>
				                  <img src="/images/black-icons/black-assignments.png"  alt="manage-assignments-icon"/>
				                </div>
				              </Link>
				            </li>
				          </ul>
				        </div>
				        : null
				      }
						</div>
					<div className={styles.topicListBar}>
				 		<div className={styles.dropdownBar}>
				 			<div className={styles.pastTopic}>
					 			<button disabled={this.state.disablePrevBtn} onClick = {this.handlePreviousTopic.bind(this)}>
					 				<FontAwesome  className={styles.faIcons} name="chevron-left" size="lg" style={this.state.disablePrevBtn== true ? {cursor: "not-allowed",color:"rgba(0,0,0,0.28)"} : {cursor: "pointer", color: "rgba(0,0,0,0.54)" } }/>
								</button>
					 		</div>
				 			<div className={styles.dropdownList}>
				 				<div className={styles.selectStyle}>
				 					<select onChange={this.handleTopicChange.bind(this)} value={this.props.workDashboardData.tid}>
									  	{
				                  			this.props.workDashboardData.topiclistData.map((data,i)=> {
				                   				return (<option key={i} value={data._id} > {data. topicName} </option>)
				                  			})
		                 	 			}
		                 	 		</select>
								</div>
				 			</div>
				 			<div className={styles.nextTopic}>
					 			<button disabled={this.state.disableNextBtn}  onClick = {this.handleNextTopic.bind(this)}>
					 				<FontAwesome  style={this.state.disableNextBtn== true ? {cursor: "not-allowed",color:"rgba(0,0,0,0.28)"} : {cursor: "pointer", color: "rgba(0,0,0,0.54)" } } className={styles.faIcons} name="chevron-right" size="lg" />
								</button>
				 			</div>
				 		</div>
			 		</div>

						<div className={styles.topicViewheader}>
							<h1 className={styles.mainHeadingTxt}>{this.props.workDashboardData.topicContentDataDetails.topicName}</h1>
						</div>
						<div className={styles.topicsListBody}>
							<div className={cls_authorsBox}>
								<span className={styles.hrzlList}>
									<div className={this.props.isGuest?cls_topicAuthorGuest : cls_topicAuthor}>
										<img id="viewprofile" src={imagePath} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile}/>
										<div className={styles.authorInfo}>
											<p className={styles.authorName}>{name}</p>
											<p className={styles.authorDisg}><FormattedMessage id = 'author'/></p>
										</div>
									</div>
								</span>
								{/*<span className={styles.hrzlList}>
									<div className={cls_topicAuthor}>
										<img src="/images/profile-pics/default-user.png" />
										<div className={styles.authorInfo}>
					
											<p className={styles.authorName}>Name of the Instructor</p>
											<p className={styles.authorDisg}>Instructor</p>
										</div>
									</div>
								</span>*/}
							</div>
							<div className={styles.fullDottedBlock}>
								<h3><FormattedMessage id = 'description'/></h3>
								<div ref="editor" onMouseUp={this.selectHandler.bind(this)}></div>
							</div>
							<div className={styles.fullDottedBlock}>
								<h2><FormattedMessage id = 'media_resources'/></h2>
								<div className={styles.mediaListBlock}>
								<ul>
								{
									this.props.workDashboardData &&  this.props.workDashboardData.topicFileData && this.props.workDashboardData.topicFileData.length > 0
									?
									this.props.workDashboardData.topicFileData.map((data) => {
										var fileType = data.fileType;
										let fileName = data.fileName;
										let displayName;
										if(data.description == undefined) {
											displayName = data.fileName.substring(data.fileName.indexOf("_") + 1);
										} else {
											displayName = data.description
										}
										if(fileType == 'image'){
											let src = "/uploads/"+fileName;
											return <li key={data._id}>
													<Link>
														<div className={styles.videoThubBox}>
															<img id="Image" src={src} width="100" height="100" key={fileName} onClick={this.handleImage.bind(this,{fileName, displayName},{fileType})} title={displayName}/>
														</div>
													</Link>
													<label title={displayName}>{displayName}</label>
												</li>
										}	else if(fileType == 'video'){
											let src = "/uploads/"+fileName;
											return <li key={data._id}>
													<Link>
														<div className={styles.videoThubBox}>
															<video id="video" src ={src} width="100" height="100" style={video} key={fileName} onClick={this.handleImage.bind(this,{fileName, displayName},{fileType})} title={displayName}/>
														</div>
													</Link>
													<label title={displayName}>{displayName}</label>
												</li>
										} else if (fileType == 'audio'){
											//let src = "/uploads/"+fileName;
											return <li key={data._id}>
													<Link>
														<div className={styles.videoThubBox}>
															<img id="audioImage" src ="/images/black-icons/audio-file.png" key={fileName} onClick={this.handleAudioImage.bind(this,{fileName, displayName},{fileType})} title={displayName}/>
														</div>
													</Link>
													<label title={displayName}>{displayName}</label>
												</li>
										} else if(fileType == 'link'){
											let src = "http://img.youtube.com/vi/"+data.fileName+"/1.jpg";
											let title = data.title ? data.title : 'No Name';
											return <li key={data._id}>
													<Link>
														<div className={styles.videoThubBox}>
															<div className={styles.timeDisplay}><p>{data.duration ? moment.duration(data.duration).minutes()+":"+moment.duration(data.duration).seconds() : null}</p></div>
															<img id="image" src={src} width="100" height="100" key={fileName} onClick={this.handleImage.bind(this,{fileName},{fileType})} title={title}/>
														</div>
													</Link>
													<label title={title}>{title}</label>
												</li>
										}

										// else {
										// 	return <p key={data._id}>
										//      <span>No Files Yet!...</span>
										//    </p>
										// }
									}) : <p>
										<span><FormattedMessage id = 'no_files_yet'/>...</span>
										</p>
								}
							</ul>
						</div>
					</div>
					<div className={styles.fullDottedBlock}>
						<h2><FormattedMessage id = 'documents'/></h2>
						<div className={styles.resourceList}>
							<ul>
								{
									this.props.workDashboardData && this.props.workDashboardData.topicFileData && this.props.workDashboardData.topicFileData.length > 0
								?
									this.props.workDashboardData.topicFileData.map((data) => {
										var fileName = data.fileName
										let displayName;
										if(data.description == undefined) {
											displayName = data.fileName.substring(data.fileName.indexOf("_") + 1);
										} else {
											displayName = data.description
										}
										var fileType = data.fileType
										var ext = fileName.split('.').pop()	
										var path;
										if(fileType == 'application') {
											let link = "/uploads/"+data.fileName
											let src = "/images/icons/"+ext+".png" 
											return <li key={data._id} >
												<Link id="pdfView" className={styles.fileUploadBreakWord} onClick={this.handlePdfView.bind(this, {fileId: data._id, fileName, displayName})}>
													<img src={src} />
													<span>{displayName}</span>
												</Link>
											</li>
										}else	if(fileType == 'text') {
											let link = "/uploads/"+data.fileName
											let src = "/images/icons/"+ext+".png" 
											return <li key={data._id} >
												<Link id="pdfView" className={styles.fileUploadBreakWord} onClick={this.handlePdfView.bind(this, {fileId: data._id, fileName, displayName})}>
													<img src={src} />
													<span>{displayName}</span>
												</Link>
											</li>
										}
										// else {
										// 	return <p key={data._id}>
										//      <span><FormattedMessage id = 'no_files_yet'/>...</span>
										//    </p>
										// }
									}) 
								: <li>
										<p>
											<span><FormattedMessage id = 'no_files_yet'/>...</span>
										</p>
									</li>
								}
							</ul>
						</div>
					</div>
					{/*	      <div className={styles.fullDottedBlock}>
					<h2>SCOM Files</h2>
					<div className={styles.resourceList}>
					<ul>
					{
					this.props.dashboardData.uploadData.length > 0
					?
					this.props.dashboardData.uploadData.map((data) => {
					var fileType = data.fileType	
					if(fileType == 'zip') {
					return <li key={data._id}>
					<Link>
					<span>{data.fileName}</span>
					</Link>
					</li>
					} 
					// else {
					// 	return <p key={data._id}>
					//      <span>No Files Yet!...</span>
					//    </p>
					// }
					}) : <li>
					<p>
					<span>No Files Yet!...</span>
					</p>
					</li>
					}
					</ul>
					</div>
					</div>*/}
					<div className={styles.fullDottedBlock}>
						<h2><FormattedMessage id = 'questionnaires'/></h2>
						<div className={styles.resourceList}>
							<ul>
								{
									this.props.workDashboardData && this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails.questionnaire && this.props.workDashboardData.topicContentDataDetails.questionnaire.length > 0
								?
									this.props.workDashboardData.topicContentDataDetails.questionnaire.map((data) => {
										return <li key={data._id}>
											<Link id="questionnaire" onClick={this.handleQuestionnaire.bind(this, data)}>
												<div>
													<span className={styles.questionCircleSmall}>?</span>
													<span>{data.questionnaireId.questionnaireName}</span>
												</div>
												{
													((data.openFrom == undefined && data.closeFrom == undefined) || (data.openFrom == null && data.closeFrom == null))
													?
													<div className={styles.dateTimeBlock}>
														<span className={styles.dateTime}> <span><FormattedMessage id = 'no_time_limitations'/></span> </span>
													</div>
													: <div className={styles.dateTimeBlock}>
														<span className={styles.dateTime}> <span><FormattedMessage id = 'start_time'/>: &nbsp; </span> <span><FontAwesome name="calendar"> </FontAwesome> {moment(data.openFrom).format("DD/MM/YYYY")}</span> <span className={styles.timeMrg}> <FontAwesome name="clock-o"> </FontAwesome> {moment(data.openFrom).format("hh:mm A")}</span> </span>
														<span className={styles.dateTime}> <span><FormattedMessage id = 'end_time'/>: &nbsp; </span> <span><FontAwesome name="calendar"> </FontAwesome> {moment(data.closeFrom).format("DD/MM/YYYY")}</span> <span className={styles.timeMrg}> <FontAwesome name="clock-o"> </FontAwesome> {moment(data.closeFrom).format("hh:mm A")}</span> </span>
													</div>
												}
											</Link>
										</li>
									}) 
								: <p>
										<span><FormattedMessage id ='no_questionnaires_yet'/>...</span>
									</p>
								}
							</ul>
						</div>
					</div>
					{
						(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.profile && this.props.loggedInData.data.profile.companyid && this.props.loggedInData.data.profile.companyid.businessType && this.props.loggedInData.data.profile.companyid.businessType == 'LMS')  && 
						(this.props.workDashboardData && this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails._id)
						?				
						<div className={styles.topicCompleteDiv}>
							<div className={styles.checkboxDiv}>
								<span className={styles.checkboxText}> 
									<FormattedMessage id ='i_have_completed_this_topic'/>
								</span>		
								<span className={cls_optionBlock}>
									<label>
										<input type="checkbox" id="switchCheckbox" className={cls_settingsOptions} name="onOffSwitch"  
										value={this.state.complete} onClick={this.handleMarkComplete.bind(this)}
										checked={this.state.complete} />
									</label>                
								</span>
							
							</div>
						</div>
						:null
					}
					<div className={styles.topicListBar}>
				 		<div className={styles.dropdownBar}>
				 			<div className={styles.pastTopic}>
					 			<button type="button" disabled={this.state.disablePrevBtn} onClick = {this.handlePreviousTopic.bind(this)}> 
					 				<FontAwesome className={styles.faIcons} name="chevron-left" size="lg" style={this.state.disablePrevBtn== true ? {cursor: "not-allowed",color:"rgba(0,0,0,0.28)"} : {cursor: "pointer", color: "rgba(0,0,0,0.54)" } } />
								</button>
					 		</div>
				 			<div className={styles.dropdownList}>
				 				<div className={styles.selectStyle}>
				 					<select onChange={this.handleTopicChange.bind(this)} value={this.props.workDashboardData.tid}>
									  	{
				                  			this.props.workDashboardData.topiclistData.map((data,i)=> {
				                   				return (<option key={i} value={data._id} > {data. topicName} </option>)
				                  			})
		                 	 			}
		                 	 		</select>
								</div>
				 			</div>
				 			<div className={styles.nextTopic}>
					 			<button  type="button" disabled={this.state.disableNextBtn }  onClick = {this.handleNextTopic.bind(this)}>
					 				<FontAwesome className={styles.faIcons} name="chevron-right" size="lg" style={this.state.disableNextBtn== true ? {cursor: "not-allowed",color:"rgba(0,0,0,0.28)"} : {cursor: "pointer", color: "rgba(0,0,0,0.54)" } } />
								</button>
				 			</div>
				 		</div>
			 		</div>
				</div>
								
					


				{/*<div className={styles.topicsListFooter}>
					{
						this.props.workDashboardData && this.props.workDashboardData.topicContentDataDetails && this.props.workDashboardData.topicContentDataDetails._id
							?
								
								<div className={styles.onOffSwitch}>
							    <input id="switchCheckbox" type="checkbox" name="onOffSwitch" className={styles.onOffSwitchCheckbox} id="myonOffSwitch" value={this.state.complete} onChange={this.handleMarkComplete.bind(this)} checked={!this.state.complete} />
							    <label className={styles.onOffSwitchLabel} htmlFor="myonOffSwitch">
							        <span className={styles.onOffSwitchInner}></span>
							        <span className={styles.onOffSwitchSwitch}></span>
							    </label>
							</div>
					
								
											
							: null
					}
				</div>*/}			
			</div>
		      		{showImageModal}
		      		{showAudioModal}
	      		</div>
			)
		} else {
			return(
			<Loading loadType = "list"/> 
			)
		}
	} 

	///////////////////////

	handleSelection(obj){
		if(obj.uid != this.props.workDashboardData.uid){
			if (document.createRange) {
      	let charIndex = 0, range = document.createRange();
        range.setStart(this.refs.editor, 0);
        range.collapse(true);
        let nodeStack = [this.refs.editor], node, foundStart = false, stop = false;
				while (!stop && (node = nodeStack.pop())) {
					if (node.nodeType == 3) {
						let nextCharIndex = charIndex + node.length;
						if (!foundStart && obj.start >= charIndex && obj.start <= nextCharIndex) {
							range.setStart(node, obj.start - charIndex);
							foundStart = true;
						}
						if (foundStart && obj.end >= charIndex && obj.end <= nextCharIndex) {
							range.setEnd(node, obj.end - charIndex);
							stop = true;
						}
						charIndex = nextCharIndex;
					} else {
						let i = node.childNodes.length;
						while (i--) {
							nodeStack.push(node.childNodes[i]);
						}
					}
				}
				let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.body.createTextRange) {
      	let textRange = document.body.createTextRange();
        textRange.moveToElementText(this.refs.editor);
        textRange.collapse(true);
        textRange.moveEnd("character", obj.end);
        textRange.moveStart("character", obj.start);
        textRange.select();
      }
		}		
	}

	handleTopicContSelSync = (objEntity) => {
    let obj = {
      command : 'TOPIC-CONT-SEL-SYNC',
      content : { data : objEntity },
      type : 'OBJECT'
    };
    this.props.confObject.sendMessage(obj, 0);
  }

	
	/////////////////////////
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    dashboardData: dashboardData(state),
    intl: state.intl,
    workDashboardData : workDashboardData(state),
    workDashboardReload: workDashboardReload(state),
    loggedInData: loggedInData(state)
  };
}

TopicContent.contextTypes = {
	intl: React.PropTypes.object.isRequired

};

TopicContent.propTypes = {
  intl: PropTypes.object,
  workDashboardData: PropTypes.object  
};

export default connect(mapStateToProps)(TopicContent);




/*<small className={styles.smallTxt}>Uncompleted</small>
									<input id="comTog" className={cmnToggle} type="checkbox" value={this.state.complete} onChange={this.handleMarkComplete.bind(this)} checked={this.state.complete}/>
									<label htmlFor="comTog"></label>
								<small className={styles.smallTxt}>Completed</small>*/
