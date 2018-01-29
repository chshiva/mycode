import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import UserActivateMessage from '../../App/components/UserActivateMessage';
import { activateUser } from '../LoginActions';

// Import Style
import styles from './LoginWidget.css';
import mainStyle from '../../../main.css';

export class ActivateUser extends Component {
	constructor(props) {
     super(props); 
     this.state = {
     		message : ''
     }
	}
	componentDidMount() {
		let token = this.props.params.token;
		activateUser(token).then(res => this.setData(res));
	}

	setData = (response) => {
		if (response.status) {
			this.setState({ message: response.message });
		} else {
			this.setState({ message: response.error });
		}
	}

	render () {
		return (
			<UserActivateMessage message={this.state.message}/>
		);
	}
}

ActivateUser.propTypes = {
  // dispatch: PropTypes.func.isRequired,
}


export default ActivateUser;