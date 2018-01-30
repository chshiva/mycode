import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { Col, Row, Grid, Modal } from 'react-bootstrap';
import { Header, Title, Body, Footer } from 'react-bootstrap/lib/Modal';
import styles from '../../../Layouts/DashLayout/components/ConfSettings.css';
import componentStyles from '../../../../components/component.css';
import adminStyle from '../../../Admin/Admin.css';

import callApi from '../../../../util/apiCaller';
import { browserHistory } from 'react-router';

export class SchedulePassword extends Component {
    constructor(props) {
        super(props);
        this.cls_btnSaveEdit = `btn btn-success btn-icon btn-sm`;
        this.state = {
            error: '',
            password: ''
        };
    }


    closeModal() {
        this.setState({
            error: '',
            password: '',
        });
        if (this.props.guest) alertify.error('Please Join Conference again using same link');
        browserHistory.push('/')
    }


    handlePasswordChange = (e) => {
        if (e.target.value == '') {
            this.setState({
                error: '',
                password: '',
            });
        } else {
            this.setState({ password: e.target.value });
        }
    }

    handlePasswordEnterKey = (e) => {
        if (e.key === 'Enter') {
            this.handleSave(e);
        }
    }

    handleSave = (e) => {
        e.preventDefault();
        let obj = {
            password:this.state.password,
            scheduleId:this.props.scheduleId
        }
        if (obj.password && obj.password != "") {
            callApi('validate-schedule-password', 'post', { data: obj, }).then(res => {
                if (res.status) {
                    // if password sucess authenticate conference                   
                    this.props.callback();
                    // this.props.closeHost();
                } else {
                    this.setState({ error: res.error });
                }

            });   
        } else {
            this.setState({ error: this.props.intl.messages.please_enter_schedule_password });
        }
        
    }

    render() {
        let bodyData = null;
        let buttonLabel = null;
        
            buttonLabel = <FormattedMessage id='submit' />;
            bodyData = (
                <div className={styles.setConfPassword}>
                    <h2><FormattedMessage id='enter_schedule_password' /></h2>
                    <div className={styles.iconBlock}>
                        <img src="/images/black-icons/black-lock.png" />
                    </div>
                    <div className={styles.passWordBlock}>
                        <input id="password" type="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} autoFocus="autofocus" maxLength={15} onKeyPress={this.handlePasswordEnterKey}/>
                    </div>
                </div>
            );
        return (
            <Modal show={this.props.showModal} onHide={this.closeModal.bind(this)} >
                <Header closeButton>
                    <Title className={styles.popHeadingAll} ><FormattedMessage id='conference_access' /></Title>
                </Header>
                <form onSubmit={this.handleSave.bind(this)}>
                    <Body>
                        {bodyData}
                    </Body>
                    <Footer>
                        <div className={adminStyle.errorJoinConf}>
                            <label >{this.state.error}</label>
                        </div> 
                        <div className={adminStyle.blockSaveAssign}>
                            <button id="cancel"  onClick={this.closeModal.bind(this)}><FormattedMessage id='cancel' /></button>
                            <button id="submitPassword" type="submit" className={adminStyle.btnSaveAssign} >{buttonLabel}</button>
                        </div>
                    </Footer>
                </form>
            </Modal>
        );
    }

}

// Retrieve data from store as props
function mapStateToProps(state) {
    return {
        intl: state.intl
    };
}

SchedulePassword.contextTypes = {
    router: React.PropTypes.object,
    intl: React.PropTypes.object.isRequired,
};

SchedulePassword.propTypes = {
    intl: PropTypes.object,
    showModal: PropTypes.bool,
};

SchedulePassword.defaultProps = { showModal: false };

export default connect(mapStateToProps)(SchedulePassword);
