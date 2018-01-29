import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loggedInData } from '../modules/Login/LoginReducer';
var _ = require('lodash');
import styles from './component.css';
import FontAwesome from 'react-fontawesome';

class TopMenu extends Component {

	constructor() {
  	super();
    // this.state.userRole = 0;
	}

	getSchema() {
		// console.log(this.props.data);
		// console.log(typeof this.props.data.menus[1].action);
		return this.props.data.menus;
	}

	componentDidMount() {
	 	// console.log(this.props);
    // this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
    //               )).then(res => this.setdata(res));  
	}

  // setdata(result){
  //   if (result && result.data && result.data.role)
  //   	this.setstate({ userRole : result.data.role });
  // }

	renderMenus() {
		let role = this.props.loggedInData && this.props.loggedInData.data ? this.props.loggedInData.data.role : -1;
		// console.log("role === ",role);
		let importText = {
			padding: '0 0 8px 0',
    		margin: '0'
		}
		let importIcon = {
			marginTop: '8px'
		}
		var objMenus = this.getSchema().map(function(menu) {
			// console.log(menu); /*href={menu.action}*/
			if(!menu.role || (menu.role && menu.role.length <= 0) || (menu.role && _.indexOf(menu.role, role) != -1 )){
			// if(this)
				// console.log("Allowed==", menu.role);
				if(menu.actionType == "Function"){
					let li_css = menu._id == this.props.activeIcon ? { "pointerEvents":"none", "opacity" : "0.6"} : {};
					return(
						<li key={menu._id} style={li_css}>
			              <a id={menu._id} onClick={menu.action} >
			                <i className={menu.icon}></i>
			                <span>{menu.text}</span>
			              </a>
			            </li>
					);
				}else if(menu.actionType == "URL"){
					let li_css = menu._id == this.props.activeIcon ? { "pointerEvents":"none", "opacity" : "0.6"} : {};
					return(
						<li key={menu._id} style={li_css}>
			              <Link to={menu.action} id={menu._id} >
			                <i className={menu.icon}></i>
			                <span>{menu.text}</span>
			              </Link>
			            </li>
					);
				}else if(menu.actionType == "Upload"){
					let li_css = menu._id == this.props.activeIcon ? { "pointerEvents":"none", "opacity" : "0.6"} : {};
					return(
			            <li key={menu._id} style={li_css} id={menu._id}>
                    <div className={styles.importBtnBlock} >
                      <div className={styles.importBtnInput}>
                      	<span className = {styles.icon}><FontAwesome name="download" style={importIcon}></FontAwesome></span>
                        <input className={styles.importFileOnclick} id ="fileUploadIcon" type="file" accept=".xlsx,.xls,.xml,.ods" onChange={menu.action} value={''}/>
											</div>
                      <p style={importText}>{menu.text}</p>
                    </div>
                	</li>
					);
				}else if(menu.actionType == "Download"){
					let li_css = menu._id == this.props.activeIcon ? { "pointerEvents":"none", "opacity" : "0.6"} : {};
					return(
						<li key={menu._id} style={li_css}>
			              <a href={menu.action} id={menu._id} download >
			                <i className={menu.icon}></i>
			                <span>{menu.text}</span>
			              </a>
			            </li>
					);
				}
				// console.log("Not Allowed==", menu.role)
			} else {
			}
		}.bind(this));

		return objMenus;
	}

	render(){
		let cls = `${styles.iMenuContainer}`;
		return (
			<div className={cls}>
				<ul>
					{this.renderMenus()}
				</ul>
			</div>
		);
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
  };
}

TopMenu.propTypes = {
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(TopMenu);
