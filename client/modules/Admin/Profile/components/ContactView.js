import React, { PropTypes ,Component} from 'react';
import { Link } from 'react-router';
import FontAwesome from 'react-fontawesome';
import { isLoggedIn } from '../../../Login/LoginActions';
import { loggedInData } from '../../../Login/LoginReducer';
import AuthClient from '../../../../components/AuthController';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {Col, Row, Grid, Modal, FormControl} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal'; 
import styles from '../../Admin.css';
import weStyles from './WorkEdu.css';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import isServer from 'detect-node';
import Promise from 'bluebird';
const Moment = !isServer ? Promise.promisifyAll(require('moment')) : null;
import { saveUserAddress, deleteAddressRequest, saveUserWebsite, saveUserSocialLink, saveBasicInfoData, deleteWebsiteRequest, deleteSocialLinkRequest, deleteBirthDayRequest, deleteGenderRequest, emptyFieldNotification } from '../ProfileActions';
import compStyles from '../../../../components/component.css';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

export class ContactView extends Component {
   constructor(props) {
    super(props);
    this.validAddressStatus = false;
    this.validWebsiteStatus = false;
    this.validSocialStatus = false;
    this.validCityStatus = null;
    this.validZipStatus = null;
    this.state = {
      showAddAddressModal: false,
      showAddInfoModal: false,
      showAddWebsiteBlock: false,
      showAddSocialBlock: false,
      error : '',
      addressDropdownCss: `${weStyles.moreDropDown}`,
      landmarkDropdownCss: `${weStyles.moreDropDown}`,
      websiteDropdownCss: `${weStyles.moreDropDown}`,
      socialDropdownCss: `${weStyles.moreDropDown}`,
      birthdateDropdownCss: `${weStyles.moreDropDown}`,
      birthyearDropdownCss: `${weStyles.moreDropDown}`,
      genderDropdownCss: `${weStyles.moreDropDown}`,
      startDate: null,
      // startDate: moment().format('DD/MM/YYYY'),
      startDateFormat: "DD/MM/YYYY",
      startDateInputFormat: "DD/MM/YYYY",
      startDateMode: "date",
      address:'',
      city:'',
      zip:'',
      landMark:'',
      website:'',
      socialLink:'',
      gender:'',
      showAddressUpdate : false ,
      showWebsiteUpdate : false,
      showBirthUpdate : false,
      showSocialUpdate : false,
      showGenderUpdate: false,
      validationError: {}
    }

   }
  // componentWillMount() {
  //     this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
  //                   '/admin/profile/workedu'))
  // }

  componentDidMount() {
    window.addEventListener('click', this.myHandler.bind(this));
    // document.body.addEventListener('click', this.myHandler.bind(this));
  }

  myHandler(e) { 
    if(this.state.addressDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.genderDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.birthdateDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.websiteDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}` || this.state.socialDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        addressDropdownCss: `${weStyles.moreDropDown}`,
        birthdateDropdownCss: `${weStyles.moreDropDown}`,
        birthyearDropdownCss: `${weStyles.moreDropDown}`,
        genderDropdownCss: `${weStyles.moreDropDown}`,
        websiteDropdownCss: `${weStyles.moreDropDown}`,
        socialDropdownCss: `${weStyles.moreDropDown}`
      })      
    } 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success && nextProps.success != "") {
      this.refs.container.success(`${nextProps.success} `, ``);
      this.state = {
        showAddAddressModal: false,
        showAddInfoModal: false,
        showAddWebsiteBlock: false,
        showAddSocialBlock: false,
        error : '',
        addressDropdownCss: `${weStyles.moreDropDown}`,
        landmarkDropdownCss: `${weStyles.moreDropDown}`,
        websiteDropdownCss: `${weStyles.moreDropDown}`,
        socialDropdownCss: `${weStyles.moreDropDown}`,
        birthdateDropdownCss: `${weStyles.moreDropDown}`,
        birthyearDropdownCss: `${weStyles.moreDropDown}`,
        genderDropdownCss: `${weStyles.moreDropDown}`,
        startDate: null,
        // startDate: moment().format('DD/MM/YYYY'),
        startDateFormat: "DD/MM/YYYY",
        startDateInputFormat: "DD/MM/YYYY",
        startDateMode: "date",
        address:'',
        city:'',
        zip:'',
        landMark:'',
        website:'',
        socialLink:'',
        gender:'',
      }
    }
    if(nextProps.error && nextProps.error.length > 0) {
      this.refs.container.error(`${nextProps.error} `, ``);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.myHandler);
    // document.body.removeEventListener('click', this.myHandler);
  }


  handleAddress() {
    this.setState({
      showAddAddressModal: true,
    })
  }

  hideAddAddressModal() {
    this.setState({
      showAddAddressModal: false,
      showAddInfoModal: false,
      showAddWebsiteBlock: false,
      showAddSocialBlock: false,
      error : '',
      addressDropdownCss: `${weStyles.moreDropDown}`,
      landmarkDropdownCss: `${weStyles.moreDropDown}`,
      websiteDropdownCss: `${weStyles.moreDropDown}`,
      socialDropdownCss: `${weStyles.moreDropDown}`,
      birthdateDropdownCss: `${weStyles.moreDropDown}`,
      birthyearDropdownCss: `${weStyles.moreDropDown}`,
      genderDropdownCss: `${weStyles.moreDropDown}`,
      startDate: null,
      // startDate: moment().format('DD/MM/YYYY'),
      startDateFormat: "DD/MM/YYYY",
      startDateInputFormat: "DD/MM/YYYY",
      startDateMode: "date",
      address:'',
      city:'',
      zip:'',
      landMark:'',
      website:'',
      socialLink:'',
      gender:'',
      showAddressUpdate: false,
      validationError: {}
    })
  }

  handleInfo() {
    this.setState({
      showAddInfoModal: true,
    })
  }

  hideAddInfoModal() {
    this.setState({
      showAddAddressModal: false,
      showAddInfoModal: false,
      showAddWebsiteBlock: false,
      showAddSocialBlock: false,
      error : '',
      addressDropdownCss: `${weStyles.moreDropDown}`,
      landmarkDropdownCss: `${weStyles.moreDropDown}`,
      websiteDropdownCss: `${weStyles.moreDropDown}`,
      socialDropdownCss: `${weStyles.moreDropDown}`,
      birthdateDropdownCss: `${weStyles.moreDropDown}`,
      birthyearDropdownCss: `${weStyles.moreDropDown}`,
      genderDropdownCss: `${weStyles.moreDropDown}`,
      startDate: null,
      // startDate: moment().format('DD/MM/YYYY'),
      startDateFormat: "DD/MM/YYYY",
      startDateInputFormat: "DD/MM/YYYY",
      startDateMode: "date",
      address:'',
      city:'',
      zip:'',
      landMark:'',
      website:'',
      socialLink:'',
      gender:'',
      showBirthUpdate : false,
      showGenderUpdate : false,
      validationError : ''
    })
  }

  handleAddressDropdown(e) {
    e.stopPropagation();
    if(this.state.addressDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`){
      this.setState({
        addressDropdownCss: `${weStyles.moreDropDown}`,
        showAddressUpdate : true
      })
    } else if(this.state.addressDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        addressDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showAddressUpdate : true
      })
    }
  }

  handleLandmarkDropdown(e) {
    e.stopPropagation();
    if(this.state.landmarkDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`){
      this.setState({
        landmarkDropdownCss: `${weStyles.moreDropDown}`,
      })
    } else if(this.state.landmarkDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        landmarkDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
      })
    }
  }

  handleWebsiteDropdown(e) { 
    e.stopPropagation();      
    if(this.state.websiteDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        websiteDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showWebsiteUpdate : true
      })      
    } else if(this.state.websiteDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`) {
      this.setState({
        websiteDropdownCss: `${weStyles.moreDropDown}`,
        showWebsiteUpdate : true
      })    
    }     
  }

  handleSocialDropdown(e) {
    e.stopPropagation();
    if(this.state.socialDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`){
      this.setState({
        socialDropdownCss: `${weStyles.moreDropDown}`,
        showSocialUpdate : true
      })
    } else if(this.state.socialDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        socialDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showSocialUpdate : true
      })
    }
  }

  handleGenderDropdown(e) {
    e.stopPropagation();
    if(this.state.genderDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`){
      this.setState({
        genderDropdownCss: `${weStyles.moreDropDown}`,
        showGenderUpdate : true,
      })
    } else if(this.state.genderDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        genderDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showGenderUpdate : true,
      })
    }
  }

  handleBirthDateDropdown(e) {
    e.stopPropagation();
    if(this.state.birthdateDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`){
      this.setState({
        birthdateDropdownCss: `${weStyles.moreDropDown}`,
        showBirthUpdate : true
      })
    } else if(this.state.birthdateDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        birthdateDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
        showBirthUpdate : true
      })
    }
  }

  handleBirthYearDropdown(e) {
    e.stopPropagation();
    if(this.state.birthyearDropdownCss == `${weStyles.moreDropDown} ${weStyles.slideDown}`){
      this.setState({
        birthyearDropdownCss: `${weStyles.moreDropDown}`,
      })
    } else if(this.state.birthyearDropdownCss == `${weStyles.moreDropDown}`) {
      this.setState({
        birthyearDropdownCss: `${weStyles.moreDropDown} ${weStyles.slideDown}`,
      })
    }
  }

  handleWebsite() {
    this.setState({
      showAddWebsiteBlock: true,
    })
  }

  cancelWebsite(e) {
    //changeBy : pranathi, disc: updating the error as empty
    e.preventDefault()
    this.setState({
      showAddWebsiteBlock: false,
      website: '',
      showWebsiteUpdate : false,
      validationError : {}
    })
  }

  handleSocial() {
    this.setState({
      showAddSocialBlock: true,
    })
  }

  cancelSocial(e) {
    e.preventDefault()
    this.setState({
      showAddSocialBlock: false,
      socialLink: '',
      showSocialUpdate : false,
      validationError : {}
    })
  }

  handleStartDate(newDate) {
    this.setState({startDate: newDate});
  }

  handleUserAddress(event) {
    let val = _.startCase(_.toLower(event.target.value));
    val = val.length != event.target.value.length ? event.target.value : val;
    this.setState({address:val});
    //this.validAddressStatus = this.validateSpace(event.target.value);
  }

  validateSpace(value) {
    var re = /^[ ]*$/;
    return re.test(value);
  }

  handleCity(event) {
    let val = _.startCase(_.toLower(event.target.value));
    val = val.length != event.target.value.length ? event.target.value : val;
    this.setState({city: val});
    //this.validCityStatus = this.validateAplhaWithSpace(event.target.value);
  }

  validateAplhaWithSpace(value) {
    var re = /^[a-zA-Z ]*$/;
    return re.test(value)
  }

  handleZip(event) {
    //console.log("event.target.value", event.target.value);
    this.setState({zip: event.target.value.trim()});
    //this.validZipStatus = this.validateZip(event.target.value);
  }
  
  validateZip(value) {
    var re = /^[0-9]{6}$/;
    return re.test(value)
  }

  handleLandMark(event) {
    let val = _.startCase(_.toLower(event.target.value));
    val = val.length != event.target.value.length ? event.target.value : val;
    this.setState({landMark: val});
  }

  saveAddress(e) {
    e.preventDefault();
    var city = '';
    var zip = ''; 
    var address = '';
    var landmark = '';
    let errors = {};
    if (this.state.address == '') errors['addressError'] = <FormattedMessage id='Please_enter_Address' />;    
    else if (this.validateSpace(this.state.address) == true) {
      errors['addressError'] = <FormattedMessage id='Please_enter_a_valid_Address' />;
      this.refs.address.focus()
    }
    if (this.state.city == '') errors['cityError'] = <FormattedMessage id='Please_enter_City' />;  
    else if (this.validateAplhaWithSpace(this.state.city) == false) {
      errors['cityError'] = <FormattedMessage id='Please_enter_a_valid_City' />; 
      // this.refs.container.error("Please enter a valid city name");
      this.refs.city.focus()
    }
    if (this.state.zip == '') errors['zipError'] = <FormattedMessage id= 'Please_enter_Zip' />;    
    else if (this.validateZip(this.state.zip) == false) {
      errors['zipError'] = <FormattedMessage id='Please_enter_a_valid_Zip' />;  
      // this.refs.container.error("Please enter a valid zip");
      this.refs.zip.focus()
    }
    if (!(_.isEmpty(errors))) {
      this.setState({
        validationError: errors
      });

    } else {
      this.setState({
        validationError: {}
      })
      address = this.state.address.trim();
      zip = this.state.zip; 
      city = this.state.city.trim(); 
      landmark = this.state.landMark!=''?this.state.landMark.trim():this.state.landMark;    
      var userAdressObj = {
        _id: this.props.loggedInData.data._id,
        profile:{
          contact:{      
            address:address,
            city:city,
            zip:zip,
            landMark:landmark
          } 
        }
      }
    // console.log("Data before calling saving action", userAdressObj);
      this.props.dispatch(saveUserAddress(userAdressObj))
    }
      
  }




  handleEditAddress() {
    var addressObj = this.props.loggedInData.data.profile.contact;
    this.setState({
      showAddAddressModal: true,
      address: addressObj.address,
      city: addressObj.city,
      zip: addressObj.zip,
      landMark: addressObj.landMark
    });   
  }

  handleDeleteAddress() {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_address_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteAddressRequest({ /*userID*/ }));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  handleWebsiteChange(event) {
    this.setState({website: event.target.value});
    //this.validWebsiteStatus = this.validateUrl(event.target.value);
  }

  validateUrl(value) {
    var re = /(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
    return re.test(value);
  }

  saveUserWebsiteData(e) {
    e.preventDefault();
    let errors = {};
    if (this.state.website == '') {
      errors['websiteError'] = <FormattedMessage id='Please_enter_website' />;
      this.setState({ validationError: errors });      
      // this.refs.container.error("Please enter website");
      this.refs.website.focus()
     } else if (!this.validateUrl(this.state.website)) {
      errors['websiteError'] = <FormattedMessage id='Please_enter_valid_website' />;
      this.setState({ validationError: errors });            
      // this.refs.container.error("Invalid format");
      this.refs.website.focus()
    } else {
      this.setState({validationError:{}})
      var userWebsiteObj = {
        _id: this.props.loggedInData.data._id,
        profile:{           
          website:this.state.website.trim()              
        }
      }
      this.props.dispatch(saveUserWebsite(userWebsiteObj))
    }
  }

  handleSocialLink(event) {
    this.setState({socialLink: event.target.value});
    this.validSocialStatus = this.validateUrl(event.target.value);
  }

  handleWesiteNameEnterKey = (e)=>{
    if(e.key === 'Enter'){
      this.saveUserWebsiteData(e);
    }
  }

  handleSocialLinkEnterKey = (e)=>{
    if(e.key === 'Enter'){
      this.saveSocialLinkData(e);
    }
  }

  saveSocialLinkData(e) {
    e.preventDefault();
    let errors = {};
    if (this.state.socialLink == '') {
      errors['socialError'] = <FormattedMessage id='Please_enter_social_link' />; 
      this.setState({ validationError: errors });            
      // this.refs.container.error("Please enter social link");
      this.refs.social.focus()
    } else if (!this.validSocialStatus) {
      errors['socialError'] = <FormattedMessage id='Please_enter_valid_social_link' />;
      this.setState({ validationError: errors });                  
      // this.refs.container.error("Invalid format");
      this.refs.social.focus()
    } else {
      this.setState({validationError:{}})
      var userSocialObj = {
        _id: this.props.loggedInData.data._id,
        profile:{           
          socialLink:this.state.socialLink.trim()              
        }
      }      
      // console.log("Data before calling saving website action", userSocialObj);
      this.props.dispatch(saveUserSocialLink(userSocialObj))
    }  
  }

  handleGender (event) {
    this.setState({gender: event.target.value, validationError: ''});
  }

  saveBasicInfo(e) {
    e.preventDefault();
    let errors = {};
    var userBasicInfoObj = {
      _id: this.props.loggedInData.data._id,
      profile:{           
        dateofbirth:this.state.startDate,
        gender:this.state.gender              
      }
    }

    if((this.state.startDate!=null && this.state.gender) || this.state.startDate!=null) {
      let newBDate = moment(this.state.startDate, 'DD/MM/YYYY');
      let currentData = moment();
      let errors = {};
      if (+newBDate < +currentData && this.state.startDate != null) {  
        this.setState({ validationError: {} });        
        this.props.dispatch(saveBasicInfoData(userBasicInfoObj));
      }  else if (!newBDate.isValid()) {
        errors['dateError'] = <FormattedMessage id='Please_enter_valid_Date_of_birth' />;  
        this.setState({ validationError: errors });        
      } else {
        errors['dateError'] = <FormattedMessage id='Date_of_birth_cannot_be_future_Date' />;
        this.setState({ validationError: errors }); 
      }
    } else if (this.state.gender) {
      this.setState({ validationError: {} });     
      this.props.dispatch(saveBasicInfoData(userBasicInfoObj));
    } else {
      errors['genderError'] = <FormattedMessage id='Please_select_Gender' />;
      this.setState({ validationError: errors });
      
      // this.refs.container.error("No data to save");
    }
  }   

  handleDeleteWebsite() {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_link_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteWebsiteRequest({ /*userID*/ }));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  handleDeleteSocialLink() {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_social_link_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteSocialLinkRequest({ /*userID*/ }));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  handleDeleteBirthDay() {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_birth_day_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteBirthDayRequest({ /*userID*/ }));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  handleDeleteGender() {
    const userID = this.props.loggedInData.data._id;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_gender_alert, 
      function (result) {
        if(result) {
          props.dispatch(deleteGenderRequest({ /*userID*/ }));
        }
      },
      function() {

      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  }

  handleEditWebsite() {
    var website = this.props.loggedInData.data.profile.website;
    this.setState({
      showAddWebsiteBlock: true,
      website: website,
    });

  }

  handleEditSocial() {
    var socialLink = this.props.loggedInData.data.profile.socialLink;
    this.setState({
      showAddSocialBlock: true,
      socialLink: socialLink,
    });   
  }

  handleEditBasic() {
    
    var gender = this.props.loggedInData.data.profile.gender;
    var dobDate = this.props.loggedInData.data.profile.dateofbirth;
    //var dob = this.state.startDate;
    var dob = moment(dobDate).format('DD/MM/YYYY');
    if(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.profile && this.props.loggedInData.data.profile.dateofbirth){
      dob = moment(dobDate).format('DD/MM/YYYY');
    }
    this.setState({
      showAddInfoModal: true,
      gender: gender,
      startDate: dob      
    });  
    console.log("this.state.startDate", this.state.startDate);
    console.log("this.props.loggedInData.data.profile.dateofbirth", this.props.loggedInData.data.profile.dateofbirth);
    console.log("dob", dob);
  }

  render () {

    console.log("reder start date", this.state.startDate);
    // console.log(this.state.websiteDropdownCss);
    let addInfoBlock = `${weStyles.addInfoBlock} clearfix`;
    let iconBox = `${weStyles.iconBox} pull-left`;
    let addCategoryTxtBox = `${weStyles.addCategoryTxtBox} pull-left`;
    let displayInfoBlock = `${weStyles.displayInfoBlock} clearfix`;
    let informationBox = `${weStyles.informationBox} pull-left`;
    let moreInfoBlock = `${weStyles.moreInfoBlock} pull-right`;
    let singleInfoBox = `${weStyles.singleInfoBox} pull-left`;
    let cls_btnSaveChanges = `${weStyles.btnSpace} btn btn-primary`;
    let cls_btnCancle = `${weStyles.btnSpace} btn btn-default`;
    let cls_btnSaveEdit = ` ${styles.btnSaveAssign} `;
    let cls_btnSaveEdit2 = ` ${styles.btnSaveAssign2} `;

    if(this.props.loggedInData && this.props.loggedInData.data && this.props.loggedInData.data.profile) {
      if(this.props.loggedInData.data.profile.contact) {
       var isAddressObj = this.props.loggedInData.data.profile.contact;  
       var userAddress = this.props.loggedInData.data.profile.contact.address;
       var userCity = this.props.loggedInData.data.profile.contact.city;
       var userZip = this.props.loggedInData.data.profile.contact.zip;
       var userLandMark = this.props.loggedInData.data.profile.contact.landMark   
      }
      if(this.props.loggedInData.data.profile.website) {
        var isWebsiteObj = this.props.loggedInData.data.profile.website;
        if(!isWebsiteObj.match(/http/g)) {
            var addHead = "https://";
            var websiteURL = addHead + isWebsiteObj;
        } else {
          var websiteURL = isWebsiteObj;
        }      
      }
      if(this.props.loggedInData.data.profile.socialLink) {
        var isSociallinkObj = this.props.loggedInData.data.profile.socialLink; 
        if(!isSociallinkObj.match(/http/g)) {
            var addHead = "https://";
            var socialURL = addHead + isSociallinkObj; 
        } else {
          var socialURL = isSociallinkObj;
        }   
      }
      if(this.props.loggedInData.data.profile.gender || this.props.loggedInData.data.profile.dateofbirth) {              
        var userBirthInfo = this.props.loggedInData.data.profile.dateofbirth;
        if(userBirthInfo) {
          var userBirthDate = Moment(userBirthInfo).format("DD/MM/YYYY");
          // var userBirthYear = Moment(userBirthInfo).format("YYYY");
        } else {
          var userBirthDate = '';
          //var userBirthYear = '';
        }
        if(this.props.loggedInData.data.profile.gender) {
          var userGender = this.props.loggedInData.data.profile.gender;
        } else {
          var userGender = '';
        }      
      } else {
        var isBasicInfoData = true;
      }
    }
    // if(this.props.loggedInData.data.profile.website) {
    //    var isWebsiteObj = this.props.loggedInData.data.profile.website;       
    // }
    // if(this.props.loggedInData.data.profile.socialLink) {
    //    var isSociallinkObj = this.props.loggedInData.data.profile.socialLink;   
    // }
    // if(this.props.loggedInData.data.profile.gender || this.props.loggedInData.data.profile.dateofbirth) {              
    //    var userBirthInfo = this.props.loggedInData.data.profile.dateofbirth;
    //   if(userBirthInfo) {
    //     var userBirthDate = Moment(userBirthInfo).format("MMMM-DD");
    //     var userBirthYear = Moment(userBirthInfo).format("YYYY");
    //   } else {
    //     var userBirthDate = '';
    //     var userBirthYear = '';
    //   }
    //   if(this.props.loggedInData.data.profile.gender) {
    //     var userGender = this.props.loggedInData.data.profile.gender;
    //   } else {
    //     var userGender = '';
    //   }      
    // } else {
    //   var isBasicInfoData = true;
    // }     
    
    const {startDateFormat, startDateInputFormat, startDateMode} = this.state;
    const startDate = moment().format('DD/MM/YYYY');

    const showAddAddressModal = this.state.showAddAddressModal
    ?
    <Modal show={this.state.showAddAddressModal} onHide={this.hideAddAddressModal.bind(this)}>
    
      <Header closeButton>
        <Title className={styles.popHeadingAll} ><FormattedMessage id = 'add_address'/></Title>
      </Header>
      <Body>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputAddress" className="control-label col-md-3" ><FormattedMessage id = 'address'/><span className={compStyles.mandatory}>*</span>:</label>
            <div className="col-md-9">
                <input id="address" type="text" className="form-control" value={this.state.address} onChange={this.handleUserAddress.bind(this)} ref="address" maxLength={50} style={this.state.validationError && this.state.validationError.addressError ? { borderColor: "#ff0000" } : {}} autoFocus='true' />
                <label id="addressError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.addressError ? this.state.validationError.addressError : ''}</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputCity" className="control-label col-md-3"><FormattedMessage id = 'city_town'/><span className={compStyles.mandatory}>*</span>:</label>
            <div className="col-md-9">
                <input id="city" type="text" className="form-control" value={this.state.city} style={this.state.validationError && this.state.validationError.cityError ? { borderColor: "#ff0000" } : {}}
                 onChange={this.handleCity.bind(this)} ref="city" maxLength={20} />
                <label id="cityError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.cityError ? this.state.validationError.cityError : ''}</label>

            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputZip" className="control-label col-md-3"><FormattedMessage id = 'zip'/><span className={compStyles.mandatory}>*</span>:</label>
            <div className="col-md-9">
                <input id="zip" type="text" className="form-control" value={this.state.zip} style={this.state.validationError && this.state.validationError.zipError ? { borderColor: "#ff0000" } : {}}
                   onChange={this.handleZip.bind(this)} ref="zip" maxLength={10} />
                <label id="zipError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.zipError ? this.state.validationError.zipError : ''}</label>

            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputLandmark" className="control-label col-md-3"><FormattedMessage id = 'landmark'/></label>
            <div className="col-md-9">
                <input id="landmark" type="text" className="form-control" value={this.state.landMark} onChange={this.handleLandMark.bind(this)} maxLength={30}/>
            </div>
          </div>
        </form>
      </Body>
      <Footer className={styles.mainSaveAssign}>
        <div className={styles.errorSaveAssign}>
          <label id="Error" className={weStyles.error}>{this.state.error}</label>
        </div>
        <div className={styles.blockSaveAssign}>
          <button id="addressCancelBtn" onClick={this.hideAddAddressModal.bind(this)} ><FormattedMessage id = 'cancel'/></button>
          <button id="addressSaveBtn" className={cls_btnSaveEdit} onClick={this.saveAddress.bind(this)}>{this.state.showAddressUpdate == true ? <FormattedMessage id = 'Update'/> : <FormattedMessage id = 'save'/>}</button>
        </div>
      </Footer>
    </Modal>
      : null;

    const showAddInfoModal = this.state.showAddInfoModal
    ?
    <Modal show={this.state.showAddInfoModal} onHide={this.hideAddInfoModal.bind(this)}>
      <Header closeButton>
        <Title className={styles.popHeadingAll} ><FormattedMessage id = {this.state.startDate?'update_basic_information':'add_basic_information'}/></Title>
      </Header>
      <Body>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputBirthday" className="control-label col-md-3" ><FormattedMessage id = 'birthday'/><span className={compStyles.mandatory}>*</span>:</label>
            <div id="birthday" className="col-md-9">
              <DateTimeField                
                dateTime={this.state.startDate?this.state.startDate:startDate}                                              
                format={startDateFormat}
                inputFormat={startDateInputFormat}
                onChange={this.handleStartDate.bind(this)}
                mode={startDateMode}
                maxDate={moment().subtract(1, "days")} 
              />
              <label id="birthdayError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.dateError ? this.state.validationError.dateError : ''}</label>
                
            </div>
          </div>
        {/*Gender format changed to radio button from dropdown - By Keerthi*/}
          <div className="form-group ">
            <label htmlFor="inputGender" className="control-label col-md-3" ><FormattedMessage id = 'gender'/><span className={compStyles.mandatory}>*</span>:</label>
            <div className="col-md-9">
              <div className={weStyles.genderBlock}>
                <input id="genderMale" type="radio" name="gender" value="Male" onChange={this.handleGender.bind(this)} checked={this.state.gender == 'Male'}/>
                <span className={weStyles.genderText}><FormattedMessage id = 'male'/></span>
                <input id="genderFemale" type="radio" className={weStyles.genderInput} name="gender" value="Female" onChange={this.handleGender.bind(this)} checked={this.state.gender == 'Female'}/>
                <span className={weStyles.genderText}><FormattedMessage id = 'female'/></span>
              </div>
              <label id="genderError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.genderError ? this.state.validationError.genderError : ''}</label>
                
            </div>
          </div>
        </form>
      </Body>
      <Footer className={styles.mainSaveAssign}>
        <div className={styles.errorSaveAssign}>
          <label id="Error" className={weStyles.error}>{this.state.error}</label>
        </div>
        <div className={styles.blockSaveAssign}>
          <button id="basicCancelBtn" onClick={this.hideAddInfoModal.bind(this)} ><FormattedMessage id = 'cancel'/></button>
          <button id="basicSaveBtn" className={cls_btnSaveEdit} onClick={this.saveBasicInfo.bind(this)} >{this.state.showBirthUpdate == true || this.state.showGenderUpdate == true ? <FormattedMessage id = 'Update'/> : <FormattedMessage id = 'save'/>}</button>
        </div>
      </Footer>
    </Modal>
      : null;

    const showAddWebsiteBlock = this.state.showAddWebsiteBlock
    ?
    <li>
      <div className={weStyles.profileEditBlock}>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputWebsite" className="control-label col-md-3"><FormattedMessage id = 'website'/><span className={compStyles.mandatory}>*</span>:</label>
            <div className="col-md-9">
                <input id="website" type="text" className="form-control" value={this.state.website} style={this.state.validationError && this.state.validationError.websiteError ? { borderColor: "#ff0000" } : {}}
                 onChange={this.handleWebsiteChange.bind(this)} id="" ref="website" placeholder="https://www.google.com" maxLength={50} autoFocus='true' onKeyPress={this.handleWesiteNameEnterKey}/>
                <label id="websiteError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.websiteError ? this.state.validationError.websiteError : ''}</label>                
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-3 col-md-9">
              <div className={styles.blockSaveAssign2}>
                <button id="websiteCancelBtn" type="submit" className={cls_btnCancle} onClick={this.cancelWebsite.bind(this)}><FormattedMessage id = 'cancel'/></button>
                <button id="websiteSaveBtn" type="submit" className={cls_btnSaveEdit2} onClick={this.saveUserWebsiteData.bind(this)}>{this.state.showWebsiteUpdate == true ? <FormattedMessage id = 'Update'/> : <FormattedMessage id = 'save'/>}</button>
              </div>
            </div>
          </div>
      </form>
      </div>
    </li>
    : null;

    const showAddSocialBlock = this.state.showAddSocialBlock
    ?
    <li>
      <div className={weStyles.profileEditBlock}>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputWebsite" className="control-label col-md-3"><FormattedMessage id = 'social_link'/><span className={compStyles.mandatory}>*</span>:</label>
            <div className="col-md-9">
                <input id="socialLink" type="text" className="form-control" id="" value={this.state.socialLink} style={this.state.validationError && this.state.validationError.socialError ? { borderColor: "#ff0000" } : {}}
                 onChange={this.handleSocialLink.bind(this)} ref="social" placeholder="https://www.facebook.com/xxxxxx" maxLength={50} autoFocus='true' onKeyPress={this.handleSocialLinkEnterKey} />
                <label id="socialError" className={compStyles.errorPre} >{this.state.validationError && this.state.validationError.socialError ? this.state.validationError.socialError : ''}</label>                
                
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-3 col-md-9">
              <div className={styles.blockSaveAssign2}>
                <button id="socialCancelBtn" type="submit" className={cls_btnCancle} onClick={this.cancelSocial.bind(this)}><FormattedMessage id = 'cancel'/></button>
                <button id="SocialSaveBtn" type="submit" className={cls_btnSaveEdit2} onClick={this.saveSocialLinkData.bind(this)}>{this.state.showSocialUpdate == true ? <FormattedMessage id = 'Update'/> : <FormattedMessage id = 'save'/>}</button>
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
            <h2 className={weStyles.categoryHeading}><FormattedMessage id = 'contact_information'/></h2>
            <ul>
            { !isAddressObj ? (
              <li>
                <div className={addInfoBlock} id="addAddress" onClick = {this.handleAddress.bind(this)}>
                  <div className={iconBox}>
                    <img src="/images/icons/add-new-blue.png" />
                  </div>
                  
                  <div className={addCategoryTxtBox}>
                    <h2 className={weStyles.addCategoryTxt}><FormattedMessage id = 'add_address'/></h2>
                  </div>
                </div>                
                {showAddAddressModal}
              </li>
              ):(null)}
              {
              isAddressObj ?
              (
               <li>
                <div className={displayInfoBlock}>
                  <div className={singleInfoBox}>
                    <div className="row">
                      <div className="col-md-3">
                        <div className={weStyles.leftInfoTxt}><FormattedMessage id = 'address'/>:</div>
                      </div>

                      <div className="col-md-9">
                        <ul className={weStyles.rightDetailInfo}>
                          <li className={styles.txtDetailContent} >{userAddress}</li>
                          <li className={styles.txtDetailContent} >{userCity}, {userZip}</li>                          
                        </ul>
                      </div>
                    </div>
                    {userLandMark?
                      <div className="row">
                        <div className="col-md-3">
                          <div className={weStyles.leftInfoTxt}><FormattedMessage id = 'landmark'/>:</div>
                        </div>
                        <div className="col-md-9">
                          <ul className={weStyles.rightDetailInfo}>
                            <li className={styles.txtDetailContent} >{userLandMark}</li>
                          </ul>
                        </div>
                      </div>
                    :null}
                  </div>
                  <div className={moreInfoBlock}>
                    <div className={weStyles.moreIconBox} onClick={this.handleAddressDropdown.bind(this)}>
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      <div className={this.state.addressDropdownCss}>
                        <ul>
                        <li id="addressEditBtn" onClick={this.handleEditAddress.bind(this)}>
                          <FormattedMessage id = 'edit'/>
                        </li>
                        <li id="addressSaveBtn" onClick={this.handleDeleteAddress.bind(this)}>
                          <FormattedMessage id = 'delete'/>
                        </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {showAddAddressModal}
              </li>
              ):(null)}
              
            </ul>
          </div>
          <div className={weStyles.userCategoryInfo}>
            <h2 className={weStyles.categoryHeading}><FormattedMessage id = 'website_and_social_links'/></h2>
            <ul>
              {
                isWebsiteObj 
                ?
                this.state.showAddWebsiteBlock == false
                ?
                 <li>
                  <div className={displayInfoBlock}>
                    <div className={singleInfoBox}>
                      <div className="row">
                        <div className="col-md-3">
                          <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'website'/>:</p>
                        </div>
                        <div className="col-md-9">
                          <ul className={weStyles.rightDetailInfo}>
                            <li><a href={websiteURL} target="_blank">{isWebsiteObj}</a></li>
                            
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={moreInfoBlock}>
                      <div id="websiteDropdown" className={weStyles.moreIconBox} onClick={this.handleWebsiteDropdown.bind(this)}>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        <div className={this.state.websiteDropdownCss}>
                          <ul>
                          <li id="websiteEditBtn" onClick={this.handleEditWebsite.bind(this)}>
                            <FormattedMessage id = 'edit'/>
                          </li>
                          <li id="websiteDeleteBtn" onClick={this.handleDeleteWebsite.bind(this)}>
                            <FormattedMessage id = 'delete'/>
                          </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                : 
                <div>
                  {showAddWebsiteBlock}
                </div> 
                : null
              }
              {
                !isWebsiteObj 
                ?
                this.state.showAddWebsiteBlock == true
                ?
                <div>
                  {showAddWebsiteBlock}
                </div>
                :
                <li>
                  <div id="addWebsite" className={addInfoBlock} onClick={this.handleWebsite.bind(this)}>
                    <div className={iconBox}>
                      <img src="/images/icons/add-new-blue.png" />
                    </div>
                    <div className={addCategoryTxtBox}>
                      <h2 className={weStyles.addCategoryTxt}><FormattedMessage id = 'add_website'/></h2>
                    </div>
                  </div>
                </li> : null            
              }
              {
                isSociallinkObj 
                ?
                this.state.showAddSocialBlock == false 
                ?
                <li>
                  <div className={displayInfoBlock}>
                    <div className={singleInfoBox}>
                      <div className="row">
                        <div className="col-md-3">
                          <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'social_link'/>:</p>
                        </div>
                        <div className="col-md-9">
                          <ul className={weStyles.rightDetailInfo}>
                            <li><a id="socialLink" href={socialURL} target="_blank">{isSociallinkObj}</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={moreInfoBlock}>
                      <div id="socialDropdown" className={weStyles.moreIconBox} onClick={this.handleSocialDropdown.bind(this)}>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        <div className={this.state.socialDropdownCss}>
                          <ul>
                          <li id="socialEditBtn" onClick={this.handleEditSocial.bind(this)}>
                            <FormattedMessage id = 'edit'/>
                          </li>
                          <li id="socialDeleteBtn" onClick={this.handleDeleteSocialLink.bind(this)}>
                            <FormattedMessage id = 'delete'/>
                          </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                : 
                <div>
                  {showAddSocialBlock}
                </div> 
                : null
              }
              {
                !isSociallinkObj 
                ?
                this.state.showAddSocialBlock == true
                ?
                <div>
                  {showAddSocialBlock}
                </div>
                :
                <li>
                  <div id="addSocialBtn" className={addInfoBlock} onClick={this.handleSocial.bind(this)}>
                    <div className={iconBox}>
                      <img src="/images/icons/add-new-blue.png" />
                    </div>
                    <div className={addCategoryTxtBox}>
                      <h2 className={weStyles.addCategoryTxt}><FormattedMessage id = 'add_a_social_links'/></h2>
                    </div>
                  </div>
                </li>
                : null
              }
            </ul>
          </div>
           <div className={weStyles.userCategoryInfo}>
              <h2 className={weStyles.categoryHeading}><FormattedMessage id = 'basic_information'/></h2>
              <ul>
              {
              isBasicInfoData ?
              ( 
                <li>
                  <div id="addInfo" className={addInfoBlock}  onClick = {this.handleInfo.bind(this)}>
                    <div className={iconBox}>
                      <img src="/images/icons/add-new-blue.png" />
                    </div>
                    <div className={addCategoryTxtBox}>
                      <h2 className={weStyles.addCategoryTxt}><FormattedMessage id = 'add_basic_information'/></h2>
                    </div>
                  </div>
                  {showAddInfoModal}
                </li>
               ):(null)} 
              {
              userBirthDate ?
              ( 
                <li>
                  <div className={displayInfoBlock}>
                    <div className={singleInfoBox}>
                      <div className="row">
                        <div className="col-md-3">
                          <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'birthday'/>:</p>
                        </div>
                        <div className="col-md-9">
                          <ul className={weStyles.rightDetailInfo}>
                            <li>{userBirthDate}</li>
                          </ul>
                        </div>
                      </div>
                                {/*    <div className="row">
                                          <div className="col-md-3">
                                            <div className={weStyles.leftInfoTxt}><FormattedMessage id = 'birth_year'/>:</div>
                                          </div>
                                          <div className="col-md-9">
                                            <ul className={weStyles.rightDetailInfo}>
                                              <li>{userBirthYear}</li>
                                            </ul>
                                          </div>
                                        </div> */}
                    </div>
                    <div className={moreInfoBlock}>
                      <div className={weStyles.moreIconBox} id="birthdayDropdown" onClick={this.handleBirthDateDropdown.bind(this)}>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        <div className={this.state.birthdateDropdownCss}>
                          <ul>
                          <li id="editBasicBtn" onClick={this.handleEditBasic.bind(this)}>
                            <FormattedMessage id = 'edit'/>
                          </li>
                          <li id="deleteBirthdayBtn" onClick={this.handleDeleteBirthDay.bind(this)}>
                            <FormattedMessage id = 'delete'/>
                          </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showAddInfoModal}
                </li>
                ):(null)} 
                {
                userGender ?
                ( 
                <li>
                  <div className={displayInfoBlock}>
                    <div className={singleInfoBox}>
                      <div className="row">
                        <div className="col-md-3">
                          <p className={weStyles.leftInfoTxt}><FormattedMessage id = 'gender'/>:</p>
                        </div>
                        <div className="col-md-9">
                          <ul className={weStyles.rightDetailInfo}>
                            <li>{userGender}</li>
                          </ul>
                        </div>
                      </div> 
                    </div>
                     <div className={moreInfoBlock}>
                      <div id="gender" className={weStyles.moreIconBox} onClick={this.handleGenderDropdown.bind(this)}>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        <div className={this.state.genderDropdownCss}>
                          <ul>
                          <li id="editBasic" onClick={this.handleEditBasic.bind(this)}>
                            <FormattedMessage id = 'edit'/>
                          </li>
                          <li id="deleteGenderBtn" onClick={this.handleDeleteGender.bind(this)}>
                            <FormattedMessage id = 'delete'/>
                          </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showAddInfoModal}
                </li>
                ):(null)} 
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
    intl: state.intl,
    loggedInData: loggedInData(state),

  };
}

ContactView.contextTypes = {
  router: React.PropTypes.object,
};

ContactView.propTypes = {
  loggedInData: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

ContactView.contextTypes = {
  intl: React.PropTypes.object.isRequired
};

//export default ProfileView;
export default connect(mapStateToProps)(injectIntl(ContactView));

