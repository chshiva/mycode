import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Grid, Row} from 'react-bootstrap';

// Import Style
import styles from './HomeLayout.css';

import { loggedInData } from '../../Login/LoginReducer';

export class HomeLayout extends Component {
  constructor(props) {
    super(props);
  }

  // background-color: #00aafa;
  render() {
    return (
        <div>
          <section className={styles.loginBlock}>
            <Grid fluid={true}>
              <Row>
                {this.props.children}
              </Row>
            </Grid>
          </section>
        </div>
    );
  }
}

HomeLayout.propTypes = {
  loggedInData: PropTypes.object,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return {
    intl: store.intl,
    loggedInData: loggedInData(store),
  };
}

export default connect(mapStateToProps)(HomeLayout);
