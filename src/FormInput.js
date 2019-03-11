import React, { Component } from 'react';
import InputHeader from './InputHeader';
import './FormInput.css'

class FormInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		}
	}

	handleChange = e => {
		var text = e.target.value;
		if( this.props.mask ) {
			text = this.maskInput(e);
		}

		this.props.onChange( this.props.title, text );
	}

	maskInput = (e) => {
		var val = e.target.value.replace(/[^\d]/g, '');
		var newVal = '';

		for( let i = 0; i < val.length && i < 10; i++ ) {
			if( i === 0 ) {
				newVal += '(';
			} else if( i === 3 ) {
				newVal += ')';
				newVal += ' ';
			} else if( i === 6 ) {
				newVal += '-';
			} 

			newVal += val.charAt(i);
		}
		return newVal;
	}

	onFocus = () => {
		this.setState({
			active: true
		});
	}

	onBlur = () => {
		this.setState({
			active: false
		});
	}

	getInputClasses = () => {
		var inputClasses = 'input radius6';
		if( this.state.active && !this.props.error ) {
			inputClasses += ' active';
		} else if( this.props.required && this.props.error ) {
			inputClasses += ' error';
		}

		return inputClasses;
	}

	render() {
		var inputClasses = this.getInputClasses();

		return (
			<div className="form-input">
				<InputHeader {...this.props}/>
				<input onChange={this.handleChange} onFocus={this.onFocus} onBlur={this.onBlur} className={inputClasses} value={this.props.val}/>
			</div>
		);
	}
}

export default FormInput;