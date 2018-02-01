import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import startupReducer from './commons/layouts/patientLayout/layout/reducer';
import loginReducer from './commons/login/reducer';
import forgotPasswordReducer from './commons/forgotPassword/reducer';
import resetPasswordReducer from './commons/resetPassword/reducer';
import { requestForOTPReducer, otpVerifcationReducer } from './commons/verifyOTP/reducer';
import verifyEmailReducer from './commons/verifyEmail/reducer';
import requestPlansReducer from './patient/plans/reducer';
import consetPageReducer from './patient/consentPage/reducer';
import { accountsReducer, userReducer } from './patient/dashboard/reducer';
import medicalFormReducer from './patient/medicalForm/reducer';
import prescriptionReducer from './patient/prescription/reducer';
import diagnosticReportsReducer from './patient/diagnosticReports/reducer';
import patientRegistrationReducer from './patient/patientRegistration/reducer';
import requestDiagnosticHistoryReducer from './doctor/diagnosticHistory/reducer';
import doctorDetailsFormReducer from './doctor/doctorForm/reducer';
import requestDoctorDashboardReducer from './doctor/doc-dashboard/reducer';
import requestDoctorProfileReducer from './doctor/doctorProfile/reducer'; 
import doctorRegistrationReducer from './doctor/doctorRegistration/reducer';
import requestPatientProfileReducer from './patient/patientProfile/reducer'; 
import socketReducer from './commons/pplsocket/reducer';

var rootReducers = {
  'user': startupReducer,
  'login': loginReducer,
  'forgotPassword': forgotPasswordReducer,
  'resetPassword': resetPasswordReducer,
  'requestOTP': requestForOTPReducer,
  'verifyOTP': otpVerifcationReducer,
  'verifyEmail': verifyEmailReducer,
  'requestPlans': requestPlansReducer,
  'accounts': accountsReducer,
  'consentPage': consetPageReducer,
  'medicalForm': medicalFormReducer,
  'requestDiagnosticHistory': requestDiagnosticHistoryReducer,
  'doctorDetailsForm': doctorDetailsFormReducer,
  'requestDoctorDashboard': requestDoctorDashboardReducer,
  'requestPrescription': prescriptionReducer,
  'requestDiagnosticReports': diagnosticReportsReducer,
  'patientRegistration': patientRegistrationReducer,
  'doctorRegistration': doctorRegistrationReducer,
  'doctorProfileDetails': requestDoctorProfileReducer,
  'patientProfileDetails': requestPatientProfileReducer,
  socket: socketReducer
};

export default rootReducers;