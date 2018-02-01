import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Warning from 'material-ui-icons/Warning';
// import PropTypes from 'prop-types';
// import {Link, BrowserHistory} from 'react-router-dom';
// import {Field, reduxForm} from 'redux-form';
// import {withStyles} from 'material-ui/styles';



const styles = {};

export default class PendingApproval extends Component {
    constructor(props){
        super (props);
    }
  
  render(){
    return (
        <div>
        <div className="mainContainer">
          <div className="pendingMsg">
            <div className="pendingMsgBlock">
              <div className="pendingMsgIconHead">
                <Warning className="pendingMsgIcon" />
                <span className="pendingMsgTxt">Pending Approval !!</span>
              </div>
              <div className="pendingMsgOther">
                <span>Thank you for applying for an account. Your account is currently pending approval by the site administrator. <br />Once it has been approved, you will receive an e-mail containing further instructions.</span>
              </div>
              {/*<div className="pendingMsgBackHome">
                                              <Button raised color="primary" className="button">GO BACK HOME</Button>
                                          </div>*/}
            </div>
          </div>
        </div>
        </div>
    );
}
};


// export default withStyles(styles)(PendingApproval);