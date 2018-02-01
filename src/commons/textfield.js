import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const PPLTextField = ({input, label, type, meta: {touched, error, invalid}}) => (

    <TextField
        type={type}
        label={label}
        error={touched && invalid}
        helperText={touched && error}
        margin="normal"
        fullWidth={true}
        {...input}
    />

);

PPLTextField.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object
};

export default PPLTextField;