import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConferenceLayout from './form';
import * as conferenceLayoutService from './services';
import socketService from '../../commons/pplsocket/socketService';

class DoctorConferenceLayoutContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socket && nextProps.socket.roomid != this.props.socket.roomid) {
            var channel = socketService.subscribeChannel(nextProps.socket.roomid);
            socketService.watchChannel(channel);
        }
    }

    sendMessage(message) {
        socketService.sendMessage(message);
    }

    render() {
        return (
            <div>
                <ConferenceLayout sendMessage={this.sendMessage.bind(this)} messages={this.props.socket.messages} user={this.props.user}/>
            </div>
        )
    }
};

/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {
        socket: state.socket,
        user: state.user
    }
}

/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorConferenceLayoutContainer);