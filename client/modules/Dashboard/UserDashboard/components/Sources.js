import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import callApi from '../../../../util/apiCaller';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import ControlVideo from './ControlVideo';

import { setVideoResolution } from '../../../Communication/ConferenceActions';
import { conferenceDetails } from '../../../Communication/ConferenceReducer';
import { statsDetails } from '../../../Communication/StatsReducer';

import styles from '../../Dashboard.css';

import WoogeenManager from '../../../Communication/WoogeenManager';

var _ = require('lodash');

export class Sources extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	resolution: 'vga'
    }
  }

  componentDidMount() {
  	this.setState({ resolution: this.props.conferenceDetails.videoResolution });
  }

  componentWillReceiveProps(nextProps) {
  	if (nextProps.conferenceDetails.videoResolution != this.state.resolution) {
  		this.setState({ resolution: nextProps.conferenceDetails.videoResolution });
  	}
  }

  applydevice(e){
  	// console.log(e.currentTarget, e);
  	var cameraId = ReactDOM.findDOMNode(this.refs["objCameraList"]).value;
  	
  	var audioId = ReactDOM.findDOMNode(this.refs["objAudioList"]).value;

  	this.props.confObject.applyDevices({camera: cameraId, audio: audioId});

  	this.props.flipfunc();
  }

  applyres(res){
  	this.setState({resolution: res})
  	// console.log("Resolution", res);
  }

  applyresolution(){
	this.props.confObject.applyResolution(this.state.resolution);
	this.props.dispatch(setVideoResolution(this.state.resolution));
	this.props.flipfunc();
  }

  addcamera(){
  	var cameraId = ReactDOM.findDOMNode(this.refs["objCameraList"]).value;
  	
  	var audioId = ReactDOM.findDOMNode(this.refs["objAudioList"]).value;

  	this.props.confObject.createAdditionalCamera(cameraId, audioId);
  	this.props.flipfunc();
  }

  cancelaction(){
  	this.props.flipfunc();	
  }

  render(){
  	console.log("DEVICES", this.props.cameraDevices, this.props.audioIn);
  	let cls_camResolutionBlock 	= `${styles.camResolutionBlock} clearfix`;
  	let cls_chooseInput			= `${styles.chooseInput} ${styles.radio}`;
  	let cls_reportItems			= `${styles.reportItems} clearfix`;
    return (
		<div className={styles.controllerBock}>
			<div className={styles.tabContainer}>
				<div className={styles.emptyFill}></div>
				<input id="vc_source" type="radio" name="tabs" defaultChecked />
				<label htmlFor="vc_source"><i className="fa fa-code"></i><span><FormattedMessage id='sources' /></span></label>

				<input id="vc_cr" type="radio" name="tabs" />
				<label htmlFor="vc_cr"><i className="fa fa-video-camera"></i> <span><FormattedMessage id='resolutions' /></span></label>

				{/*<input id="vc_bandwidth" type="radio" name="tabs" />
								<label htmlFor="vc_bandwidth"><i className="fa fa-tachometer"></i><span> Bandwidth</span></label>
				
								<input id="vc_reports" type="radio" name="tabs" />
								<label htmlFor="vc_reports"><i className="fa fa-folder-open-o"></i><span> Reports</span></label>
				*/}
				<div className={`${styles.tabContent} ${styles.contentSource}`} id="contentSource">
					<form className={styles.controllerForm}>
					  <div className={styles.formGroup}>
							<label className={styles.formGroupLabel}><FormattedMessage id='camera' /> : </label>
					  	<select ref="objCameraList" className={styles.formControl}>
					  		{
					  			this.props.cameraDevices.map(function(devices){
					  				return (<option key={devices[0]} value={devices[0]}>{devices[1]}</option>)
					  			})
					  		}
		          		</select>
					  </div>
					  {/*<div className={styles.formGroup}>
	  					  	<label className={styles.formGroupLabel}>Volume : </label>
	  					  	<span className={styles.lspanCgrl}>
	  					  	<i className="fa fa-volume-off"></i> off</span>
	  					  	<input type="range" defaultValue="5" className={styles.rangeSlider} /><span className="lspanCgrl"><i className="fa fa-volume-up"></i> Max</span>
	  					  </div>*/
	  					}
					  <div className={styles.formGroup}>
							<label className={styles.formGroupLabel}><FormattedMessage id='Audio_Inputs' /> : </label>
					  		<select ref="objAudioList" className={styles.formControl}>
			            		{
						  			this.props.audioIn.map(function(devices){
						  				return (<option key={devices[0]} value={devices[0]}>{devices[1]}</option>)
						  			})
						  		}
		          			</select>
					  </div>
					  {/*<div className={styles.formGroup}>
  					  	<label className={styles.formGroupLabel}>Audio Outputs : </label>
  					  	<select className={styles.formControl}>
  		            		{
  					  			this.props.audioOut.map(function(devices){
  					  				return (<option key={devices[0]} value={devices[0]}>{devices[1]}</option>)
  					  			})
  					  		}
  		          		</select>
  					  </div>*/}

					  <div className={styles.formGropBottom}>
							<button type="button" onClick={this.cancelaction.bind(this)} className="btn btn-xs btn-danger"><i className="fa fa-times"></i> <FormattedMessage id='close' /></button>
							&nbsp;<button type="button" className="btn btn-xs btn-success" onClick={this.applydevice.bind(this)}><i className="fa fa-check"></i> <FormattedMessage id='apply' /></button>
					  	&nbsp;
					  	{
					  		(this.props.imHost) ? 
									<button type="button" onClick={this.addcamera.bind(this)} className="btn btn-xs btn-danger"><i className="fa fa-plus"></i> <FormattedMessage id='add' /></button>
					  	: null }
					  </div>
					</form>
				</div>
				<div className={`${styles.tabContent} ${styles.contentCameraResolution}`} id="contentCameraResolution">
					<form className={styles.controllerForm}>
						<div className={styles.cameraSettingBlock}>
							<ul>
								<li>
									<div className={cls_camResolutionBlock}>
										<div className={styles.cameraInfo}>
											<h3>SIF - (320 x 240)
											<p>For SIF Video Resolution</p>
											</h3>
										</div>
										<div className={styles.selectRadioBlock}>
											<label>
												<input onChange={this.applyres.bind(this, 'sif')} type="radio" className={cls_chooseInput} value="sif" name="objResolution" checked={this.state.resolution == 'sif' ? true : false} /> 
											</label>
										</div>
									</div>
								</li>
								<li>
									<div className={cls_camResolutionBlock}>
										<div className={styles.cameraInfo}>
											<h3>VGA - (640x480)
											<p>For Video Graphics Array (VGA) Video Resolution</p>
											</h3>
										</div>
										<div className={styles.selectRadioBlock}>
											<label>
												<input onChange={this.applyres.bind(this, 'vga')} ref="objResolution" type="radio" className={cls_chooseInput} value="vga" name="objResolution" checked={this.state.resolution == 'vga' ? true : false} /> 
											</label>
										</div>
									</div>
								</li>
								<li>
									<div className={cls_camResolutionBlock}>
										<div className={styles.cameraInfo}>
											<h3>HD720p - (1280x720)
											<p>For HD Video Resolution</p>
											</h3>
										</div>
										<div className={styles.selectRadioBlock}>
											<label>
												<input onChange={this.applyres.bind(this, 'hd720p')} ref="objResolution" type="radio" className={cls_chooseInput} value="hd720p" name="objResolution" checked={this.state.resolution == 'hd720p' ? true : false} /> 
											</label>
										</div>
									</div>
								</li>
								<li>
									<div className={cls_camResolutionBlock}>
										<div className={styles.cameraInfo}>
											<h3>HD1080p - (1920x1080)
											<p>For Full HD Video Resolution</p>
											</h3>
										</div>
										<div className={styles.selectRadioBlock}>
											<label>
												<input onChange={this.applyres.bind(this, 'hd1080p')} type="radio" className={cls_chooseInput} value="hd1080p" name="objResolution" checked={this.state.resolution == 'hd1080p' ? true : false} /> 
											</label>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div className={styles.formGropBottom}>
							<button type="button" className="btn btn-xs btn-danger" onClick={this.cancelaction.bind(this)}><i className="fa fa-times"></i> <FormattedMessage id='close' /></button>
							&nbsp;<button type="button" className="btn btn-xs btn-success" onClick={this.applyresolution.bind(this)}><i className="fa fa-check"></i> <FormattedMessage id='apply' /></button>
						</div>
					</form>
				</div>
				<div className={`${styles.tabContent} ${styles.contentBandwidth}`} id="contentBandwidth">
					<form className={styles.controllerForm}>
					  <div className={styles.formGroup}>
					  	<label className={styles.formGroupLabel}>Bit rate : </label>
					  	<select id="objBitRate" className={styles.formControl}>
				            <option value='auto'>Auto</option>
				            <option value='2000'>2000 kbps</option>
				            <option value='1000'>1000 kbps</option>
				            <option value='500'>500 kbps</option>
				            <option value='250'>250 kbps</option>
				            <option value='125'>125 kbps</option>
				        </select>
					  </div>
					  <div className={styles.formGroup}>
					  	<label className={styles.formGroupLabel}>Frame rate : </label>
					  	<span className={styles.lspanCgrl}>Auto</span>
					  	<input type="range" defaultValue="5" className={styles.rangeSlider} />
					  	<span className={styles.lspanCgrl}>Max: 60</span>
					  	<div className={styles.graphBox}>
					  	</div>
					  </div>
					  <div className={styles.formGropBottom}>
					  	<button className="btn btn-xs btn-danger"><i className="fa fa-times"></i> Cancle</button>
					  	&nbsp;<button className="btn btn-xs btn-success"><i className="fa fa-check"></i> Apply</button>
					  </div>
					</form>
				</div>
				<div className={`${styles.tabContent} ${styles.contentReports}`} id="contentReports">
					<div className={styles.reportBlock}>
						<ul className={styles.clearfix}>
							<li>
								<h2>Transport</h2>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>protocol</div>
									<div className={styles.itemsValue}>udp</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>local IP</div>
									<div className={styles.itemsValue}>203.196.151.154</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>local port</div>
									<div className={styles.itemsValue}>42940</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>remote IP</div>
									<div className={styles.itemsValue}>94.23.86.78</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>remote port</div>
									<div className={styles.itemsValue}>40206</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>bytes sent</div>
									<div className={styles.itemsValue}>34752725</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>protocol</div>
									<div className={styles.itemsValue}>617516</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>RTT</div>
									<div className={styles.itemsValue}>711 ms</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>available bitrate</div>
									<div className={styles.itemsValue}>212 kbps</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>transmit bitrate</div>
									<div className={styles.itemsValue}>147 kbps</div>
								</div>
							</li>
							<li>
								<h2>Audio</h2>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>codec</div>
									<div className={styles.itemsValue}>opus</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>ssrc</div>
									<div className={styles.itemsValue}>3117143812</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>bytes sent</div>
									<div className={styles.itemsValue}>bytes sent</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>packets sent</div>
									<div className={styles.itemsValue}>186630</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>packets lost</div>
									<div className={styles.itemsValue}>4900</div>
								</div>
							</li>
							<li>
								<h2>Video</h2>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>codec</div>
									<div className={styles.itemsValue}>VP8</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>ssrc</div>
									<div className={styles.itemsValue}>3417449744</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>bytes sent</div>
									<div className={styles.itemsValue}>125199148</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>packets sent</div>
									<div className={styles.itemsValue}>174366</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>packets los</div>
									<div className={styles.itemsValue}>169</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>frames encoded</div>
									<div className={styles.itemsValue}>116521</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>frame size</div>
									<div className={styles.itemsValue}>640 x 480</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>frame rate</div>
									<div className={styles.itemsValue}>30</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>NACK count</div>
									<div className={styles.itemsValue}>17677</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>PLI count</div>
									<div className={styles.itemsValue}>121</div>
								</div>
								<div className={cls_reportItems}>
									<div className={styles.itemsKey}>FIR count</div>
									<div className={styles.itemsValue}>0</div>
								</div>
							</li>
						</ul>
					</div>
					<div className={styles.yourPresenterInfo}>
						<div className={styles.circle24}>
							
						</div>
						<div className={styles.yourPresenterTxt}>
							<p>You are Presenter Now!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
  }
}

function mapStateToProps(state) {
  return {
    conferenceDetails: conferenceDetails(state),
  };
}

Sources.propTypes = {
  intl: PropTypes.object,
  stream: PropTypes.object,
  conferenceDetails: PropTypes.object,
  confObject: PropTypes.object,
  audioIn: PropTypes.array,
  audioOut: PropTypes.array,
  cameraDevices: PropTypes.array,
  flipfunc: PropTypes.func,
  id: PropTypes.string,
};

Sources.defaultProps = { };

export default connect(mapStateToProps)(Sources);
