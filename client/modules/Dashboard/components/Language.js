import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'; 
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';

import {Col, Row} from 'react-bootstrap';
import { switchLanguage } from '../../Intl/IntlActions';
import mainStyles from '../../Layouts/DashLayout/DashLayout.css';
import mainStyle from '../../../main.css';
import styles from '../../Layouts/DashLayout/components/ConfSettings.css';

export class Language extends Component {
	
	changeLanguage(lang) {
		console.log("lang", lang);
		this.props.dispatch(switchLanguage(lang, this.props.loginType, lang))
	}
	render(){
		let cls_headerList = `${styles.modHeaderList} clearfix`;
		let cls_midTitle    = `${styles.midTitle} pull-left`;
		let cls_block50     = `${styles.block50} pull-right`;
		let cls_headerText  = `${styles.headerText} pull-left`;
		let cls_optionBlock = `${styles.optionsBlock} pull-right`;
		let cls_settingsOptions = `${styles.settingsOptionInput} ${styles.radio}`;
		let cls_elasticBar = `${mainStyles.elasticSideBar}`;
		let cls_li 	=	`${mainStyle.selected}`;
		//console.log("this.props.loginType", this.props.loginType);
		const languageNodes = this.props.intl.enabledLanguages.map(
	    lang => 
	    
			<li key={lang[1]}   className="clearfix">
			<div className={cls_headerText}><h2>{lang[0]}</h2> </div>
			<div className={cls_optionBlock}><label><input id="changeLanguage" type="radio" onClick={() => this.changeLanguage(lang[1])} name="languagechk" className={cls_settingsOptions} defaultChecked={lang[1] === this.props.intl.locale} /></label>
			</div></li>
		);	
		
		return (
			<div className={styles.asideBodySecondary}>
				<div className={styles.modSelectChoice}>
	        <ul>
	        	{languageNodes}
	        </ul>
        </div>
      </div>
		);
	};
}

Language.propTypes = {
  loginType: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    intl : state.intl,
  };
}


export default connect(mapStateToProps)(Language);


