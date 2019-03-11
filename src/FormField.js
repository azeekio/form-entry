import React, { Component } from 'react';
import FormInput from './FormInput'
import './FormField.css'

class FormField extends Component {
	constructor(props) {
		super(props);

		// Create state from this.props.inputs
		/*	example:
		 *	this.state = 
		 *	{
		 *		'FIRST NAME' : {
		 *			'value': '',
		 * 			'error': false
		 * 		}
		 * 	},
		 * 	...
		 */
		this.state = this.props.inputs.reduce(
			(o, key) => ({ 
				...o, [key.title]: { 'value': '', 'error': false }
			}), {});
	}

	handleFormChange = (formId, value) => {
		this.setState({ 
			[formId]: {
				value: value,
				error: false
			}
		});
	}

	handleFormSubmit = e => {
		// Create newState based on current input values
		var newState = {};
		Object.keys(this.state).map( (formId, i) => {
			var trimmedVal = this.state[formId].value.trim();
			return newState[formId] = {
				value: trimmedVal,
				error: this.props.inputs[i].required ? trimmedVal === '' : false // only set error to true on required inputs
			}
		});

		e.persist();
		this.setState( newState, () => {
			var allRequirementsMet = !this.inputErrors().includes(true);

			// If all requirements met, submit form, else prevent form submission
			if( allRequirementsMet ) {
				this.alertData();
			} else {
				e.preventDefault();
			}
		});
	}

	// Create truth array for input validation based on input errors
	inputErrors = () => {
		return this.props.inputs.map( (field) => {
			return this.state[field.title].error;
		});
	}

	alertData = () => {
		var allData = Object.keys(this.state).map( (key) => { 
			var data = '';
			data += '\n' + key + ': ' + this.state[key].value;
			data.replace(/,/g, '');
			return data; 
		});
		alert( allData );
	}

	render() {
		const fields = this.props.inputs.map( (field, i) => {
			return <FormInput
				key={i}
				val={this.state[field.title].value}
				title={field.title}
				required={field.required}
				mask={field.mask}
				error={this.state[field.title].error}
				onChange={this.handleFormChange}
			/>;
		});

		return(
			<form onSubmit={this.handleFormSubmit} className="form-field">
				<div className="entry-field">
					{fields}
				</div>
				<button type="submit" onSubmit={this.handleFormSubmit} className="btn-next white-text radius6">
					Next
					<div className="right-arrow"/>
				</button>
			</form>
		);
	}
}

export default FormField;