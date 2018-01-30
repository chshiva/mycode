import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import { Link, browserHistory } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Carousel, Modal} from 'react-bootstrap';
import styles from '../../Dashboard.css';
import { connect } from 'react-redux';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import moment from 'moment';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, updateAssignmentData, deleteAssignmentSubmittedFile} from './WorkDashboardActions';
import Loading from '../../../App/components/Loading';
var _ = require('lodash');


class AssignmentContent extends Component{

	constructor(props) {
		super(props)

		this.imageData = {};
		this.quill = false;
		this.handleSelection = this.handleSelection.bind(this);
		this.props.confObject.AssignmentContentSelectListener(this.handleSelection);
		this.setDeleteResponse = this.setDeleteResponse.bind(this)
		this.state = {
			fileName : '',
			uploadFile : true,
			loading : false
		};
		this.resultData = []
	}

	componentDidMount() {
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
    this.quill.setContents(this.props.workDashboardData.assignmentContentData.content); 
    if(this.props.workDashboardData.assignmentContentData && this.props.workDashboardData.assignmentContentData.submissions.length > 0) {    	
    	var student = _.find(this.props.workDashboardData.assignmentContentData.submissions, ['studentId', this.props.workDashboardData.uid]);
    	if(student != undefined) {
    		//Changes made by prateek for bug#3111
    		// this.resultData = this.props.workDashboardData.assignmentContentData.submissions[0].result;
    		this.resultData = student.result;
	    	this.setState({
	    		// fileName : this.props.workDashboardData.assignmentContentData.submissions[0].fileName
	    		fileName : student.fileName,
	    		uploadFile : false
	    	})
	    }
    }
  }

  handleAssignmentList() {
		this.props.assignmentListCallback();
		let obj = {current : 'assignmentList', assignmentContent: false, assignmentList : true, assignmentContentData : null, assignmentContentIndex : null};
		this.handleWorkDashboard(obj);
	}

	handleWorkDashboard = (obj) => {
		this.props.imHost == true && this.props.workDashboardData.sync == true ?
    		this.props.syncCallback(obj)
		: this.props.dispatch(setWorkDashboard(obj));
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
		    this.handleAssignmentContSelSync(obj);
		  }
		}
	}

	selectHandler() {
		this.setSelector();		
	}

	handleUpload = (e) => {
    //console.log(e.target)
    var reader = new FileReader();
    var file = e.target.files[0];
    // console.log(file.type.substring(0, file.type.indexOf("/")) );
    if (!file){
      return;
    } else if (file.size>20971520) {

      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.topic_file_alert, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
      return;
		} else if (file.type.substring(0, file.type.indexOf("/")) != 'application' && file.type.substring(0, file.type.indexOf("/")) != 'text') {
      alertify.alert(this.props.intl.messages.warning,this.props.intl.messages.invalid_file_format, 
        function() {
        }
      ).setting({'label': this.props.intl.messages.ok});
      return;
    } 
    //console.log(file)
    let that = this;
    reader.onload = function(img) {    	
      //console.log(img)
      let dataURI = img.target.result;
      //console.log('dataURI')
      this.imageData["file"] = dataURI.split(',')[1];
      this.imageData["fileName"] = file.name;
      this.imageData["fileSize"] = file.size;
      // console.log(file.type)
      if(file.type == 'application/zip'){
        this.imageData["fileType"] = 'zip'
      }else{
        this.imageData["fileType"] = file.type.substring(0, file.type.indexOf("/"))
      }
      let data = this.imageData;
      this.saveFile(data);   
    }.bind(this);
    reader.readAsDataURL(file);
  }

  saveFile(obj) {
    obj['roomId'] = this.props.workDashboardData.assignmentContentData.roomId,
    obj['studentId'] = this.props.workDashboardData.uid,
    obj['assignmentId'] = this.props.workDashboardData.assignmentContentData._id

    //code added by - Najib, set spinner while uploading file
    this.setState({loading : true});
    let data = obj;
    // console.log("sent data -- ", data);
    let url = "/api/upload-assignment-submission";
    let self =  this;
    FileAPI.upload({
      data,
      url,
      complete:function(err,res) {
        //console.log(err)
        let resData = JSON.parse(res.response);
        if(err) {
          console.log("err---",err);
          self.setState({ uploadFile : true });
          alertify.alert("Error", resData.error, function (result) { } );
        } else {
        	// console.log("res data --- ", res);

          if(resData.status) {
	          let obj = { current : 'assignmentList', assignmentContent: true, assignmentList : false, assignmentContentData : resData.data};
						self.handleWorkDashboard(obj);
						let student = _.find(resData.data.submissions, ['studentId', self.props.workDashboardData.uid]);
	    			if(student != undefined) {
		          self.setState({
				    		fileName : student.fileName,
				    		uploadFile : false
				    	})
		        }
		        var arr = self.props.workDashboardData.assignmentData;

						// Replace item at index using native splice
						arr.splice(self.props.workDashboardData.assignmentContentIndex, 1, resData.data);
						self.props.dispatch(updateAssignmentData(arr));
						self.setState({loading : false });
					} else {
          	// console.log("submittion failed---", resData.error);

          	//code added by - Najib, un setting spinner when uploading done
            self.setState({ uploadFile : true, loading : false });
	          alertify.alert("Error", resData.error, function (result) { } );
          }
        }
      }
    });
  }

  deleteAssignment=(e)=>{
    var id = e.currentTarget.id;
    var props = this.props;    
    var response = this.setDeleteResponse

    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_file_alert, 
      function (result) {
        if(result) {          
          let obj = {
            roomId : props.workDashboardData.assignmentContentData.roomId,
            assignmentId : props.workDashboardData.assignmentContentData._id
          }
          props.dispatch(deleteAssignmentSubmittedFile(obj)).then(res => response(res)); 
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});    
  }

  setDeleteResponse(res) {
  	if(res.status == true) {
  		this.setState({
	      fileName: '',
	      uploadFile: true
	    })
	    let obj = { current : 'assignmentList', assignmentContent: true, assignmentList : false, assignmentContentData : res.data};
			this.handleWorkDashboard(obj);
			var arr = this.props.workDashboardData.assignmentData;

			// Replace item at index using native splice
			arr.splice(this.props.workDashboardData.assignmentContentIndex, 1, res.data);
			this.props.dispatch(updateAssignmentData(arr))
  	}
  }

  handlePdfView() {

  }

  viewUser() {
  	if(!this.props.isGuest) {
  		browserHistory.push('/profile/'+this.props.workDashboardData.assignmentContentData.createdBy._id)	
  	}    
  }

  handleResult = () => {
  	let roomId = this.props.workDashboardData.assignmentContentData.roomId;
  	let assignmentId = this.props.workDashboardData.assignmentContentData._id;
  	browserHistory.push('/course/assignment-report-view/'+roomId+'/'+assignmentId)
  }

	render() {

    let cls_areaTabs = `clearfix ${styles.presenterTabs}`;
    let cls_topicAuthor = `clearfix ${styles.topicAuthor}`;
    let cls_authorsBox = `clearfix ${styles.authorsBox}`;
    let cls_topicViewFlex = `${styles.topicViewheader} ${styles.topicViewFlex}`;

    var link = "/uploads/"+this.state.fileName;
    if(this.props.workDashboardData && this.props.workDashboardData.assignmentContentData && this.props.workDashboardData.assignmentContentData.uploadData) {
	    var fileName = this.props.workDashboardData.assignmentContentData.uploadData.fileName
			var displayName;
			displayName = fileName.substring(fileName.indexOf("_") + 1);
			var fileType = this.props.workDashboardData.assignmentContentData.uploadData.fileType
			var ext = fileName.split('.').pop()	
			var src = "/images/icons/"+ext+".png" 
			var downloadLink = "/uploads/"+fileName;
    }
    let data = this.props.workDashboardData.assignmentContentData
    let profileImage = data ? data.createdBy ? data.createdBy.profile ? data.createdBy.profile.profileImage:'':'':''
    if(profileImage == '' || profileImage == undefined || profileImage == null) {
      var imagePath = '/images/profile-pics/defaultStudent.jpg'
    } else {
      var imagePath = '/uploads/'+profileImage
    }

    let loadType = 'upload';

		return (
			<div>
				<div className={styles.whiteCard}>
					<div className={styles.breadCrum}>
						<ul>
							<li>
								<Link id="roomName"><span>{this.props.roomName}</span></Link>
							</li>
							<li><span>/</span></li>
							<li>
								<Link id="assignmentList" onClick={this.handleAssignmentList.bind(this)}><span><FormattedMessage id ="assignment_list"/></span></Link>
							</li>
							<li><span>/</span></li>
							<li><span>{this.props.workDashboardData.assignmentContentData.assignmentName}</span></li>
						</ul>
					</div>
					<div className={cls_topicViewFlex}>
						<div className={styles.AssignResult1} >
							<h1 className={styles.mainHeadingTxt} maxLength={50}>{this.props.workDashboardData.assignmentContentData.assignmentName}</h1>
						</div>
						{this.resultData.length>0
						?
						<div className={styles.AssignResult2} >
							<button id="viewResult" className={styles.btnApplyAll} onClick={this.handleResult}>View Result</button>
						</div>
						:null}
					</div>
					<div className={styles.topicsListBody}>
						<div className={cls_authorsBox}>
							<span className={styles.hrzlList}>
								<div className={cls_topicAuthor}>
									<img id="viewprofile" src={imagePath} onClick={this.viewUser.bind(this)} title={this.props.intl.messages.viewprofile} />
									<div className={styles.authorInfo}>
										<p className={styles.authorName}>{this.props.workDashboardData.assignmentContentData.createdBy.firstname} {this.props.workDashboardData.assignmentContentData.createdBy.lastname}</p>
										<p className={styles.authorDisg}><FormattedMessage id = 'author'/></p>
									</div>
								</div>
							</span>
						</div>
						<div className={styles.fullDottedBlock}>
							<h3><FormattedMessage id = 'description'/></h3>
							<div ref="editor" onMouseUp={this.selectHandler.bind(this)}></div>
						</div>
						<div className={styles.fullDottedBlock}>
							<h2><FormattedMessage id = 'documents'/></h2>
							<div className={styles.resourceList}>
								<ul>
									{
										this.props.workDashboardData.assignmentContentData.uploadData
										?
										fileType != 'link'
										?	
											<li>
												<a id="download" className={styles.fileUploadBreakWord} href={downloadLink} download>
													<img src={src} />
													<span>{displayName}</span>
												</a>
											</li>
										: null
									: <li>
											<p>
												<span><FormattedMessage id = 'no_files_yet'/>...</span>
											</p>
										</li>
									}
								</ul>
							</div>
						</div>
						{this.state.loading ?
							<Loading loadType = {loadType} /> :
						<div className={styles.fullDottedBlock}>
							{
								this.state.uploadFile
								?
								<div className= {styles.uploadAssignmentblock}>
		              <label className={styles.btnApplyAll}>
		                <input id="uploadAssignment" type="file" accept=".doc, .docx, .ppt, .pptx, .pdf" className = {styles.uploadAssignmentButton} onChange={this.handleUpload.bind(this)} value={''}/>
		                Upload Assignment
		              </label>
		              <span className={styles.msgFileTypes} >
                      <span className={styles.msgFileNote} >Note : </span> Supported file types are .xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf, .odp, .ods
                  </span>
		            </div>
								: 
								<div>
									<p>Assignment Submitted</p>
									<a id="downloadAssignment" className={styles.fileUploadBreakWord} href={link} download>{this.state.fileName.substring(this.state.fileName.indexOf("_") + 1)}</a>
									<span id="deleteAssignment" className={styles.deleteAssignmentButton} onClick={this.deleteAssignment.bind(this)}><FontAwesome name="times"/></span>
								</div>
							}
						</div>
						}
					</div>
				</div>
      </div>
		)
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

	handleAssignmentContSelSync = (objEntity) => {
    let obj = {
      command : 'ASSIGNMENT-CONT-SEL-SYNC',
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
    intl: state.intl,
    workDashboardData : workDashboardData(state)
  };
}

AssignmentContent.contextTypes = {
	intl: React.PropTypes.object.isRequired

};

AssignmentContent.propTypes = {
  intl: PropTypes.object,
  workDashboardData: PropTypes.object  
};

export default connect(mapStateToProps)(AssignmentContent);