import React, { Component } from 'react';
import IntroText from './IntroText'
import FormField from './FormField'
import './App.css';

class App extends Component {
  	render() {
  		var inputs = [
  			{
  				title: "FIRST NAME",
  				required: true
  			},
  			{
  				title: "LAST NAME",
  				required: true
  			},
        {
          title: "PHONE NUMBER",
          required: false,
          mask: true
        },
  			{
  				title: "ADDRESS",
  				required: true
  			},
  			{
  				title: "ADDRESS 2 (OPTIONAL)",
  				required: false
  			}
  		];

      	return (
      		<div className="flex-row">
	      		<IntroText/>
	      		<FormField inputs={inputs}/>
	      	</div>
      	);
  	}
}

export default App;
