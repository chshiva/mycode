import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import List, { ListItem, ListItemIcon, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import css from './allergytypes.css';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import { connect } from 'react-redux';

const styles = {

};

class AllergyTypes extends Component {
  constructor(props) {
    super(props);
    this.state = { anchorEl: null, open: false, };
  }

  menuOpen = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  menuClose = () => {
    this.setState({ open: false });
  };


  render() {
    return (
      <div className="allergyViewBlock">
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h2 className="headlineRegular">Allergies</h2>
            <div className="cardListBox">
              <div className="cardBlock">
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={6}>
                    <Card className="cardBtmSpace">
                      <List subheader={<ListSubheader className="allergyHeader">Food Allergies</ListSubheader>}>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Soy" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Hot Peppers" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Tartrazine" />
                        </ListItem>
                      </List>
                    </Card>
                    <Card className="cardBtmSpace">
                      <List subheader={<ListSubheader className="allergyHeader">Environmental Allergies</ListSubheader>}>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Pollen" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Insect Sting" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Latex" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Chromium" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Insect Sting" />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card className="cardBtmSpace">
                      <List subheader={<ListSubheader className="allergyHeader">Drug Allergies</ListSubheader>}>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Dilantin / Phenytoin" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="sulfonamides" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Adrenaline" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Chromium" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="cephalosporins" />
                        </ListItem>
                      </List>
                    </Card>
                    <Card className="cardBtmSpace">
                      <List subheader={<ListSubheader className="allergyHeader">Environmental Allergies</ListSubheader>}>
                        <Divider />
                        <ListItem>
                          <ListItemText primary="Pollen" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Insect Sting" />
                        </ListItem>
                      </List>
                    </Card>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

    );
  }
};
const mapStateToProps = function (state) {
  return {}
}
export default connect(mapStateToProps)(AllergyTypes);