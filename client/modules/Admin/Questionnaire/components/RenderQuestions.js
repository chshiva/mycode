import React, { PropTypes, Component } from 'react';
import style from '../../Admin.css';


class RenderQuestions extends Component{
    constructor(props) {
			super(props)
      this.quill = null;
    }

    componentDidMount() {			
			this.quill = new Quill(this.refs.editor, {								  
			readOnly: true,
			theme: 'bubble'	
			});
			let question = this.props.question;
			if(question && typeof question[0] === "string") {			
				question = [
					{
						"insert" : this.props.question[0]
					}
				]
			}
			this.quill.setContents(question)			
		}
		
		componentWillReceiveProps(nextProps) {
			let question = nextProps.question;
		 	if(question && typeof question[0] === "string") {			
				question = [
					{
						"insert" : nextProps.question[0]
					}
				]
			 }
			if (this.quill) {
				this.quill.setContents(question);
			}
			
		}

    render() {
			let cls_editor = `${style.qleditor} form-control`;
			return(
				<div ref='editor' className={cls_editor}></div>
			)
    }
}

export default RenderQuestions