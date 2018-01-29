import React, { PropTypes ,Component} from 'react';
import FontAwesome from 'react-fontawesome';
import ReactDOM from 'react-dom';
import {Col, Row, Grid, Carousel, Modal} from 'react-bootstrap';
import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
/*  */
import {connect } from 'react-redux';
import isServer from 'detect-node';
import styles from '../../Admin.css';
import { browserHistory } from 'react-router';
import { isLoggedIn, getProfileImage, ClearImage} from '../../../Login/LoginActions';
import { removeProfileImage } from '../ProfileActions';
import { profileData } from '../ProfileReducer';
import AuthClient from '../../../../components/AuthController';
import  {ToastContainer, ToastMessage} from '../../../../lib';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

const ToastMessageFactory = React.createFactory(ToastMessage.animation);

const FileAPI = !isServer ? require('fileapi') : null;

//var AvatarCropper = require("react-avatar-cropper");

let isClient = typeof window !== "undefined";
let AvatarCropper = isClient ? require('react-avatar-cropper') : function() {};
var ViewImage = React.createClass({
	getInitialState: function() {
	  return {
      showImageModal: false,
      url:"",
      cropperOpen: false,
      img: null,
      croppedImg:"",
      file:"",
      userId : "",
      sourceImage:"/images/profile-pics/defaultStudent.jpg",
    };
	},

  componentDidMount : function() {
    if(this.props.srcUrl) {
      this.setState({
        sourceImage:'/uploads/'+this.props.srcUrl,
        userId:this.props.userData
      });
    } else if (this.props.srcUrl == '') {
      this.setState({
        sourceImage:"/images/profile-pics/defaultStudent.jpg"
      });
    }
  },

  componentWillReceiveProps : function(nextProps) {
     // console.log("nextProps === ",nextProps.srcUrl);
    if(nextProps.srcUrl) {
      this.setState({
        sourceImage:'/uploads/'+nextProps.srcUrl,
        userId:this.props.userData
      });
    } else if (nextProps.srcUrl == '' || nextProps.srcUrl == undefined || nextProps.srcUrl == null) {
      this.setState({
        sourceImage:"/images/profile-pics/defaultStudent.jpg",
        userId:this.props.userData
      });
    }
  },
  /*componentWillMount : function() {
    console.log("in ViewImage-------",this.props.srcUrl);
    this.setState({
      userId:this.props.userData,
    });
  },*/
  handleViewImage() {
    if(this.props.isUser){
      let image = this.props.srcUrl;
      if(image == '' || image == undefined || image == null){
        this.setState({
          showImageModal :false,
        });
      } else { 
        this.setState({
          showImageModal : true,
          img: '/uploads/'+this.props.srcUrl,
          cropperOpen: false,
          // sourceImage:'/uploads/'+this.props.loggedInData.data.profile.profileImage,
      });
    } 
  }
  },
  hideImageModal() {
    this.setState({
      showImageModal : false,
      img: '/uploads/'+this.props.srcUrl,
    })
  },

  handleFileChange: function(dataURI,file) {
    this.setState({
      img: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true,
      showImageModal: false,
      file :file,
      sourceImage:this.state.sourceImage
    }); 
  },
  handleCrop: function(dataURI) {
    var props = this.props;
    let self = this;
    let newImage = dataURI.replace(/^data:image\/(png|jpg|image|jpeg);base64,/, '');
   	let url = "/api/profileupload";
   	let data = {img:newImage,name:this.state.file.name, type:this.state.file.type, size:this.state.file.size,uid:this.props.userData};
    FileAPI.upload({
   		data,
   		url,
   		complete:function(err,res) {
   			if(err) {
   				console.log("err---",err);
          self.setState({ sourceImage : self.props.srcUrl ? '/uploads/'+self.props.srcUrl : "/images/profile-pics/defaultStudent.jpg"});
          self.refs.container.error(err);
   			} else {
   				// console.log("file uploaded:", res);
          if(res.status){
            self.refs.container.success("Uploaded successfully.")
            props.dispatch(isLoggedIn(AuthClient.getSession())).then(
            res =>  {
              let resimage = res.data && res.data.profile && res.data.profile.profileImage ? res.data.profile.profileImage : self.state.sourceImage;
              let image  = '/uploads/' + resimage;
              self.setState({ sourceImage : image})
              props.dispatch(getProfileImage({uid :res.data._id}))
            })    
          } else {
            console.log("Upload Fail");
            self.setState({ sourceImage : '/uploads/'+self.props.srcUrl});
            self.refs.container.error(err.error);
          }    
        }
   		}
   	});
   	
    this.setState({
      cropperOpen: false,
      img: null,
      croppedImg: dataURI,
      sourceImage:dataURI
    });
  },
  handleRequestHide: function() {
	    this.setState({
	      cropperOpen: false
	    });
  },
  handleRemoveImage() {
    let self = this;
    var props = this.props;
    alertify.confirm(this.props.intl.messages.warning,this.props.intl.messages.delete_Profile_image_alert, 
      function (result) {
        if(result) {
          props.dispatch(removeProfileImage({})).then(res => self.clearimage(res));
        } 
      },
      function() {
      }
    ).setting('labels',{'ok': this.props.intl.messages.ok,'cancel': this.props.intl.messages.cancel});
  },

  clearimage() {
    this.props.dispatch( ClearImage());
    this.setState({
      showImageModal : false,
      sourceImage : '/images/profile-pics/defaultStudent.jpg'
    });
    this.refs.container.success("Removed Successfully.");   
  },

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    // console.log("file------");
    // console.log(file);
    if (!file || (file.type !='image/png' && file.type !='image/jpeg' && file.type !='image/jpg')){
      return this.refs.container.error("Invalid File Format:Only jpeg, jpg, png file formats supported");
    } else if (file.size>5242880) {
      return this.refs.container.error("File Size should be less than 5MB!..");
    } 

    reader.onload = function(img) {
      ReactDOM.findDOMNode(this.refs.in).value = '';
      this.handleFileChange(img.target.result,file);
    }.bind(this);
    reader.readAsDataURL(file);  
  },

	render() {
    const img = '/uploads/'+this.props.srcUrl;
    const showImageModal = this.state.showImageModal
    ?
      <div>
        <Modal show={this.state.showImageModal} onHide={this.hideImageModal} >
          <Header closeButton>
            <Title className={styles.proPicEdit} ><FormattedMessage id='profile_picture' /></Title>
          </Header>
          <Body>
           <div className={styles.avatarImgView}>
            <img src={img}/> 
           </div> 
          </Body>
          {this.props.changeImage == true ?
            <Footer className="clearfix">  
              <button className={styles.btnAllCancel} onClick={this.handleRemoveImage}><FormattedMessage id='remove' /></button>
              <div className={styles.viewImgFtrAction}>
                <label className={styles.btnApplyAll}>
                  <input id="uploadProfile" ref="in" type="file" accept=".png,.jpeg,.jpg" className = {styles.avatarImgupload} onChange={this.handleFile}/>
                  <FormattedMessage id='upload_new' /></label>
              </div>
            </Footer>
          : null}
        </Modal>
      </div>
    : null
    let cls_avatar = this.props.from == "PERSONAL" ? `${styles.profileAvatarPhoto}` : `${styles.avatarPhoto}`;
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
  		  <div className={cls_avatar}>
          {this.props.changeImage == true ? 
  			  <div className={styles.avatarEdit} title="Change profile image">
            <ImageCropComponent handleFileChange={this.handleFileChange} />
  	        <i className="fa fa-camera"></i>
          </div> : null }
  			  <img id="targetImg" src={this.state.sourceImage} className = {styles.imgCrop} onClick = {this.handleViewImage}/>
  			</div>
          {showImageModal}
    			{this.state.cropperOpen &&
            <AvatarCropper
            onRequestHide={this.handleRequestHide}
            cropperOpen={this.state.cropperOpen}
            onCrop={this.handleCrop}
            image={this.state.img}
            width={268}
            height={268}
            modalSize={'sm'}
            />
          }
      </div>
    );
	}
});

var ImageCropComponent = React.createClass({

  handleFile: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];
    // console.log("file------");
    // console.log(file);
    if (!file || (file.type !='image/png' && file.type !='image/jpeg' && file.type !='image/jpg')){
      return this.refs.container.error("Invalid File Format:Only jpeg, jpg, png file formats supported");
    } else if (file.size>5242880) {
      return this.refs.container.error("File Size should be less than 5MB!..");
    } 

    reader.onload = function(img) {
      ReactDOM.findDOMNode(this.refs.in).value = '';
      this.props.handleFileChange(img.target.result,file);
    }.bind(this);
    reader.readAsDataURL(file);  
  },

  render: function() {
    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="container"
          className="toast-top-right"
        />
        <input id="uploadProfile" ref="in" type="file" accept=".png,.jpeg,.jpg" onChange={this.handleFile} />

      </div>
    );
  }
});

function mapStateToProps(state) {
  return {
    intl: state.intl,
    profileData: profileData(state),
  };
}
ViewImage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  profileData: PropTypes.object,
};
export default connect(mapStateToProps)(ViewImage);


