import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row} from 'react-bootstrap';

import mainStyles from '../../Layouts/DashLayout/DashLayout.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';
import VideoQuality from './VideoQuality';
import Language from './Language';
import Help from './Help';
import { switchLanguage } from '../../Intl/IntlActions';
import {loggedInData} from '../../Login/LoginReducer';
import { setRightBar } from '../../Layouts/DashLayout/RightBarActions';
import WoogeenManager from '../../Communication/WoogeenManager';

class ConfSettings extends Component {

	constructor() {
    	super();
    	this.confObject = new WoogeenManager();
    	this.state = {
    		videoQuality : false,
		    language     : false,
		    help 		:false,
		    active 		: 0,
		    pathname : ''
		    
    	};
  	}

  	componentWillReceiveProps(nextProps) {
  		this.setState({ pathname : nextProps.pathname});
  	}

  	videoquality(e){
  		if(!this.state.videoQuality){
	  		this.setState({
		      videoQuality: !this.state.videoQuality,
		      language: false,
		      help : false,
		      active : 0
		    });
  		}
  	}

  	language(e){
  		if(!this.state.language){
  		this.setState({
	      videoQuality: false,
	      language: !this.state.language,
	      help : false,
	      active :1
	    });
  	}
	}
	help(e){
		if(!this.state.help){
  		this.setState({
	      videoQuality: false,
	      language: false,
	      help : !this.state.help,
	      active : 2
	    });
  	}
	}



	render(){
		let cls_headerList = `${styles.modHeaderList} clearfix`;
		let cls_midTitle    = `${styles.midTitle} pull-left`;
		let cls_block50     = `${styles.block50} pull-right hidden-xs hidden-sm`;
		let cls_block50_mob_back = `${styles.block50} pull-left hidden-lg hidden-md`;
		let cls_headerText  = `${styles.headerText} pull-left`;
		let cls_optionBlock = `${styles.optionsBlock} pull-right`;
		let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
		let cls_elasticBar = `${mainStyles.elasticSideBar} ${mainStyles.slideElasticSideBar}`;
		let video  = '';
		let language = '';
		let help = '';
		let loginType = ""
	    let data = this.props.loggedInData.data;
	    if(data && data.profile && data.profile.companyid && data.profile.companyid.businessType){
	       //console.log(data.profile.companyid.businessType)
	        loginType = data.profile.companyid.businessType;
	    }
	    
		if(this.state.active == 0){
			video = `${styles.active}`;
		}else if (this.state.active == 1){
			language = `${styles.active}`;
		}else{
			help = `${styles.active}`;
		}

		return (
			<aside className={cls_elasticBar} id="blockSettingsOptions">
				<div className={styles.tableBlock}>
		      <div className={styles.modAsideHeader}>
		        <div className={cls_headerList}>
		        	<div className={cls_block50_mob_back} onClick={this.props.hideCallback} title={this.props.intl.messages.close} id="closeSettingsOptions">
					    	<img src="/images/black-icons/black-left-arrow.png" />
					    </div>           
		          <div className={cls_midTitle}><h2><FormattedMessage id='settings' /></h2></div>
		          <div className={cls_block50} onClick={this.props.hideCallback} title={this.props.intl.messages.close} id="closeSettingsOptions">
					    	<img src="/images/black-icons/black-right-arrow.png" />
					    </div>
		        </div>
		      </div>
		      <div className={styles.tableBlockRow}>
		     		<div className={styles.tableBlockCell}>
				      <div className={styles.modAsideHeaderWhite}>
				        <div className={styles.modHeaderWhiteList}>
			            <ul className="clearfix">
			              {!this.confObject.getConnectionStatus() ?
			              	<li className={video}>
				                <a id="videoQuality" title={this.props.intl.messages.set_video_qulity} onClick = {this.videoquality.bind(this)}>
				                  <span>
				                    <img src="/images/black-icons/black-video.png" />
				                  </span>
				                  <p><FormattedMessage id='video_quality'/></p>
				                </a>
				              </li>
				            	: null
				            }
			              <li className = {language} style={this.confObject.getConnectionStatus() ? {width: "50%"} : {}}>
			                <a id="language" title={this.props.intl.messages.set_language}  onClick ={this.language.bind(this)}>
			                  <span>
			                    <img src="/images/black-icons/black-language.png" />
			                  </span>
			                  <p><FormattedMessage id='languages'/></p>
			                </a>
			              </li>
			              <li className = {help} style={this.confObject.getConnectionStatus() ? {width: "50%"} : {}}>
			                <a id="help" title={this.props.intl.messages.help} onClick ={this.help.bind(this)}>
			                    <span>
			                      <img src="/images/black-icons/black-help.png" />
			                    </span>
			                    <p><FormattedMessage id='help'/></p>
			                </a>
			              </li>
			            </ul>
				        </div>
				      </div>
				     {

				      	this.state.videoQuality == true 
				      ?
				      <VideoQuality  currentState= {this.state} pathname={this.state.pathname}/>
				      : this.state.language == true
				      ? 
				      	<Language  currentState= {this.state}  loginType = {loginType} />
				      : this.state.help == true
				      ? 
				      	<Help  currentState= {this.state} />
				      : ( !this.confObject.getConnectionStatus() ?
				      		<VideoQuality  currentState= {this.state} pathname={this.state.pathname} />
				      		: <Language  currentState= {this.state}  loginType = {loginType} />
				      	)
				  	}
				    </div> 
				  </div> 
		    </div> 
	    </aside>
		);
	}
}

ConfSettings.propTypes = {
    intl: PropTypes.object,
  	hideCallback: PropTypes.func,
  	dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
  	intl: state.intl,
    switchLanguage : state.switchLanguage,
    loggedInData : loggedInData(state),
  };
}


export default connect(mapStateToProps)(ConfSettings);