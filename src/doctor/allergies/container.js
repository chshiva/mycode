import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AllergyTypes from './form';
import * as AllergyTypesService from './services';


class DoctorAllergyTypesContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <AllergyTypes />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAllergyTypesContainer);