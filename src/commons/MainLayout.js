import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

// Import custom components
import Header from './header/Header';

const styles = theme => ({
     root: {
          width: '100%',
          height: 430,
          zIndex: 1,
          overflow: 'hidden',
     },
     appFrame: {
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
     },
     content: {
          width: '100%',
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          padding: 24,
          height: 'calc(100% - 56px)',
          marginTop: 56,
          [theme.breakpoints.up('sm')]: {
               height: 'calc(100% - 64px)',
               marginTop: 64,
          },
     },
});

//@withStyles(styles)
// export default class MainLayout extends Component {

class MainLayout extends Component {

     constructor(props) {
          super(props);
          this.state = { open: false };
     }

     handleToggle = () => this.setState({ open: !this.state.open });

     render() {
          let { open } = this.state;
          const classes = this.props.classes;

          return (
               <div className={classes.root}>
                    <div className={classes.appFrame}>
                         <Header navDrawerOpen={open} handleToggleDrawer={this.handleToggle} />
                    </div>
               </div>
          )
     }

}

MainLayout.propTypes = {
     classes: PropTypes.object.isRequired,
     children: PropTypes.element
};

export default withStyles(styles)(MainLayout)