import React, { Component, PropTypes } from 'react';

import UIFORMComponent from './UIFormComponent';
import SubMenu from './SubMenu';
import TopMenu from './TopMenu';
import TextBox from './TextBox';

import styles from './component.css';

import {Col, Row, Grid} from 'react-bootstrap';
//import Popup from 'react-popup';
import  {ToastContainer, ToastMessage} from '../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
//var Popup = require('react-popup');


export default class ContainerComponent extends Component{
	constructor(props) {
		super(props);

		this.objForm = null;
		this.handleDataObject = this.handleDataObject.bind(this);
		this.objContainer = null;

		this.state = {
		  value: null,
		  dataobject: {}
		};
	}
	

	componentWillReceiveProps(nextProps) {
     
		if(nextProps.success && nextProps.success != "") {
			this.refs.container.success(`${nextProps.success} `, ``);
  	}
  	if(nextProps.error && nextProps.error.length > 0) {
  		this.refs.container.error(`${nextProps.error} `, ``);
  	}
    	//this.props.clear;
	}
  	static addAlert (value) {
  		this.refs.container.success(`${this.props.value} `, ``, {
       		closeButton: true,
    	});
  	}
	handleDataObject(objVal) {

		this.state = {
			dataobject: objVal
		};

		//It gives complete object.
		this.props.dataFun(this.state.dataobject);
	}

	renderForm() {
		this.objForm = (<UIFORMComponent dataObject={this.props.dataobject} callback={this.handleDataObject} data={this.props.data} />);
		return this.objForm;
	}

	render(){
		// console.log(this.props.data);
		if(!this.props.data){
			return (<div>Loading</div>);
		} 
		
		let cls_container = `${styles.iContainer} ${styles.oContainer} pull-right`;
		let cls_topmenu = `${styles.iTopMenu} ${styles.oTopMenu}`;
		let cls_isubmenu = `${styles.iSubMenu} {styles.oSubMenu}`; 
		let clsForm 	= `${styles.iForm} ${styles.oForm}`;
		this.objContainer =  (
			<div className={cls_container}>
				<ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
        <div className={cls_topmenu}>
          <h3 className="">{this.props.data.formTitle}</h3>
          <div>
	          {this.props.bredCrumb != null ?
	          <div>
	            {this.props.bredCrumb}
	          </div>
	        	:null }
        	</div>
          <TopMenu data={this.props.topmenu} activeIcon={this.props.activeIcon}/>
        </div>

				<div className={cls_isubmenu}>
					<SubMenu data={this.props.submenu} />
				</div>

				<div className={clsForm}>
					<div className={styles.whiteCard}>
          	<Grid fluid={true}>
          		{ (this.props.header || this.props.header != '') ? <h5>{this.props.header}</h5> : null}
	            <Row>
								{this.renderForm()}
							</Row>
						</Grid>
					</div>
				</div>
			</div>
		);
		// console.log(objContainer);
		return this.objContainer;
	}

}

ContainerComponent.propTypes = {
  data: PropTypes.object,
  submenu: PropTypes.object,
  topmenu: PropTypes.object,
  clear: PropTypes.func,
  // dataobject: PropTypes.object ,
  dataobject: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.array
    ]),
  dataFun: PropTypes.func,
};


