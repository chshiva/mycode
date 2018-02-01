import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loggedInData } from '../modules/Login/LoginReducer';
import { isLoggedIn } from '../modules/Login/LoginActions';
import AuthClient from './AuthController';
import { loginLanguage } from '../modules/Intl/IntlActions';

import styles from './component.css';

class SubMenu extends Component {

	constructor() {
    	super();
  	}

  	getSchema() {
		return this.props.data.menus;
	}
	
	componentDidMount() {
		this.props.dispatch(loginLanguage(this.props.loggedInData.data, this.props.intl.setlocale));
	}

	renderMenus() { 
		let role = this.props.loggedInData && this.props.loggedInData.data ? this.props.loggedInData.data.role : -1;

		// let active = this.props.active;
		var objMenus = this.getSchema().map(function(menu) {
			// console.log(menu);
			if(!menu.role || (menu.role && menu.role.length <= 0) || (menu.role && _.indexOf(menu.role, role) != -1 )){
				if(menu.actionType == 'URL'){
					return(
							<li key={menu._id}>
								<Link id={menu._id} activeClassName={menu.active == 'active' ? styles.active : ''} to={menu.action}>
									{menu.text}
			              		</Link> 
			            	</li>
						);
				}else if(menu.actionType == "Function"){
					return(
						<li key={menu._id}>
			              <a id={menu._id} onClick={menu.action} className={menu.active == 'active' ? styles.active : ''}>
			                <i className={menu.icon}></i>
			                <span>{menu.text}</span>
			              </a>
			            </li>
					);
				} else {
					return;
				}
			} else {
			}
		}.bind(this));

		return objMenus;
	}

	render(){
		return (
			<div className={styles.iSubMenuContainer}>
				<ul>
					{this.renderMenus()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
  	intl: state.intl,
    loggedInData: loggedInData(state),
  };
}

SubMenu.propTypes = {
  data: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(SubMenu)
