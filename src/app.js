import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { RouterToUrlQuery } from 'react-url-query';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors';
import { AppContainer } from 'react-hot-loader';
// import store from './store';

// import MainLayout from './commons/MainLayout';
import LoginContainer from './commons/login/container';
import ForgotPwdContainer from './commons/forgotPassword/container';
import ChoosePlanContainer from './patient/plans/container';
import TermsAgreement from './patient/termsAndConditions/container';
import DashboardContainer from './patient/dashboard/container';
import VerifyOtpContainer from './commons/verifyOTP/container';
import ResetPasswordContainer from './commons/resetPassword/container';
import OTPConfirmationContainer from './commons/otpConfirmation/container';
import ForgotPasswordConfirmationContainer from './commons/forgotPasswordConfirmation/container';
import ResetPasswordConfirmationContainer from './commons/resetPasswordConfirmation/container';
import VerifyEmailContainer from './commons/verifyEmail/container';
import PatientConsentPageContainer from './patient/consentPage/container';
import paymentFailureContainer from './patient/paymentFailure/container';
import paymentSuccessContainer from './patient/paymentSuccess/container';
import MedicalFormContainer from './patient/medicalForm/container';
import PatientPrescriptionContainer from './patient/prescription/container';
import PatientDiagnosticReportsContainer from './patient/diagnosticReports/container';
import PatientRegistrationContainer from './patient/patientRegistration/container';
import PatientProfileContainer from './patient/patientProfile/container';
import PatientVideoCallContainer from './patient/videocall/container';
import DoctorAddDiagnosticCountainer from './doctor/addDiagnostic/container';
import DoctorAddPrescriptionContainer from './doctor/addPrescription/container';
import DoctorAllergyTypesContainer from './doctor/allergies/container';
import DoctorConferenceLayoutContainer from './doctor/conferenceLayout/container';
import DoctorDiagnosticHistoryContainer from './doctor/diagnosticHistory/container';
import DoctorDashboardContainer from './doctor/doc-dashboard/container';
import DoctorConferenceContainer from './doctor/doctorConference/container';
import DoctorFormContainer from './doctor/doctorForm/container';
import DoctorProfileContainer from './doctor/doctorProfile/container';
import DoctorMedicalRecordsContainer from './doctor/medicalRecords/container';
import DoctorMyPatientsContainer from './doctor/myPatients/container';
import DoctorPatientCallContainer from './doctor/patientCall/container';
import DoctorPendingApprovalContainer from './doctor/pendingApproval/container';
import DoctorRegistrationContainer from './doctor/doctorRegistration/container';
import DoctorConsentPageContainer from './doctor/consentPage/container';


import PatientLayout from './commons/layouts/patientLayout/layout/container';
import DoctorLayout from './commons/layouts/doctorLayout/layout/container';
import store from './store';


const history = createHistory();
const mountNode = document.getElementById('root');
const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});

const onBeforeLift = () => {
    // take some action before the gate lifts
}

const renderApp = () => {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/verify-email">
                            <RouterToUrlQuery>
                                <VerifyEmailContainer />
                            </RouterToUrlQuery>
                        </Route>


                        {/* All the Patient Routes Goes Here */}
                        <PatientLayout path="/patient/dashboard" history={history} component={DashboardContainer} />
                        <PatientLayout path="/patient/medical-form-filling" history={history} component={MedicalFormContainer} />
                        <PatientLayout path="/patient/payment-failure" history={history} component={paymentFailureContainer} />
                        <PatientLayout path="/patient/payment-success" history={history} component={paymentSuccessContainer} />
                        <PatientLayout exact path="/patient/choose-plans" history={history} component={ChoosePlanContainer} />
                        <PatientLayout exact path="/patient/prescription" history={history} component={PatientPrescriptionContainer} />
                        <PatientLayout exact path="/patient/diagnostic-reports" history={history} component={PatientDiagnosticReportsContainer} />
                        <PatientLayout exact path="/patient/profile" history={history} component={PatientProfileContainer} />
                        <PatientLayout exact path="/patient/video-call" history={history} component={PatientVideoCallContainer} />

                        <Route exact path="/patient/consent-page" component={PatientConsentPageContainer} />
                        <Route exact path="/patient/signup" history={history} component={PatientRegistrationContainer} />

                        {/* All the Doctor Routes Goes Here */}

                        <Route exact path="/doctor/consent-page" component={DoctorConsentPageContainer} />
                        <DoctorLayout path="/doctor/dashboard" history={history} component={DoctorDashboardContainer} />
                        <DoctorLayout path="/doctor/doctor-form" history={history} component={DoctorFormContainer} />
                        <DoctorLayout path="/doctor/profile" history={history} component={DoctorProfileContainer} />
                        <DoctorLayout path="/doctor/my-patients" history={history} component={DoctorMyPatientsContainer} />
                        <Route exact path="/doctor/video-call" history={history} component={DoctorConferenceLayoutContainer} />

                        {/* <Route exact path="/doctor/patient-call" history={history} component={DoctorPatientCallContainer} /> */}
                        <Route exact path="/doctor/diagnostic-history" history={history} component={DoctorDiagnosticHistoryContainer} />
                        <Route exact path="/doctor/signup" history={history} component={DoctorRegistrationContainer} />
                        <DoctorLayout path="/doctor/pending-approval" history={history} component={DoctorPendingApprovalContainer} />
                        

                        <Route exact path="/" component={LoginContainer} />
                        <Route exact path="/forgot-password" component={ForgotPwdContainer} />
                        <Route exact path="/terms-conditions" component={TermsAgreement} />


                        {/* <PatientLayout path="/consent-page" history={history} component={ConsentPageContainer}/> */}

                        <Route exact path="/verify-otp/:userId" component={VerifyOtpContainer} />
                        <Route exact path="/request-otp" component={VerifyOtpContainer} />
                        <Route exact path="/reset-password" component={ResetPasswordContainer} />
                        <Route exact path="/otp-confirmation" component={OTPConfirmationContainer} />
                        <Route exact path="/reset-password-confirmation" component={ResetPasswordConfirmationContainer} />
                        <Route exact path="/forgot-password-confirmation" component={ForgotPasswordConfirmationContainer} />



                        {/*<MainLayout />*/}
                    </Switch>
                </ConnectedRouter>
            </Provider>
        </MuiThemeProvider>,
        mountNode
    );
};
renderApp();