import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { loggedInData } from '../../../Login/LoginReducer';
import { ActiveUsersListRequest, UserStore, ClearUser, ClearActiveUsers } from '../UsersActions';
import { userData } from '../UsersReducer';
import DataTable from '../../../../components/DataTable/DataTable';
import { intlData } from '../../../Intl/IntlReducer';
import  {ToastContainer, ToastMessage} from '../../../../lib';
const ToastMessageFactory = React.createFactory(ToastMessage.animation);
import { Roles } from '../../../../roles.js';
import { loginLanguage } from '../../../Intl/IntlActions';
var _ = require('lodash');


class ActiveUsersList extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      searchValue : '',
      flag : true,
      loading : true
    }

    this.currentPage= 1;
    this.itemsPerPage= 5;

    this.searchFilter = this.searchFilter.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userData.deleteSuccess != ''){
      this.refs.user_container.success(`${nextProps.userData.deleteSuccess} `, ``);
      this.props.dispatch(ClearUser());
    }
  }

  componentDidMount() {
    this.setdata(this.props.loggedInData);    
  }

  setdata(result){
    if (result && result.data && result.data._id) {
      this.props.dispatch(loginLanguage(result.data, this.props.intlData.setlocale));
      this.props.dispatch(UserStore({uid: result.data._id }));
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }
  }

  getData(pageParam) {       
    pageParam["searchKeyword"] = this.state.searchValue;
    pageParam["listIds"] = this.props.listIds;

    // Change By - Najib, Desc - Calling setLoading in promise to set state after receiving response from server
    if(_.isEmpty(this.props.userData.dataList)) {
      this.setState({loading : true}); 
    } else {       
      this.setState({loading : false});
    }
    this.props.dispatch(ActiveUsersListRequest(pageParam,pageParam.currentPage)).then(res=>this.pageData(res));
  }

  pageData(response) {
    if(response.status == false){
      this.refs.user_container.error(`${response.error} `, ``);
    }
    if(this.state.loading) {
      this.setState({loading : false});  
    }
  }

  searchFilter(e) {
    e.preventDefault();
    var expVal = e.target.value.trim();
    var pattern = new RegExp(/[+*()?\\]/);
    if(!pattern.test(expVal)){
      this.state.searchValue = e.target.value.trim();
      this.getData({
        currentPage  : this.currentPage,
        totalItems   : 0,
        itemsPerPage : this.itemsPerPage
      });
    }    
  }

  showUserName(row) {
    return (<div>{row.firstname} {row.lastname}</div>)
  }

  showRole(row) {    
    let roleObj = _.invert(Roles);
    let role = row.role;
    this.role = roleObj[role];
    return(
        <div >{this.role}</div>
      );
  }

  showCompanyId =(row) => {
    if(row.profile.companyid == null) {
      return (
        <div>-</div>
        )
    } else {
        return (
        <div>{row.profile.companyid.businessId}</div>
        );
      }
  }
  
  componentWillUnmount() {
    this.props.dispatch(ClearActiveUsers());
  }

	render() {

    var objDisp = [
          { title : <FormattedMessage id='user_name' />, type : "function", callback :this.showUserName },
          {fieldName: "email", title: <FormattedMessage id='email' />, type: "text"},
          {title: <FormattedMessage id='role' />, type: "function", callback: this.showRole},
          {title: <FormattedMessage id='company_code' />, type: "function", callback: this.showCompanyId},
        ];

    var filter = [
      {type : 'search',id:'search', selectedfilter : this.searchFilter }
    ]  

    return (
      <div>
        <ToastContainer
          toastMessageFactory={ToastMessageFactory}
          ref="user_container"
          className="toast-top-right"
         />
        <DataTable data={this.props.userData.dataList}
            count={this.props.userData.count}
            currentPage = {this.props.userData.currentPage}
            submenu= {null}
            topmenu= {null}
            itemsPerPage={this.itemsPerPage}
            newDataCallback={this.getData}
            dispField={objDisp}
            pageTitle={this.props.intlData.messages.manage_user} 
            listDescreption={this.props.intlData.messages.users}
            filter={filter}
            loading={this.state.loading}
        />
      </div>
  	);	
	}
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    loggedInData: loggedInData(state),
    userData: userData(state),
    intlData: intlData(state)

  };
}

export default connect(mapStateToProps)(ActiveUsersList);