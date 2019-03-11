import React, { Component } from 'react';
import './IntroText.css';

class IntroText extends Component {
	render() {
		return (
			<div className="page-left">
	  			<div className="flex-row flex-end">
	  				<div className="flex-column">
	  					<div className="logo"/>
	      				<div className="welcome-text white-text">
	      					Welcome
	      				</div>
	      				Please tell us a bit about yourself to get started.
	  				</div>
	  				<div className="bg-left"/>
	  			</div>
	  		</div>
		);
	}
}

export default IntroText;