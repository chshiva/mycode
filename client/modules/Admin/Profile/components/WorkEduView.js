import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import FontAwesome from 'react-fontawesome';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';

import { createWorkPlaceRequest, getWorkEduDataRequest, deleteWorkPlaceRequest, createCollegeRequest, deleteCollegeRequest, createSchoolRequest, deleteSchoolRequest, saveSkillsRequest, deleteAllSkillRequest } from '../ProfileActions';
import { profileData } from '../ProfileReducer';
import AuthClient from '../../../../components/AuthController';
import { connect } from 'react-redux';

import ReactDOM from 'react-dom';
import { Col, Row, Grid, Modal } from 'react-bootstrap';
import { Header, Title, Body, Footer } from 'react-bootstrap/lib/Modal';

import styles from '../../Admin.css';
import weStyles from './WorkEdu.css';
import dashboardStyles from '../../../Dashboard/Dashboard.css';
import { ToastContainer, ToastMessage } from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import moment from 'moment';
import DateTimeField from 'react-bootstrap-datetimepicker';
import compStyles from '../../../../components/component.css';
var _ = require('lodash');

export class WorkEduView extends Component {
  constructor(props) {
    super(props);
    this.validCompanyStatus = false;
    this.validPositionStatus = false;
    this.validCityStatus = null;
    this.validCountryStatus = null;
    this.validUniversityStatus = false;
    this.validSchoolStatus = false;
    this.state = {
      showAddWorkPlaceModal: false,
      showAddCollegeModal: false,
      showAddHighSchoolModal: false,
      showAddProfessionalBlock: false,
      error: '',
      workDropdownCss: `${weStyles.moreDropDown}`,
      profDropdownCss: `${weStyles.moreDropDown}`,
      collegeDropdownCss: `${weStyles.moreDropDown}`,
      schoolDropdownCss: `${weStyles.moreDropDown}`,
      checkWork: false,
      checkGraduated: false,
      company: '',
      position: '',
      city: '',
      country: '',
      desc: '',
      companyID: '',
      university: '',
      conc: '',
      universityID: '',
      school: '',
      schoolDesc: '',
      skillList: [],
      value: '',
      divValue: '',
      yearFrom: moment().format('DD/MM/YYYY'),
      yearFromFormat: "DD/MM/YYYY",
      yearFromInputFormat: "DD/MM/YYYY",
      yearFromMode: "date",
      yearTo: moment().format('DD/MM/YYYY'),
      maxDate: moment(),
      inputFromYear: null,
      inputToYear: null,
      showWorkUpdate: false,
      showCollegeUpdate: false,
      showSchoolUpdate: false,
      showProfessionalUpdate: false,
      validationError: {}

    }
  }



  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/profile/workedu')).then(res => {this.setdata(res)});
  // }

  componentDidMount() {
    this.setdata(this.props.loggedInData);
    window.addEventListener('click', this.myHandler.bind(this));
    // document.body.addEventListener('click', this.myHandler.bind(this))  
  }

  setdata(result) {
    if (result && result.data && result.data._id) {
      const userID = this.props.loggedInData.data._id;
      this.props.dispatch(getWorkEduDataRequest(/*{ userID }*/))
    }
  }

  myHandler() {
    if (this.state.workDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.collegeDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.schoolDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.profDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        workDropdownCss: `${weStyles.moreDropDown}`,
        collegeDropdownCss: `${weStyles.moreDropDown}`,
        schoolDropdownCss: `${weStyles.moreDropDown}`,
        profDropdownCss: `${weStyles.moreDropDown}`,
      })
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    } else if (nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
      this.state = {
        showAddWorkPlaceModal: false,
        showAddCollegeModal: false,
        showAddHighSchoolModal: false,
        showAddProfessionalBlock: false,
        error: '',
        workDropdownCss: `${weStyles.moreDropDown}`,
        profDropdownCss: `${weStyles.moreDropDown}`,
        collegeDropdownCss: `${weStyles.moreDropDown}`,
        schoolDropdownCss: `${weStyles.moreDropDown}`,
        checkWork: false,
        checkGraduated: false,
        company: '',
        position: '',
        city: '',
        country: '',
        desc: '',
        companyID: '',
        university: '',
        conc: '',
        universityID: '',
        school: '',
        schoolDesc: '',
        skillList: [],
        value: '',
        yearFrom: moment().format('DD/MM/YYYY'),
        yearFromFormat: "DD/MM/YYYY",
        yearFromInputFormat: "DD/MM/YYYY",
        yearFromMode: "date",
        yearTo: moment().format('DD/MM/YYYY'),
        maxDate: moment(),
        inputFromYear: null,
        inputToYear: null
      };
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.myHandler);
    // document.body.removeEventListener('click', this.myHandler);
  }


  handleWorkPlace() {
    this.setState({
      showAddWorkPlaceModal: true,
    });
  }

  hideAddWorkPlaceModal() {
    this.setState({
      showAddWorkPlaceModal: false,
      showAddCollegeModal: false,
      showAddHighSchoolModal: false,
      showAddProfessionalBlock: false,
      error: '',
      workDropdownCss: `${weStyles.moreDropDown}`,
      profDropdownCss: `${weStyles.moreDropDown}`,
      collegeDropdownCss: `${weStyles.moreDropDown}`,
      schoolDropdownCss: `${weStyles.moreDropDown}`,
      checkWork: false,
      checkGraduated: false,
      company: '',
      position: '',
      city: '',
      country: '',
      desc: '',
      companyID: '',
      university: '',
      conc: '',
      universityID: '',
      school: '',
      schoolDesc: '',
      skillList: [],
      value: '',
      yearFrom: moment().format('DD/MM/YYYY'),
      yearFromFormat: "DD/MM/YYYY",
      yearFromInputFormat: "DD/MM/YYYY",
      yearFromMode: "date",
      yearTo: moment().format('DD/MM/YYYY'),
      maxDate: moment(),
      inputFromYear: null,
      inputToYear: null,
      showWorkUpdate: false,
      validationError: {}
    })
  }

  handleCollege() {
    this.setState({
      showAddCollegeModal: true,
    })
  }

  hideAddCollegeModal() {
    this.setState({
      showAddWorkPlaceModal: false,
      showAddCollegeModal: false,
      showAddHighSchoolModal: false,
      showAddProfessionalBlock: false,
      error: '',
      workDropdownCss: `${weStyles.moreDropDown}`,
      profDropdownCss: `${weStyles.moreDropDown}`,
      collegeDropdownCss: `${weStyles.moreDropDown}`,
      schoolDropdownCss: `${weStyles.moreDropDown}`,
      checkWork: false,
      checkGraduated: false,
      company: '',
      position: '',
      city: '',
      desc: '',
      companyID: '',
      university: '',
      conc: '',
      universityID: '',
      school: '',
      schoolDesc: '',
      skillList: [],
      value: '',
      yearFrom: moment().format('DD/MM/YYYY'),
      yearFromFormat: "DD/MM/YYYY",
      yearFromInputFormat: "DD/MM/YYYY",
      yearFromMode: "date",
      yearTo: moment().format('DD/MM/YYYY'),
      maxDate: moment(),
      inputFromYear: null,
      inputToYear: null,
      showCollegeUpdate: false,
      validationError: {}
    })
  }

  handleHighSchool() {
    this.setState({
      showAddHighSchoolModal: true,
    });
  }

  hideAddHighSchoolModal() {
    this.setState({
      showAddWorkPlaceModal: false,
      showAddCollegeModal: false,
      showAddHighSchoolModal: false,
      showAddProfessionalBlock: false,
      error: '',
      workDropdownCss: `${weStyles.moreDropDown}`,
      profDropdownCss: `${weStyles.moreDropDown}`,
      collegeDropdownCss: `${weStyles.moreDropDown}`,
      schoolDropdownCss: `${weStyles.moreDropDown}`,
      checkWork: false,
      checkGraduated: false,
      company: '',
      position: '',
      city: '',
      desc: '',
      companyID: '',
      university: '',
      conc: '',
      universityID: '',
      school: '',
      schoolDesc: '',
      skillList: [],
      value: '',
      yearFrom: moment().format('DD/MM/YYYY'),
      yearFromFormat: "DD/MM/YYYY",
      yearFromInputFormat: "DD/MM/YYYY",
      yearFromMode: "date",
      yearTo: moment().format('DD/MM/YYYY'),
      maxDate: moment(),
      inputFromYear: null,
      inputToYear: null,
      showSchoolUpdate: false,
      validationError: {}

    })
  }

  handleSchoolEdit() {
    // console.log("coming in handle schold");
    var schoolObj = this.props.loggedInData.data.profile.education.highSchool;

    this.setState({
      showAddHighSchoolModal: true,
      school: schoolObj.school,
      city: schoolObj.city,
      country: schoolObj.country,
      schoolDesc: schoolObj.description,
      yearFrom: moment(schoolObj.yearFrom).format("DD/MM/YYYY"),
      yearTo: moment(schoolObj.yearTo).format("DD/MM/YYYY"),
      checkGraduated: schoolObj.graduated
    });

  }


  handleSchoolDelete() {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning, this.props.intl.messages.delete_school_alert,
      function (result) {
        if (result) {
          props.dispatch(deleteSchoolRequest());
        }
      },
      function () {

      }
    ).setting('labels', { 'ok': this.props.intl.messages.ok, 'cancel': this.props.intl.messages.cancel });;
  }


  handleWorkDropdown(val, e) {
    e.stopPropagation();
    if (this.state.workDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        workDropdownCss: `${weStyles.moreDropDown}`,
      })
    } else if (this.state.workDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        companyID: val,
        workDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
      })
    }
  }

  handleProfDropdown(e) {
    e.stopPropagation();
    if (this.state.profDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        profDropdownCss: `${weStyles.moreDropDown}`,
        showProfessionalUpdate: true
      })
    } else if (this.state.profDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        profDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showProfessionalUpdate: true
      })
    }
  }

  handleCollegeDropdown(val, e) {
    e.stopPropagation();
    if (this.state.collegeDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        collegeDropdownCss: `${weStyles.moreDropDown}`,
        showCollegeUpdate: true,
      })
    } else if (this.state.collegeDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        universityID: val,
        collegeDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showCollegeUpdate: true,
      })
    }
  }

  handleSchoolDropdown(e) {
    e.stopPropagation();
    if (this.state.schoolDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        schoolDropdownCss: `${weStyles.moreDropDown}`,
        showSchoolUpdate: true
      })
    } else if (this.state.schoolDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        schoolDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showSchoolUpdate: true
      })
    }
  }

  handleProfessional() {
    this.setState({
      showAddProfessionalBlock: true,
    })
  }

  cancelProfessional(e) {
    e.preventDefault()
    this.setState({
      showAddProfessionalBlock: false,
      value: '',
      skillList: this.props.loggedInData.data.profile.experience.professionalSkills,
      showProfessionalUpdate: false,
      validationError: {}
    });
    this.props.dispatch(isLoggedIn(AuthClient.getSession(),
      '/admin/profile/workedu'))
  }

  handleCheck() {
    this.setState(prevState => ({
    //   // flip boolean value
      checkWork: !this.state.checkWork,
      validationError: {
        ...prevState.validationError,
        endDateError: undefined
      }
    }))
    // this.setState({
    //   checkWork: !this.state.checkWork,
    //   validationError: {dateError:''}
    // });
  }

  handleGraduated() {
    this.setState({
      checkGraduated: !this.state.checkGraduated // flip boolean value
    });
  }

  handleCompany(event) {
    this.setState({ company: event.target.value });
    this.validCompanyStatus = this.validateSpace(event.target.value);
  }

  validateSpace(value) {
    var re = /^[ ]*$/;
    return re.test(value);
  }

  validateAplhaWithSpace(value) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(value)
  }

  handlePosition(event) {
    let val = _.startCase(_.toLower(event.target.value));
    val = val.length != event.target.value.length ? event.target.value : val;
    this.setState({ position: val });
    this.validPositionStatus = this.validateSpace(val);
  }

  handleDesc(event) {
    this.setState({ desc: event.target.value });
  }

  handleCity(event) {
    let val = _.startCase(_.toLower(event.target.value));
    val = val.length != event.target.value.length ? event.target.value : val;
    this.setState({ city: val });
    this.validCityStatus = this.validateAplhaWithSpace(val);
  }

  handleCountry(event) {
    let val = _.startCase(_.toLower(event.target.value));
    val = val.length != event.target.value.length ? event.target.value : val;
    this.setState({ country: val });
    this.validCountryStatus = this.validateAplhaWithSpace(val);
  }

  handleYearFrom(newYear) {
    moment(newYear, "DD/MM/YYYY").isValid()
      ? this.setState({
        yearFrom: newYear,
        inputFromYear: null
      })
      : this.setState({ inputFromYear: false });
  }

  handleYearTo(newYear) {
    moment(newYear, "DD/MM/YYYY").isValid()
      ? this.setState({
        yearTo: newYear,
        inputToYear: null
      })
      : this.setState({ inputToYear: false });
  }

  handleUniversity(event) {
    this.setState({ university: event.target.value });
    this.validUniversityStatus = this.validateSpace(event.target.value);
  }

  handleConc(event) {
    // console.log("Conc Name:", event.target.value);
    this.setState({ conc: event.target.value });
  }

  //High school handlers
  handleSchool(event) {
    // console.log("school:", event.target.value);
    this.setState({ school: event.target.value });
    this.validSchoolStatus = this.validateSpace(event.target.value);
  }

  handleSchoolDesc(event) {
    this.setState({ schoolDesc: event.target.value })
  }

  createWorkPlace = (e) => {
    e.preventDefault();
    var ipstime,ipetime;
    if(this.state.inputFromYear != false &&  this.state.inputToYear != false) {
      ipstime = moment(this.state.yearFrom, "DD/MM/YYYY")
      ipetime = moment(this.state.yearTo, "DD/MM/YYYY");
    } else if( this.state.inputFromYear != false) {
       ipstime = moment(this.state.yearFrom, "DD/MM/YYYY")
    } else if(this.state.inputToYear != false) {
      ipetime = moment(this.state.yearTo, "DD/MM/YYYY");
    }

    var now = moment()
    let errors = {};
    if (this.state.checkWork) {
      if (this.state.company == '' || this.validCompanyStatus) errors['companyError'] = <FormattedMessage id='Please_enter_Company' />;
      if (this.validPositionStatus || this.state.position == '') errors['positionError'] = <FormattedMessage id='Please_enter_Position' />;
      if (this.validCountryStatus == false) {
        errors['countryError'] = <FormattedMessage id='Please_enter_valid_City_Town' />;
      }
      if (this.validCityStatus == false) {
        errors['cityError'] = <FormattedMessage id="Please_enter_valid_Country" />;
        this.refs.city.focus()
      }
      if (this.state.inputFromYear == false) errors['startDateError'] = <FormattedMessage id="Please_enter_valid_From_Date" />;
      if (+ipstime > +now) errors['startDateError'] = <FormattedMessage id="From_date_cannot_be_in_future" />;
      if (!(_.isEmpty(errors))) {
        this.setState({ validationError: errors });
      } else {
        var workplaceObj = {
          company: this.state.company.trim(),
          position: this.state.position.trim(),
          city: this.state.city.trim(),
          country: this.state.country.trim(),
          description: this.state.desc.trim(),
          yearFrom: moment(this.state.yearFrom, "DD/MM/YYYY").utc().toDate(),
          yearTo: '',
          present: true
        };

        const userID = this.props.loggedInData.data._id;
        const companyID = this.state.companyID;

        this.props.dispatch(createWorkPlaceRequest({ workplaceObj, userID, companyID }));
      }
    } else {
      if (this.state.company == '' || this.validCompanyStatus) errors['companyError'] = <FormattedMessage id='Please_enter_Company' />;
      if (this.validPositionStatus || this.state.position == '') errors['positionError'] = <FormattedMessage id='Please_enter_Position' />;
      if (this.validCountryStatus == false) {
        errors['countryError'] = <FormattedMessage id='Please_enter_valid_City_Town' />;
      }
      if (this.validCityStatus == false) {
        errors['cityError'] = <FormattedMessage id="Please_enter_valid_Country" />;
        this.refs.city.focus()
      }
      if (this.state.inputFromYear == false) errors['startDateError'] = <FormattedMessage id="Please_enter_valid_From_Date" />;
      else if (+ipstime > +now) errors['startDateError'] = <FormattedMessage id="From_date_cannot_be_in_future" />;
      if (this.state.inputToYear == false) errors['endDateError'] = <FormattedMessage id="Please_enter_valid_To_Date" />;      
      else if (+ipstime == +ipetime) errors['endDateError'] = <FormattedMessage id='From_date_and_To_date_cannot_be_same' />;
      else if (+ipstime > +ipetime) errors['endDateError'] = <FormattedMessage id='To_date_should_be_greater_than_From_date' />;
      if (!(_.isEmpty(errors))) {
        this.setState({ validationError: errors });
      } else {
        this.setState({ validationError: {} })
        var workplaceObj = {
          company: this.state.company.trim(),
          position: this.state.position.trim(),
          city: this.state.city.trim(),
          country: this.state.country.trim(),
          description: this.state.desc.trim(),
          yearFrom: moment(this.state.yearFrom, "DD/MM/YYYY").utc().toDate(),
          yearTo: moment(this.state.yearTo, "DD/MM/YYYY").utc().toDate(),
        };

        const userID = this.props.loggedInData.data._id;
        const companyID = this.state.companyID;

        this.props.dispatch(createWorkPlaceRequest({ workplaceObj, userID, companyID }));

      }
    }
  };

  saveSchool = (e) => {
    e.preventDefault();
    var ipstime,ipetime;
    if(this.state.inputFromYear != false &&  this.state.inputToYear != false) {
      ipstime = moment(this.state.yearFrom, "DD/MM/YYYY")
      ipetime = moment(this.state.yearTo, "DD/MM/YYYY");
    } else if( this.state.inputFromYear != false) {
       ipstime = moment(this.state.yearFrom, "DD/MM/YYYY")
    } else if(this.state.inputToYear != false) {
      ipetime = moment(this.state.yearTo, "DD/MM/YYYY");
    }
    var now = moment()
    let errors = {}
    if (this.state.school == '') {
      errors['schoolError'] = <FormattedMessage id='Please_enter_School' />
      this.refs.school.focus()
    } if (this.validSchoolStatus) {
      errors['schoolError'] = <FormattedMessage id='School_field_cannot_have_empty_spaces' />
      this.refs.school.focus()
    } if (this.state.inputFromYear == false) {
      errors['startDateError'] = <FormattedMessage id="Please_enter_valid_From_Date" />;
    }
    if (this.state.inputToYear == false) {
      errors['endDateError'] = <FormattedMessage id="Please_enter_valid_To_Date" />;
    } else if (+ipstime > +now) {
      errors['endDateError'] = <FormattedMessage id="From_date_cannot_be_in_future" />;
    } else if (+ipstime == +ipetime) {
      errors['endDateError'] = <FormattedMessage id='From_date_and_To_date_cannot_be_same' />;
    } else if (+ipstime > +ipetime) {
      errors['endDateError'] = <FormattedMessage id='To_date_should_be_greater_than_From_date' />;
    }
    if (!(_.isEmpty(errors))) {
      this.setState({
        validationError: errors
      });

    } else {
      this.setState({
        validationError: {}
      })
      var schoolObj = {
        school: this.state.school.trim(),
        city: this.state.city.trim(),
        country: this.state.country.trim(),
        description: this.state.schoolDesc.trim(),
        graduated: this.state.checkGraduated,
        yearFrom: moment(this.state.yearFrom, "DD/MM/YYYY").utc().toDate(),
        yearTo: moment(this.state.yearTo, "DD/MM/YYYY").utc().toDate(),
      };

      this.props.dispatch(createSchoolRequest(schoolObj));
    }
  }

  handleEditWork(val) {
    for (var i = 0; i < this.props.profile.workeduData.experience.workplace.length; i++) {
      if (this.props.profile.workeduData.experience.workplace[i]._id == val) {
        var data = this.props.profile.workeduData.experience.workplace[i]
        if (data.yearTo == null && data.present == true) {
          this.setState({
            showAddWorkPlaceModal: true,
            company: data.company,
            position: data.position,
            city: data.city,
            country: data.country,
            desc: data.description,
            yearFrom: moment(data.yearFrom).format("DD/MM/YYYY"),
            checkWork: true,
            companyID: val,
            showWorkUpdate: true
          })

        } else {
          this.setState({
            showAddWorkPlaceModal: true,
            company: data.company,
            position: data.position,
            city: data.city,
            country: data.country,
            desc: data.description,
            yearFrom: moment(data.yearFrom).format("DD/MM/YYYY"),
            yearTo: moment(data.yearTo).format("DD/MM/YYYY"),
            companyID: val,
            showWorkUpdate: true
          })
        }
      }
    }
  }

  handleDeleteWork(workId) {
    const userID = this.props.loggedInData.data._id;
    var props = this.props
    alertify.confirm(this.props.intl.messages.warning, this.props.intl.messages.delete_workplace_alert,
      function (result) {
        if (result) {
          props.dispatch(deleteWorkPlaceRequest({ workId/*, userID*/ }));
        }
      },
      function () {

      }
    ).setting('labels', { 'ok': this.props.intl.messages.ok, 'cancel': this.props.intl.messages.cancel });;
  }

  createCollege = (e) => {
    e.preventDefault();

    var ipstime,ipetime;
    if(this.state.inputFromYear != false &&  this.state.inputToYear != false) {
      ipstime = moment(this.state.yearFrom, "DD/MM/YYYY")
      ipetime = moment(this.state.yearTo, "DD/MM/YYYY");
    } else if( this.state.inputFromYear != false) {
       ipstime = moment(this.state.yearFrom, "DD/MM/YYYY")
    } else if(this.state.inputToYear != false) {
      ipetime = moment(this.state.yearTo, "DD/MM/YYYY");
    }
    var now = moment()
    let errors = {};
    if (this.state.university == '') {
      errors['universityError'] = <FormattedMessage id='Please_enter_University' />;
      this.refs.university.focus()
    } if (this.validUniversityStatus) {
      errors['universityError'] = <FormattedMessage id='University_field_cannot_have_empty_spaces' />
      this.refs.university.focus()
    } if (this.state.inputFromYear == false) {
      errors['startDateError'] = <FormattedMessage id="Please_enter_valid_From_Date" />;
    }
    if (this.state.inputToYear == false) {
      errors['endDateError'] = <FormattedMessage id="Please_enter_valid_To_Date" />;
    } else if (+ipstime > +now) {
      errors['endDateError'] = <FormattedMessage id="From_date_cannot_be_in_future" />;
    } else if (+ipstime == +ipetime) {
      errors['endDateError'] = <FormattedMessage id='From_date_and_To_date_cannot_be_same' />;
    } else if (+ipstime > +ipetime) {
      errors['endDateError'] = <FormattedMessage id='To_date_should_be_greater_than_From_date' />;
    }
    if (!(_.isEmpty(errors))) {
      this.setState({
        validationError: errors
      })
    } else {
      this.setState({
        validationError: {}
      })
      var collegeObj = {
        university: this.state.university.trim(),
        city: this.state.city.trim(),
        country: this.state.country.trim(),
        description: this.state.desc.trim(),
        concentration: this.state.conc.trim(),
        yearFrom: moment(this.state.yearFrom, "DD/MM/YYYY").utc().toDate(),
        yearTo: moment(this.state.yearTo, "DD/MM/YYYY").utc().toDate(),
        graduated: this.state.checkGraduated
      };

      const userID = this.props.loggedInData.data._id;
      const universityID = this.state.universityID;

      this.props.dispatch(createCollegeRequest({ collegeObj, userID, universityID }));
    }


  };

  handleEditCollege(val) {
    for (var i = 0; i < this.props.profile.workeduData.education.college.length; i++) {
      if (this.props.profile.workeduData.education.college[i]._id == val) {
        var data = this.props.profile.workeduData.education.college[i]
        this.setState({
          showAddCollegeModal: true,
          university: data.university,
          city: data.city,
          country: data.country,
          position: data.position,
          conc: data.concentration,
          desc: data.description,
          yearFrom: moment(data.yearFrom).format("DD/MM/YYYY"),
          yearTo: moment(data.yearTo).format("DD/MM/YYYY"),
          checkGraduated: data.graduated,
          universityID: val
        })
      }
    }
  }

  handleDeleteCollege(collegeId) {
    const userID = this.props.loggedInData.data._id;
    var props = this.props
    alertify.confirm(this.props.intl.messages.warning, this.props.intl.messages.delete_college_alert,
      function (result) {
        if (result) {
          props.dispatch(deleteCollegeRequest({ collegeId/*, userID*/ }));
        }
      },
      function () {

      }
    ).setting('labels', { 'ok': this.props.intl.messages.ok, 'cancel': this.props.intl.messages.cancel });;
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleKeyPress = (e) => {

    console.log("e.key === ", e.key);
    if (e.key === 'Enter' || e.key === ',') {
      let skill = e.target.value.trim();
      if (skill != '') {
        let skills = this.state.skillList;
        skills.push(skill);
        this.setState({ skillList: skills, value: '', error: '' })
      } else {
        this.setState({ error: 'Please enter the skills' });
      }
      e.preventDefault();
    }
  }

  saveSkills(e) {
    // console.log('saveSkills', e);
    e.preventDefault();
    let errors = {};
    if (this.state.skillList.length <= 0) {
      errors['skillError'] = <FormattedMessage id='Please_enter_atleast_one_skill' />;
      this.setState({ validationError: errors });

    } else {
      this.setState({ validationError: {} })
      const skills = this.state.skillList;
      const userID = this.props.loggedInData.data._id;
      this.props.dispatch(saveSkillsRequest(skills))
    }
  }

  removeskill = (e) => {
    let skills = this.state.skillList;
    let index = skills.indexOf(e.target.id);
    if (index > -1) {
      skills.splice(index, 1);
    }
    this.setState({ skillList: skills });
    this.props.dispatch(isLoggedIn(AuthClient.getSession(),
      '/admin/profile/workedu'))
  }

  handleEditSkill(e) {
    this.setState({
      showAddProfessionalBlock: true,
      skillList: this.props.loggedInData.data.profile.experience.professionalSkills,
      divValue: 'hidden'
    });
  }

  handleDeleteSkill(e) {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning, this.props.intl.messages.delete_professional_alert,
      function (result) {
        if (result) {
          props.dispatch(deleteAllSkillRequest());
        }
      },
      function () {

      }
    ).setting('labels', { 'ok': this.props.intl.messages.ok, 'cancel': this.props.intl.messages.cancel });;
  }


  render() {

    let addInfoBlock = `${weStyles.addInfoBlock} clearfix`;
    let iconBox = `${weStyles.iconBox} pull-left`;
    let addCategoryTxtBox = `${weStyles.addCategoryTxtBox} pull-left`;
    let displayInfoBlock = `${weStyles.displayInfoBlock} clearfix`;
    let informationBox = `${weStyles.informationBox} pull-left`;
    let moreInfoBlock = `${weStyles.moreInfoBlock} pull-right`;
    let singleInfoBox = `${weStyles.singleInfoBox} pull-left`;
    let cls_vr = `${dashboardStyles.vR}`;
    let cls_email = `${dashboardStyles.vN} ${dashboardStyles.bfK} ${dashboardStyles.a3q}`;
    let cls_vt = `${dashboardStyles.vT}`;
    let cls_vm = `${dashboardStyles.vM}`;
    let cls_mailsList = `${dashboardStyles.oj}`;
    let cls_mailsDiv = `${dashboardStyles.wO} ${dashboardStyles.nr} ${dashboardStyles.l1}`;
    let cls_hiddenInput = `${dashboardStyles.wA}`;
    let cls_input = `${dashboardStyles.vO}`;
    let cls_btnSaveChanges = `${weStyles.btnSpace} btn btn-primary`;
    let cls_btnCancle = `${weStyles.btnSpace} btn btn-default`;
    let cls_toMarginLabelAll = `${dashboardStyles.toMarginLabel} control-label col-md-1 `;
    let cls_workingCheckbox = `${dashboardStyles.workingCheck} col-md-1 `;
    let cls_checkAfterLabel = `${dashboardStyles.checkAfter} col-md-1 `;
    let cls_btnSaveEdit = ` ${styles.btnSaveAssign} `;
    let cls_btnSaveEdit2 = ` ${styles.btnSaveAssign2} `;


    var skills = '';
    if (this.state.skillList) {
      if (this.state.skillList.length > 0) {
        let docs = this.state.skillList;
        let count = 10;
        skills = docs.map((doc) =>
          <div className={cls_vr} key={count++}>
            <span className={cls_email}>
              <div className={cls_vt}>{doc}</div>
              <div className={cls_vm} id={doc} onClick={this.removeskill.bind(this)}></div>
            </span>
            <input name='to' type='hidden' value={doc} />
          </div>
        );
      }
    }

    const { yearFrom, yearFromFormat, yearFromInputFormat, yearFromMode, yearFromViewMode, yearTo, maxDate } = this.state;

    const showAddWorkPlaceModal = this.state.showAddWorkPlaceModal
      ?
      <Modal show={this.state.showAddWorkPlaceModal} onHide={this.hideAddWorkPlaceModal.bind(this)}>
        <Header closeButton>
          <Title><FormattedMessage id='add_workplace' /></Title>
        </Header>
        <Body>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputCompany" className="control-label col-md-3" ><FormattedMessage id='work_education_company' /><span className={compStyles.mandatory}>*</span>:</label>
              <div className="col-md-9">
                <input id="company" type="text" className="form-control" style={this.state.validationError && this.state.validationError.companyError ? { borderColor: "#ff0000" } : {}} placeholder={this.props.intl.messages.work_company_placeholder} value={this.state.company} onChange={this.handleCompany.bind(this)} ref="company" maxLength={50} autoFocus='true' />
                <label id="companyError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.companyError ? this.state.validationError.companyError : ''}</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPosition" className="control-label col-md-3" ><FormattedMessage id='work_education_position' /><span className={compStyles.mandatory}>*</span>:</label>
              <div className="col-md-9">
                <input id="position" type="text" className="form-control" style={this.state.validationError && this.state.validationError.positionError ? {borderColor: "#ff0000" } : {}} placeholder={this.props.intl.messages.work_position_placeholder} value={this.state.position} onChange={this.handlePosition.bind(this)} ref="position" maxLength={30} />
                <label id="positionError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.positionError ? this.state.validationError.positionError : ''}</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCity" className="control-label col-md-3" ><FormattedMessage id='city_town' />:</label>
              <div className="col-md-9">
                <input id="city" type="text" className="form-control" value={this.state.city} style={this.state.validationError && this.state.validationError.cityError ? {borderColor: "#ff0000" } : {}} onChange={this.handleCity.bind(this)} ref="city" maxLength={20} />
                <label id="cityError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.cityError ? this.state.validationError.cityError : ''}</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCountry" className="control-label col-md-3" ><FormattedMessage id='country' />:</label>
              <div className="col-md-9">
                <input id="country" type="text" className="form-control" value={this.state.country} style={this.state.validationError && this.state.validationError.countryError ? {borderColor: "#ff0000" } : {}} onChange={this.handleCountry.bind(this)} ref="country" maxLength={20} />
                <label id="countryError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.countryError ? this.state.validationError.countryError : ''}</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputDesc" className="control-label col-md-3"><FormattedMessage id='work_education_desciption' />:</label>
              <div className="col-md-9">
                <textarea id="desc" className="form-control" value={this.state.desc} onChange={this.handleDesc.bind(this)} ref="desc" maxLength={150} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputTime" className="control-label col-md-3"><FormattedMessage id='work_education_timeperiod' /><span className={compStyles.mandatory}>*</span>:</label>
              <div className="col-md-9">
                <input id="workCheck" type="checkbox" className={cls_workingCheckbox} checked={this.state.checkWork} onChange={this.handleCheck.bind(this)} />
                &nbsp;
            <label htmlFor="inputCheck" className="control-label"><FormattedMessage id='work_education_workStatus' /></label>
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="inputTime" className="control-label col-md-3">From</label>
              <div id="fromDate" className="col-md-4">
                <DateTimeField
                  dateTime={yearFrom}
                  format={yearFromFormat}
                  inputFormat={yearFromInputFormat}
                  onChange={this.handleYearFrom.bind(this)}
                  mode={yearFromMode}
                  maxDate={maxDate}
                />
                <label id="fromError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.startDateError ? this.state.validationError.startDateError : ''}</label>                
              </div>
              {
                this.state.checkWork
                  ?
                  <label htmlFor="inputCheck" className="control-label">To Present</label>
                  : <div>
                    <label className={cls_toMarginLabelAll}>To</label>
                    <div id="toDate" className="col-md-4">
                      <DateTimeField
                        dateTime={yearTo}
                        format={yearFromFormat}
                        inputFormat={yearFromInputFormat}
                        onChange={this.handleYearTo.bind(this)}
                        mode={yearFromMode}
                      />
                      <label id="toError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.endDateError ? this.state.validationError.endDateError : ''}</label>
                      
                    </div>
                  </div>
              }
            </div>
          </form>
        </Body>
        <Footer className={styles.mainSaveAssign}>
          <div className={styles.errorSaveAssign}>
            <label id="Error" className={weStyles.error}>{this.state.error}</label>
          </div>
          <div className={styles.blockSaveAssign}>
            <button id="workCancelBtn" onClick={this.hideAddWorkPlaceModal.bind(this)}><FormattedMessage id='cancel' /></button>
            <button id="workSaveBtn" className={cls_btnSaveEdit} onClick={this.createWorkPlace} >{this.state.showWorkUpdate == true ? <FormattedMessage id='Update' /> : <FormattedMessage id='save' />}</button>
          </div>
        </Footer>
      </Modal>
      : null;

    const showAddCollegeModal = this.state.showAddCollegeModal
      ?
      <Modal show={this.state.showAddCollegeModal} onHide={this.hideAddCollegeModal.bind(this)}>
        <Header closeButton>
          <Title className={styles.popHeadingAll} ><FormattedMessage id='add_college' /></Title>
        </Header>
        <Body>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputUniversity" className="control-label col-md-3" ><FormattedMessage id='work_education_university' /><span className={compStyles.mandatory}>*</span>:</label>
              <div className="col-md-9">
                <input id="university" type="text" className="form-control" style={this.state.validationError && this.state.validationError.universityError ? { borderColor: "#ff0000" } : {}}
                 placeholder={this.props.intl.messages.college_university_placeholder} value={this.state.university} onChange={this.handleUniversity.bind(this)} ref="university" maxLength={50} autoFocus='true' />
                <label id="universityError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.universityError ? this.state.validationError.universityError : ''}</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCity" className="control-label col-md-3" ><FormattedMessage id='city_town' />:</label>
              <div className="col-md-9">
                <input id="city" type="text" className="form-control" value={this.state.city} onChange={this.handleCity.bind(this)} ref="city" maxLength={20} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCountry" className="control-label col-md-3" ><FormattedMessage id='country' />:</label>
              <div className="col-md-9">
                <input id="country" type="text" className="form-control" value={this.state.country} onChange={this.handleCountry.bind(this)} ref="country" maxLength={20} />
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="inputTime" className="control-label col-md-3" ><FormattedMessage id='work_education_timeperiod' /><span className={compStyles.mandatory}>*</span>:</label>
              <div id="fromDate" className="col-md-4">
                <DateTimeField
                  dateTime={yearFrom}
                  format={yearFromFormat}
                  inputFormat={yearFromInputFormat}
                  onChange={this.handleYearFrom.bind(this)}
                  mode={yearFromMode}
                  maxDate={maxDate}
                />
                <label id="fromError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.startDateError ? this.state.validationError.startDateError : ''}</label>
                
              </div>
              <label className={cls_toMarginLabelAll}>to</label>
              <div id="toDate" className="col-md-4">
                <DateTimeField
                  dateTime={yearTo}
                  format={yearFromFormat}
                  inputFormat={yearFromInputFormat}
                  onChange={this.handleYearTo.bind(this)}
                  mode={yearFromMode}
                />
                <label id="toError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.endDateError ? this.state.validationError.endDateError : ''}</label>                
              </div>

            </div>
            <div className="form-group">
              <label htmlFor="inputCheck" className="control-label col-md-3"> <FormattedMessage id='work_education_graduated' />:</label>
              &nbsp;
            <input id="checkGraduated" type="checkbox" className={cls_checkAfterLabel} checked={this.state.checkGraduated} onChange={this.handleGraduated.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="inputDesc" className="control-label col-md-3"><FormattedMessage id='work_education_desciption' />:</label>
              <div className="col-md-9">
                <textarea id="desc" className="form-control" value={this.state.desc} onChange={this.handleDesc.bind(this)} ref="desc" maxLength={150} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCon" className="control-label col-md-3"><FormattedMessage id='work_education_concentration' />:</label>
              <div className="col-md-9">
                <input id="conc" type="text" className="form-control" value={this.state.conc} onChange={this.handleConc.bind(this)} ref="conc" maxLength={30} />
              </div>
            </div>
          </form>
        </Body>
        <Footer className={styles.mainSaveAssign}>
          <div className={styles.errorSaveAssign}>
            <label id="Error" className={weStyles.error}>{this.state.error}</label>
          </div>
          <div className={styles.blockSaveAssign}>
            <button id="collegeCancelBtn" onClick={this.hideAddCollegeModal.bind(this)}><FormattedMessage id='cancel' /></button>
            <button id="collegeSaveBtn" className={cls_btnSaveEdit} onClick={this.createCollege} >{this.state.showCollegeUpdate == true ? <FormattedMessage id='Update' /> : <FormattedMessage id='save' />}</button>
          </div>
        </Footer>
      </Modal>
      : null;

    const showAddHighSchoolModal = this.state.showAddHighSchoolModal
      ?
      <Modal show={this.state.showAddHighSchoolModal} onHide={this.hideAddHighSchoolModal.bind(this)}>
        <Header closeButton>
          <Title><FormattedMessage id='add_highSchool' /></Title>
        </Header>
        <Body>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputSchool" className="control-label col-md-3" ><FormattedMessage id='work_education_school' /><span className={compStyles.mandatory}>*</span>:</label>
              <div className="col-md-9">
                <input id="school" type="text" className="form-control" style={this.state.validationError && this.state.validationError.schoolError ? {borderColor : "red"} : {}} placeholder={this.props.intl.messages.school_placeholder}
                  value={this.state.school} style={this.state.validationError && this.state.validationError.schoolError ? { borderColor: "#ff0000" } : {}}
                   onChange={this.handleSchool.bind(this)} ref="school" maxLength={50} autoFocus='true' />
                <label id="schoolError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.schoolError ? this.state.validationError.schoolError : ''}</label>

              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCity" className="control-label col-md-3" ><FormattedMessage id='city_town' />:</label>
              <div className="col-md-9">
                <input id="city" type="text" className="form-control" value={this.state.city} onChange={this.handleCity.bind(this)} ref="city" maxLength={20} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCountry" className="control-label col-md-3" ><FormattedMessage id='country' />:</label>
              <div className="col-md-9">
                <input id="country" type="text" className="form-control" value={this.state.country} onChange={this.handleCountry.bind(this)} ref="country" maxLength={20} />
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="inputTime" className="control-label col-md-3" ><FormattedMessage id='work_education_timeperiod' /><span className={compStyles.mandatory}>*</span>:</label>
              <div id="fromDate" className="col-md-4">
                <DateTimeField
                  dateTime={yearFrom}
                  format={yearFromFormat}
                  inputFormat={yearFromInputFormat}
                  onChange={this.handleYearFrom.bind(this)}
                  mode={yearFromMode}
                  maxDate={maxDate}
                />
                <label id="fromError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.startDateError ? this.state.validationError.startDateError : ''}</label>
                
              </div>
              <label className={cls_toMarginLabelAll}>to</label>
              <div id="toDate" className="col-md-4">
                <DateTimeField
                  dateTime={yearTo}
                  format={yearFromFormat}
                  inputFormat={yearFromInputFormat}
                  onChange={this.handleYearTo.bind(this)}
                  mode={yearFromMode}
                />
                <label id="toError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.endDateError ? this.state.validationError.endDateError : ''}</label>
                
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCheck" className="control-label col-md-3"> <FormattedMessage id='work_education_graduated' />:</label>
              &nbsp;
            <input id="checkGraduated" type="checkbox" className={cls_checkAfterLabel} checked={this.state.checkGraduated} onChange={this.handleGraduated.bind(this)} />
            </div>
            <div className="form-group">
              <label htmlFor="inputDesc" className="control-label col-md-3"><FormattedMessage id='work_education_desciption' />:</label>
              <div className="col-md-9">
                <textarea id="desc" className="form-control" value={this.state.schoolDesc} onChange={this.handleSchoolDesc.bind(this)} ref="desc" maxLength={150} />
              </div>
            </div>
          </form>
        </Body>
        <Footer className={styles.mainSaveAssign}>
          <div className={styles.errorSaveAssign}>
            <label id="Error" className={weStyles.error}>{this.state.error}</label>
          </div>
          <div className={styles.blockSaveAssign}>
            <button id="highSchoolCancelBtn" onClick={this.hideAddHighSchoolModal.bind(this)}><FormattedMessage id='cancel' /></button>
            <button id="highSchoolSaveBtn" className={cls_btnSaveEdit} onClick={this.saveSchool} >{this.state.showSchoolUpdate == true ? <FormattedMessage id='Update' /> : <FormattedMessage id='save' />}</button>
          </div>
        </Footer>
      </Modal>
      : null;

    const showAddProfessionalBlock = this.state.showAddProfessionalBlock
      ?
      <li>
        <div className={weStyles.profileEditBlock}>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputPrSkills" className="control-label col-md-3 col-xs-12"><FormattedMessage id='professionalSkills_title' /><span className={compStyles.mandatory}>*</span>:</label>
              <div className="col-md-9 col-xs-12">
                <div className={cls_mailsDiv}>
                  <input id="skills" className={cls_hiddenInput} aria-hidden="true" />
                  {skills}
                  <input id="profSkills" type="text" className="form-control" onKeyDown={this.handleKeyPress.bind(this)} style={this.state.validationError && this.state.validationError.skillError ? { borderColor: "#ff0000" } : {}}
                   onChange={this.handleChange.bind(this)} value={this.state.value} maxLength={30} autoFocus='true' />
                  <label id="skillsError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.skillError ? this.state.validationError.skillError : ''}</label>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="col-md-offset-3 col-md-9 col-xs-12">
                <div className={styles.blockSaveAssign2}>
                  <button id="profCancelBtn" onClick={this.cancelProfessional.bind(this)}><FormattedMessage id='cancel' /></button>
                  <button id="profSaveBtn" className={cls_btnSaveEdit2} onClick={this.saveSkills.bind(this)} >{this.state.showProfessionalUpdate == true ? <FormattedMessage id='Update' /> : <FormattedMessage id='save' />}</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </li>
      : null;
    return (
      <div className={styles.midContainer}>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
        <div className={styles.whiteCard}>
          <Grid fluid={true}>

            <div className={weStyles.userCategoryInfo}>
              <h2 className={weStyles.categoryHeading}><FormattedMessage id='work_title' /></h2>
              <ul>
                <li>
                  <div className={addInfoBlock} id="addWorkplaceBtn" onClick={this.handleWorkPlace.bind(this)}>
                    <div className={iconBox}>
                      <img src="/images/icons/add-new-blue.png" />
                    </div>
                    <div className={addCategoryTxtBox}>
                      <h2 className={weStyles.addCategoryTxt}><FormattedMessage id='add_workplace' /></h2>
                    </div>
                  </div>
                  {showAddWorkPlaceModal}
                </li>

                {
                  this.props.profile.isFetchedWorkEduData
                    ?
                    this.props.profile.workeduData.experience.workplace.map((data) => {
                      if (data.yearTo == null && data.present == true) {
                        var yearTo = "present"
                      } else {
                        var yearTo = moment(data.yearTo).format("DD/MM/YYYY")
                      }
                      return <li key={data._id}>
                        <div className={displayInfoBlock}>
                          <div className={iconBox}>
                            <img src="/images/icons/company.png" />
                          </div>
                          <div className={informationBox}>
                            <h2 className={weStyles.displayHeadingTxt}>{data.company}</h2>
                            <span className={weStyles.capitalize}>{data.position} </span>
                            <span>| </span>
                            <span>{moment(data.yearFrom).format("DD/MM/YYYY")} to {yearTo} </span>

                            <span className={weStyles.capitalize}>{data.city ? '| ' + data.city : null}</span>
                            <span className={weStyles.capitalize}>{data.country ? ', ' + data.country : null}</span>
                            <p className={weStyles.descriptionTxt}>{data.description}</p>
                          </div>
                          <div className={moreInfoBlock}>
                            <div className={weStyles.moreIconBox} id="workDropdownBtn" onClick={this.handleWorkDropdown.bind(this, data._id)}>
                              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                              {
                                this.state.companyID == data._id
                                  ?
                                  <div className={this.state.workDropdownCss}>
                                    <ul>
                                      <li id="workEditBtn" onClick={this.handleEditWork.bind(this, this.state.companyID)}>
                                        <FormattedMessage id='edit' />
                                      </li>
                                      <li id="workDeleteBtn" onClick={this.handleDeleteWork.bind(this, this.state.companyID)}>
                                        <FormattedMessage id='delete' />
                                      </li>
                                    </ul>

                                  </div>
                                  : null
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    }) : null
                }
              </ul>
            </div>

            <div className={weStyles.userCategoryInfo}>
              <h2 className={weStyles.categoryHeading}><FormattedMessage id='professionalSkills_title' /></h2>
              <ul>
                {
                  this.props.loggedInData
                    ?
                    this.props.loggedInData.data
                      ?
                      this.props.loggedInData.data.profile
                        ?
                        this.props.loggedInData.data.profile.experience.professionalSkills.length == 0 ?

                          this.state.showAddProfessionalBlock == true
                            ?
                            <div>
                              {showAddProfessionalBlock}
                            </div>
                            :
                            <li>
                              <div className={addInfoBlock} id="addProSkillsBtn" onClick={this.handleProfessional.bind(this)}>
                                <div className={iconBox}>
                                  <img src="/images/icons/add-new-blue.png" />
                                </div>
                                <div className={addCategoryTxtBox}>
                                  <h2 className={weStyles.addCategoryTxt}><FormattedMessage id='add_professionalSkills' /></h2>
                                </div>
                              </div>
                            </li>
                          :

                          this.state.showAddProfessionalBlock == true
                            ?
                            <div>
                              {showAddProfessionalBlock}
                            </div>
                            :
                            <li>
                              <div className={displayInfoBlock}>
                                <div className={singleInfoBox}>
                                  <h2 className={weStyles.displayHeadingTxt}>{this.props.loggedInData.data.profile.experience.professionalSkills.map(
                                    (data, index) =>
                                      <div className={cls_vr} key={index} >
                                        <span className={cls_email}>
                                          <div className={cls_vt}>{data}</div>
                                        </span>
                                      </div>
                                  )}
                                  </h2>
                                </div>
                                <div className={moreInfoBlock}>
                                  <div id="profDropdown" className={weStyles.moreIconBox} onClick={this.handleProfDropdown.bind(this)}>
                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                    <div className={this.state.profDropdownCss}>
                                      <ul>
                                        <li id="editSkillsBtn" onClick={this.handleEditSkill.bind(this)}>
                                          <FormattedMessage id='edit' />
                                        </li>
                                        <li id="deleteSkills" onClick={this.handleDeleteSkill.bind(this)}>
                                          <FormattedMessage id='delete' />
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li> : null : null : null
                }
              </ul>
            </div>

            <div className={weStyles.userCategoryInfo}>
              <h2 className={weStyles.categoryHeading}><FormattedMessage id='college_title' /></h2>
              <ul>
                <li>
                  <div className={addInfoBlock} id="addCollegeBtn" onClick={this.handleCollege.bind(this)}>
                    <div className={iconBox}>
                      <img src="/images/icons/add-new-blue.png" />
                    </div>
                    <div className={addCategoryTxtBox}>
                      <h2 className={weStyles.addCategoryTxt}><FormattedMessage id='add_college' /></h2>
                    </div>
                  </div>
                  {showAddCollegeModal}
                </li>
                {
                  this.props.profile.isFetchedWorkEduData
                    ?
                    this.props.profile.workeduData.education.college.map((data) => {
                      return <li key={data._id}>
                        <div className={displayInfoBlock}>
                          <div className={iconBox}>
                            <img src="/images/icons/college.png" />
                          </div>
                          <div className={informationBox}>
                            <h2 className={weStyles.displayHeadingTxt}>{data.university}</h2>
                            <span>{moment(data.yearFrom).format("DD/MM/YYYY")} to {moment(data.yearTo).format("DD/MM/YYYY")} </span>

                            <span className={weStyles.capitalize}>{data.city ? '| ' + data.city : null}</span>
                            <span className={weStyles.capitalize}>{data.country ? ', ' + data.country : null}</span>
                            <p className={weStyles.descriptionTxt}>{data.description}</p>
                          </div>
                          <div className={moreInfoBlock}>
                            <div id="collegeDropdown" className={weStyles.moreIconBox} onClick={this.handleCollegeDropdown.bind(this, data._id)}>
                              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                              {
                                this.state.universityID == data._id
                                  ?
                                  <div className={this.state.collegeDropdownCss}>
                                    <ul>
                                      <li id="editCollegeBtn" onClick={this.handleEditCollege.bind(this, this.state.universityID)}>
                                        <FormattedMessage id='edit' />
                                      </li>
                                      <li id="deleteCollegeBtn" onClick={this.handleDeleteCollege.bind(this, this.state.universityID)}>
                                        <FormattedMessage id='delete' />
                                      </li>
                                    </ul>
                                  </div>
                                  : null
                              }
                            </div>
                          </div>
                        </div>
                      </li>
                    }) : null
                }
              </ul>
            </div>

            <div className={weStyles.userCategoryInfo}>
              <h2 className={weStyles.categoryHeading}><FormattedMessage id='highSchool_title' /></h2>
              <ul>
                {
                  this.props.loggedInData
                    ?
                    this.props.loggedInData.data
                      ?
                      this.props.loggedInData.data.profile
                        ?
                        !this.props.loggedInData.data.profile.education.highSchool ?
                          (
                            <li>
                              <div className={addInfoBlock} id="addHighSchoolBtn" onClick={this.handleHighSchool.bind(this)}>
                                <div className={iconBox}>
                                  <img src="/images/icons/add-new-blue.png" />
                                </div>
                                <div className={addCategoryTxtBox}>
                                  <h2 className={weStyles.addCategoryTxt}><FormattedMessage id='add_highSchool' /></h2>
                                </div>
                              </div>
                              {showAddHighSchoolModal}
                            </li>
                          ) :
                          (
                            <li>
                              <div className={displayInfoBlock}>
                                <div className={iconBox}>
                                  <img src="/images/icons/school.png" />
                                </div>
                                <div className={informationBox}>
                                  <h2 className={weStyles.displayHeadingTxt}>{this.props.loggedInData.data.profile.education.highSchool.school}</h2>
                                  <span>{moment(this.props.loggedInData.data.profile.education.highSchool.yearFrom).format("DD/MM/YYYY")} to {moment(this.props.loggedInData.data.profile.education.highSchool.yearTo).format("DD/MM/YYYY")} </span>

                                  <span className={weStyles.capitalize}>{this.props.loggedInData.data.profile.education.highSchool.city ? '| ' + this.props.loggedInData.data.profile.education.highSchool.city : null}</span>
                                  <span className={weStyles.capitalize}>{this.props.loggedInData.data.profile.education.highSchool.country ? ', ' + this.props.loggedInData.data.profile.education.highSchool.country : null}</span>
                                  <p className={weStyles.descriptionTxt}>{this.props.loggedInData.data.profile.education.highSchool.description}</p>
                                </div>
                                <div className={moreInfoBlock}>
                                  <div className={weStyles.moreIconBox}>
                                    <i id="schoolDropdown" className="fa fa-ellipsis-v" aria-hidden="true" onClick={this.handleSchoolDropdown.bind(this)}></i>
                                    <div className={this.state.schoolDropdownCss}>
                                      <ul>
                                        <li id="editSchoolBtn" onClick={this.handleSchoolEdit.bind(this)}>
                                          <FormattedMessage id='edit' />
                                        </li>
                                        <li  id="deleteSchoolBtn" onClick={this.handleSchoolDelete.bind(this)}>
                                          <FormattedMessage id='delete' />
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {showAddHighSchoolModal}
                            </li>
                          ) : null : null : null
                }
              </ul>
            </div>

          </Grid>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    profile: profileData(state),
    intl: state.intl
  };
}

WorkEduView.contextTypes = {
  router: React.PropTypes.object,
  intl: React.PropTypes.object.isRequired
};

WorkEduView.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

export default connect(mapStateToProps)(WorkEduView);
