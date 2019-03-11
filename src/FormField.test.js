import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FormField from './FormField';

var inputs;
beforeEach( () => {
	inputs = [
		{
			title: "FIRST NAME",
			required: true
		},
		{
			title: "LAST NAME",
			required: true
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
});

it('should render without crashing', () => {
	const div = document.createElement('div');
 	ReactDOM.render(<FormField inputs={inputs}/>, div);
 	ReactDOM.unmountComponentAtNode(div);
});

it('should handle form change', () => {
	const ff = shallow(<FormField inputs={inputs}/>);
	ff.instance().handleFormChange('FIRST NAME', 'Zach');
	var state = ff.instance().state['FIRST NAME'];

	expect( state.value ).toEqual( 'Zach' );
	expect( state.error ).toEqual( false );
});

it('should set error to true when required form input submitted with no value', () => {
	const ff = shallow(<FormField inputs={inputs}/>);
	ff.instance().handleFormChange('FIRST NAME', '');
	ff.instance().handleFormSubmit({preventDefault: jest.fn(), 'persist': jest.fn()});
	var state = ff.instance().state['FIRST NAME'];

	expect( state.value ).toEqual( '' );
	expect( state.error ).toEqual( true );
});

it('should check inputs correctly', () => {
 	const ff = shallow(<FormField inputs={inputs}/>);
 	const spy = jest.spyOn( ff.instance(), 'inputErrors');
 	ff.instance().handleFormSubmit({preventDefault: jest.fn(), 'persist': jest.fn()});

 	expect( spy ).toHaveReturnedWith( [true, true, true, false] );
});

it('should fail validation when required inputs are empty', () => {
	window.alert = jest.fn();
  	const ff = shallow(<FormField inputs={inputs}/>);
  	ff.instance().handleFormSubmit({preventDefault: jest.fn(), 'persist': jest.fn()});

  	expect( window.alert ).not.toHaveBeenCalled();
});

it('should pass validation when no inputs are required', () => {
	window.alert = jest.fn();
	inputs = [
		{
			title: "FIRST NAME",
			required: false
		},
		{
			title: "LAST NAME",
			required: false
		},
		{
			title: "ADDRESS",
			required: false
		},
		{
			title: "ADDRESS 2 (OPTIONAL)",
			required: false
		}
	];
  	const ff = shallow(<FormField inputs={inputs}/>);
  	ff.instance().handleFormSubmit({preventDefault: jest.fn(), 'persist': jest.fn()});

  	expect( window.alert ).toHaveBeenCalled();
});