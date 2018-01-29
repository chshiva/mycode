import React, { PropTypes,Component } from 'react';
import { Link } from 'react-router';
import {  injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import DateTimeField from 'react-bootstrap-datetimepicker';
import {Col, Row, Grid, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';

import componentStyles from '../../../../components/component.css';
import styles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import adminStyles from '../../../Admin/Admin.css';
import { getMachedContacts } from '../../UserDashboard/UserDashboardActions';
import ShowContact from './ShowContact';


export class AddMember extends Component {
  	constructor(props) {
	    super(props);

	    this.cls_block50_l     = `${styles.block50} pull-left`;
	    this.cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
	    this.cls_formControlOverwrite = `${styles.formControlOverwrite} form-control `;
	    this.cls_calendarInlineBlock = `${styles.calendarInlineBlock} clearfix`;
	    this.cls_inputGroupAddonOverwrite = `${styles.inputGroupAddonOverwrite} input-group-addon`;
	    this.cls_confDatePicker = `${styles.setDueDateOverwrite} set-due-date form-control confDatepicker`;
	    this.cls_confTimePicker = `${styles.setDueDateOverwrite} set-due-date form-control confTimeTpicker`;    
	    this.cls_errcls = `${componentStyles.error}`;
	    this.state = {
	      	value : '',
      		error : '',
      		users : []
    	}
  	}


  	/*handleChange = (e) => {
    	//console.log("value == ",e.target.value);
    	this.setState({ value : e.target.value });
    	this.findUser(e.target.value);
  	}*/

  	findUser = (e) => {
  		let value = e.target.value;
  		this.setState({ value : value });

    	if(value != ''){
      		let obj = {
        		uid : this.props.uid,
        		input : value,
        		gid : this.props.gid
      		}
      		getMachedContacts(obj).then(res => {
        		if(res){
          			if(res.status){
            			this.setState({ users : res.data, error : '' });
          			}else{
            			this.setState({ users : [], error : res.error });
          			}
        		}
      		});
    	}else{
      		this.setState({ error : "Please enter the mail id.."});
    	}
  	}

  	sendUserId(userId) {
    	if (userId && userId != 'undefined'){
      		this.props.getUserId(userId);
      		this.setState({ value : '', users : [] });
    	}
  	}

  	freeData = () => {
    	this.setState({ value : '', users : [] });
    	this.props.hidecallback();
  	}

  	//for schedule
	render() {
  		let listUsers =  <FormattedMessage id='no_users_found' />;
  		if(this.state.users){
		    let docs = this.state.users;
		    if(docs.length > 0){
		        listUsers = docs.map((userData) =>
		                <ShowContact key={userData._id} value={userData} getUserId={this.sendUserId.bind(this)} classTitle={this.props.intl.messages.add_user} />
		        );
		    }
		}
  		return (
		<Modal show={this.props.showModal} onHide={this.freeData}>
			<Header closeButton>
				<Title className={adminStyles.popHeadingAll} ><FormattedMessage id='add_member'/></Title>
			</Header>
			<Body>
				<p><FormattedMessage id='search_members_add'/></p>
				<div className={adminStyles.searchBox}>
							<input type="text" name="search" placeholder={this.props.intl.messages.search_contacts} className={adminStyles.whiteSearch} onChange={this.findUser.bind(this)} value={this.state.value} maxLength={50} autoFocus="true" />
					<label className={this.cls_errcls}>{this.state.error}</label>
				</div>
				<div className={adminStyles.searchUsersListBlock}>
					<div className={adminStyles.searchUsersListGroup}>
						<Row>
							<Col md={12}>
								<div className={adminStyles.userListGroup}>
									<ul>                      
										{listUsers}
									</ul>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</Body>
		</Modal>
  		);
	}


}

AddMember.contextTypes = {
  	router: React.PropTypes.object,
};

AddMember.propTypes = {
  	intl: intlShape.isRequired,
  	showModal: PropTypes.bool,
 	hidecallback: PropTypes.func,
};

AddMember.defaultProps = { showModal: false };

export default injectIntl(AddMember);
