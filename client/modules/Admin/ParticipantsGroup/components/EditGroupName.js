import React, { PropTypes, Component } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import { getGroupStudents, deleteStudentGroup, deleteStudentInGroup } from '../ParticipantsGroupActions';
import { groupData } from '../ParticipantsGroupReducer';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import style from '../../Admin.css';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
import compStyles from '../../../../components/component.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

class EditGroupName extends Component {
	constructor(props){
		super(props)
		this.state = {
			editValue : '',
			groupNameError: false,
			keyCodeValue : '',
			groupNotAlphaError: false
		}
	}
  componentWillReceiveProps(nextProps) {
  	this.setState({editValue : this.props.value})
  }	

	handleEditValue(e) {			
		 //console.log("At onclick value", keycode);
			//console.log("keycode====", e.target.selectionStart);
		//let strVal = this.checkVal(this.state.keyCodeValue);
		//sconsole.log("strValue", strVal);
		//console.log("e.target.value")
		//if(strVal) {
			this.setState({editValue : e.target.value, groupNameError: false, groupNotAlphaError : false});
		//}   
		//console.log("editValue", this.state.editValue )
		//this.setState({editValue : this.state.editValue, groupNameError: false});		
	}	

	// checkVal(keycode) {
	// 	console.log("keycode value", keycode);
	// 	if((keycode == 32) || (keycode == undefined) || (keycode == 105) || (keycode >= 47 && keycode <= 57) || (keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122)) {
 //        //this.setState({editValue : e.target.value});
 //        return true;
 //    }	
	// }

	// s

  // handleKeyValue(e) {
  //  let keycode = e.keyCode;
  //  if((keycode == 32) || (keycode >= 47 && keycode <= 57) || (keycode >= 65 && keycode <= 90) || (keycode >= 97 && keycode <= 122)) {
  //       this.setState({editValue : e.target.value});
  //   }
  // }

	saveGroupName(e){
		e.preventDefault();
		let groupStr = this.state.editValue;
    let groupName = this.state.editValue.trim(); 
    //let pattern = /^[A-Za-z\\s]+$/g;
    let re = new RegExp(/[^A-Za-z0-9\\s]+$/g);
    let ptrRe = re.test(groupName);    
    //let withSpaceValue = this.validateSpace(this.state.editValue);
    //console.log("groupName", groupName);
    if(groupName == '' || groupName == undefined || groupName == null){
      //this.refs.room_container.error('Group name is required');
      this.setState({groupNameError: true});
    } else if(ptrRe){
    	this.setState({groupNotAlphaError: true});
    }else {
    	var obj = {
			groupName : groupName
		}
			this.props.savecallback(obj);
    }		
	}

  closeModel(e) {
  	e.preventDefault();
    this.setState({groupNameError: false, groupNotAlphaError: false});    
    this.props.hidecallback();
  }

	render() {

		let cls_btnSaveAssign = ` ${style.btnSaveAssign} `;

		let dataObject = this.props;
		return(
			<div>
				<ToastContainer
	          toastMessageFactory={ToastMessageFactory}
	          ref="room_container"
	          className="toast-top-right"
	        />
				<Modal show={dataObject.showModal} onHide={this.closeModel.bind(this)}>
	        <Header closeButton>
	          <Title className={style.popHeadingAll} ><FormattedMessage id = 'edit_group_name'/></Title>
	        </Header>
	        <Body>
	          {/*<p><FormattedMessage id = "search_assigned_to_contacts"/></p>*/}
	          <form className="form-horizontal"> 
	            <div className="form-group">
	              <label htmlFor="inputGroupName" className="control-label col-md-3" ><FormattedMessage id ='group_name'/><span className={compStyles.mandatory}>*</span></label>
	              <div className="col-md-9">
	                <input id="groupName" type="text" className="form-control" name="groupName" value = {this.state.editValue}   onChange = {this.handleEditValue.bind(this)} maxLength={50} autoFocus='true' />
	                <label id="emptyGroupNameError" className={compStyles.errorPre} >{this.state.groupNameError?<FormattedMessage id='please_enter_group_name' />:''}</label>
	                <label id="invalidGroupNameError" className={compStyles.errorPre} >{this.state.groupNotAlphaError?<FormattedMessage id='invalid_group_name' />:''}</label> 
	              </div>	
	            </div>
	            <div className={style.blockSaveAssign} >
            		<button id="closeModelBtn" onClick={this.closeModel.bind(this)}><FormattedMessage id='cancel'/></button>
	            	<button id="saveGroupNameBtn" className={cls_btnSaveAssign} onClick={this.saveGroupName.bind(this)}><FormattedMessage id='save'/></button> 
	          	</div>
	          </form>
	        </Body>
	      </Modal> 
   		</div>         
		)
	}
}

EditGroupName.contextTypes= {
    intl: React.PropTypes.object.isRequired,
};
export default EditGroupName;