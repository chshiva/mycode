import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormGroup from './FormGroup';
import PositionGroup from './PositionGroup';
import FormField from './FormField';
import { loggedInData } from '../modules/Login/LoginReducer';
var _ = require('lodash');

class UIFORMComponent extends Component{

	constructor() {
		super();
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.anotherHello = this.anotherHello.bind(this);
		
		this.objFormField = null;

		this.state = {
		  value: {}
		};
		this.dataObject = {};
	}
	
	anotherHello(){
		// alert("Another");
		// console.log(this.objFormField);
		// console.log(this.state.value);
	}
	
	componentDidMount(){
		// if(this.props.dataObject._id){
		// 	this.handleFieldChange('_id', this.props.dataObject._id);
		// }
	}

	getSchema() {
		return this.props.data.schemas;
	}

	handleFieldChange(fieldId, value) {
		this.dataObject[fieldId] = value;
		//It gives complete object.
		this.props.callback(this.dataObject);	
	}


	getElements(schemas, role){ 
		var objAttributes;
		var objElements = schemas.map(function(schema) {
			// console.log(schema);
			if(!schema.role || (schema.role && schema.role.length <= 0) || (schema.role && _.indexOf(schema.role, role) != -1 )){
				if(schema.type == "title"){
					objAttributes = {title: schema.text, icon: schema.icon};
				}else if(schema.type == "hidden"){
					if(this.props.dataObject){
						if(this.props.dataObject[schema.datafield]){
							this.handleFieldChange(schema.datafield, this.props.dataObject[schema.datafield]);
						}		
					}
				}else{
					var newState = {};
					if(schema.type == "view"){
						newState[schema.field] = this.props.dataObject[schema.idfield] || '';
					}else if(schema.type == "dynamicdropdown"){
						newState[schema.datafield] = this.props.dataObject[schema.idfield] || '';
					}else{
						newState[schema.datafield] = this.props.dataObject[schema.datafield] || schema.value || '';
					}
				
					
					// console.log("DATA OBJECT", this.props.dataObject);
					var objExtended;

					if(this.dataObject){
						objExtended = Object.assign({}, this.dataObject, newState);//_.extend(this.dataObject, newState)
					}else{
						objExtended = newState;
					}
					this.dataObject = objExtended;
					var dataValue;
					if(schema.type == "view")
						dataValue = this.props.dataObject[schema.datafield] || '';
					else
						dataValue = this.dataObject[schema.datafield] || '';
					this.objFormField = (<FormField datavalue={dataValue} key={schema._id} data={schema} type={schema.type} callback={this.handleFieldChange}/>);
					return this.objFormField;
				}

			}else{
				return null;
			}
			// return this.objFormField;
		}, this);
		return {elements: objElements, attr: objAttributes};
	}

	/*List of Types
		text
		password
		title
	*/
	renderSchema(){
		var objFormObject = [];
		var objFormGroup;
		var objPositionGroup = [];

		var divLength = 12/Object.keys(this.getSchema()).length;
		let role = this.props.loggedInData && this.props.loggedInData.data ? this.props.loggedInData.data.role : -1;

		for (var schema_key in this.getSchema()){
			objFormObject = [];
			for (var key in this.getSchema()[schema_key]){
				var objTemp = this.getSchema()[schema_key];

				var objElements = this.getElements(objTemp[key], role);
				
				objFormGroup = <FormGroup key={key} data={objElements.elements} titleObject={objElements.attr} />;

				objFormObject.push(objFormGroup);
			}
			let objPosition = <PositionGroup key={schema_key} data={objFormObject} length={divLength} />

			objPositionGroup.push(objPosition);			
		}
		
		this.props.callback(this.dataObject);

		return objPositionGroup;

	}

	render(){
		return (
			<form id={this.props.data._id}>
				{this.renderSchema()}
			</form>
		);
	}
}


// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
  };
}

UIFORMComponent.propTypes = {
  loggedInData: PropTypes.object,
  data: PropTypes.object.isRequired,
  callback: PropTypes.func,
  dataObject: PropTypes.object
};

export default connect(mapStateToProps)(UIFORMComponent);

