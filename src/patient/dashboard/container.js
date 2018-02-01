import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardForm from './form';
import { requestForAccounts, requestForUserDetails } from './actions';
import socketService from '../../commons/pplsocket/socketService';
import { callUserLedger } from './services'

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socketError: null,
      isCalling: false,
      rules: []
    }
  }

  componentWillMount() {
    var userAuthToken = localStorage.getItem('userAuthToken');
    if (userAuthToken == null) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    callUserLedger(response => {
      console.log("callUserLedger, response", response);
      if (response.result && response.result.data)
        this.setState({ rules: response.result.data.rules })
    });
  }

  componentWillReceiveProps(nextprops) {
    console.log("nextprops", nextprops);
    if (nextprops.socket && nextprops.socket.roomid != this.props.socket.roomid) {
      this.props.history.push('video-call');
    }

    else if (nextprops.socket && nextprops.socket.reject) {
      this.setState({ isCalling: false });
      this.setState({ socketError: 'Call Rejected' });
    }
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  callNow(e) {
    console.log("socketService callNow");
    socketService.sendVideoCallReq({}, (response) => {
      if (response.status) {
        this.setState({ isCalling: true });
        // this.props.history.push('video-call');
      } else {
        this.setState({ isCalling: false });
        this.setState({ socketError: response.result.message });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.socketError && <div className="errorBox"> {this.state.socketError}</div>}
        <DashboardForm userDetails={this.props.userDetails} callNow={this.callNow.bind(this)} rules={this.state.rules} isCalling={this.state.isCalling} />
      </div>
    )
  }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
  return {
    userDetails: state.user,
    socket: state.socket
  }
}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
  return {
    requestForAccounts: () => dispatch(requestForAccounts()),
    requestForUserDetails: () => dispatch(requestForUserDetails())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);