
import { SET_MEDICAL_FORM_PENDING,

SET_MEDICAL_FORM_STEP_ZERO_FAILURE,
SET_MEDICAL_FORM_STEP_ZERO_SUCCESS,
SET_MEDICAL_FORM_STEP_ZERO_DATA,

SET_MEDICAL_FORM_STEP_ONE_FAILURE,
SET_MEDICAL_FORM_STEP_ONE_SUCCESS,
SET_MEDICAL_FORM_STEP_ONE_DATA,

SET_MEDICAL_FORM_STEP_TWO_FAILURE,
SET_MEDICAL_FORM_STEP_TWO_SUCCESS,
SET_MEDICAL_FORM_STEP_TWO_DATA,

SET_MEDICAL_FORM_STEP_THREE_FAILURE,
SET_MEDICAL_FORM_STEP_THREE_SUCCESS,
SET_MEDICAL_FORM_STEP_THREE_DATA,

SET_MEDICAL_FORM_STEP_FOUR_FAILURE,
SET_MEDICAL_FORM_STEP_FOUR_SUCCESS,
SET_MEDICAL_FORM_STEP_FOUR_DATA,

SET_MEDICAL_FORM_STEP_FIVE_FAILURE,
SET_MEDICAL_FORM_STEP_FIVE_SUCCESS,
SET_MEDICAL_FORM_STEP_FIVE_DATA,

SET_MEDICAL_FORM_STEP_SIX_FAILURE,
SET_MEDICAL_FORM_STEP_SIX_SUCCESS,
SET_MEDICAL_FORM_STEP_SIX_DATA,

// SET_MEDICAL_FORM_STEP_SEVEN_FAILURE,
// SET_MEDICAL_FORM_STEP_SEVEN_SUCCESS,
// SET_MEDICAL_FORM_STEP_SEVEN_DATA,

SET_REQUEST_MEDICAL_FORM_STEP_FAILURE,
SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS,
SET_STEP_INDEX,
SET_REDIRECT_TO_DASHBOARD } from './constants';

import { callMedicalFormAPi } from './services';
import { setMedicalFormFillingStatus } from '../../commons/layouts/patientLayout/layout/actions';

function setRedirectDashboard(data) {
  console.log("setRedirectDashboard ")
  return {
    type: SET_REDIRECT_TO_DASHBOARD,
    data
  };
}

function setMedicalFormPending(isLoading) {
  console.log("setMedicalFormPending ")
  return {
    type: SET_MEDICAL_FORM_PENDING,
    isLoading
  };
}

function setMedicalFormData(data, type) {
  return {
    type: type,
    data
  };
}

function setMedicalFormSuccess(data, type) {
  return {
    type: type,
    data
  };
}

function setMedicalFormFailure(data, type) {
  return {
    type: type,
    data
  };
}

function setStepIndex(data, type) {
  return {
    type: type,
    data
  };
}

export function setMedicalFormStepIndex(stepIndex) {
  return dispatch => {
    dispatch(setStepIndex(stepIndex, SET_STEP_INDEX));
  }
}

export function setStepError(message) {
  return dispatch => {
    dispatch(setMedicalFormFailure(message, SET_REQUEST_MEDICAL_FORM_STEP_FAILURE));
  }
}

export function setp0medicalFormAction(data) {
  console.log("setp0medicalFormAction ", data );
  return dispatch => {
  console.log("1");
    dispatch(setMedicalFormPending(true));
  console.log("2");
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_ZERO_DATA));
  console.log("3");
    callMedicalFormAPi('medicalform/basicdetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 0 ", response);
      if (response.status) {
        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
        dispatch(setStepIndex(1, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_ZERO_FAILURE));
        // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_ZERO_FAILURE));
      }
      dispatch(setMedicalFormPending(false));      
    });
  }
}

export function setp1medicalFormAction(data) {
  return dispatch => {
    dispatch(setMedicalFormPending(true));
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_ONE_DATA));
    callMedicalFormAPi('medicalform/addressdetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 1 ", response);
      if (response.status) {

        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
        dispatch(setStepIndex(2, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_ONE_FAILURE));
        // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_ONE_FAILURE));
      }
      dispatch(setMedicalFormPending(false));
    });
  }
}

export function setp2medicalFormAction(data) {

  return dispatch => {
    dispatch(setMedicalFormPending(true));
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_TWO_DATA));

    callMedicalFormAPi('medicalform/alternatecontactdetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 2 ", response);
      if (response.status) {
        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
        dispatch(setStepIndex(3, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_TWO_FAILURE));
        // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));        
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_TWO_FAILURE));
      }
      dispatch(setMedicalFormPending(false));
    });
  }
}

export function setp3medicalFormAction(data) {
  return dispatch => {
    dispatch(setMedicalFormPending(true));
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_THREE_DATA));    
    callMedicalFormAPi('medicalform/emergencycontactdetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 3 ", response);
      if (response.status) {
        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
        dispatch(setStepIndex(4, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_THREE_FAILURE));
        // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_THREE_FAILURE));
      }
      dispatch(setMedicalFormPending(false));
    });
  }
}

export function setp4medicalFormAction(data) {
  return dispatch => {
    dispatch(setMedicalFormPending(true));
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_FOUR_DATA));
    callMedicalFormAPi('medicalform/insurancedonardetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 3 ", response);
      if (response.status) {
        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
        dispatch(setStepIndex(5, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_FOUR_FAILURE));
        // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_FOUR_FAILURE));
      }
      dispatch(setMedicalFormPending(false));
    });
  }
}

export function setp5medicalFormAction(data) {
  return dispatch => {
    dispatch(setMedicalFormPending(true));
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_FIVE_DATA));
    callMedicalFormAPi('medicalform/primarydoctorhospitaldetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 5 ", response);
      if (response.status) {
        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
        dispatch(setStepIndex(6, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_FIVE_FAILURE));
        // dispatch(setRedirectDashboard(false, SET_REDIRECT_TO_DASHBOARD));
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_FIVE_FAILURE));
      }
      dispatch(setMedicalFormPending(false));
    });
  }
}

export function setp6medicalFormAction(data) {
  return dispatch => {
    dispatch(setMedicalFormPending(true));
    dispatch(setMedicalFormData(data, SET_MEDICAL_FORM_STEP_SIX_DATA));
    callMedicalFormAPi('medicalform/allergydetails', data, 'post', response => {
      console.log("callMedicalFormAPi response for step 6 ", response);
      if (response.status) {
        dispatch(setMedicalFormSuccess(true, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));

        dispatch(setMedicalFormFillingStatus(true));
        
        dispatch(setStepIndex(7, SET_STEP_INDEX));
        dispatch(setMedicalFormFailure(null, SET_MEDICAL_FORM_STEP_SIX_FAILURE));
        // dispatch(setRedirectDashboard(true, SET_REDIRECT_TO_DASHBOARD));
      } else {
        dispatch(setMedicalFormFailure((response.result && response.result.message), SET_MEDICAL_FORM_STEP_SIX_FAILURE));
      }
      dispatch(setMedicalFormPending(false));
    });
  }
}

export function getmedicalFormDeatilsAction() {
  console.log("getmedicalFormDeatilsAction");
  return dispatch => {
    dispatch(setMedicalFormPending(true));
    callMedicalFormAPi('medicalform', {}, 'get', response => {
        console.log("getmedicalFormDeatilsAction response " ,response);
      if (response.status) {
        if (response.result && response.result.data) {
          var medicalform = response.result.data.medicalform;

          // Update Step Zero Details          
          if (medicalform && medicalform.basicdetails) dispatch(setMedicalFormData(medicalform.basicdetails, SET_MEDICAL_FORM_STEP_ZERO_DATA));

          // Update Step One Details
          if (medicalform && medicalform.address) dispatch(setMedicalFormData(medicalform.address, SET_MEDICAL_FORM_STEP_ONE_DATA));

          // Update Step Two Details
          if (medicalform && medicalform.alternatecontactdetails) dispatch(setMedicalFormData(medicalform.alternatecontactdetails, SET_MEDICAL_FORM_STEP_TWO_DATA));

          // Update Step Three Details
          if (medicalform && medicalform.emergencycontact) dispatch(setMedicalFormData(medicalform.emergencycontact, SET_MEDICAL_FORM_STEP_THREE_DATA));

          // Update Step Four Details
          if (medicalform && medicalform.insurancedonarstatus) dispatch(setMedicalFormData(medicalform.insurancedonarstatus, SET_MEDICAL_FORM_STEP_FOUR_DATA));

          // Update Step Five Details
          if (medicalform && medicalform.information) dispatch(setMedicalFormData(medicalform.information, SET_MEDICAL_FORM_STEP_FIVE_DATA));

          // Update Step Six Details
          if (medicalform && medicalform.allergies) dispatch(setMedicalFormData(medicalform.allergies, SET_MEDICAL_FORM_STEP_SIX_DATA));
        }
        dispatch(setMedicalFormSuccess(response.status, SET_REQUEST_MEDICAL_FORM_STEP_SUCCESS));
      } else {

        if (!response.message == "Document Not Found") {
          dispatch(setMedicalFormFailure((response.result && response.result.message), SET_REQUEST_MEDICAL_FORM_STEP_FAILURE));
        }

      }
      dispatch(setMedicalFormPending(false));
    });
  }
}