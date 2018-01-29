import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { connect } from 'react-redux'; 
import FontAwesome from 'react-fontawesome';

import {Col, Row} from 'react-bootstrap';
import mainStyles from '../../Layouts/DashLayout/DashLayout.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import { setCodec, setVideoResolution, setTransport } from '../../Communication/ConferenceActions';
import { conferenceDetails } from '../../Communication/ConferenceReducer';

import WoogeenManager from '../../Communication/WoogeenManager';

class VideoQuality extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			route : null,
			videoBitrate: 400,
			audioBitrate: 28,
			quality: "Standard",
		}
	}

  setCodec(codec){
    // console.log(codec);
    // this.setState({codec: codec});
    this.props.dispatch(setCodec(codec));
  }

  setTransport(transport){
  	this.props.dispatch(setTransport(transport));	
  }

  	videoBitrate(e){
  		this.setState({videoBitrate: e.target.value});
  		WoogeenManager.setVideoBitrate(e.target.value);
  	}

  	audioBitrate(e){
  		this.setState({audioBitrate: e.target.value});
  		WoogeenManager.setAudioBitrate(e.target.value);
  	}

  	videoQuality(e){
  		// console.log("Video QUality", e.target.value);
  		this.setState({ quality : e.target.value });
  		WoogeenManager.videoQuality(e.target.value);
  	}

	videoQualityHanlder(e){
		var videoResolution = e.target.value;
		store.dispatch(setVideoResolution(videoResolution));
		switch(videoResolution){
			case 'sif':
				WoogeenManager.setAudioBitrate(28);
				WoogeenManager.setVideoBitrate(256);
				this.setState({videoBitrate: 256, audioBitrate: 28});
				break;
			case 'vga':
				WoogeenManager.setAudioBitrate(28);
				WoogeenManager.setVideoBitrate(400);
				this.setState({videoBitrate: 400, audioBitrate: 28});
				break;
			case 'hd720p':
				WoogeenManager.setAudioBitrate(28);
				WoogeenManager.setVideoBitrate(700);
				this.setState({videoBitrate: 700, audioBitrate: 28});
				break;
			case 'hd1080p':
				WoogeenManager.setAudioBitrate(28);
				WoogeenManager.setVideoBitrate(1500);
				this.setState({videoBitrate: 1500, audioBitrate: 28});
				break;
			default:
		}
	}

	componentDidMount() {
		this.setState({videoBitrate: WoogeenManager.getVideoBitrate(), audioBitrate: WoogeenManager.getAudioBitrate(), quality : WoogeenManager.getVideoQuality()});
	}

	render(){
		let cls_headerList = `${styles.modHeaderList} clearfix`;
		let cls_midTitle    = `${styles.midTitle} pull-left`;
		let cls_block50     = `${styles.block50} pull-right`;
		let cls_headerText  = `${styles.headerText} pull-left`;
		let cls_optionBlock = `${styles.optionsBlock} pull-right`;
		let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
		let cls_elasticBar = `${mainStyles.elasticSideBar}`;
		const conferenceDetails = this.props.conferenceDetails.videoResolution;
						
		let cls_btnactive = `${styles.active} ${styles.btnCodec}`;
		let cls_btntransport_act = `${styles.active} ${styles.btnTransport}`;

    	let codec = this.props.conferenceDetails.codec;
    	let transport = this.props.conferenceDetails.transport;
    	// console.log("Transport ", transport);

    	let path = this.props.pathname;
    	/*changes done for UI issues
    	Responsible : Prateek
    	Date: 23/09/2017*/
    	return(
			<div>
				{conferenceDetails 
					?
						(<div className={styles.asideBodySecondary}>
			        <div className={styles.modSelectChoice}>
			          <ul>
			            <li className="clearfix">
			              <div className={cls_headerText}>
			                <h2>SIF - (320 x 240)
			                  {<p><FormattedMessage id='video_resolution' /></p>}
			                </h2>
			              </div>
			              <div className={cls_optionBlock}>
			              	<label>
			                	<input type="radio" className={cls_settingsOptions} name="example" onChange={this.videoQualityHanlder.bind(this)} value="sif" checked={conferenceDetails === 'sif'} disabled={path == 'conf' ? true : false}/>
			                </label>		              	
			              </div>
			            </li>
			            <li className="clearfix">
			              <div className={cls_headerText}>
			                <h2>VGA - (640x480)
			                  <p><FormattedMessage id='video_graphics'/></p>
			                </h2>
			              </div>
			              <div className={cls_optionBlock}>
			                <label>
			                  <input type="radio" className={cls_settingsOptions} name="example" onChange={this.videoQualityHanlder.bind(this)}  value="vga" checked={conferenceDetails === 'vga'} disabled={path == 'conf' ? true : false}/>
			                </label>                
			              </div>
			            </li>
			            <li className="clearfix">
			              <div className={cls_headerText}>
			                <h2>HD720p - (1280x720)
			                  <p><FormattedMessage id='hd_video'/></p>
			                </h2>
			              </div>
			              <div className={cls_optionBlock}>
			                <label>
			                  <input type="radio" className={cls_settingsOptions} name="example" onChange={this.videoQualityHanlder.bind(this)} value="hd720p" checked={conferenceDetails === 'hd720p'} disabled={path == 'conf' ? true : false}/>
			                </label>                
			              </div>
			            </li>
			            <li className="clearfix">
			              <div className={cls_headerText}>
			                <h2>HD1080p - (1920x1080)
			                  <p><FormattedMessage id='full_hd'/></p>
			                </h2>
			              </div>
			              <div className={cls_optionBlock}>
			                <label>
			                  <input type="radio" className={cls_settingsOptions} name="example" onChange={this.videoQualityHanlder.bind(this)} value="hd1080p" checked={conferenceDetails === 'hd1080p'} disabled={path == 'conf' ? true : false}/>
			                </label>                
			              </div>
			            </li>
			          </ul>
			      	</div>
			      	<div className={styles.alignMidBlock}>
			      		<h2><FormattedMessage id = 'selected_codec'/></h2>
			      		<div className={styles.centerBlock}>
			            <ul>
			              <li>
			                <button title="Codec VP9" onClick={this.setCodec.bind(this, 'vp9')} className={codec == 'vp9' ? cls_btnactive : styles.btnCodec} disabled={path == 'conf' ? true : false}>VP9</button>
			              </li>
			              <li>
			                <button title="Codec VP8" onClick={this.setCodec.bind(this, 'vp8')} className={codec == 'vp8' ? cls_btnactive : styles.btnCodec} disabled={this.props.pathname == 'conf' ? true : false}>VP8</button>
			              </li>
			              <li>
			                <button title="Codec H.264" onClick={this.setCodec.bind(this, 'h264')} className={codec == 'h264' ? cls_btnactive : styles.btnCodec} disabled={this.props.pathname == 'conf' ? true : false}>H.264</button>
			              </li>
			            </ul>
			          </div>
			      	</div>
			      	<div className={styles.alignMidBlock}>
			      		<h2><FormattedMessage id='transport_title' /></h2>
			      		<div className={styles.transBlock}>
			            <ul>
			              <li>
			                <button title="Default (Suggested Transport)" onClick={this.setTransport.bind(this, 'all')} className={transport == 'all' ? cls_btntransport_act : styles.btnTransport} disabled={path == 'conf' ? true : false}><FormattedMessage id ='default'/></button>
			              </li>
			              <li>
			                <button title="Relay (Force Proxy)" onClick={this.setTransport.bind(this, 'relay')} className={transport == 'relay' ? cls_btntransport_act : styles.btnTransport} disabled={this.props.pathname == 'conf' ? true : false}><FormattedMessage id='proxy'/></button>
			              </li>
			            </ul>
			          </div>
			      	</div>
			      	<div className={styles.alignMidBlock}>
			      		<div className={styles.sliderA}><FormattedMessage id= 'video_bit_rate'/> &uarr;</div><input onChange={this.videoBitrate.bind(this)} className={styles.sliderB} id="sldBandwidth" type="range" min="50" max="2000" step="10" value={this.state.videoBitrate} />
			      		<div className={styles.sliderText}>{this.state.videoBitrate}</div>
			      	</div>
			      	<div className={styles.alignMidBlock}>
			      		<div className={styles.sliderA}><FormattedMessage id= 'audio_bit_rate'/> &uarr;</div><input onChange={this.audioBitrate.bind(this)} className={styles.sliderB} id="sldBandwidth" type="range" min="10" max="100" step="2" value={this.state.audioBitrate} />
			      		<div className={styles.sliderText}>{this.state.audioBitrate}</div>
			      	</div>
			      	<div className={styles.alignMidBlock}>
			      		<div className={styles.sliderA}><FormattedMessage id='quality'/></div>
			      		<select className={styles.sideDrop} value={this.state.quality} onChange={this.videoQuality.bind(this)}>
			      			<option value="BestQuality"><FormattedMessage id='best_quality'/></option>
			      			<option value="BetterQuality"><FormattedMessage id='better_quality'/></option>
			      			<option value="Standard"><FormattedMessage id='standard'/></option>
			      			<option value="BetterSpeed"><FormattedMessage id='better_speed'/></option>
			      			<option value="BestSpeed"><FormattedMessage id='best_speed'/></option>
			      		</select>
			      	</div>

	    		</div> )
	  			: null
	  		}	
			</div>	 
	  )	
	};
}

function mapStateToProps(state){
	return {
		conferenceDetails : conferenceDetails(state),
		intl: state.intl
	}
}

VideoQuality.propTypes = {
	conferenceDetails : PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(VideoQuality);