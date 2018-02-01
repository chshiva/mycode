import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DoctorConference from './form';
import * as videoCallService from './services';
import socketService from '../../commons/pplsocket/socketService';

class DoctorConferenceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.hanldeEndCall = this.hanldeEndCall.bind(this);
        
    }

    hanldeEndCall () {
        console.log("Doctor End Call");
        socketService.endVideocallByDoc();
    }

    sendMessage(message){
        socketService.sendMessage(message);
    }

    render() {
        return (
            <div>
                <DoctorConference hanldeEndCall={this.hanldeEndCall} openChatBox={this.props.openChatBox} sendMessage={this.sendMessage.bind(this)}/>
            </div>
        )
    }
};


/**
 * Map the state to props.
 */
const mapStateToProps = function (state) {
    return {}
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorConferenceContainer);