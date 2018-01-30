// import React, { PropTypes, Component } from 'react';
// import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import FontAwesome from 'react-fontawesome';
// import callApi from '../util/apiCaller';
// import {Col, Row, Grid, Modal} from 'react-bootstrap';
// import {Header, Title, Body, Footer} from 'react-bootstrap/lib/Modal';
// import { isLoggedIn } from '../modules/Login/LoginActions';
// import AuthClient from './AuthController';
// import styles from '../modules/Admin/Admin.css';
// import { ListItem } from './ListItem';
// // import { packageData } from '../PackageReducer';

// var dataObject = {};

// class Feedback extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//         myUsersData: {},
//         uid: null,
//         radioAnswer: '',        
//         poorVideoTrue: false,
//         averageVideoTrue: false,
//         goodVideoTrue: false,
//         excellentVideoTrue: false,
//         videoQualityRating:'',

//         poorAudioTrue: false,
//         averageAudioTrue: false,
//         goodAudioTrue: false,
//         excellentAudioTrue: false,
//         audioQualityRating:'',
//         false: false,

//         poorSharingTrue: false,
//         averageSharingTrue: false,
//         goodSharingTrue: false,
//         excellentSharingTrue: false,
//         sharingQualityRating:'',

//         poorKnowledgeTrue: false,
//         averageKnowledgeTrue: false,
//         goodKnowledgeTrue: false,
//         excellentKnowledgeTrue: false,
//         knowledgeQualityRating:'',

//         poorSkillsTrue: false,
//         averageSkillsTrue: false,
//         goodVideoSkillsTrue: false,
//         excellentSkillsTrue: false,
//         skillsQualityRating:'',

        
//         poorRatingTrue: false,
//         averageRatingTrue: false,
//         goodVideoRatingTrue: false,
//         excellentRatingTrue: false,
//         overAllRating:'',

//         valcomment:'',

//     };
//   }

//   componentWillMount() {
//       this.props.dispatch(isLoggedIn(AuthClient.getSession(), 
//                     '')).then(res => this.setuid(res));
//   }

//   setuid(res) {
//     // console.log("uid---",res);
//     this.setState({uid: res.data._id});
//   }

//   saveFeedback(e) {
//     // console.log("input==", e.target.value);
//     // console.log("packageId", this.props.packageId);
//     let moduleName = window.location.pathname.split( '/' );
//     // console.log(moduleName[2]);
//     callApi('searchusers', 'post', {
//       searchData: {
//         input: e.target.value,
//         uid: this.state.uid,
//         moduleName : moduleName
//       }
//     }).then(res => this.myUsers(res));
//   }

//   myUsers(res) {
//     // console.log("myUsersData==", res);
//     this.setState({myUsersData: res});
//   }

//   sendUserId(userId) {
//     // console.log(userId);
//     if (userId && userId != 'undefined')
//       this.props.getUserId(userId);
//   }
//   handlePoorVideoValue(e) {
//     this.setState({
//       poorVideoTrue: !this.state.true,
//       averageVideoTrue: false,
//       goodVideoTrue: false,
//       excellentVideoTrue: false,
//       false: false,
     
//       videoQualityRating: e.target.value
//     })    
//     console.log("V Rating value", this.state.videoQualityRating);
//   }
//   handleAverageVideoValue(e) {
//     this.setState({
//       poorVideoTrue: false,
//       averageVideoTrue: !this.state.true,
//       goodVideoTrue: false,
//       excellentVideoTrue: false,
//       false: false,
      
//       videoQualityRating: e.target.value
//     })    
    
//   }
//   handleGoodVideoValue(e) {
//     this.setState({
//       poorVideoTrue: false,
//       averageVideoTrue: false,
//       goodVideoTrue: !this.state.true,
//       excellentVideoTrue: false,
//       false: false,
      
//       videoQualityRating: e.target.value
//     })    
    
//   }
//   handleExcellentVideoValue(e) {
//     this.setState({
//       poorVideoTrue: false,
//       averageVideoTrue: false,
//       goodVideoTrue: false,
//       excellentVideoTrue: !this.state.true,
//       false: false,
      
//       videoQualityRating: e.target.value
//     })    
    
//   }

//   handlePoorAudioValue(e) {
//     this.setState({
//       poorAudioTrue: !this.state.true,
//       averageAudioTrue: false,
//       goodAudioTrue: false,
//       excellentAudioTrue: false,
//       false: false,
//       audioQualityRating: e.target.value
//     })    
//   }
//   handleAverageAudioValue(e) {
//     this.setState({
//       poorAudioTrue: false,
//       averageAudioTrue: !this.state.true,
//       goodAudioTrue: false,
//       excellentAudioTrue: false,
//       false: false,
//       audioQualityRating: e.target.value
//     })    
//   }
//   handleGoodAudioValue(e) {
//     this.setState({
//       poorAudioTrue: false,
//       averageAudioTrue: false,
//       goodAudioTrue: !this.state.true,
//       excellentAudioTrue: false,
//       false: false,
//       audioQualityRating: e.target.value
//     })    
//   }
//   handleExcellentAudioValue(e) {
//     this.setState({
//       poorAudioTrue: false,
//       averageAudioTrue: false,
//       goodAudioTrue: false,
//       excellentAudioTrue: !this.state.true,
//       false: false,
//       audioQualityRating: e.target.value
//     })    
//   }

//   handlePoorSharingValue(e) {
//     this.setState({
//       poorSharingTrue: !this.state.true,
//       averageSharingTrue: false,
//       goodSharingTrue: false,
//       excellentSharingTrue: false,
//       false: false,
//       sharingQualityRating: e.target.value
//     })    
//   }
//   handleAverageSharingValue(e) {
//     this.setState({
//       poorSharingTrue: false,
//       averageSharingTrue: !this.state.true,
//       goodSharingTrue: false,
//       excellentSharingTrue: false,
//       false: false,
//       sharingQualityRating: e.target.value
//     })    
//   }
//   handleGoodSharingValue(e) {
//     this.setState({
//       poorSharingTrue: false,
//       averageSharingTrue: false,
//       goodSharingTrue: !this.state.true,
//       excellentSharingTrue: false,
//       false: false,
//       sharingQualityRating: e.target.value
//     })    
//   }
//   handleExcellentSharingValue(e) {
//     this.setState({
//       poorSharingTrue: false,
//       averageSharingTrue: false,
//       goodSharingTrue: false,
//       excellentSharingTrue: !this.state.true,
//       false: false,
//       sharingQualityRating: e.target.value
//     })    
//   }

//   handlePoorKnowledgeValue(e) {
//     this.setState({
//       poorKnowledgeTrue: !this.state.true,
//       averageKnowledgeTrue: false,
//       goodKnowledgeTrue: false,
//       excellentKnowledgeTrue: false,
//       false: false,
//       knowledgeQualityRating: e.target.value
//     })    
//   }
//   handleAverageKnowledgeValue(e) {
//     this.setState({
//       poorKnowledgeTrue: false,
//       averageKnowledgeTrue: !this.state.true,
//       goodKnowledgeTrue: false,
//       excellentKnowledgeTrue: false,
//       false: false,
//       knowledgeQualityRating: e.target.value
//     })    
//   }
//   handleGoodKnowledgeValue(e) {
//     this.setState({
//       poorKnowledgeTrue: false,
//       averageKnowledgeTrue: false,
//       goodKnowledgeTrue: !this.state.true,
//       excellentKnowledgeTrue: false,
//       false: false,
//       knowledgeQualityRating: e.target.value
//     })    
//   }
//   handleExcellentKnowledgeValue(e) {
//     this.setState({
//       poorKnowledgeTrue: false,
//       averageKnowledgeTrue: false,
//       goodKnowledgeTrue: false,
//       excellentKnowledgeTrue: !this.state.true,
//       false: false,
//       knowledgeQualityRating: e.target.value
//     })    
//   }

//   handlePoorSkillsValue(e) {
//     this.setState({
//       poorSkillsTrue: !this.state.true,
//       averageSkillsTrue: false,
//       goodSkillsTrue: false,
//       excellentSkillsTrue: false,
//       false: false,
//       skillsQualityRating: e.target.value
//     })    
//   }
//   handleAverageSkillsValue(e) {
//     this.setState({
//       poorSkillsTrue: false,
//       averageSkillsTrue: !this.state.true,
//       goodSkillsTrue: false,
//       excellentSkillsTrue: false,
//       false: false,
//       skillsQualityRating: e.target.value
//     })    
//   }
//   handleGoodSkillsValue(e) {
//     this.setState({
//       poorSkillsTrue: false,
//       averageSkillsTrue: false,
//       goodSkillsTrue: !this.state.true,
//       excellentSkillsTrue: false,
//       false: false,
//       skillsQualityRating: e.target.value
//     })    
//   }
//   handleExcellentSkillsValue(e) {
//     this.setState({
//       poorSkillsTrue: false,
//       averageSkillsTrue: false,
//       goodSkillsTrue: false,
//       excellentSkillsTrue: !this.state.true,
//       false: false,
//       skillsQualityRating: e.target.value
//     })    
//   }

//   handlePoorRatingValue(e) {
//     this.setState({
//       poorRatingTrue: !this.state.true,
//       averageRatingTrue: false,
//       goodRatingTrue: false,
//       excellentRatingTrue: false,
//       topRatingTrue:false,
//       false: false,
//       overAllRating: e.target.value
//     })    
//   }
//   handleAverageRatingValue(e) {
//     this.setState({
//       poorRatingTrue: false,
//       averageRatingTrue: !this.state.true,
//       goodRatingTrue: false,
//       excellentRatingTrue: false,
//       topRatingTrue:false,
//       false: false,
//       overAllRating: e.target.value
      
//     })    
//   }
//   handleGoodRatingValue(e) {
//     this.setState({
//       poorRatingTrue: false,
//       averageRatingTrue: false,
//       goodRatingTrue: !this.state.true,
//       excellentRatingTrue: false,
//       topRatingTrue:false,
//       false: false,
//       overAllRating: e.target.value
//     })    
//   }
//   handleExcellentRatingValue(e) {
//     this.setState({
//       poorRatingTrue: false,
//       averageRatingTrue: false,
//       goodRatingTrue: false,
//       excellentRatingTrue: !this.state.true,
//       topRatingTrue:false,
//       false: false,
//       overAllRating: e.target.value
//     })    
//   }
//   handleTopRatingValue(e) {
//     this.setState({
//       poorRatingTrue: false,
//       averageRatingTrue: false,
//       goodRatingTrue: false,
//       excellentRatingTrue: false,
//       topRatingTrue: !this.state.true,
//       false: false,
//       overAllRating: e.target.value
//     })    
//   }
//   handleCommentValue(e) {
//     this.setState({
//       valcomment:e.target.value
//     })
//   }
  
//   saveFeedback(e) {
//     callApi('save-feedback', 'post', {
//       feedback:{
//         videoQuality: this.state.videoQualityRating,
//         audioQuality: this.state.audioQualityRating,
//         sharingQuality: this.state.sharingQualityRating,
//         knowledgeQuality: this.state.knowledgeQualityRating,
//         skillsQuality: this.state.skillsQualityRating,
//         OverAll: this.state.overAllRating,
//         commentVal: this.state.valcomment,

//       }
//     }).then(res => this.myUsers(res));
//   }

//   myUsers(res) {
//     // console.log("myUsersData==", res);
//     this.setState({myUsersData: res});
//   }

//   render() {
//     let cls_userChecked = `${styles.userAction} ${styles.userChecked}`;
//     let listUsers = <FormattedMessage id='no_users_found' />;
//     if(this.props){
//       dataObject = this.props;
//       // console.log(dataObject);
//     }
//     if(this.state.myUsersData && this.state.myUsersData.data && this.state.myUsersData.data.length > 0){
//       let usersData = this.state.myUsersData.data;
//       // console.log("---", this.props.packageData.users);
//       listUsers = usersData.map((userData) =>
//         <ListItem key={userData._id}
//                 value={userData} getUserId={this.sendUserId.bind(this)} classname='plus' classTitle='Add User' />
//       );
//     }
//     return (
      
//       <Modal show={dataObject.showModal} onHide={dataObject.hidecallback}>
      
//         <Header closeButton>
//           <Title>Feedback</Title>
//         </Header>
//         <Body>
//           <form className="form-horizontal">
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Video Quality</label>
//               <div className="form-group">
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Poor" checked={this.state.poorVideoTrue}  onChange={this.handlePoorVideoValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Poor
//                 </div> 
//                 </div> 
//                 <div className="col-xs-2">              
//                 <input type="radio" className="col-xs-2" value="Average"  checked={this.state.averageVideoTrue}  onChange={this.handleAverageVideoValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Average
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Good"  checked={this.state.goodVideoTrue}  onChange={this.handleGoodVideoValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Good
//                 </div>
//                 </div>
                
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Excellent"  checked={this.state.excellentVideoTrue}  onChange={this.handleExcellentVideoValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Excellent
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Audio Quality</label>
//               <div className="form-group">
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Poor" checked={this.state.poorAudioTrue}  onChange={this.handlePoorAudioValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Poor
//                 </div> 
//                 </div> 
//                 <div className="col-xs-2">              
//                 <input type="radio" className="col-xs-2" value="Average" checked={this.state.averageAudioTrue}  onChange={this.handleAverageAudioValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Average
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Good"  checked={this.state.goodAudioTrue}  onChange={this.handleGoodAudioValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Good
//                 </div>
//                 </div>
                
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Excellent" checked={this.state.excellentAudioTrue}  onChange={this.handleExcellentAudioValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Excellent
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Content Sharing</label>
//               <div className="form-group">
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Poor"  checked={this.state.poorSharingTrue}  onChange={this.handlePoorSharingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Poor
//                 </div> 
//                 </div> 
//                 <div className="col-xs-2">              
//                 <input type="radio" className="col-xs-2" value="Average" checked={this.state.averageSharingTrue}  onChange={this.handleAverageSharingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Average
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Good" checked={this.state.goodSharingTrue}  onChange={this.handleGoodSharingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Good
//                 </div>
//                 </div>
                
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Excellent" checked={this.state.excellentSharingTrue}  onChange={this.handleExcellentSharingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Excellent
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Knowledgeable Session</label>
//               <div className="form-group">
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Poor"  checked={this.state.poorKnowledgeTrue}  onChange={this.handlePoorKnowledgeValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Poor
//                 </div> 
//                 </div> 
//                 <div className="col-xs-2">              
//                 <input type="radio" className="col-xs-2" value="Average" checked={this.state.averageKnowledgeTrue}  onChange={this.handleAverageKnowledgeValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Average
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Good" checked={this.state.goodKnowledgeTrue}  onChange={this.handleGoodKnowledgeValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Good
//                 </div>
//                 </div>
                
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Excellent" checked={this.state.excellentKnowledgeTrue}  onChange={this.handleExcellentKnowledgeValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Excellent
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Instructor Skills</label>
//               <div className="form-group">
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Poor" checked={this.state.poorSkillsTrue}  onChange={this.handlePoorSkillsValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Poor
//                 </div> 
//                 </div> 
//                 <div className="col-xs-2">              
//                 <input type="radio" className="col-xs-2" value="Average" checked={this.state.averageSkillsTrue}  onChange={this.handleAverageSkillsValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Average
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Good" checked={this.state.goodSkillsTrue}  onChange={this.handleGoodSkillsValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Good
//                 </div>
//                 </div>
                
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="Excellent" checked={this.state.excellentSkillsTrue}  onChange={this.handleExcellentSkillsValue.bind(this)} />
//                 <div className="col-xs-10">
//                   Excellent
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Rating</label>
//               <div className="form-group">
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="1" checked={this.state.poorRatingTrue}  onChange={this.handlePoorRatingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   1
//                 </div> 
//                 </div> 
//                 <div className="col-xs-2">              
//                 <input type="radio" className="col-xs-2" value="2" checked={this.state.averageRatingTrue}  onChange={this.handleAverageRatingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   2
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="3" checked={this.state.goodRatingTrue}  onChange={this.handleGoodRatingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   3
//                 </div>
//                 </div>
                
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="4" checked={this.state.excellentRatingTrue}  onChange={this.handleExcellentRatingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   4
//                 </div>
//                 </div>
//                 <div className="col-xs-2">
//                 <input type="radio" className="col-xs-2" value="5" checked={this.state.excellentRatingTrue}  onChange={this.handleTopRatingValue.bind(this)} />
//                 <div className="col-xs-10">
//                   5
//                 </div>
//                 </div>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="inputAddress" className="control-label col-xs-2" >Comment</label>
//               <div className="form-group">
//                 <div className="col-xs-4">
//                 <input type="textarea" className="col-xs-12" value={this.state.valcomment} onChange={this.handleCommentValue.bind(this)} />
//                 </div> 
//               </div>
//             </div>           
//           </form>
//         </Body>
//         <Footer>
          
//           <button className="btn btn-success btn-icon btn-sm" onClick={this.saveFeedback.bind(this)} >Save</button>
//         </Footer>
//       </Modal>
        
//     );
//   }
// }

// // Retrieve data from store as props
// function mapStateToProps(state) {
//   return {
//     // packageData : packageData(state),
//   };
// }

// Feedback.propTypes = {
//   intl: PropTypes.object,
//   showModal: PropTypes.bool,
//   hidecallback: PropTypes.func,
//   // dispatch: PropTypes.func.isRequired,
// };

// Feedback.contextTypes= {
//     intl: React.PropTypes.object.isRequired,
// };

// Feedback.defaultProps = { showModal: false };

// export default connect(mapStateToProps)(Feedback);
