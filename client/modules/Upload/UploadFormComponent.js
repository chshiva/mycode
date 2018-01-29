import React ,{PropTypes,Component } from 'react';
import {connect} from 'react-redux';

export function UploadForm (props, context)  {

		return (
			<div>
			<form ref='uploadForm' 
            id='uploadForm' 
            action='http://localhost:8000/upload' 
            method='post' 
            encType="multipart/form-data">
                <input type="file" name="sampleFile" />
                <input type='submit' value='Upload!' />
            </form>	
			</div>
			);
	
}