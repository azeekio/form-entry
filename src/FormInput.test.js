import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FormInput from './FormInput';

var blankInput, onChange, onSubmit;
beforeEach( () => {
	onChange = jest.fn();
	onSubmit = jest.fn();

	blankInput = <FormInput
					key={0}
					val={1234567890}
	        		title={""}
	        		required={true}
	        		error={false}
	        		onChange={onChange}
	        		onSubmit={onSubmit}
    			/>;
})

it('should render without crashing', () => {
	const div = document.createElement('div');
 	ReactDOM.render(blankInput, div);
 	ReactDOM.unmountComponentAtNode(div);
});

it('should call handleChange prop on change', () => {
	const div = document.createElement('div');
	const fi = ReactDOM.render(blankInput, div);
	fi.handleChange({target: { value: 'test'}});

	expect( onChange ).toHaveBeenCalled();
	ReactDOM.unmountComponentAtNode(div);
});

it('should set state active correctly when focused and blurred', () => {
 	const fi = shallow(blankInput);
	fi.instance().onFocus();
 	expect( fi.instance().state.active ).toEqual( true );

 	fi.instance().onBlur();
 	expect( fi.instance().state.active ).toEqual( false );
});

it('should not have "error" class in inputClasses when this.prop.error = false', () => {
 	const fi = shallow(blankInput);
	var inputClasses = fi.instance().getInputClasses();

	expect( inputClasses ).not.toEqual( expect.stringContaining('error') );
});

it('should have "error" class in inputClasses when this.prop.error = true', () => {
 	const fi = shallow(<FormInput
							key={0}
							val={1234567890}
			        		title={""}
			        		required={true}
			        		error={true}
			        		onChange={onChange}
			        		onSubmit={onSubmit}
		    			/>);
	var inputClasses = fi.instance().getInputClasses();

	expect( inputClasses ).toEqual( expect.stringContaining('error') );
});

it('should mask input', () => {
	const fi = shallow(<FormInput
							key={0}
							val={1234567890}
			        		title={""}
			        		required={true}
			        		mask={true}
			        		error={true}
			        		onChange={onChange}
			        		onSubmit={onSubmit}
		    			/>);

	const spy = jest.spyOn( fi.instance(), 'maskInput');
	fi.instance().handleChange({target: { value: '1234567890'}});

	expect( spy ).toHaveBeenCalled();
	expect( spy ).toHaveReturnedWith( '(123) 456-7890' );
});

