import React, { PropTypes, Component } from 'react';
import { Col, Row, Grid, Carousel } from 'react-bootstrap';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { Roles } from '../../../../roles';
import styles from '../../Dashboard.css';
import PdfView from './PdfView';
import { connect } from 'react-redux';
import { workDashboardData } from './WorkDashboardReducer';
import { setWorkDashboard, closeSharedDocument } from './WorkDashboardActions';
import { loggedInData } from '../../../Login/LoginReducer';
import Loading from '../../../App/components/Loading';
import callApi from '../../../../util/apiCaller';
import WoogeenManager from '../../../Communication/WoogeenManager';


class ScreenShare extends Component {
	constructor(props) {
		super(props);
		this.imageData = {}
		this.state = {
			showBecomeHost: false,
			requestStatus: false,
			loading: true
			// screenplay: true
		}
		this.confObject = new WoogeenManager();
		this.showScreen = false;
		this.HandleSyncPdfClose = this.HandleSyncPdfClose.bind(this);
		this.confObject.SyncPdfCloseListener(this.HandleSyncPdfClose);
	}

	componentDidMount() {
		let obj = {};
		if (this.props.workDashboardData.ssPdfView == true) {
			obj = { showButtons: false };
		}
		this.props.dispatch(setWorkDashboard(obj));
		var that = this;
		// console.log("chrome === ", chrome);
		if (typeof (chrome) !== "undefined") {
			try {
				chrome.runtime.sendMessage('jckdbnkecmmpemaghimijhehobdeplmd', { getStream: false }, function (response) {
					console.log("chrome response === ", response);
					if (response !== undefined)
						that.props.dispatch(setWorkDashboard({ ScreenExtInstalled: true }));
				});
			} catch (error) {
				this.props.dispatch(setWorkDashboard({ ScreenExtInstalled: false }));
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		var that = this;
		console.log("Screen Received", nextProps.screenStream);
		if (nextProps.screenStream) {
			if (!nextProps.screenStream.showing && this.confObject.getSubscrbedStream() == null) {
				this.confObject.trySubscribeStream(nextProps.screenStream, function (stream) {
					// console.log("Screen try to show");
					that.props.dispatch(setWorkDashboard({ showButtons: false }));
					stream.show('screen');
					that.confObject.setSubscribedScreen(stream);
					that.showScreen = true;
				});
			} else {
				if (!this.showScreen) {
					if (this.confObject.getSubscrbedStream() != null) {
						this.props.dispatch(setWorkDashboard({ showButtons: false }));
						this.confObject.getSubscrbedStream().show('screen');
						this.showScreen = true;
					}
				}
			}
		}
	}

	componentWillUnmount() {
		if (this.confObject.getSubscrbedStream() != null) {
			this.confObject.getSubscrbedStream().hide();
			this.showScreen = false;
		}
	}

	shareScreen() {
		if (this.props.imHost || (this.props.workDashboardData.shareRequestId && this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid)) {
			if (!this.props.workDashboardData.ScreenExtInstalled && typeof (chrome) !== "undefined") {
				let that = this;
				try {
					chrome.webstore.install('https://chrome.google.com/webstore/detail/jckdbnkecmmpemaghimijhehobdeplmd',
						function (e) {
							that.props.dispatch(setWorkDashboard({ ScreenExtInstalled: true }));
							that.confObject.screenShare(function (stats) {
								that.props.dispatch(setWorkDashboard({ showButtons: false, selfShare: true }));
							}, function (status) {

							});
						},
						function (e) {
							window.open(
								'https://chrome.google.com/webstore/detail/instavc-desktop-sharing-e/jckdbnkecmmpemaghimijhehobdeplmd',
								'_blank' // <- This is what makes it open in a new window.
							);
							console.log(e);
						});
				} catch (error) {

				}
			} else {
				let that = this;
				this.confObject.screenShare(function (stats) {
					that.props.dispatch(setWorkDashboard({ showButtons: false, selfShare: true }));
				}, function (status) {

				});
			}
		} else {
			this.highlightBecomHost();
		}
	}

	handleUpload = (e) => {
		this.setState({ showBecomeHost: false });
		//console.log(e.target)
		var reader = new FileReader();
		var file = e.target.files[0];
		if (!file) {
			return;
		} else if (file.size > 10485760) {
			alertify.alert(this.props.intl.messages.warning, this.props.intl.messages.share_file_alert,
				function () {
				}
			).setting({ 'label': this.props.intl.messages.ok });
			return;
		} else if (file.type.substring(0, file.type.indexOf("/")) != 'application') {
			alertify.alert(this.props.intl.messages.warning, this.props.intl.messages.invalid_file_format,
				function () {
				}
			).setting({ 'label': this.props.intl.messages.ok });
			return;
		}
		//console.log(file)
		reader.onload = function (img) {
			//console.log(img)
			let dataURI = img.target.result;
			//console.log('dataURI')
			this.imageData["file"] = dataURI.split(',')[1];
			this.imageData["fileName"] = file.name;
			this.imageData["fileSize"] = file.size;
			// console.log(file.type)
			if (file.type == 'application/zip') {
				this.imageData["fileType"] = 'zip'
			} else {
				this.imageData["fileType"] = file.type.substring(0, file.type.indexOf("/"))
			}
			let data = this.imageData;
			this.saveFile(data);
		}.bind(this);
		reader.readAsDataURL(file);
	}

	highlightBecomHost = () => {
		/*console.log("highlightBecomHost");*/
		this.setState({ showBecomeHost: true });
	}

	saveFile(obj) {
		if (this.props.workDashboardData.waitforview != true) {
			this.props.updateSS({ waitforview: true });
			this.setState({ loading: false });
			let data = obj;
			let url = "/api/upload-sharing-document";
			let self = this;
			FileAPI.upload({
				data,
				url,
				complete: function (err, res) {
					self.setState({ loading: true })

					//console.log(err)
					// console.log(data, err);
					if (err) {
						console.log("err---", err);
						self.props.fileStatusCallback({ filestatus: false });
						self.props.updateSS({ waitforview: false });
						alertify.alert("Error", err, function (result) { });
					} else {
						let data = JSON.parse(res.response);
						if (data && data.status && data.data) {
							let resData = data.data;
							delete resData['status'];
	          	/*callApi('convert-to-pdf', 'post', { data : resData }).then(res => {
	          		if (res.status) {
	          			self.props.fileStatusCallback({filestatus: 'completed'});
	          		} else {
	          			console.log("res.error === ", res.error);
	          			self.props.fileStatusCallback({filestatus: false, fileData: null});
	          			self.props.updateSS({ waitforview : false });
	          			alertify.alert("Error", res.error, function (result) { } );
	          		}
	          	});
	          	self.props.fileStatusCallback({filestatus : 'loading', fileData: resData});*/
							self.props.fileStatusCallback({ filestatus: 'completed', fileData: resData });
						} else if (data.error) {
							console.log("data.error === ", data.error);
							self.props.fileStatusCallback({ filestatus: false });
							self.props.updateSS({ waitforview: false });
							alertify.alert("Error", data.error, function (result) { });
						} else {
							self.props.fileStatusCallback({ filestatus: false });
							self.props.updateSS({ waitforview: false });
							alertify.alert("Error", "Internal server error", function (result) { });
						}
					}
				}
			});
		} else {
			alertify.alert("Warning", "Some one trying to share please wait...", function (result) { });
		}
	}

	viewfile = () => {
		this.props.updateSS({ waitforview: false, ssPdfView: true, showButtons: false, ssUploadedby: this.props.loggedInData.data._id, pdfFileName: this.props.workDashboardData.fileData.fileName });
		this.props.fileStatusCallback({ filestatus: false, fileData: null });
	}

	abortfile = () => {
		closeSharedDocument(this.props.workDashboardData.fileData.fileName);
		this.props.updateSS({ waitforview: false });
		this.props.fileStatusCallback({ filestatus: false, fileData: null });
	}

	handleShareRequest = () => {
		if (!this.props.workDashboardData.shareRequestId && this.props.workDashboardData.shareRequestId == "") {
			let data = this.props.loggedInData.data;
			this.props.dispatch(setWorkDashboard({ shareRequestId: 'REQUESTED' }));
			let obj = {
				command: 'REQ-SHARE',
				content: { id: data._id, firstname: data.firstname },
				type: 'OBJECT'
			};
			this.confObject.requestScreenShareAccess(obj);
		}
	}

	closePdfCallback = (objEntity) => {
		if (this.props.imHost == true || (this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid)) {
			objEntity['showButtons'] = true;
			objEntity['ssNotification'] = false;
			closeSharedDocument(objEntity.fileName);
			this.syncPdfClose(objEntity);
		} else
			this.props.dispatch(setWorkDashboard(objEntity));
	}

	stopScreenShare = () => {
		console.log("stopScreenShare enter");
		this.confObject.stopScreenShare();
	}

	pauseScreenShare = () => {
		console.log("pauseScreenShare enter");
		// this.setState({ screenplay: false });
		this.confObject.pauseScreenShare();
		let objEntity = {
			screenplay: false
		}
		this.props.dispatch(setWorkDashboard(objEntity));
	}

	playScreenShare = () => {
		console.log("playScreenShare enter");
		// this.setState({ screenplay: true });
		this.confObject.playScreenShare();
		let objEntity = {
			screenplay: true
		}
		this.props.dispatch(setWorkDashboard(objEntity));
	}

	render() {
		let screenClass = `${styles.screenShare} ${styles.screen}`;
		let cls_hide_screenshare = `${styles.screenShareBlock} hidden-xs hidden-sm`;

		if (this.props.workDashboardData.showButtons || this.props.workDashboardData.selfShare) {
			screenClass = `${styles.hideObject} ${styles.screen}`;
		}
		let cls_becomehost = {
			color: "#d62626"
		}

		return (
			<div className={styles.whiteBoardContainer}>
				{this.state.loading ?
					(this.props.workDashboardData.ssPdfView && this.props.hostId != ''?
						<PdfView fileName={this.props.workDashboardData.pdfFileName} imHost={this.props.imHost == true || this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid ? true : false} confObject={this.confObject} closeCallback={this.closePdfCallback} hostId={this.props.hostId}/>
						: (this.props.workDashboardData.showButtons ?
							<div className={styles.centerAlign}>
								<div className={styles.msgBlock}>
									<Row>
										<Col md={12}>
											{(this.props.role == Roles.Student ?
												(this.props.workDashboardData.shareRequestId && this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid ?
													<p className={styles.textHeading}><FormattedMessage id='share_your_screen_document' /> </p>
													: (this.props.workDashboardData.shareRequestId == 'REQUESTED' ?
														<p className={styles.textHeading}> <FormattedMessage id='requested_for_share_document_please_wait' /> </p>
														: <p className={styles.textHeading}> <FormattedMessage id='request_for_share_document' /><a id="shareDocumentRequest" style={this.state.showBecomeHost ? cls_becomehost : null} onClick={this.handleShareRequest}> Click Here</a> </p>
													)
												)
												: (this.props.role == Roles.Admin || this.props.role == Roles.Moderator || this.props.role == Roles.User) && !this.props.imHost ?
													(this.props.workDashboardData.shareRequestId && this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid ?
														<p className={styles.textHeading}><FormattedMessage id='share_your_screen_document' /> </p>
														: (this.props.workDashboardData.shareRequestId == 'REQUESTED' ?
															<p className={styles.textHeading}> <FormattedMessage id='requested_for_share_document_please_wait' /> </p>
															: <p className={styles.textHeading} style={this.state.showBecomeHost ? cls_becomehost : null}> <FormattedMessage id='become_a_host' /> OR <a id="becomeHost" style={this.state.showBecomeHost ? cls_becomehost : null} onClick={this.handleShareRequest}> <FormattedMessage id='request_access_share' /></a> </p>
														)
													)
													: <p className={styles.textHeading} style={this.state.showBecomeHost ? cls_becomehost : null}>{this.props.imHost == false ? <FormattedMessage id='become_host_to_access_bellow_features' /> : null}</p>)
											}
										</Col>
									</Row>
									<div className={cls_hide_screenshare}>
										<div id="shareYourScreen" className={styles.screenShareBtn} title={this.props.intl.messages.share_your_screen} onClick={this.shareScreen.bind(this)}>
											<img src="/images/white-icons/white-screen-share.png" title={this.props.intl.messages.share_your_screen} />
										</div>
										<p><FormattedMessage id='share_your_screen' /></p>
									</div>
									{(this.props.imHost || (this.props.workDashboardData.shareRequestId && this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid))
										? (this.props.workDashboardData.filestatus == 'loading' || this.props.workDashboardData.filestatus == 'completed' ?
											<div className={styles.screenShareBlock}>
												<div className={styles.screenShareDisableBtn} title={this.props.intl.messages.share_your_document}>
													<img src="/images/white-icons/white-documents-sharing.png" title={this.props.intl.messages.share_your_document} />
												</div>
												<p><FormattedMessage id='share_your_document' /></p>
											</div>
											: (this.props.workDashboardData.waitforview == true ?
												<div className={styles.screenShareBlock}>
													<div className={styles.screenShareDisableBtn} title={this.props.intl.messages.share_your_document}>
														<img src="/images/white-icons/white-documents-sharing.png" title={this.props.intl.messages.share_your_document} />
													</div>
													<p><FormattedMessage id='share_your_document' /></p>
												</div>
												:
												<div className={styles.screenShareBlock}>
													<div className={styles.screenShareBtn} title={this.props.intl.messages.share_your_document}>
														<input id="inputShareDoc" className={styles.documentShareBtn} type="file" accept=".doc, .docx, .ppt, .pptx, .pdf" onChange={this.handleUpload.bind(this)} value={''} />
														<img src="/images/white-icons/white-documents-sharing.png" title={this.props.intl.messages.share_your_document} />
													</div>
													<p><FormattedMessage id='share_your_document' /></p>
												</div>
											)
										)
										: (<div className={styles.screenShareBlock}>
											<div id="shareDocument" className={styles.screenShareBtn} title={this.props.intl.messages.share_your_document} onClick={this.highlightBecomHost}>
												<img src="/images/white-icons/white-documents-sharing.png" title={this.props.intl.messages.share_your_document} />
											</div>
											<p><FormattedMessage id='share_your_document' /></p>
										</div>)
									}
									{((this.props.imHost || (this.props.workDashboardData.shareRequestId && this.props.workDashboardData.shareRequestId != "" && this.props.workDashboardData.shareRequestId == this.props.workDashboardData.uid)) && this.props.workDashboardData.filestatus != false) ?
										<div className={styles.loadMsg}>
											<div className={styles.listBox}>
												<div className={styles.iconType}>
													{this.props.workDashboardData.fileData.fileExt == "doc" ?
														<img src="/images/icons/doc.png" />
														: (this.props.workDashboardData.fileData.fileExt == "docx" ?
															<img src="/images/icons/docx.png" />
															: (this.props.workDashboardData.fileData.fileExt == "ppt" || this.props.workDashboardData.fileData.fileExt == "pptx" ?
																<img src="/images/icons/ppt.png" />
																: <img src="/images/icons/pdf.png" />
															)
														)
													}
												</div>
												<div className={styles.fileInfo}>
													<h3>{this.props.workDashboardData.fileData.fileName.substring(this.props.workDashboardData.fileData.fileName.indexOf("_") + 1, this.props.workDashboardData.fileData.fileName.length)}</h3>
													<p><i>{Math.round(this.props.workDashboardData.fileData.fileSize / 1000)} KB</i></p>
												</div>
												<div className={styles.actionButtons}>
													{this.props.workDashboardData.filestatus == 'loading' ?
														<div className={styles.loadIconBox}>
															<div className={styles.loadingTxt}> loading... </div>
															<span id="abortFile" className={styles.clickIcon} onClick={this.abortfile}>
																{/*<FontAwesome name="times" size='1x' />*/}
																<img src="/images/black-icons/delete-black.png" />
															</span>
														</div>
														: (this.props.workDashboardData.filestatus == 'completed' ?
															<div className={styles.loadIconBox}>
																<button id="viewFile" className={styles.viewBtn} onClick={this.viewfile}>View</button>
																<span id="abortFile" className={styles.clickIcon} onClick={this.abortfile}>
																	{/*<FontAwesome name="trash" size='1x' />*/}
																	<img src="/images/black-icons/delete-box-black.png" />
																</span>
															</div>
															: null)
													}
												</div>
											</div>
										</div>
										: null}
									<div>
										<span className={styles.msgFileNote} > <FormattedMessage id='note' />: </span>
										<span><FormattedMessage id='share_file_alert' /></span>
									</div>
								</div>
							</div>
							: (this.props.workDashboardData.selfShare ?
								<div className={styles.centerAlign}>
									<div className={styles.screenShareBlock}>
										<div id="stopScreenShareBtn" className={styles.screenShareBtn1} title={this.props.intl.messages.stop_screen_share} onClick={this.stopScreenShare}>
											<img src="/images/white-icons/white-stop.png" title={this.props.intl.messages.stop_screen_share} />
										</div>
										<p>{/*<FormattedMessage id ='you_are_sharing_your_screens'/>*/}</p>
									</div>
									{this.props.workDashboardData.screenplay ?
										<div className={styles.screenShareBlock}>
											<div className={styles.screenShareBtn1} style={{ backgroundColor: "#ff0000 !important" }} title={this.props.intl.messages.pause_screen_share}>
												<img src="/images/white-icons/white-pause.png" title={this.props.intl.messages.pause_screen_share} onClick={this.pauseScreenShare} />
											</div>
											<p>{/*<FormattedMessage id ='you_are_sharing_your_screens'/>*/}</p>
										</div>
										: <div className={styles.screenShareBlock}>
											<div id="playScreenShare" className={styles.screenShareBtn1} title={this.props.intl.messages.play_screen_share}>
												<img src="/images/white-icons/white-play.png" title={this.props.intl.messages.play_screen_share} onClick={this.playScreenShare}/>
											</div>
											<p>{/*<FormattedMessage id ='you_are_sharing_your_screens'/>*/}</p>
										</div>
									}
								</div>
								: null
							)
						)
					)
					: <div className={styles.loadScreenConf} >
						<Loading />
					</div>
				}
				{this.props.workDashboardData.ssPdfView != true ?
					<div id="screen" className={screenClass}>

					</div>
					: null}
			</div>
		);
	}



	///////////////////////////

	HandleSyncPdfClose(obj) {
		this.props.dispatch(setWorkDashboard(obj));
	}

	syncPdfClose = (objEntity) => {
		let obj = {
			command: 'SYNC-PDF-CLOSE',
			content: { data: objEntity },
			type: 'OBJECT'
		};
		this.confObject.sendMessage(obj, 0);
	}

	////////////////////////////
}

// Retrieve data from store as props
function mapStateToProps(state) {
	return {
		workDashboardData: workDashboardData(state),
		loggedInData: loggedInData(state),
		intl: state.intl,
	};
}

ScreenShare.propTypes = {
	intl: PropTypes.object,
	confObject: PropTypes.object,
	screenStream: PropTypes.object,
	imHost: PropTypes.bool,
	workDashboardData: PropTypes.object,
	loggedInData: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(ScreenShare);