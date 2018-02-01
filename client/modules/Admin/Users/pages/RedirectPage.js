//Code added by - Najib, Desc - All restricted users are redirected here. As "browserHistory" is not consistent in routes(Some time throwing error), users are redirecting from this page. 

import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';

class RedirectPage extends Component {
	componentWillMount() {		
		browserHistory.push('/access-denied');
	}

	render() {return (<div></div>)}
}

export default RedirectPage;