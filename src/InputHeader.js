import React, { Component } from 'react';
import './InputHeader.css'

class InputHeader extends Component {
	getHeaderClasses = () => {
		var headerClasses = 'required-text';
		if( this.props.required && this.props.error ) {
			headerClasses += ' visible';
		}

		return headerClasses;
	}

	render() {
		var headerClasses = this.getHeaderClasses();

		return (
			<div className="input-header">
				{this.props.title}
				<div className={headerClasses}>REQUIRED</div>
			</div>
		);

	}
}

export default InputHeader;