import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import ArrowDropDown from 'material-ui-icons/ArrowDropDown';
import Avatar from 'material-ui/Avatar';


class DoctorHeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    };

    this.menuOpen = this.menuOpen.bind(this);
    this.menuClose = this.menuClose.bind(this);
  }

  menuOpen(e) {
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  menuClose() {
    this.setState({ open: false });
  }


  render() {
    console.log("this.props.user ", this.props.user);
    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Hidden mdUp>
              <IconButton aria-label="Menu" className="menuButtonTop">
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography type="title" color="inherit" className="appTytle">
              <div className="whiteLogo">
                <img src="/public/images/logo/netikWhiteLogo.png" alt="Logo" />
              </div>
            </Typography>

            <Button aria-owns={this.state.open ? 'simple-menu' : null} aria-haspopup="true" onClick={this.menuOpen}>
              <span className="whiteTxt"> {this.props.user && this.props.user.userDetails && this.props.user.userDetails.name}</span>
              <ArrowDropDown className="arrowDownIcon" />
              <Avatar alt="Remy Sharp" src="/public/images/black-icons/avatar.png" className="avatarImg" />
            </Button>
            <Menu id="simple-menu" anchorEl={this.state.anchorEl} open={this.state.open}
              onClose={this.menuClose} className="dropdDown" >
              <MenuItem onClick={this.menuClose}>Profile</MenuItem>
              <MenuItem onClick={this.menuClose}>My Account</MenuItem>
              <MenuItem onClick={this.menuClose}>Settings</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

/** Map the state to props. */
const mapStateToProps = function (state) {
  return {
    user: state.user
  }
}


/**
 * Map the actions to props.
 */
const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorHeaderContainer);