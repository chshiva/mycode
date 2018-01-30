import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';

import componentStyles from '../../../../components/component.css';
import adminStyles from '../../../Admin/Admin.css';
import { createGroup } from './ChatActions';

import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

export class CreateGroup extends Component {
  	constructor(props) {
	    super(props);

	    this.cls_errcls = `${componentStyles.error}`;
	    this.state = {
	    	value : '',
	    	error : ''
	    }

	}

	handleEnter = (e) => {
		if(e.key == 'Enter'){
			this.handleCreate();
		}
	}

	setresponse = (response) => {
		// console.log("response in create page === ",response);
		if(response.status){
			this.setState({ value : '', error : ''});
			this.freeData();
		}else{
			this.setState({ error : response.error });
		}
	}

	handleChange = (e) => {
		this.setState({ value : e.target.value });
	}

	handleCreate = (e) => {
		let name = this.state.value.trim();
		if(name == '')
    		this.setState({error : 'Please enter the group name'});
    	else{
    		this.setState({ error : '' });
    		let obj = {
    			uid : this.props.uid,
    			groupName : name
    		}
    		this.props.dispatch(createGroup(obj)).then(res => this.setresponse(res));
    	}
	}

	freeData = () => {
	    // this.setState({ value : '', users : [] });
	    this.props.hidecallback();
  	}

	render() {
  		return (
			<Modal show={this.props.showModal} onHide={this.freeData}>
				<Header closeButton>
					<Title className={adminStyles.popHeadingAll} ><FormattedMessage id='create_group'/></Title>
				</Header>
				<Body>
					<p><FormattedMessage id='group_name'/></p>
					<div className={adminStyles.searchBox}>
						<input type="text" name="groupname" placeholder={this.props.intl.messages.group_name} className={adminStyles.whiteSearch} onChange={this.handleChange} onKeyPress={this.handleEnter} value={this.state.value} autoFocus="true" />
						<span className={adminStyles.whiteIconText} onClick={this.handleCreate}>
			                Create
			            </span>
						<label className={this.cls_errcls}>{this.state.error}</label>
					</div>
				</Body>
			</Modal>
  		);	
	}


}

CreateGroup.contextTypes = {
  router: React.PropTypes.object,
};

CreateGroup.propTypes = {
  showModal: PropTypes.bool,
  hidecallback: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

CreateGroup.defaultProps = { showModal: false };

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

export default connect(mapStateToProps)(CreateGroup);

