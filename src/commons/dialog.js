import React, { Component } from 'react';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle, } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

export default class PPL_Dialog extends React.Component {
    constructor(props) {
        super(props);
    }

    onAccept(e) {
        e.preventDefault();
        this.props.onAccept();
    }

    onReject(e) {
        e.preventDefault();
        this.props.onReject();
    }
    render() {
        const actions = [
            <Button
                label="Cancel"
                primary={true}
                onClick={this.handleClose} />,
            <Button
                label="Submit"
                primary={true}
                disabled={true}
                onClick={this.handleClose} />,
        ];
        return (
            <div>
                {/* <Dialog
                    title="Dialog With Actions"
                    // actions={actions}
                    // modal={true}
                    open={this.props.isOpen || false}>
                    Only actions can close this dialog.
                    <Button id="signinBtn" raised color="primary" className="button" type="submit" onClick={this.onAccept.bind(this)}>Reject</Button>
                    <Button id="signinBtn" raised color="primary" className="button" type="submit" onClick={this.onReject.bind(this)}>Accept</Button>
                </Dialog> */}
                <Dialog open={this.props.isOpen} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Medical Prescription Form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Incoming Call From Patient
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onReject.bind(this)} color="primary">Reject</Button>
                        <Button onClick={this.onAccept.bind(this)} color="primary">Accept</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}