import React, { Component, PropTypes } from 'react';
import TextBox from './TextBox';
import Label from './Label';
import Password from './Password';
import DropDown from './DropDown';
import TextArea from './TextArea';
import Phone from './Phone';
import DynamicDropDown from './DynamicDropDown';
import styles from './component.css';
import MyDTPicker from './MyDTPicker';
import Search from './Search';
import CheckBox from './CheckBox';
import Radio from './Radio';
export default class FormField extends Component {

  constructor(props) {
    super(props);
  }
  showError(error){
    if(error && error != ""){
      return error;
    }
  }

  /*componentWillReceiveProps(nextProps) {
    console.log("value === ",nextProps.changeData);
  }*/

  renderUI(){
    var errcls = `${styles.error}`;
    var cls = `${styles.iElement} ${styles.oElement}`;
    // var cls_inputAllCap = ` ${styles.inputAllCap} ${styles.iElement} ${styles.oElement} `;
    let error = false;
    if (this.props.data.error && this.props.data.error != "") {
      error = true;
      cls = `${styles.iElement} ${styles.oElement} ${styles.errorclass}`;
      // cls_inputAllCap = ` ${styles.inputAllCap} ${styles.iElement} ${styles.oElement} ${styles.errorclass} `;
    }

    if(this.props.type == "text"){
      return(
          <formfield>
            <Label data={this.props.data} required={this.props.data.required} />
            <TextBox value={this.props.data.value} callback={this.props.callback} 
            data={this.props.data} edit={this.props.data.edit} 
            required={this.props.data.required} error={error}
            datavalue={this.props.datavalue} classname={cls} />
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    }else if(this.props.type == "email"){
      return(
          <formfield>
            <Label data={this.props.data} required={this.props.data.required} />
            <TextBox value={this.props.data.value} callback={this.props.callback} 
            data={this.props.data} edit={this.props.data.edit} 
            required={this.props.data.required} error={error}
            datavalue={this.props.datavalue} classname={cls} />
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    }else if(this.props.type == "password"){
      return(
          <formfield>
            <Label data={this.props.data} required={this.props.data.required} />
            <Password value={this.props.data.value} callback={this.props.callback}
             data={this.props.data} edit={this.props.data.edit}  value ={this.props.data.value}
             error={error} datavalue={this.props.datavalue} required={this.props.data.required} classname={cls} />
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    }else if(this.props.type == "dropdown"){
      return(
          <formfield>
            <Label data={this.props.data} required={this.props.data.required} />
            <DropDown key={this.props.data._id} value={this.props.data.value} 
              callback={this.props.callback} data={this.props.data} 
              edit={this.props.data.edit} required={this.props.data.required}
              error={error} datavalue={this.props.datavalue} classname={cls} />
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    }else if(this.props.type == "dynamicdropdown"){
      // console.log("inside dd === ", this.props.data);
      return(
          <formfield>
            <Label data={this.props.data} required={this.props.data.required} />
            <DynamicDropDown key={this.props.data._id} value={this.props.data.value} 
              callback={this.props.callback} data={this.props.data} 
              edit={this.props.data.edit} required={this.props.data.required}
              error={error} datavalue={this.props.datavalue} classname={cls} />
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    }else if(this.props.type == "checkbox"){
      return(
          <formfield>
          {this.props.data.text ? 
            <Label data={this.props.data} required={this.props.data.required} />
          : null}
            <CheckBox key={this.props.data._id} value={this.props.data.value} 
              callback={this.props.callback} data={this.props.data} 
              edit={this.props.data.edit} required={this.props.data.required}
              datavalue={this.props.datavalue} classname={cls} />
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    }else if(this.props.type == "textarea"){
      return(
          <formfield>
            <Label data={this.props.data} required={this.props.data.required} />
            <TextArea value={this.props.data.value} callback={this.props.callback} 
            data={this.props.data} edit={this.props.data.edit} 
            required={this.props.data.required} error={error}
            datavalue={this.props.datavalue}  classname={cls}/>
            <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
          </formfield>
        );
    } else if(this.props.type == 'date'){
      return(
              <formfield>
                <Label data = {this.props.data} required = {this.props.data.required } />
                <MyDTPicker id={this.props.data._id} value={this.props.data.value} callback={this.props.callback} 
                  data={this.props.data} edit={this.props.data.edit} required={this.props.data.required}
                  datavalue={this.props.datavalue}/>
                <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
              </formfield>
            );
    } else if(this.props.type == 'phone'){
      //console.log("Phone rendered", this.props);
      return(
        <formfield>
          <Label data = {this.props.data} required = {this.props.data.required } />
          <Phone id={this.props.data._id} value={this.props.data.value}  callback={this.props.callback} 
          data={this.props.data} edit={this.props.data.edit} required={this.props.data.required} 
          datavalue={this.props.datavalue} classname={cls} />
          <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
        </formfield>
      );
    } else if(this.props.type == 'search'){
      return(
        <formfield>
          <Label data = {this.props.data} required = {this.props.data.required } />
          <Search value={this.props.data.value}  callback={this.props.callback} 
          data={this.props.data} edit={this.props.data.edit} required={this.props.data.required} 
          datavalue={this.props.datavalue} classname={cls}/>
          <label id={this.props.data.errorId} className={errcls}>{this.showError(this.props.data.error)}</label>
        </formfield>
      );
    } else if(this.props.type == 'view'){
      return(
        <formfield>
          <Label data = {this.props.data} required = {false}/>
          <label className={cls}>{this.props.datavalue}</label>
        </formfield>
      );
    } else if(this.props.type == 'radio'){
      return(
        <formfield>
          <Label data={this.props.data} required={this.props.data.required} />
          <Radio key={this.props.data._id} value={this.props.data.value} 
            callback={this.props.callback} data={this.props.data} 
            edit={this.props.data.edit} required={this.props.data.required}
            datavalue={this.props.datavalue} classname={cls} />
        </formfield>
        )
    }
  }

  render() {
    var cls = `${styles.iFormField} ${styles.oFormField}`;
    return (
        <div className={cls}>
        {this.renderUI()}   
      </div>
    );
  }
}
 
FormField.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string,
  callback: PropTypes.func,
  datavalue : PropTypes.oneOfType([PropTypes.node,PropTypes.object])
};
